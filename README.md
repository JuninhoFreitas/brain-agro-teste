<p align="center">
  <a href="" rel="noopener">
 <img width=auto height=auto src="https://i.imgur.com/3KU5qXn.png" alt="Project logo"></a>
</p>

<h3 align="center">API - Brain Agro</h3>

<div align="center">

[![Status](https://img.shields.io/badge/Status-Complete-brightgreen)]()

</div>

---

<p align="center"> Objetivo do projeto: 
  Desenvolver uma API de Base de Agricultores em NodeJS.
    <br> 
</p>

## 📝 Indice

- [Sobre](#about)
- [Primeiros passos](#getting_started)
- [Como usar](#usage)
- [Built Using](#built_using)
- [Autor](#autor)

## 🧐 Sobre <a name = "about"></a>
<p>
  A API deve permitir ao usuário cadastrar, editar, excluir e listar produtores rurais, e também retornar um dashboard.
</p>


## 🏁 Primeiros passos <a name = "getting_started"></a>

### Pre-requisitos
- Docker ou Postgres Instalado.
- Node 18.x
- Criação de arquivo .env contendo as váriaveis de ambiente que são necessárias neste projeto
(Use o arquivo .env.example como base)
___
### Detalhes do .ENV
<i>.env</i>

| Variável          | Descrição                                              |
| ----------------- | ------------------------------------------------------ |
| DATABASE_HOSTNAME | Hostname para conexão com o banco de dados             |
| DATABASE_USERNAME | Usuario de acesso ao banco de dados                    |
| DATABASE_PASSWORD | Senha de acesso ao banco de dados                      |
| DATABASE_DATABASE | Nome do banco de dados                                 |
| DATABASE_PORT     | Porta para conexão ao banco de dados                   |
| NODE_ENV          | O environment da aplicação                             |

___
### Instalação e Execução

Iniciar instalação de pacotes necessários com npm:
```
npm ci
```
Iniciar banco de dados em container no docker
```
docker compose up -d --build
```
Criação das tabelas e relações do banco de dados
```
npm run typeorm migration:run
```
Executar serviço API:
```
npm run dev
```
Se tudo ocorreu bem, após ter criado o .env e configurado corretamente o banco de dados, ao executar o comando acima, deverá obter a seguinte mensagem no terminal:
```
Server started on port 3333! 🏆 GET http://localhost:3333
```
Indicando que o servidor está rodando em localhost na porta 3333
___
<br>

##  🎈 Como usar <a name="usage"></a>

### Insomnia
O diretório `docs/` contém a collection+environment para o Insomnia

Você pode importar ele na tela inicial do Insomnia

---
## TO-DO

- [x] Dashboard
- [x] Cada Produtor pode Plantar mais que um cultivo
- [x] Soma de área agrícultável e vegetação, não deverá ser maior que a área total da fazenda
- [x] O sistema deverá validar CPF e CNPJ digitados incorretamente.
- [x] O usuário deverá ter a possibilidade de cadastrar, editar, e excluir produtores rurais.



## ⛏️ Built Using <a name = "built_using"></a>

- [Postgres](https://www.postgresql.org/) - Database
- [Express](https://expressjs.com/) - HTTP Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [Celebrate](https://www.npmjs.com/package/celebrate) - Middleware validator
- [TypeORM](https://typeorm.io/) - ORM Framework

## ✍️ Autor <a name = "autor"></a>

- [@JuninhoFreitas](https://github.com/JuninhoFreitas) - Desenvolvimento e documentação
