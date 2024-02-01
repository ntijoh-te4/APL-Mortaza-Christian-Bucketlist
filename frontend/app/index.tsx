import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import SearchBar from "../components/SearchBar";
import ItemList from "../components/ItemList";
import AddNewList from "../components/AddNewList";
import { TItem, TItemTemplate } from "../types/item";
import { TBackendItem } from "../types/backendItem";
import OptionsMenu from "../components/OptionsMenu";

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
      setItems(items.filter((item) => item.id != id));
      return;
    }
  }

  return (
    <View style={styles.container}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
      />
      <SearchBar setSearchTerm={setSearchTerm} />
      <View style={styles.listContainer}>
        <ItemList
          onAdd={addItem}
          items={items}
          setItems={setItems}
          onDelete={deleteItem}
          searchTerm={searchTerm}
        />
        <AddNewList />
        <OptionsMenu
          options={[
            { title: "Edit", icon: "edit" },
            { title: "Rename", icon: "send" },
            { title: "Set deadline", icon: "calendar_month" },
            { title: "Delete list", icon: "delete" },
          ]}
          isItemList={true}
        />
      </View>
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
  listContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
