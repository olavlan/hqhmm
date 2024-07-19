import * as THREE from "three";
import { OrbitControls } from "./script/OrbitControls.js";
import HeightmapMesh from "HeightmapMesh";
import { STLExporter } from "./script/STLExporter.js";

let imageUrl = null;
let size = 0.1;

export async function showMesh(imageUrl) {
  // Create geometry and set index
  // const tin = await hmm(imageUrl);
  // const { vertices, faces } = getMeshVisualisationData(tin);
  // const geometry = new THREE.BufferGeometry();
  // geometry.setIndex(faces);
  // geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

  const width = window.innerWidth;
  const height = window.innerHeight;

  const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
  camera.position.z = 1;

  const scene = new THREE.Scene();

  const geometry = new THREE.BufferGeometry();
  const material = new THREE.MeshNormalMaterial();

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
  renderer.render(scene, camera);
}

function printVertices(hmm) {
  const vertices = hmm.getVertices();
  const paragraph = document.createElement("p");
  paragraph.innerHTML = vertices
    .map((subList) => `(${subList.join(", ")})`)
    .join("<br>");
  document.querySelector("main").appendChild(paragraph);
}

export async function createSTL() {
  const s = document.getElementById("size").value;
  size = Number(s) / 100;
  console.log(size);

  const hmm = new HeightmapMesh();
  console.log(imageUrl);
  await hmm.init(imageUrl, size, true);
  hmm.mesher.run(2);

  const { vertices, faces } = hmm.getThreeData();
  console.log(vertices);
  console.log(faces);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(faces);
  const mesh = new THREE.Mesh(geometry);

  // Export the mesh to STL
  const exporter = new STLExporter();
  const options = { binary: true };
  const stlString = exporter.parse(mesh, options);

  // Create a Blob from the STL string
  const blob = new Blob([stlString], { type: "text/plain" });

  // Create a download link
  const field = document.getElementById("download-link");
  const link = field.querySelector("a");
  link.href = URL.createObjectURL(blob);
  link.download = "mesh.stl";
  field.style.display = "block";
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

async function getInputFile(element) {
  const file = element.files[0];
  imageUrl = await readFileAsDataURL(file);
  console.log(imageUrl);
  element = document.querySelector(".file-label");
  element.textContent = file.name;
}

window.getInputFile = getInputFile;
window.createSTL = createSTL;
