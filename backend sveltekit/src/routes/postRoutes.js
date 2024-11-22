const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const AuthMiddleware = require('../middlewares/auth');

router.post('/', AuthMiddleware.authenticate, PostController.create.bind(PostController));
router.get('/', PostController.getAll.bind(PostController));
router.get('/:id', PostController.getOne.bind(PostController));
router.put('/:id', AuthMiddleware.authenticate, PostController.update.bind(PostController));
router.delete('/:id', AuthMiddleware.authenticate, PostController.delete.bind(PostController));

module.exports = router; 