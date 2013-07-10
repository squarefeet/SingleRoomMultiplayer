// Bind some internal events
EVENTS.on('ASSET_LOADER:allLoaded', function( assets ) {

	ASSET_LOADER.domElement.style.display = 'none';

	var background = new BackgroundLayer( {
		layerManager: LAYER_MANAGER,
		renderer: RENDERER
	});


	RENDERER.start();
});