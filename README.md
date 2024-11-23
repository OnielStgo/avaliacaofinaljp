# MVP de uma api para locadora de filmes

## Passos para iniciar o projeto
1- Instalar as dependências executando ```npm install```
1- Iniciar o projeto executando ```npm run dev```

### Obs:
- Para comezar a usar a api é necessário criar um cliente como mínimo e depois fazer login
- Para obter, atualizar, ou deletar clientes é necessário estar logados na api
- Para obter, atualizar, ou deletar filmes é necessário estar logados na api
- Para registar a locação ou a entrega de um filme é necessário estar logados na api


### Rotas de clientes:
* criar cliente --> localhost:3000/api/v1/cliente
* login cliente --> localhost:3000/api/v1/login
* listar clientes --> localhost:3000/api/v1/cliente
* listar um cliente --> localhost:3000/api/v1/cliente/:id
* atualizar cliente --> localhost:3000/api/v1/cliente/:id
* deletar cliente --> localhost:3000/api/v1/cliente/:id

### Rotas de filmes:
* criar filme --> localhost:3000/api/v1/filme
* listar filmes --> localhost:3000/api/v1/filme
* listar um filme --> localhost:3000/api/v1/filme/:id
* atualizar filme --> localhost:3000/api/v1/filme/:id
* deletar filme --> localhost:3000/api/v1/filme/:id
  
### Rotas para locar/devolver filmes:
* locar um filme --> localhost:3000/api/v1/filmes/locar
* devolver um filme --> localhost:3000/api/v1/filmes/devolver




