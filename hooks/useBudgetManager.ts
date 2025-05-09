import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecurringPaymentManager } from './useRecurringPaymentManager';

export function useBudgetManager() {
  const [budget, setBudget] = useState<number | null>(null); // User-defined monthly budget
  const [spent, setSpent] = useState<number>(0); // Total spent for the current month
  const [pastMonthExpenses, setPastMonthExpenses] = useState<Record<string, number>>({}); // Store past month expenses
  const [insights, setInsights] = useState<{ trends: string[]; recommendations: string[] }>({ trends: [], recommendations: [] }); // AI insights
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

  const loadPastMonthExpenses = async () => {
    try {
      const storedExpenses = await AsyncStorage.getItem('pastMonthExpenses');
      if (storedExpenses) {
        setPastMonthExpenses(JSON.parse(storedExpenses));
      }
    } catch (error) {
      console.error('Failed to load past month expenses from storage:', error);
    }
  };

  const savePastMonthExpenses = async (expenses: Record<string, number>) => {
    try {
      await AsyncStorage.setItem('pastMonthExpenses', JSON.stringify(expenses));
      setPastMonthExpenses(expenses);
    } catch (error) {
      console.error('Failed to save past month expenses to storage:', error);
    }
  };

  const calculateSpent = (groupedItems: Record<string, { price: number; tag?: string }[]>) => {
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

    // Generate AI insights
    generateInsights(groupedItems, totalSpent);
  };

  const generateInsights = (groupedItems: Record<string, { price: number; tag?: string }[]>, totalSpent: number) => {
    const trends: string[] = [];
    const recommendations: string[] = [];

    // Analyze spending trends
    const categoryTotals: Record<string, number> = {};
    Object.values(groupedItems).flat().forEach((item) => {
      const tag = item.tag || 'Uncategorized';
      categoryTotals[tag] = (categoryTotals[tag] || 0) + item.price;
    });

    const mostSpentCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
    if (mostSpentCategory) {
      trends.push(`You spent the most on ${mostSpentCategory[0]} this month.`);
    }

    // Budget recommendations
    if (budget && totalSpent > budget) {
      recommendations.push('Consider increasing your budget or reducing expenses.');
    } else if (budget && totalSpent < budget * 0.8) {
      recommendations.push('Great job! You are spending well within your budget.');
    }

    setInsights({ trends, recommendations });
  };

  const resetMonthlyData = async () => {
    const today = new Date();
    const currentMonth = today.toISOString().slice(0, 7); // Format: YYYY-MM

    // Save the current month's total spent as past month expense
    const updatedPastExpenses = { ...pastMonthExpenses, [currentMonth]: spent };
    await savePastMonthExpenses(updatedPastExpenses);

    // Reset budget and spent for the new month
    setBudget(null);
    setSpent(0);
    await AsyncStorage.removeItem('budget');
  };

  useEffect(() => {
    loadBudget();
    loadPastMonthExpenses();

    // Check if it's the first day of a new month
    const today = new Date();
    if (today.getDate() === 1) {
      resetMonthlyData();
    }
  }, []);

  return {
    budget,
    setBudget: saveBudget,
    spent,
    calculateSpent,
    pastMonthExpenses, // Expose past month expenses
    insights, // Expose AI insights
  };
}
