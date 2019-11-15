# Entrada no desafio de outubro de 2019.

[Projeto Scrape333.](https://github.com/jpedrosa/scrape333)

Obrigado pela oportunidade.

O desafio foi bem interessante. No meu caso envolveu diversas tecnologias que
eu nem conhecia ainda ou pouco usei. Muito bom acompanhar o progresso dessas
comunidades, poder interagir e aprender.

# Tecnologia.

Escolhi o Node.js finalmente. Em termos de parsing do HTML fiquei indeciso e
usei 3 bibliotecas diferentes: 
[htmlparser2](https://github.com/fb55/htmlparser2),
[parse5](https://github.com/inikulin/parse5) e 
[cheerio](https://github.com/cheeriojs/cheerio) nessa ordem. A diferença entre
elas tem a ver com a validação do HTML e a diferença de performance. No fim,
optei por padrão usar o parse5 como um meio termo. No servidor a resposta é
provida pelo parse5 por padrão. O código do cheerio foi o mais lindo e indico
ler o código no arquivo
[lib/scrape.js](https://github.com/jpedrosa/scrape333/blob/master/lib/scrape.js)
do projeto para ver as diferenças.

Para a parte do servidor escolhi a biblioteca
[Fastify](https://github.com/fastify/fastify). O resultado foi bastante
gratificante, pois os plugins deixam tudo mais fácil e sem muito código. Às
vezes deu um pouco de dor de cabeça, mas após procurar no google deu para
resolver.

Para hospedar o [site](https://scrape333.herokuapp.com/index.html) fui de
Heroku. Leva um pouco de tempo para se acostumar ao Heroku, mas nada que uma
semana batendo cabeça não resolva.

# Teste

Para testar o projeto, você pode ir ao
[site](https://scrape333.herokuapp.com/index.html) hospedado no Heroku. A página
de Scrape permite fazer scraping de qualquer página, embora por padrão use a
[página de teste](https://scrape333.herokuapp.com/frutas) do próprio projeto.

Um sistema de [URL Preview](https://scrape333.herokuapp.com/url_preview) foi
adicionado e pode ser usado para teste deste projeto e de outros baseados na
mesma API do desafio.

Outras informações se encontram no
[README padrão do projeto.](https://github.com/jpedrosa/scrape333)

Para fazer uma requisição de método post como exigido no desafio, basta apontar
para o URL
[https://scrape333.herokuapp.com/scrape](https://scrape333.herokuapp.com/scrape)
, enviando como parâmetro json ou form o URL da página a ser feita o scraping.

O exemplo a seguir mostra como:

```javascript
    const request = require("request");

    request.post({url: "https://scrape333.herokuapp.com/scrape",
        json: {url: "http://pudim.com.br/"}},
        (err, res, body) => {
            if (err) {
                throw err;
            }
            if (res.statusCode === 200) {
                console.log(JSON.stringify(body));
            } else {
                throw `Error: Something went wrong!\n${res}\n${body}`;
            }
        });
```

# Opcionais

O projeto também inclui ferramentas de linha de comando que ficam dentro do
[./bin](https://github.com/jpedrosa/scrape333/tree/master/bin) do projeto. O
arquivo
[./bin/scrape.js](https://github.com/jpedrosa/scrape333/blob/master/bin/scrape.js)
tem opções para operar em arquivos locais ou em URLs e pode ser usado para testar
os algoritmos alternativos.

Já o arquivo
[./bin/request.js](https://github.com/jpedrosa/scrape333/blob/master/bin/request.js)
pode ser usado para efetuar requisições para um servidor local do projeto ou
para o servidor remoto do projeto. É uma alternativa a usar a página de Scrape
do site e inclui mais opções.

Além dos campos obrigatórios, o projeto incluiu outros campos, fazendo ainda
o scraping das imagens da página.

# Notas

* O página do
[Scrape](https://github.com/jpedrosa/scrape333/blob/master/templates/scrape.ejs) 
faz uma requisição post com o objeto XMLHttpRequest do JavaScript. Na hora da
requisição existe uma diferença entre uma requisição por json ou por HTML form.

* Se o thumbnail não existir no meta tag "og:image", então a primeira imagem que
aparecer na página será usada como thumbnail. Um problema existe quando essa
imagem é um SVG, como presenciei ao testar em uma página aleatória da web. Isso
de usar a imagem como thumbnail ajuda em sites como o
[http://pudim.com.br](http://pudim.com.br) que foi usado durante a live do
desafio.

* A diferença de performance entre as bibliotecas de parsing do HTML não é tanta
quando se faz apenas uma requisição de tempos em tempos. A diferença pode pesar
mais se forem feitas centenas ou milhares de requisições.

# Resultados retornados pelo scraping

* domain - Ex: "pudim.com.br"
* sitename
* title
* description
* thumbnail
* keywords
* author
* images

# Instalação

O 
[README padrão](https://github.com/jpedrosa/scrape333/blob/master/README.md#instala%C3%A7%C3%A3o) 
contém instruções para instalação.