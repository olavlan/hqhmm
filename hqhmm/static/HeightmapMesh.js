import Delatin from "./script/delatin.js";

export default class HeightmapMesh {
  async init(imageUrl, relativeDisplacement = 0.05, whiteAsBase = false) {
    this.imageUrl = imageUrl;
    const { width, height, greyValues } = await this.extractHeightmapData();

    const min = greyValues.min;
    const max = greyValues.max;
    const range = max - min;
    const displacement = width * relativeDisplacement;
    const scale = displacement / range;

    function greyToHeightBlackBase(v) {
      return (v - min) * scale;
    }

    function greyToHeightWhiteBase(v) {
      return Math.abs(v - min - max) * scale;
    }

    let greyToHeigth;
    if (whiteAsBase) {
      greyToHeigth = greyToHeightWhiteBase;
    } else {
      greyToHeigth = greyToHeightBlackBase;
    }

    const hs = new Float64Array(width * height); //height values
    for (let i = 0; i < hs.length; i++) {
      hs[i] = greyToHeigth(greyValues[i]);
    }

    this.heightValues = hs;
    this.width = width;
    this.height = height;
    this.mesher = new Delatin(this.heightValues, this.width, this.height);
  }

  async extractHeightmapData() {
    const img = new Image();
    img.src = this.imageUrl;
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
    return { x, y, z };
  }

  getThreeData() {
    const n = this.mesher.coords.length / 2; //number of vertices
    const vertices = new Float32Array(n * 3);
    const faces = this.mesher.triangles;

    for (let i = 0; i < n; i++) {
      let { x, y, z } = this.getVertex(i);
      vertices[3 * i] = x;
      vertices[3 * i + 1] = y;
      vertices[3 * i + 2] = z;
    }

    return { vertices, faces };
  }
}
