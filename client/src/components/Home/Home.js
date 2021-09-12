import React from "react";
//importo Hooks
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//importo Action
import { getPokemons,getTypes,filterByType, filterByOrigin } from "../../actions";

//importo componentes
import Card from "../Card/Card";
import Navbar from "../Navbar/Navbar";
import Page from "../page/Page";
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

  const [actualPag, setActualPag] = useState(1);
  //const [numPokemonsInPag, setNumPokemonsInPag] = useState(12);
  const numPokemonsInPag=12;
  const lastCard = actualPag * numPokemonsInPag;
  const firstCard = lastCard - numPokemonsInPag;
  let pokemonsToPage = pokemons;

  const page = (page) => {
    setActualPag(page);
  };

  const nPages = [];
  if (pokemons) {
    pokemonsToPage = pokemons.slice(firstCard, lastCard);
    for (let i = 0; i < Math.round(pokemons.length / numPokemonsInPag); i++) {
      nPages.push(i + 1);
    }
  }
  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }
  function FilterByType(type) {
    
    dispatch(filterByType(type));
  }
  function FilterByOrigin(origin) {
    
    dispatch(filterByOrigin(origin));
  }
  return (
    <>
      <h1>PokeApp</h1>
      {types && <Navbar types={types} handleClick={handleClick} filterByType={FilterByType} filterByOrigin={FilterByOrigin}/>}

      <div className="cardSpace">
        {pokemons &&
          pokemonsToPage.map((pokemon) => {
            return (
              <Card
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.imagen}
                types={pokemon.types}
              />
            );
          })}
      </div>
      {pokemons && <Page nPages={nPages} Page={page} />}
    </>
  );
}
