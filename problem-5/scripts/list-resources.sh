#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=./common.sh
source "$SCRIPT_DIR/common.sh"

print_section "List resources with filters"

curl -sS "$BASE_URL/resources?category=device&isActive=true&minPrice=100&tag=portable&limit=10&offset=0"
printf '\n'
