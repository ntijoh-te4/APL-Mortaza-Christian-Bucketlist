import Item from "./Item";
import styles from "../styles/ItemList.module.css";

const ItemList = () => {
  const fakeItems = [
    {id: 1, description: "Drive Jetski", deadline: "28th February"},
    {id: 2, description: "Skydive", deadline: "51st June"},
    {id: 3, description: "Become president", deadline: "23rd December"}
  ]

  return (
    <div>
      <h1>Items</h1>
      <ul>
        <li>
          <Item/>
        </li>
      </ul>
    </div>
  );
};

export default ItemList;
