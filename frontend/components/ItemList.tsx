import Item from "./Item";
import styles from "../styles/ItemList.module.css";
import { useState } from "react";

const ItemList = () => {
  const [fakeItems, setItems] = useState([
    { id: 1, description: "Drive Jetski" },
    { id: 2, description: "Skydive" },
    { id: 3, description: "Become president" },
  ]);

  return (
    <div>
      <h1>Items List</h1>
      <ul style={styles.ul}>
        {fakeItems.map((fakeItem) => (
          <Item description={fakeItem.description} key={fakeItem.id} />
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
