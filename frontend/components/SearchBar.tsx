import { useState, useEffect } from "react";

const SearchBar = ({ items, setItems, initialItems }) => {
  const [searched, setSearched] = useState("");

  const search = (e) => {
    e.preventDefault();
    const searchTerm = e.target.firstElementChild.value.toLowerCase();
    setSearched(searchTerm);

    const filteredItems = items.filter((item) =>
      item.description.toLowerCase().includes(searchTerm)
    );
    console.log(searchTerm);

    setItems(filteredItems);
  };

  const reset = () => {
    setSearched("");
    setItems(initialItems);
  };

  return (
    <div>
      <form onSubmit={search}>
        <input
          type="text"
          placeholder="Vad sökes?"
          value={searched}
          onChange={(e) => setSearched(e.target.value)}
        />
      </form>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default SearchBar;
