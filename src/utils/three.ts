import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
class Three {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  control: THREE.OrbitControls;
  renderer: THREE.WebGLRenderer;
  constructor(element: HTMLElement) {
    this.scene = this.initScene();
    this.camera = this.initCamera(element);
    this.renderer = this.initRenderer(element);
    this.control = this.initControl();
    this.animate();
  }
  initScene(): THREE.Scene {
    const scene = new THREE.Scene();
    return scene;
  }
  initCamera(element): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(
      20,
      element.offsetWidth / element.offsetHeight,
      0.1,
      5 * 1000
    );
    camera.position.set(0, 0, 3);
    return camera;
  }
  initRenderer(element): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor("#000000");
    renderer.shadowMap.enabled = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setSize(element.offsetWidth, element.offsetHeight);
    element.appendChild(renderer.domElement);
    return renderer;
  }
  initControl(): THREE.OrbitControls {
    const control = new OrbitControls(this.camera, this.renderer.domElement);
    return control;
  }
  initAxesHelper() {
    const axesHelper = new THREE.AxesHelper(5 * 1000);
    this.scene.add(axesHelper);
  }
  initDemo() {
    var geometry = new THREE.BoxGeometry(2, 2, 1);
    var meterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, meterial);
    this.scene.add(cube);
  }
  animate() {
    requestAnimationFrame(() => this.animate());
    this.control.update();
    this.renderer.render(this.scene, this.camera);
  }
}

export default Three;
