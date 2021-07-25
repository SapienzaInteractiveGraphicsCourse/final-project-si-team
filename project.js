const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
var arrayCubes = [];
var i = 0;
var number = 0;
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.background = new THREE.Color(0x99ffff);
camera.position.set(1, 0.5, 5);
var conta = 0;
var flag0 = true;
var flag1 = true;
var flag2 = true;
var flag3 = true;
var flag4 = true;
var flag5 = true;
var flag6 = true;
var flagAnimation = false;
var flagRotationUp = true;
var flagHouseAnimation = false;

var flagRotationDown = false;
var flagAnimation1 = false;
var arrayCheck = [false, false, false, false, false, false, false];
var sumFlag = 0;
var generalFlag = true;
var ObjectsPlayer1 = new Array();
const light = new THREE.AmbientLight(0x404040, 4); // soft white light
scene.add(light);

//sky

var sky = new THREE.Sky();
sky.scale.setScalar(5000);

//sun
const params = {
  turbidity: 1,
  mieDirectionalG: 0.65,
  mieCoefficient: 0.008,
  azimuth: 180,
  elevation: 3,
  exposure: renderer.toneMappingExposure,
  rayleigh: 4,
};

var sun = new THREE.Vector3();
const skyParams = sky.material.uniforms;
skyParams["turbidity"].value = params.turbidity;
skyParams["rayleigh"].value = params.rayleigh;
skyParams["mieCoefficient"].value = params.mieCoefficient;
skyParams["mieDirectionalG"].value = params.mieDirectionalG;
const phi = THREE.MathUtils.degToRad(90 - params.elevation);
const theta = THREE.MathUtils.degToRad(params.azimuth);
sun.setFromSphericalCoords(1, phi, theta);

skyParams["sunPosition"].value.copy(sun);

renderer.toneMappingExposure = params.exposure;
scene.add(sky);

var signX;
var signY;
var flagSignX;
var flagSignY;
var Cordinates = new Array();
var Objects = new Array();
var Cordinates_x;
var Cordinates_y;
while (number < 7) {
  const geometry = new THREE.SphereGeometry(0.1, 20, 20, 20, 20, 20, 20);
  const texture = new THREE.TextureLoader().load("textures/Fire.jpg");
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const sphere = new THREE.Mesh(geometry, material);
  flagSignX = Math.random();
  if (flagSignX >= 0.5) {
    signX = 1;
  } else {
    signX = -1;
  }
  flagSignY = Math.random();
  if (flagSignY >= 0.5) {
    signY = 1;
  } else {
    signY = -1;
  }
  Cordinates_x = Math.random() * 10 * signX;
  Cordinates_y = Math.random() * 10 * signY;
  Cordinates.push((Cordinates_x, 0, Cordinates_y));
  Objects.push(sphere);
  sphere.position.set(Cordinates_x, 0, Cordinates_y);
  scene.add(sphere);
  number = number + 1;
}

//Floor

const geometryFloor = new THREE.BoxGeometry(1500, 0.5, 1500);
const textureFloor = new THREE.TextureLoader().load(
  "textures/grassTexture.jpeg"
);
const materialFloor = new THREE.MeshBasicMaterial({ map: textureFloor });
const floor = new THREE.Mesh(geometryFloor, materialFloor);
floor.position.y = -0.6;

scene.add(floor);

//House
const geometryHouse = new THREE.BoxGeometry(15, 10, 15);
const textureHouse = new THREE.TextureLoader().load(
  "textures/TextureHouse.jpg"
);
const materialHouse = new THREE.MeshBasicMaterial({ map: textureHouse });
const House = new THREE.Mesh(geometryHouse, materialHouse);
House.position.y = +4.7;
House.position.z = -30.6;
House.position.x = -30.6;

scene.add(House);

var flagHouseRoof;
let loaderHouseRoof = new THREE.GLTFLoader();
var HouseRoof;

