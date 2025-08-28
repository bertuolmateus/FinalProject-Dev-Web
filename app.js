const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'Senhaforte2025', 
  resave: false, 
  saveUninitialized: true,
  cookie: { secure: false }
})); // Configuração de sessão 

// Rotas
app.get('/', (req, res) => {
  res.redirect('/login');
});

// Importa rotas
const authRoutes = require('./routes/auth.js');
app.use('/', authRoutes);

const chatRoutes = require('./routes/chat.js');
app.use('/chat', chatRoutes);

const notasRoutes = require('./routes/notas.js');
app.use('/notas', notasRoutes);

//aplica o middleware a todas as rotas
//app.use(authMiddleware);

const fs = require('fs');
const { clear } = require('console');

//const path = require('path');

app.get('/baixar-nfe', (req, res) => {
  const pdfPath = path.join(__dirname, 'public', 'nfe.pdf');
  if (!fs.existsSync(pdfPath)) {
    return res.status(404).send('NF-e não encontrada');
  }
  res.download(pdfPath, 'nfe.pdf');
});

// Inicia servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});

// Middleware para proteger rotas
function authMiddleware(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login'); // se não estiver logado, redireciona
  }
  next(); // se estiver logado, continua
}
