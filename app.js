// Importar módulo express
const express = require('express');

// Importar módulo express-handlebars
const { engine } = require('express-handlebars');

// Importar módulo mysql
const mysql = require('mysql2');

// App
const app = express();

// Adicionar Bootstrap
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

// Adicionar CSS
app.use('/css', express.static('./css'));

// Configuração do express-handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Manipulação de dados via rotas
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Configuração de conexão
const conexao = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin',
    database:'boladeneve'
});

// Teste de conexão
conexao.connect(function(erro){
    if(erro) throw erro;
    console.log('Conexão efetuada com sucesso!');
});

// Rota Principal
app.get('/', function(req, res){
    res.render('formulario');
    //res.end();
});

//Rota de cadastro
app.post('/cadastrar', function(req, res){
    // Obter os dados que serão utilizados para o cadastro
    let nome = req.body.nome;
    let cpf = req.body.cpf;
    let quantidadeMembros = req.body.quantidadeMembros;
    let endereco = req.body.endereco;
    let telefone = req.body.telefone;
    let situacaoMoradia = req.body.situacaoMoradia;
    

    // SQL
    let sql = `INSERT INTO form (nome, cpf, quantidadeMembros, endereco, telefone, situacaoMoradia) VALUES ('${nome}', '${cpf}', ${quantidadeMembros}, '${endereco}', '${telefone}', '${situacaoMoradia}')`;

    // Executar comando SQL
    conexao.query(sql, function(erro, retorno){
        // Caso ocorra algum erro
        if(erro) throw erro;

        // Caso ocorra o cadastro
        console.log(retorno);
    });
});

// Servidor
app.listen(8080);