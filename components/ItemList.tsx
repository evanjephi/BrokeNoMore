import React from 'react';
import { FlatList, View } from 'react-native';
import { styles } from '../styles';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export function ItemList({ groupedItems }: { groupedItems: Record<string, { name: string; price: number; id: string }[]> }) {
  const sections = Object.entries(groupedItems);

  return (
    <FlatList
      data={sections}
      keyExtractor={([date]) => date}
      renderItem={({ item: [date, items] }) => (
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionHeader}>
            {date}
          </ThemedText>
          {items.map((item) => (
            <View key={item.id} style={styles.item}>
              <ThemedText>{item.name}</ThemedText>
              <ThemedText>${item.price.toFixed(2)}</ThemedText>
            </View>
          ))}
        </ThemedView>
      )}
    />
  );
}
