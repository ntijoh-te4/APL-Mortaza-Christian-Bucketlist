import { Pressable, StyleSheet, Text, View } from "react-native";
import { FC } from "react";

interface Props {
  options: string[];
  icons: string[];
  isItemList: boolean;
}

const OptionsMenu: FC<Props> = ({ options, icons, isItemList }) => {
  const sortOptions = ["Due Date", "Alphabetical", "Last Updated"];

  return (
    <View
      style={{
        backgroundColor: "lightgrey",
        padding: 12,
        height: isItemList ? 350 : 200,
      }}
    >
      {isItemList ? (
        <View>
          <Text style={{ fontSize: 16 }}>Sort by...</Text>
          {sortOptions.map((sortOption) => (
            <Pressable key={sortOption} style={styles.option}>
              <span className="material-symbols-outlined">sort</span>
              <Text style={styles.h2}>{sortOption}</Text>
            </Pressable>
          ))}
        </View>
      ) : null}
      {options.map((option, index) => (
        <Pressable key={option} style={styles.option}>
          <span className="material-symbols-outlined">{icons[index]}</span>
          <Text style={styles.h2}>{option}</Text>
        </Pressable>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  option: {
    display: "flex",
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
  },
  h2: {
    fontSize: 24,
  },
});

export default OptionsMenu;
