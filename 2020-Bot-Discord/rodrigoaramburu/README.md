# BotBotavel

O bot tem suas funcionalidades divididas em "subbots", ao ser adicionado a um servidor do Discord todas as funcionalidades estão por padrão desatividas e devem ser ativadas para cada canal desejado através de comandos de gerenciamento.

Alguns "subbots" possuem atividades em loop, que serão executados em intervalos de tempo definidos, este recurso também deve ser ativado dentro de cada canal.

O nome do bot não possui relação com a funcionalidade, apenas gostei de como soa :)

# Testando 

O bot está rodando temporáriamente em um servidor do discord para teste para entrar segue o convite https://discord.gg/q38xHwb

Para adiconar o bot em seu servidor use o link https://discordapp.com/oauth2/authorize?=&client_id=723603552752369734&scope=bot&permissions=8

Para rodar o bot localmente clone o repositório, renomei o arquivo .env.example para .env e altere as chaves do bot e dos serviços necessário, instale as dependências do arquivo requirements.txt. Rode botbotavel/main.py.

# Comandos de gerenciamento

- **!botbotavel listar**: Lista todos os "subbots" disponívels no canal que for executado e seus status, loop status e intervalo de loop

- **!botbotavel ativar nome_bot**: Ativa o "subbot" passado no canal ao qual foi executado o comando.

- **!botbotavel desativar nome_bot**': Desativa o subbot passado no canal ao qual foi executado o comando.

- **!botbotavel loop_ativar nome_bot**: Ativa a funcionalidade de loop no canal ao qual foi executado o comando. Obs. alguns "subbots" não possuem funcionalidades de loop, confira a documentação de cada "subbot".

- **!botbotavel loop_desativar nome_bot**: Desativa o "subbot" no canal ao qual foi executado o comando.

- **!botbotavel set_loop_time nome_bot min**: Configura o intervalo em minutos que o "subbot" executa a sua funcionalidade de loop.


# "Subbot": BotChamada

**Comandos**

- **!botchamada**: Nosso bot é um bot limpinho, cheiroso e honesto que não tenta enganar os usuários então, toda vez que for feita uma chamada ele prontamente irá se identificar propriamente como um bot.

# "Subbot": XingaBot

Este bot não é recomendável ser ativado em canais de familia, somente em ambientes tóxicos, estejam avisados :)

**Comandos**

- **!botbobo**: Você é xingado! Esperava o que? Chama o bot de bobo e acha que vai ficar impune? :) . Sorteia um dos xingamentos cadastrados e envia para o membro que executou o comando

- **!botbobo listar**: Lista todos os xingamentos cadastrados. Somente pode ser executado por membro administrativo do canal.

- **!botbobo adicionar 'xingamento'**: Adiciona um xingamento. Somente pode ser executado por membro administrativo do canal.

- **!botbobo deletar id**: Remove um xingamento. Somente pode ser executado por membro administrativo do canal.

- **-Função loop-**: No intervalo de tempo definido escolhe um membro aleatório do canal e o xinga, sabe é muito ódio e rancor contido neste pequeno bot.

# "Subbot": FofoBot

Para equilibrar as energias karmicas e reparar o mal feito pelo XingaBot, o FofoBot foi criado. Este bot tem como objetivo fazer elogios para os membros do canal.

Todo membro que enviar uma mensagem em um canal em que o FofoBot está ativo tem 1 chance em 20 (vulgo 5%) de receber um elogio aleatório, mas merecido.

**Comandos**

- **!botfofo**: O bot retorna a gentileza de tão agradável elogio com outro elogio :) . Sorteia um dos elogios cadastrados e envia para o membro que executou o comando

- **!botfofo listar**: Lista todos os elogios cadastrados. Somente pode ser executado por membro administrativo do canal.

- **!botfofo adicionar 'elogio'**: Adiciona um elogio. Somente pode ser executado por membro administrativo do canal.

- **!botfofo deletar id**: Remove um elogio. Somente pode ser executado por membro administrativo do canal.

