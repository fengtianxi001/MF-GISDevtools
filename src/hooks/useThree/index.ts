import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { ref } from "vue";
export function useThree(element: HTMLElement) {
  const scene = new THREE.Scene();
  const camera = initCamera(element);
  const renderer = initRenderer(element);
  const control = initControl(camera, renderer);
  const axesHelper = new THREE.AxesHelper(5 * 1000);
  const render = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(() => render());
  };
  return {
    scene,
    camera,
    renderer,
    control,
    axesHelper,
  }
}

function initCamera(element: HTMLElement): THREE.PerspectiveCamera {
  const camera = new THREE.PerspectiveCamera(
    20,
    element.offsetWidth / element.offsetHeight,
    0.1,
    5 * 1000
  );
  return camera;
}
function initRenderer(element: HTMLElement): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor("#000000");
  renderer.shadowMap.enabled = true;
  renderer.setSize(element.offsetWidth, element.offsetHeight);
  renderer.localClippingEnabled = true;
  element.appendChild(renderer.domElement);
  return renderer;
}
function initControl(
  camera: THREE.PerspectiveCamera,
  CSSRender: THREE.WebGLRenderer
): OrbitControls {
  const control = new OrbitControls(camera, CSSRender.domElement);
  control.target = new THREE.Vector3(0, 0, 0);
  control.update();
  return control;
}
