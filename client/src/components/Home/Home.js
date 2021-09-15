import React from "react";
import { Link } from "react-router-dom";
//importo Hooks
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//importo Action
import {
  getPokemons,
  getTypes,
  filterByType,
  filterByOrigin,
  orderBy,
} from "../../actions";

//importo componentes
import Card from "../Card/Card";
import Navbar from "../Navbar/Navbar";
import Page from "../page/Page";
import SearchBar from "../SearchBar/SearchBar"
import Spinner from "../Spinner/Spinner";
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
  const [orden, setOrden] = useState("");
  //const [numPokemonsInPag, setNumPokemonsInPag] = useState(12);
  const numPokemonsInPag = 12;
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
  function OrderBy(orderType) {
    const tags = document.getElementById("way").children;
    let isOneChecked = false;
    for (const tag of tags) {
      if (tag.checked) {
        isOneChecked = tag.checked;
        dispatch(orderBy(orderType, tag.value));
        break;
      }
    }
    if (!isOneChecked) dispatch(orderBy(orderType, "asc"));
    setOrden("Ordenado" + orderType);
    if (orden){}
  }
  function OrderWay(orderWay) {
    let orderType = "";
    const tags = document.getElementById("orderBy").children;

    for (const tag of tags) {
      if (tag.selected) orderType = tag.value;
    }
    OrderBy(orderType);
    setOrden("Ordenado" + orderWay);
  }

  return (
    <>
    <div className='header'>
      <h1>PokeApp</h1>
      <div className='crearBuscar'>

      <SearchBar/>
      <Link className="button" to="/newpokemon">
        Crear Pokemon
      </Link>
      </div>
      </div>
      {types && (
        <Navbar
          types={types}
          handleClick={handleClick}
          filterByType={FilterByType}
          filterByOrigin={FilterByOrigin}
          orderBy={OrderBy}
          orderWay={OrderWay}
        />
      )}

      <div className="cardSpace">
        {pokemons?
          (pokemons.length? pokemonsToPage.map((pokemon) => {
            return (
              
              <Card
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.imagen}
                types={pokemon.types}
              />
             
            );
          }):<span>No se encuentra el pokemon, intenta otro nombre</span>):<Spinner/>}
      </div>
      {pokemons && <Page nPages={nPages} Page={page} />}
    </>
  );
}
