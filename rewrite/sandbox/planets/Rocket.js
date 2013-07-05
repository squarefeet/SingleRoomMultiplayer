function Rocket() {
    this.material = new THREE.MeshPhongMaterial({
        color: 0xff00000,
        shininess: 10,
        specular: 0xffffff
    });

    this.geometry = new THREE.CubeGeometry( 10, 100, 100 );

    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.mesh.useQuaternion = true;

    this.target = null;
    this.fired = false;

    this.renderables = [];
    this.renderables.push( this.mesh );

    this.tick = this.tick.bind(this);
}

Rocket.prototype = {

    fire: function( playerID, source, target ) {
        this.mesh.position.copy( source.position );
        this.mesh.quaternion.copy( source.quaternion );

        if(this.target) {
            this.target = target;
        }
        this.fired = true;
    },

    tick: function( dt ) {

        if(!this.fired) return;

        if(this.target) {
            this.mesh.position.lerp( this.target.position, 0.2 );
            this.mesh.quaternion.slerp( this.target.quaternion, 0.2 );
        }
        else {
            this.mesh.translateZ( -1000 * dt );
        }
    },

    getRenderables: function() {
        return this.renderables;
    }
};