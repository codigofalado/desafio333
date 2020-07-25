> Projeto ainda em desenvolvimento, bem como esse README.

<h1 align='center'>
    <img src='https://raw.githubusercontent.com/micebot/assets/master/images/logo-256x256.png'>
    <br>
    MiceBot
</h1>

# O que é

O [MiceBot][1] é uma aplicação desenvolvida com o objetivo de tornar automatizado o processo de entrega de E-Books durante as lives no canal [@codigofalado][2]. Esse projeto não tem nenhuma relação com o canal e trata-se, no momento, de somente uma ideia.

Por conta do tamanho do projeto, não conseguimos colocá-lo todo em um único diretório (um dos requisitos mencionados no README de participação), para isso criamos uma organização no GitHub com nossos repositórios: [https://github.com/micebot][1].

# Como é hoje

Durante as lives, ocorrem sorteio de E-books (e outros itens) como todos da comunidade já sabem. Após a confirmação do ganhador, um moderador acessa uma listagem privada com vários códigos, seleciona um dos disponíveis e envia como sussurro (na Twitch) para o vencedor - e depois, claro, marca aquele código como entregue. A ideia de tornar esse processo todo automatizado é o objetivo do MiceBot. 🐁

# Qual a ideia? Como Funciona?

Todo o processo começa no [Discord][3]: disponibilizamos um bot que permite que o dono do canal e moderadores possam cadastrar, editar, remover e acessar relatórios contendo todos os códigos disponíveis, bem como a listagem de quem recebeu, qual moderador foi responsável pela entrega, data, hora, etc.

Durante as lives, temos [outro bot (*pubsub*)][4] que fica escutando por comandos dados pelo streammer e/ou moderadores no chat durante a transmissão. Uma vez utilizado o comando `!book @usuário` (contendo uma ou mais menções a usuários), esse bot irá verificar a disponibilidade de códigos e se houver códigos a disposição, irá entregá-los automaticamente via sussurro para o(s) usuário(s) mencionado(s).

Entre bot no Discord e Twitch, temos nosso [servidor][5] que é responsável por manter todas as regras e persitência de dados.

# Stack

Estamos utilizando Python (*FastAPI, discord.py*) e Typescript (*tmi.js*). A hospedagem dos bots e do servidor está sendo realizada no Heroku, gratuitamente. Para não termos problemas quanto a disponibilidade no plano gratuito, criamos 3 contas (uma para cada aplicação 🐭). Para utilizar o recurso de sussurro na Twitch, foi necessário solicitar a confirmação do nosso bot, felizmente a Twitch é muito amigável com desenvolvedores. Temos toda parte de testes, qualidade e deploy configurada em nosso CI/CD no [no GitLab][6].


# FAQ

### Por que esse nome?

Não sei, pergunte para a [@milaxd][10].

### Logo?
Arte de [Anthony Ledoux](https://www.iconfinder.com/Vntole) - ([*link do pacote*](https://www.iconfinder.com/iconsets/outbreak-epidemic)).


[1]:https://github.com/micebot
[2]:https://www.twitch.tv/codigofalado
[3]:https://github.com/micebot/discord
[4]:https://github.com/micebot/pubsub
[5]:https://github.com/micebot/server
[6]:https://gitlab.com/micebot
[10]:https://github.com/milafrn