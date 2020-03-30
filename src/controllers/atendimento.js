const Atendimentos = require('./../models/atendimentos');
module.exports = app => {
  app.get('/atendimentos', (req, res) => {
    Atendimentos.listar(res);
  });

  app.post('/atendimentos', (req, res) => {
    const atendimento = req.body;
    Atendimentos.adiciona(atendimento, res);
  });

  app.get('/atendimentos/:id', (req, res) => {
    const { id } = req.params
    Atendimentos.buscar(id, res);
  });

  app.patch('/atendimentos/:id', (req, res) => {
    const { id } = req.params;
    const values = req.body;
    Atendimentos.alterar(id, values, res);
  });

  app.delete('/atendimentos/:id', (req, res) => {
    const { id } = req.params;
    Atendimentos.deletar(id, res);
  });
}