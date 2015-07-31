#!/bin/bash
set -e
npm run build
pm2 start index.js --no-daemon
