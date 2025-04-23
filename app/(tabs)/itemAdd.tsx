import React, { useEffect } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, styles } from '../../styles';
import { useItemManager } from '../../hooks/useItemManager';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
    const { itemName, setItemName, itemPrice, setItemPrice, addItem } = useItemManager();
    
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
  
      <TouchableOpacity style={commonStyles.button} onPress={addItem}>
        <ThemedText style={commonStyles.buttonText}>Add Item</ThemedText>
      </TouchableOpacity>
      </View>
        </LinearGradient>
    )
}