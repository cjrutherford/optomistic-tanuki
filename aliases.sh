export DOCKER_COMPOSE_FILE="$(pwd)/docker-compose.dev.yaml"
export DOCKER_HUB_PREFIX=cjrutherford
export BASE_IMAGE_TAG=development

alias dcd="docker compose -f ${DOCKER_COMPOSE_FILE}"

dcd-reload() {
  dcd down -v --remove-orphans
  docker system prune -f
  dcd pull
  DOCKER_HUB_PREFIX=${DOCKER_HUB_PREFIX} COMPOSE_BAKE=true dcd build build_base
  DOCKER_HUB_PREFIX=${DOCKER_HUB_PREFIX} BASE_IMAGE_TAG=${BASE_IMAGE_TAG} COMPOSE_BAKE=true dcd build
  dcd up -d
}

build_push_images() {
  local docker_hub_prefix="${1:-$DOCKER_HUB_PREFIX}"
  local base_image_tag="${2:-$BASE_IMAGE_TAG}"

  for service in authentication social profile client-interface gateway tasks; do
    docker build --build-arg DOCKER_HUB_PREFIX="${docker_hub_prefix}" --build-arg BASE_IMAGE_TAG="${base_image_tag}" -f ./apps/${service}/dockerfile -t "${docker_hub_prefix}/optomistic_tanuki_${service}:${base_image_tag}" . && docker push "${docker_hub_prefix}/optomistic_tanuki_${service}:${base_image_tag}"
  done
}
alias pgconnect="PGPASSWORD=postgres psql -h localhost -U postgres"
