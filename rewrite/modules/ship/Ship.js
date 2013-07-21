function Ship( options ) {

    GameObject.call( this );

    this.collideWithWeapons = 1;

    this.controls = null;
    this.emitter = null;
    this.particleGroup = options.particleGroup;
    this.booster = null;
    this.weapons = {};

    this.mesh = ASSET_LOADER.loaded.models[ options.model ].dae.clone();
    this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = CONFIG.ship.scale;
    this.mesh.position.setX( options.x );
    this.mesh.position.setY( options.y );
    this.mesh.position.setZ( options.z );

    var boundingBox = this.mesh.children[0].geometry.boundingBox

    this.mesh.__center = new THREE.Vector3(
        boundingBox.max.x - boundingBox.min.x,
        boundingBox.max.y - boundingBox.min.y,
        boundingBox.max.z - boundingBox.min.z
    );

    this._addControls();
    // this._addWeapons();

    if( options.useEmitter && this.particleGroup ) {
        this._addEmitter( this.particleGroup );
    }
    else {
        this._addBooster();
    }

    this.renderables.push( this.mesh );
}

Ship.prototype = {
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