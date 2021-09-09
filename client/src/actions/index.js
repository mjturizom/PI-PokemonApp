export function getPokemon(pokemon){
    return function(dispatch){
        return fetch('http://localhost:3001/pokemons?name='+pokemon)
        .then((pokemon)=>pokemon.json())
        .then((pokemonJson)=>{dispatch({type:"GET_POKEMON", payload:pokemonJson})})
    }
}
export function getPokemonDetail(id){
    return function(dispatch){
        return fetch('http://localhost:3001/pokemons/'+id)
        .then((pokemonDetail)=>pokemonDetail.json())
        .then((pokemonDetailJson)=>{dispatch({type:"GET_POKEMON", payload:pokemonDetailJson})})
    }
}

export function addPokemon(pokemon){
    return {type:"ADD_POKEMON", payload:pokemon}
}