import React from 'react'
import s from "./styles/e404.module.css"
import error from './ilustraciones/Group3.svg'
import snorlax from './ilustraciones/snorlax.png'
import {Link} from 'react-router-dom'
const Error404 = () => {
  return (

    <div className={s.container}>
        <img alt="" className={s.error} src={error}></img>
        <div className={s.text}>
            <h1 className={s.ops}>Oops...</h1>
            <h3 className={s.sub}>Un Snorlax se ha comido la página<br/><span className={s.span}>que buscas.</span></h3>
        </div>
        <Link to="/home">
        <button className={s.button}>Volver a la Pokedex</button>
        </Link>
        <img alt='' className={s.snorlax} src={snorlax}></img>
    </div>
    
  )
}

export default Error404