#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=./common.sh
source "$SCRIPT_DIR/common.sh"

resource_id="$(read_resource_id)"

print_section "Get resource details"

curl -sS "$BASE_URL/resources/$resource_id"
printf '\n'
