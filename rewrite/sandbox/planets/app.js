// layerManager.addFogToLayer( 'middleground', 0x111111, 0.0001 );

renderer.setLayerManager( layerManager );
renderer.addToDOM();
renderer.addStats( new Stats() );
renderer.addPreRenderTickFunction( cameraControls.tick );

setTimeout(assetLoader.loadAll, 500);