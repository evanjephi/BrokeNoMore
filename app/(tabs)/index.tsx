import React, { useEffect } from 'react';
import { TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import { commonStyles, styles } from '../../styles';
import { useItemManager } from '../../hooks/useItemManager';
import { useBudgetManager } from '../../hooks/useBudgetManager';
import { ItemList } from '../../components/ItemList';
import { ThemedText } from '@/components/ThemedText';

export default function HomeScreen() {
  const { filterTag, setFilterTag, groupedItems } = useItemManager();
  const { budget, setBudget, spent, calculateSpent } = useBudgetManager();

  const categories = ['All', 'Food', 'Travel', 'Bills', 'Work', 'Other']; // Predefined categories with "All" option

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

      <View style={styles.budgetContainer}>
        <ThemedText type="defaultSemiBold" style={{ color: '#FFFFFF' }}>
          Your Total Spent: <ThemedText style={{ color: '#FACC15' }}>${spent.toFixed(2)}</ThemedText>
        </ThemedText>
        {budget && (
          <>
            <ThemedText type="defaultSemiBold" style={{ color: '#FFFFFF' }}>
              Monthly Budget: <ThemedText style={{ color: '#FACC15' }}>${budget.toFixed(2)}</ThemedText>
            </ThemedText>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progress,
                  {
                    width: `${progress}%`, // Dynamically set the width based on progress
                    backgroundColor: progress > 80 ? '#EF4444' : '#A7F3D0', // Red for high progress, Light Mint otherwise
                  },
                ]}
              />
            </View>
            <ThemedText type="defaultSemiBold" style={{ color: '#FFFFFF', marginTop: 5 }}>
              Progress: {progress.toFixed(2)}% {/* Display progress percentage */}
            </ThemedText>
          </>
        )}
      </View>
      <ThemedText type="subtitle" style={styles.header}>
        Expense Summary
      </ThemedText>
      <ItemList groupedItems={groupedItems} />
    </LinearGradient>
  );
}
