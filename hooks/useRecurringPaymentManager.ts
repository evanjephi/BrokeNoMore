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

    // Filter payments that match today's date
    const newProcessedPayments = monthlyPayments.filter((payment) => payment.date === todayDate);

    // Avoid duplicate entries in processedPayments
    const uniquePayments = newProcessedPayments.filter(
      (payment) => !processedPayments.some((p) => p.name === payment.name && p.price === payment.price)
    );

    // Add unique payments to processedPayments
    if (uniquePayments.length > 0) {
      setProcessedPayments((prev) => [
        ...prev,
        ...uniquePayments.map((payment) => ({
          name: payment.name,
          price: payment.price,
          id: Date.now().toString(),
        })),
      ]);
    }
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
