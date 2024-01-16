import Item from "./Item";
import styles from "../styles/ItemList.module.css";

const ItemList = ({ fakeItems, onDelete }) => {

  return (
    <div>
      <h1>Items List</h1>
      <ul style={styles.ul}>
        {fakeItems.map((fakeItem) => (
          <Item key={fakeItem.id} description={fakeItem.description} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
