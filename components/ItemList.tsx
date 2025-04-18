import React from 'react';
import { FlatList, View } from 'react-native';
import { styles } from '../styles';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export function ItemList({ groupedItems }: { groupedItems: Record<string, { name: string; price: number; id: string; tag?: string }[]> }) {
  const sections = Object.entries(groupedItems);

  return (
    <FlatList
      data={sections}
      keyExtractor={([date]) => date}
      renderItem={({ item: [date, items] }) => {
        const total = items.reduce((sum, item) => sum + item.price, 0); // Calculate total for the day
        return (
          <ThemedView style={styles.section}>
            <ThemedText type="subtitle" style={styles.sectionHeader}>
              {date}
            </ThemedText>
            {items.map((item) => (
              <View key={item.id} style={styles.item}>
                <ThemedText style={styles.itemName}>
                  {item.name}
                  {item.tag && (
                    <ThemedText style={[styles.itemName, { fontStyle: 'italic', color: '#A7F3D0' }]}>
                      ({item.tag})
                    </ThemedText>
                  )}
                </ThemedText>
                <ThemedText style={styles.itemPrice}>${item.price.toFixed(2)}</ThemedText>
              </View>
            ))}
            <View style={styles.total}>
              <ThemedText type="defaultSemiBold" style={{ color: '#FFFFFF' }}>Total:</ThemedText>
              <ThemedText type="defaultSemiBold" style={{ color: '#FACC15' }}>${total.toFixed(2)}</ThemedText>
            </View>
          </ThemedView>
        );
      }}
    />
  );
}