- **-Função loop-**: No intervalo de tempo definido escolhe um membro aleatório do canal faz aquele elogio gostoso, sabe é muita fofura dentro deste pequeno bot e ele tem que compartilhar.


# "Subbot": FeedNewsBot

Bot para compartilhar notícias de sites. Permite cadastrar o Feed de um site e ele irá compartilhar no canal ativo cada nova publicação deste site.

**Comandos**

- **!newsbot listar**: Lista todos feeds de sites cadastrados. Somente pode ser executado por membro administrativo do canal.

- **!newsbot adicionar 'url_do_feed'**: Adiciona um feed. Somente pode ser executado por membro administrativo do canal.

- **!newsbot deletar 'url_do_feed'**: Remove um feed. Somente pode ser executado por membro administrativo do canal.

- **!newsbot ultima**: Compartilha a última publicação.

- **-função loop-**: No intervalo de tempo definido acessa cada um dos feed cadastrados para verificar novas publicações e compartilha uma que ainda não foi compartilhada. Necessário para o funcionamento do "subbot"


# "Subbot": BotTube 

Bot para compartilhar vídeos de canais do youtube.

**Comandos**

- **!bottube listar**: Lista todos canais cadastrados. Somente pode ser executado por membro administrativo do canal.

- **!bottube adicionar youtube_channel_id**: Adiciona um canal(Ex. !bottube adicionar UCtwkSRuugeCF1Bh8kxE55qQ). Somente pode ser executado por membro administrativo do canal.

- **!bottube deletar youtube_channel_id**: Remove um canal. Somente pode ser executado por membro administrativo do canal.

- **-função loop-**: No intervalo de tempo definido acessa cada um dos canais cadastrados para verificar novos vídeos e compartilha um que ainda não foi compartilhado.

link para pegar id de canais do youtube: https://commentpicker.com/youtube-channel-id.php

# "Subbot": RollBot

Bot para rolar dados. Obs.: tive que segurar a quinta série dentro de mim para não chamar este "subbot" de RolaBot

**Comandos**

- **!botroll expressao_dados 'mensagem de rolagem'**: Realiza uma rolagem de dados dada uma expressão de dados, Ex. 1d6, 2d8, 3d4+3, 1d100>75. Se um dos operadores > < = for utilizado o "subbot" irá informar se a rolagem teve sucesso ou não. A mensagem de rolagem é opcional.

Obs. este subbot não possui função de loop


# "Subbot": TempoBot

Bot para fornecer informações sobre o tempo(clima).

**Comandos**

- **!bottempo 'cidade_pesquisa'**: Retorna informações sobre o tempo da cidade pesquisada.

Obs. este subbot não possui função de loop

# "Subbot": BotCambista

Bot para fazer converção de moedas.

**Comandos**

- **!botcambista formato_conversao quantidade**: Converte valores de uma moeda para outra dado um formato de conversão, Ex. BRL-USD, ARS-USD, UYU-BRL.

Ex. de uso: **!botcambista BRL-USD 30**

Obs. este subbot não possui função de loop


# "Subbot": TraduBot

Bot para realizar tradução de palavras e pequenas frases

**Comandos**

- **!tradubot formato_traducao 'frase'**: Traduz uma sentença dado um formato de tradução contendo a lingua de origem da senteça e a lingua de destino. 

Ex. de uso: **!tradubot pt-en 'Eu sou lindo'** , **!tradubot de-pt 'dieser bot ist fehlerhaft'**

Linguas de disponíveis: https://cloud.google.com/translate/docs/languages?hl=pt-br

Obs. este subbot não possui função de loop


# "Subbot": SabioBot

Bot para compartilhar sabedoria.

**Comandos**

- **!sabiobot**: retorna uma pérola de sabedoria para o membro que solicitou.

- **-função loop-**: No intervalo de tempo definido compartilha um pérola de sabedoria aleatória no canal ativo.



# PS.

Alguns subbots(se não todos) ainda precisam de ajustes, então quando encontrar um bug não seja um XingaBot seja um FofoBot :)

Twitter e Twitch: @roderico42
