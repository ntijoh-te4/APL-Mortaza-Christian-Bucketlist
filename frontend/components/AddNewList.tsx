import { FC, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const AddNewList: FC = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [formIsActive, setFormIsActive] = useState(false);
  const [listName, setListName] = useState("");

  function toggleFormStatus() {
    setFormIsActive(!formIsActive);
  }

  function handleSubmit() {
    console.log("List name submitted:", listName);
    setListName("");
    setFormIsActive(false);
  }

  return (
    <View style={{ zIndex: -1, display: "flex", flexDirection: "row" }}>
      <Pressable
        onPress={toggleFormStatus}
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
      {formIsActive ? (
        <View style={styles.listTemplate}>
          <TextInput
            placeholder="Enter List Name"
            value={listName}
            onChangeText={(text) => setListName(text)}
            onSubmitEditing={handleSubmit}
          />
          <Pressable onPress={handleSubmit}>
            <Text>Submit</Text>
          </Pressable>
        </View>
      ) : null}
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
  listTemplate: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gold",
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
