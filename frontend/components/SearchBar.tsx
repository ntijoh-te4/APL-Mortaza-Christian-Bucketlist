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

  return (
    <form onSubmit={search}>
      <input
        type="text"
        placeholder="Vad sökes?"
        value={searched}
        onChange={(e) => setSearched(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
