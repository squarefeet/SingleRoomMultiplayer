function Ship( options ) {

    this.controls = null;
    this.emitter = null;
    this.particleGroup = options.particleGroup;
    this.booster = null;
    this.weapons = {};

    this.mesh = assetLoader.loaded.models[ options.model ].dae.clone();
    this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = CONFIG.ship.scale;
    this.mesh.position.setX( options.x );
    this.mesh.position.setY( options.y );
    this.mesh.position.setZ( options.z );

    this._addControls();
    this._addWeapons();

    if( options.useEmitter && this.particleGroup ) {
        this._addEmitter( this.particleGroup );
    }
    else {
        this._addBooster();
    }



    this.renderables = [];
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
        renderer.addPreRenderTickFunction( controls.tick );
    },

    _addEmitter: function( particleGroup ) {
        CONFIG.engineEmitter.position = this.mesh.position;

        var emitter = new ParticleEmitter( CONFIG.engineEmitter );

        emitter.position = this.mesh.position;

        emitter.initialize();

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
                map: assetLoader.loaded.textures[ config.texture ],
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
        renderer.addPreRenderTickFunction( this.weapons.plasmaCannon.tick );

        layerManager.addObject3dToLayer( 'middleground', this.weapons.plasmaCannon.mesh );
    },

    getRenderables: function() {
        return this.renderables;
    }
};