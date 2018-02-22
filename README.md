## Esta documentação está sendo aprimorada

### Subindo em ambiente de desenvolvimento

Instale os helpers
> npm install -g sequelize-cli nodemon dotenv

Instale as dependências
> npm install

Efetue as migrations do Sequelize
> sequelize db:migrate --env

Inicie a aplicação
> npm run start:dev

### Subindo em ambiente de produção (com docker)

Crie o banco de dados

    $ createdb -h localhost -U postgres bot_donm_prod

Configure os arquivos:

    $ cp example.env .env 
    $ $EDITOR .env
    $ $EDITOR app/server/schema/config/config.json
  
Construa o container

    $ ./build-container.sh

Inicie o container

    $ cp sample-run-container.sh run-container.sh
    $ $EDITOR run-container.sh
    $ ./run-container.sh

### Agent 

O Agente e seus entidades e intenções de diálogo encontra-se no diretório /agent
