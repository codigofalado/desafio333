
<h1 align="center"> Desafio333-Url-Preview</h1>

<h3 align="center">
  <img src="https://avatars1.githubusercontent.com/u/50280477?s=200&v=4" width="125"><br>
    <a href="https://github.com/codigofalado/desafio333">Código Falado</a>
    <br>
    <br>
</h3>

# Implementação
O projeto foi desenvolvido tendo como principais tecnologias o Node e o React, por serem plataformas que eu gosto bastante e achei que seria bem interessante usar nesse desafio.

- Link do repositório https://github.com/marcopandolfo/Desafio333-Url-Preview

Abaixo vou explicar um pouco sobre o desenvolvimento do projeto


# Sobre a API
A API atualmente está hospedada na heroku e você pode testar o projeto usando a url `http://urlpreview.herokuapp.com/`

Basta apenas fazer um POST nessa url passando como body param a `url` que você deseja extrair os dados

##### Exemplo
```
{
  "url": "https://github.com/codigofalado/"
}
```

E a partir disso, a api irá retonar um JSON contendo as informções daquela URL.

##### Exemplo
```
{
  "url": "https://github.com/codigofalado",
  "source": "github.com",
  "title": "Código Falado",
  "type": "profile",
  "description": "A comunidade de Live Coding onde aprendemos juntos! - Código Falado",
  "domain": "github.com",
  "thumbnail": "https://avatars0.githubusercontent.com/u/50280477?s=280&v=4",
  "sitename": "GitHub"
}
```

# Sobre o frontend
O projeto conta com uma interface web feita em React consumindo a API do projeto, que possui 2 modos de visualização (raw json e um modo mais visivel das informações)

Você pode testar agora mesmo em

https://url-preview.netlify.com/

![image](https://user-images.githubusercontent.com/40467826/67532594-328e5d80-f69d-11e9-931e-4ef2cc47b8d6.png)

![image](https://user-images.githubusercontent.com/40467826/67532630-5487e000-f69d-11e9-9d77-acafbed73dfe.png)
