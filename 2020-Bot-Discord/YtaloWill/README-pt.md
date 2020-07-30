# BOT CONTENT AWARE SCALE PARA DISCORD

Este projeto foi feito para o [desafio333](https://github.com/codigofalado/desafio333/blob/master/2020-Bot-Discord/README.md).

## Comandos

`!distort help`: o bot vai te explicar como usar o comando `!distort`

`!distort`: vai redimensionar sua imagem usando o algoritmo [Seam Carving](https://en.wikipedia.org/w/index.php?title=Seam_carving) para que tenha [essa](https://www.youtube.com/watch?v=8rK67BT6Ivw) forma no final, exatamente como o meme.

Apenas envie uma imagem usando o comando `!distort` em seu comentário:

![](example/example-usage.png)

### Effect

Antes | Depois

<img src="example/example1-before.png"> <img src="example/example1-after.jpeg">

## Como usar

### Adicionando no servidor

Você pode usar em seu servidor apenas acessando o link abaixo:

https://discord.com/oauth2/authorize?client_id=737393713759649794&scope=bot&permissions=166976

### Requisitos para build

Caso você queira baixar o código e fazer suas alterações você precisará:

- Go
- [Caire](https://github.com/esimov/caire) instalado
- Crie um arquivo .env com apenas essa linha: 

```
TOKEN=coloqueaquiseutoken
PORT=5000
```
