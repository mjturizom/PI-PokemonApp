import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";
export default function Card({ id, name, image, types }) {
  let i = 0;

  return (
    <div >
       <Link className="card with-box-shadow" key={id} to={"/pokemons/"+id}>
      <h3>{name}</h3>
      <img srcSet={image} alt="No img" />
      <h4>Types</h4>
      <div className="types">
        {types.map((type) => {
          i++;
          return (
            <h5 className="type" key={id * i}>
              {type}
            </h5>
          );
        })}
      </div>
      </Link>
    </div>
  );
}
