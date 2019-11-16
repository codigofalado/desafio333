# Where's wally?
## Onde está o Wally?

Where's Wally? (Onde Está Wally? no Brasil) é uma série de livros de caráter infanto-juvenil criada pelo ilustrador britânico Martin Handford, baseada em ilustrações e pequenos textos, a série deu origem a uma série animada, uma tira de jornal, uma coleção de 52 revistas semanais intitulada O Mundo de Wally, e jogos eletrônicos. [wiki](https://pt.wikipedia.org/wiki/Where%27s_Wally%3F)

## Desafio 333
O #Desafio333 é um desafio mensal SIMPLES com o objetivo de convidar a comunidade a conhecer novas ferramentas. A cada mês, o desafio girará em torno de uma tecnologia diferente. Neste mês de Novembro, a tecnologia abordada será o WebSocket. [Codigo Falado](https://github.com/codigofalado/desafio333)

## Desafio333 - Novembro 2019 - WebSocket
Desenvovi para o desafio um jogo simples que remete a minha infância, a busca do **Wally** em seus cenários caóticos, espero que gostem e se divirtam.

**Tecnologias:** *Python* ([flask](https://pypi.org/project/Flask/), [flask-websocket](https://pypi.org/project/Flask-WebSocket/)), *JavaScript* ([Magnifier](https://mark-rolich.github.io/Magnifier.js/), bsocket.io e jquery), *CSS* ([Bootstrap Material](https://fezvrasta.github.io/bootstrap-material-design/))

## Link do Repositório
[GitHub Where's Wally](https://github.com/ddauriol/Wheres_Wally)

### Conteudo:
#### Cliente:
* index.html
* **css**
  * magnifier.css
  * style.css
* **img**
  * **icons**
      * CodigoFalado.png
  * **logo**
      * logo_wally.png
      * logo_wally_code_falado.png
  * **places**
      * wally_place_0.jpg
      * wally_place_1.jpg
      * wally_place_2.jpg
      * wally_place_3.jpg
      * wally_place_4.jpg
      * wally_place_5.jpg
      * wally_place_6.jpg
  * title_wally.png
* **js**
  * Event.js
  * Magnifier.js
  * main.js

#### Servidor:
* app.py
* jsonmanager.py
* **json**
  * games.json
  * resposta.json

## Configuração:
No arquivo ***app.py*** deve ser configurado o IP do servidor, caso contrario o sistema de proteção **cors** não permitira o acesso.
```python
if __name__ == '__main__':
    socketio.run(app, host="127.0.0.1")
```

No arquivo ***main.js*** deve ser configurado o IP e a porta do servidor.
```javascript
// Configuração do servidor
var ip_servidor = '127.0.0.1'
var port_servidor = '5000'
```

## Links ativos:

[Cliente](http://100.64.165.55:8090/desafio333/)

[Server](http://100.64.165.55:5000)

### ***Devido ao problemas de LAG com o Heroku, estou hospedando o no meu Raspberry o servidor, atualmente o IP é:***
### **100.64.165.55**
### *Caso o IP não esteja válido, me avise que atualizo o mesmo aqui.*

### Acesso direto ao Heroku (Muito LAG, desisti de tentar configurar, gastei muito tempo e não tive grandes sucessos.)
[Heroku](https://whereswallydesafio333.herokuapp.com/)

## Iniciando o servidor:
Dentro da pasta do servidor digite `flask run`
![Flask Run](https://github.com/ddauriol/Wheres_Wally/blob/master/gifs/FlaskRun.gif)

## Iniciando o cliente:
Basta abrir o arquivo `Index.html` em qualquer browser moderno.

### Criando um novo jogo:
Escolha o nome de usuário e um cenário, em seguida clique em `criar`
![Criar Sala](https://github.com/ddauriol/Wheres_Wally/blob/master/gifs/CriarNovoJogo.gif)

### Entrando em uma sala:
Todas as salas criadas e ativas estarão disponiveis para que outros usuários entrem no jogo. Desta forma é possivel jogar com seus amigos.
Escolha o nome de usuário em seguida clique na sala desejada.
![Entrar em uma Sala](https://github.com/ddauriol/Wheres_Wally/blob/master/gifs/EntrarSala.gif)

## Fim de jogo:
Quando algum usuário localizar o **Wally** uma mensagem será enviada para todos daquela sala, informando o *ganhador*, *número de tentativas*, as *coordernadas* do **Wally* e o *tempo total*.
A sala será eliminada do servidor automaticamente.
## Ferramentas:
O jogo permite a conversa entre todos os jogadores no servidor usando o `Chat`, ainda possui um janela de informações que lhe fornece as coordernadas do último click. A ferramenta de zoom é uma ótima para esclarecer dúvidas sobre o **Wally**.

#### Nota: Todas as janelas são reposicionaveis, para facilitar o uso em telas de baixa resolução.

![Janelas](https://github.com/ddauriol/Wheres_Wally/blob/master/gifs/Janelas.gif)

## Cheats
É possivel acessar as coordernadas do **Wally** usando uma rota especifica no servidor.
 `/cheats?place=[arg]`
 onde o `arg` deve ser substituido pelo número do cenário.
 Exemplo:
 ```
 http://127.0.0.1:5000/cheats?place=6
 ```
 ```json
{"Mensagem":"Aproveite, porem não conte para ninguem.",
"resposta":{
    "place":"wally_place_6",
    "x_max":"725",
    "x_min":"710",
    "y_max":"415",
    "y_min":"390"}
    }
 ```

 ## Considerações Finais
 Agradeço a oportunidade de participar do **Desafio 333**, uma vez que sou Engenheiro Mecânico e venho aprendendo programação afim de me preparar para a Indústria 4.0

 ### ***Nota: Não tratei os erros para não deixar o projeto muito grande e descaracterizar o objetivo do desafio.***
