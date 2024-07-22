#!/bin/bash
mkdir -p app/static/dist
mkdir -p app/static/dist/fontawesome/webfonts
mkdir -p app/static/dist/fontawesome/css

cp -r node_modules/htmx.org/dist/htmx.js app/static/dist/htmx.js
cp -r node_modules/delatin/index.js app/static/dist/delatin.js
cp -r node_modules/three/build/three.module.min.js app/static/dist/three.module.min.js
cp -r node_modules/three/examples/jsm/controls/OrbitControls.js app/static/dist/OrbitControls.js
cp -r node_modules/three/examples/jsm/exporters/STLExporter.js app/static/dist/STLExporter.js

cp -r node_modules/@fortawesome/fontawesome-free/css app/static/dist/fontawesome/
cp -r node_modules/@fortawesome/fontawesome-free/webfonts app/static/dist/fontawesome/

cp -r node_modules/bulma/css/bulma.css app/static/dist/bulma.css
cp -r node_modules/bulma/css/bulma.css.map app/static/dist/bulma.css.map