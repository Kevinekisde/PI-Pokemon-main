import React from "react";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import {
  getPokemon,
  searchPokemon,
  filterCreated,
  orderByName,
  orderByAttack
} from "../actions";


import Card from "./Card"
import Nav from "./Nav";
import Paginado from "./Paginado";
import s from './styles/Home.module.css';


const Home = () => {

  const dispatch = useDispatch()
  const allPokemon = useSelector((state) => state.pokemon)
  const [/*order*/, setOrder] = useState('')

  const [currentPage, setCurrentPage] = useState(1) //! Pagina inicial
  const [characterPerPage, /*setCharacterPerPage*/] = useState(12) //! Cuantos persoanje msotrare por pagina
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
    setCurrentPage(1)
  }


  const handleSearch = (value) => {
    dispatch(searchPokemon(value))
    setCurrentPage(1)
  }
  function handleFilterCreated(e) {
    dispatch(filterCreated(e.target.value))
  }
  function handleSortedName(e) {
    e.preventDefault()
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado.${e.target.value}`)
  }

  function handleSortedAttack(e) {
    e.preventDefault()
    dispatch(orderByAttack(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado.${e.target.value}`)
  }


  return (
    <>

      {
        allPokemon.length ?
          <>
          
            <Nav onSearch={handleSearch}></Nav>
            <main className={s.mainFlex}>
              <h4>Filtros:</h4>
              <div className={s.selectBoxes}>
              <select onClick={e => handleSortedName(e)}>
                <option value="des">Descendente</option>
                <option value="asc">Ascendente</option>
              </select>
              <select onClick={e => handleSortedAttack(e)}>
                <option value="mayorToMinus">Menor a Mayor</option>
                <option value="minusToMayus">Mayor a menor</option>
              </select>
              <select onClick={e => handleFilterCreated(e)}>
                <option value="All">Todos</option>
                <option value="created">Creados</option>
                <option value="api">Api</option>
              </select>
              </div>
              <button className={s.button} onClick={handleClick}>Restablecer</button>
              <div className={s.sectionFlex}>
                {currentCharacters?.map(pokemon => {
                  return (
                    <div className={s.card}  key={pokemon.id}>

                      <Link to={"/home/" + pokemon.id}>
                        <Card
                          img={pokemon.img}
                          attack={pokemon.attack}
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
          <div className={s.div}>
            <div className={s.pokeball}></div>
          </div>
      }

    </>
  )
}

export default Home