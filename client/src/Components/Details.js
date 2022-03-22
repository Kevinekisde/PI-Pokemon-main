import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index"
import { useEffect } from "react";
import s from './styles/Details.module.css'


const Details = () => {
    let { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id])

    const myPokemon = useSelector((state) => state.detail)
    console.log(myPokemon)
    return (
        <div className={s.container}>
            {
                myPokemon.length > 0 ?
                    <div className={s.card}>
                        <Link to="/home"><button className={s.button}>Volver</button></Link>
                        <div className={s.textimg}>
                            <h1>{myPokemon[0].name}</h1>
                            <h2>Id: {myPokemon[0].id} </h2>
                            <img src={myPokemon[0].img ? myPokemon[0].img : myPokemon[0].image} alt="" />
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