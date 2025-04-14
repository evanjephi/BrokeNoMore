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
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        BrokeNoMore
      </ThemedText>
      <TextInput
        style={[styles.input, { color: theme === 'dark' ? '#fff' : '#000' }]}
        placeholder="Item Name"
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={[styles.input, { color: theme === 'dark' ? '#fff' : '#000' }]}
        placeholder="Item Price"
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
        value={itemPrice}
        onChangeText={setItemPrice}
        keyboardType="numeric"
      />
      <Button title="Add Item" onPress={addItem} />
      <ItemList items={items} />
    </ThemedView>
  );
}
