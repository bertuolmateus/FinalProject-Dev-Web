const db = require('../db/connection');

class User {
  constructor(username, email, senha) {
    this.username = username;
    this.email = email;
    this.senha = senha;
  }

  // Busca usuário por nome OU email
  static findByUsernameOrEmail(usuario, callback) {
    const sql = 'SELECT * FROM usuarios WHERE nome = ? OR email = ? LIMIT 1';
    db.query(sql, [usuario, usuario], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null);
      return callback(null, results[0]);
    });
  }
}

module.exports = User;
