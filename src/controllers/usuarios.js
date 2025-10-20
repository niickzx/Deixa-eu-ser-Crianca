const { Router } = require("express");
const { db } = require("../db");
const rotaUsuario = Router();

rotaUsuario.get("/usuarios", async (req, res) => {
  const usuarios = await db.usuarios.findMany();
  res.status(200).json(usuarios);
});

rotaUsuario.post("/usuarios", async (req, res) => {
  try {
    const { nome, email, senha, tipo_de_usuario } = req.body;
    const novo_usuario = await db.usuarios.create({
      data: {
        nome,
        email,
        senha,
        foto_de_perfil: "foto",
        tipo_de_usuario,
      },
    });
    res
      .status(201)
      .json({ mensagem: "usuario criado com sucesso", id: novo_usuario.id });
  } catch (err) {
    res.status(400).json({ mensagem: "erro ao criar o usuario", erro: err });
  }
});

rotaUsuario.put("/usuarios/:id", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const id = req.params;

    const data = {};
    if (nome) data.nome = nome;
    if (email) data.email = email;
    if (senha) data.senha = senha;

    await db.usuarios.update({
      where: { id },
      data,
    });
    res.status(200).json({ mensagem: "usuario atualizado com sucesso" });
  } catch (err) {
    res
      .status(400)
      .json({ mensagem: "erro ao atualizar o usuario", erro: err });
  }
});

module.exports = { rotaUsuario };
