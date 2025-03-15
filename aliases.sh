export DOCKER_COMPOSE_FILE="$(pwd)/docker-compose.dev.yaml"

alias dcd="docker compose -f ${DOCKER_COMPOSE_FILE}"

dcd-reload() {
  dcd down -v --remove-orphans
  docker system prune -f
  dcd up -d --build
}
