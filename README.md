# API construída como projeto full stack para gestão de um site de venda de veículos

Documentação

# Rota para documentação:

A documentação encontra-se mp endpoint: /documentation

Configuração - Siga os passos abaixo para configurar o ambiente de desenvolvimento e começar a usar a API:

# Tecnologias e bibliotecas:

- node
- express
- typeScript
- typeORM
- reflect-metadata
- bcryptjs
- dotenv
- express-async-errors
- jsonwebtoken
- pg
- ts-node/ts-node-dev
- zod

# Instalação

Para inciar este projeto, é necessário instalar as dependências requeridas. Portanto, utilize o comando abaixo no terminal na raiz do projeto:

- caso use npm
  npm run i

- caso use yarn
  yarn

# Conectar ao banco de dados

Instalada as dependências, crie e se conecte a um banco de dados através do arquivo .env.

PORT=application_run_port
DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
EXPIRES_IN=<expiration_time>
SECRET_KEY=<secret_key>

# Rodar migrações.

- caso use npm
  npm run typeorm migration:run -d src/data-source.ts

- caso use yarn
  yarn typeorm migration:run -d src/data-source.ts

# Iniciar o servidor

Feita a conexão com o banco de dados, inicie o servidor utilizando o comando abaixo.

- caso use npm
  npm run dev

- caso use yarn
  yarn dev
