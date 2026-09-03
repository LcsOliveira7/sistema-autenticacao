const express = require('express');
const db = require('./db');

const app = express();

// configurações do express

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.get('/dashboard', (req, res) => {
    res.render('dashboard', { nome: 'Lucas Oliveira Rodrigues de Souza' });
  });


app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});