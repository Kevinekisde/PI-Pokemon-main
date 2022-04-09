import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { editPokemon } from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import s from './styles/PokemonCreate.module.css'


function validate(input) {

    const reg = new RegExp('^[0-9]+$');

    let errors = {};
    if (!input.name || input.name.match(reg) || input.name.length < 3 || input.name.includes(" ")) {
        errors.name = "Se requiere un nombre valido 3 caracteres y sin espacios"
    }
    if ( errors.name) {
        const button = document.getElementById("Button")
        button.disabled = true;
    } else {
        const button = document.getElementById("Button")
        button.disabled = false;
    }
    return errors
}

const Update = () => {
    let { id } = useParams()
    const dispatch = useDispatch()
    const [input, setInput] = useState({
        name: ''
    })
    const [errors, setErrors] = useState({})


    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(editPokemon(id,input))
        alert("Personaje actualizado")
    }
    return (
        <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
        <h1>Crea tu Pokemon</h1>
        <div>
            <label htmlFor='name'>Name:</label>
            <input
                className={s.input}
                type="text"
                value={input.name}
                name="name"
                id='name'
                onChange={handleChange}
            />
            {
                errors.name && (
                    <p className="error">{errors.name}</p>
                )
            }
        </div>
        <button disabled={true} id='Button' type="submit">Crear Pokemon</button>
        </form>
    )
}

export default Update