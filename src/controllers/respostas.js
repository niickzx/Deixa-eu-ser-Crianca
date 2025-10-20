const { Router } = require("express");
const { db } = require("../db");
const rotaResposta = Router();

rotaResposta.get("/respostas", async (req, res) => {
  const respostas = await db.respostas.findMany();
  res.status(200).json(respostas);
});

rotaResposta.post("/respostas", async (req, res) => {
  try {
    const { conteudo, data_criacao, id_postagens } = req.body;
    const nova_resposta = await db.respostas.create({
      data: {
        conteudo,
        data_criacao,
        usuario: {
          connect: {
            id: id_postagens,
          },
        },
      },
    });
    res
      .status(201)
      .json({ mensagem: "resposta criada com sucesso", id: nova_resposta.id });
  } catch (err) {
    res.status(400).json({ mensagem: "erro ao criar a resposta", erro: err });
  }
});

rotaResposta.put("/respostas/:id", async (req, res) => {
  try {
    const { conteudo, data_criacao } = req.body;
    const id = req.params;

    const data = {};
    if (conteudo) data.conteudo = conteudo;
    if (data_criacao) data.data_criacao = data_criacao;

    await db.respostas.update({
      where: { id },
      data,
    });
    res.status(200).json({ mensagem: "resposta atualizada com sucesso" });
  } catch (err) {
    res
      .status(400)
      .json({ mensagem: "erro ao atualizar a resposta", erro: err });
  }
});


module.exports = { rotaResposta };