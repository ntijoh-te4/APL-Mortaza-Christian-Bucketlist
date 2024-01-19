import { FC, BaseSyntheticEvent } from "react";

interface Props {
  setSearchTerm: (searchTerm: string) => void;
}

const SearchBar: FC<Props> = ({ setSearchTerm }) => {
  function search(e: BaseSyntheticEvent): void {
    e.preventDefault();
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search item..."
        onChange={(e) => search(e)}
      />
    </div>
  );
};

export default SearchBar;
