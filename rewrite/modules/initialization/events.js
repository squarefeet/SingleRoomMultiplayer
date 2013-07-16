// Bind some internal events
EVENTS.on('ASSET_LOADER:allLoaded', function( assets ) {

	ASSET_LOADER.domElement.style.display = 'none';

	bindKeys();

	BACKGROUND_LAYER = new BackgroundLayer( {
		layerManager: LAYER_MANAGER,
		renderer: RENDERER
	});

    MIDDLEGROUND_LAYER = new MiddlegroundLayer( {
        layerManager: LAYER_MANAGER,
        renderer: RENDERER
    } );


    // Add HUD to dom
    HUD.addToDOM();

    setTimeout(RENDERER.start, 100);
});


EVENTS.on('Rockets:destroyed', function( destructionType, x, y, z ) {
    // Trigger an explosion at xyz.
    MIDDLEGROUND_LAYER.triggerRocketExplosion( destructionType, x, y, z );
});