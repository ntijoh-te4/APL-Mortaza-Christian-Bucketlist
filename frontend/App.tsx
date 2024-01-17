import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SearchBar from "./components/SearchBar";
import AddForm from "./components/AddForm";
import ItemList from "./components/ItemList";

export default function App() {
  const initialItems = [
    { id: 1, description: "Drive Jetski" },
    { id: 2, description: "Skydive" },
    { id: 3, description: "Become president" },
  ];

  const [items, setItems] = useState(initialItems);

  function addItem(item: object) {
    const id = Math.floor(Math.random() * 10000);
    const newItem = { id, ...item };
    setItems([...items, newItem]);
  }

  function deleteItem(id: number): void {
    setItems(items.filter((fakeItem) => fakeItem.id !== id));
  }

  return (
    <View style={styles.container}>
      <SearchBar items={items} setItems={setItems} initialItems={initialItems}/>
      <AddForm onAdd={addItem} />
      <ItemList items={items} onDelete={deleteItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
