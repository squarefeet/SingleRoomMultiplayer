// LAYER_MANAGER.addFogToLayer( 'middleground', 0x111111, 0.0001 );

// Initialize the renderer
RENDERER.setLayerManager( LAYER_MANAGER );
RENDERER.addToDOM();
RENDERER.addStats( new Stats() );
RENDERER.addPreRenderTickFunction( CAMERA_CONTROLS.tick );

// Kick off all asset loading
ASSET_LOADER.loadAll();