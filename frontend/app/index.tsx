import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import SearchBar from "../components/SearchBar";
import AddForm from "../components/AddForm";
import ItemList from "../components/ItemList";
import { TItem, TItemTemplate } from "../types/item";

function toDefaults(items: TItemTemplate[]): TItem[] {
  return items.map((item) => {
    return {
      ...item,
      isVisible: true,
    };
  });
}

async function getItems(): Promise<TItem[]> {
  const res = await fetch("https://localhost:7148/api/TodoItems");
  const data = await res.json();
  const items = toDefaults(await data);
  return items;
}

export default function App() {
  const [items, setItems] = useState<TItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchInitialItems = async () => {
      const initialItems = await getItems();
      setItems(initialItems);
    };

    fetchInitialItems();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  function addItem(description: string): void {
    const id = Math.floor(Math.random() * 10000);
    const newItem: TItem = {
      id,
      description,
      isVisible: true,
      isComplete: false,
    };
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
