import axios from "axios";

export const getPokemon = () => {
  return async function (dispatch) {
    const pokemon = await axios.get("/pokemons");
    return dispatch({
      type: "GET_POKEMON",
      payload: pokemon.data,
    });
  };
};



export const getTypes = () => {
  return async function (dispatch) {
    const types = await axios.get("/types");
    return dispatch({
      type: "GET_TYPES",
      payload: types.data,
    });
  };
};


export function postPokemon(payload) {
  return async function (dispatch) {
    const json = await axios.post("/pokemons" ,payload);
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
          var json = await axios.get(`/pokemons/${id}`)
          return dispatch({
              type: 'GET_DETAILS',
              payload: json.data,
              
          })
      }catch(error){
        const err = error 
        if (err.response) {
           console.log(err.response.status)
           console.log(err.response.data)
           window.location.replace("/error")
      }
  }
}
}




export function filterCreated(payload){
  return {
      type: 'FILTER_CREATED',
      payload
  }
}

export function orderByName(payload){
  return{
      type: 'ORDER_BY_NAME',
      payload
  }
}


export function orderByAttack(payload){
  return{
    type: 'ORDER_BY_ATTACK',
    payload
  }
}