# Introdução.

Assistindo a live do desafio333, resolvi tentar fazer este desafio.
Primeiramente pensei em fazer na linguagem de programação chamada Rust que é
de mais baixo nível, mas enfrentei alguns problemas e refiz os planos para
desenvolver em NodeJS.

Pouco usei NodeJS até hoje, então para mim está sendo um aprendizado do mesmo
jeito. Bem de acordo com os ideais do desafio.

# Tecnologias

## Scraping

Para a parte de extrair os dados da página web (scraping), comecei com a
biblioteca [htmlparser2](https://github.com/fb55/htmlparser2) que dizia-se ser
a mais rápida. E comprovei que ela é rápida mesmo, embora não valide muito o
documento HTML por padrão.

Em seguida consegui criar um segundo algoritmo baseado na biblioteca
[parse5](https://github.com/inikulin/parse5) que também é de baixo nível por
padrão, mas esta já cria uma árvore com os elementos da HTML, trazendo assim
mais validação para os dados extraídos.

Não satisfeito devido ao código ainda estar meio redundante e difícil de ler
devido ao código de mais baixo nível, resolvi adotar a biblioteca
[cheerio](https://github.com/cheeriojs/cheerio). A cheerio é interessante por
trazer APIs popularizadas por outra biblioteca famosa chamada jQuery, mas sob
a API de alto-nível estão as bibliotecas htmlparser2 e parse5 que eu já estava
usando. A cheerio usa CSS selectors e o código fica bem mais compacto.

Comparando a performance entre elas a gente tem esta diferença mais ou menos:

```
> node .\bin\scrape.js --file .\sample\Challenge_Stats-Desafio333-CodigoFalado.html --mode loose
[...]
Elapsed: 37 ms
> node .\bin\scrape.js --file .\sample\Challenge_Stats-Desafio333-CodigoFalado.html --mode parse5
[...]
Elapsed: 80 ms
> node .\bin\scrape.js --file .\sample\Challenge_Stats-Desafio333-CodigoFalado.html --mode cheerio
[...]
Elapsed: 112 ms
```

Aonde o modo loose usa a biblioteca htmlparser2 como descrito acima.

### Ferramenta de linha de comando

Eu criei esse programa de linha de comando para deixar mais fácil testar os
algoritmos. O help dele mostra as opções:

```
> node .\bin\scrape.js

Usage: node bin/scrape.js [--url <http://abc.com> | --file <sample/Pudim.html>]
Options:
    * --url  | -u  <url> : url pointing to html page to be scraped.
    * --file | -f <file> : file pointing to html page to be scraped.
    * --mode | -m <parse5|cheerio|loose>: parse5 is the default mode.
    *               The cheerio mode is slowest but has the nicest code.
    *               The loose mode uses htmlparser2 but doesn't pay too
    *               much attetion to the HTML structure and it's fastest.
    * --output | -o <debug|json|rawHtml>: debug is the default mode.
    * --no-time : Omit the elapsed time from the output.
```

Está em inglês porque frequentemente é a língua que eu uso nos meus programas.

## biblioteca arg

Para fazer o programa de linha de comando, usei essa pequena biblioteca chamada
[arg](https://github.com/zeit/arg) que faz o parsing dos parâmetros e ajuda
bastante. Ela é relativamente simples.

## Servidor de web Fastify 

[Fastify](https://github.com/fastify/fastify) é uma alternativa mais recente ao
Express. Uma diferença como o nome indica é que Fastify seria rápido, e alguns
benchmarks mostram isso.

### Hospedar no site Heroku

Já conhecia o site Heroku então resolvi tentar hospedar lá. A experiência é
razoável para uma aplicação que não precisa de banco de dados e quer o serviço
gratuitamente. Consegui primeiro colocar um servidor de exemplo feito em Rust
e depois coloquei esta versão definitiva em NodeJS. Então é incrível a
diversidade de ferramentas disponíveis.

# Tarefas

- [x] Implementar o scraping
- [x] Fazer uma ferramenta de linha de comando para testar o scraping
- [x] Fazer o fork do desafio333 e começar a enviar o código
- [ ] Documentar o projeto
- [x] Fazer o servidor
- [x] Enviar o servidor para o Heroku
- [x] Testar tudo
- [ ] Enviar o pull request para o [Desafio333.](https://github.com/codigofalado/desafio333)
