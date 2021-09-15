import React from "react";
import "./CreatePokemon.css";
import { getTypes } from "../../actions";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { addPokemon } from "../../actions";

export default function CreatePokemon() {
  const dispatch = useDispatch();
  const types = useSelector((state) => {
    return state && state.types;
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [pokemonToPost, setpokemonToPost] = useState({
    name: "",
    vida: "",
    imagen: "",
    fuerza: "",
    defensa: "",
    velocidad: "",
    altura: "",
    peso: "",
    type: [],
  });
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);
  function handleChange(e) {
    if (e.target.name === "types") {
      setpokemonToPost({
        ...pokemonToPost,
        type: pokemonToPost.type.includes(e.target.value)
          ? [...pokemonToPost.type]
          : [...pokemonToPost.type, e.target.value],
      });
    } else {
      setpokemonToPost({
        ...pokemonToPost,
        [e.target.name]:
          e.target.name === "name" ? e.target.value.toLowerCase() : parseInt(e.target.value),
      });
    }
    
  }

  function handleOnSubmit() {
    
    
    dispatch(addPokemon(pokemonToPost));
    setpokemonToPost({
      name: "",
      vida: "",
      imagen: "",
      fuerza: "",
      defensa: "",
      velocidad: "",
      altura: "",
      peso: "",
      type: [],
    });
    alert("Pokemon Created");
  }

  return (
    <div className="formulary">
      <div className="container">
        <h2>Create Pokemon</h2>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="form">
          <input
          {...register("name", { required: true })}
            onChange={(e) => handleChange(e)}
            placeholder="nombre"
            name="name"
            className="text"
            type="text"
            value={pokemonToPost.name}
          />
          {errors.name && "Nombre is required"}
          <input
          {...register("vida", { required: true })}
            onChange={(e) => handleChange(e)}
            placeholder="vida"
            name="vida"
            className="text"
            type="number"
            value={pokemonToPost.vida}
          />
          {errors.vida && "Vida is required"}
          <input
          {...register("fuerza", { required: true })}
            onChange={(e) => handleChange(e)}
            placeholder="fuerza"
            name="fuerza"
            className="text"
            type="number"
            value={pokemonToPost.fuerza}
          />
          {errors.fuerza && "Fuerza is required"}
          <input
          {...register("defensa", { required: true })}
            onChange={(e) => handleChange(e)}
            placeholder="defensa"
            name="defensa"
            className="text"
            type="number"
            value={pokemonToPost.defensa}
          />
          {errors.defensa && "Defensa is required"}
          <input
          {...register("velocidad", { required: true })}
            onChange={(e) => handleChange(e)}
            placeholder="velocidad"
            name="velocidad"
            className="text"
            type="number"
            value={pokemonToPost.velocidad}
          />
          {errors.velocidad && "Velocidad is required"}
          <input
          {...register("altura", { required: true })}
            onChange={(e) => handleChange(e)}
            placeholder="altura"
            name="altura"
            className="text"
            type="number"
            value={pokemonToPost.altura}
          />
          {errors.altura && "Altura is required"}
          <input
          {...register("peso", { required: true })}
            onChange={(e) => handleChange(e)}
            placeholder="peso"
            name="peso"
            className="text"
            type="number"
            value={pokemonToPost.peso}
          />
          {errors.peso && "Peso is required"}
          <select
          {...register("types", { required: true })}
            onChange={(e) => handleChange(e)}
            className="text"
            name="types"
          >
            {types &&
              types.map((type) => <option key={type.id}>{type.name}</option>)}
          </select>
          {errors.types && "Tipos is required"}
          <input className="submit" type="submit" value="Create" />
        </form>
      </div>
    </div>
  );
}
