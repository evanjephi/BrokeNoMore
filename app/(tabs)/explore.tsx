import React from 'react';
import { TextInput, Button } from 'react-native';
import { styles } from '../../styles';
import { useColorScheme } from 'react-native';
import { useRecurringPaymentManager } from '../../hooks/useRecurringPaymentManager';
import { ItemList } from '../../components/ItemList';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function ExploreScreen() {
  const { paymentName, setPaymentName, paymentPrice, setPaymentPrice, payments, addPayment } =
    useRecurringPaymentManager();
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
      <Button title="Add Payment" onPress={addPayment} />
      <ItemList items={payments} />
    </ThemedView>
  );
}
