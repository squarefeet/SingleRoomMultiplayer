const sunPosition = new THREE.Vector3(-1000, 0, 0);
const mouseHandler = new MouseHandler();
const keyboardHandler = new KeyboardHandler();
const layerManager = new LayerManager( CONFIG.layerManager );
const assetLoader = new AssetLoader( CONFIG.assetLoader );

const cameraControls = new CameraControls({
    mouseHandler: mouseHandler,
    keyboardHandler: keyboardHandler,
    targetCameras: layerManager.getAllCameras()
});

const renderer = new Renderer();