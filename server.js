const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// GET Requests
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get("/contato", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});
app.get("/sugestao", (req, res) => {
    var nome = req.query.nome;
    var ingredientes = req.query.ingredientes;
    res.send(`
            <h1>Sugestão recebida! Obrigado!</h1>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Ingrediente:</strong> ${ingredientes}</p>
        `);
});
const lanches = require('./public/data/lanches.json');
app.get("/api/lanches", (req, res) => {
    res.json(lanches);
});
app.get('/contato-recebido', (req, res) => {
    if (ultimoContato === null) {
        return res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
    }
    const {name, email, assunto, mensagem} = ultimoContato;
    res.send(`
            <h1> Mensagem recebida! Obrigado!</h1>
            <p><strong>Nome: </strong> ${name}</p>
            <p><strong>Email: </strong> ${email}</p>
            <p><strong>Assunto: </strong> ${assunto}</p>
            <p><strong>Mensagem: </strong> ${mensagem}</p>
            <a href='./'>Início</a>
        `);
});

// POST Request
var ultimoContato = null;
app.post("/contato", (req, res) => {
    ultimoContato = req.body;
    res.redirect('/contato-recebido');
});

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, (req, res) => {
    console.log(`Server is running at http://localhost:${port}`);
});