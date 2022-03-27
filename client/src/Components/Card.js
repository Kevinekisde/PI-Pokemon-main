import React from "react";
import Classes from './styles/Card.module.css';
import { Link } from "react-router-dom";


const Card = ({ name, img, types, id, createdInDb }) => {
  return (


    <div className={Classes.container}>
      <div className={Classes.top}>
        <h3>{name && name.toUpperCase()}</h3>
      </div>
      <div className={Classes.rest}>
        <Link to={`/home/${id}`}>
          <div className={Classes.img}>
            <img src={img} onerror="this.onerror=null;this.src='https://i.ytimg.com/vi/PkgfWU08_WU/mqdefault.jpg';" alt="Pokemon"/>
          </div>
        </Link>

        <div className={Classes.types}>
          {!createdInDb ?
            types.map((type) => {
              return (
                <div key={type} className={Classes.type}>
                  <img
                    alt="Type"
                    src={require(`./typeImage/${type}.png`).default}
                  />
                </div>
              );
            }) :
            types.map(el => {
              return (

                <div key={el.name} className={Classes.type}>
                  <img
                    alt="Type"
                    src={require(`./typeImage/${el.name}.png`).default}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Card