const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => { });
app.get("/contato", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});

app.post("/contato", (req, res) => {
    var { name, email, assunto, mensagem } = req.body;
    res.send(`
            <h1> Mensagem recebida! Obrigado!</h1>
            <p><strong>Nome: </strong> ${name}</p>
            <p><strong>Email: </strong> ${email}</p>
            <p><strong>Assunto: </strong> ${assunto}</p>
            <p><strong>Mensagem: </strong> ${mensagem}</p>
            <a href='./'>Início</a>
        `);
});

app.listen(port, (req, res) => {
    console.log(`Server is running at http://localhost:${port}`);
});

// var ultimoContato = null;
// app.post("/contato", (req, res) => {
//     ultimoContato = req.body;
// });