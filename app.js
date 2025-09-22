const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3060;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'Senhaforte2025',
  resave: false,
  saveUninitialized: true
}));

// Rotas
const authRoutes = require('./routes/auth');
const nfeRoutes = require('./routes/nfe');

app.use('/', authRoutes);
app.use('/nfe', nfeRoutes);

app.listen(PORT, () => {
  console.log('Servidor rodando em http://localhost:3060');
});
