const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');

const { Pokemon, Type } = require('../db')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () => {

    try {
        const apiInfo = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40");
        const promises = apiInfo.data.results.map((p) => axios.get(p.url));
        const pokePromises = await axios.all(promises);
        const pokemon = pokePromises.map((p) => {
          return {
            id: p.data.id,
            name: p.data.name,
            height: p.data.height,
            hp: p.data.stats[0].base_stat,
            attack: p.data.stats[1].base_stat,
            defense: p.data.stats[2].base_stat,
            speed: p.data.stats[5].base_stat,
            weight: p.data.weight,
            types: p.data.types.map((e) => e.type.name),
            img: p.data.sprites.versions["generation-v"]["black-white"].animated
              .front_default,
            backImg:
              p.data.sprites.versions["generation-v"]["black-white"].animated
                .back_default,
          };
        });
        return pokemon;
      } catch (error) {
        console.log(error);
      }
}


const getDbInfo = async () => {

    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through:{
                attributes:[]
            }
        },
    });

}

const getAllPokemons = async () => {
    let apiInfo = await getApiInfo()
    let dbInfo = await getDbInfo()
    let totalInfo = apiInfo.concat(dbInfo)
    return totalInfo
}

const saveTypes = async () => {
    try {
        const apiInfo = await axios.get("https://pokeapi.co/api/v2/type");
        const types = apiInfo.data.results.map((t) => {
            return { name: t.name };
        });

        let dbTypes = await Type.findAll();
        if (dbTypes.length === 0) {
            await Type.bulkCreate(types);
        }
    } catch (error) {
        console.log(error);
    }
};

const getTypesFromDB = async () => {
    try {
        let typesFromDB = await Type.findAll();
        typesFromDB = typesFromDB.map((t) => t.toJSON());
        return typesFromDB;
    } catch (error) {
        console.log(error);
    }
};



router.get('/pokemons', async (req, res) => {
    const name = req.query.name
    let pokemonTotal = await getAllPokemons()
    if (name) {
        let pokemonName = await pokemonTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        pokemonName.length ?
            res.status(200).send(pokemonName) :
            res.status(404).send("No existe pokemon")
    }else{
        res.status(200).send(pokemonTotal)
    }
})


router.get('/pokemons/:id', async (req, res) => {
    const { id } = req.params
    let pokemonTotal = await getAllPokemons()
    if (id) {
        let pokemonId = await pokemonTotal.filter(el => el.id == id)
        pokemonId.length ?
            res.status(200).send(pokemonId) :
            res.redirect(404,"/error")
    } else {
        res.status(200).send(pokemonTotal)
    }
})


router.get('/types', async (req, res) => {

    try {
        await saveTypes();
        let types = await getTypesFromDB();
        types = types.map((t) => {
            return {
                id: t.id,
                name: t.name,
            };
        });
        res.status(200).send(types);

    } catch (error) {
        res.send({ errorMsg: error });
    }

})


router.post('/pokemons', async (req, res) => {
    try {

        let {
            name,
            height,
            hp,
            attack,
            defense,
            speed,
            weight,
            img,
            types
        } = req.body

        const newPokemon = await Pokemon.create({
            name,
            height,
            hp,
            attack,
            defense,
            speed,
            weight,
            img,
        });

        let typesIndb = await Type.findAll({where:{name:types}})
        newPokemon.addType(typesIndb)
        res.status(200).send("Personaje creado con exito")


    } catch (error) {
        console.log(error);
        res.status(400).send({ errorMsg: error });
    }
})


router.get

module.exports = router;
