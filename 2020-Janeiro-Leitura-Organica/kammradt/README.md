## Olá amigos :wave: 

:princess: Autora: [Gabriela de Almeida Riul](https://www.linkedin.com/in/gabriela-de-almeida-riul-2a1321184/)
> Com a ajudinha de :person_with_blond_hair: [Vinicius Kammradt](https://github.com/kammradt)

[Solução desenvolvida](https://leitura-organica.now.sh/): https://leitura-organica.now.sh/ 

Esse projeto deu início a uma história muito legal, que está detalhada [aqui](https://github.com/kammradt-archives/tutorial-express-mongodb), mas vou resumir para vocês:

Gabriela é uma estudante de Engenharia Elétrica, participante de um [grupo](http://www.peteel.ufsc.br/) dedicado a estudos além dos meios acadêmicos e estava interessada em aprender sobre programação (Javascript, especificamente).  

Com esse objetivo em mente, decidiu fazer um estágio com duração de 2 meses na [Informant](https://informant.com.br/). Foi-se iniciado o contato com Javascript, e logo após alguns tutoriais decidimos encarar um desafio maior e acabamos chegando aqui no Desafio333.  

> O projeto, ideias de implementação e a própria codificação **foi desenvolvido pela Gabriela**, eu, Vinicius, procurei atuar como *instrutor/ajudante* nesse processo.

### :sparkles: Tecnologias que aprendemos durante esse estágio :sparkles:
- Começamos aprendendo o básico de HMTL, CSS e JS; 
- Partimos para algumas novidades do ES6;
- Então, foi-se iniciado o front-end com Vue.js;
- A API, responsável pelo processamento, envio de e-mails e administração do site foi escrita em Express.js junto com MongoDB;
> Durante o estágio, escrevi um tutorial para orientar o desenvolvimento do desafio, ele está [aqui](https://github.com/kammradt-archives/tutorial-express-mongodb)
- Para ajudar na estilização, utilizamos Styled Components do Vuetify;
- Para o envio de E-mails, efetuamos uma integração com o SendGrid;
- Deploy da API efetuada no HEROKU utilizando o Free Tier;
- Deploy do front-end pela plataforma Zeit;

### :star: Nossa solução :star:

Antes de mostrar a aplicação, gostaria de enfatizar que nos atentamos ao detalhe de cumprir todos os requisitos solicitados:
- :white_check_mark: Enviamos o PPM por e-mail  
- :white_check_mark: Refazer o teste  
- :white_check_mark: Compartilhar sua velocidade de leitura (Facebook, Twitter e - LinkedIn)  
- :white_check_mark: Enviar o resultado para seu e-mail ao finalizar

#### E que tal um :sparkles: *tchan* :sparkles: a mais?

Estávamos bem animados para começar o projeto e pensamos: *Por que não colocar algumas coisinhas a mais?*  
Visto isso:
- :white_check_mark: Criamos um painel de administrador para nosso amigo do [Leitura Orgânica](https://leituraorganica.com.br/)
- :white_check_mark: O site conta com textos aleatórios para os testes
- :white_check_mark: O administrador pode adicionar novos textos
- :white_check_mark: O administrador pode adicionar editar textos existentes
- :white_check_mark: O administrador pode deletar textos existentes
- :white_check_mark: O administrador tem acesso aos dados dos e-mails enviados
- :white_check_mark: O administrador tem acesso aos histórico de envio de e-mails
- :white_check_mark: O administrador pode tentar re-enviar um e-mail caso algum problema tenha ocorrido
- :white_check_mark: O site conta com sistema de autenticação por JWT
- :white_check_mark: O site pode comportar o cadastro de possíveis alunos caso seja desejado (isso não foi implementado mas está com a base técnica pronta), pois já existem end-points para cadastro (bloqueados até o momento)
