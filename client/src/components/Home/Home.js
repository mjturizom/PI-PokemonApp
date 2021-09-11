import React from "react";
//importo Hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//importo Action
import { getPokemons } from "../../actions";
import { getTypes } from '../../actions'
//importo componentes
import Card from "../Card/Card";
import Navbar from "../Navbar/Navbar";
//importo styles
import "./Home.css";


export default function Home() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => {
    return state && state.pokemons;
  });
  const types = useSelector((state) => {
    return state && state.types;
  });
  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes())
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }
  return (
    <>
    <h1>PokeApp</h1>{
        types&&<Navbar types={types} handleClick={handleClick} />
    }

      <div className="cardSpace">
        {pokemons &&
          pokemons.map((pokemon) => {
            return pokemon.map((pokemon) => {
              return (
                <Card
                  key={pokemon.id}
                  id={pokemon.id}
                  name={pokemon.name}
                  image={pokemon.imagen}
                  types={pokemon.types}
                />
              );
            });
          })}
      </div>
    </>
  );
}
