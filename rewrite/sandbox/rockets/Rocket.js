function Rocket( options ) {

    this.pool = [];
    this.activeRockets = [];
    this.model = options.model;

    // Create a parent mesh that'll hold all the rockets
    this.mesh = new THREE.Object3D();

    // Create a pool of rockets
    this._makeRockets();

    // TEMPORARY
    this.targetMesh = new THREE.Mesh( new THREE.CubeGeometry(100, 100, 100), this.material );
    this.targetMesh.position.set(-1000, 2000, 1000);
    this.mesh.add( this.targetMesh );

    // Reused objects
    this.targetMatrix = new THREE.Matrix4();
    this.targetQuaternion = new THREE.Quaternion();
    this.invertXAxisQuaternion = new THREE.Quaternion(1, 0, 0, 0);


    // Base settings
    this.acceleration = 5;
    this.velocity = 1000;
    this.maxVelocity = 1500;
    this.freeFlightDuration = 1;
    this.lerpAmount = 0.07;
    this.maxAge = 10;

    this.renderables = [];
    this.renderables.push( this.mesh );

    // Bind scope
    this.tick = this.tick.bind(this);
}

Rocket.prototype = {
    _makeSingleRocket: function() {
        var pos = Number.NEGATIVE_INFINITY;
        var model = this.model.clone(),
            userData = model.userData;

        model.position.set( pos, pos, pos );
        model.scale.set(0.02, 0.02, 0.02);
        model.useQuaternion = true;

        userData.velocity = this.velocity;
        userData.age = 0;
        userData.lerpAmount = this.lerpAmount;
        userData.distanceToTarget = Number.POSITIVE_INFINITY;
        userData.target = null;

        return model;
    },

    _makeRockets: function() {
        for(var i = 0, rocket; i < 10; ++i) {
            rocket = this._makeSingleRocket();
            this.pool.push( rocket );
            this.mesh.add( rocket );
        }
    },

    _getFromPool: function() {
        var p = this.pool,
            r;

        // Grab a rocket from the pool if one is available.
        if( p.length ) {
            r = p.pop();
        }

        // If the pool has run out, make another rocket and add it to the
        // parent mesh.
        else {
            r = this._makeSingleRocket();
        }

        this.mesh.add( r );

        return r;
    },

    _returnToPool: function( rocket ) {
        this.pool.push( rocket );
        this.mesh.remove( rocket );
    },

    _setupRocket: function( rocket, source ) {
        rocket.position.copy( source.position );
        rocket.quaternion.copy( source.quaternion );
        rocket.quaternion.multiply( this.invertXAxisQuaternion );
        rocket.translateY(50);

        this._resetRocket( rocket );
    },

    _resetRocket: function( rocket ) {
        rocket.userData.velocity = this.velocity;
        rocket.userData.age = 0;
        rocket.userData.lerpAmount = 0;
        rocket.userData.distanceToTarget = Number.POSITIVE_INFINITY;
    },

    _destroyRocket: function( rocket ) {
        // Do some sort of explosion here...

        var userData = rocket.userData;
        var pos = Number.NEGATIVE_INFINITY;

        rocket.position.set( pos, pos, pos );
        this._resetRocket( rocket );

        this._returnToPool( rocket );
    },

    fire: function( playerID, source, target ) {
        var rocket = this._getFromPool();

        this._setupRocket( rocket, source );
        this.activeRockets.push( rocket );

        rocket.userData.target = this.targetMesh;
    },

    tick: function( dt ) {
        var active = this.activeRockets,
            numActive = active.length,
            min = Math.min,
            rocket, userData;


        if( !numActive ) return;


        for(var i = 0; i < numActive; ++i ) {
            rocket = active[i];
            userData = rocket.userData;

            // If the rocket's too old, destroy it.
            if( userData.age > this.maxAge || userData.distanceToTarget < 100 ) {
                this._destroyRocket( rocket );
                active.splice(i, 1);
                --numActive;
                continue;
            }

            if( userData.velocity < this.maxVelocity ) {
                userData.velocity += this.acceleration;
            }

            userData.distanceToTarget = rocket.position.distanceTo( userData.target.position );
            userData.lerpAmount = min( this.lerpAmount, 50 / userData.distanceToTarget );

            if( userData.age > this.freeFlightDuration ) {
                this.targetMatrix.lookAt( userData.target.position, rocket.position, rocket.up );
                this.targetQuaternion.setFromRotationMatrix( this.targetMatrix );
                rocket.quaternion.slerp( this.targetQuaternion, userData.lerpAmount );
            }

            rocket.translateZ( userData.velocity * dt );
            userData.age += dt;

        }
    },

    getRenderables: function() {
        return this.renderables;
    }
};