import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postPokemon, getTypes } from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import s from './styles/PokemonCreate.module.css'


const PokemonCreate = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const types = useSelector((state) => state.types)
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        weight: "",
        height: "",
        types: []
    })

    useEffect(() => {
        dispatch(getTypes())
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postPokemon(input))
        alert("Personaje creado")

        setInput({
            name: "",
            nickname: "",
            birthday: "",
            status: "",
            types: []
        })
        navigate.push('/home')
    }

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleSelect = (e) => {

        setInput({
            ...input,
            types: [...input.types, e.target.value]
            
        })
    }
    const handleDelete = (el) => {
        setInput({
            ...input,
            types: input.types.filter(type => type !== el)

        })
    }


    return (
        <div className={s.root}>

                <Link to="/home"><button className={s.button}>⬅Volver</button></Link>
            <div className={s.container}>
                <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
                    <h1>Crea tu Pokemon</h1>
                    <div>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={input.name}
                            name="name"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Puntos de Vida:</label>
                        <input
                            type="text"
                            value={input.hp}
                            name="hp"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Ataque:</label>
                        <input
                            type="text"
                            value={input.attack}
                            name="attack"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Defensa:</label>
                        <input
                            type="text"
                            value={input.defense}
                            name="defense"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Velocidad:</label>
                        <input
                            type="text"
                            value={input.speed}
                            name="speed"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Peso:</label>
                        <input
                            type="text"
                            value={input.weight}
                            name="weight"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Altura:</label>
                        <input
                            type="text"
                            value={input.height}
                            name="height"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Foto:</label>
                        <input
                            type="text"
                            value={input.img}
                            name="img"
                            onChange={handleChange}
                        />
                    </div>
                    <h2>Elige El Tipo:</h2>
                    <select onChange={handleSelect}>
                        {
                            types.map((type) => (
                                <option value={type.name}>{type.name}</option>
                                
                            ))
                        }

                    </select>
                        <button type="submit">Crear Pokemon</button>
                </form>
                <div className={s.types}>
                    <h1>Tipos seleccionados</h1>
                    {input.types.map(el =>
                        <div className={s.type}>
                            <p>{el}</p>
                            <button className={s.buttondel} onClick={() => handleDelete(el)}>Borrar</button>
                        </div>)}
                </div>
            </div>
        </div>
    )

}

export default PokemonCreate