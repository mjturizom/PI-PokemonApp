import React from "react";
import { FaSearchPlus } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./SearchBar.css";
import {getPokemon} from '../../actions/index'

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleBuscarChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getPokemon(name))
    setName('')
  }
  return (
    <div className="wrap">
      <div className="search">
        <input
          onChange={(e) => handleBuscarChange(e)}
          type="text"
          className="searchTerm"
          placeholder="Buscar Pokemon"
          value={name}
        />
        <button onClick={(e)=>handleSubmit(e)} type="submit" className="searchButton">
          <FaSearchPlus />
        </button>
      </div>
    </div>
  );
}
