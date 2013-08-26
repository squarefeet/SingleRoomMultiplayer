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
        mouseHandler: MOUSE_HANDLER,
        cameraControls: CAMERA_CONTROLS
    } );

    FOREGROUND_LAYER = new ForegoundLayer( {
        layerManager: LAYER_MANAGER,
        renderer: RENDERER,
        cameraControls: CAMERA_CONTROLS,
        events: EVENTS
    } );


    // Create a player ship object
    // var settings = _.extend( {
    //     particleGroup: MIDDLEGROUND_LAYER.particleGroups.engines,
    //     x: 0, y: 0, z: 0
    // }, CONFIG.ship );

    // settings.controls = CAMERA_CONTROLS;
    // settings.useEmitter = false;

    // var playerShip = new Ship( settings ),
    //     camera = LAYER_MANAGER.getAllCameras()[1];

    // playerShip._addEmitter( playerShip.particleGroup, camera.position );
    // playerShip.playerID = 'host';

    // console.log( playerShip );

    // camera.add( playerShip );
    // LAYER_MANAGER.addCollider( playerShip );

    // LAYER_MANAGER.addObjectToLayer( 'middleground', playerShip );


    // RENDERER.addPreRenderTickFunction( function() {
    //     playerShip.mesh.position.copy( camera.position );
    //     playerShip.mesh.translateZ( 520 );
    //     playerShip.mesh.quaternion.copy( camera.quaternion );
    // });

    // Add HUD to dom
    HUD.addToDOM();

    // setInterval(function() {
    //     HUD.selectWeapon( 'primary', Math.round( Math.random() ) );
    //     HUD.selectWeapon( 'secondary', Math.round( Math.random() ) );
    // }, 1000);

    
    // Check BoundingBox collisions
    // var worldBox1 = new THREE.Box3(),
    //     worldBox2 = new THREE.Box3();


    // // Collision detection routine
    // RENDERER.addPreRenderTickFunction( function() {
    //     var gameColliders = LAYER_MANAGER.getGameObjectColliders();

    //     for( var i = 0; i < gameColliders.length - 1; ++i ) {
    //         if( !gameColliders[i].checkedCollisionWithGameObjects && !gameColliders[i].hasCollided ) {
    //             worldBox1.copy( gameColliders[i].boundingBox ).applyMatrix4( gameColliders[i].mesh.matrixWorld );
    //             worldBox2.copy( gameColliders[i+1].boundingBox ).applyMatrix4( gameColliders[i+1].mesh.matrixWorld );

    //             if( worldBox1.isIntersectionBox( worldBox2 ) ) {

    //                 if( GJK_COLLISIONS.intersect( 
    //                     gameColliders[i].getBoundingModel(), 
    //                     gameColliders[i+1].getBoundingModel() 
    //                 ) ) {
    //                     gameColliders[i].onCollision( GJK_COLLISIONS.collisionDirectionForMesh1 );
    //                     gameColliders[i+1].onCollision( GJK_COLLISIONS.collisionDirectionForMesh2 );
    //                 }
    //             }
    //         }
    //     }
    // });

    setTimeout(RENDERER.start, 0);
});


EVENTS.on('weapon:rocket:destroyed', function( destructionType, x, y, z ) {
    // Trigger an explosion at xyz.
    MIDDLEGROUND_LAYER.triggerRocketExplosion( destructionType, x, y, z );
});


EVENTS.on('weapon:plasmaCannon:destroyed', function( destructionType, x, y, z ) {
    // Trigger an explosion at xyz.
    MIDDLEGROUND_LAYER.triggerPlasmaCannonExplosion( destructionType, x, y, z );
});