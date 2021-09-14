const initialState = {
  pokemons: [],
  pokemonsToFilterByType: [],
  pokemonsToFilterByOrigin: [],
  types: [],
};
//funciones para ordenar por name
function sortBynameAsc(a, b) {
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;
  return 0;
}
function sortBynameDesc(a, b) {
  if (a.name > b.name) return -1;
  if (a.name < b.name) return 1;
  return 0;
}
//funciones para ordenar por fuerza
function sortByFuerzaAsc(a, b) {
  if (a.fuerza > b.fuerza) return 1;
  if (a.fuerza < b.fuerza) return -1;
  return 0;
}
function sortByFuerzaDesc(a, b) {
  if (a.fuerza > b.fuerza) return -1;
  if (a.fuerza < b.fuerza) return 1;
  return 0;
}
function rootReducer(state = initialState, action) {
  if (action.type === "GET_POKEMONS") {
    return {
      ...state,
      pokemons: action.payload,
      pokemonsToFilterByType: action.payload,
      pokemonsToFilterByOrigin: action.payload,
    };
  }

  if(action.type==='GET_POKEMON'){
    return {
        ...state,
        pokemons:action.payload
    }
  }

  if (action.type === "GET_TYPES") {
    return {
      ...state,
      types: action.payload,
    };
  }
  if (action.type === "ADD_POKEMON") {
    return {
      ...state,
      
    };
  }
  if (action.type === "FILTER_BY_TYPE") {
    const pokemonsByType =
      action.payload === "allType"
        ? state.pokemonsToFilterByType
        : state.pokemonsToFilterByType.filter((pokemon) =>
            pokemon.types.includes(action.payload)
          );
    return {
      ...state,
      pokemons: pokemonsByType,
      pokemonsToFilterByOrigin: pokemonsByType,
    };
  }
  if (action.type === "FILTER_BY_ORIGIN") {
    const pokemonsByOrigin =
      action.payload === "all"
        ? state.pokemonsToFilterByOrigin
        : action.payload === "creat"
        ? state.pokemonsToFilterByOrigin.filter(
            (pokemon) => pokemon.id > 3000 && pokemon.id < 10000
          )
        : state.pokemonsToFilterByOrigin.filter(
            (pokemon) => pokemon.id < 3000 || pokemon.id > 10000
          );
    return {
      ...state,
      pokemons: pokemonsByOrigin,
    };
  }
  if (action.type === "ORDER_BY") {
    const pokemonsOrderBy =
      action.payload === "default"
        ? action.way === "asc"
          ? state.pokemons.sort((a, b) => a.id - b.id)
          : state.pokemons.sort((a, b) => b.id - a.id)
        : action.payload === "AZ"
        ? state.pokemons.sort(
            action.way === "asc" ? sortBynameAsc : sortBynameDesc
          )
        : state.pokemons.sort(
            action.way === "asc" ? sortByFuerzaAsc : sortByFuerzaDesc
          );
    return {
      ...state,
      pokemons: pokemonsOrderBy,
    };
  }
}

export default rootReducer;
