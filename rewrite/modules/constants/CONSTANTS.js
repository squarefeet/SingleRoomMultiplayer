// Utility instances.
var EVENTS = Events;
var MOUSE_HANDLER = new MouseHandler();
var KEYBOARD_HANDLER = new KeyboardHandler();
var LAYER_MANAGER = new LayerManager( CONFIG.layerManager );
var ASSET_LOADER = new AssetLoader( _.extend( { events: EVENTS }, CONFIG.assetLoader ) );


// Adjust camera position(s) and rotation(s) on player input.
var CAMERA_CONTROLS = new CameraControls({
    mouseHandler: MOUSE_HANDLER,
    keyboardHandler: KEYBOARD_HANDLER,
    targetCameras: LAYER_MANAGER.getAllCameras()
});

var HUD = new HUD({
    controls: CAMERA_CONTROLS
});


// Create renderer instance.
var RENDERER = new Renderer({
    width: window.innerWidth / CONFIG.resolutionScaling,
    height: window.innerHeight / CONFIG.resolutionScaling,
    elementWidth: window.innerWidth,
    elementHeight: window.innerHeight,

    gammaInput: true,
    gammaOutput: true,
    physicallyBasedShading: true
});