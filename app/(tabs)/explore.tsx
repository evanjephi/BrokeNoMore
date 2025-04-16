import React from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles, commonStyles } from '../../styles';
import { useRecurringPaymentManager } from '../../hooks/useRecurringPaymentManager';
import { ItemList } from '../../components/ItemList';
import { ThemedText } from '@/components/ThemedText';

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

  return (
    <LinearGradient colors={['#8B5CF6', '#5B21B6']} style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        Automatic Monthly Payments
      </ThemedText>
      <TextInput
        style={commonStyles.input}
        placeholder="Payment Name"
        placeholderTextColor="#666"
        value={paymentName}
        onChangeText={setPaymentName}
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Payment Price"
        placeholderTextColor="#666"
        value={paymentPrice}
        onChangeText={setPaymentPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={commonStyles.input}
        placeholder="Payment Date (1-31)"
        placeholderTextColor="#666"
        value={paymentDate ? paymentDate.toString() : ''}
        onChangeText={(text) => setPaymentDate(Number(text))}
        keyboardType="numeric"
      />
      <TouchableOpacity style={commonStyles.button} onPress={addPayment}>
        <ThemedText style={commonStyles.buttonText}>Add Payment</ThemedText>
      </TouchableOpacity>
      {monthlyPayments.length > 0 ? (
        <ItemList groupedItems={{ default: monthlyPayments }} />
      ) : (
        <ThemedText>No monthly payments yet.</ThemedText>
      )}
    </LinearGradient>
  );
}
