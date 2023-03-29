import * as THREE from 'three'
import { WEBGL } from './webgl'
import {
  OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

if (WEBGL.isWebGLAvailable()) {

  // 장면
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  // 카메라
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(5, 2, 2);
  camera.lookAt(0, 0, 0);

  // 랜더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });

  // 빛
  const ambientLight = new THREE.AmbientLight(0xffffff, 2);
  scene.add(ambientLight);

  const rectLight = new THREE.RectAreaLight(0xffffff, 5, 5, 1.5);
  rectLight.position.set(0, 2, 1);
  rectLight.lookAt(0, 0, 0);
  scene.add(rectLight);


  // OrbitControls 추가
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 1;
  controls.maxDistance = 10;
  controls.update();

  // 사이즈 조정 
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 도형 추가
  const car = new GLTFLoader();
  car.load('../../model/scene.gltf', function (gltf) {
    scene.add(gltf.scene);
    renderer.render(scene, camera);
  });





  // 마우스 움직임
  function animate() {
    requestAnimationFrame(animate);
    // car.rotation.y += 0.02;
    controls.update();
    renderer.render(scene, camera);


  }
  animate();

  // 반응형 처리
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onWindowResize);

} else {
  var warning = WEBGL.getWebGLErrorMessage()
  document.body.appendChild(warning)
}
