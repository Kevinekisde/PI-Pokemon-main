const initialState = {
  pokemon: [],
  allPokemon: [],
  types: [],
  detail: []
}

const searchPokemon = (name, array) => {
  return array.filter((poke) => poke.name.toLowerCase() === name.toLowerCase());
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_POKEMON":
      return {
        ...state,
        pokemon: action.payload,
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
        pokemon: searchPokemon(action.payload, state.allPokemon),
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload
      }
    case "UPDATE_POKEMON":
      return {
        ...state
      }

    case "DELETE_POKEMON":
      return {
        ...state
      }
    case 'FILTER_CREATED':

      const allPokemon = state.allPokemon
      const createdFilter = action.payload === 'created' ? allPokemon.filter(el => el.createdInDb) : allPokemon.filter(el => !el.createdInDb)
      return {
        ...state,
        pokemon: action.payload === "All" ? state.allPokemon : createdFilter
      }
    case 'ORDER_BY_NAME':
      let sortedArr
      if (action.payload === "asc") {
        sortedArr = state.pokemon.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return -1
          }
          return 0

        })
      } else if (action.payload === "des") {
        sortedArr = state.pokemon.sort(function (a, b) {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1
          }
          if (b.name.toLowerCase() > a.name.toLowerCase()) {
            return 1
          }
          return 0
        })
      } else {
        return {
          ...state
        }
      }
      return {
        ...state,
        pokemon: sortedArr
      }
    case 'ORDER_BY_ATTACK':
      let attackSort
      if (action.payload === 'mayorToMinus') {
        attackSort = state.pokemon.sort(function (a, b) {
          if (a.attack > b.attack) {
            return 1
          }
          if (b.attack > a.attack) {
            return -1
          }
          return 0
        })
      } else if (action.payload === "minusToMayus") {
        attackSort = state.pokemon.sort(function (a, b) {
          if (a.attack > b.attack) {
            return -1
          }
          if (b.attack > a.attack) {
            return 1
          }
          return 0
        })
      } else {
        return {
          ...state
        }
      }
      return {
        ...state,
        pokemon: attackSort
      }

    default:
      return { ...state };
  }
};

export default rootReducer;