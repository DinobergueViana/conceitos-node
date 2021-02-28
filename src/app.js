const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// permite listar todos os repositorios
app.get("/repositories", (request, response) => {
  return response.status(200).json(repositories);
});

// permite criar e um repositório e adiciona-lo ao array de repositorios
app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;

  // cria o objeto repository
  const repository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0
  }

  // adiciona o objeto criado ao array de repositorios
  repositories.push(repository);

  return response.status(201).json(repository);

});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
