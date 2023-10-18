import React, { useState } from "react";

const Search = ({ keyword, setKeyword, setPage, setSortOrder, sortOrder }) => {
  const [searchTerm, setSearchTerm] = useState(keyword);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleClickButton();
    }
  };
  const handleClickButton = () => {
    setKeyword(searchTerm);
    setPage(1);
  };
  const handleSortChange = (event) => {
    const selectedSortOrder = event.target.value;
    setSortOrder(selectedSortOrder);
    setPage(1);
  };

  return (
    <div className="input-group input-group-sm" style={{ width: 160 }}>
      <input
        value={searchTerm}
        type="text"
        name="table_search"
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control float-right"
        placeholder="Search"
        onKeyPress={handleKeyPress}
      />
      <select
        onChange={handleSortChange}
        className="form-control"
        style={{ width: "auto" }}
        value={sortOrder}
      >
        <option value="alphabetical">Sort by Alphabetical(ASC)</option>
        <option value="alphabeticalDesc">Sort by Alphabetical(DESC)</option>
        <option value="price">Sort by Price (ASC)</option>
        <option value="priceDesc">Sort by Price (DESC)</option>
      </select>
      <div className="input-group-append">
        <button
          onClick={handleClickButton}
          type="submit"
          className="btn btn-default bg-primary"
        >
          <i className="fas fa-search" />
        </button>
      </div>
    </div>
  );
};

export default Search;
