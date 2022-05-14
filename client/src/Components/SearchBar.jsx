import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getVGNames } from "../Actions";
import './SearchBar.scss'

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    var found = getVGNames(name);
    dispatch(found);
    setName("");
  }

  return (
    <>
      <form>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter game name here..."
            onChange={(e) => handleInputChange(e)}
            value={name}
            className="search"
            onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
          />
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="search-button"
          >
            <strong>GO!</strong>
          </button>
        </div>
      </form>
    </>
  );
}
