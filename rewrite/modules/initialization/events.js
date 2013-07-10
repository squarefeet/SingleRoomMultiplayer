// Bind some internal events
EVENTS.on('ASSET_LOADER:allLoaded', function( assets ) {

	ASSET_LOADER.domElement.style.display = 'none';

	var background = new BackgroundLayer( {
		layerManager: LAYER_MANAGER,
		renderer: RENDERER
	});

    var middleground = new MiddlegroundLayer( {
        layerManager: LAYER_MANAGER,
        renderer: RENDERER
    } );

	RENDERER.start();
});


EVENTS.on('Rockets:destroyed', function( destructionType, x, y, z ) {
    // Trigger an explosion at xyz.
});