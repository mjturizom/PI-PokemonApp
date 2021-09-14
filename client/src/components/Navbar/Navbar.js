import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({
  types,
  handleClick,
  filterByType,
  filterByOrigin,
  orderBy,
  orderWay,
}) {
  return (
    <div className="navbar">
      <h3>Filter by: Type</h3>
      <select
        
        name="Type"
        onChange={(e) => {
          filterByType(e.target.value);
        }}
      >
        <option value="allType" >All</option>
        {types.map((type) => {
          return (
            <option key={type.id} value={type.name}>
              {type.name}
            </option>
          );
        })}
      </select>
      <form
        onChange={(e) => {
          filterByOrigin(e.target.value);
        }}
      >
        <input type="radio" onChange={(e) => {
          filterByOrigin(e.target.value);
        }} defaultChecked  name="origin" value="all" />
        All
        <input type="radio" name="origin" value="exis" />
        Existing
        <input type="radio" name="origin" value="creat" />
        Created
      </form>
      <h3>Order by</h3>
      <select
        id="orderBy"
        onChange={(e) => {
          orderBy(e.target.value);
        }}
      >
        <option value="default">Default</option>
        <option value="AZ">A-Z</option>
        <option value="attack">Attack</option>
      </select>
      <form
        id="way"
        onChange={(e) => {
          orderWay(e.target.value);
        }}
      >
        <input onChange={(e) => {
          orderWay(e.target.value);
        }} type="radio" defaultChecked name="order" value="asc" />
        Asc
        <input type="radio" name="order" value="des" />
        Desc
      </form>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reset
      </button>
      <Link className="button" to="/newpokemon">
        Crear Pokemon
      </Link>
    </div>
  );
}
