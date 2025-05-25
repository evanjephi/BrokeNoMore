import { useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const groupedItems: Record<string, { price: number }[]> = {}; // Replace with actual grouped items logic

export function useBudgetManager() {
  const [budget, setBudget] = useState<number | null>(null);
  const [spent, setSpent] = useState<number>(0);
  const [pastMonthExpenses, setPastMonthExpenses] = useState<Record<string, number>>({});

  const loadBudget = async () => {
    try {
      const storedBudget = await AsyncStorage.getItem('budget');
      if (storedBudget) {
        setBudget(JSON.parse(storedBudget));
      }
    } catch (error) {
      console.error('Failed to load budget:', error);
    }
  };

  const saveBudget = async (newBudget: number) => {
    try {
      await AsyncStorage.setItem('budget', JSON.stringify(newBudget));
      setBudget(newBudget);
    } catch (error) {
      console.error('Failed to save budget:', error);
    }
  };

  const resetMonthlyData = async () => {
    const today = new Date();
    const currentMonth = today.toISOString().slice(0, 7);
    const lastResetMonth = await AsyncStorage.getItem('lastResetMonth');

    if (lastResetMonth !== currentMonth) {
      const updatedExpenses = { ...pastMonthExpenses, [currentMonth]: spent };
      await AsyncStorage.setItem('pastMonthExpenses', JSON.stringify(updatedExpenses));
      setPastMonthExpenses(updatedExpenses);

      await AsyncStorage.removeItem('budget');
      setBudget(null);
      setSpent(0);

      await AsyncStorage.setItem('lastResetMonth', currentMonth);
    }
  };

const calculateSpent = (groupedItems: Record<string, { price: number }[]>) => {
  const currentMonth = new Date().toISOString().slice(0, 7); // "2025-05"

  const monthlyItems = Object.entries(groupedItems)
    .filter(([date]) => {
      const [day, month, year] = date.split('-'); // Split DD-MM-YYYY
      return `${year}-${month}` === currentMonth;
    })
    .flatMap(([, items]) => items);

  const totalSpent = monthlyItems.reduce((sum, item) => sum + item.price, 0);
  setSpent(totalSpent);
};


  useEffect(() => {
    const initialize = async () => {
      await loadBudget();
      const storedExpenses = await AsyncStorage.getItem('pastMonthExpenses');
      if (storedExpenses) {
        setPastMonthExpenses(JSON.parse(storedExpenses));
      }
      await resetMonthlyData();
    };

    initialize();
  }, []);

  useEffect(() => {
    const calculateSpent = async () => {
      const currentMonth = new Date().toISOString().slice(0, 7);

      const monthlyItems = Object.entries(groupedItems)
        .filter(([date]) => date.startsWith(currentMonth))
        .flatMap(([, items]) => items);

      const totalSpent = monthlyItems.reduce((sum, item) => sum + item.price, 0);
      setSpent(totalSpent);
    };

    calculateSpent();
  }, [budget]);

  return {
    budget,
    setBudget: saveBudget,
    spent,
    setSpent,
    pastMonthExpenses,
    calculateSpent, // Expose calculateSpent
  };
}