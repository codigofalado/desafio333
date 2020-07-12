# Sozua's bot

**Tipo de bot:** Auxiliar  
**Prefixo:** "!s (comando)"

# 🚀 Como instalar

Siga o passo a passo e coloque a sua versão desse bot para funcionar também 😉.

1. Baixe esse projeto para o seu computador  
   `git clone https://github.com/sozua/DiscordBot.git SozuaBot`
2. Acesse a pasta do projeto e altere o arquivo '.env.example' para '.env'
3. Crie um bot no [painel do discord](https://discord.com/developers/applications)
4. Altere todas os valores das chaves para as dos seu Bot.
5. Crie o link de convite do seu Bot  
   `https://discordapp.com/oauth2/authorize?=&client_id=(Id de cliente do bot)&scope=bot&permissions=(Nivel de permissão do bot, recomendo usar: 183360)`
6. Dê start no bot e se divirta.  
   `npm start`

# Comandos:

### 😂 !s memes e !s meme

Com esse comando você consegue criar qualquer meme que você deseja facilmente. Para listar os memes disponíveis, use "!s memes". Observação: Só são listados os 6 memes mais populares da plataforma, para ver todos os memes disponíveis, acesse o site linkado no final da mensagem:

Passo a passo de como criar:

1. Escolha o meme que você deseja criar e colete o ID desse meme
2. Preencha os campos de textos necessários
3. Se divirta com o seu novo meme 🥳🎉

### 📦 !s rastreio

Com esse comando você consegue rastrear facilmente qualquer encomenda entregue pelos correios. 🚶

### 🤑 !s cotacao

Com esse comando, você descobre a cotação das principais moedas atuais em Reais. São listados: O Dólar (americano e canadense), Euro e Bitcoin.

### 🤒 !s covid

Com esse comando, você consegue algumas informações (bem resumidas) dos números do covid-19 no Brasil. Nele é listado: O número de casos confirmados, O número de mortos e O número de casos recuperados

### 🎥 !s shrek

Este é, na minha opnião, o melhor de todos os comandos!!! Digite esse comando e receba um GIF do filme 'Shrek' INTEIRO. Bom filme 🤪🍿.

# Outras funcionalidades

### ⏰ Notificações automáticas de Stream na Twitch.

Para configurar os dados da stream, verifique o arquivo [config.json](./config.json). Para configurar as chaves da API da Twitch, configure no arquivo [.env](./.env.exemple)

# Observações

1. É necessário configurar as keys do Discord, Twitch e Imgflip no arquivo [.env](./.env.exemple).
2. A key da Twitch é necessária para acessar as informações das lives. Para consegui-las, acesse o [portal de desenvolvedor](https://dev.twitch.tv/console/apps) da Twitch
3. É necessário o usuário e senha de alguma conta no ImgFlip para gerar os memes.
