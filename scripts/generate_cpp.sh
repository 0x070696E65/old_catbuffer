#!/bin/bash
set -e

rootDir="$(dirname $0)/.."

ARTIFACT_NAME="cpp-transaction-builders"
RELEASE_VERSION="$(head -n 1 ${rootDir}/version.txt)"
OPERATION="$1"
SNAPSHOT_VERSION="${RELEASE_VERSION}-SNAPSHOT"
CURRENT_VERSION="$SNAPSHOT_VERSION"
if [[ $OPERATION == "release" ]]; then
  CURRENT_VERSION="$RELEASE_VERSION"
fi

echo "Building C++ version $CURRENT_VERSION, operation $OPERATION"

mkdir -p "${rootDir}/build/cpp/${ARTIFACT_NAME}/src/"
python3 -m catbuffer_parser \
  --schema catbuffer-schemas/schemas/all.cats \
  --include catbuffer-schemas/schemas \
  --output "${rootDir}/build/cpp/${ARTIFACT_NAME}/src" \
  --generator cpp_builder \
  --copyright HEADER.inc
