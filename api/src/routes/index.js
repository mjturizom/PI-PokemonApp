const { Router } = require("express");
const axios = require("axios").default;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Pokemon, Tipo } = require("../db.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons", (req, res) => {
  if (req.query.name) {
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon/${req.query.name}`)
      .then((resp) => {
        const pokemon={
          id:resp.data.id,
          name:resp.data.name,
          imagen: resp.data.sprites.other.dream_world.front_default,
          vida:resp.data.stats[0].base_stat,
          fuerza:resp.data.stats[1].base_stat, 
          defensa:resp.data.stats[2].base_stat, 
          velocidad:resp.data.stats[5].base_stat,
          altura:resp.data.height,
          peso:resp.data.weight
        }
        res.json(pokemon);
      })
      .catch((reason) => {
        res.status(404).send({
          message:
            "Pokemón no encontrado, prueba escribir el nombre correctamente o con otro pokemón",
        });
      });
  }
  let pokemons = [];

  axios.get("https://pokeapi.co/api/v2/pokemon").then((resp) => {
    pokemons = pokemons.concat([
      { next: resp.data.next, previous: resp.data.previous },
      resp.data.results,
    ]);
    axios.get(resp.data.next).then((resp) => {
      pokemons = pokemons.concat([
        { next: resp.data.next, previous: resp.data.previous },
        resp.data.results,
      ]);
      Promise.all(pokemons[1].map((pokemon) => axios.get(pokemon.url)))
        .then((values) => {
          let response = values.map((value) => {
            return {
              name: value.data.name,
              imagen: value.data.sprites.other.dream_world.front_default,
              type: value.data.types.map((type) => {
                return type.type.name;
              }),
            };
          });
          res.json(response);
        })
        .catch((reason) => {
          res
            .status(500)
            .send("No se pudo resolver la petición en el servidor");
        });
    });
  });
});
router.get("/pokemons/:idPokemon", (req, res) => {
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${req.params.idPokemon}`)
    .then((resp) => {
      const pokemon={
        id:resp.data.id,
        name:resp.data.name,
        imagen: resp.data.sprites.other.dream_world.front_default,
        vida:resp.data.stats[0].base_stat,
        fuerza:resp.data.stats[1].base_stat, 
        defensa:resp.data.stats[2].base_stat, 
        velocidad:resp.data.stats[5].base_stat,
        altura:resp.data.height,
        peso:resp.data.weight
      }
      res.json(pokemon);
    }).catch((reason)=>{
      res.status(404).send({
        message:
          `Pokemón con id ${req.params.idPokemon} no se encuentra registrado, prueba un id valido`,
      });
    });
});

module.exports = router;
