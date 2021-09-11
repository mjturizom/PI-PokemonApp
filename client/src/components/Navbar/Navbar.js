import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'

export default function Home({ types, handleClick }) {
  return (
    <div className='navbar'>
      
      <h3>Filter by: Type</h3>
      <select name="Type">
      <option value='allType'>All</option>
        {types.map((type) => {
          return <option key={type.id} value={type.name}>{type.name}</option>;
        })}
      </select>{" "}
      <input type="radio" name="typePok" value="exis" />
      Existing
      <input type="radio" name="typePok" value="creat" />
      Created
      <h3>Order by</h3>
      <select>
      <option value='allOrder'>All</option>
        <option value='AZ'>A-Z</option>
        <option value='attack'>Attack</option>
      </select>{" "}
      <input type="radio" name="order" value="asc" />
      Asc
      <input type="radio" name="order" value="des" />
      Desc
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reset
      </button>
      <Link className='button' to="/pokemon">Crear Pokemon</Link>
    </div>
  );
}
