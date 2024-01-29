import Item from "./Item";
// import styles from "../styles/ItemList.module.css";
import { TItem } from "../types/item";
import { FC, useEffect } from "react";

interface Props {
  items: TItem[];
  setItems: (items: TItem[]) => void;
  onDelete: (id: number) => void;
  searchTerm: string;
}

const ItemList: FC<Props> = ({ items, setItems, onDelete, searchTerm }) => {
  useEffect(() => {
    const updatedItems = items.map((item) => {
      return {
        id: item.id,
        description: item.description,
        isComplete: item.isComplete,
        isVisible: (item.isVisible = item.description
          .toLowerCase()
          .includes(searchTerm)),
      };
    });
    setItems(updatedItems);
  }, [searchTerm]);

  const filteredItems = items.filter((item: TItem) => item.isVisible);

  return (
    <div>
      <h1>Items List</h1>
      <ul>
        {filteredItems.length === 0 ? (
          <p>No items available</p>
        ) : (
          filteredItems.map((item: TItem) => (
            <Item key={item.id} item={item} onDelete={onDelete} />
          ))
        )}
      </ul>
    </div>
  );
};

export default ItemList;
