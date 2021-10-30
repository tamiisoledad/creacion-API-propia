const express = require('express');
const router = express.Router();
const moviesController = require('../../controllers/api/moviesController');

router.get('/', moviesController.list);
router.get('/:id', moviesController.detail);
router.get('/new', moviesController.new);
router.get('/recomended', moviesController.recomended);
router.get('/create', moviesController.create);
router.get('/update/:id', moviesController.update);
router.get('/delete:id', moviesController.destroy);



module.exports = router;