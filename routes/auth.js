const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rotas de login
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

// Rota de logout
router.get('/logout', authController.logout);

// Rotas de registro
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);

module.exports = router;
