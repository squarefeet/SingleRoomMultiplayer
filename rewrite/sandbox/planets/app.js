var planet,
    sunPosition = new THREE.Vector3(-1000, 0, 0);

var mouseHandler = new MouseHandler();
var keyboardHandler = new KeyboardHandler();

var layerManager = new LayerManager({
    layers: {
        background: {
            updatePosition: false,
            updateRotation: true
        },
        middleground: {
            updatePosition: true,
            updateRotation: true
        },
        foreground: {
            updatePosition: true,
            updateRotation: true
        },
    },
    layerOrder: [ 'background', 'middleground', 'foreground' ],
    fov: 75,
    far: 50000
});
layerManager.setCameraLookAtForLayer( 'background', layerManager.getLayerWithName('background').scene.position );
// layerManager.addFogToLayer( 'middleground', 0x111111, 0.0001 );


var cameraControls = new CameraControls({
    mouseHandler: mouseHandler,
    keyboardHandler: keyboardHandler,
    targetCameras: layerManager.getAllCameras()
});

layerManager.addTickToLayer( 'background', function( layerObjects, dt ) {
    cameraControls.tick( dt );
    planet.tick( dt );
});



var renderer = new Renderer();
renderer.setLayerManager( layerManager );
renderer.addToDOM();
renderer.addStats( new Stats() );


// var ambLight = new THREE.HemisphereLight( 0xaaaacc, 0xaaaaaa, 1 );
// layerManager.addObject3dToLayer( 'background', ambLight );


var bgStarfield = new Starfield({
    stars: 10000,
    width: 5000,
    height: 5000,
    depth: 5000,
    color: 0xffffff
});
layerManager.addObjectToLayer( 'background', bgStarfield );


function makePlanet() {
    planet = new Planet({
        position: new THREE.Vector3(0, 0, -900),
        scale: 0.005
    });

    layerManager.addObjectToLayer( 'background', planet );
}

function makeSun() {
    var sun = new Sun({
        position: sunPosition
    });

    layerManager.addObjectToLayer( 'background', sun);

    var sunLight = new THREE.DirectionalLight( 0xfffea6, 1 );
    sunLight.position = sunPosition;

    layerManager.addObject3dToLayer( 'background', sunLight );
}


var assetLoader = new AssetLoader({
    models: [],
    textures: [
        '../../res/textures/jupiter.jpg',
        '../../res/textures/io.jpg',
        '../../res/textures/europa.jpg',
        '../../res/textures/sun.jpg',

        // lens flare assets
        '../../res/textures/lensflares/lensflare0.png',
        '../../res/textures/lensflares/lensflare1.png',
        '../../res/textures/lensflares/lensflare2.png',
        '../../res/textures/lensflares/lensflare3.png'
    ],

    onModelsLoaded: function( models ) {},

    onAllLoaded: function( assets ) {
        var models = assets.models;

        makePlanet();
        makeSun();

        assetLoader.domElement.style.display = 'none';

        renderer.start();
    }
});
document.body.appendChild(assetLoader.domElement);

assetLoader.loadAll();