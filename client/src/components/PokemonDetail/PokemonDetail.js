import React from "react";
import {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail } from "../../actions";
import Spinner from "../Spinner/Spinner";
import './PokemonDetail.css'

export default function PokemonDetail(props) {
  
  const dispatch = useDispatch();
  
  
  useEffect(() => {
    dispatch(getPokemonDetail(props.match.params.id));
  }, [dispatch, props]);
  
  
  const pokemonDetail = useSelector((state) => state&&state.pokemonDetail);
 
  
  let i = 0;
  
  
  
  
  return pokemonDetail?( Object.keys(pokemonDetail).length === 0 ? (
    <Spinner />
  ) : (
      
    <div className='box'>
      <h1>{pokemonDetail.name}</h1>
      <div className='centralContainer'>
      <img className="img" srcSet={pokemonDetail.imagen} alt="No img" />
      <div className='features'>
        <h3 className='titleFeature'>Features</h3>
        <ul className='list'>
          <li>Vida<span>{pokemonDetail.vida}</span></li>
          <li>Fuerza<span>{pokemonDetail.fuerza}</span></li>
          <li>Defensa<span>{pokemonDetail.defensa}</span></li>
          <li>Velocidad<span>{pokemonDetail.velocidad}</span></li>
          <li>Altura<span>{pokemonDetail.altura}</span></li>
          <li>Peso<span>{pokemonDetail.peso}</span></li>
        </ul>
           
      </div>
      </div>
      
      <div className="typesdet">
      <h4 className="typeTitle">Types</h4>
      <div className="typedet">

        {pokemonDetail.types.map((type) => {
          i++;
          return (
            <h5 className="typeTitle" key={pokemonDetail.id * i}>
              {type}
            </h5>
          );
        })}
        </div>
      </div>
    </div>
    
  )):<Spinner />;
}
