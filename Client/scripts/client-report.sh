#!/bin/sh

set -eu

npm run concurrently -- -k \
    "npm run webpack-bundle-analyzer -- -p 8888 ./dist/en-US/stats.json" \
