import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Modal, ScrollView } from 'react-native';
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
    removePayment,
  } = useRecurringPaymentManager();

  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [editPaymentId, setEditPaymentId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');

  const openEditModal = (payment: { id: string; name: string; price: number }) => {
    setEditPaymentId(payment.id);
    setEditName(payment.name);
    setEditPrice(payment.price ? payment.price.toString() : ''); // Ensure price is a string or empty
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

  const removeEdit = () => {
    if (editPaymentId) {
      removePayment(editPaymentId);
      setEditModalVisible(false);
      setEditPaymentId(null);
      setEditName('');
      setEditPrice('');
    }
  };

  return (
    <LinearGradient colors={['#8B5CF6', '#5B21B6']} style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <ThemedText type="title" style={styles.header}>
          Manage Recurring Payments
        </ThemedText>

        {/* Input Section */}
        <View style={[styles.section, { marginBottom: 20 }]}>
          <ThemedText type="subtitle" style={styles.sectionHeader}>
            Add New Payment
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
        </View>

        {/* Payments List Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionHeader}>
            Existing Payments
          </ThemedText>
          {monthlyPayments.length > 0 ? (
            monthlyPayments.map((payment) => (
              <View key={payment.id} style={[styles.item, { paddingVertical: 10 }]}>
                <View style={{ flex: 3, marginRight: 10 }}>
                  <ThemedText style={styles.itemName}>{payment.name}</ThemedText>
                  <ThemedText style={styles.itemPrice}>
                    ${payment.price ? payment.price.toFixed(2) : '0.00'} {/* Ensure price is valid */}
                  </ThemedText>
                  <ThemedText style={{ color: '#A7F3D0', fontSize: 14 }}>
                    Recurs on: {payment.date}th of each month {/* Display the recurring date */}
                  </ThemedText>
                </View>
                <View style={[styles.buttonGroup, { flex: 1 }]}>
                  <TouchableOpacity onPress={() => togglePausePayment(payment.id)} style={styles.pauseButton}>
                    <ThemedText style={commonStyles.buttonText}>
                      {payment.paused ? 'Resume' : 'Pause'}
                    </ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => openEditModal(payment)} style={styles.editButton}>
                    <ThemedText style={commonStyles.buttonText}>Edit</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <ThemedText>No recurring payments yet.</ThemedText>
          )}
        </View>
      </ScrollView>

      {/* Edit Modal */}
      <Modal visible={isEditModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText type="title" style={styles.header}>
              Edit Payment
            </ThemedText>
            <TextInput
              style={[commonStyles.input, { width: '100%' }]} // Ensure consistent width
              placeholder="Payment Name"
              placeholderTextColor="#666"
              value={editName}
              onChangeText={setEditName}
            />
            <TextInput
              style={[commonStyles.input, { width: '100%' }]} // Ensure consistent width
              placeholder="Payment Price"
              placeholderTextColor="#666"
              value={editPrice}
              onChangeText={setEditPrice}
              keyboardType="numeric"
            />
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={[styles.smallButton, { flex: 1 }]} onPress={saveEdit}>
                <ThemedText style={commonStyles.buttonText}>Save</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallButton, { flex: 1, backgroundColor: '#FDBA74' }]}
                onPress={() => setEditModalVisible(false)}
              >
                <ThemedText style={commonStyles.buttonText}>Cancel</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallButton, { flex: 1, backgroundColor: '#EF4444' }]} // Red button for remove
                onPress={removeEdit}
              >
                <ThemedText style={commonStyles.buttonText}>Remove</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}
