import { FC } from "react";
import { TItem } from "../types/item";

interface Props {
  item: TItem;
  onDelete: (id: number) => void;
}

const Item: FC<Props> = ({ item, onDelete }) => {
  return item.isVisible ? (
    <li>
      <p>{item.description}</p>
      <button onClick={() => onDelete(item.id)}>X</button>
    </li>
  ) : (
    <></>
  );
};

export default Item;
