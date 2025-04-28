#!/bin/sh

npm run build && \
	npm install --prefix output --save-dev http-server && \
	output/node_modules/http-server/bin/http-server -p 8000 ./output
