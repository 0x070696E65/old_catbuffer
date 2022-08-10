#!/bin/bash
set -e

rootDir="$(dirname $0)/.."

ARTIFACT_NAME="Symbol.Builders"
RELEASE_VERSION="$(head -n 1 ${rootDir}/version.txt)"
OPERATION="$1"
SNAPSHOT_VERSION="${RELEASE_VERSION}-SNAPSHOT"
CURRENT_VERSION="$SNAPSHOT_VERSION"
if [[ $OPERATION == "release" ]]; then
  CURRENT_VERSION="$RELEASE_VERSION"
fi

echo "Building C# version $CURRENT_VERSION, operation $OPERATION"

rm -rf "$rootDir/build/cs/$ARTIFACT_NAME"

dotnet new console -o "$rootDir/build/cs/$ARTIFACT_NAME" -n "$ARTIFACT_NAME" -f net5.0

mkdir -p "$rootDir/build/cs/$ARTIFACT_NAME/src/main/"
python3 -m catbuffer_parser \
  --schema catbuffer-schemas/schemas/all.cats \
  --include catbuffer-schemas/schemas \
  --output "$rootDir/build/cs/$ARTIFACT_NAME/src/main/" \
  --generator cs \
  --copyright HEADER.inc

if [[ $OPERATION == "release" ]]; then
  ARTIFACT_VERSION="${ARTIFACT_VERSION%$SNAPSHOT_PREFIX}"
fi

mkdir -p "$rootDir/build/cs/$ARTIFACT_NAME/src/test/"
mkdir -p "$rootDir/build/cs/$ARTIFACT_NAME/src/test/resources"
cp -r "$rootDir/test/vector" "$rootDir/build/cs/$ARTIFACT_NAME/src/test/resources"
cp "$rootDir/generators/cs/VectorTest.cs" "$rootDir/build/cs/$ARTIFACT_NAME/src/test/"