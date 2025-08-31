const express = require('express');
const router = express.Router();
const nfeController = require('../controllers/nfeController');

// middleware para proteger
function authMiddleware(req, res, next) {
  if (!req.session.user) return res.redirect('/login');
  next();
}

router.use(authMiddleware);

router.get('/', nfeController.getForm);
router.post('/gerar', nfeController.postForm);

module.exports = router;
