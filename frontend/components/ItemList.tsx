import Item from "./Item";
import styles from "../styles/ItemList.module.css";

const ItemList = ({ items, onDelete }) => {

  return (
    <div>
      <h1>Items List</h1>
      <ul style={styles.ul}>
        {items.map((item) => (
          <Item key={item.id} item={item} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
