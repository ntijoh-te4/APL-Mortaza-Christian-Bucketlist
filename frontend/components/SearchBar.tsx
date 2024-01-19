import { useState, FC, BaseSyntheticEvent } from "react";
import { TItem } from "../types/item";

interface Props {
  items: TItem[];
  setItems: (items: TItem[]) => void;
  initialItems: TItem[];
}

const SearchBar: FC<Props> = ({ items, setItems, initialItems }) => {
  const [searched, setSearched] = useState("");

  const search = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const searchTerm = e.target.firstElementChild.value.toLowerCase();
    setSearched(searchTerm);

    const updatedItems = items.map((item) => {
      return {
        id: item.id,
        description: item.description,
        isVisible: (item.isVisible = item.description
          .toLowerCase()
          .includes(searchTerm)),
      };
    });
    console.log(updatedItems);

    setItems(updatedItems);
  };

  const resetSearch = () => {
    setSearched("");
    setItems(initialItems);
  };

  return (
    <div>
      <form onSubmit={search}>
        <input
          type="text"
          placeholder="Search item..."
          value={searched}
          onChange={(e) => setSearched(e.target.value)}
        />
      </form>
      <button onClick={resetSearch}>Reset</button>
    </div>
  );
};

export default SearchBar;
