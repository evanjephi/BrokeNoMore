import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecurringPaymentManager } from './useRecurringPaymentManager';

export function useBudgetManager() {
  const [budget, setBudget] = useState<number | null>(null); // User-defined monthly budget
  const [spent, setSpent] = useState<number>(0); // Total spent for the current month
  const { monthlyPayments } = useRecurringPaymentManager();

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
    const currentMonth = new Date().toISOString().slice(0, 7); // Format: YYYY-MM

    // Calculate total spent from daily items
    const monthlyItems = Object.entries(groupedItems)
      .filter(([date]) => date.startsWith(currentMonth)) // Filter items for the current month
      .flatMap(([, items]) => items); // Flatten the array of items

    const dailySpent = monthlyItems.reduce((sum, item) => sum + item.price, 0);

    // Calculate total spent from recurring payments
    const recurringSpent = monthlyPayments.reduce((sum, payment) => {
      if (!payment.paused) {
        return sum + payment.price;
      }
      return sum;
    }, 0);

    // Combine daily spent and recurring spent
    const totalSpent = dailySpent + recurringSpent;
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
