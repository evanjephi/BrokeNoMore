import React from 'react';
import { TextInput, Button } from 'react-native';
import { styles } from './styles';
import { useItemManager } from './hooks/useItemManager';
import { ItemList } from './components/ItemList';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function App() {
  const { itemName, setItemName, itemPrice, setItemPrice, items, addItem } = useItemManager();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        BrokeNoMore
      </ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        placeholderTextColor="#aaa"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Item Price"
        placeholderTextColor="#aaa"
        value={itemPrice}
        onChangeText={setItemPrice}
        keyboardType="numeric"
      />
      <Button title="Add Item" onPress={addItem} />
      <ItemList items={items} />
    </ThemedView>
  );
}
