let scene, renderer, camera, control;
let text = ["19A", "19B"]

init();
animate();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 150);

  renderer = new THREE.SVGRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  control = new THREE.OrbitControls(camera, renderer.domElement);

  for (let i = 0; i < 2; i++) {
    const planeGeometry = new THREE.PlaneGeometry(50, 20, 2);
    const planeMaterial = new THREE.MeshBasicMaterial({color: 0x006195CF, side: THREE.DoubleSide});
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    planeMesh.position.set(i * 60, 0, 0);

    scene.add(planeMesh);

    const loader = new THREE.FontLoader();
    loader.load('/fonts/Roboto_Bold.json', function(font) {
      let textGeometry = new THREE.TextGeometry(text[i], {
        font: font,
        size: 10,
        height: 0,
        curveSegments: 7,
        bevelThickness:5,
        bevelSize: 0,
        bevelOffset: 5,
        bevelSegments: 5
      });
      textGeometry.center();
      let material = new THREE.MeshBasicMaterial( { color: 'white', transparent: true, } );
      let mesh = new THREE.Mesh( textGeometry, material );

      mesh.position.set(i * 60, 0, 2 * 3);
      scene.add(mesh);
    });
  }
}

function animate() {
  requestAnimationFrame(animate);
  update();
  render();
}

function update() {
  control.update();
}

function render() {
  renderer.render(scene, camera);
}
