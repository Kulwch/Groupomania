const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const commentsCtrl = require('../controllers/comments');

router.post('/', auth, commentsCtrl.postComment);
router.delete('/:id', auth, commentsCtrl.deleteComment);
router.get('/', auth, commentsCtrl.getAllComments);

router.delete('/:id/admin', adminAuth, commentsCtrl.adminDeleteComment);

module.exports = router;

