function onSocketConnected() {
	comms.joinRoom();
}


var comms = new ClientComms({
	onConnect: onSocketConnected
});




// Create the main event store. Events will be added (.on(...)), removed
// (.off(...)), and fired (.fire(...)) from this object.
// var eventHandler = new EventHandler();

// Create a key handler. Note that this isn't used by most (if any) camera
// movements. Those are handled by three.js.
// It also doesn't use the EventHandler! Maybe it should...
// var keyHandler = new KeyHandler();

// Create a mouse handler. Note that this isn't used by most (if any) camera
// movements. Those are handled by three.js.
// It also doesn't use the EventHandler. Maybe it should...
// var mouseHandler = new MouseHandler();

// Create a scene manager that'll hold all the scenes and game objects. It organises
// things into three groups (background (skybox, etc), middleground (stuff
// what moves), and foreground (the HUD)). Each group is then sorted according
// to its "z-index" value, so you can control the rendering order.
var sceneManager = new SceneManager();








// Add some camera controls to each scene's camera
sceneManager.background.controls = new THREE.FlyControlsVelocity(
    sceneManager.background.camera,
    document, // domElement
    0.8, // acceleration multiplier
    0.97, // deceleration multiplier
    1000 // maximum movement velocity
);
sceneManager.background.controls.movementSpeed = 0;
sceneManager.background.controls.rollSpeed = Math.PI / 2;

sceneManager.middleground.controls = new THREE.FlyControlsVelocity(
    sceneManager.middleground.camera,
    document, // domElement
    0.8, // acceleration multiplier
    0.97, // deceleration multiplier
    1000 // maximum movement velocity
);
sceneManager.middleground.controls.rollSpeed = Math.PI / 2;


// Make sure these controls can be updated by adding a custom tick function
sceneManager.background.tick = function(dt) {
    this.controls.update(dt);
};





// Create a new Skybox.
var skybox = new Skybox({
	imagePath: 'res/img/universe_sml_darker.jpg',
	radius: 10000
});

// Add this skybox to the background layer
sceneManager.addObjectTo( 'background', skybox );


var light = new THREE.PointLight(0xffffff);
sceneManager.middleground.scene.add( light );



// Create the renderer. By default it'll set width and height to window values
// and attach the domElement to document.body. You only need one of these.
var renderer = new Renderer();

// Tell the renderer to use the object manager we just created
renderer.setSceneManager( sceneManager );

// Render the scene!
renderer.start();

