import React from 'react';
import { FlatList } from 'react-native';
import { styles } from '../styles';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export function ItemList({ groupedItems }: { groupedItems: Record<string, { name: string; price: number; id: string; tag?: string }[]> }) {
  const textColor = useThemeColor({}, 'text'); // Dynamic text color

  const sections = Object.entries(groupedItems); // Already sorted in descending order in useItemManager

  return (
    <FlatList
      data={sections}
      keyExtractor={([date]) => date}
      renderItem={({ item: [date, items] }) => {
        const total = items.reduce((sum, item) => sum + item.price, 0); // Calculate total for the day
        return (
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={[styles.sectionHeader, { color: textColor }]}>
              {date}
            </ThemedText>
            {items.map((item) => (
              <ThemedView key={item.id} style={styles.item}>
                <ThemedText style={[styles.itemName, { color: textColor }]}>
                  {item.name}
                  {item.tag && (
                    <ThemedText style={[styles.itemName, { fontStyle: 'italic', color: '#A7F3D0' }]}>
                      ({item.tag})
                    </ThemedText>
                  )}
                </ThemedText>
                <ThemedText style={[styles.itemPrice, { color: textColor }]}>
                  ${item.price.toFixed(2)}
                </ThemedText>
              </ThemedView>
            ))}
            <ThemedView style={styles.total}>
              <ThemedText style={[styles.totalText, { color: textColor }]}>
                Total:
              </ThemedText>
              <ThemedText style={[styles.totalText, { color: textColor }]}>
                ${total.toFixed(2)}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        );
      }}
    />
  );
}
