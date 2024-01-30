import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import SearchBar from "../components/SearchBar";
import AddForm from "../components/AddForm";
import ItemList from "../components/ItemList";
import { TItem, TItemTemplate } from "../types/item";
import { TBackendItem } from "../types/backendItem";

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
  const items = toDefaults(data);
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

  async function addItem(description: string): Promise<void> {
    const postNewItem: Response = await fetch(
      "https://localhost:7148/api/TodoItems",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ description }),
      },
    );

    if (postNewItem.ok) {
      const backendItem: TBackendItem = await postNewItem.json();
      const newItem: TItem = {
        id: backendItem.id,
        description: backendItem.description,
        isComplete: backendItem.isComplete,
        isVisible: true,
      };
      setItems([...items, newItem]);
      return;
    }

    console.log(await postNewItem.json());
  }

  async function deleteItem(id: number): Promise<void> {
    const deleteItemRequest: Response = await fetch(
      `https://localhost:7148/api/TodoItems/${id}`,
      {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ id }),
      },
    );

    if (deleteItemRequest.ok) {
      setItems(await getItems());
      return;
    }
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
