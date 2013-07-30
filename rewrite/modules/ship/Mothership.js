function Mothership( options ) {

    GameObject.call( this );

    this.collideWithWeapons = 1;
    this.targetable = 1;

    this.controls = null;

    this.mesh = ASSET_LOADER.loaded.models[ options.model ].dae.clone();
    
    // this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = CONFIG.ship.scale;

    this.mesh.position.setX( options.x );
    this.mesh.position.setY( options.y );
    this.mesh.position.setZ( options.z );

    // this._addControls();

    this.renderables.push( this.mesh );
}

Mothership.prototype = {
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
    }
};