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


    RENDERER.addPreRenderTickFunction( function() {
        var gameColliders = LAYER_MANAGER.getGameObjectColliders();

        for( var i = 0; i < gameColliders.length; ++i ) {
            gameColliders[i].checkedCollisionWithGameObjects = 0;
        }

        for( var i = 0; i < gameColliders.length-1; ++i ) {
            if( !gameColliders[i].checkedCollisionWithGameObjects || !gameColliders[i+1].checkedCollisionWithGameObjects) {
                
                if( GJK_COLLISIONS.intersect( gameColliders[i].renderables[0], gameColliders[i+1].renderables[0] ) ) {
                    console.log('bump')
                }

                gameColliders[i].checkedCollisionWithGameObjects = 1;
                gameColliders[i+1].checkedCollisionWithGameObjects = 1;
            }
        }
    });

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