const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const gifCtrl = require('../controllers/gifs');

router.post('/', auth, multer, gifCtrl.createGif);
router.put('/:id', auth, multer, gifCtrl.modifyGif);
router.delete('/:id', auth, gifCtrl.deleteGif);
router.get('/:id', auth, gifCtrl.getOneGif);
router.get('/', auth, gifCtrl.getAllGifs);
router.post('/:id/like', auth, gifCtrl.rateOneGif);
router.get('/:id/comments', auth, gifCtrl.getAllComments);
router.post('/:id/comments', gifCtrl.postComment);
router.put('/:id/comments/:id', gifCtrl.modifyComment);
router.delete('/:id/comments/:id', auth, gifCtrl.deleteComment);

module.exports = router;

