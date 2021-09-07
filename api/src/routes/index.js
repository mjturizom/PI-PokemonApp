const { Router } = require("express");
const axios = require("axios").default;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Pokemon, Type } = require("../db.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons", (req, res) => {
  if (req.query.name) {
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon/${req.query.name}`)
      .then((resp) => {
        const pokemon = {
          id: resp.data.id,
          name: resp.data.name,
          imagen: resp.data.sprites.other.dream_world.front_default,
          vida: resp.data.stats[0].base_stat,
          fuerza: resp.data.stats[1].base_stat,
          defensa: resp.data.stats[2].base_stat,
          velocidad: resp.data.stats[5].base_stat,
          altura: resp.data.height,
          peso: resp.data.weight,
        };

        Pokemon.findOne({ where: { name: req.query.name } }).then(
          (pokemonAtDb) => {
            //console.log(JSON.stringify(pokemonAtDb));
            res.json({ pokemon, pokemonAtDb });
          }
        );
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
          Pokemon.findAll().then((pokemonAtDb) =>
            res.json({ response, pokemonAtDb })
          );
          //res.json(response);
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
      const pokemon = {
        id: resp.data.id,
        name: resp.data.name,
        imagen: resp.data.sprites.other.dream_world.front_default,
        vida: resp.data.stats[0].base_stat,
        fuerza: resp.data.stats[1].base_stat,
        defensa: resp.data.stats[2].base_stat,
        velocidad: resp.data.stats[5].base_stat,
        altura: resp.data.height,
        peso: resp.data.weight,
      };
      res.json(pokemon);
    })
    .catch((reason) => {
      res.status(404).send({
        message: `Pokemón con id ${req.params.idPokemon} no se encuentra registrado, prueba un id valido`,
      });
    });
});

router.get("/types",(req,res)=>{
 Type.findAll().then((types)=>res.json(types));
})

router.post("/pokemons", (req, res) => {
  const { name, vida, fuerza, defensa, velocidad, altura, peso, type } =
    req.body;
  if (
    !name ||
    !vida ||
    !fuerza ||
    !defensa ||
    !velocidad ||
    !altura ||
    !peso ||
    !type
  )
    return res
      .status(400)
      .send({ message: "Faltan datos obligatorios para crear un pokemon" });

  const nuevoPokemon = Pokemon.create({
    name,
    vida,
    fuerza,
    defensa,
    velocidad,
    altura,
    peso,
  });
  nuevoPokemon
    .then((result) => {
      Promise.all(
        type.map((type) => Type.findOrCreate({ where: { name: type } }))
      )
        .then((values) => {
          console.log(JSON.stringify(values));
          result.addTypes(values.map((t) => t[0]));
          console.log(result.toJSON());
          res.json(result.toJSON());
        })
        .catch((reason) => {
          res
            .status(400)
            .json({ message: "El tipo recibido no es permitido en DB" });
        });
    })
    .catch((reason) => {
      res.status(400).send({
        message:
          "No se creó el pokemon correctamente, seguramente el nombre ya existe",
      });
    });
});

module.exports = router;
