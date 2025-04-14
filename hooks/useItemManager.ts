import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecurringPaymentManager } from './useRecurringPaymentManager';

export function useItemManager() {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [items, setItems] = useState<{ name: string; price: number; date: string; id: string }[]>([]);
  const { monthlyPayments } = useRecurringPaymentManager();

  const loadItems = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('items');
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error('Failed to load items from storage:', error);
    }
  };

  const saveItems = async (newItems: typeof items) => {
    try {
      await AsyncStorage.setItem('items', JSON.stringify(newItems));
    } catch (error) {
      console.error('Failed to save items to storage:', error);
    }
  };

  const addItem = () => {
    if (itemName && itemPrice) {
      const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
      const newItems = [...items, { name: itemName, price: parseFloat(itemPrice), date: today, id: Date.now().toString() }];
      setItems(newItems);
      saveItems(newItems);
      setItemName('');
      setItemPrice('');
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    const today = new Date();
    const todayDate = today.getDate();
    const todayString = today.toISOString().split('T')[0];

    // Filter recurring payments for today
    const newRecurringItems = monthlyPayments
      .filter((payment) => payment.date === todayDate)
      .map((payment) => ({
        name: payment.name,
        price: payment.price,
        date: todayString,
        id: `${payment.id}-${todayString}`, // Ensure unique ID for recurring payments
      }));

    // Avoid adding duplicate recurring payments for the same day
    const uniqueRecurringItems = newRecurringItems.filter(
      (recurring) => !items.some((item) => item.id === recurring.id)
    );

    if (uniqueRecurringItems.length > 0) {
      const updatedItems = [...items, ...uniqueRecurringItems];
      setItems(updatedItems);
      saveItems(updatedItems);
    }
  }, [monthlyPayments]); // Removed `items` from dependencies to prevent infinite loop

  const groupedItems = items.reduce((groups, item) => {
    if (!groups[item.date]) {
      groups[item.date] = [];
    }
    groups[item.date].push(item);
    return groups;
  }, {} as Record<string, { name: string; price: number; date: string; id: string }[]>);

  return {
    itemName,
    setItemName,
    itemPrice,
    setItemPrice,
    groupedItems,
    addItem,
  };
}
