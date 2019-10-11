# Desafio333 - Outubro 2019 - API URL Preview

O desafio do mês de Outubro é focado em Back-End e será possível usar **qualquer linguagem de programação**.

Vamos simular que um cliente precisa de uma API para responder a requisições que retornarão dados necessários para gerar uma pré-visualização de uma URL.

## Explicando o funcionamento da API

Sua API deverá responder a uma requisição do tipo **POST** contendo o seguinte parâmetro:

```
url: "https://challenge-stats.netlify.com"
```

Seu script irá retornar um **JSON** contendo **no mínimo** os seguintes dados:

```
{
    domain: "challenge-stats.netlify.com",
    sitename: "Challenge Stats",
    title: "Challenge Stats · Desafio333 · CodigoFalado",
    description: "Aplicação para obter informações relacionadas aos participantes do #desafio333 criado pelo canal @codigofalado. ",
    thumbnail: "https://challenge-stats.netlify.com/image.jpg"
}
```

*(Os dados usados tanto na requisição quanto no retorno deste README são EXEMPLOS, sua API deverá retornar um JSON com os dados da URL fornecida no POST).*

### Tipo de dados retornados em cada chave:

- **domain**: String (Obrigatório) - Domínio da URL
- **sitename**: String (Opcional) - Nome do Site
- **title**: String (Obrigatório) - Título da Página
- **description**: String (Opcional) - Descrição da Página
- **thumbnail**: String (Opcional) - URL para a Imagem de Thumbnail da Página

Vence aquele que fizer a **melhor** implementação desta API, atendendo às necessidades mínimas do "cliente" (cumprindo as regras).

## Como desenvolver sua API

Diferente dos desafios anteriores, neste mês você não vai desenvolver o desafio dentro do nosso repositório oficial (https://github.com/codigofalado/desafio333). Ao invés disso, você criará um repositório próprio no Github para desenvolver a sua API. Dentro do repositório do `desafio333/2019-Outubro-Url-Preview/SEU_USUARIO` você irá apenas criar um `README.md` explicando sua implementação e linkando o seu repositório + outras URLs de testes que você ache necessário.

## Regras

- Não crie/edite nada fora da pasta do seu usuário no repositório principal do Desafio333. Crie uma pasta com seu nome de usuário dentro de `2019-Outubro-Url-Preview` e faça seu `README.md` lá dentro.
- Como o vencedor será definido pela comunidade, votando na melhor implementação, tente **comentar** o máximo possível do seu código, para que fique fácil entender sua forma de pensar direto no fonte.
- Sua implementação será testada (tente facilitar ao máximo os testes) pela comunidade, portanto pense em várias possibilidades fora do comum.
- A data limite para o seu Pull Request é **26/10/2019 às 17hs**.
- No seu Pull Request, descreva detalhes sobre o que você fez e, se possível, adicione links para testes. Quanto melhor for sua descrição, maiores as chances de receber votos da comunidade.
- *Moderadores da Comunidade Código Falado estão LIBERADOS para concorrer aos prêmios deste desafio.*

## Tarefas Opcionais

- Sua API poderá retornar mais dados, fazendo com que a preview de URL seja mais detalhada/completa.
- Você poderá publicar sua API em serviços gratuitos que forneçam processamento de Back-End ([AWS](https://aws.amazon.com/), [Google Cloud](https://cloud.google.com/), [Heroku](https://www.heroku.com), etc) para permitir que o @CodigoFalado teste sua API ao vivo com a galerinha.
- Você pode desenvolver um Front-End simples para consumir a sua API e assim deixar o "cliente" felizão :)


## FAQ

### Está liberado o uso de Frameworks?

Sim!

### Está liberado o uso de dependências de terceiros para facilitar tarefas comuns durante o desenvolvimento?

Sim! Não esqueça que o objetivo principal é uma **boa implementação**, partindo do princípio que sua API entrega os requisitos mínimos.

### Já enviei meu Pull Request e gostaria de fazer mais alterações. Posso ?

Todos os commits que você adicionar no seu Fork vão parar no seu Pull Request. Então você tem até a data limite (**26/10/2019 às 17hs**) para fazer quantas edições você achar necessário.

## Saiba Mais

Veja o [README](../README.md) principal para mais detalhes.

**Caso tenha dúvidas, edite este arquivo e adicione sua pergunta no FAQ**
