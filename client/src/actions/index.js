import axios from "axios";
//Accion de traer todos los pokemones 
export function getPokemons() {
  return function (dispatch) {
    return axios.get("http://localhost:3001/pokemons").then((pokemon) => 
      dispatch({ type: "GET_POKEMONS", payload: pokemon.data })
    );
  };
}
//Accion de traer typos desde DB
export function getTypes() {
    return function (dispatch) {
      return axios.get("http://localhost:3001/types").then((types) => 
        dispatch({ type: "GET_TYPES", payload: types.data })
      );
    };
  }
//Acccion de filtrado de pokemons por tipo
export function filterByType(type){
    return {
        type:'FILTER_BY_TYPE',
        payload:type
    }
}
export function filterByOrigin(type){
  return {
      type:'FILTER_BY_ORIGIN',
      payload:type
  }
}
export function OrderByAZ(orderType){
  return {
      type:'ORDER_BY_AZ',
      payload:orderType
  }
}
// export function getPokemon(pokemon) {
//   return function (dispatch) {
//     return fetch("http://localhost:3001/pokemons?name=" + pokemon)
//       .then((pokemon) => pokemon.json())
//       .then((pokemonJson) => {
//         dispatch({ type: "GET_POKEMON", payload: pokemonJson });
//       });
//   };
// }
// export function getPokemonDetail(id) {
//   return function (dispatch) {
//     return fetch("http://localhost:3001/pokemons/" + id)
//       .then((pokemonDetail) => pokemonDetail.json())
//       .then((pokemonDetailJson) => {
//         dispatch({ type: "GET_POKEMON", payload: pokemonDetailJson });
//       });
//   };
// }

// export function addPokemon(pokemon) {
//   return { type: "ADD_POKEMON", payload: pokemon };
// }
