const express = require('express');
const router = express.Router();

const app = express();
const porta = 3333;

function monstraOla(request, response) {
    response.send('Olá, mundo!');
}

function mostraOla() {}

function mostraPorta() {
    console.log('Servidor criado e rodando na porta ', porta);
}

app.use(router.get('/ola', monstraOla));
app.listen(porta, mostraPorta);