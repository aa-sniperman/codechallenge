#!/usr/bin/env bash

set -euo pipefail

BASE_URL="${BASE_URL:-http://localhost:3000}"
RESOURCE_ID_FILE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/.resource-id"

print_section() {
  printf '\n== %s ==\n' "$1"
}

require_resource_id() {
  if [ ! -f "$RESOURCE_ID_FILE" ]; then
    echo "Missing resource id file: $RESOURCE_ID_FILE"
    echo "Run create-resource.sh first."
    exit 1
  fi
}

read_resource_id() {
  require_resource_id
  tr -d '\n' < "$RESOURCE_ID_FILE"
}
