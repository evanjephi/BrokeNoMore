import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { styles, commonStyles } from '../../styles';
import { useRecurringPaymentManager } from '../../hooks/useRecurringPaymentManager';
import { ThemedText } from '@/components/ThemedText';

export default function ExploreScreen() {
  const {
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
    togglePausePayment,
    editPayment,
  } = useRecurringPaymentManager();

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editPaymentId, setEditPaymentId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');

  const openEditModal = (payment: { id: string; name: string; price: number }) => {
    setEditPaymentId(payment.id);
    setEditName(payment.name);
    setEditPrice(payment.price.toString());
    setEditModalVisible(true);
  };

  const saveEdit = () => {
    if (editPaymentId) {
      editPayment(editPaymentId, { name: editName, price: parseFloat(editPrice) });
      setEditModalVisible(false);
      setEditPaymentId(null);
      setEditName('');
      setEditPrice('');
    }
  };

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
      <Picker
        selectedValue={recurrence}
        style={commonStyles.input}
        onValueChange={(itemValue) => setRecurrence(itemValue)}
      >
        <Picker.Item label="Monthly" value="monthly" />
        <Picker.Item label="Weekly" value="weekly" />
        <Picker.Item label="Bi-Weekly" value="bi-weekly" />
      </Picker>
      <TouchableOpacity style={commonStyles.button} onPress={addPayment}>
        <ThemedText style={commonStyles.buttonText}>Add Payment</ThemedText>
      </TouchableOpacity>
      {monthlyPayments.length > 0 ? (
        monthlyPayments.map((payment) => (
          <View key={payment.id} style={styles.item}>
            <View style={{ flex: 1 }}>
              <ThemedText style={styles.itemName}>{payment.name}</ThemedText>
              <ThemedText style={styles.itemPrice}>${payment.price.toFixed(2)}</ThemedText>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={() => togglePausePayment(payment.id)} style={styles.smallButton}>
                <ThemedText style={commonStyles.buttonText}>
                  {payment.paused ? 'Resume' : 'Pause'}
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openEditModal(payment)} style={styles.smallButton}>
                <ThemedText style={commonStyles.buttonText}>Edit</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <ThemedText>No monthly payments yet.</ThemedText>
      )}

      {/* Edit Modal */}
      <Modal visible={isEditModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText type="title" style={styles.header}>
              Edit Payment
            </ThemedText>
            <TextInput
              style={commonStyles.input}
              placeholder="Payment Name"
              placeholderTextColor="#666"
              value={editName}
              onChangeText={setEditName}
            />
            <TextInput
              style={commonStyles.input}
              placeholder="Payment Price"
              placeholderTextColor="#666"
              value={editPrice}
              onChangeText={setEditPrice}
              keyboardType="numeric"
            />
            <TouchableOpacity style={commonStyles.button} onPress={saveEdit}>
              <ThemedText style={commonStyles.buttonText}>Save</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[commonStyles.button, { backgroundColor: 'red' }]}
              onPress={() => setEditModalVisible(false)}
            >
              <ThemedText style={commonStyles.buttonText}>Cancel</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}
