const initialState = {
    moviesFavourites: [],
    moviesLoaded: [],
    movieDetail: {},
};
function rootReducer(state = initialState, action) {

    if (action.type==='GET_POKEMON') {
        return{
            ...state,
            moviesLoaded:action.payload
        }
    }
}
export default rootReducer;