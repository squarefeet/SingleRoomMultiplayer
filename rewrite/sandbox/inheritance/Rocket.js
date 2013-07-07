function Rocket( options ) {

    this.pool = [];
    this.emitterPool = [];
    this.activeRockets = [];
    this.launchTimes = {};

    this.model = options.model;

    // Create a parent mesh that'll hold all the rockets
    this.mesh = new THREE.Object3D();

    // Create a particle system for the rockets.
    this.particleGroup = new ParticleGroup({
        blending: THREE.AdditiveBlending,
        depthTest: true,
        texture: assetLoader.loaded.textures['../../res/textures/smokeparticle.png']
    });


    // Create a pool of rockets
    this._makeRockets();

    // Reused objects
    this.targetMatrix = new THREE.Matrix4();
    this.targetQuaternion = new THREE.Quaternion();
    this.invertXAxisQuaternion = new THREE.Quaternion(1, 0, 0, 0);


    // Base settings
    this.acceleration       = CONFIG.rocket.acceleration;
    this.velocity           = CONFIG.rocket.velocity;
    this.maxVelocity        = CONFIG.rocket.maxVelocity;
    this.freeFlightDuration = CONFIG.rocket.freeFlightDuration;
    this.lerpAmount         = CONFIG.rocket.lerpAmount;
    this.maxAge             = CONFIG.rocket.maxAge;
    this.launchGap          = CONFIG.rocket.launchGap;

    // Add objects to the scene
    this.renderables = [];
    this.renderables.push( this.mesh );
    layerManager.addObject3dToLayer('middleground', this.particleGroup.mesh );

    // Add particle group tick to renderer
    var that = this;
    renderer.addPreRenderTickFunction( function() {
        that.particleGroup.update(0.016);
    });

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

    _makeEmitter: function() {
        var emitter = new ParticleEmitter( CONFIG.rocketEmitter );
        emitter.initialize();
        // emitter.alive = 0;
        this.particleGroup.addEmitter( emitter );
        return emitter;
    },

    _makeRockets: function() {
        for(var i = 0, rocket, emitter; i < 1; ++i) {
            rocket = this._makeSingleRocket();
            emitter = this._makeEmitter();
            this.pool.push( rocket );
            this.emitterPool.push( emitter );
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

    _getFromEmitterPool: function() {
        var p = this.emitterPool,
            r;

        // Grab a rocket from the pool if one is available.
        if( p.length ) {
            r = p.pop();
        }

        return r;
    },

    _returnToEmitterPool: function( emitter ) {
        // emitter.alive = 0;
        this.emitterPool.push( emitter );
    },

    _setupRocket: function( rocket, source, emitter ) {
        rocket.position.copy( source.position );
        rocket.quaternion.copy( source.quaternion );
        rocket.quaternion.multiply( this.invertXAxisQuaternion );
        rocket.translateY(50);

        if( emitter ) {
            emitter.position = rocket.position;
            emitter.initialize();
            emitter.alive = 1;
            rocket.userData.emitter = emitter;
        }

        this._resetRocket( rocket );
    },

    _resetRocket: function( rocket ) {
        rocket.userData.velocity = this.velocity;
        rocket.userData.age = 0;
        rocket.userData.lerpAmount = this.lerpAmount;
        rocket.userData.distanceToTarget = Number.POSITIVE_INFINITY;
    },

    _destroyRocket: function( rocket ) {
        // Do some sort of explosion here...

        var userData = rocket.userData;
        var pos = Number.NEGATIVE_INFINITY;

        rocket.position.set( pos, pos, pos );
        this._resetRocket( rocket );

        this._returnToPool( rocket );

        if( rocket.userData.emitter ) {
            this._returnToEmitterPool( rocket.userData.emitter );
        }
    },

    fire: function( playerID, source, target ) {
        if( !target || !(target instanceof THREE.Object3D) ) return;

        // Make sure we're not firing too often
        if( Date.now() - this.launchTimes[ playerID ] < this.launchGap ) {
            return;
        }

        this.launchTimes[ playerID ] = Date.now();

        var rocket = this._getFromPool();
        var emitter = this._getFromEmitterPool();

        this._setupRocket( rocket, source );
        this.activeRockets.push( rocket );

        rocket.userData.target = target;
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
            userData.lerpAmount = min( this.lerpAmount, 30 / userData.distanceToTarget );

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