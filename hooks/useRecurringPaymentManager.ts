import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useRecurringPaymentManager() {
  const [paymentName, setPaymentName] = useState('');
  const [paymentPrice, setPaymentPrice] = useState('');
  const [paymentDate, setPaymentDate] = useState<number | null>(null);
  const [monthlyPayments, setMonthlyPayments] = useState<
    { name: string; price: number; date: number; id: string }[]
  >([]);

  const loadMonthlyPayments = async () => {
    try {
      const storedPayments = await AsyncStorage.getItem('monthlyPayments');
      if (storedPayments) {
        setMonthlyPayments(JSON.parse(storedPayments));
      }
    } catch (error) {
      console.error('Failed to load monthly payments from storage:', error);
    }
  };

  const saveMonthlyPayments = async (newPayments: typeof monthlyPayments) => {
    try {
      await AsyncStorage.setItem('monthlyPayments', JSON.stringify(newPayments));
    } catch (error) {
      console.error('Failed to save monthly payments to storage:', error);
    }
  };

  const addPayment = () => {
    if (paymentName && paymentPrice && paymentDate) {
      const newPayments = [
        ...monthlyPayments,
        {
          name: paymentName,
          price: parseFloat(paymentPrice),
          date: paymentDate,
          id: Date.now().toString(),
        },
      ];
      setMonthlyPayments(newPayments);
      saveMonthlyPayments(newPayments);
      setPaymentName('');
      setPaymentPrice('');
      setPaymentDate(null);
    }
  };

  useEffect(() => {
    loadMonthlyPayments();
  }, []);

  return {
    paymentName,
    setPaymentName,
    paymentPrice,
    setPaymentPrice,
    paymentDate,
    setPaymentDate,
    monthlyPayments,
    addPayment,
  };
}
