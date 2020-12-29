#!/bin/bash
echo "Building..."
nvm use 12 
lerna bootstrap || exit 0
cd packages/events-monitoring
yarn
cd -
cd packages/events-monitoring-front
yarn
yarn run dev

