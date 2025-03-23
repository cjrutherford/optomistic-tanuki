export DOCKER_COMPOSE_FILE="$(pwd)/docker-compose.dev.yaml"

alias dcd="docker compose -f ${DOCKER_COMPOSE_FILE}"

dcd-reload() {
  dcd down -v --remove-orphans
  docker system prune -f
  dcd pull
  COMPOSE_BAKE=true dcd build build_base
  COMPOSE_BAKE=true dcd build
  dcd up -d 
}
alias pgconnect="PGPASSWORD=postgres psql -h localhost -U postgres"