#!/usr/bin/env bash
set -euo pipefail

# Script to build presentation from JSON model or prompt
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
cd "$DIR"

if [ $# -eq 0 ]; then
  echo "Usage: ./build-presentation.sh <path/to/deck.json> [output-dir]"
  echo "   or: ./build-presentation.sh --prompt \"Create a 15-slide presentation on...\""
  exit 1
fi

if [[ "$1" == "--prompt" || "$1" == "-p" ]]; then
  npx tsx src/cli.ts --prompt "$2" "${@:3}"
else
  INPUT_FILE="$1"
  OUTPUT_DIR="${2:-output}"
  npx tsx src/cli.ts --file "$INPUT_FILE" --output "$OUTPUT_DIR"
fi
