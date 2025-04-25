import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecurringPaymentManager } from './useRecurringPaymentManager';

export function useItemManager() {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemTag, setItemTag] = useState(''); // New state for item tags
  const [filterTag, setFilterTag] = useState(''); // New state for filtering by tag
  const [items, setItems] = useState<{ name: string; price: number; date: string; id: string; tag?: string }[]>([]);
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
      const newItem = {
        name: itemName,
        price: parseFloat(itemPrice),
        date: today,
        id: Date.now().toString(),
        tag: itemTag, // Include tag in the item
      };

      const updatedItems = [newItem, ...items]; // Add the new item at the top
      setItems(updatedItems); // Update the state with the new item
      saveItems(updatedItems); // Persist the updated items to AsyncStorage

      // Reset input fields
      setItemName('');
      setItemPrice('');
      setItemTag('');
    }
  };

  useEffect(() => {
    loadItems(); // Load items from AsyncStorage on component mount
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

  // Filter items by tag if a filter is set
  const filteredItems = filterTag
    ? items.filter((item) => item.tag === filterTag)
    : items;

  // Group and sort items by date in descending order
  const groupedItems = filteredItems.reduce((groups, item) => {
    if (!groups[item.date]) {
      groups[item.date] = [];
    }
    groups[item.date].push(item);
    return groups;
  }, {} as Record<string, { name: string; price: number; date: string; id: string; tag?: string }[]>);

  const sortedGroupedItems = Object.keys(groupedItems)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .reduce((sortedGroups, date) => {
      sortedGroups[date] = groupedItems[date];
      return sortedGroups;
    }, {} as Record<string, { name: string; price: number; date: string; id: string; tag?: string }[]>);

  return {
    itemName,
    setItemName,
    itemPrice,
    setItemPrice,
    itemTag,
    setItemTag,
    filterTag,
    setFilterTag,
    groupedItems: sortedGroupedItems, // Return sorted groupedItems
    addItem,
  };
}
