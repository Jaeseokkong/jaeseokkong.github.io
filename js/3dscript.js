// Three.js & 3D Character
import * as THREE from 'https://cdn.skypack.dev/three@0.120.0/build/three.module.js';
import { OBJLoader } from 'https://cdn.skypack.dev/three@0.120.0/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'https://cdn.skypack.dev/three@0.120.0/examples/jsm/loaders/MTLLoader.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.120.0/examples/jsm/controls/OrbitControls.js';

// HTML에서 .featured-charactor 클래스를 가진 요소를 선택
const featuredCharactorElement = document.querySelector('.featured-charactor');

// Three.js Scene, Camera, Renderer 생성
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

// Renderer 설정
updateRendererSize(); // 초기에 설정

function updateRendererSize() {
    const rect = featuredCharactorElement.getBoundingClientRect(); // 외부 요소의 크기를 가져옴
    console.log(rect)
    const width = rect.width;
    const height = rect.height;

    renderer.setSize(width, width);
}

window.addEventListener('resize', updateRendererSize);

renderer.setClearColor(0x000000, 0.0);
renderer.domElement.tabIndex = 0;
renderer.domElement.style.outline = 'none'; // 포커스된 상태에서의 테두리 제거
featuredCharactorElement.appendChild(renderer.domElement);

let model;

// MTLLoader와 OBJLoader 생성
const mtlLoader = new MTLLoader();
const objLoader = new OBJLoader();

const mtlFilePath = "../charactor.mtl";
const textureFilePath = "../charactor.png";

// MTLLoader를 사용하여 3D 모델 로드
mtlLoader.load(mtlFilePath, (materials) => {
    materials.preload();
    objLoader.setMaterials(materials);

    const objFilePath = "../charactor.obj";
    
    // OBJLoader를 사용하여 3D 모델 파일 로드
    objLoader.load(objFilePath, (object) => {
        model = object;

         // 초기 회전 각도 및 위치 설정
         model.rotation.x = Math.PI / 8; 
         model.rotation.y = -Math.PI / 12; 
         model.position.y -= 2; // 아래로 2 단위 이동

        // Scene에 모델 추가
        scene.add(model);
    });
});

// OrbitControls 추가
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 댐핑 활성화
controls.dampingFactor = 0.1;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Camera 위치 설정
camera.position.z = 8;

// 조명 설정
const ambientLight = new THREE.AmbientLight(0x999999, 0.9); // 연한 회색 조명
scene.add(ambientLight);

const blueLight = new THREE.PointLight(0x0000ff, 6, 100);
blueLight.position.set(0, 10, 0);
scene.add(blueLight);

const directionalLight = new THREE.DirectionalLight(0xff6699, 0.2); // 분홍색 조명
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true; // 그림자 효과 활성화
scene.add(directionalLight);

// 그림자 매개변수 설정
directionalLight.shadow.mapSize.width = 512; // 그림자 텍스처 해상도
directionalLight.shadow.mapSize.height = 512;
directionalLight.shadow.camera.near = 0.5; // 카메라와의 최소 거리
directionalLight.shadow.camera.far = 50; // 카메라와의 최대 거리


// 애니메이션 함수
const animate = () => {
    requestAnimationFrame(animate);

    // 모델의 회전 로직
    if (model) {
        model.rotation.y -= 0.01; // 회전 속도로 조절
    }

    // OrbitControls 업데이트 및 렌더링
    controls.update();
    renderer.render(scene, camera);
};

// 애니메이션 시작
animate();
