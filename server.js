const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

const lanches = require('./public/data/lanches.json');
let ultimoContato = null;

// Página inicial "/"
app.route('/')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, 'views', 'index.html'));
    })
    .all((req, res) => {
        res.status(405).send('Método não permitido');
    });

// Página de contato "/contato"
app.route('/contato')
    .get((req, res) => {
        res.sendFile(path.join(__dirname, 'views', 'contato.html'));
    })
    .post((req, res) => {
        ultimoContato = req.body;
        res.redirect('/contato-recebido');
    })
    .all((req, res) => {
        res.status(405).send('Método não permitido');
    });

// Página de sucesso após envio do contato
app.route('/contato-recebido')
    .get((req, res) => {
        if (ultimoContato === null) {
            return res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
        }

        const { name, email, assunto, mensagem } = ultimoContato;

        res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Confirmação</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
         <body>
            <h1>Mensagem recebida! Obrigado!</h1>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Assunto:</strong> ${assunto}</p>
            <p><strong>Mensagem:</strong> ${mensagem}</p>
            <a href="/">Início</a>
        </body>
        </html>
    `);
    })
    .all((req, res) => {
        res.status(405).send('Método não permitido');
    });

// Página de sugestão "/sugestao"
app.route('/sugestao')
    .get((req, res) => {
        const { nome, ingredientes } = req.query;

        res.send(`
      <h1>Sugestão recebida! Obrigado!</h1>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>Ingrediente:</strong> ${ingredientes}</p>
      <a href="/">Início</a>
    `);
    })
    .all((req, res) => {
        res.status(405).send('Método não permitido');
    });

// API simulada "/api/lanches"
app.route('/api/lanches')
    .get((req, res) => {
        res.json(lanches);
    })
    .all((req, res) => {
        res.status(405).send('Método não permitido');
    });

// Rota 404 para qualquer outro caminho
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});