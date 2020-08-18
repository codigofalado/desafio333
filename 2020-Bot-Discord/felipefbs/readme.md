<p align="center">
    <img alt="Logo" src="https://raw.githubusercontent.com/felipefbs/desafio333/master/2020-Bot-Discord/felipefbs/assets/logo.png" width="100" />
</p>
<h1 align="center">
  Tim Maia Bot
</h1>
<p align="center">
  <a href="https://github.com/felipefbs/desafio333/graphs/commit-activity" alt="Maintenance">
    <img src="https://img.shields.io/badge/Maintained%3F-yes-1EAE72.svg" />
  </a>

  <!-- License -->
  <a href="./LICENSE" alt="License: MIT">
    <img src="https://img.shields.io/badge/License-MIT-1EAE72.svg" />
  </a>

  <!-- codefactor -->
  <a href="https://www.codefactor.io/repository/github/felipefbs/desafio333" alt="CodeFactor">
    <img src="https://www.codefactor.io/repository/github/felipefbs/desafio333/badge" />
  </a>

  <br/>

  <!-- Social -->
  <a href="https://github.com/felipefbs/desafio333/stargazers">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/felipefbs/desafio333?style=social">
  </a>
</p>

<!-- summary -->
<p align="center">
  <a href="#clipboard-descrição">Descrição</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#sparkles-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-o-que-tem-dentro">O que tem dentro</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>


---

Dev: **Felipe**  - @felipefbs (Ghamir <- Twitch)

## :clipboard: Descrição

:tada: Depois de muito tempo pensando em um bot para Discord para enviar para esta edição do #desafio333 eu tive a ideia de criar um bot de música, mas não um bot de musica qualquer. Um que só toca as músicas de um dos melhores cantor(eu acho o melhor) o Grande Tim Maia. Selecionei só as melhores do Tim numa coletânea incrível com sucessos como: 
 - O Descobridor dos Sete Mares
 - Azul da Cor do Mar
 - Não quero dinheiro (Só quero amor)
 - Gostava tanto de você
 - E muito mais canções...

Além de tocar a versão de rádio das melhores músicas do Tim Maia, o Tim Maia Bot também toca músicas versão estilizadas [Lo-Fi](https://pt.wikipedia.org/wiki/Lo-fi_(g%C3%AAnero_musical))

Nesse projeto utilizei a biblioteca [Discord.JS](https://discord.js.org/) para fazer toda a interação com o Discord para ler e enviar mensagens e tocar os grandes sucessos da música brasileira. No geral foi bem tranquilo desenvolver esse bot. Tem muito material na internet sobre e as documentações das bibliotecas e APIs que usei foram uteis. Utilizei outras bibliotecas como YTDL-CORE para fazer uma integração com o Youtube e a parte da reprodução de música fica a cargo do FFMPEG / OpusScript para a execução das músicas. 

Para adicionar o Tim Maia Bot no seu servidor basta clicar [nesse link](https://discord.com/api/oauth2/authorize?client_id=744185717944615052&permissions=3213312&scope=bot) e autorizar ele a Ler e Enviar mensagens nos chats de texto e Conectar e Falar nos chats de voz. Como estou hospedando o bot na minha maquina pode ter alguns problemas de conexão e vai ter alguns problemas se várias pessoas de servers diferente tentarem acessar ele. 

Mas se quiser fazer os testes hospedando em sua maquina vou deixar um arquivo explicando como fazer pra colocar o Tim Maia Bot pra rodar. 


## :sparkles: Funcionalidades

O Tim Maia Bot possui três features principais.
 - Reproduzir músicas
 - Digitar frases ditas pelo cantor
 - Calcular quantas vezes da pra escutar a música [Do Leme ao Pontal](https://youtu.be/bGE55d_f30E) durante uma viagem do ponto a para o ponto b. (Essa feature precisa de um pouco mais de atenção para entender melhor o que o usuário digita, mas de forma geral deve funcionar bem)

Quando for testar o bot no servidor sugiro digitar apenas "Tim" no chat do Discord que ele irá responder.

#### :construction: Ainda tem alguns bugs :bug: e estou tentando conserta-los, principalmente a feature de calcular a rota, se encontrar algum, por favor, comenta ai em baixo :arrow_down: ou se quiser só fazer uma PR.

## 🧐 O que tem dentro?

### :label: Linguagem
- [JavaScript](https://www.javascript.com/)

### :computer: Bibliotecas e APIs

- [Discord.js](https://p5js.org)
- [MapQuest](https://reactjs.org/) - Obrigado RN4N por mandar essa dica de API lá no Discord

### :art: Ferramentas de Linter
- [Eslint](https://eslint.org/)


### :loud_sound: Músicas

A maioria das músicas foram tiradas do Canal Oficial do cantor no [Youtube](https://www.youtube.com/channel/UC2h2RtfhRdMhBNt_TjY6dmA). Você pode olhar todas as músicas que estão sendo utilizadas pelo bot no arquivo `utils/urls.js`

### :package:  Pacotes

| Função                | Biblioteca                                                    |
| --------------------- | ------------------------------------------------------------- |
| HTTP Request          | [axios](https://github.com/axios/axios)                       |
| Interface com Discord | [Discord.JS](https://discord.js.org/)                         |
| Variaveis de Ambiente | [dotEnv](https://www.npmjs.com/package/dotenv)                |
| Codec de Audio        | [ffmpeg-static](https://www.npmjs.com/package/ffmpeg-static/) |
| Encoder de Audio      | [opusscript](https://www.npmjs.com/package/opusscript/)       |
| Interface com Youtube | [ytdl-core](https://www.npmjs.com/package/ytdl-core)          |

:bulb: **Para mais detalhes, veja o `package.json`.**