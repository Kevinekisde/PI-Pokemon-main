import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { postPokemon, getTypes, getPokemon } from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import s from './styles/PokemonCreate.module.css'

function validate(input) {

    const reg = new RegExp('^[0-9]+$');

    let errors = {};
    if (!input.name || input.name.match(reg) || input.name.length < 3 || input.name.includes(" ")) {
        errors.name = "Se requiere un nombre valido 3 caracteres y sin espacios"
    } else if (!input.hp || !input.hp.match(reg) || input.hp.length > 2 || input.hp.includes(" ")) {
        errors.hp = "Se requiere un valor numerico de vida no mayor a 99"
    } else if (!input.attack || !input.attack.match(reg) || input.attack.length > 2 || input.attack.includes(" ")) {
        errors.attack = "hace falta un valor numerico de ataque no mayor a 99"
    } else if (!input.defense || !input.defense.match(reg) || input.defense.length > 2 || input.defense.includes(" ")) {
        errors.defense = "hace falta un valor numerico de defensa"
    } else if (!input.speed || !input.speed.match(reg) || input.speed.length > 2 || input.speed.includes(" ")) {
        errors.speed = "hace falta un valor numerico de velocidad no mayor a 99"
    } else if (!input.weight || !input.weight.match(reg) || input.weight.length > 2 || input.weight.includes(" ")) {
        errors.weight = "hace falta un valor numerico de Peso no mayor a 99"
    } else if (!input.height || !input.height.match(reg) || input.height.length > 2 || input.height.includes(" ")) {
        errors.height = "hace falta un valor numerico de Altura no mayor a 99"
    }else if (!input.img){
        errors.img = "hace falta una foto"
    }

    if (errors.hp || errors.name || errors.attack || errors.defense || errors.speed || errors.weight || errors.height || errors.img || errors.types) {
        const button = document.getElementById("Button")
        button.disabled = true;
    } else {
        const button = document.getElementById("Button")
        button.disabled = false;
    }
    return errors
}

const PokemonCreate = () => {
    const dispatch = useDispatch()
    const types = useSelector((state) => state.types)
    const Pokemon = useSelector((state) => state.allPokemon)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        hp: "",
        attack: "",
        defense: "",
        speed: "",
        weight: "",
        height: "",
        types: [],
        img:""
    })

    useEffect(() => {
        dispatch(getPokemon())
        dispatch(getTypes())
    }, [dispatch])


    const handleSubmit = (e) => {
        e.preventDefault()
        if(input.types.length > 2 || input.types.length === 0){
            alert("Porfavor selecciona de 1 a 2 tipos")   
        }else if(Pokemon.find(el => el.name.toLowerCase() === input.name.toLowerCase())){
            alert("El pokemon ya existe")
        }
        else{
            dispatch(postPokemon(input))
            alert("Personaje creado")
            setInput({
                name: "",
                hp: "",
                attack: "",
                defense: "",
                speed: "",
                weight: "",
                height: "",
                types: [],
                img:""
            })
        }
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
                    <div>
                        <label htmlFor='life'>Puntos de Vida: </label>
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
                        {
                            errors.img && (
                                <p className="error">{errors.img}</p>
                            )
                        }
                    </div>
                    <h2>Selecciona de 1 a 2 tipos: </h2>
                    <select id="Select"  onChange={handleSelect}>
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
                    <button disabled={true} id='Button' type="submit">Crear Pokemon</button>
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