#!/bin/bash

# Check docker-compose command
if [ -x "$(command -v docker-compose)" ]; then
  dockercompose="docker-compose"
else
  dockercompose="docker compose"
fi

$dockercompose -f docker-compose.yml --env-file .env "$@"
