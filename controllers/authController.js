const User = require('../models/User');

// Mostra tela de login
exports.getLogin = (req, res) => {
  res.render('login', { error: null });
};

// Processa login
exports.postLogin = (req, res) => {
  const { usuario, senha } = req.body;

  User.findByUsernameOrEmail(usuario, (err, user) => {
    if (err) {
      console.error('Erro ao consultar usuário:', err);
      return res.render('login', { error: 'Erro ao processar login.' });
    }

    if (!user) {
      return res.render('login', { error: 'Usuário não encontrado.' });
    }

    if (user.senha !== senha) {
      return res.render('login', { error: 'Senha incorreta.' });
    }

    // Se chegou até aqui, login OK
    req.session.user = user;
    res.redirect('/nfe'); // redireciona para o formulário de NF-e
  });
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao encerrar sessão:', err);
    }
    res.redirect('/login');
  });
};
