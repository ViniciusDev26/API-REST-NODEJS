const moment = require('moment');
const connection = require('./../infraestrutura/conexao');

class Atendimento {
  listar(res){
    const sql = 'SELECT * FROM Atendimentos';

    connection.query(sql, (err, results)=>{
      if(err)
        res.status(400).json(err);
      else{
        res.status(201).json(results);
      }
    });
  }

  buscar(id, res){
    const sql = `SELECT * FROM Atendimentos where id = ${id}`
    connection.query(sql, id, (err, results) => {
      const atendimento = results[0]
      if(err)
        return res.status(400).json(err);
      else{
        res.status(200).json(atendimento)
      }
    });
  }

  adiciona(atendimento, res) {
    const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
    const atendimentoArray = {...atendimento, data, dataCriacao};

    const dataValida = moment(data).isSameOrAfter(dataCriacao);
    const clienteValido = atendimento.cliente.length >= 5;

    const validacoes = [
      {
        nome: 'data',
        valido: dataValida,
        mensagem: 'Data deve ser maior ou igual a data atual',
      },
      {
        nome: 'cliente',
        valido: clienteValido,
        mensagem: 'Cliente deve ter pelo menos 5 caracteres'
      }
    ];

    const erros = validacoes.filter((element)=>{
      return element.valido != true;
    });

    if(erros.length > 0)
      return res.json(erros);

    const sql = `INSERT INTO Atendimentos SET ?`
    connection.query(sql, atendimentoArray, (err)=>{
      if(err)
        return res.status(400).json(err);

      return res.status(201).json({atendimentoArray});
    });
  }

  alterar(id, params, res) {
    if(params.data)
      params.data = moment(params.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

    const sql = `UPDATE Atendimentos SET ? WHERE id = ${id}`
    connection.query(sql, params, (err, results) => {
      if(err)
        return res.status(400).json(err);

      return res.status(200).json({id, ...params});
    });
  }

  deletar(id, res) {
    const sql = `DELETE FROM Atendimentos where id = ${id}`

    connection.query(sql, (err, results) => {
      if(err)
        return res.status(400).json(err);

      return res.status(200).json({id});
    });
  }
}

module.exports = new Atendimento;