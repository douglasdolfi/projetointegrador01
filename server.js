const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const quantidadeMembros = req.body.quantidadeMembros;
  const endereco = req.body.endereco;
  const situacaoMoradia = req.body.situacaoMoradia;
  const telefone = req.body.telefone;

  // Crie um objeto com os dados do formulário
  const formData = {
    nome,
    cpf,
    quantidadeMembros,
    endereco,
    situacaoMoradia,
    telefone
  };

  // Converta o objeto para JSON
  const formDataJSON = JSON.stringify(formData);

  // Salve os dados no arquivo data.json
  fs.appendFile('data.json', formDataJSON + '\n', (err) => {
    if (err) throw err;
    console.log('Dados salvos com sucesso!');
  });

  res.send('Dados recebidos com sucesso e salvos!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
