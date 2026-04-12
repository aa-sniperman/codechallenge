#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=./common.sh
source "$SCRIPT_DIR/common.sh"

resource_id="$(read_resource_id)"

print_section "Update resource"

curl -sS -X PUT "$BASE_URL/resources/$resource_id" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Portable Speaker Pro",
    "status": "archived",
    "price": 129.99,
    "rating": 5,
    "tags": ["portable", "audio", "premium"],
    "metadata": {
      "color": "silver",
      "originCountry": "Japan",
      "featured": false
    }
  }'
printf '\n'
