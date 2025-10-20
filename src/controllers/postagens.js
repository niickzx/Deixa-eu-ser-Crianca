const { Router } = require("express");
const { db } = require("../db");
const rotaPostagem = Router();

rotaPostagem.get("/postagens", async (req, res) => {
  const postagens = await db.postagens.findMany();
  res.status(200).json(postagens);
});

rotaPostagem.post("/postagens", async (req, res) => {
  try {
    const { conteudo, data_postagem, denuncia, id_usuario } = req.body;
    const nova_postagem = await db.postagens.create({
      data: {
        conteudo,
        data_postagem,
        denuncia,
        usuario: {
          connect: {
            id: id_usuario,
          },
        },
      },
    });
    res
      .status(201)
      .json({ mensagem: "Postagem criada com sucesso", id: nova_postagem.id });
  } catch (err) {
    res.status(400).json({ mensagem: "erro ao criar a postagem", erro: err });
  }
});

rotaPostagem.put("/postagens/:id", async (req, res) => {
  try {
    const { conteudo, data_postagem, denuncia } = req.body;
    const id = req.params;

    const data = {};
    if (conteudo) data.conteudo = conteudo;
    if (data_postagem) data.data_postagens = data_postagens;
    if (denuncia) data.denuncia = denuncia;

    await db.postagens.update({
      where: { id },
      data,
    });
    res.status(200).json({ mensagem: "postagem atualizada com sucesso" });
  } catch (err) {
    res
      .status(400)
      .json({ mensagem: "erro ao atualizar a postagem", erro: err });
  }
});

module.exports = { rotaPostagem };