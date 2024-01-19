import { FC } from "react";
import { TItem } from "../types/item";

interface Props {
  item: TItem;
  onDelete: Function;
}

const Item: FC<Props> = ({ item, onDelete }) => {
  return (
    <li>
      <p>{item.description}</p>
      <button onClick={() => onDelete(item.id)}>X</button>
    </li>
  );
};

export default Item;
