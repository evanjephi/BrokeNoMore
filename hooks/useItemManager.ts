import { useState } from 'react';

export function useItemManager() {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [items, setItems] = useState<{ name: string; price: number; id: string }[]>([]);

  const addItem = () => {
    if (itemName && itemPrice) {
      setItems([...items, { name: itemName, price: parseFloat(itemPrice), id: Date.now().toString() }]);
      setItemName('');
      setItemPrice('');
    }
  };

  return {
    itemName,
    setItemName,
    itemPrice,
    setItemPrice,
    items,
    addItem,
  };
}
