import Item from "./Item";
import AddForm from "./AddForm";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { TItem } from "../types/item";
import { FC, useEffect } from "react";

interface Props {
  items: TItem[];
  setItems: (items: TItem[]) => void;
  onDelete: (id: number) => void;
  onAdd: (description: string) => void;
  searchTerm: string;
}

const ItemList: FC<Props> = ({
  items,
  setItems,
  onDelete,
  onAdd,
  searchTerm,
}) => {
  useEffect(() => {
    const updatedItems = items.map((item) => {
      return {
        id: item.id,
        description: item.description,
        isComplete: item.isComplete,
        isVisible: (item.isVisible = item.description
          .toLowerCase()
          .includes(searchTerm)),
      };
    });
    setItems(updatedItems);
  }, [searchTerm]);

  useEffect(() => {
    filteredItems = items.filter((item: TItem) => item.isVisible);
  }, [items]);

  let filteredItems = items.filter((item: TItem) => item.isVisible);

  return (
    <View style={{ backgroundColor: "lime", padding: 8 }}>
      <Text style={styles.h1}>List Title</Text>
      <View style={styles.ul}>
        <AddForm onAdd={onAdd} />
        <FlatList
          data={filteredItems}
          keyExtractor={(item: TItem) => item.id.toString()}
          renderItem={({ item }: { item: TItem }) => (
            <Item key={item.id} item={item} onDelete={onDelete} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ul: {
    width: "100%",
    height: 400,
    overflow: "scroll",
    backgroundColor: "aqua",
    padding: 16,
  },
  h1: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default ItemList;
