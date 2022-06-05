import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { ref, onMounted, Ref } from "vue";
export function useThree(element: Ref<HTMLElement>) {
  const scene = ref<THREE.Scene | undefined>();
  const camera = ref<THREE.PerspectiveCamera | undefined>();
  const renderer = ref<THREE.WebGLRenderer | undefined>();
  const control = ref<OrbitControls | undefined>();
  const axesHelper = ref<THREE.AxesHelper | undefined>();
  onMounted(() => {
    scene.value = new THREE.Scene();
    camera.value = initCamera(element.value);
    renderer.value = initRenderer(element.value);
    control.value = initControl(camera.value, renderer.value);
    axesHelper.value = new THREE.AxesHelper(5 * 1000);
    const render = () => {
      renderer.value.render(scene.value, camera.value);
      requestAnimationFrame(() => render());
    };
    render();
  });
  return {
    scene,
    camera,
    renderer,
    control,
    axesHelper,
  };
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
