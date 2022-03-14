import axios from "axios";

export const getPokemon = () => {
  return async function (dispatch) {
    const pokemon = await axios.get("http://127.0.0.1:3001/pokemons");
    return dispatch({
      type: "GET_POKEMON",
      payload: pokemon.data,
    });
  };
};



export const getTypes = () => {
  return async function (dispatch) {
    const types = await axios.get("http://127.0.0.1:3001/types");
    return dispatch({
      type: "GET_TYPES",
      payload: types.data,
    });
  };
};


export function postPokemon(payload) {
  return async function (dispatch) {
    const json = await axios.post("http://127.0.0.1:3001/pokemons" ,payload);
    return json
  }
}


export const searchPokemon = (name) => {
  return {
    type: "SEARCH_POKEMON",
    payload: name,
  };
};

export function getDetail(id){
  return async function(dispatch){
      try{
          var json = await axios.get(`http://127.0.0.1:3001/pokemons/${id}`)
          return dispatch({
              type: 'GET_DETAILS',
              payload: json.data
          })
      }catch(error){
          console.log(error)
      }
  }

}
