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

exports.getLogin = (req, res) => {
  res.render('login', { error: null, user: req.session.user });
};

exports.getRegister = (req, res) => {
  res.render('register', { error: null, user: req.session.user || null });
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

// Mostra tela de registro
exports.getRegister = (req, res) => {
  res.render('register', { error: null });
};

// Processa registro
exports.postRegister = (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.render('register', { error: 'Preencha todos os campos.' });
  }

  // Verifica se usuário já existe
  User.findByUsernameOrEmail(email, (err, existingUser) => {
    if (err) {
      console.error('Erro ao verificar usuário:', err);
      return res.render('register', { error: 'Erro no servidor.' });
    }

    if (existingUser) {
      return res.render('register', { error: 'Usuário já existe.' });
    }

    // Cria novo usuário
    User.create({ nome, email, senha }, (err, newUser) => {
      if (err) {
        console.error('Erro ao registrar usuário:', err);
        return res.render('register', { error: 'Erro ao registrar.' });
      }

      req.session.user = newUser; // já loga o usuário
      res.redirect('/nfe'); // manda direto para o sistema
    });
  });
};

