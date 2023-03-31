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
  rectLight.position.set(1, 2, 1);
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
  const loader = new GLTFLoader();
  loader.load('../../model/scene.gltf', function (gltf) {
    scene.add(gltf.scene);
    renderer.render(scene, camera);

    function animate() {
      requestAnimationFrame(animate);
      gltf.scene.rotation.y += 0.005;
      renderer.render(scene, camera);
    }
    animate();
  });


  const skyMaterualArray = []
  const texture_ft = new THREE.TextureLoader().load('../static/ex-12/bay_ft.jpg');
  const texture_bk = new THREE.TextureLoader().load('../static/ex-12/bay_bk.jpg');
  const texture_up = new THREE.TextureLoader().load('../static/ex-12/bay_up.jpg');
  const texture_dn = new THREE.TextureLoader().load('../static/ex-12/bay_dn.jpg');
  const texture_rt = new THREE.TextureLoader().load('../static/ex-12/bay_rt.jpg');
  const texture_lf = new THREE.TextureLoader().load('../static/ex-12/bay_lf.jpg');
  skyMaterualArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_ft,
    })
  )
  skyMaterualArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_bk,
    })
  )
  skyMaterualArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_up,
    })
  )
  skyMaterualArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_dn,
    })
  )
  skyMaterualArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_rt,
    })
  )
  skyMaterualArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_lf,
    })
  )

  // 반복문
  for (let i = 0; i < 6; i++) {
    skyMaterualArray[i].side = THREE.BackSide
  }

  const skyGeometry = new THREE.BoxGeometry(500, 500, 500);
  const sky = new THREE.Mesh(skyGeometry, skyMaterualArray);
  scene.add(sky);

  // 마우스 움직임
  function animate() {
    requestAnimationFrame(animate);
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
