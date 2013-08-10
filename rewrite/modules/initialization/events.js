// Bind some internal events
EVENTS.on('ASSET_LOADER:allLoaded', function( assets ) {

	ASSET_LOADER.domElement.style.display = 'none';

	bindKeys();

	BACKGROUND_LAYER = new BackgroundLayer( {
		layerManager: LAYER_MANAGER,
		renderer: RENDERER
	} );

    MIDDLEGROUND_LAYER = new MiddlegroundLayer( {
        layerManager: LAYER_MANAGER,
        renderer: RENDERER,
        mouseHandler: MOUSE_HANDLER
    } );

    FOREGROUND_LAYER = new ForegoundLayer( {
        layerManager: LAYER_MANAGER,
        renderer: RENDERER,
        cameraControls: CAMERA_CONTROLS,
        events: EVENTS
    } );


    // Add HUD to dom
    HUD.addToDOM();

    // setInterval(function() {
    //     HUD.selectWeapon( 'primary', Math.round( Math.random() ) );
    //     HUD.selectWeapon( 'secondary', Math.round( Math.random() ) );
    // }, 1000);

    setTimeout(RENDERER.start, 0);
});


EVENTS.on('Rockets:destroyed', function( destructionType, x, y, z ) {
    // Trigger an explosion at xyz.
    MIDDLEGROUND_LAYER.triggerRocketExplosion( destructionType, x, y, z );
});


EVENTS.on('weapon:plasmaCannon:destroyed', function( destructionType, x, y, z ) {
    // Trigger an explosion at xyz.
    MIDDLEGROUND_LAYER.triggerRocketExplosion( destructionType, x, y, z );
});