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
        res.status(200).sendFile(path.join(__dirname, 'views', 'contato.html'));
    })
    .post((req, res) => {
        ultimoContato = req.body;
        res.status(200).send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Mensagem Recebida</title>
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <h1>Mensagem recebida! Obrigado!</h1>
            <p><strong>Nome:</strong> ${ultimoContato.nome}</p>
            <p><strong>Email:</strong> ${ultimoContato.email}</p>
            <p><strong>Assunto:</strong> ${ultimoContato.assunto}</p>
            <p><strong>Mensagem:</strong> ${ultimoContato.mensagem}</p>
            <a href="/">Voltar para o início</a>
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
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Contato</title>
        <link rel="stylesheet" href="/css/style.css">
    </head>
    <body>
      <h1>Sugestão recebida! Obrigado!</h1>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>Ingredientes:</strong> ${ingredientes}</p>
      <a href="/">Voltar para o início</a>
    </body>
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