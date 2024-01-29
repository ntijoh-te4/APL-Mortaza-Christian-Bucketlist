import { BaseSyntheticEvent, FC, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  onAdd: (description: string) => void;
}

const AddForm: FC<Props> = ({ onAdd }) => {
  const [description, setDescription] = useState("");

  function addInputText(e: BaseSyntheticEvent) {
    e.preventDefault();
    if (!description) {
      alert("Enter text in the input block");
      return;
    }
    onAdd(description);
    setDescription("");
  }

  return (
    <View>
      <Text style={styles.h1}>Add Items</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="Enter a todo!"
      />
      <Button onPress={addInputText} title="Add Item" />
    </View>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default AddForm;
