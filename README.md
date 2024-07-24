# High-Quality Heightmap Meshing

A webapp that helps transform heightmaps (as image files) to high quality triangular meshes. Uses [delatin](https://github.com/mapbox/delatin) or [hmm](https://github.com/fogleman/hmm).

## Easy installation

1. Install Docker Desktop: https://www.docker.com/products/docker-desktop/
2. Open Docker and search for _olavlan/hqhmm_ in the top search bar. Click _Pull_ on the first result. <details>
   <summary>Screenshot</summary>
   <img src="public/docker-search.png" width="600" alt="Docker search">
   </details>

3. Go to the _Images_ tab. On the row that says _olavlan/hqhmm_, click ▶. <details>
   <summary>Screenshot</summary>
   <img src="public/docker-image.png" width="600" alt="Docker image">
   </details>

4. Expand _Optional settings_, write _0_ in the field _Ports_, and click _Run_.<details>
   <summary>Screenshot</summary>
   <img src="public/docker-run.png" width="600" alt="Docker run">
   </details>

5. Click on <img src="public/arrow-up-right-from-square-solid.svg" style="vertical-align: text-bottom; height:1em;"> to open the app in your browser. <details>
   <summary>Screenshot</summary>
   <img src="public/docker-open.png" width="600" alt="Docker open">
   </details>

6. To update the app, go to the *Images* tab, find the row that says _olavlan/hqhmm_, click on <img src="public/ellipsis-vertical-solid.svg" style="vertical-align: text-bottom; height:1em;"> to show more options, and click *Pull*. <details>
   <summary>Screenshot</summary>
   <img src="public/docker-update.png" width="600" alt="Docker open">
   </details>

## About Docker

* Docker will run in the background even if you close the dashboard. Look for the  <img src="public/docker-brands-solid.svg" style="height:1em;"> icon in your taskbar to reopen the dashboard or quit Docker completely.
* Go to the *Containers* tab to verify that the webapp is still running. If not, you can restart it by clicking ▶. <details>
   <summary>Screenshot</summary>
   <img src="public/docker-restart.png" width="600" alt="Docker open">
   </details>
* An *image* is created when you click *Pull* and a *container* is created when you click *Run*. 
* To update to the newest release of the app, delete previous containers and images of the app, and repeat steps 2-5. 
