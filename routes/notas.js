const express = require('express');
const router = express.Router();
const notasController = require('../controllers/notasController');

// Middleware de autenticação
function authMiddleware(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

router.use(authMiddleware);

// Rota para exibir as notas emitidas
router.get('/', notasController.listarNotas);

module.exports = router;
