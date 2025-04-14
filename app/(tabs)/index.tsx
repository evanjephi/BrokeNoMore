import React, { useEffect } from 'react';
import { TextInput, Button } from 'react-native';
import { styles } from '../../styles';
import { useColorScheme } from 'react-native';
import { useItemManager } from '../../hooks/useItemManager';
import { useRecurringPaymentManager } from '../../hooks/useRecurringPaymentManager';
import { ItemList } from '../../components/ItemList';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const { itemName, setItemName, itemPrice, setItemPrice, groupedItems, addItem } = useItemManager();
  const { processedPayments } = useRecurringPaymentManager();
  const theme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        BrokeNoMore
      </ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Item Price"
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
        value={itemPrice}
        onChangeText={setItemPrice}
        keyboardType="numeric"
      />
      <Button title="Add Item" onPress={addItem} />
      <ThemedText type="subtitle" style={styles.header}>
        Items
      </ThemedText>
      <ItemList groupedItems={groupedItems} />
      <ThemedText type="subtitle" style={styles.header}>
        Monthly Payments
      </ThemedText>
      <ItemList groupedItems={{ 'Monthly Payments': processedPayments }} />
    </ThemedView>
  );
}
