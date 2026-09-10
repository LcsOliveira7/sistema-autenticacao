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

  app.get('/cadastro', (req, res) => 
  {
    res.render('cadastro');
  });

app.post('/cadastrar', (req, res) => {
  const { nome, email, senha } = req.body;
  const sql = `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`;
  try {
    db.query(sql, [nome, email,senha], (error, resultados) => {
      if(error){
        console.log("erro ao inserir no banco de dados", error)
        return res.status(500).send("erro interno do servuidor")
      }
      console.log("Usuario Incluido com sucesso")
      res.redirect("/login")
    });
  } catch (error) {
    console.log("Ocorreu um erro", error)
  }
});

app.get("/login", (req, res) => {
  res.render('login')
})

app.post('/login', (req, res) => {
  const {email, senha} = req.body;
console.log("Rota post login")
  try {

    const sql = `SELECT * FROM usuarios WHERE email = ? AND senha = ?;`
    db.query(sql, [email,senha], (error, resultados) => {
      if (error) {
        console.log("Erro ao consultar o banco de dados")
      console.log(error)
      return res.status(500).send('Erro interno do Servidor')
      }

      if ( resultados.length > 0) {
        console.log("Login Efetuado com Sucesso!")
        return res.redirect('/dashboard')
      } else {
        console.log("E-mail ou senha incorretos")
        return res.status(401).send('E-mail ou senha incorretos.')
      }
      
    });
  } catch (error) {
    console.log("Ocorreu um erro", error)
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
