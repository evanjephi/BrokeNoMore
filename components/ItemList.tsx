import React from 'react';
import { FlatList } from 'react-native';
import { styles } from '../styles';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export function ItemList({ items }: { items: { name: string; price: number; id: string }[] }) {
  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ThemedView style={styles.item}>
          <ThemedText>{item.name}</ThemedText>
          <ThemedText>${item.price.toFixed(2)}</ThemedText>
        </ThemedView>
      )}
    />
  );
}
