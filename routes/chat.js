const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Middleware para proteger o chat
function authMiddleware(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
}

router.use(authMiddleware);

// Rotas
router.get('/', chatController.getChatPage);
router.post('/enviar', chatController.enviarMensagem);

module.exports = router;
