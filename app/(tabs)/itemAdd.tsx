import React, { useEffect } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { commonStyles, styles } from '../../styles';
import { useItemManager } from '../../hooks/useItemManager';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
    const { itemName, setItemName, itemPrice, setItemPrice, itemTag, setItemTag, addItem } = useItemManager();
    
    const categories = ['Food', 'Travel', 'Bills', 'Work', 'Other']; // Predefined categories

    const handleAddItem = () => {
        addItem();
        setItemName('');
        setItemPrice('');
        setItemTag('');
    };

    return (
        <LinearGradient colors={['#8B5CF6', '#5B21B6']} style={styles.container}>
            <ThemedText type="title" style={styles.header}>
                Daily Spending Tracker
           </ThemedText>

             <View style={[styles.section, { marginBottom: 20 }]}>
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
      </View>
        </LinearGradient>
    )
}