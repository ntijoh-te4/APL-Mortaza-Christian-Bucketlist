import React, { useState } from "react";
import { Button, Text, StyleSheet, Pressable, View } from "react-native";
import { TTodoItem } from "../types/todoItem";
import Popup from "./Popup";

interface ItemProps {
  item: TTodoItem;
  onDelete: (id: number) => void;
}

const Item: React.FC<ItemProps> = ({ item, onDelete }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return item.isVisible ? (
    <View style={styles.li}>
      <Button title="X" onPress={() => onDelete(item.id)} />
      <Text>{item.title}</Text>
      <Pressable style={styles.kebabMenu} onPress={openPopup}>
        <span className="material-symbols-outlined">more_vert</span>
      </Pressable>
      {isPopupOpen ? (
        <Popup
          onClose={closePopup}
          actions={[
            { title: "Edit", icon: "edit" },
            { title: "Rename", icon: "send" },
            { title: "Set deadline", icon: "calendar_month" },
            { title: "Delete item", icon: "delete" },
          ]}
          popupTitle={item.title}
        />
      ) : null}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  li: {
    backgroundColor: "salmon",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  kebabMenu: {
    position: "relative",
  },
});

export default Item;
