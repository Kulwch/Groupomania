const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const adminOrModeratorAuth = require('../middleware/adminOrModeratorAuth');

const commentCtrl = require('../controllers/comment');

router.post('/', auth, commentCtrl.postComment);
router.get('/', auth, commentCtrl.getAllComments);
router.delete('/:id', auth, commentCtrl.deleteComment);

router.delete('/:id', adminOrModeratorAuth, commentCtrl.adminOrModeratorDeleteComment);

module.exports = router;

