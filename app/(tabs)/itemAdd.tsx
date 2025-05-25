import React, { useEffect } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { commonStyles, styles } from '../../styles';
import { useItemManager } from '../../hooks/useItemManager';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function HomeScreen() {
  const backgroundColor = useThemeColor({}, 'background'); // Get theme-based background color
  const { itemName, setItemName, itemPrice, setItemPrice, itemTag, setItemTag, addItem } = useItemManager();

  const categories = ['All', 'Food', 'Grocery', 'Bills', 'Car Expense', 'Travel', 'Work', 'Other']; // Added "Grocery" to categories

  const handleAddItem = () => {
    addItem(); // Add the item
    setItemName(''); // Reset the item name
    setItemPrice(''); // Reset the item price
    setItemTag(''); // Reset the item tag
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <ThemedText type="title" style={styles.header}>
        Daily Spending Tracker
      </ThemedText>

      <ThemedView style={[styles.section, { marginBottom: 20 }]}>
        <ThemedText type="subtitle" style={styles.sectionHeader}>
          Add New Spending
        </ThemedText>

        <TextInput
          style={commonStyles.input}
          placeholder="Item Name"
          placeholderTextColor="#666"
          value={itemName}
          onChangeText={setItemName}
        />
        <TextInput
          style={commonStyles.input}
          placeholder="Item Price"
          placeholderTextColor="#666"
          value={itemPrice}
          onChangeText={setItemPrice}
          keyboardType="numeric"
        />
        <Picker
          selectedValue={itemTag}
          style={commonStyles.input}
          onValueChange={(value) => setItemTag(value)}
        >
          <Picker.Item label="Select Category" value="" />
          {categories.map((category) => (
            <Picker.Item key={category} label={category} value={category} />
          ))}
        </Picker>

        <TouchableOpacity style={commonStyles.button} onPress={handleAddItem}>
          <ThemedText style={commonStyles.buttonText}>Add Item</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}