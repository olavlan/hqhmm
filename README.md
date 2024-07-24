# High-Quality Heightmap Meshing

A Flask app that helps transform heightmaps (as image files) to high quality triangular meshes. Uses [delatin](https://github.com/mapbox/delatin) or [hmm](https://github.com/fogleman/hmm).

## Easy installation

1. Install Docker Desktop: https://www.docker.com/products/docker-desktop/
2. Open Docker and search for _olavlan/hqhmm_ in the top search bar. Click _Pull_:

<img src="public/docker-search.png" width="600" alt="Docker search">

3. Go to _Images_ and click ▶ on the row that says _olavlan/hqhmm_:

<img src="public/docker-image.png" width="600" alt="Docker image">

4. Expand _Optional settings_, write _0_ in the field _Ports_, and click _Run_:

<img src="public/docker-run.png" width="600" alt="Docker run">

5. Click on <img src="public/arrow-up-right-from-square-solid.svg" style="height:1em;"> to open the app:

<img src="public/docker-open.png" width="600" alt="Docker open">

To get the newest release of the app, repeat steps 2-4.
