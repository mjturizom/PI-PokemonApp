const initialState = {
  pokemons: [],
  pokemonsToFilterByType:[],
  pokemonsToFilterByOrigin:[],
  types:[]
};
function rootReducer(state = initialState, action) {
  if (action.type === "GET_POKEMONS") {
    return {
      ...state,
      pokemons: action.payload,
      pokemonsToFilterByType:action.payload,
      pokemonsToFilterByOrigin:action.payload
    };
  }
  if (action.type === "GET_TYPES") {
    return {
      ...state,
      types: action.payload,
    };
  }
  if (action.type==="FILTER_BY_TYPE"){
    const pokemonsByType=
    action.payload==='allType' ? state.pokemonsToFilterByType :
    state.pokemonsToFilterByType.filter((pokemon)=>pokemon.types.includes(action.payload))
    return{
        ...state,
        pokemons:pokemonsByType,
        pokemonsToFilterByOrigin:pokemonsByType
    }
  }
  if(action.type==="FILTER_BY_ORIGIN"){
    const pokemonsByOrigin=(
    action.payload==='all' ? state.pokemonsToFilterByOrigin :
    action.payload==='creat'?
    state.pokemonsToFilterByOrigin.filter((pokemon)=>pokemon.id>3000&&pokemon.id<10000):
    state.pokemonsToFilterByOrigin.filter((pokemon)=>pokemon.id<3000||pokemon.id>10000));
    return{
        ...state,
        pokemons:pokemonsByOrigin
    }
  }
}
export default rootReducer;
