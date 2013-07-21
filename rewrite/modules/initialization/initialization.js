var BACKGROUND_LAYER,
	MIDDLEGROUND_LAYER,
	FOREGROUND_LAYER;


LAYER_MANAGER.addFogToLayer( 'middleground', 0x111111, 0.0001 );

// Initialize the renderer
RENDERER.setLayerManager( LAYER_MANAGER );
RENDERER.addToDOM();
RENDERER.addStats( new Stats() );
RENDERER.addPreRenderTickFunction( CAMERA_CONTROLS.tick );
RENDERER.addPreRenderTickFunction( HUD.tick );

// Kick off all asset loading
ASSET_LOADER.loadAll();


function bindKeys() {
	var controls = CONFIG.controls,
		cam = CAMERA_CONTROLS,
		handler = KEYBOARD_HANDLER,
		targetingSystem = TARGETING_SYSTEM;

	// Down
	handler.addKeyDownListener( controls.FORWARD, function() {
		cam.setForward( true );
	});

	handler.addKeyDownListener( controls.BACKWARD, function() {
		cam.setBackward( true );
	});

	handler.addKeyDownListener( controls.LEFT, function() {
		cam.setLeft( true );
	});

	handler.addKeyDownListener( controls.RIGHT, function() {
		cam.setRight( true );
	});

	handler.addKeyDownListener( controls.ROLL_LEFT, function() {
		cam.setRollLeft( true );
	});

	handler.addKeyDownListener( controls.ROLL_RIGHT, function() {
		cam.setRollRight( true );
	});


	// Up
	handler.addKeyUpListener( controls.FORWARD, function() {
		cam.setForward( false );
	});

	handler.addKeyUpListener( controls.BACKWARD, function() {
		cam.setBackward( false );
	});

	handler.addKeyUpListener( controls.LEFT, function() {
		cam.setLeft( false );
	});

	handler.addKeyUpListener( controls.RIGHT, function() {
		cam.setRight( false );
	});

	handler.addKeyUpListener( controls.ROLL_LEFT, function() {
		cam.setRollLeft( false );
	});

	handler.addKeyUpListener( controls.ROLL_RIGHT, function() {
		cam.setRollRight( false );
	});


	

	// Targeting
	handler.addKeyDownListener( controls.TARGET, function() {
		targetingSystem.nextTarget();
	});
}