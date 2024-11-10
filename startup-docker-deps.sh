#!/bin/bash
docker stop ot-pg 
docker rm ot-pg
docker run -d --name ot-pg\
    -e POSTGRES_USER=postgres \
    -e POSTGRES_PASSWORD=postgres \
    -p 5432:5432 \
    -d postgres:latest

export POSTGRES_PASSWORD=postgres
export POSTGRES_USER=postgres
export PG_PASSWORD=postgres
psql -U postgres -h localhost -W -c "CREATE DATABASE ot_authentication;"
psql -U postgres -h localhost -W -c "CREATE DATABASE ot_profile;"
psql -U postgres -h localhost -W -c "CREATE DATABASE ot_social;"
psql -U postgres -h localhost -W -c "CREATE DATABASE ot_tasks;"

docker stop ot-rmq
docker rm ot-rmq
docker run -d --name ot-rmq \
    -p 5672:5672 \
    -p 15672:15672 \
    rabbitmq

for app in authentication profile; do
    cd apps/${app} 
    node -r ts-node/register ../../node_modules/typeorm/cli.js -d ./src/app/staticDatabase.ts migration:run
    cd -
done
