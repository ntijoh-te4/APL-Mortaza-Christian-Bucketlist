import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import SearchBar from "../components/SearchBar";
import ItemList from "../components/ItemList";
import AddNewList from "../components/AddNewList";
import { TItem } from "../types/item";
import { TList } from "../types/list";
import { TBackendItem } from "../types/backendItem";
import { TBackendList } from "../types/backendList";

async function getTodoListPreviews(): Promise<TList[]> {
  const response: Response = await fetch(
    `https://localhost:7148/api/TodoLists`,
  );
  if (!response.ok) {
    return [];
  }

  const backendListPreviews: TBackendList[] = await response.json();

  const listPreviews: TList[] = backendListPreviews.map((list) => {
    return {
      ...list,
      items: null,
    };
  });

  return listPreviews;
}

// temp default value on todoListId
async function getTodoItems(todoListId: number = 1): Promise<TItem[] | null> {
  const response: Response = await fetch(
    `https://localhost:7148/api/TodoLists/${todoListId}/TodoItems`,
  );
  if (!response.ok) {
    // error handling if fetching fails (probably if todolist doesn't exist)
    // check if todo list still exists otherwise delete all instances of it ?
    return null;
  }

  const backendItems: TBackendItem[] = await response.json();
  const items: TItem[] = backendItems.map((item) => ({
    ...item,
    isVisible: true,
  }));
  return items;
}

export default function App() {
  const [items, setItems] = useState<TItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchInitialItems = async () => {
      const initialItems: TItem[] | null = await getTodoItems();
      if (initialItems === null) {
        return;
      }
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
        title: backendItem.title,
        description: backendItem.description,
        createdAt: backendItem.createdAt,
        updatedAt: backendItem.updatedAt,
        deadline: backendItem.deadline,
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
