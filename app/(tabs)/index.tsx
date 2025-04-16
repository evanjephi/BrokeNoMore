import React, { useEffect } from 'react';
import { TextInput, Button, View } from 'react-native';
import { styles } from '../../styles';
import { useColorScheme } from 'react-native';
import { useItemManager } from '../../hooks/useItemManager';
import { useBudgetManager } from '../../hooks/useBudgetManager';
import { ItemList } from '../../components/ItemList';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const { itemName, setItemName, itemPrice, setItemPrice, groupedItems, addItem } = useItemManager();
  const { budget, setBudget, spent, calculateSpent } = useBudgetManager();
  const theme = useColorScheme();

  useEffect(() => {
    calculateSpent(groupedItems);
  }, [groupedItems]);

  const progress = budget ? Math.min((spent / budget) * 100, 100) : 0;

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        Your Daily Spendings
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
      <TextInput
        style={[styles.input, { color: theme === 'dark' ? '#fff' : '#000' }]}
        placeholder="Set Daily Budget"
        placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
        value={budget ? budget.toString() : ''}
        onChangeText={(text) => setBudget(Number(text))}
        keyboardType="numeric"
      />
      <View style={styles.budgetContainer}>
        <ThemedText type="defaultSemiBold">Spent: ${spent.toFixed(2)}</ThemedText>
        {budget && (
          <>
            <ThemedText type="defaultSemiBold">Budget: ${budget.toFixed(2)}</ThemedText>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progress,
                  { width: `${progress}%`, backgroundColor: progress > 80 ? 'red' : 'green' },
                ]}
              />
            </View>
          </>
        )}
      </View>
      <ThemedText type="subtitle" style={styles.header}>
        Items
      </ThemedText>
      <ItemList groupedItems={groupedItems} />
    </ThemedView>
  );
}
