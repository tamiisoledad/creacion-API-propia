const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');


//Aqui tienen otra forma de llamar a cada uno de los modelos
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    'list': async (req, res) => {
        try {
            let movies = await  db.Movie.findAll({
            include: ['genre']
        })
         let response = {
               meta: {
                   status: 200,
                   total: movies.length,
                   url: '/apis/movies'
               },
               data: movies
           }
           return res.status(200).json(response)
        } catch (error) {
            return res.status(error.status || 500).json(error)
        }
    },
    'detail': async (req, res) => {
        try {
             let movie = await db.Movie.findByPk(req.params.id,
            {
                include : ['genre']
            })
            let response = {
               meta: {
                   status: 200,
                   url: '/apis/movies/' + req.params.id
               },
               data: movie
           }
           return res.status(200).json(response)
        } catch (error) {
            return res.status(error.status || 500).json(error)
        }
       
    },
    'new': async (req, res) => {
        try {
            let movies = await db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5})
            let response = {
               meta: {
                   status: 200,
                   url: '/apis/movies/new'
               },
               data: movies
           }
           return res.status(200).json(response)
        
        } catch (error) {
             return res.status(error.status || 500).json(error)
        }
    },
    'recomended': async (req, res) => {
        try {
            let movies = await  db.Movie.findAll({
            include: ['genre'],
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
        let response = {
               meta: {
                   status: 200,
                   total: movies.length,
                   url: '/apis/movies/recomended'
               },
               data: movies
           }
           return res.status(200).json(response)
        } catch (error) {
            return res.status(error.status || 500).json(error)
        }
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    create: async (req,res) => {
        try {
            let movies = await  Movies
        .create(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            }
        )
         let response = {
               meta: {
                   status: 200,
                   total: movies.length,
                   url: '/apis/movies/create',
                   msg: 'Pelicula guardada con éxito'
               },
               data: movies
           }
           return res.status(200).json(response)
        } catch (error) {
            return res.status(error.status || 500).json(error)
        }
    },
    update: async (req,res) => {
        try {
              let movieId = req.params.id;
       let movie = await Movies
        .update(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            },
            {
                where: {id: movieId}
            })
             let response = {
               meta: {
                   status: 200,
                   total: movie.length,
                   url: '/apis/movies/update'+req.params.id,
                   msg: 'Pelicula actualizada con éxito'
               },
               data: movie
             }
        } catch (error) {
            return res.status(error.status || 500).json(error)
        }
      
       
    },
    destroy: async (req,res) => {
        try {
             let movieId = req.params.id;
             let movie = await Movies
        .destroy({where: {id: movieId}, force: true}) 
         let response = {
               meta: {
                   status: 200,
                   total: movie.length,
                   url: '/apis/movies/delete'+req.params.id,
                   msg: 'Pelicula eliminada con éxito'
               },
               data: movie
             }
        } catch (error) {
             return res.status(error.status || 500).json(error)
        }
       
    }
}

module.exports = moviesController;