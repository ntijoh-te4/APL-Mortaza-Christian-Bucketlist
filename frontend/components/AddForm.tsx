import { BaseSyntheticEvent, FC, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  onAdd: (description: string) => void;
}

const AddForm: FC<Props> = ({ onAdd }) => {
  const [description, setDescription] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [addFormVisible, setAddFormVisible] = useState(false);

  function handlePressIn() {
    setIsHovered(true);
  }

  function handlePressOut() {
    setIsHovered(false);
  }

  function addInputText(e: BaseSyntheticEvent) {
    e.preventDefault();
    if (!description) {
      alert("Enter text in the input block");
      return;
    }
    onAdd(description);
    setDescription("");
  }

  function toggleAddForm() {
    console.log("bananpaj");
    setAddFormVisible(!addFormVisible);
  }

  return (
    <View>
      <Pressable
        onPress={toggleAddForm}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.touchable, isHovered && styles.hoveredTouchable]}
      >
        {isHovered ? (
          <span className="material-symbols-outlined">add_circle</span>
        ) : (
          <span className="material-symbols-outlined">add</span>
        )}
        <Text>Add a task</Text>
      </Pressable>
      {addFormVisible ? (
        <View>
          <TextInput placeholder="Title" style={styles.input} />
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
            placeholder="Enter Description"
            onSubmitEditing={addInputText}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  touchable: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "lightblue",
    borderRadius: 5,
  },
  hoveredTouchable: {
    backgroundColor: "white",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default AddForm;
