import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useItemManager() {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [items, setItems] = useState<{ name: string; price: number; id: string }[]>([]);

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
      const newItems = [...items, { name: itemName, price: parseFloat(itemPrice), id: Date.now().toString() }];
      setItems(newItems);
      saveItems(newItems);
      setItemName('');
      setItemPrice('');
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  return {
    itemName,
    setItemName,
    itemPrice,
    setItemPrice,
    items,
    addItem,
  };
}
