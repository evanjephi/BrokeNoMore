import { useState, useEffect } from 'react';

export function useRecurringPaymentManager() {
  const [paymentName, setPaymentName] = useState('');
  const [paymentPrice, setPaymentPrice] = useState('');
  const [paymentDate, setPaymentDate] = useState<number | null>(null); // Store the date of the month
  const [monthlyPayments, setMonthlyPayments] = useState<
    { name: string; price: number; date: number; id: string }[]
  >([]);
  const [processedPayments, setProcessedPayments] = useState<
    { name: string; price: number; id: string }[]
  >([]);

  const addPayment = () => {
    if (paymentName && paymentPrice && paymentDate) {
      setMonthlyPayments([
        ...monthlyPayments,
        {
          name: paymentName,
          price: parseFloat(paymentPrice),
          date: paymentDate,
          id: Date.now().toString(),
        },
      ]);
      setPaymentName('');
      setPaymentPrice('');
      setPaymentDate(null);
    }
  };

  useEffect(() => {
    const today = new Date();
    const todayDate = today.getDate();

    const newProcessedPayments = monthlyPayments.filter((payment) => payment.date === todayDate);
    const newPayments = newProcessedPayments.map((payment) => ({
      name: payment.name,
      price: payment.price,
      id: Date.now().toString(),
    }));

    setProcessedPayments((prev) => [...prev, ...newPayments]);
  }, [monthlyPayments]);

  return {
    paymentName,
    setPaymentName,
    paymentPrice,
    setPaymentPrice,
    paymentDate,
    setPaymentDate,
    monthlyPayments,
    processedPayments,
    addPayment,
  };
}
