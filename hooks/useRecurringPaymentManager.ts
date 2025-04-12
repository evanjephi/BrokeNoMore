import { useState, useEffect } from 'react';

export function useRecurringPaymentManager() {
  const [paymentName, setPaymentName] = useState('');
  const [paymentPrice, setPaymentPrice] = useState('');
  const [payments, setPayments] = useState<{ name: string; price: number; id: string }[]>([]);
  const [recurringPayments, setRecurringPayments] = useState<
    { name: string; price: number; date: number; id: string }[]
  >([]);

  const addPayment = () => {
    if (paymentName && paymentPrice) {
      setRecurringPayments([
        ...recurringPayments,
        {
          name: paymentName,
          price: parseFloat(paymentPrice),
          date: new Date().getDate(), // Default to today's date
          id: Date.now().toString(),
        },
      ]);
      setPaymentName('');
      setPaymentPrice('');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date();
      const todayDate = today.getDate();

      const newPayments = recurringPayments.filter((payment) => {
        if (payment.date === todayDate) {
          setPayments((prev) => [
            ...prev,
            { name: payment.name, price: payment.price, id: Date.now().toString() },
          ]);
          return true;
        }
        return false;
      });

      // Optionally log or handle newPayments if needed
    }, 24 * 60 * 60 * 1000); // Check once a day

    return () => clearInterval(interval);
  }, [recurringPayments]);

  return {
    paymentName,
    setPaymentName,
    paymentPrice,
    setPaymentPrice,
    payments,
    addPayment,
  };
}
