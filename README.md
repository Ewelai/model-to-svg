# model-to-svg
Three.js
We have input properties: 

```javascript
// some json file
{
 data: {
  camera: {
   fov: number,
   position: Vec3,
   lookAt: Vec3
  },
  unitLabels: [
   {
    name: string,
    origin: Vec3,
    vertices: [Vec3, Vec3, Vec3, Vec3],
    normal: Vec3
   }
  ]
 }
}
```

# Perspective camera and scene
So, above all, we need to set up perspective camera and create scene using library Three.js: 

```javascript
const data = data;
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(data.camera.fov, innerWidth/innerHeight, ...);
camera.position.set(data.camera.pos);
camera.lookAt.set(data.camera.lookAt);
```

# Text and figure geometry
In the same way, we can apply a transformation to all planes and perspective transformation to them. For example, we have more than one plane

```javascript
for (let i = 0; i < 2; i++) {
  const planeGeometry= new THREE.PlaneGeometry(data.unitLabels[...].vertices);
  const planeMaterial= new THREE.MeshBasicMaterial({...});
  const planeMesh = new THREE.Mesh( planeGeometry, planeMaterial );

  scene.add(planeMesh);

  // Text
  const loader = new THREE.FontLoader();

  loader.load('someFont.json', function(font) {
   const textGeometry = new THREE.TextGeometry(data.unitLabels[...].name, {...});
   textGeometry.center();

   const textMaterial = new THREE.MeshBasicMaterial({...});
   const textMesh = new THREE.Mesh( textGeometry, textMaterial );

   textMesh.position.set(x, y, z);
   scene.add(textMesh);
  });
}
```

By the way, we can improve the display of the font by perspective camera transformation to each point of symbols defined as svg path. When applying Vector3(x, y, z).project(camera) we will get letters as the output.

# Convert to SVG
Now we able to do the final step. Fortunately, the library Three.js has a lot of renderers including SVGRenderer. So, we use it and receive our goal.
