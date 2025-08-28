const { db } = require('../db/connection');

// Lista todas as NF-es
exports.listarNotas = (req, res) => {
  db.query('SELECT * FROM notas ORDER BY data_emissao DESC', (err, results) => {
    if (err) {
      console.error('Erro ao consultar notas:', err);
      return res.render('notas', { error: 'Erro ao buscar notas.', notas: [] });
    }
    res.render('notas', { error: null, notas: results });
  });
};

// (Opcional) Salvar uma nova NF-e no banco
exports.salvarNota = (nota, callback) => {
  const sql = `
    INSERT INTO notas (emitente, cnpj_emitente, destinatario, cnpj_destinatario, endereco)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(
    sql,
    [
      nota.emitente,
      nota.cnpj_emitente,
      nota.destinatario,
      nota.cnpj_destinatario,
      nota.endereco
    ],
    callback
  );
};


//CREATE TABLE notas (
//  id INT AUTO_INCREMENT PRIMARY KEY,
//  emitente VARCHAR(100) NOT NULL,
//  cnpj_emitente VARCHAR(20) NOT NULL,
//  destinatario VARCHAR(100) NOT NULL,
//  cnpj_destinatario VARCHAR(20) NOT NULL,
//  endereco VARCHAR(150) NOT NULL,
//  data_emissao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//);
