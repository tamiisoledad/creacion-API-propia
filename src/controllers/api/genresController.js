const db = require('../../database/models');
const sequelize = db.sequelize;


const genresController = {
    'list': async (req, res) => {
       try {
           let genre = await db.Genre.findAll();
           let response = {
               meta: {
                   status: 200,
                   total: genre.length,
                   url: '/apis/genres'
               },
               data: genres
           }
           return res.status(200).json(response)
       } catch (error) {
           return res.status(error.status || 500).json(error)
       }
    },
    'detail': async (req, res) => {
        try {
            let genre = await db.Genre.findByPk(req.params.id)
            let response = {
               meta: {
                   status: 200,
                   url: '/apis/genres/' + req.params.id
               },
               data: genres
           }
           return res.status(200).json(response)
        } catch (error) {
            return res.status(error.status || 500).json(error)
        }
    }

}

module.exports = genresController;