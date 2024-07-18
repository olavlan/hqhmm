import Delatin from "./script/delatin.js";

export default class HeightmapMesh {
  async init(imageUrl, relativeDisplacement = 0.1) {
    const { width, height, greyValues } = await this.extractHeightmapData(
      imageUrl
    );
    const min = greyValues.min;
    const max = greyValues.max;

    const range = max - min;
    const displacement = width * relativeDisplacement;
    const scale = displacement / range;

    const hs = new Float64Array(width * height); //height values
    for (let i = 0; i < hs.length; i++) {
      hs[i] = (greyValues[i] - min) * scale;
    }

    this.heightValues = hs;
    this.width = width;
    this.height = height;
    this.mesher = new Delatin(this.heightValues, this.width, this.height);
  }

  async extractHeightmapData(imageUrl) {
    const img = new Image();
    img.src = imageUrl;
    await img.decode();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const imgd = ctx.getImageData(0, 0, img.width, img.height);
    const data = imgd.data;

    const gs = new Float64Array(img.width * img.height); //grey values
    gs.min = data[0];
    gs.max = data[0];
    for (let i = 0; i < gs.length; i++) {
      let v = data[4 * i];
      gs[i] = v;
      if (v < gs.min) {
        gs.min = v;
      } else if (v > gs.max) {
        gs.max = v;
      }
    }

    return { width: img.width, height: img.height, greyValues: gs };
  }

  getVertices() {
    const n = this.mesher.coords.length / 2;
    const vertices = [];
    vertices.length = n;
    for (let i = 0; i < n; i++) {
      vertices[i] = this.getVertex(i);
    }
    return vertices;
  }

  getVertex(i) {
    let x = this.mesher.coords[2 * i];
    let y = this.mesher.coords[2 * i + 1];
    let z = this.mesher.heightAt(x, y);
    return [x, y, z];
  }

  async getThreeData() {
    const n = this.mesher.coords.length / 2; //number of vertices
    const vertices = new Float32Array(n * 3);
    const faces = this.mesher.triangles;

    for (let i = 0; i < n; i++) {
      let { x, y, z } = get_vertex(i);
      vertices[3 * i] = x;
      vertices[3 * i + 1] = y;
      vertices[3 * i + 2] = z;
    }

    return { vertices, faces };
  }
}
