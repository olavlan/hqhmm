import * as THREE from "./script/three.module.min.js";
import { OrbitControls } from "./script/OrbitControls.js";
import HeightmapMesh from "./hmm.js";

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

  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const material = new THREE.MeshNormalMaterial();

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
  renderer.render(scene, camera);
}

export async function showMeshData(imageUrl) {
  const hmm = new HeightmapMesh();
  await hmm.init(imageUrl);
  hmm.mesher.run(10);
  const vertices = hmm.getVertices();
  const paragraph = document.createElement("p");
  paragraph.innerHTML = vertices
    .map((subList) => `(${subList.join(", ")})`)
    .join("<br>");
  document.querySelector("main").appendChild(paragraph);
}

window.showMeshData = showMeshData;
