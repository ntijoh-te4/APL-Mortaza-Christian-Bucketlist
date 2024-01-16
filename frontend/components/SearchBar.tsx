import { useState } from "react";

const SearchBar = ({ list }) => {
  const [keyword, setKeyword] = useState("");

  const search = (e) => {
    e.preventDefault();
    const searched = e.target.firstElementChild.value;
    list.forEach((item) => {
      if (item.description !== searched) {
        item.hidden = true;
      }
    });
    console.log('slutet');
    
  };

  return (
    <form onSubmit={search}>
      <input
        type="text"
        placeholder="Vad sökes?"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
