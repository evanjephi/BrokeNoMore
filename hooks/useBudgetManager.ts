import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useBudgetManager() {
  const [budget, setBudget] = useState<number | null>(null); // User-defined budget
  const [spent, setSpent] = useState<number>(0); // Total spent for the current period

  const loadBudget = async () => {
    try {
      const storedBudget = await AsyncStorage.getItem('budget');
      if (storedBudget) {
        setBudget(JSON.parse(storedBudget));
      }
    } catch (error) {
      console.error('Failed to load budget from storage:', error);
    }
  };

  const saveBudget = async (newBudget: number) => {
    try {
      await AsyncStorage.setItem('budget', JSON.stringify(newBudget));
      setBudget(newBudget);
    } catch (error) {
      console.error('Failed to save budget to storage:', error);
    }
  };

  const calculateSpent = (groupedItems: Record<string, { price: number }[]>) => {
    const today = new Date().toISOString().split('T')[0];
    const todayItems = groupedItems[today] || [];
    const totalSpent = todayItems.reduce((sum, item) => sum + item.price, 0);
    setSpent(totalSpent);
  };

  useEffect(() => {
    loadBudget();
  }, []);

  return {
    budget,
    setBudget: saveBudget,
    spent,
    calculateSpent,
  };
}
