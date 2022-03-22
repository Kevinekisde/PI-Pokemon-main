import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { postPokemon, getTypes } from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import s from './styles/PokemonCreate.module.css'

function validate(input) {

    const reg = new RegExp('^[0-9]+$');
    let errors = {};
    
    if (!input.name || input.name.match(reg)) {
        errors.name = "Se requiere un nombre valido"
    } else if (!input.hp || !input.hp.match(reg)) { 
        errors.hp = "Se requiere un valor numerico de vida"
    } else if (!input.attack || !input.attack.match(reg) ) {
        errors.attack = "hace falta un valor numerico de ataque"
    } else if (!input.defense || !input.defense.match(reg) ) {
        errors.defense = "hace falta un valor numerico de defensa"
    } else if (!input.speed || !input.speed.match(reg)) {
        errors.speed = "hace falta un valor numerico de velocidad"
    } else if (!input.weight || !input.weight.match(reg)) {
        errors.weight = "hace falta un valor numerico de Peso"
    } else if (!input.height || !input.height.match(reg)) {
        errors.height = "hace falta un valor numerico de Altura"
    }
    
    if(errors.hp || errors.name || errors.attack || errors.defense || errors.speed || errors.weight || errors.height){
        const button = document.getElementById("Button")
        button.disabled = true;
    }else{
        const button = document.getElementById("Button")
        button.disabled = false;
    }
    return errors
}

const PokemonCreate = () => {
    const dispatch = useDispatch()
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
    }, [dispatch])





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
    }

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

    const handleSelect = (e) => {

        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }))
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
                        <label>Nombre: </label>
                        <input
                            className={s.input}
                            type="text"
                            value={input.name}
                            name="name"
                            onChange={handleChange}
                        />
                        {
                            errors.name && (
                                <p className="error">{errors.name}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Puntos de Vida: </label>
                        <input
                            className={s.input}
                            type="text"
                            value={input.hp}
                            name="hp"
                            onChange={handleChange}
                        />
                        {
                            
                            errors.hp && (
                                <p className="error">{errors.hp}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Ataque: </label>
                        <input
                            className={s.input}
                            type="text"
                            value={input.attack}
                            name="attack"
                            onChange={handleChange}
                        />
                        {
                            
                            errors.attack && (
                                <p className="error">{errors.attack}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Defensa: </label>
                        <input
                            className={s.input}
                            type="text"
                            value={input.defense}
                            name="defense"
                            onChange={handleChange}
                        />
                        {
                            
                            errors.defense && (
                                <p className="error">{errors.defense}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Velocidad: </label>
                        <input
                            className={s.input}
                            type="text"
                            value={input.speed}
                            name="speed"
                            onChange={handleChange}
                        />
                        {
                            
                            errors.speed && (
                                <p className="error">{errors.speed}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Peso: </label>
                        <input
                            className={s.input}
                            type="text"
                            value={input.weight}
                            name="weight"
                            onChange={handleChange}
                        />
                        {
                            
                            errors.weight && (
                                <p className="error">{errors.weight}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Altura: </label>
                        <input
                            className={s.input}
                            type="text"
                            value={input.height}
                            name="height"
                            onChange={handleChange}
                        />
                        {
                            
                            errors.height && (
                                <p className="error">{errors.height}</p>
                            )
                        }
                    </div>
                    <div>
                        <label>Foto: </label>
                        <input
                            className={s.input}
                            type="text"
                            value={input.img}
                            name="img"
                            onChange={handleChange}
                        />
                    </div>
                    <h2>Elige El Tipo: </h2>
                    <select id="Select" onChange={handleSelect}>
                        {
                            types.map((type) => (
                                <option value={type.name}>{type.name}</option>

                            ))
                        }

                    </select>
                        {
                            
                            errors.select && (
                                <p className="error">{errors.select}</p>
                            )
                        }
                    <button disabled="true"  id='Button' type="submit">Crear Pokemon</button>
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