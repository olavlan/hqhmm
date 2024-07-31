#!/bin/bash
mkdir -p app/static/dist
mkdir -p app/static/dist/fontawesome/webfonts
mkdir -p app/static/dist/fontawesome/css

cp -r node_modules/htmx.org/dist/htmx.js app/static/dist/htmx.js

cp -r node_modules/@fortawesome/fontawesome-free/css app/static/dist/fontawesome/
cp -r node_modules/@fortawesome/fontawesome-free/webfonts app/static/dist/fontawesome/

cp -r node_modules/bulma/css/bulma.css app/static/dist/bulma.css
cp -r node_modules/bulma/css/bulma.css.map app/static/dist/bulma.css.map