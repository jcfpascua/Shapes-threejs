const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometries = [
    { geometry: new THREE.BoxGeometry(), color: 0x000000, position: [0, 1, 1] },
    { geometry: new THREE.ConeGeometry(0.5, 1, 32), color: 0xffffff, position: [-2, 0, 0] },
    { geometry: new THREE.CylinderGeometry(0.5, 0.5, 1, 32), color: 0x0000ff, position: [0, -1, 0] },
    { geometry: new THREE.SphereGeometry(0.5, 20, 20), color: 0x4b0082, position: [2, 0, 0] },
    { geometry: new THREE.TorusGeometry(3, 0.2, 16, 50), color: 0x00ff00, position: [0, 0, 0] }
];

const meshes = geometries.map(({ geometry, color, position }) => {
    const material = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    scene.add(mesh);
    return mesh;
});

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);

    meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.01;
    });
    renderer.setClearColor(0x808080);
    renderer.render(scene, camera);
} 
animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});