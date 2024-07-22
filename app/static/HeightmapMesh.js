import Delatin from "delatin";

export default class HeightmapMesh {
  async init(imageUrl, relativeDisplacement = 0.05, inverted = false) {
    this.imageUrl = imageUrl;
    this.relativeDisplacement = relativeDisplacement;
    this.inverted = inverted;
    [this.greyValues, this.width, this.height] =
      await this.extractHeightmapData();
    this.heightValues = this.greyToHeightValues();
    this.mesher = new Delatin(this.heightValues, this.width, this.height);
  }

  greyToHeightValues() {
    const min = this.greyValues.min;
    const max = this.greyValues.max;
    const range = max - min;
    const displacement = this.width * this.relativeDisplacement;
    const scale = displacement / range;

    function greyToHeightBlackBase(v) {
      return (v - min) * scale;
    }

    function greyToHeightWhiteBase(v) {
      return greyToHeightBlackBase(Math.abs(v - min - max));
    }

    let greyToHeigth;
    if (this.inverted) {
      greyToHeigth = greyToHeightWhiteBase;
    } else {
      greyToHeigth = greyToHeightBlackBase;
    }

    const hs = new Float64Array(this.getPixelCount()); //height values
    for (let i = 0; i < hs.length; i++) {
      hs[i] = greyToHeigth(this.greyValues[i]);
    }
    return hs;
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

    for (let i = 0; i < gs.length; i++) {
      gs[i] = data[4 * i];
    }

    gs.min = gs.reduce((a, b) => Math.min(a, b));
    gs.max = gs.reduce((a, b) => Math.max(a, b));

    return [gs, img.width, img.height];
  }

  getPixelCount() {
    return this.width * this.height;
  }

  getVertexCount() {
    return this.mesher.coords.length / 2;
  }

  getVertices() {
    const n = this.getVertexCount();
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
