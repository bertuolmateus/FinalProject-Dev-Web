const db = require('../db/connection');

// Renderiza tela de login
exports.getLogin = (req, res) => {
  res.render('login', { error: null });
};

// Processa login
exports.postLogin = (req, res) => {
  const { username, password} = req.body;

  db.query(
    'SELECT * FROM usuarios WHERE ( nome = ? OR email = ? ) AND senha = ?',
    [username, username, password],
    (err, results) => {
      if (err) {
        console.error('Erro ao consultar o banco de dados:', err);
        return res.render('login', { error: 'Erro ao processar o login.' });
      }

      if (results.length > 0) {
        req.session.user = results[0];
        return res.redirect('/chat');
      } else {
        return res.render('login', { error: 'Usuário ou senha incorretos!' });
      }
    }
  );
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Erro ao encerrar a sessão:', err);
      return res.redirect('/login');
    }
    res.redirect('/login');
  });
};

// Renderiza tela de registro
exports.getRegister = (req, res) => {
  res.render('register', { error: null });
};

// Processa registro
exports.postRegister = (req, res) => {
  const { usuario, email, senha } = req.body;

  db.query(
    'SELECT * FROM usuarios WHERE nome = ? OR email = ?',
    [usuario, email],
    (err, results) => {
      if (err) {
        console.error('Erro ao consultar o banco de dados:', err);
        return res.render('register', { error: 'Erro ao processar o registro.' });
      }

      if (results.length > 0) {
        return res.render('register', { error: 'Usuário ou email já cadastrado.' });
      }

      db.query(
        'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
        [usuario, email, senha],
        (err) => {
          if (err) {
            console.error('Erro ao inserir usuário no banco de dados:', err);
            return res.render('register', { error: 'Erro ao processar o registro.' });
          }
          res.redirect('/login');
        }
      );
    }
  );
};
