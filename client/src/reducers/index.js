const initialState={
  pokemon:[],
  allPokemon:[],
  types:[],
  detail:[]
}

const searchPokemon = (name, array) => {
  return array.filter((poke) => poke.name.toLowerCase() === name.toLowerCase());
};
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_POKEMON":
        return {
          ...state,
          pokemon:action.payload,
          allPokemon: action.payload,
        };
        
      case "GET_TYPES":
        return {
          ...state,
          types: action.payload,
        };

        case "POST_POKEMON":
            return {
                ...state,
            }

        case "SEARCH_POKEMON":
          return {
            ...state,
            allPokemon: searchPokemon(action.payload, state.pokemon),
          };
          case "GET_DETAILS":
            return {
                ...state,
                detail: action.payload
            }

      default:
        return { ...state };
    }
  };
  
  export default rootReducer;