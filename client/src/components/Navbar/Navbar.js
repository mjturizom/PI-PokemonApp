import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'

export default function Home({ types, handleClick }) {
  return (
    <div className='navbar'>
      
      <h3>Filter by: Type</h3>
      <select name="Type">
        {types.map((type) => {
          return <option key={type.id}>{type.name}</option>;
        })}
      </select>{" "}
      <input type="radio" name="typePok" value="1" />
      Existing
      <input type="radio" name="typePok" value="2" />
      Created
      <h3>Order by</h3>
      <select>
        <option>A-Z</option>
        <option>Attack</option>
      </select>{" "}
      <input type="radio" name="order" value="1" />
      Asc
      <input type="radio" name="order" value="2" />
      Desc
      <button>Filters</button>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reset Filters || Orders
      </button>
      <Link to="/pokemon">Crear Pokemon</Link>
    </div>
  );
}
