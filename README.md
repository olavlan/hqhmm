# High-Quality Heightmap Meshing

A webapp that helps transform heightmaps (as image files) to high quality triangular meshes. Uses [delatin](https://github.com/mapbox/delatin) or [hmm](https://github.com/fogleman/hmm).

## Easy installation

1. Install Docker Desktop: https://www.docker.com/products/docker-desktop/
2. Open Docker and search for _olavlan/hqhmm_ in the top search bar. Click _Pull_ on the first result. <details>
   <summary>Screenshot</summary>
   <img src="public/docker-search.png" width="600" alt="Docker search">
   </details>

3. Go to the _Images_ tab. On the row that says _olavlan/hqhmm_, click  ▶. <details>
   <summary>Screenshot</summary>
   <img src="public/docker-image.png" width="600" alt="Docker image">
   </details>

4. Expand _Optional settings_, write _0_ in the field _Ports_, and click _Run_.<details>
   <summary>Screenshot</summary>
   <img src="public/docker-run.png" width="600" alt="Docker run">
   </details>

5. You can now open the app in your browser; go to the *Containers* tab, find the row that says _olavlan/hqhmm_, and click <img src="public/arrow-up-right-from-square-solid.svg" style="vertical-align: text-bottom; height:1em;">. <details>
   <summary>Screenshot</summary>
   <img src="public/docker-open.png" width="600" alt="Docker open">
   </details>

To update to the newest version of the app: 

1. Go to the *Images* tab, find the row that says _olavlan/hqhmm_, show more options, and click *Pull*. <details>
   <summary>Screenshot</summary>
   <img src="public/docker-update.png" width="600" alt="Docker open">
   </details>
2. Go to the *Containers* tab. If you have a running container of the app, show more options, and click *Restart*. If you don't have a running container, repeat steps 3-5 above. <details>
   <summary>Screenshot</summary>
   <img src="public/docker-restart-container.png.png" width="600" alt="Docker open">
   </details>

## About Docker

* Docker will run in the background even if you close the dashboard. Look for the  <img src="public/docker-brands-solid.svg" style="height:1em;"> icon in your taskbar to reopen the dashboard or quit Docker completely.