loaderHouseRoof.load(
  "House/scene.gltf",
  function (gltf) {
    HouseRoof = gltf.scene;
    HouseRoof.scale.x = 0.13;
    HouseRoof.scale.y = 0.14;
    HouseRoof.scale.z = 0.2;

    HouseRoof.position.set(-9.8, 4.9, 8.5);

    House.add(HouseRoof);
    flagHouseRoof = true;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

var flagHouseDoor;
let loaderHouseDoor = new THREE.GLTFLoader();
var HouseDoor;

loaderHouseDoor.load(
  "Door/scene.gltf",
  function (gltf) {
    HouseDoor = gltf.scene;
    HouseDoor.scale.x = 1.7;
    HouseDoor.scale.y = 1.7;
    HouseDoor.scale.z = 1;

    HouseDoor.position.set(0, -5, 7.4);

    House.add(HouseDoor);
    flagHouseDoor = true;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

var flagHouseStreetLamp;
let loaderHouseStreetLamp = new THREE.GLTFLoader();
var HouseStreetLamp;

loaderHouseStreetLamp.load(
  "StreetLamp/scene.gltf",
  function (gltf) {
    HouseStreetLamp = gltf.scene;
    HouseStreetLamp.scale.x = 1;
    HouseStreetLamp.scale.y = 1;
    HouseStreetLamp.scale.z = 1;

    HouseStreetLamp.position.set(10, -5, 7.4);
    HouseStreetLamp.rotation.y -= Math.PI / 2;

    House.add(HouseStreetLamp);
    flagHouseStreetLamp = true;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const directionalLight2 = new THREE.PointLight(0xffc966, 9, 5);
directionalLight2.position.x = -19;
directionalLight2.position.y = +5.5;
directionalLight2.position.z = -20;
if (flagHouseDoor) {
  directionalLight2.target = HouseDoor;
}
scene.add(directionalLight2);

const directionalLight3 = new THREE.PointLight(0xffc966, 15, 6);
directionalLight3.position.x = -18;
directionalLight3.position.y += 1;
directionalLight3.position.z = -20;

scene.add(directionalLight3);

var flagHouseWindow;
let loaderHouseWindow = new THREE.GLTFLoader();
var HouseWindow;

loaderHouseWindow.load(
  "Window/scene.gltf",
  function (gltf) {
    HouseWindow = gltf.scene;
    HouseWindow.scale.x = 1.9;
    HouseWindow.scale.y = 1.9;
    HouseWindow.scale.z = 1.9;

    HouseWindow.position.set(0.2, 3, 7.5);

    House.add(HouseWindow);
    flagHouseWindow = true;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

var Goku;

let loader = new THREE.GLTFLoader();
var flagGoku = false;
var ObjectsPlayer = new Array();
loader.load(
  "scene.gltf",
  function (gltf) {
    Goku = gltf.scene;
    Goku.rotation.y -= Math.PI;
    Goku.scale.x = 0.4;
    Goku.scale.y = 0.4;
    Goku.scale.z = 0.4;
    scene.add(Goku);

    //Head
    const geometryHead = new THREE.BoxGeometry(0.3, 0.3, 0.2);
    const textureHead = new THREE.TextureLoader().load(
      "textures/HeadTexture.jpg"
    );
    const materialHead = new THREE.MeshBasicMaterial({ map: textureHead });
    const head = new THREE.Mesh(geometryHead, materialHead);
    head.position.y += 1.5;

    head.rotation.y += Math.PI;
    head.rotation.z += Math.PI;
    ObjectsPlayer.push(head);
    Goku.add(head);

    //Body
    const geometryBody = new THREE.BoxGeometry(0.65, 0.7, 0.4);
    const textureBody = new THREE.TextureLoader().load(
      "textures/BodyTexture.jpg"
    );
    const materialBody = new THREE.MeshBasicMaterial({ map: textureBody });
    const body = new THREE.Mesh(geometryBody, materialBody);
    body.position.y += 1;

    body.rotation.y += Math.PI;
    body.rotation.z += Math.PI;
    ObjectsPlayer.push(body);
    Goku.add(body);

    //BodyLogo
    const geometryBodyLogo = new THREE.PlaneGeometry(0.3, 0.3);
    const textureBodyLogo = new THREE.TextureLoader().load(
      "textures/BodyLogoTexture.jpg"
    );

    const materialBodyLogo = new THREE.MeshBasicMaterial({
      map: textureBodyLogo,
    });
    const BodyLogo = new THREE.Mesh(geometryBodyLogo, materialBodyLogo);
    BodyLogo.position.y += 1.1;
    BodyLogo.position.z += 0.21;

    Goku.add(BodyLogo);

    //FaceTexture
    const geometryFaceTexture = new THREE.PlaneGeometry(0.3, 0.3);
    const textureFaceTexture = new THREE.TextureLoader().load(
      "textures/FaceTexture.jpg"
    );

    const materialFaceTexture = new THREE.MeshBasicMaterial({
      map: textureFaceTexture,
    });
    const FaceTexture = new THREE.Mesh(
      geometryFaceTexture,
      materialFaceTexture
    );
    FaceTexture.position.y += 1.5;
    FaceTexture.position.z += 0.11;

    Goku.add(FaceTexture);

    //UpperLeftArm
    const geometryUpperLeftArm = new THREE.BoxGeometry(0.1, 0.4, 0.1);
    const textureUpperLeftArm = new THREE.TextureLoader().load(
      "textures/HeadTexture.jpg"
    );
    const materialUpperLeftArm = new THREE.MeshBasicMaterial({
      map: textureUpperLeftArm,
    });
    const UpperLeftArm = new THREE.Mesh(
      geometryUpperLeftArm,
      materialUpperLeftArm
    );
    UpperLeftArm.position.y += 1.1;
    UpperLeftArm.position.x += 0.35;
    UpperLeftArm.rotation.x -= 0.1;
    UpperLeftArm.rotation.z -= 0.1;
    UpperLeftArm.position.x += 0.03;

    UpperLeftArm.rotation.y += Math.PI;
    UpperLeftArm.rotation.z += Math.PI;
    ObjectsPlayer.push(UpperLeftArm);
    Goku.add(UpperLeftArm);

    //UpperRightArm
    const geometryUpperRightArm = new THREE.BoxGeometry(0.1, 0.4, 0.1);
    const textureUpperRightArm = new THREE.TextureLoader().load(
      "textures/HeadTexture.jpg"
    );
    const materialUpperRightArm = new THREE.MeshBasicMaterial({
      map: textureUpperRightArm,
    });
    const UpperRightArm = new THREE.Mesh(
      geometryUpperRightArm,
      materialUpperRightArm
    );
    UpperRightArm.position.y += 1.1;
    UpperRightArm.position.x += 0.35;
    UpperRightArm.rotation.x -= 0.1;
    UpperRightArm.rotation.z += 0.1;
    UpperRightArm.position.x += 0.03;
    UpperRightArm.position.x -= 0.77;

    UpperRightArm.rotation.y += Math.PI;
    UpperRightArm.rotation.z += Math.PI;
    ObjectsPlayer.push(UpperRightArm);
    Goku.add(UpperRightArm);

    //LowerRightArm
    const geometryLowerRightArm = new THREE.BoxGeometry(0.1, 0.25, 0.1);
    const textureLowerRightArm = new THREE.TextureLoader().load(
      "textures/HeadTexture.jpg"
    );
    const materialLowerRightArm = new THREE.MeshBasicMaterial({
      map: textureLowerRightArm,
    });
    const LowerRightArm = new THREE.Mesh(
      geometryLowerRightArm,
      materialLowerRightArm
    );
    LowerRightArm.position.y += 0.85;
    LowerRightArm.position.x += 0.3;
    LowerRightArm.rotation.x -= 0.5;
    LowerRightArm.rotation.z += 0.1;
    LowerRightArm.position.z += 0.07;
    LowerRightArm.position.x += 0.05;
    LowerRightArm.position.x -= 0.77;

    LowerRightArm.position.y -= 0.57;
    LowerRightArm.position.x += 0.42;
    LowerRightArm.position.z -= 0.12;

    LowerRightArm.rotation.y += Math.PI;
    LowerRightArm.rotation.z += Math.PI;
    ObjectsPlayer.push(LowerRightArm);
    UpperRightArm.add(LowerRightArm);

    //LowerLeftArm
    const geometryLowerLeftArm = new THREE.BoxGeometry(0.1, 0.25, 0.1);
    const textureLowerLeftArm = new THREE.TextureLoader().load(
      "textures/HeadTexture.jpg"
    );
    const materialLowerLeftArm = new THREE.MeshBasicMaterial({
      map: textureLowerLeftArm,
    });
    const LowerLeftArm = new THREE.Mesh(
      geometryLowerLeftArm,
      materialLowerLeftArm
    );
    LowerLeftArm.position.y += 0.85;
    LowerLeftArm.position.x += 1.12;
    LowerLeftArm.rotation.x -= 0.5;
    LowerLeftArm.rotation.z -= 0.1;
    LowerLeftArm.position.z += 0.07;
    LowerLeftArm.position.x += 0.05;
    LowerLeftArm.position.x -= 0.77;

    LowerLeftArm.rotation.y += Math.PI;
    LowerLeftArm.rotation.z += Math.PI;
    ObjectsPlayer.push(LowerLeftArm);
    Goku.add(LowerLeftArm);

    //leg
    const geometryLeg = new THREE.BoxGeometry(0.65, 0.25, 0.4);
    const textureLeg = new THREE.TextureLoader().load(
      "textures/LegTexture.jpg"
    );
    const materialLeg = new THREE.MeshBasicMaterial({ map: textureLeg });
    const Leg = new THREE.Mesh(geometryLeg, materialLeg);
    Leg.position.x += 0;
    Leg.position.y += 0.529;

    Leg.rotation.y += Math.PI;
    Leg.rotation.z += Math.PI;
    ObjectsPlayer.push(Leg);
    Goku.add(Leg);

    //Hair
    const geometryHair = new THREE.ConeGeometry(0.07, 0.2, 10, 33, 21, 0, 6.3);
    const textureHair = new THREE.TextureLoader().load(
      "textures/HairTexture.jpg"
    );
    const materialHair = new THREE.MeshBasicMaterial({ map: textureHair });
    const Hair = new THREE.Mesh(geometryHair, materialHair);
    Hair.position.y += 1.75;
    Hair.position.x += 0.1;
    ObjectsPlayer.push(Hair);
    Goku.add(Hair);

    const geometryHair1 = new THREE.ConeGeometry(0.07, 0.2, 10, 33, 21, 0, 6.3);
    const materialHair1 = new THREE.MeshBasicMaterial({ map: textureHair });
    const Hair1 = new THREE.Mesh(geometryHair1, materialHair1);
    Hair1.position.y += 1.75;
    Hair1.position.x -= 0.1;
    ObjectsPlayer.push(Hair1);
    Goku.add(Hair1);

    const geometryHair2 = new THREE.ConeGeometry(
      0.14,
      0.35,
      10,
      33,
      21,
      0,
      6.3
    );
    const materialHair2 = new THREE.MeshBasicMaterial({ map: textureHair });
    const Hair2 = new THREE.Mesh(geometryHair2, materialHair2);
    Hair2.position.y += 1.82;
    ObjectsPlayer.push(Hair2);
    Goku.add(Hair2);

    const geometryEar = new THREE.PlaneGeometry(0.2, 0.2);
    const textureEar = new THREE.TextureLoader().load(
      "textures/EarTexture.jpg"
    );
    const materialEar = new THREE.MeshBasicMaterial({ map: textureEar });
    const Ear = new THREE.Mesh(geometryEar, materialEar);
    Ear.position.y += 1.52;
    Ear.position.x += 0.16;
    Ear.rotation.y += Math.PI / 2;
    Ear.scale.x = 0.65;
    Ear.scale.y = 0.65;
    Ear.scale.z = 0.65;
    //ObjectsPlayer.push(Ear);
    Goku.add(Ear);

    const geometryEar1 = new THREE.PlaneGeometry(0.2, 0.2);
    const textureEar1 = new THREE.TextureLoader().load(
      "textures/EarTexture1.jpg"
    );
    const materialEar1 = new THREE.MeshBasicMaterial({ map: textureEar1 });
    const Ear1 = new THREE.Mesh(geometryEar1, materialEar1);
    Ear1.position.y += 1.52;
    Ear1.position.x -= 0.16;
    Ear1.rotation.y -= Math.PI / 2;
    Ear1.scale.x = 0.65;
    Ear1.scale.y = 0.65;
    Ear1.scale.z = 0.65;

    //ObjectsPlayer.push(Ear1);
    Goku.add(Ear1);
    flagGoku = true;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

var flagDrake;
let loaderShenron = new THREE.GLTFLoader();
var Drake;

loaderShenron.load(
  "Shenron/scene.gltf",
  function (gltf) {
    Drake = gltf.scene;
    Drake.scale.x = 0.0004;
    Drake.scale.y = 0.0004;
    Drake.scale.z = 0.0004;
    Drake.position.y -= 4;
    Drake.position.x += 4;
    Drake.position.z -= 20;

    scene.add(Drake);
    flagDrake = true;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

var flagTrees;
let loaderTrees = new THREE.GLTFLoader();

var indexTrees = 0;

var Trees;
loaderTrees.load(
  "Trees/scene.gltf",
  function (gltf) {
    Trees = gltf.scene;

    Trees.scale.x = 0.004;
    Trees.scale.y = 0.005;
    Trees.scale.z = 0.004;
    Trees.position.y -= 0.3;

    Trees.position.z -= 10;
    Trees.position.x += 1;

    // Drake.position.y-=4;

    scene.add(Trees);

    flagTrees = true;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

var flagBoard;
let loaderBoard = new THREE.GLTFLoader();

var Board;
loaderBoard.load(
  "Board/scene.gltf",
  function (gltf) {
    Board = gltf.scene;

    Board.scale.x = 2;
    Board.scale.y = 1;
    Board.scale.z = 1;
    Board.position.y -= 0.7;
    Board.rotation.y += Math.PI;

    Board.position.z -= 20;
    ObjectsPlayer1.push(Board);

    // Drake.position.y-=4;

    scene.add(Board);

    flagBoard = true;

    const geometryBoardPaper = new THREE.BoxGeometry(3.2, 1.8, 0.3);
    const textureBoardPaper = new THREE.TextureLoader().load(
      "textures/BoardPaperTexture.jpg"
    );
    const materialBoardPaper = new THREE.MeshBasicMaterial({
      map: textureBoardPaper,
    });
    const BoardPaper = new THREE.Mesh(geometryBoardPaper, materialBoardPaper);
    BoardPaper.position.y += 2.15;
    BoardPaper.position.x -= 0.0;
    BoardPaper.position.z -= 5.2;
    BoardPaper.rotation.y -= Math.PI;
    BoardPaper.scale.x = 0.65;
    BoardPaper.scale.y = 0.65;
    BoardPaper.scale.z = 0.65;
    ObjectsPlayer1.push(BoardPaper);
    Board.add(BoardPaper);

    const loaderGeometry = new THREE.FontLoader();

    loaderGeometry.load(
      "fonts/helvetiker_regular.typeface.json",
      function (font) {
        const geometryPaperText = new THREE.TextGeometry(
          "TOTAL SPHERES \n COLLECTED: 0",
          {
            font: font,
            size: 5,
            height: 1,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 0.2,
            bevelOffset: 0,
            bevelSegments: 3,
          }
        );
        const texturePaperText = new THREE.TextureLoader().load(
          "textures/BoardPaperTexture.jpg"
        );
        const materialPaperText = new THREE.MeshBasicMaterial({
          color: 0xffa500,
        });
        const PaperText = new THREE.Mesh(geometryPaperText, materialPaperText);
        ObjectsPlayer1.push(PaperText);
        PaperText.scale.x = 0.05;
        PaperText.scale.y = 0.05;
        PaperText.scale.z = 0.05;
        PaperText.position.y += 1.5;
        PaperText.position.z -= 14.7;
        PaperText.position.x -= 1.25;
        scene.add(PaperText);
      }
    );
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const controls = new OrbitControls(camera, renderer.domElement);

controls.screenSpacePanning = false;

controls.minDistance = 2;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI / 2;
controls.keys = false;
controls.enableDamping = true;
controls.dampingFactor = 0.05;

camera.position.z = 2;

controls.update();
document.body.addEventListener("keydown", keyPressed);
var indiceappoggio = 0;
var direzione = 0;
var firstBB;
var secondBB;

function keyPressed(e) {
  if (flagGoku) {
    controls.target = Goku.position;

    switch (e.key) {
      case "ArrowUp":
        firstBB = new THREE.Box3().setFromObject(Goku);

        secondBB = new THREE.Box3().setFromObject(Trees);

        var collision = firstBB.intersectsBox(secondBB);

        secondBB = new THREE.Box3().setFromObject(Board);

        var collision1 = firstBB.intersectsBox(secondBB);

        secondBB = new THREE.Box3().setFromObject(House);

        var collision2 = firstBB.intersectsBox(secondBB);

        secondBB = new THREE.Box3().setFromObject(HouseStreetLamp);

        var collision3 = firstBB.intersectsBox(secondBB);

        if (!collision && !collision1 && !collision2 && !collision3) {
          if (direzione == 0) {
            Goku.position.z -= 0.1;
            camera.position.z -= 0.1;
          }
          if (direzione == -1) {
            Goku.position.x += 0.1;
            camera.position.x += 0.1;
          }
          if (direzione == -2) {
            Goku.position.z += 0.1;
            camera.position.z += 0.1;
          }
          if (direzione == -3) {
            Goku.position.x -= 0.1;
            camera.position.x -= 0.1;
          }

          if (direzione == 1) {
            Goku.position.x -= 0.1;
            camera.position.x -= 0.1;
          }
          if (direzione == 2) {
            Goku.position.z += 0.1;
            camera.position.z += 0.1;
          }
          if (direzione == 3) {
            Goku.position.x += 0.1;
            camera.position.x += 0.1;
          }
        }
        break;
      case "ArrowDown":
        firstBB = new THREE.Box3().setFromObject(Goku);

        secondBB = new THREE.Box3().setFromObject(Trees);

        var collision = firstBB.intersectsBox(secondBB);

        secondBB = new THREE.Box3().setFromObject(Board);

        var collision1 = firstBB.intersectsBox(secondBB);

        secondBB = new THREE.Box3().setFromObject(House);

        var collision2 = firstBB.intersectsBox(secondBB);

        secondBB = new THREE.Box3().setFromObject(HouseStreetLamp);

        var collision3 = firstBB.intersectsBox(secondBB);

        if (!collision && !collision1 && !collision2 && !collision3) {
          if (direzione == 0) {
            Goku.position.z += 0.1;
            camera.position.z += 0.1;
          }
          if (direzione == -1) {
            Goku.position.x -= 0.1;
            camera.position.x -= 0.1;
          }
          if (direzione == -2) {
            Goku.position.z -= 0.1;
            camera.position.z -= 0.1;
          }
          if (direzione == -3) {
            Goku.position.x += 0.1;
            camera.position.x += 0.1;
          }

          if (direzione == 1) {
            Goku.position.x += 0.1;
            camera.position.x += 0.1;
          }
          if (direzione == 2) {
            Goku.position.z -= 0.1;
            camera.position.z -= 0.1;
          }
          if (direzione == 3) {
            Goku.position.x -= 0.1;
            camera.position.x -= 0.1;
          }
        }

        break;
      case "ArrowLeft":
        direzione += 1;
        if (direzione == 4) {
          direzione = 0;
        }
        Goku.rotation.y += Math.PI / 2;

        //camera.position.x-=0.1;

        break;
      case "ArrowRight":
        direzione -= 1;
        if (direzione == -4) {
          direzione = 0;
        }
        Goku.rotation.y -= Math.PI / 2;
        //camera.position.x+=0.1;

        break;
    }
    e.preventDefault();
  }
}

var FlagDrake = false;
var indexarraysphere = 0;
const animate = function () {
  requestAnimationFrame(animate);
  var j;

  if (FlagDrake) {
  }
  for (
    indexarraysphere = 0;
    indexarraysphere < Objects.length;
    indexarraysphere++
  ) {
    Objects[indexarraysphere].rotation.y += 0.02;
  }

  if (generalFlag && flagGoku) {
    const loaderGeometryFont = new THREE.FontLoader();

    if (sumFlag > 2 && flagAnimation == false) {
      ObjectsPlayer[7].material.map = new THREE.TextureLoader().load(
        "textures/HairTextureBlond.jpg"
      );
      ObjectsPlayer[8].material.map = new THREE.TextureLoader().load(
        "textures/HairTextureBlond.jpg"
      );
      ObjectsPlayer[9].material.map = new THREE.TextureLoader().load(
        "textures/HairTextureBlond.jpg"
      );

      flagAnimation = true;
      flagAnimation1 = false;

      var c = 0;
    }

    if (sumFlag > 4 && flagAnimation1 == false) {
      if (flagRotationUp) {
        ObjectsPlayer[7].material.map = new THREE.TextureLoader().load(
          "textures/HairTextureRed.jpg"
        );
        ObjectsPlayer[8].material.map = new THREE.TextureLoader().load(
          "textures/HairTextureRed.jpg"
        );
        ObjectsPlayer[9].material.map = new THREE.TextureLoader().load(
          "textures/HairTextureRed.jpg"
        );
        if (ObjectsPlayer[3].rotation.x >= -2) {
          ObjectsPlayer[3].rotation.x -= 0.005 * 2;
          ObjectsPlayer[3].position.y += 0.0005 * 2;
          ObjectsPlayer[3].position.z += 0.0005 * 2;
          conta = conta + 1;
        } else {
          flagRotationUp = false;
          flagRotationDown = true;
        }
      }
      if (flagRotationDown) {
        if (conta > 0) {
          ObjectsPlayer[3].rotation.x += 0.005 * 2;
          ObjectsPlayer[3].position.y -= 0.0005 * 2;
          ObjectsPlayer[3].position.z -= 0.0005 * 2;
          flagRotationUp = false;
          conta = conta - 1;
        }
      }

      var c = 0;
    }

    if (flag0) {
      var xDif = Goku.position.x - Objects[0].position.x;
      var yDif = Goku.position.z - Objects[0].position.z;
      if (yDif < 1 && yDif > -1 && xDif < 1 && xDif > -1) {
        scene.remove(Objects[0]);

        sumFlag += 1;
        flag0 = false;
        var stringa = String(sumFlag);
        loaderGeometryFont.load(
          "fonts/helvetiker_regular.typeface.json",
          function (font) {
            ObjectsPlayer1[2].geometry = new THREE.TextGeometry(
              "TOTAL SPHERES \n COLLECTED: " + stringa,
              {
                font: font,
                size: 5,
                height: 1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: 0.2,
                bevelOffset: 0,
                bevelSegments: 3,
              }
            );

            scene.add(ObjectsPlayer1[2]);
          },
          undefined,
          function (error) {
            console.error(error);
          }
        );
      }
    }

    if (flag1) {
      var xDif = Goku.position.x - Objects[1].position.x;
      var yDif = Goku.position.z - Objects[1].position.z;
      if (yDif < 1 && yDif > -1 && xDif < 1 && xDif > -1) {
        scene.remove(Objects[1]);

        sumFlag += 1;
        flag1 = false;
        var stringa = String(sumFlag);
        loaderGeometryFont.load(
          "fonts/helvetiker_regular.typeface.json",
          function (font) {
            ObjectsPlayer1[2].geometry = new THREE.TextGeometry(
              "TOTAL SPHERES \n COLLECTED: " + stringa,
              {
                font: font,
                size: 5,
                height: 1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: 0.2,
                bevelOffset: 0,
                bevelSegments: 3,
              }
            );

            scene.add(ObjectsPlayer1[2]);
          },
          undefined,
          function (error) {
            console.error(error);
          }
        );
      }
    }

    if (flag2) {
      var xDif = Goku.position.x - Objects[2].position.x;
      var yDif = Goku.position.z - Objects[2].position.z;
      if (yDif < 1 && yDif > -1 && xDif < 1 && xDif > -1) {
        scene.remove(Objects[2]);

        sumFlag += 1;
        flag2 = false;
        var stringa = String(sumFlag);
        loaderGeometryFont.load(
          "fonts/helvetiker_regular.typeface.json",
          function (font) {
            ObjectsPlayer1[2].geometry = new THREE.TextGeometry(
              "TOTAL SPHERES \n COLLECTED: " + stringa,
              {
                font: font,
                size: 5,
                height: 1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: 0.2,
                bevelOffset: 0,
                bevelSegments: 3,
              }
            );

            scene.add(ObjectsPlayer1[2]);
          },
          undefined,
          function (error) {
            console.error(error);
          }
        );
      }
    }

    if (flag3) {
      var xDif = Goku.position.x - Objects[3].position.x;
      var yDif = Goku.position.z - Objects[3].position.z;
      if (yDif < 1 && yDif > -1 && xDif < 1 && xDif > -1) {
        scene.remove(Objects[3]);

        sumFlag += 1;
        flag3 = false;
        var stringa = String(sumFlag);
        loaderGeometryFont.load(
          "fonts/helvetiker_regular.typeface.json",
          function (font) {
            ObjectsPlayer1[2].geometry = new THREE.TextGeometry(
              "TOTAL SPHERES \n COLLECTED:" + stringa,
              {
                font: font,
                size: 5,
                height: 1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: 0.2,
                bevelOffset: 0,
                bevelSegments: 3,
              }
            );

            scene.add(ObjectsPlayer1[2]);
          },
          undefined,
          function (error) {
            console.error(error);
          }
        );
      }
    }

    if (flag4) {
      var xDif = Goku.position.x - Objects[4].position.x;
      var yDif = Goku.position.z - Objects[4].position.z;
      if (yDif < 1 && yDif > -1 && xDif < 1 && xDif > -1) {
        scene.remove(Objects[4]);

        sumFlag += 1;
        flag4 = false;
        var stringa = String(sumFlag);
        loaderGeometryFont.load(
          "fonts/helvetiker_regular.typeface.json",
          function (font) {
            ObjectsPlayer1[2].geometry = new THREE.TextGeometry(
              "TOTAL SPHERES \n COLLECTED: " + stringa,
              {
                font: font,
                size: 5,
                height: 1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: 0.2,
                bevelOffset: 0,
                bevelSegments: 3,
              }
            );

            scene.add(ObjectsPlayer1[2]);
          },
          undefined,
          function (error) {
            console.error(error);
          }
        );
      }
    }
    if (flag5) {
      var xDif = Goku.position.x - Objects[5].position.x;
      var yDif = Goku.position.z - Objects[5].position.z;
      if (yDif < 1 && yDif > -1 && xDif < 1 && xDif > -1) {
        scene.remove(Objects[5]);

        sumFlag += 1;
        flag5 = false;
        var stringa = String(sumFlag);
        loaderGeometryFont.load(
          "fonts/helvetiker_regular.typeface.json",
          function (font) {
            ObjectsPlayer1[2].geometry = new THREE.TextGeometry(
              "TOTAL SPHERES \n COLLECTED: " + stringa,
              {
                font: font,
                size: 5,
                height: 1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: 0.2,
                bevelOffset: 0,
                bevelSegments: 3,
              }
            );

            scene.add(ObjectsPlayer1[2]);
          },
          undefined,
          function (error) {
            console.error(error);
          }
        );
      }
    }
    if (flag6) {
      var xDif = Goku.position.x - Objects[6].position.x;
      var yDif = Goku.position.z - Objects[6].position.z;
      if (yDif < 1 && yDif > -1 && xDif < 1 && xDif > -1) {
        scene.remove(Objects[6]);

        sumFlag += 1;
        flag6 = false;
        var stringa = String(sumFlag);
        loaderGeometryFont.load(
          "fonts/helvetiker_regular.typeface.json",
          function (font) {
            ObjectsPlayer1[2].geometry = new THREE.TextGeometry(
              "TOTAL SPHERES \n COLLECTED: " + stringa,
              {
                font: font,
                size: 5,
                height: 1,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 1,
                bevelSize: 0.2,
                bevelOffset: 0,
                bevelSegments: 3,
              }
            );

            scene.add(ObjectsPlayer1[2]);
          },
          undefined,
          function (error) {
            console.error(error);
          }
        );
      }
    }
  }

  keydown();
  if (flagDrake) {
    if (sumFlag == 7 && generalFlag == true) {
      House.rotation.y += 0.06;
      controls.target.x = -5;
      controls.target.z = -5;

      controls.update();
      if (House.rotation.y > 12) {
        scene.remove(House);
        flagHouseAnimation = true;
      }
      if (flagHouseAnimation == true) {
        controls.target.x = 6;
        controls.target.y = 1;
        controls.target.z = -17;
        controls.update();
        Drake.position.y += 0.01;
        if (camera.position.z < 7) {
          camera.position.z += 0.02;
        }
        camera.position.y += 0.005;
      }
    }

    if (Drake.position.y > 0.025 && generalFlag == true && sumFlag == 7) {
      generalFlag = false;
      alert(
        "Congratulations, you won! \n I am the dragon of wishes, make your wish!"
      );
      Drake.position.y -= 0.01;
    }
  }

  controls.update();
  renderer.render(scene, camera);
};

animate();

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function keydown() {
  //scene.rotation.y+=0.1;
}

function checkTouching(a, d) {
  let b1 = a.position.y - a.geometry.parameters.height / 2;
  let t1 = a.position.y + a.geometry.parameters.height / 2;
  let r1 = a.position.x + a.geometry.parameters.width / 2;
  let l1 = a.position.x - a.geometry.parameters.width / 2;
  let f1 = a.position.z - a.geometry.parameters.depth / 2;
  let B1 = a.position.z + a.geometry.parameters.depth / 2;
  let b2 = d.position.y - d.geometry.parameters.height / 2;
  let t2 = d.position.y + d.geometry.parameters.height / 2;
  let r2 = d.position.x + d.geometry.parameters.width / 2;
  let l2 = d.position.x - d.geometry.parameters.width / 2;
  let f2 = d.position.z - d.geometry.parameters.depth / 2;
  let B2 = d.position.z + d.geometry.parameters.depth / 2;
  if (t1 < b2 || r1 < l2 || b1 > t2 || l1 > r2 || f1 > B2 || B1 < f2) {
    return false;
  }
  return true;
}
