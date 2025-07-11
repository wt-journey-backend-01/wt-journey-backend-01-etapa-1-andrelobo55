const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({ extended: true }));

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
app.get("/api/lanches", (req, res) => {
    const lanches = [
        {
            "id": 1,
            "nome": "DevBurger Clássico",
            "ingredientes": "Pão brioche, Carne 150g, Queijo cheddar, Alface americana, Tomate fresco, Molho especial"
        },
        {
            "id": 2,
            "nome": "Burger de Bacon",
            "ingredientes": "Pão australiano, Carne 180g, Queijo prato, Bacon crocante, Cebola caramelizada, Molho barbecue"
        },
        {
            "id": 3,
            "nome": "Commit Veggie",
            "ingredientes": "Pão integral, Burger de grão de bico, Queijo vegano, Rúcula, Tomate seco, Maionese de ervas"
         }
    ]
    res.send(lanches);
});

// POST Request
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