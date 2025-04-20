import React from 'react';
import { TextInput, Button } from 'react-native';
import { styles } from './styles';
import { useItemManager } from './hooks/useItemManager';
import { ItemList } from './components/ItemList';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from 'react-native';

export default function App() {
  const { itemName, setItemName, itemPrice, setItemPrice, items, addItem } = useItemManager();
  const theme = useColorScheme();

  return (
    <ThemedView
      style={[
        styles.container,
        {
          backgroundColor: theme === 'dark' ? '#5B21B6' : '#8B5CF6', // Adjust background for dark and light modes
        },
      ]}
    >
      <ThemedText type="title" style={[styles.header, { color: theme === 'dark' ? '#FFFFFF' : '#1F2937' }]}>
        BrokeNoMore
      </ThemedText>
      <TextInput
        style={[
          styles.input,
          {
            color: theme === 'dark' ? '#FFFFFF' : '#1F2937', // Adjust text color for dark and light modes
            backgroundColor: theme === 'dark' ? '#4C1D95' : '#FFFFFF', // Adjust input background
          },
        ]}
        placeholder="Item Name"
        placeholderTextColor={theme === 'dark' ? '#AAA' : '#666'}
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={[
          styles.input,
          {
            color: theme === 'dark' ? '#FFFFFF' : '#1F2937', // Adjust text color for dark and light modes
            backgroundColor: theme === 'dark' ? '#4C1D95' : '#FFFFFF', // Adjust input background
          },
        ]}
        placeholder="Item Price"
        placeholderTextColor={theme === 'dark' ? '#AAA' : '#666'}
        value={itemPrice}
        onChangeText={setItemPrice}
        keyboardType="numeric"
      />
      <Button title="Add Item" onPress={addItem} />
      <ItemList items={items} />
    </ThemedView>
  );
}
