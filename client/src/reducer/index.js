const initialState = {
  pokemons: [],
  types:[]
};
function rootReducer(state = initialState, action) {
  if (action.type === "GET_POKEMONS") {
    return {
      ...state,
      pokemons: action.payload,
    };
  }
  if (action.type === "GET_TYPES") {
    return {
      ...state,
      types: action.payload,
    };
  }
}
export default rootReducer;
