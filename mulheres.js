const express = require('express');
const router = express.Router();

const app = express();
const porta = 3333;

const mulheres = [{
        nome: 'Rafaela Oliveira',
        imagem: './img/foto_perfil.png',
        minibio: 'Desenvolvedora e Analista de Sistemas',
    },
    {
        nome: 'Simara Conceição',
        imagem: '',
        minibio: 'Desenvolvedora e Instrutora',
    },
    {
        nome: 'Iana Chan',
        imagem: '',
        minibio: 'Fundadora da PrograMaria',
    },
];

function mostraMulheres(request, response) {
    response.json(mulheres);
}

function mostraPorta() {
    console.log('Servidor criado e rodando na porta ', porta);
}

app.use(router.get('/mulheres', mostraMulheres));
app.listen(porta, mostraPorta);