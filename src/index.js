const customExpress = require('./config/custom-express');
const conexao = require('./infraestrutura/conexao');
const tabelas = require('./infraestrutura/tabelas');

conexao.connect((err) => {
  if (err)
    console.log(err);
  else{
    const app = customExpress();
    tabelas.init(conexao);

    app.listen(3333, () => {
      console.log("Servidor rodando na porta 3333")
    });
  }
});