// Positions.
const sunPosition = new THREE.Vector3(-1000, 0, 0);


// Utility instances.
const mouseHandler = new MouseHandler();
const keyboardHandler = new KeyboardHandler();
const layerManager = new LayerManager( CONFIG.layerManager );
const assetLoader = new AssetLoader( CONFIG.assetLoader );

// Adjust camera position(s) and rotation(s) on player input.
const cameraControls = new CameraControls({
    mouseHandler: mouseHandler,
    keyboardHandler: keyboardHandler,
    targetCameras: layerManager.getAllCameras()
});

// Create renderer instance.
const renderer = new Renderer();