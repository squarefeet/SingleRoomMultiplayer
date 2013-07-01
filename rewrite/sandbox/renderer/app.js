var flames = [],
    particleGroup;

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

    var camPos = layerManager.getLayerWithName( 'middleground' ).camera.position,
        camRot = layerManager.getLayerWithName( 'middleground' ).camera.quaternion;

    cameraShip.position.lerp( camPos, 0.5 );
    cameraShip.quaternion.slerp( camRot, 0.3 );

    cameraShip.translateZ( -1000 );
    cameraShip.translateY( -150 );


    // Passing a fixed-step here to stop the particles getting out of sync
    particleGroup.update( 0.016 );


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
            layerManager.addObject3dToLayer( 'middleground', models[i].dae );
        }

        cameraShip = models[i].dae.clone();
        cameraShip.useQuaternion = true;
        layerManager.addObject3dToLayer( 'middleground', cameraShip );

        assetLoader.domElement.style.display = 'none';


        var asteroid = new Asteroid( 5000 );
        layerManager.addObjectToLayer( 'middleground', asteroid );

        particleGroup = new ParticleGroup({
            blending: THREE.NormalBlending,
            texture: THREE.ImageUtils.loadTexture( '../../res/textures/smokeparticle.png')
        });


        var emitter = new ParticleEmitter({
            autoInitialize:     true,

            particlesPerSecond: 200,
            maxAge:             5,

            position:           new THREE.Vector3( 0, 0, 0 ),
            positionSpread:     new THREE.Vector3( 0, 0, 0 ),

            velocity:           new THREE.Vector3( 0, 50, 0 ),
            velocitySpread:     new THREE.Vector3( 50, 50, 50 ),

            acceleration:       new THREE.Vector3( 0, 0, 0 ),
            accelerationSpread: new THREE.Vector3( 20, 20, 20 ),

            angle:              90,
            angleSpread:        90,

            size:               50,
            sizeSpread:         20,

            opacity:            1,
            opacitySpread:      1,

            color:              new THREE.Vector3( 0.6, 0.3, 0.5 ),
            colorSpread:        new THREE.Vector3( 0.05, 0, 0 ),

            opacityTweenTo:     0,
            sizeTweenTo:        200,
            colorTweenTo:       new THREE.Vector3( 0.5, 1, 0.5 )
        });

        particleGroup.addEmitter( emitter );

        layerManager.addObject3dToLayer('middleground', particleGroup.mesh)

        emitter.position = cameraShip.position;

        renderer.start();
    }
});
document.body.appendChild(assetLoader.domElement);

assetLoader.loadAll();


console.log( layerManager.getLayerWithName( 'middleground' ) );