import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useRecurringPaymentManager() {
  const [paymentName, setPaymentName] = useState('');
  const [paymentPrice, setPaymentPrice] = useState('');
  const [paymentDate, setPaymentDate] = useState<number | null>(null);
  const [recurrence, setRecurrence] = useState<'weekly' | 'bi-weekly' | 'monthly'>('monthly'); // New state for recurrence
  const [paused, setPaused] = useState(false); // New state for pausing payments
  const [monthlyPayments, setMonthlyPayments] = useState<
    { name: string; price: number; date: number; id: string; recurrence: string; paused: boolean }[]
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
          recurrence,
          paused,
        },
      ];
      setMonthlyPayments(newPayments);
      saveMonthlyPayments(newPayments);
      setPaymentName('');
      setPaymentPrice('');
      setPaymentDate(null);
      setRecurrence('monthly'); // Reset recurrence to default
      setPaused(false); // Reset paused state
    }
  };

  const editPayment = (id: string, updatedPayment: Partial<typeof monthlyPayments[0]>) => {
    const updatedPayments = monthlyPayments.map((payment) =>
      payment.id === id ? { ...payment, ...updatedPayment } : payment
    );
    setMonthlyPayments(updatedPayments);
    saveMonthlyPayments(updatedPayments);
  };

  const togglePausePayment = (id: string) => {
    const updatedPayments = monthlyPayments.map((payment) =>
      payment.id === id ? { ...payment, paused: !payment.paused } : payment
    );
    setMonthlyPayments(updatedPayments);
    saveMonthlyPayments(updatedPayments);
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
    recurrence,
    setRecurrence,
    paused,
    setPaused,
    monthlyPayments,
    addPayment,
    editPayment,
    togglePausePayment,
  };
}
