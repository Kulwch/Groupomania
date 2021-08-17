const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const connectLimiter = require('../middleware/connectLimiter');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', connectLimiter, userCtrl.login);

router.get('/me', auth, userCtrl.getProfile);
router.put('/me', auth, multer, userCtrl.updateProfile);
router.delete('/me', auth, multer, userCtrl.deleteProfile);

module.exports = router;