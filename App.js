import React, { useState } from 'react';
import { Text, View, TextInput, Button, FlatList } from 'react-native';
import { styles } from './styles';

export default function App() {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [items, setItems] = useState([]);

  const addItem = () => {
    if (itemName && itemPrice) {
      setItems([...items, { name: itemName, price: parseFloat(itemPrice), id: Date.now().toString() }]);
      setItemName('');
      setItemPrice('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>BrokeNoMore</Text>
      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}
      />
      <TextInput
        style={styles.input}
        placeholder="Item Price"
        value={itemPrice}
        onChangeText={setItemPrice}
        keyboardType="numeric"
      />
      <Button title="Add Item" onPress={addItem} />
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>${item.price.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );
}
