<h1 align='center'>
    M I C E B O T<br>
    <img src='https://raw.githubusercontent.com/micebot/assets/master/images/discord-256x256.png' height="100">
    <img src='https://raw.githubusercontent.com/micebot/assets/master/images/logo-256x256.png'>
    <img src='https://raw.githubusercontent.com/micebot/assets/master/images/twitch-256x256.png' height="90"><br>
</h1>

# O que é

O [MiceBot][1] é uma aplicação desenvolvida com o objetivo de tornar automatizado o processo de entrega de E-Books durante as lives no canal [@codigofalado][2]. Esse projeto não tem nenhuma relação com o canal e trata-se, no momento, de somente uma ideia.

Por conta do tamanho do projeto, não conseguimos colocá-lo todo em um único diretório (um dos requisitos mencionados no README de participação), para isso criamos uma organização no GitHub com nossos repositórios: [https://github.com/micebot][1].

# Como é hoje

Durante as lives, ocorrem sorteio de E-books (e outros itens) como todos da comunidade já sabem. Após a confirmação do ganhador, um moderador acessa uma listagem privada com vários códigos, seleciona um dos disponíveis e envia como sussurro (na Twitch) para o vencedor - e depois, claro, marca aquele código como entregue. A ideia de tornar esse processo todo automatizado é o objetivo do MiceBot. 🐁

# Qual a ideia? Como Funciona?

Todo o processo começa no [Discord][3]: disponibilizamos um bot que permite que o dono do canal e moderadores possam cadastrar, editar, remover e acessar relatórios contendo todos os códigos disponíveis, bem como a listagem de quem recebeu, qual moderador foi responsável pela entrega, data, hora, etc.

Durante as lives, temos [outro bot (*pubsub*)][4] que fica escutando por comandos dados pelo streammer e/ou moderadores no chat durante a transmissão. Uma vez utilizado o comando `!book @usuário` (contendo uma ou mais menções a usuários), esse bot irá verificar a disponibilidade de códigos e se houver códigos a disposição, irá entregá-los automaticamente via sussurro para o(s) usuário(s) mencionado(s).

Entre bot no Discord e Twitch, temos nosso [servidor][5] que é responsável por manter todas as regras e persistência de dados.

# Stack

Estamos utilizando Python e Typescript. A hospedagem dos bots e do servidor está sendo realizada no Heroku, gratuitamente. Para não termos problemas quanto a disponibilidade no plano gratuito, criamos 3 contas (uma para cada aplicação 🐭). Para utilizar o recurso de sussurro na Twitch, foi necessário solicitar a confirmação do nosso bot, felizmente a Twitch é muito amigável com desenvolvedores. Temos toda parte de testes, qualidade e deploy configurada em nosso CI/CD no [no GitLab][6].

# FAQ

## Por que esse nome?

Não sei, pergunte para a [@milaxd][10].

## Como testar?

A integração com a Twitch, somente moderadores e o dono do canal pode utilizar. Porém temos um ambiente de desenvolvimento da nossa API e um servidor de testes no Discord. Sinta-se a vontade para utilizá-los:

## Testando a API diretamente

1. Acesse [essa URL][7] e clique no botão "Authorize":

<kbd>![image](https://user-images.githubusercontent.com/3982052/88589438-831d5780-d02f-11ea-821b-0500d41f0957.png)</kbd>

2. Utilize as credencias:
- **username**: `ds_user`
- **password**: `ds_pass`

3. Uma vez autorizado, você pode utilizar qualquer rota disponibilizada nessa documentação! 👍🏼 

## Testando o bot do Discord

1. Entre em nosso servidor de testes clicando na imagem abaixo:
<kbd>
<a href="https://discord.gg/v9F6bfu">
<img src="https://user-images.githubusercontent.com/3982052/88589738-f7f09180-d02f-11ea-8af3-4b319942bfee.png">
</a>
</kbd>

2. Utilize qualquer comando disponível [aqui][8].

## Comandos

### `!mice orders`

Exibe os últimos pedidos entregues, isto é, pode-se visualizar a data da
entrega, o nome do moderador responsável e o nome do usuário que recebeu
a premiação.

*Parâmetros:*
- `limite`: número máximo de itens para exibir. Se nenhum valor for
especificado, por padrão, 5 itens serão exibidos.

*Exemplos de uso:*

`!mice orders`

`!mice orders 2`


### `!mice ls`

Exibe os produtos registrados.

*Parâmetros:*
- `limite`: número máximo de itens para exibir. Se nenhum valor for
especificado, por padrão, 5 itens serão exibidos.

*Exemplos de uso:*

`!mice ls`

`!mice ls 2`


### `!mice add`

Insere um novo produto para ser entregue.

*Parâmetros:*
- `código` **(requerido)**: código que será disponibilizado para o usuário.
- `descrição`: algum valor para identificar o código posteriormente, nos
relatórios. Se nenhum valor for especificado, por padrão será assumido E-Book.

*Restrições:*
- não é possível adicionar um código que já foi inserido anteriormente.

*Exemplos de uso:*

`!mice add 5f3e922a-cef6-4db7-bf40-4d7b9cf66da0`

`!mice add 5f3e922a-cef6-4db7-bf40-4d7b9cf66da0 Kindle`


### `!mice edit`

Permite editar um produto cadastrado anteriormente.

*Parâmetros:*
- `uuid`: **(requerido)**: identificador único do produto.
- `código` **(requerido)**: novo código para ser atribuído ao produto.
- `descrição`: algum valor para identificar o código posteriormente, nos
relatórios. Se nenhum valor for especificado, por padrão será assumido E-Book.

*Restrições:*
- não é possível editar o produto utilizando um código já presente em outro.

*Exemplos de uso:*

`!mice edit uuid_do_produto 5f3e922a-cef6-4db7-bf40-4d7b9cf66da0`

`!mice edit uuid_do_produto 5f3e922a-cef6-4db7-bf40-4d7b9cf66da0 Kindle`


### `!mice remove`

Remove um produto cadastrado para resgate.

*Parâmetros:*
- `uuid`: **(requerido)**: identificador único do produto.

*Restrições:*
- não é possível remover um produto que já foi resgatado.

*Exemplos de uso:*

`!mice remove uuid_do_produto`


[1]:https://github.com/micebot
[2]:https://www.twitch.tv/codigofalado
[3]:https://github.com/micebot/discord
[4]:https://github.com/micebot/pubsub
[5]:https://github.com/micebot/server
[6]:https://gitlab.com/micebot
[7]:https://app-dev-micebot.herokuapp.com/docs
[8]:https://github.com/micebot/discord#comandos
[10]:https://github.com/milafrn