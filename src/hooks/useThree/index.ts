import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { onMounted, shallowRef, Ref } from "vue";
export function useThree(element: Ref<HTMLElement | undefined>) {
  const scene = shallowRef<THREE.Scene>();
  const camera = shallowRef<THREE.PerspectiveCamera | undefined>();
  const control = shallowRef<THREE.OrbitControls | undefined>();
  const renderer = shallowRef<THREE.WebGLRenderer | undefined>();
  onMounted(() => {
    scene.value = initScene();
    camera.value = initCamera(element.value);
    renderer.value = initRenderer(element.value);
    control.value = initControl();
    const axesHelper = new THREE.AxesHelper(5 * 1000);
    scene.value.add(axesHelper);

    animate();
  });
  const initCamera = (element: HTMLElement) => {
    const fov = 20;
    const aspect = element.offsetWidth / element.offsetHeight;
    const near = 0.1;
    const far = 5 * 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 3);
    return camera;
  };
  const initScene = () => {
    const scene = new THREE.Scene();
    return scene;
  };
  const initRenderer = (element) => {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor("#000000");
    renderer.shadowMap.enabled = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setSize(element.offsetWidth, element.offsetHeight);
    element.appendChild(renderer.domElement);
    return renderer;
  };
  const initControl = () => {
    const control = new OrbitControls(camera.value, renderer.value.domElement);
    return control;
  };
  const animate = () => {
    requestAnimationFrame(() => animate());
    control.value.update();
    renderer.value.render(scene.value, camera.value);
  };
  return {
    scene,
    camera,
    control,
    renderer,
  };
}
