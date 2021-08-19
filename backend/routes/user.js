const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const connectLimiter = require('../middleware/connectLimiter');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', connectLimiter, userCtrl.login);
router.put('/:id', auth, multer, userCtrl.updateAvatarProfile);
router.delete('/:id', auth, multer, userCtrl.deleteProfile);
router.get('/:id', auth, userCtrl.getProfile);
router.get('/', auth, userCtrl.getAllProfiles);

router.delete('/:id', auth, multer, userCtrl.adminDeleteProfile);
router.put('/:id', auth, multer, userCtrl.adminUpdateProfile);
module.exports = router;