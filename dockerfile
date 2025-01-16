FROM node:lts-bookworm-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

LABEL name="optomistic_tanuki"
LABEL version="1.0"
ENV NODE_ENV=production

COPY ./create-dbs.sh ./
COPY ./run-migrations.sh ./