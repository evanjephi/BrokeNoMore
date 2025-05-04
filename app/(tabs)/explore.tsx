import React, { useState } from 'react';
import { TextInput, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { styles, commonStyles } from '../../styles';
import { useRecurringPaymentManager } from '../../hooks/useRecurringPaymentManager';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

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

  const backgroundColor = useThemeColor({}, 'background'); // Get theme-based background color
  const textColor = useThemeColor({}, 'text'); // Get theme-based text color
  const modalBackgroundColor = useThemeColor({}, 'background');
  const cancelButtonColor = useThemeColor({}, 'tint');
  const removeButtonColor = useThemeColor({}, 'error');

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <ScrollView>
        {/* Header Section */}
        <ThemedText type="title" style={[styles.header, { color: textColor }]}>
          Manage Recurring Payments
        </ThemedText>

        {/* Input Section */}
        <ThemedView style={[styles.section, { marginBottom: 20 }]}>
          <ThemedText type="subtitle" style={[styles.sectionHeader, { color: textColor }]}>
            Add New Payment
          </ThemedText>
          <TextInput
            style={[commonStyles.input, { color: textColor }]}
            placeholder="Payment Name"
            placeholderTextColor="#666"
            value={paymentName}
            onChangeText={setPaymentName}
          />
          <TextInput
            style={[commonStyles.input, { color: textColor }]}
            placeholder="Payment Price"
            placeholderTextColor="#666"
            value={paymentPrice}
            onChangeText={setPaymentPrice}
            keyboardType="numeric"
          />
          <TextInput
            style={[commonStyles.input, { color: textColor }]}
            placeholder="Payment Date (1-31)"
            placeholderTextColor="#666"
            value={paymentDate ? paymentDate.toString() : ''}
            onChangeText={(text) => setPaymentDate(Number(text))}
            keyboardType="numeric"
          />
          <Picker
            selectedValue={recurrence}
            style={[commonStyles.input, { color: textColor }]}
            onValueChange={(itemValue) => setRecurrence(itemValue)}
          >
            <Picker.Item label="Monthly" value="monthly" />
            <Picker.Item label="Weekly" value="weekly" />
            <Picker.Item label="Bi-Weekly" value="bi-weekly" />
          </Picker>
          <TouchableOpacity style={commonStyles.button} onPress={addPayment}>
            <ThemedText style={commonStyles.buttonText}>Add Payment</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Payments List Section */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={[styles.sectionHeader, { color: textColor }]}>
            Existing Payments
          </ThemedText>
          {monthlyPayments.length > 0 ? (
            monthlyPayments.map((payment) => (
              <ThemedView key={payment.id} style={[styles.item, { paddingVertical: 10 }]}>
                <ThemedView style={{ flex: 3, marginRight: 10 }}>
                  <ThemedText style={[styles.itemName, { color: textColor }]}>
                    {payment.name}
                  </ThemedText>
                  <ThemedText style={[styles.itemPrice, { color: textColor }]}>
                    ${payment.price ? payment.price.toFixed(2) : '0.00'} {/* Ensure price is valid */}
                  </ThemedText>
                  <ThemedText style={{ color: '#A7F3D0', fontSize: 14 }}>
                    Recurs on: {payment.date}th of each month {/* Display the recurring date */}
                  </ThemedText>
                </ThemedView>
                <ThemedView style={[styles.buttonGroup, { flex: 1 }]}>
                  <TouchableOpacity onPress={() => togglePausePayment(payment.id)} style={styles.pauseButton}>
                    <ThemedText style={commonStyles.buttonText}>
                      {payment.paused ? 'Resume' : 'Pause'}
                    </ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => openEditModal(payment)} style={styles.editButton}>
                    <ThemedText style={commonStyles.buttonText}>Edit</ThemedText>
                  </TouchableOpacity>
                </ThemedView>
              </ThemedView>
            ))
          ) : (
            <ThemedText style={{ color: textColor }}>No recurring payments yet.</ThemedText>
          )}
        </ThemedView>
      </ScrollView>

      {/* Edit Modal */}
      <Modal visible={isEditModalVisible} transparent animationType="slide">
        <ThemedView style={styles.modalContainer}>
          <ThemedView style={[styles.modalContent, { backgroundColor: modalBackgroundColor }]}>
            <ThemedText type="title" style={[styles.header, { color: textColor }]}>
              Edit Payment
            </ThemedText>
            <TextInput
              style={[commonStyles.input, { width: '100%', color: textColor }]}
              placeholder="Payment Name"
              placeholderTextColor="#666"
              value={editName}
              onChangeText={setEditName}
            />
            <TextInput
              style={[commonStyles.input, { width: '100%', color: textColor }]}
              placeholder="Payment Price"
              placeholderTextColor="#666"
              value={editPrice}
              onChangeText={setEditPrice}
              keyboardType="numeric"
            />
            <ThemedView style={styles.buttonGroup}>
              <TouchableOpacity style={[styles.smallButton, { flex: 1 }]} onPress={saveEdit}>
                <ThemedText style={commonStyles.buttonText}>Save</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallButton, { flex: 1, backgroundColor: cancelButtonColor }]}
                onPress={() => setEditModalVisible(false)}
              >
                <ThemedText style={commonStyles.buttonText}>Cancel</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallButton, { flex: 1, backgroundColor: removeButtonColor }]}
                onPress={removeEdit}
              >
                <ThemedText style={commonStyles.buttonText}>Remove</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Modal>
    </ThemedView>
  );
}
