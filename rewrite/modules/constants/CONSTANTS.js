// Utility instances.
const EVENTS = Events;
const MOUSE_HANDLER = new MouseHandler();
const KEYBOARD_HANDLER = new KeyboardHandler();
const LAYER_MANAGER = new LayerManager( CONFIG.layerManager );
const ASSET_LOADER = new AssetLoader( _.extend( { events: EVENTS }, CONFIG.assetLoader ) );


// Adjust camera position(s) and rotation(s) on player input.
const CAMERA_CONTROLS = new CameraControls({
    mouseHandler: MOUSE_HANDLER,
    keyboardHandler: KEYBOARD_HANDLER,
    targetCameras: LAYER_MANAGER.getAllCameras()
});


// Create renderer instance.
const RENDERER = new Renderer({
    width: window.innerWidth / CONFIG.resolutionScaling,
    height: window.innerHeight / CONFIG.resolutionScaling,
    elementWidth: window.innerWidth,
    elementHeight: window.innerHeight,

    gammaInput: true,
    gammaOutput: true,
    physicallyBasedShading: true
});