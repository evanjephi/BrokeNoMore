import React, { useEffect } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { commonStyles, styles } from '../../styles';
import { useItemManager } from '../../hooks/useItemManager';
import { useBudgetManager } from '../../hooks/useBudgetManager';
import { ItemList } from '../../components/ItemList';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
  const { itemName, setItemName, itemPrice, setItemPrice, groupedItems, addItem } = useItemManager();
  const { budget, setBudget, spent, calculateSpent } = useBudgetManager();

  useEffect(() => {
    calculateSpent(groupedItems); // Calculate monthly spending
  }, [groupedItems]);

  const progress = budget ? Math.min((spent / budget) * 100, 100) : 0;

  return (
    <LinearGradient colors={['#8B5CF6', '#5B21B6']} style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        Your Monthly Spendings
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
      <TextInput
        style={commonStyles.input}
        placeholder="Set Monthly Budget"
        placeholderTextColor="#666"
        value={budget ? budget.toString() : ''}
        onChangeText={(text) => setBudget(Number(text))}
        keyboardType="numeric"
      />
      <View style={styles.budgetContainer}>
        <ThemedText type="defaultSemiBold" style={{ color: '#FFFFFF' }}>
          Spent: ${spent.toFixed(2)}
        </ThemedText>
        {budget && (
          <>
            <ThemedText type="defaultSemiBold" style={{ color: '#FFFFFF' }}>
              Budget: ${budget.toFixed(2)}
            </ThemedText>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progress,
                  { width: `${progress}%`, backgroundColor: progress > 80 ? 'red' : '#34D399' },
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
    </LinearGradient>
  );
}
