import Item from "./Item";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { TItem } from "../types/item";
import { FC, useEffect } from "react";

interface Props {
  items: TItem[];
  setItems: (items: TItem[]) => void;
  onDelete: (id: number) => void;
  searchTerm: string;
}

const ItemList: FC<Props> = ({ items, setItems, onDelete, searchTerm }) => {
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

  const filteredItems = items.filter((item: TItem) => item.isVisible);

  return (
    <View>
      <Text style={{ fontSize: 48 }}>Items List</Text>
      <FlatList
        style={styles.ul}
        data={filteredItems}
        keyExtractor={(item: TItem) => item.id.toString()}
        renderItem={({ item }: { item: TItem }) => (
          <Item key={item.id} item={item} onDelete={onDelete} />
        )}
      />
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
});

export default ItemList;
