const db = require('../../database/models');
const sequelize = db.sequelize;


module.exports = {
    'list': async (req, res) => {
       try {
           let actors = await db.Actor.findAll();
           let response = {
               meta: {
                   status: 200,
                   url: '/apis/actors'
               },
               data: actors
           }
           return res.status(200).json(response)
       } catch (error) {
           return res.status(error.status || 500).json(error)
       }
    },
    'detail': async (req, res) => {
        try {
            let actor = await db.Actor.findByPk(req.params.id)
            let response = {
               meta: {
                   status: 200,
                   total: actors.length,
                   url: '/apis/actors/' + req.params.id
               },
               data: actor
           }
           return res.status(200).json(response)
        } catch (error) {
            return res.status(error.status || 500).json(error)
        }
    }

}

