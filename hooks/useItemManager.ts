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

  const getLocalDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Format: YYYY-MM-DD
  };

  const addItem = () => {
    if (itemName && itemPrice) {
      const today = getLocalDate();
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
    const today = getLocalDate();

    // Filter recurring payments for today
    const newRecurringItems = monthlyPayments
      .filter((payment) => payment.date === new Date().getDate())
      .map((payment) => ({
        name: payment.name,
        price: payment.price,
        date: today,
        id: `${payment.id}-${today}`, // Ensure unique ID for recurring payments
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
