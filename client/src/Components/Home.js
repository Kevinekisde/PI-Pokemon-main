import React from "react";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import {
  getPokemon,
  getTypes,
  searchPokemon
} from "../actions";


import Card from "./Card"
import Nav from "./Nav";
import Paginado from "./Paginado";
import s from './styles/Home.module.css';


const Home = () => {

  const dispatch = useDispatch()
  const allPokemon = useSelector((state) => state.allPokemon)

  const [currentPage, setCurrentPage] = useState(1) //! Pagina inicial
  const [characterPerPage, setCharacterPerPage] = useState(12) //! Cuantos persoanje msotrare por pagina
  const indexOfLastCharacter = currentPage * characterPerPage //! el ultimo personaje de mi pagina
  const indexOfFirstCharacter = indexOfLastCharacter - characterPerPage //! MI primer personaje
  const currentCharacters = allPokemon.slice(indexOfFirstCharacter, indexOfLastCharacter) //! corta el array desde mi primer personaje al ultimo

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber) //! Cambio el estado de la pagina para ir a la siguiente
  }

  useEffect(() => {
    dispatch(getPokemon())

  }, [dispatch])

  function handleClick(e) {
    e.preventDefault()
    dispatch(getPokemon())
}


  const handleSearch=(value) =>{
    dispatch(searchPokemon(value))
    setCurrentPage(1)
  }

  return (
    <>

    {
      allPokemon.length?
      <>
      <Nav onSearch={handleSearch}></Nav>
      <main className={s.mainFlex}>

          <button className={s.button} onClick={handleClick}>Inicio</button>
        <div className={s.sectionFlex}>
          {currentCharacters?.map(pokemon => {
            return (
              <div className={s.card}>

                <Link to={"/home/" + pokemon.id}>
                <Card
                  img={pokemon.img}
                  name={pokemon.name}
                  id={pokemon.id}
                  types={pokemon.types}
                  createdInDb={pokemon.createdInDb}
                  />
                  </Link>
              </div>
            )
          })
          }
        </div>

      </main>

      <Paginado
        characterPerPage={characterPerPage}
        allCharacters={allPokemon.length}
        paginado={paginado}
      ></Paginado>
      </> :
      <h1>Cargando...</h1>
    }
      
    </>
  )
}

export default Home