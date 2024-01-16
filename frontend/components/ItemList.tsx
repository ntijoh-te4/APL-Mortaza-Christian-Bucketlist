import Item from "./Item";
import styles from "../styles/ItemList.module.css";
import { useState } from "react";

const ItemList = () => {

  const [fakeItems, setItems] = useState([
    { id: 1, description: "Drive Jetski", deadline: "28th February" },
    { id: 2, description: "Skydive", deadline: "51st June" },
    { id: 3, description: "Become president", deadline: "23rd December" },
  ]);

  return (
    <div>
      <h1>Items List</h1>
      <ul style={styles.ul}>
        {fakeItems.map((fakeItem) => (
          <Item description={fakeItem.description} key={fakeItem.id}/>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
