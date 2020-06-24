# Sozua's bot

**Tipo de bot:** Auxiliar

**Prefixo:** "!s (comando)"

## Comandos:

- !s covid - Mostra os principais números do covid no Brasil
- !s cotacao - Mostra a cotação das principais moedas em Real
- !s shrek - Retorna um gif do filme inteiro de Shrek (1 minuto de cooldown para executar o comando)
- !s rastreio (codigo) - Rastreia uma encomenda do Correios

## Outras funções

### Notificações automáticas de Stream na Twitch.

Para configurar os dados da stream, verifique o arquivo [config.json](./config.json). Para configurar as chaves da API da Twitch, configure no arquivo [.env](./.env.exemple)

## Observações

1. É necessário configurar as keys do Discord, Twitch e Imgflip no arquivo [.env](./.env.exemple).
2. A key da Twitch é necessária para acessar as informações das lives. Para consegui-las, acesse o [portal de desenvolvedor](https://dev.twitch.tv/console/apps) da Twitch
3. É necessário o usuário e senha de alguma conta no ImgFlip para gerar os memes.
