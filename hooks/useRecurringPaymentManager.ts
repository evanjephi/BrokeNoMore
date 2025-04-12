import { useState } from 'react';

export function useRecurringPaymentManager() {
  const [paymentName, setPaymentName] = useState('');
  const [paymentPrice, setPaymentPrice] = useState('');
  const [payments, setPayments] = useState<{ name: string; price: number; id: string }[]>([]);

  const addPayment = () => {
    if (paymentName && paymentPrice) {
      setPayments([
        ...payments,
        { name: paymentName, price: parseFloat(paymentPrice), id: Date.now().toString() },
      ]);
      setPaymentName('');
      setPaymentPrice('');
    }
  };

  return {
    paymentName,
    setPaymentName,
    paymentPrice,
    setPaymentPrice,
    payments,
    addPayment,
  };
}
