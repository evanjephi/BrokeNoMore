import React, { useEffect } from 'react';
import { TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { commonStyles, styles } from '../../styles';
import { useItemManager } from '../../hooks/useItemManager';
import { useBudgetManager } from '../../hooks/useBudgetManager';
import { ItemList } from '../../components/ItemList';
import { ThemedText } from '@/components/ThemedText';
import {ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';


export default function HomeScreen() {
  const { filterTag, setFilterTag, groupedItems } = useItemManager();
  const { budget, setBudget, spent, calculateSpent } = useBudgetManager();
  const backgroundColor = useThemeColor({}, 'background'); // Get theme-based background color
  const headerColor = useThemeColor({}, 'subTitleColor'); // Get theme-based header color

  const categories = ['All', 'Food', 'Grocery', 'Travel', 'Bills', 'Work', 'Other' ]; // Added "Grocery" to categories

  useEffect(() => {
    calculateSpent(groupedItems); // Calculate monthly spending
  }, [groupedItems]);

  const progress = budget ? Math.min((spent / budget) * 100, 100) : 0;

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <ThemedText type="subtitle" style={[styles.header, { color: headerColor }]}>
        Your Monthly Spendings
      </ThemedText>

      <TextInput
        style={[commonStyles.input, { backgroundColor }]}
        placeholder="Set Monthly Budget"
        placeholderTextColor="#666"
        value={budget ? budget.toString() : ''}
        onChangeText={(text) => setBudget(Number(text))}
        keyboardType="numeric"
      />

      <Picker
        selectedValue={filterTag}
        style={commonStyles.input}
        onValueChange={(value) => setFilterTag(value)}
      >
        {categories.map((category) => (
          <Picker.Item key={category} label={category} value={category === 'All' ? '' : category} />
        ))}
      </Picker>

      <ThemedView style={styles.budgetContainer}>
        <ThemedText type="defaultSemiBold">
          Your Total Spent: <ThemedText style={{ color: '#FACC15' }}>${spent.toFixed(2)}</ThemedText>
        </ThemedText>
        {budget && (
          <>
            <ThemedText type="defaultSemiBold">
              Monthly Budget: <ThemedText style={{ color: '#FACC15' }}>${budget.toFixed(2)}</ThemedText>
            </ThemedText>
            <ThemedView style={styles.progressBar}>
              <ThemedView
                style={[
                  styles.progress,
                  {
                    width: `${progress}%`, // Dynamically set the width based on progress
                    backgroundColor: progress > 80 ? '#EF4444' : '#A7F3D0', // Red for high progress, Light Mint otherwise
                  },
                ]}
              />
            </ThemedView>
            <ThemedText type="defaultSemiBold" style={{ color: '#FFFFFF', marginTop: 5 }}>
              Progress: {progress.toFixed(2)}% {/* Display progress percentage */}
            </ThemedText>
          </>
        )}
      </ThemedView>
      <ThemedText type="subtitle" style={[styles.header, { color: headerColor }]}>
        Expense Summary
      </ThemedText>
      <ItemList groupedItems={groupedItems} />
    </ThemedView>
  );
}
