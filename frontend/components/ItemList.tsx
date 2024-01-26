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
        isVisible: (item.isVisible = item.description
          .toLowerCase()
          .includes(searchTerm)),
      };
    });
    setItems(updatedItems);
  }, [searchTerm]);

  function Items() {
    return items.map((item: TItem) => {
      if (item.isVisible) {
        return <Item key={item.id} item={item} onDelete={onDelete} />;
      } else {
        return <></>;
      }
    });
  }

  return (
    <div>
      <h1>Items List</h1>
      <ul>
        <Items></Items>
      </ul>
    </div>
  );
};

export default ItemList;
