const { Router } = require('express');
const {Op} = require('sequelize');
const axios = require ('axios');
const {Genre, Videogame, video_genre} = require ('../db');
const {API_KEY} = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


//me traigo la data de la API
const getFromApi = async () => {
    let api= `https://api.rawg.io/api/games?key=${API_KEY}`;
    const apiInfo = []

   for (let i = 0; i <= 12; i++) {//
       const dataGames = await axios.get(api)       
       dataGames.data.results
       .map((e)=>{
           apiInfo.push({
            id: e.id,
            name: e.name,
            description: e.description,
            background_image: e.background_image,
            released: e.released,
            rating: e.rating,
            platforms: e.platforms.map(e => e.platform.name),
            genres: e.genres.map((e) => e.name)   
           });
       });
       api= dataGames.data.next;   
    }
    return apiInfo;
}



//trae los juegos de la base de datos
const getFromDb = async ()=>{
    return await Videogame.findAll({
        includes: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}

//unimos los juegos de api y db
const allGames = async ()=>{
    const api = await getFromApi()
    const db = await getFromDb()
    const total = api.concat(db)
    return total;
    
}

//guardamos los genres en la DB
const genresAll = async ()=>{
    const genresDB = await Genre.findAll({
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });
    if (!genresDB.length){
        const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
        const genresData = await genresApi.data.results;
        const genresMap= genresData.map((e)=> e.name);

        genresMap.map (async (e)=>
            await Genre.findOrCreate({
                where:{
                    name: e
                }
            })
        )
        return genresMap
    } else {
        return genresDB.map((e)=> e.name)
    }
}



//RUTAS

//todos los videogames y los pasados por query name.
router.get('/videogames', async (req,res)=> {
    const name = req.query.name;
    let vgameAll = await allGames();
    if (name) {
        let gameName = vgameAll.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
        gameName.length ?
            res.status(200).send(gameName) :
            res.status(404).send('No se encontró el Juego');

    } else {
        res.status(200).send(vgameAll);
    }

});

//videosgames por ID
router.get('/videogames/:id', async (req,res)=>{
  const { id } = req.params;
  try {
    if (id.includes("-")) { //detectar UUID en DB
      const gameDB = await Videogame.findOne({
        where: { id },
        include: [Genre, Platform],
      });
      return res.json(gameDB);
    }

    const gameAPI = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
    );
    res.json(gameAPI.data);
  } catch (err) {
    res.status(404).json({ error: "Id not found" });
  }
})

//ruta de genres
router.get('/genres', async (req, res)=>{
    const genresTotal = await genresAll();
    res.send(genresTotal)
})

//ruta crear nuevo videojuego
router.post('/videogame', async (req, res)=>{
    const {name, description, released, rating, platforms, background_image, genre, createdInDb} = req.body

    let newGame = await Videogame.create({
        name,
        description,
        released,
        rating,
        platforms,
        background_image,
        createdInDb
    });
    const genresDB = await Genre.findAll({
        where: {
            name: 'genres',
        }
    })
    newGame.addGenres(genresDB);
    res.status(200).send('New Videogame was created');
})



module.exports = router;
