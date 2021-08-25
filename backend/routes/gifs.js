const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const adminOrModeratorAuth = require('../middleware/adminOrModeratorAuth');
const multerGifs = require('../middleware/multer-gifs');

const gifCtrl = require('../controllers/gifs');

router.post('/', auth, multerGifs, gifCtrl.createGif);
router.put('/:id', auth, multerGifs, gifCtrl.modifyGif);
router.delete('/:id', auth, multerGifs, gifCtrl.deleteGif);
router.get('/:id', auth, gifCtrl.getOneGif);
router.get('/', auth, gifCtrl.getAllGifs);

// router.put('/:id/like', auth, gifCtrl.rateOneGif);

router.put('/:id/admin', adminOrModeratorAuth, multerGifs, gifCtrl.adminOrModeratorModifyGif);
router.delete('/:id/admin', adminOrModeratorAuth, multerGifs, gifCtrl.adminOrModeratorDeleteGif);

module.exports = router;

