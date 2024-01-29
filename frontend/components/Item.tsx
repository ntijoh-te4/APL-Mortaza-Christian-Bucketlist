import { Button, Text, StyleSheet } from "react-native";
import { FC } from "react";
import { TItem } from "../types/item";

interface Props {
  item: TItem;
  onDelete: (id: number) => void;
}

const Item: FC<Props> = ({ item, onDelete }) => {
  return item.isVisible ? (
    <li style={styles.li}>
      <Text>{item.description}</Text>
      <Button title="X" onPress={() => onDelete(item.id)} />
    </li>
  ) : null;
};

const styles = StyleSheet.create({
  li: {
    backgroundColor: "salmon",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "nowrap",
  },
});

export default Item;
