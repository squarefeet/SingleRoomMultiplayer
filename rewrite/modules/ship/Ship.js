function Ship( options ) {

    GameObject.call( this );

    this.collideWithGeometryWeapons = 1;
    this.collideWithGameObjects = 1;
    this.targetable = 1;

    this.controls = null;
    this.emitter = null;
    this.particleGroup = options.particleGroup;
    this.booster = null;
    this.weapons = {};

    this.mesh = new THREE.Object3D();
    this.mesh.useQuaternion = true;


    var shipModel = ASSET_LOADER.loaded.models[ options.model ].dae.clone();
    shipModel.scale.x = shipModel.scale.y = shipModel.scale.z = CONFIG.ship.scale;
    
    this.shipModel = shipModel;

    this.boundingModel = ASSET_LOADER.loaded.models[ '../../res/models/crosswingBounding2.dae' ].dae.clone();
    this.boundingModel.scale.x = this.boundingModel.scale.y = this.boundingModel.scale.z = CONFIG.ship.scale;
    this.boundingModel.visible = false;
    this.boundingModel.children[0].visible = false;

    this.boundingModel.children[0].geometry.computeBoundingBox();

    this.boundingBox = this.boundingModel.children[0].geometry.boundingBox;
    this.boundingBox.min.multiplyScalar( CONFIG.ship.scale );
    this.boundingBox.max.multiplyScalar( CONFIG.ship.scale );
    

    this.mesh.position.setX( options.x );
    this.mesh.position.setY( options.y );
    this.mesh.position.setZ( options.z );

    this.mesh.add( this.shipModel );
    this.mesh.add( this.boundingModel );



    if( typeof options.controls === 'boolean') {
        this._addControls();
    }
    else if( typeof options.controls === 'object' ) {
        this.controls = options.controls;
    }

    if( options.useEmitter && this.particleGroup ) {
        this._addEmitter( this.particleGroup );
    }
    else if( !this.particleGroup ) {
        this._addBooster();
    }

    this.renderables.push( this.mesh );
}

Ship.prototype = {
    getBoundingModel: function() {
        return this.boundingModel.children[0];
    },

    getVelocity: function() {
        if( this.controls ) {
            return this.controls.getVelocity();
        }
    },

    onCollision: function( collisionVector ) {
        var that = this;

        if( !collisionVector ) {
            console.log( '!collisionVector' );
            return;
        }

        this.getVelocity().copy( collisionVector ).multiplyScalar( 3000 );
        this.hasCollided = true;

        setTimeout(function() {
            that.hasCollided = false;
        }, 500);
    },

    _addControls: function() {
        this.mesh.__updatePosition = true;
        this.mesh.__updateRotation = true;

        var controls = new CameraControls({
            targetCameras: [ this.mesh ]
        });

        controls.setCenterX( window.innerWidth/2 );
        controls.setCenterY( window.innerHeight/2 );

        controls.setX( window.innerWidth/2 );
        controls.setY( window.innerHeight/2 );

        this.controls = controls;
        RENDERER.addPreRenderTickFunction( controls.tick );
    },

    _addEmitter: function( particleGroup, position ) {

        var emitter = new ShaderParticleEmitter( _.extend({
            position: position || this.mesh.position
        }, CONFIG.particleEmitters.engines) );

        particleGroup.addEmitter( emitter );

        this.emitter = emitter;
    },

    _addBooster: function() {
        var config = CONFIG.engineBooster;

        var cylinder = new THREE.Mesh(
            new THREE.CylinderGeometry(
                config.radiusTop,
                config.radiusBottom,
                config.height,
                config.radiusSegments,
                config.heightSegments,
                config.openEnded
            ),
            new THREE.MeshBasicMaterial({
                map: ASSET_LOADER.loaded.textures[ config.texture ],
                transparent: true,
                blending: THREE.AdditiveBlending,
                opacity: 0.3
            })
        );
        cylinder.rotation.x = -Math.PI/2;
        cylinder.position.z += config.height/2;
        cylinder.position.y += 2;

        this.mesh.add( cylinder );
    },

    _addWeapons: function() {
        this.weapons.plasmaCannon = new PlasmaCannon({
            numBullets: 1000
        });
        RENDERER.addPreRenderTickFunction( this.weapons.plasmaCannon.tick );

        layerManager.addObject3dToLayer( 'middleground', this.weapons.plasmaCannon.mesh );
    }
};