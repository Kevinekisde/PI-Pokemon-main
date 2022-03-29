import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import s from './styles/Nav.module.css'


const Nav = ({onSearch}) => {
  const [value, setValue] = useState("");
  const allPokemon = useSelector((state) => state.pokemon)

  const handleSearchValue = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pokemon = allPokemon.find(el => el.name === value)
    pokemon?
    onSearch(value):
    alert("No existe pokemon")
    setValue("")
  };

  return (
    <>
    <div className={s.nav}>
        <h1>Pokedex</h1>
        <ul>
        <NavLink to="/home/create">
          <button className={s.button}>Crear Pokemon </button>
        </NavLink>
            <form onSubmit={handleSubmit}>
          <input
          className={s.input}
            onChange={handleSearchValue}
            value={value}
            type="search"
            placeholder="Busca un pokemon..."
          />
          <button type="submit">🔎</button>
            </form>
        </ul>

    </div>
    </>
  )
}

export default Nav