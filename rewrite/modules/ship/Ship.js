function Ship( options ) {

    GameObject.call( this );

    this.collideWithWeapons = 1;
    this.collideWithGameObjects = 1;
    this.targetable = 1;

    this.controls = null;
    this.emitter = null;
    this.particleGroup = options.particleGroup;
    this.booster = null;
    this.weapons = {};

    this.mesh = new THREE.Object3D();


    var shipModel = ASSET_LOADER.loaded.models[ options.model ].dae.clone();
    shipModel.scale.x = shipModel.scale.y = shipModel.scale.z = CONFIG.ship.scale;
    

    this.boundingModel = ASSET_LOADER.loaded.models[ '../../res/models/crosswingBounding2.dae' ].dae.clone();
    this.boundingModel.scale.x = boundingModel.scale.y = boundingModel.scale.z = CONFIG.ship.scale;
    this.boundingModel.visible = false;
    this.boundingModel.children[0].visible = false;

    this.mesh.position.setX( options.x );
    this.mesh.position.setY( options.y );
    this.mesh.position.setZ( options.z );

    this.mesh.add( shipModel );
    this.mesh.add( boundingModel );

    if( options.controls ) {
        this._addControls();
    }

    if( options.useEmitter && this.particleGroup ) {
        this._addEmitter( this.particleGroup );
    }
    else {
        this._addBooster();
    }

    this.renderables.push( this.mesh );
}

Ship.prototype = {
    getBoundingModel: function() {
        return this.boundingModel;
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

    _addEmitter: function( particleGroup ) {

        var emitter = new ShaderParticleEmitter( _.extend({
            position: this.mesh.position
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