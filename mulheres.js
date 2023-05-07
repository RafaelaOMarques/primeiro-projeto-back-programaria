const express = require('express'); //iniciando o express
const router = express.Router(); //configurando a primeira parte da rota
//const { v4: uuidv4 } = require('uuid');
//uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

//Trazendo o pacote cors que permiti consumir a API no front-end
const cors = require('cors');
//ligando ao arquivo Banco de Dados
const conectaBancoDeDados = require('./bancoDeDados');
conectaBancoDeDados(); //chamando a função que conecta o banco de dados

const Mulher = require('./mulherModel');

const app = express(); //aqui iniciando o app
app.use(express.json()); //tratando a requisição para formato json
app.use('cors');
const porta = 3333; //criando a porta

//criando lista inicial de mulheres
/*const mulheres = [{
        id: '1',
        nome: 'Rafaela Oliveira',
        imagem: './img/foto_perfil.png',
        minibio: 'Desenvolvedora e Analista de Sistemas',
    },
    {
        id: '2',
        nome: 'Simara Conceição',
        imagem: '',
        minibio: 'Desenvolvedora e Instrutora',
    },
    {
        id: '3',
        nome: 'Iana Chan',
        imagem: '',
        minibio: 'Fundadora da PrograMaria',
    },
];*/

//GET
async function mostraMulheres(request, response) {
    try {
        const mulheresVindasDoBancoDeDados = await Mulher.find();
        response.json(mulheresVindasDoBancoDeDados);
    } catch (erro) {
        console.log(erro);
    }
}

//POST
async function criaMulher(request, response) {
    const novaMulher = new Mulher({
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao,
    });

    try {
        const mulherCriada = await novaMulher.save();
        response.status(201).json(mulherCriada);
    } catch (erro) {
        console.log(erro);
    }
}

//PATCH
/*function corrigeMulher(request, response) {
    function encontraMulher(mulher) {
        if (mulher.id === request.params.id) {
            return mulher;
        }
    }

    const mulherEncontrada = mulheres.find(encontraMulher);

    if (request.body.nome) {
        mulherEncontrada.nome = request.body.nome;
    }

    if (request.body.imagem) {
        mulherEncontrada.imagem = request.body.imagem;
    }

    if (request.body.minibio) {
        mulherEncontrada.minibio = request.body.minibio;
    }

    response.json(mulheres);
}*/

//PATCH
async function corrigeMulher(request, response) {
    try {
        const mulherEncontrada = await Mulher.findById(request.params.id);
        if (request.body.nome) {
            mulherEncontrada.nome = request.body.nome;
        }

        if (request.body.imagem) {
            mulherEncontrada.imagem = request.body.imagem;
        }

        if (request.body.minibio) {
            mulherEncontrada.minibio = request.body.minibio;
        }
        if (request.body.citacao) {
            mulherEncontrada.citacao = request.body.citacao;
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save();
        response.json(mulherAtualizadaNoBancoDeDados);
    } catch (erro) {
        console.log(erro);
    }
}

//DELATA
/*function delataMulher(request, response) {
    function todasMenosEla(mulher) {
        if (mulher.id !== request.params.id) {
            return mulher;
        }
    }
    const mulheresQueFicam = mulheres.filter(todasMenosEla);

    response.json(mulheresQueFicam);
}*/

//DELETA
async function deletaMulher(request, response) {
    try {
        await Mulher.findByIdAndDelete(request.params.id);
        response.json({ message: 'Mulher deletada com sucesso!' });
    } catch (erro) {
        console.log(erro);
    }
}

//PORTA
function mostraPorta() {
    console.log('Servidor criado e rodando na porta ', porta);
}

app.use(router.get('/mulheres', mostraMulheres)); //configuração rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)); //configuração rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)); //configuração rota PATCH /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher)); //configuração rota DELETE /mulheres/:id

app.listen(porta, mostraPorta); //servidor ouvindo a porta