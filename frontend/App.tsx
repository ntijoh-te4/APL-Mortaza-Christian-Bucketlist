import { useState } from "react";
import { StyleSheet, View } from "react-native";
import SearchBar from "./components/SearchBar";
import AddForm from "./components/AddForm";
import ItemList from "./components/ItemList";
import { TItem } from "./types/item";

export default function App() {
  const initialItems: TItem[] = [
    { id: 1, description: "Drive Jetski", isVisible: true },
    { id: 2, description: "Skydive", isVisible: true },
    { id: 3, description: "Become president", isVisible: true },
  ];

  const [items, setItems] = useState(initialItems);
  const [searchTerm, setSearchTerm] = useState("");

  function addItem(description: string): void {
    const id = Math.floor(Math.random() * 10000);
    const newItem: TItem = { id, description, isVisible: true };
    setItems([...items, newItem]);
  }

  function deleteItem(id: number): void {
    setItems(items.filter((fakeItem) => fakeItem.id !== id));
  }

  return (
    <View style={styles.container}>
      <SearchBar setSearchTerm={setSearchTerm} />
      <AddForm onAdd={addItem} />
      <ItemList
        items={items}
        setItems={setItems}
        onDelete={deleteItem}
        searchTerm={searchTerm}
      />
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
