# High-Quality Heightmap Meshing

A Flask app that helps transform heightmaps (as image files) to high quality triangular meshes. Uses [delatin](https://github.com/mapbox/delatin) or [hmm](https://github.com/fogleman/hmm).

## Easy installation

1. Install Docker Desktop: https://www.docker.com/products/docker-desktop/
2. Open Docker and search for _olavlan/hqhmm_ in the top search bar. Click _Pull_ on the first result. <details>
   <summary>Screenshot</summary>
   <img src="public/docker-search.png" width="600" alt="Docker search">
   </details>

3. Go to the _Images_ tab. On the row that says _olavlan/hqhmm_, click click ▶. <details>
   <summary>Screenshot</summary>
   <img src="public/docker-image.png" width="600" alt="Docker image">
   </details>

4. Expand _Optional settings_, write _0_ in the field _Ports_, and click _Run_.<details>
   <summary>Screenshot</summary>
   <img src="public/docker-run.png" width="600" alt="Docker run">
   </details>

5. Click on <img src="public/arrow-up-right-from-square-solid.svg" style="height:1em;"> to open the app in your browser. <details>
   <summary>Screenshot</summary>
   <img src="public/docker-open.png" width="600" alt="Docker open">
   </details>

To get the newest release of the app, repeat steps 2-4.
