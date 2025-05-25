import React, { useEffect } from 'react';
import { TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { commonStyles, styles } from '../../styles';
import { useItemManager } from '../../hooks/useItemManager';
import { useBudgetManager } from '../../hooks/useBudgetManager';
import { ItemList } from '../../components/ItemList';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function HomeScreen() {
  const { filterTag, setFilterTag, groupedItems, addItem } = useItemManager();
  const { budget, setBudget, spent, calculateSpent } = useBudgetManager();
  const backgroundColor = useThemeColor({}, 'background');
  const rawTextColor = useThemeColor({}, 'text');
  const textColor = typeof rawTextColor === 'string' ? rawTextColor : '#000';

  const categories = ['All', 'Food', 'Grocery', 'Travel', 'Bills', 'Work', 'Other'];

  useEffect(() => {
    calculateSpent(groupedItems);
  }, [groupedItems]);

  const handleAddItem = () => {
    addItem();
  };

  const progress = budget ? Math.min((spent / budget) * 100, 100) : 0;

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <ThemedText type="title" style={[styles.header, { color: textColor }]}>
        Monthly Budget Overview
      </ThemedText>

      <TextInput
        style={[commonStyles.input, { color: textColor }]}
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
        <ThemedText type="defaultSemiBold" style={{ color: textColor }}>
          {`Total Spent: $${spent.toFixed(2)}`}
        </ThemedText>

        {budget && (
          <>
            <ThemedText type="defaultSemiBold" style={{ color: textColor }}>
              {`Budget: $${budget.toFixed(2)}`}
            </ThemedText>

            <ThemedView style={styles.progressBar}>
              <ThemedView
                style={[
                  styles.progress,
                  {
                    width: `${progress}%`,
                    backgroundColor: progress > 80 ? '#EF4444' : '#A7F3D0',
                  },
                ]}
              />
            </ThemedView>

            <ThemedText type="defaultSemiBold" style={{ marginTop: 5, color: textColor }}>
              {`Progress: ${progress.toFixed(2)}%`}
            </ThemedText>
          </>
        )}
      </ThemedView>

      <ThemedText type="subtitle" style={[styles.header, { color: textColor }]}>
        Expense Summary
      </ThemedText>
      
      <ItemList groupedItems={groupedItems} />
    </ThemedView>
  );
}
