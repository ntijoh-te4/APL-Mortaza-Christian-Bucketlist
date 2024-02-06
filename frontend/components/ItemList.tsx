import Item from "./Item";
import AddForm from "./AddForm";
import OptionsMenu from "./OptionsMenu";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";
import { TTodoItem } from "../types/todoItem";
import { FC, useState, useEffect } from "react";

interface Props {
  items: TTodoItem[];
  setItems: (items: TTodoItem[]) => void;
  onDelete: (id: number) => void;
  onAdd: (description: string, todoListId?: number) => void;
  searchTerm: string;
}

const ItemList: FC<Props> = ({
  items,
  setItems,
  onDelete,
  onAdd,
  searchTerm,
}) => {
  const [editing, setEditing] = useState(false);
  const [listTitle, setListTitle] = useState("List Title");
  const [optionsMenuVisible, setOptionsMenuVisible] = useState(false);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
  };

  useEffect(() => {
    const updatedItems = items.map((item) => {
      return {
        ...item,
        isVisible: (item.isVisible = item.description
          .toLowerCase()
          .includes(searchTerm)),
      };
    });
    setItems(updatedItems);
  }, [searchTerm]);

  useEffect(() => {
    filteredItems = items.filter((item: TTodoItem) => item.isVisible);
  }, [items]);

  let filteredItems = items.filter((item: TTodoItem) => item.isVisible);

  function toggleOptionsMenu() {
    setOptionsMenuVisible(!optionsMenuVisible);
  }

  return (
    <View style={styles.itemListContainer}>
      <View style={styles.listTitleRow}>
        {editing ? (
          <TextInput
            style={styles.h2}
            value={listTitle}
            onChangeText={(text) => setListTitle(text)}
            onSubmitEditing={handleSave}
          />
        ) : (
          <Pressable onPress={handleEditClick}>
            <Text style={styles.h2}>{listTitle}</Text>
          </Pressable>
        )}
        <Pressable style={styles.kebabMenu}>
          <span
            className="material-symbols-outlined"
            onClick={toggleOptionsMenu}
          >
            more_vert
          </span>
        </Pressable>
      </View>
      {optionsMenuVisible ? (
        <OptionsMenu
          options={[
            { title: "Edit", icon: "edit" },
            { title: "Rename", icon: "send" },
            { title: "Set deadline", icon: "calendar_month" },
            { title: "Delete list", icon: "delete" },
          ]}
          isItemList={true}
        />
      ) : null}
      <View style={styles.itemContainer}>
        <AddForm onAdd={onAdd} />
        <FlatList
          data={filteredItems}
          keyExtractor={(item: TTodoItem) => item.id.toString()}
          renderItem={({ item }: { item: TTodoItem }) => (
            <Item key={item.id} item={item} onDelete={onDelete} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemListContainer: {
    borderStyle: "dashed",
    borderColor: "black",
    borderWidth: 2,
  },
  kebabMenu: {
    position: "relative",
  },
  itemContainer: {
    width: 300,
    height: 400,
    overflow: "scroll",
    padding: 16,
  },
  h2: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 16,
  },
  listTitleRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
});

export default ItemList;
