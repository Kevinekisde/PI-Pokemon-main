import React from "react";
import s from './styles/pagination.module.css'


export default function Paginado ({characterPerPage, allCharacters,paginado}) {
    const pageNumbers = []
    for(let i = 1; i <= Math.ceil(allCharacters/characterPerPage); i++) {
        pageNumbers.push(i)

    }

    return(
        <nav>
            <ul className={s.paginado}>
            <a>⬅</a>
                {pageNumbers &&
                pageNumbers.map(number =>{
                    return(
                    <li className="number" key={number}>
                    <a onClick={() => paginado(number)}>{number}</a>
                    </li>

                    )
                })}
                <a>➡</a>
            </ul>
        </nav>
    )
}