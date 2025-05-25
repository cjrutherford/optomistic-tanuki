FROM node:lts-alpine
USER 1000:1000

WORKDIR /app

COPY package.json ./
COPY ./apps ./apps
COPY ./libs ./libs
COPY nx.json ./nx.json
COPY tsconfig.base.json ./tsconfig.base.json

RUN npm install

COPY . .

LABEL name="optomistic_tanuki"
LABEL version="1.0"
ENV NODE_ENV=production

COPY ./create-dbs.sh ./
COPY ./run-migrations.sh ./