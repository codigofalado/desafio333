<p align="center">
  <img alt="Imagem da Kurisu" src="./src/assets/kurisu.jpg" width="100"/>
</p>
<h1 align="center">
  Kurisu Bot
</h1>

> Uma bot de discord criada com finalidade de aprender um pouco mais sobre typescript, e ainda ganhar um bot pra colocar no meu próprio servidor 🤭

<!-- Badges -->
<p align="center">

  <!-- if your app is a website -->
  <a href="https://jpalvesl.github.io/kurisu-site" alt="Website jpalvesl.github.io/kurisu-site">
    <img src="https://img.shields.io/website-up-down-1EAE72-red/https/jpalvesl.github.io/kurisu-site" />
  </a>

  <!-- License -->
  <a href="./LICENSE" alt="License: UNLICENSE">
    <img src="https://img.shields.io/badge/License-UNLICENSE-1EAE72.svg" />
  </a>

  <br/>

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/jpalvesl/kurisu?color=blue">

  <!-- GitHub repo size -->
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/jpalvesl/kurisu">

  <!-- Social -->  
  <a href="https://github.com/jpalvesl/kurisu/stargazers">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/jpalvesl/kurisu?style=social">
  </a>
</p>

<!-- summary -->
<p align="center">
  <a href="#clipboard-descrição">Descrição</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-iniciando">Iniciando</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-o-que-tem-dentro">O que tem dentro?</a>
</p>

## :clipboard: Descrição
A Kurisu é uma bot que não é focada em algo específico, porém ela possui alguns comandos bem interessantes de se usar, tendo comandos interativos, informativos, manipulação de imagem, dentre outros.
Ela foi feita em typescript usando a biblioteca discord.js, suas principais inspirações foram GarticBot, Mantaro e Loritta, em especial a Mantaro, que deu a base inicial inteira e o conceito de como são mostradas as MessageEmbed's.

Os comandos presentes podem ser consultados usando o comando `ks.help` que lista todos os comando presentes (caso você precise saber algo mais especifico pode digitar `ks.help <comando>`, que mostra o que o comando faz e como deve ser usado) ou no [site](https://jpalvesl.github.io/kurisu-site) da bot que inclusive foi muito inspirado no site do GarticBot juntamente com a forma de usar os comandos que parece que você está acessando algum método presente no bot literalmente `ks.comando`.

A personagem usada para ser o rosto desse bot foi a Makise Kurisu de [Steins Gate](https://pt.wikipedia.org/wiki/Steins;Gate), sim esse desafio foi tudo com a intenção de indicar o anime pra a comunidade 🤪

## :rocket: Iniciando

1. Baixando o repositório

  - Usando Git
```shell
  git clone https://github.com/jpalvesl/kurisu.git
```
  - Usando Github CLI
```shell
  gh repo clone jpalvesl/kurisu
```
  > :bulb: ou qualquer outra forma que você preferir


2. Variáveis de ambiente

Se tudo estiver certo, crie um arquivo com o nome de **.env** seguindo o exemplo do **.env.example** com o seguinte comando:

Para Windows: `$ copy .env.example .env`

Para Linux: `$ cp .env.example .env`

| Opção         | Descrição                        | Obrigatório? |
| ------------  | -------------------------------- | ------------ |
| TOKEN         | Token de autenticação do seu bot | sim          |
| CLIENT_ID     | ID da aplicação no discord       | sim          |
| PREFIX        | Prefixo dos comandos             | sim          |
| TENORKEY      | Key da Tenor API gif             | sim          |
| WEATHERAPIKEY | Key do OpenWeatherMap API        | sim          |
| NEWSAPIKEY    | Key da NewsAPI                   | sim          |
| LOGINMEME     | Login do ImgFlip API             | sim          |
| PASSWORDMEME  | Senha do ImgFlip API             | sim          |


3. Instalação e execução
  - Usando npm
```shell
  npm install
  npm run dev
```
  - Usando yarn
```shell
  yarn
  yarn dev
```

## 🧐 O que tem dentro?

### :building_construction: Tecnologias
- [Typescript](https://www.typescriptlang.org)


### :package: Pacotes
- [discord.js](https://discord.js.org/#/)
- [axios](https://www.npmjs.com/package/axios)
- [jimp](https://www.npmjs.com/package/jimp)
- [qs](https://www.npmjs.com/package/qs)

### :open_file_folder: API's utilizadas
- [News API](https://newsapi.org)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Imgflip API](https://api.imgflip.com)
- [Poke API](https://pokeapi.co)
- [COVID-19 API](https://covid19api.com)
- [Tenor API](https://tenor.com/gifapi)

### Uma rápida olhada nos arquivos presentes dentro de `./src`.

    ./src
     ├── assets
     ├── commands
     index.ts

1.  **`assets`**: Pasta que guarda a ultima imagem filtrada que foi enviada para o discord.

2.  **`commands`**: Todos os comandos que a bot possui.

## :memo: Licença

This project is under the UNLICENSE. See the file [UNLICENSE](UNLICENSE) for more details.

---

Construido com 💙 por [João Lima](https://github.com/jpalvesl)

Baseado no [readme template](https://gist.github.com/henry-ns/a00234378353d9ca43e1bfe043202192) por [Henrique Miranda](http://thehenry.dev/)