import React from 'react'
import poke from './ilustraciones/pokeapi.svg'
import game from './ilustraciones/Game.svg'
import s from './styles/Landing.module.css'

const Landing = () => {
  return (

    <div className={s.container}>
        <div className={s.containertext}>
            <img src={poke} alt=""/>
            <a className={s.text} href="/home">Inicia tu aventura</a>
        </div>
        <div className={s.containerimage}>
            <img src={game} alt=""/>

        </div>
    </div>
  )
}

export default Landing