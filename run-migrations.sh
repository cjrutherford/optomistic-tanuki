#!/bin/bash

echo "Starting migrations"

for app in authentication profile social tasks; do
    echo "Running migrations for ${app}"
    cd /app/apps/${app}
    cat /app/apps/${app}/src/assets/config.yaml
    node -r ts-node/register ../../node_modules/typeorm/cli.js -d ./src/app/staticDatabase.ts migration:run
    wait
    echo "Migrations for ${app} done"
done

echo "All migrations done"