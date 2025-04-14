import React from 'react';
import { TextInput, Button } from 'react-native';
import { styles } from '../../styles';
import { useColorScheme } from 'react-native';
import { useRecurringPaymentManager } from '../../hooks/useRecurringPaymentManager';
import { ItemList } from '../../components/ItemList';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ExploreScreen() {
  const {
    paymentName,
    setPaymentName,
    paymentPrice,
    setPaymentPrice,
    paymentDate,
    setPaymentDate,
    monthlyPayments,
    addPayment,
  } = useRecurringPaymentManager();
  const theme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        Automatic Monthly Payments
      </ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Payment Name"
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
        value={paymentName}
        onChangeText={setPaymentName}
      />
      <TextInput
        style={styles.input}
        placeholder="Payment Price"
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
        value={paymentPrice}
        onChangeText={setPaymentPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Payment Date (1-31)"
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
        value={paymentDate ? paymentDate.toString() : ''}
        onChangeText={(text) => setPaymentDate(Number(text))}
        keyboardType="numeric"
      />
      <Button title="Add Payment" onPress={addPayment} />
      {monthlyPayments.length > 0 ? (
        <ItemList groupedItems={{ default: monthlyPayments }} />
      ) : (
        <ThemedText>No monthly payments yet.</ThemedText>
      )}
    </ThemedView>
  );
}
