var players = {},
    userName = '',
    currentTarget = null;


function onSocketConnected() {
	comms.joinRoom();
}

function onJoinedRoom() {
    comms.getPlayerList();
}

function onPlayerListReceived( list ) {
    processPlayerList( list );

    setTimeout(function() {
        var name = 'Player ' + ((Math.random() * 12345) | 0);
        players[name] = {
            name: name
        };

        userName = name;

        comms.enterName( name );
    }, 0);
}


function processPlayerList( list ) {
    for(var i = 0; i < list.length; ++i) {
        players[list[i]] = {
            name: list[i]
        };

        var player = players[list[i]].player = new Player();
        // sceneManager.addObjectTo( 'middleground', player );
    }
}


function onPlayerJoined( playerDetails ) {
    if(playerDetails.name === userName) {
        console.log('Not making player for', userName);
        return;
    }

    players[playerDetails.name] = {
        name: playerDetails.name
    };

    var player = players[playerDetails.name].player = new Player();
}


function onPlayerNameAccepted() {
    var player = new Player({
        hasControls: true
    });

    players[userName].player = player;

    sceneManager.addObjectTo( 'middleground', player );
}


function onPlayerDisconnected( playerDetails ) {
    if(players[playerDetails.name]) {

        var playerObj = players[playerDetails.name].player;
        sceneManager.removeObjectFrom( 'middleground', playerObj );

        delete[playerDetails.name];
    }
}


function onPacketReceived( state ) {
    // console.log('got packet for', state.name);
    if(players[state.name] && players[state.name].player) {
        players[state.name].player.onServerStateReceived( state );
    }
}



var comms = new ClientComms({
	onConnect: onSocketConnected,
    onJoinedRoom: onJoinedRoom,
    onPlayerListReceived: onPlayerListReceived,
    onPlayerNameAccepted: onPlayerNameAccepted,
    onPlayerJoined: onPlayerJoined,
    onPlayerDisconnected: onPlayerDisconnected,
    onPacketReceived: onPacketReceived
});




// Create the main event store. Events will be added (.on(...)), removed
// (.off(...)), and fired (.fire(...)) from this object.
var eventHandler = new EventHandler();

// eventHandler.on('')

// Create a key handler. Note that this isn't used by most (if any) camera
// movements. Those are handled by three.js.
// It also doesn't use the EventHandler! Maybe it should...
var keyHandler = new THREEx.KeyboardState();

// Create a mouse handler. Note that this isn't used by most (if any) camera
// movements. Those are handled by three.js.
// It also doesn't use the EventHandler. Maybe it should...
// var mouseHandler = new MouseHandler();

// Create a scene manager that'll hold all the scenes and game objects. It organises
// things into three groups (background (skybox, etc), middleground (stuff
// what moves), and foreground (the HUD)). Each group is then sorted according
// to its "z-index" value, so you can control the rendering order.
var sceneManager = new SceneManager();





// Create a new Skybox.
var skybox = new Skybox({
	imagePath: 'res/img/universe_sml_darker.jpg',
	radius: 10000
});

// Add this skybox to the background layer
sceneManager.addObjectTo( 'background', skybox );


// var light = new THREE.AmbientLight(0x333333);
// sceneManager.middleground.scene.add( light );


for( var i = 0; i < 25; ++i ) {
    var asteroid = new Asteroid({
        weightX: Math.random()/8,
        weightY: Math.random()/8,
        weightZ: Math.random()/8,
        spread: 4096
    });
}



var cube = new Cube();
cube.mesh.position.z = -1;
sceneManager.addObjectTo( 'middleground', cube );


// Create the renderer. By default it'll set width and height to window values
// and attach the domElement to document.body. You only need one of these.
var renderer = new Renderer();

// Tell the renderer to use the object manager we just created
renderer.setSceneManager( sceneManager );

// Render the scene!
renderer.start();



var overlayCanvas = document.getElementById('overlay'),
    overlayCtx = overlayCanvas.getContext('2d');

overlayCanvas.width = window.innerWidth;
overlayCanvas.height = window.innerHeight;

overlayCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';



function toScreenXY ( position, camera, width, height ) {
    var pos = position.clone(),
        projScreenMat = new THREE.Matrix4();

    projScreenMat.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
    pos.applyProjection( projScreenMat );

    return {
        x: ( pos.x + 1 ) * width / 2,
        y: ( -pos.y + 1) * height / 2
    };
}


var currentTargetIndex = -1;

document.addEventListener('keydown', function(e) {
    // console.log( e.keyCode );

    if( e.keyCode === 84 ) {
        var gameObjects = sceneManager.getTargetableObjectsForLevel('middleground');

        if( ++currentTargetIndex >= gameObjects.length ) {
            currentTargetIndex = 0;
        }

        for(var i = 0; i < gameObjects.length; ++i) {
            if(i === currentTargetIndex && typeof gameObjects[i].target === 'function') {
                gameObjects[i].target();
            }
            else {
                gameObjects[i].untarget();
            }
        }


        currentTarget = gameObjects[ currentTargetIndex ].renderables[0];
    }
});


// setInterval(function() {
//     var picker = new THREE.Vector3(),
//         pos = toScreenXY(
//             cube.mesh.position,
//             sceneManager.middleground.camera,
//             window.innerWidth,
//             window.innerHeight
//         );

//     var angle = Math.atan2(
//         (window.innerHeight / 2) - pos.y,
//         (window.innerWidth / 2) - pos.x
//     );

//     // console.log( (angle * (180/Math.PI)) );
// }, 1000);

// setTimeout(function() {

//     setInterval(function() {

//         var camera = sceneManager.middleground.camera,
//             vFOV = camera.fov * (Math.PI / 180),
//             height = 2 * Math.tan( vFOV / 2 ) * (camera.position.distanceTo(cube.mesh.position) - 50),
//             aspect = window.innerWidth / window.innerHeight,
//             width = height * aspect,
//             fractionH = 100 / height,
//             fractionW = 100 / width,
//             sizeOnScreenH = window.innerHeight * fractionH,
//             sizeOnScreenW = window.innerWidth * fractionW;

//         if(sizeOnScreenW < 0) return;

//         // Add padding
//         sizeOnScreenW *= 1.3;
//         sizeOnScreenH *= 1.3;

//         var screenPos = toScreenXY(
//             cube.mesh.position,
//             camera,
//             window.innerWidth,
//             window.innerHeight
//         );

//         overlayCanvas.width = window.innerWidth;
//         overlayCtx.fillStyle = 'rgba(255, 255, 255, 0.3)';
//         overlayCtx.clearRect(0, 0, window.innerHeight, window.innerWidth);
//         overlayCtx.fillRect(screenPos.x - (sizeOnScreenW/2), screenPos.y - (sizeOnScreenH/2), sizeOnScreenW, sizeOnScreenH);

//     }, 16);

// }, 2000);