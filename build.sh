#!/bin/bash
mkdir -p hqhmm/static/style
mkdir -p hqhmm/static/script
mkdir -p hqhmm/static/style/fontawesome/webfonts
mkdir -p hqhmm/static/style/fontawesome/css

cp -r node_modules/htmx.org/dist/htmx.js hqhmm/static/script/htmx.js
cp -r node_modules/delatin/index.js hqhmm/static/script/delatin.js
cp -r node_modules/three/build/three.module.min.js hqhmm/static/script/three.module.min.js
cp -r node_modules/three/examples/jsm/controls/OrbitControls.js hqhmm/static/script/OrbitControls.js
cp -r node_modules/three/examples/jsm/exporters/STLExporter.js hqhmm/static/script/STLExporter.js

cp -r node_modules/@fortawesome/fontawesome-free/css hqhmm/static/style/fontawesome/
cp -r node_modules/@fortawesome/fontawesome-free/webfonts hqhmm/static/style/fontawesome/

cp -r node_modules/bulma/css/bulma.css hqhmm/static/style/bulma.css
cp -r node_modules/bulma/css/bulma.css.map hqhmm/static/style/bulma.css.map