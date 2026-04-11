#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=./common.sh
source "$SCRIPT_DIR/common.sh"

print_section "Create resource"

response="$(curl -sS -X POST "$BASE_URL/resources" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Portable Speaker",
    "category": "device",
    "status": "published",
    "price": 149.99,
    "rating": 4,
    "isActive": true,
    "tags": ["portable", "audio"],
    "metadata": {
      "color": "black",
      "originCountry": "Japan",
      "featured": true
    }
  }')"

printf '%s\n' "$response"

resource_id="$(printf '%s' "$response" | node -e 'let data="";process.stdin.on("data",chunk=>data+=chunk);process.stdin.on("end",()=>{const parsed=JSON.parse(data);if(!parsed.id){process.exit(1)}process.stdout.write(parsed.id);});')"
printf '%s\n' "$resource_id" > "$RESOURCE_ID_FILE"

echo "Saved resource id to $RESOURCE_ID_FILE"
