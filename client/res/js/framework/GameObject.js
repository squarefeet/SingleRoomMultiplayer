// This is here so this file can be used both server- and client-side.
var window = window || global;


(function(attachTo) {

    var noop = function() {};


    function GameObject() {

        // An object to hold all the renderable THREE objects (meshes, lights,
        // etc.)
        this.renderables = [];

        // Create a 'targetable' flag - if truthy, it means a player
        // can target this GameObject
        this.targetable = 0;
        this.isTargeted = 0;
        this.boundingSphere = null;
        this.targetOutline = null;

        this.health = 100;

        // Call the initialization function
		this.initialize.apply(this, arguments);
    }


    GameObject.prototype = {
        // The default, no-op tick function. Required by the Renderer. Override
        // with your own if necessary.
        tick: noop,

        // A default, no-op initialize function. Override it with your own
        // functionality.
        initialize: noop,

        // Fill this function in with one that returns a THREE geometry object.
        getGeometry: noop,

        // A link to the scene manager. Link create when added to sceneManager.
        sceneManager: null,
        sceneLevel: null,

        loadCollada: function(url, callback) {
        	var dae, skin;

        	var loader = new THREE.ColladaLoader();
            loader.options.convertUpAxis = true;

        	loader.load( url, function ( collada ) {
        		dae = collada.scene;
        		skin = collada.skins[ 0 ];

        		dae.scale.x = dae.scale.y = dae.scale.z = 0.3;
        		dae.updateMatrix();

                // dae.rotation.y = -90 / (Math.PI*180);

        		callback(dae, skin);
        	} );
        },

        target: function() {
            var geometry = this.getGeometry(),
                cloneMesh = this.mesh;

            if(!geometry || !cloneMesh) {
                console.log('!geometry for target()')
                return;
            }

            if(!this.boundingSphere) {
                geometry.computeBoundingBox();

                this.boundingSphere = {
                    size: geometry.boundingSphere.radius,
                    material: new THREE.MeshBasicMaterial({
                        wireframe: true,
                        wireframeLinewidth: 1,
                        color: 0xff0000
                    })
                };

                this.boundingSphere.geometry = new THREE.PlaneGeometry(
                    this.boundingSphere.size/2,
                    this.boundingSphere.size/2
                );

                this.boundingSphere.mesh = new THREE.Mesh(
                    this.boundingSphere.geometry,
                    this.boundingSphere.material
                );

                this.boundingSphere.mesh.useQuaternion = true;

                this.boundingSphere.meshClone = this.mesh.clone();
                this.boundingSphere.meshClone.scale.x =
                    this.boundingSphere.meshClone.scale.y =
                    this.boundingSphere.meshClone.scale.z = 0.01;
            }

            sceneManager.foreground.scene.add(this.boundingSphere.mesh);
            sceneManager.foreground.scene.add(this.boundingSphere.meshClone);


            this.isTargeted = 1;
        },

        untarget: function() {
            this.isTargeted = 0;

            if(this.boundingSphere) {
                sceneManager.foreground.scene.remove(this.boundingSphere.mesh);
            }
        },

        remove: function(obj) {
            this.sceneManager.removeRenderable(this.sceneLevel, obj);
        },

        hit: function( bullet ) {
            if(this.health <= 0) return;

            this.health -= bullet.power;
            console.log(this.health);

            if(this.health <= 0) {
                this.kill();
            }
        },

        kill: function() {
            console.log('killed');
        }
    };


    // Make sure this constructor can be "sub-classed"
    GameObject.extend = attachTo.Inheritance.extend;


    // Add the GameObject constructor to the specified parent object.
    attachTo.GameObject = GameObject;

}(window));