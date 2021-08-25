const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const onlyAdminAuth = require('../middleware/onlyAdminAuth');
const connectLimiter = require('../middleware/connectLimiter');
const multerUsers = require('../middleware/multer-users');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', connectLimiter, userCtrl.login);
router.put('/:id', auth, multerUsers, userCtrl.updateProfile);
router.delete('/:id', auth, multerUsers, userCtrl.deleteProfile);
router.get('/:id', auth, userCtrl.getProfile);
router.get('/', auth, userCtrl.getAllProfiles);

router.delete('/:id', onlyAdminAuth, multerUsers, userCtrl.adminDeleteProfile);
router.put('/:id', onlyAdminAuth, multerUsers, userCtrl.adminUpdateProfile);
module.exports = router;