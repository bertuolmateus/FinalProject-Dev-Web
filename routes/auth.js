const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.logout);

module.exports = router;
