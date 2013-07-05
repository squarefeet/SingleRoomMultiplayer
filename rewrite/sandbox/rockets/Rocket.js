function Rocket() {
    this.material = new THREE.MeshBasicMaterial({
        color: 0xffffff
    });

    this.geometry = new THREE.CubeGeometry( 20, 20, 100 );

    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.mesh.useQuaternion = true;

    this.targetMesh = new THREE.Mesh( new THREE.CubeGeometry(100, 100, 100), this.material );
    this.targetMesh.position.set(-1000, 2000, 1000);

    this.target = this.targetMesh;
    this.targetMatrix = new THREE.Matrix4();
    this.targetQuaternion = new THREE.Quaternion();

    this.invertXAxisQuaternion = new THREE.Quaternion(1, 0, 0, 0);

    this.fired = false;

    this.renderables = [];
    this.renderables.push( this.mesh );
    this.renderables.push( this.targetMesh );

    this.acceleration = 50;
    this.velocity = 2000;
    this.age = 0;
    this.maxVelocity = 2000;
    this.freeFlightDuration = 0.5;
    this.lerpAmount = 0.001;

    this.tick = this.tick.bind(this);
}

Rocket.prototype = {

    fire: function( playerID, source, target ) {
        this.mesh.position.copy( source.position );
        this.mesh.quaternion.copy( source.quaternion );
        this.mesh.quaternion.multiply( this.invertXAxisQuaternion );

        this.velocity = 2000;
        this.age = 0;

        this.distanceToTarget = 0;

        this.fired = true;
    },

    tick: function( dt ) {

        if(!this.fired) return;


        if(this.target) {

            if(this.velocity < this.maxVelocity) {
                // this.velocity += this.acceleration;
            }

            this.distanceToTarget = this.mesh.position.distanceTo( this.target.position );
            this.lerpAmount = Math.min(0.07, 50/this.distanceToTarget);

            if(this.age > this.freeFlightDuration) {
                this.targetMatrix.lookAt( this.target.position, this.mesh.position, this.mesh.up );
                this.targetQuaternion.setFromRotationMatrix( this.targetMatrix );
                this.mesh.quaternion.slerp( this.targetQuaternion, this.lerpAmount );
            }

            this.mesh.translateZ( this.velocity * dt );

            this.age += dt;
        }

        // this.mesh.translateZ( -100 * dt );
    },

    getRenderables: function() {
        return this.renderables;
    }
};