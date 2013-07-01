var flames = [],
    particleEngine;

var mouseHandler = new MouseHandler();
var keyboardHandler = new KeyboardHandler();

var layerManager = new LayerManager({
    layers: {
        background: {
            updatePosition: false,
            updateRotation: true
        },
        middleground: {
            updatePosition: true,
            updateRotation: true
        },
        foreground: {
            updatePosition: true,
            updateRotation: true
        },
    },
    layerOrder: [ 'background', 'middleground', 'foreground' ],
    fov: 75,
    far: 50000
});
layerManager.setCameraLookAtForLayer( 'background', layerManager.getLayerWithName('background').scene.position );



var cameraControls = new CameraControls({
    mouseHandler: mouseHandler,
    keyboardHandler: keyboardHandler,
    targetCameras: layerManager.getAllCameras()
});
layerManager.addTickToLayer( 'background', function( layerObjects, dt ) {
    cameraControls.tick( dt );

    // particleEngine.update( dt );

    // var camPos = layerManager.getLayerWithName( 'middleground' ).camera.position,
        // camRot = layerManager.getLayerWithName( 'middleground' ).camera.quaternion;

    // cameraShip.position.lerp( camPos, 0.5 );
    // cameraShip.quaternion.slerp( camRot, 0.3 );

    // cameraShip.translateZ( -1000 );
    // cameraShip.translateY( -150 );


    // particleEngine.particleMesh.position.lerp( camPos, 0.5 );
    // particleEngine.particleMesh.quaternion.slerp( camRot, 0.3 );

    // particleEngine.particleMesh.translateZ( -500 );
    // particleEngine.particleMesh.translateY( -150 );

    // for( var i = 0; i < flames.length; ++i ) {
    //     flames[i].update( dt );
    // }
});



var renderer = new Renderer();
renderer.setLayerManager( layerManager );
renderer.addToDOM();
renderer.addStats( new Stats() );
// renderer.enablePostProcessing( ['middleground'], 'middleground' );


var light = new THREE.DirectionalLight({
    color: 0xffffff
});
light.position.y = 200;
light.position.z = 300;
layerManager.addObject3dToLayer( 'middleground', light );

 var ambLight = new THREE.HemisphereLight( 0xaaaacc, 0xaaaaaa, 1 );
layerManager.addObject3dToLayer( 'middleground', ambLight );





var starfield = new Starfield({
    color: 0xaaaaaa,
    stars: 10000
});
layerManager.addObjectToLayer( 'middleground', starfield );

var bgStarfield = new Starfield({
    stars: 1000,
    width: 1000,
    height: 1000,
    depth: 1000,
    color: 0x888888
});
layerManager.addObjectToLayer( 'background', bgStarfield );


renderer.start();


var makeShield = function( mesh ) {
    var boundingSphere = mesh.children[0].geometry.boundingSphere;

    var material = new THREE.MeshPhongMaterial({
        color: 0x0044ff,
        opacity: 0.2,
        transparent: true
    });

    var geometry = new THREE.SphereGeometry(boundingSphere.radius, 64, 64);
    var shield = new THREE.Mesh( geometry, material );

    shield.scale.y = 0.3;
    shield.scale.z = 0.8;
    shield.scale.x = 1.2;
    shield.position.z = -100;


    mesh.add( shield );
};

var makeFlame = function( mesh ) {
    return;
    var flame = new Flame();
    flame.mesh.position.z = 590;
    flame.mesh.rotation.x = Math.PI/2;
    flames.push(flame);
    mesh.add(flame.mesh);
};

var cameraShip;

var assetLoader = new AssetLoader({
    models: [
        '../../res/models/crosswing6.dae'
    ],
    textures: [
        '../../res/textures/phobos2k.jpg'
    ],
    onModelsLoaded: function( models ) {

    },

    onAllLoaded: function( assets ) {
        var models = assets.models;

        for(var i in models) {
            // makeShield( models[i].dae );
            // makeFlame( models[i].dae );
            layerManager.addObject3dToLayer( 'middleground', models[i].dae );
        }

        cameraShip = models[i].dae.clone();
        cameraShip.useQuaternion = true;
        layerManager.addObject3dToLayer( 'middleground', cameraShip );

        assetLoader.domElement.style.display = 'none';


        var asteroid = new Asteroid( 5000 );
        layerManager.addObjectToLayer( 'middleground', asteroid );

        particleEngine = new ParticleEngine();

        particleEngine.setValues({
            positionStyle    : Type.CUBE,
            positionBase     : new THREE.Vector3( 0, 0, 0 ),
            positionSpread   : new THREE.Vector3( 10, 0, 10 ),

            velocityStyle    : Type.CUBE,
            velocityBase     : new THREE.Vector3( 0, 0, 300 ),
            velocitySpread   : new THREE.Vector3( 80, 50, 80 ),
            accelerationBase : new THREE.Vector3( 0, 0, -100 ),

            particleTexture : THREE.ImageUtils.loadTexture( '../../res/textures/smokeparticle.png'),

            angleBase               : 0,
            angleSpread             : 720,
            angleVelocityBase       : 0,
            angleVelocitySpread     : 720,

            sizeTween    : new Tween( [0, 1], [32, 128] ),
            opacityTween : new Tween( [0.8, 2], [0.5, 0] ),
            colorTween   : new Tween( [0.4, 1], [ new THREE.Vector3(0,0,0.2), new THREE.Vector3(0, 0, 0.5) ] ),

            particlesPerSecond : 200,
            particleDeathAge   : 8.0,
            emitterDeathAge    : 60,

            scene: layerManager.getLayerWithName( 'middleground' ).scene
        });

        particleEngine.positionBase = cameraShip.position;

        console.log(particleEngine)

        particleEngine.initialize();

        setTimeout(renderer.start, 1000);
    }
});
document.body.appendChild(assetLoader.domElement);

// assetLoader.loadAll();



console.log( layerManager.getLayerWithName( 'middleground' ) );