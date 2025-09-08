const db = require('../db/connection');

class User {
  constructor(nome, email, senha) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }

  // Busca usuário por nome ou email
  static findByUsernameOrEmail(usuario, callback) {
    const sql = 'SELECT * FROM usuarios WHERE nome = ? OR email = ? LIMIT 1';
    db.query(sql, [usuario, usuario], (err, results) => {
      if (err) return callback(err, null);
      if (results.length === 0) return callback(null, null);
      return callback(null, results[0]);
    });
  }

  // Cria novo usuário
  static create(user, callback) {
    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    db.query(sql, [user.nome, user.email, user.senha], (err, result) => {
      if (err) return callback(err, null);
      return callback(null, { id: result.insertId, ...user });
    });
  }
}

module.exports = User;
