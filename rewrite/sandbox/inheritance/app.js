function registerKeys() {
	var controls = CONFIG.controls,
		cam = cameraControls;

	// Down
	keyboardHandler.addKeyDownListener( controls.FORWARD, function() {
		cam.setForward( true );
	});

	keyboardHandler.addKeyDownListener( controls.BACKWARD, function() {
		cam.setBackward( true );
	});

	keyboardHandler.addKeyDownListener( controls.LEFT, function() {
		cam.setLeft( true );
	});

	keyboardHandler.addKeyDownListener( controls.RIGHT, function() {
		cam.setRight( true );
	});

	keyboardHandler.addKeyDownListener( controls.ROLL_LEFT, function() {
		cam.setRollLeft( true );
	});

	keyboardHandler.addKeyDownListener( controls.ROLL_RIGHT, function() {
		cam.setRollRight( true );
	});


	// Up
	keyboardHandler.addKeyUpListener( controls.FORWARD, function() {
		cam.setForward( false );
	});

	keyboardHandler.addKeyUpListener( controls.BACKWARD, function() {
		cam.setBackward( false );
	});

	keyboardHandler.addKeyUpListener( controls.LEFT, function() {
		cam.setLeft( false );
	});

	keyboardHandler.addKeyUpListener( controls.RIGHT, function() {
		cam.setRight( false );
	});

	keyboardHandler.addKeyUpListener( controls.ROLL_LEFT, function() {
		cam.setRollLeft( false );
	});

	keyboardHandler.addKeyUpListener( controls.ROLL_RIGHT, function() {
		cam.setRollRight( false );
	});
}




// layerManager.addFogToLayer( 'middleground', 0x111111, 0.0001 );

renderer.setLayerManager( layerManager );
renderer.addToDOM();
renderer.addStats( new Stats() );
renderer.addPreRenderTickFunction( cameraControls.tick );

registerKeys();

setTimeout(assetLoader.loadAll, 500);