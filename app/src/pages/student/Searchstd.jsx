import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Search.css';

const Searchstd = () => {
  const [searchKey, setSearchKey] = useState("");
  const nav = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/admin/simpleSearch/${searchKey}`
      );
      nav("/search-simple", { state: { searchResults: response.data } });
    } catch (error) {
      console.error("Error during search:", error);
    }
  };

  return (
    <div className="search">
      <input
        type="text"
        className="input"
        value={searchKey}
        placeholder="Search student"
        onChange={(e) => setSearchKey(e.target.value)}
      />
      <button className="srch_btn" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Searchstd;
