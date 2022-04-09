import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail,deletePokemon } from "../actions/index"
import { useEffect } from "react";
import s from './styles/Details.module.css'


const Details = () => {
    let { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])

    const handleDelete = () =>{
        dispatch(deletePokemon(id))
        navigate('/home')
    }
    const myPokemon = useSelector((state) => state.detail)
    return (
        <div className={s.container}>
            {
                myPokemon.length > 0 ?
                    <div className={s.card}>
                        <Link to="/home"><button className={s.button}>Volver</button></Link>
                        <Link to={`/home/update/${id}`}><button className={s.buttons}>Editar Nombre</button></Link>
                        <button onClick={handleDelete}>Borrar Pokemon</button>
                        <div className={s.textimg}>
                            <h1>{myPokemon[0].name}</h1>
                            <h2>Id: {myPokemon[0].id} </h2>
                            <img src={myPokemon[0].img ? myPokemon[0].img : myPokemon[0].image}
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = "https://i.ytimg.com/vi/PkgfWU08_WU/mqdefault.jpg";
                                }} alt="" />
                        </div>
                        <div className={s.stats}>
                            <h2>Hp: {myPokemon[0].hp}</h2>
                            <h2>Weight: {myPokemon[0].weight}</h2>
                            <h2>Height: {myPokemon[0].height}</h2>
                            <h2>Attack: {myPokemon[0].attack}</h2>
                            <h2>Defense: {myPokemon[0].defense}</h2>
                            <h2>Speed: {myPokemon[0].speed}</h2>
                        </div>
                        <div className={s.type}>
                            {!myPokemon[0].createdInDb ?
                                myPokemon[0].types.map((type) => {
                                    return (
                                        <img
                                            key={type}
                                            alt="Type"
                                            src={require(`./typeImage/${type}.png`).default}
                                        />

                                    );
                                })
                                : myPokemon[0].types.map(el => {
                                    return (

                                        <img
                                            alt="type"
                                            src={require(`./typeImage/${el.name}.png`).default}
                                        />

                                    )
                                })}
                        </div>
                    </div> :
                    <p>Loading</p>
            }
        </div>

    )
}

export default Details