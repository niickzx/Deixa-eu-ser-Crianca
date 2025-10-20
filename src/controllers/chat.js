const { Router } = require("express");
const { db } = require("../db");
const rotaChat = Router();

rotaChat.get("/chats", async (req, res) => {
  const chats = await db.chat.findMany();
  res.status(200).json(chats);
});

rotaChat.post("/chats", async (req, res) => {
  try {
    const { nome } = req.body;
    const novo_chat = await db.chat.create({
      data: {
        nome,
        usuario: {
          connect: {
            id: id_usuario,
          },
        },
      },
    });
    res
      .status(201)
      .json({ mensagem: "Chat criada com sucesso", id: novo_chat.id });
  } catch (err) {
    res.status(400).json({ mensagem: "Erro ao criar o chat", erro: err });
  }
});

rotaChat.put("/chats/:id", async (req, res) => {
  try {
    const { nome } = req.body;
    const id = req.params;

    const data = {};
    if (nome) data.nome = nome;

    await db.chat.update({
      where: { id },
      data,
    });
    res.status(200).json({ mensagem: "Chat atualizada com sucesso" });
  } catch (err) {
    res.status(400).json({ mensagem: "Erro ao atualizar o chat", erro: err });
  }
});