const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid, validate } = require('uuid');

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

// permite atualizar um repositorio
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { url, title, techs } = request.body;

  // verifica se o id vindo na requisição está no formato uuid
  if( !validate(id) ) {
    return response.status(400).json({ error: "Invalid ID"});
  }

  // recupera o index do repositorio que se deseja atualizar
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  // verifica se o valor da variavel repositoryIndex é negativo
  // se for, significa que o repositorio não existe
  if(repositoryIndex < 0) {
    return response.status(400).json({error: "Repository not found"});
  }

  // recupera o numero de likes do repositorio antes de atualizar as informações
  const likes = repositories[repositoryIndex].likes;

  // atualizando o repositorio encontrado
  const repository = {
    id,
    url,
    title,
    techs,
    likes 
  }

  // insere o repositorio atualizado no array
  repositories[repositoryIndex] = repository;

  return response.status(201).json(repository);
});

// permite deletar um repositorio
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  // verifica se o id vindo na requisição está no formato uuid
  if( !validate(id) ) {
    return response.status(400).json({ error: "Invalid ID"});
  }

  // recupera o index do repositorio que se deseja atualizar
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  // verifica se o valor da variavel repositoryIndex é negativo
  // se for, significa que o repositorio não existe
  if(repositoryIndex < 0) {
    return response.status(400).json({error: "Repository not found"});
  }

  // deletando o repositorio encontrado
  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  // verifica se o id vindo na requisição está no formato uuid
  if( !validate(id) ) {
    return response.status(400).json({ error: "Invalid ID"});
  }

  // recupera o index do repositorio que se deseja atualizar
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  // verifica se o valor da variavel repositoryIndex é negativo
  // se for, significa que o repositorio não existe
  if(repositoryIndex < 0) {
    return response.status(400).json({error: "Repository not found"});
  }

  let repository = repositories[repositoryIndex];

  // atualiza o repositorio encontrado e soma mais um ao numero de likes
  repositories.push(repository.likes += 1);

  return response.status(201).json(repository);
  
});

module.exports = app;
