import React from 'react';
import { TextInput, Button } from 'react-native';
import { styles } from './styles';
import { useItemManager } from './hooks/useItemManager';
import { ItemList } from './components/ItemList';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function App() {
  const { itemName, setItemName, itemPrice, setItemPrice, items, addItem } = useItemManager();
  const backgroundColor = useThemeColor({}, 'background'); // Dynamic background color
  const textColor = useThemeColor({}, 'text'); // Dynamic text color
  const inputBackgroundColor = useThemeColor({}, 'backgroundSecondary'); // Dynamic input background color
  const placeholderColor = useThemeColor({}, 'icon'); // Dynamic placeholder color

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}> {/* Dynamic background */}
      <ThemedText type="title" style={[styles.header, { color: textColor }]}> {/* Dynamic text color */}
        BrokeNoMore
      </ThemedText>
      <TextInput
        style={[
          styles.input,
          {
            color: textColor, // Dynamic text color
            backgroundColor: inputBackgroundColor, // Dynamic input background
          },
        ]}
        placeholder="Item Name"
        placeholderTextColor={placeholderColor} // Dynamic placeholder color
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={[
          styles.input,
          {
            color: textColor, // Dynamic text color
            backgroundColor: inputBackgroundColor, // Dynamic input background
          },
        ]}
        placeholder="Item Price"
        placeholderTextColor={placeholderColor} // Dynamic placeholder color
        value={itemPrice}
        onChangeText={setItemPrice}
        keyboardType="numeric"
      />
      <Button title="Add Item" onPress={addItem} />
      <ItemList items={items} />
    </ThemedView>
  );
}
