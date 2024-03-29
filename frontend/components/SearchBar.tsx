import { FC, BaseSyntheticEvent } from "react";
import { StyleSheet, TextInput } from "react-native";

interface Props {
  setSearchTerm: (searchTerm: string) => void;
}

const SearchBar: FC<Props> = ({ setSearchTerm }) => {
  function search(e: BaseSyntheticEvent): void {
    e.preventDefault();
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  }

  return (
    <TextInput
      style={styles.input}
      placeholder="Search item..."
      onChange={(e) => search(e)}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default SearchBar;
