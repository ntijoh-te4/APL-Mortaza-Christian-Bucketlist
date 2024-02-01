import { Pressable, StyleSheet, Text, View } from "react-native";
import { FC } from "react";

interface IOptions {
  title: string;
  icon: string;
}

interface Props {
  options: IOptions[];
  isItemList: boolean;
}

const OptionsMenu: FC<Props> = ({ options, isItemList }) => {
  const sortOptions: IOptions[] = [
    { title: "Due Date", icon: "today" },
    { title: "Alphabetical", icon: "sort_by_alpha" },
    { title: "Last Updated", icon: "update" },
  ];

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
          <View style={{ display: "flex", flexDirection: "row" }}>
            <span className="material-symbols-outlined">sort</span>
            <Text style={{ marginLeft: 8, fontSize: 16 }}>Sort by...</Text>
          </View>
          {sortOptions.map((sortOption: IOptions) => (
            <Pressable key={sortOption.title} style={styles.sortOptions}>
              <span className="material-symbols-outlined">
                {sortOption.icon}
              </span>
              <Text style={[styles.option && { fontSize: 16 }]}>
                {sortOption.title}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}
      {options.map((option: IOptions) => (
        <Pressable key={option.title} style={styles.option}>
          <span className="material-symbols-outlined">{option.icon}</span>
          <Text style={styles.h2}>{option.title}</Text>
        </Pressable>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  sortOptions: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 24,
    padding: 8,
  },
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
