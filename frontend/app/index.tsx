import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import SearchBar from "../components/SearchBar";
import ItemList from "../components/ItemList";
import AddNewList from "../components/AddNewList";
import { TTodoItem, TTodoItemResponse } from "../types/todoItem";
import { TTodoList, TTodoListPreviewResponse } from "../types/todoList";

async function getTodoListPreviews(): Promise<TTodoList[]> {
  const response: Response = await fetch(
    `https://localhost:7148/api/TodoLists`,
  );
  if (!response.ok) {
    return [];
  }

  const backendListPreviews: TTodoListPreviewResponse[] = await response.json();

  const listPreviews: TTodoList[] = backendListPreviews.map((list) => {
    return {
      ...list,
      items: null,
    };
  });

  return listPreviews;
}

// temp default value on todoListId
async function getTodoItems(
  todoListId: number = 1,
): Promise<TTodoItem[] | null> {
  const response: Response = await fetch(
    `https://localhost:7148/api/TodoLists/${todoListId}/TodoItems`,
  );
  if (!response.ok) {
    // error handling if fetching fails (probably if todolist doesn't exist)
    // check if todo list still exists otherwise delete all instances of it ?
    return null;
  }

  const backendItems: TTodoItemResponse[] = await response.json();
  const items: TTodoItem[] = backendItems.map(
    (item: TTodoItemResponse): TTodoItem => ({
      ...item,
      isVisible: true,
    }),
  );
  return items;
}

export default function App() {
  const [items, setItems] = useState<TTodoItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchInitialItems = async () => {
      const initialItems: TTodoItem[] | null = await getTodoItems();
      if (initialItems === null) {
        return;
      }
      setItems(initialItems);
    };

    fetchInitialItems();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  async function addItem(
    description: string,
    todoListId: number = 1,
  ): Promise<void> {
    const postNewItem: Response = await fetch(
      `https://localhost:7148/api/TodoItems/${todoListId}/TodoItems`,
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

    if (!postNewItem.ok) {
      return;
    }

    const backendItem: TTodoItemResponse = await postNewItem.json();
    const newItem: TTodoItem = {
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
    console.log(await postNewItem.json());
    return;
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
