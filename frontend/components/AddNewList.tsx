import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const AddNewList = () => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <View>
      <Pressable
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        style={[
          styles.addBtn,
          {
            backgroundColor: isPressed
              ? "rgba(137, 137, 137, 0.75)"
              : "rgb(223, 218, 220)",
          },
        ]}
      >
        <Text style={styles.h1}>+ Add new list</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  addBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: 500,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  h1: {
    fontSize: 36,
  },
});

export default AddNewList;
