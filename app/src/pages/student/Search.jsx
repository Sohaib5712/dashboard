import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Search.css';

const Search = () => {
  const [searchKey, setSearchKey] = useState("");
  const nav = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:4000/api/admin/search/${searchKey}`
      );
     
      nav("/search-results", { state: { searchResults: response.data } });
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <form className="search">
      <input
        type="text"
        className="input"
        value={searchKey}
        name="search"
        placeholder="Search student"
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <button className="srch_btn" onClick={handleSearch}>
        Search
      </button>
    </form>
  );
};

export default Search;
