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

for app in authentication profile social tasks; do
    cd apps/${app} 
    node -r ts-node/register ../../node_modules/typeorm/cli.js -d ./src/app/staticDatabase.ts migration:run
    cd -
done
