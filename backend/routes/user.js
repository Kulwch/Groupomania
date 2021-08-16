const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.get('/', auth, userCtrl.getProfile);
router.put('/me', auth, multer, userCtrl.updateProfile);
router.delete('/me', auth, userCtrl.deleteProfile);

module.exports = router;