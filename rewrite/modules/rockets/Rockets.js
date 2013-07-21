


function Rockets( options ) {

    this.pool = [];
    this.emitterPool = [];
    this.activeRockets = [];
    this.launchTimes = {};

    // Base settings
    this.acceleration       = options.acceleration;
    this.velocity           = options.velocity;
    this.maxVelocity        = options.maxVelocity;
    this.freeFlightDuration = options.freeFlightDuration;
    this.lerpAmount         = options.lerpAmount;
    this.maxAge             = options.maxAge;
    this.launchGap          = options.launchGap;

    this.model = ASSET_LOADER.loaded.models[ options.model ].dae.clone();

    // Create a parent mesh that'll hold all the rockets
    this.mesh = new THREE.Object3D();

    // Store particle groups
    this.particleGroup = options.particleGroup;

    // Create a pool of rockets
    this._makeRockets();

    // Reused objects
    this.targetMatrix = new THREE.Matrix4();
    this.targetQuaternion = new THREE.Quaternion();
    this.invertXAxisQuaternion = new THREE.Quaternion(1, 0, 0, 0);




    console.log(options)

    // Add objects to the scene
    this.renderables = [];
    this.renderables.push( this.mesh );

    // Bind scope
    this.tick = this.tick.bind(this);
}

Rockets.prototype = {
    _makeSingleRocket: function() {
        var pos = Number.NEGATIVE_INFINITY;
        var model = this.model.clone(),
            userData = model.userData;

        model.position.set( pos, pos, pos );
        model.scale.set(0.02, 0.02, 0.02);
        model.useQuaternion = true;

        userData.velocity = (new THREE.Vector3()).copy( this.velocity );
        userData.age = 0;
        userData.lerpAmount = this.lerpAmount;
        userData.distanceToTarget = Number.POSITIVE_INFINITY;
        userData.target = null;

        return model;
    },

    _makeEmitter: function() {
        var emitter = new ShaderParticleEmitter( CONFIG.particleEmitters.rockets );
        this.particleGroup.addEmitter( emitter );
        return emitter;
    },

    _makeRockets: function() {
        for(var i = 0, rocket, emitter, explosionEmitter; i < 40; ++i) {
            rocket = this._makeSingleRocket();
            emitter = this._makeEmitter();

            this.pool.push( rocket );
            this.emitterPool.push( emitter );
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
            r.alive = 1;
        }

        return r;
    },

    _returnToEmitterPool: function( emitter ) {
        if(emitter) {
            emitter.userData.rocket = null;
            emitter.alive = 0;
            this.emitterPool.push( emitter );
        }
    },

    _setupRocket: function( rocket, position, quaternion, velocity, emitter ) {
        rocket.position.copy( position );
        rocket.quaternion.copy( quaternion );
        rocket.quaternion.multiply( this.invertXAxisQuaternion );
        rocket.translateY(50);

        if( emitter ) {
            emitter.userData.rocket = rocket;
            emitter.position = rocket.position;
            rocket.userData.emitter = emitter;
        }

        this._resetRocket( rocket );
    },

    _resetRocket: function( rocket ) {
        rocket.userData.velocity.copy( this.velocity );
        rocket.userData.age = 0;
        rocket.userData.lerpAmount = 0;
        rocket.userData.distanceToTarget = Number.POSITIVE_INFINITY;
    },

    _destroyRocket: function( rocket, destructionType ) {
        // Do some sort of explosion here...

        var userData = rocket.userData;
        var pos = Number.NEGATIVE_INFINITY;

        EVENTS.trigger('Rockets:destroyed', destructionType, rocket.position.x, rocket.position.y, rocket.position.z );

        rocket.position.set( pos, pos, pos );
        this._resetRocket( rocket );

        this._returnToPool( rocket );

        if( rocket.userData.emitter ) {
            this._returnToEmitterPool( rocket.userData.emitter );
        }
    },

    fire: function( playerID, position, quaternion, velocity, target ) {
        if( !target || !(target instanceof THREE.Object3D) ) return;

        // Make sure we're not firing too often
        if( Date.now() - this.launchTimes[ playerID ] < this.launchGap ) {
            return;
        }

        this.launchTimes[ playerID ] = Date.now();

        var rocket = this._getFromPool();
        var emitter = this._getFromEmitterPool();

        this._setupRocket( rocket, position, quaternion, velocity, emitter );
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

            // If the rocket's too old, or has collided, destroy it.
            if( userData.age > this.maxAge || userData.distanceToTarget < 100 ) {
                if( userData.distanceToTarget < 100 ) {
                    this._destroyRocket( rocket, Rockets.destructionTypes.hitTarget );
                }
                else if( userData.age === Number.POSITIVE_INFINITY ) {
                    this._destroyRocket( rocket, Rockets.destructionTypes.hitRocket );
                }
                else {
                    this._destroyRocket( rocket, Rockets.destructionTypes.timedOut );
                }

                active.splice(i, 1);
                --numActive;

                continue;
            }


            // if( userData.velocity.z < this.maxVelocity ) {
            //     userData.velocity.z += this.acceleration;
            // }

            userData.velocity.lerp( this.acceleration, 0.01 );

            if( userData.velocity.z > this.maxVelocity ) {
                userData.velocity.z = this.maxVelocity
            }

            userData.distanceToTarget = rocket.position.distanceTo( userData.target.position );
            userData.lerpAmount = min( this.lerpAmount, 50 / userData.distanceToTarget );

            if( userData.age > this.freeFlightDuration ) {
                this.targetMatrix.lookAt( userData.target.position, rocket.position, rocket.up );
                this.targetQuaternion.setFromRotationMatrix( this.targetMatrix );
                rocket.quaternion.slerp( this.targetQuaternion, userData.lerpAmount );
            }

            rocket.translateZ( userData.velocity.z * dt );

            userData.age += dt;

            this.checkCollisionWithOtherRockets( rocket );

            // this.checkCollisionWithWeaponColliders( rocket );
        }
    },

    checkCollisionWithOtherRockets: function( rocket ) {
        for( var i = 0; i < this.activeRockets.length; ++i ) {
            if(this.activeRockets[i] === rocket) continue;

            if( rocket.position.distanceTo( this.activeRockets[i].position ) < 20 ) {
                // Mark both rockets for destruction
                console.log('collision')

                rocket.userData.age = Number.POSITIVE_INFINITY;
                this.activeRockets[i].userData.age = Number.POSITIVE_INFINITY;

                // var newTarget = new THREE.Object3D();
                // newTarget.useQuaternion = true;
                // newTarget.position.copy( this.activeRockets[i].position );
                // newTarget.quaternion.copy( this.activeRockets[i].quaternion );
                // newTarget.translateX(1000);
                // newTarget.translateY(1000);
                // newTarget.translateZ(1000);


                // rocket.userData.oldTarget = rocket.userData.target;
                // rocket.userData.target = newTarget;

                // setTimeout(function() {
                //     newTarget = null;
                //     rocket.userData.target = rocket.userData.oldTarget;
                // }, 250);

                break;
            }
        }
    },

    checkCollisionWithWeaponColliders: function( rocket ) {
        var colliders = LAYER_MANAGER.getAllWeaponColliders();

        for( var i = 0; i < colliders.length; ++i ) {

            if( rocket.position.distanceTo( colliders[i].position ) < 500 ) {
                // Mark both rockets for destruction
                console.log('collision')

                rocket.userData.age = Number.POSITIVE_INFINITY;
                this.activeRockets[i].userData.age = Number.POSITIVE_INFINITY;

                break;
            }
        }
    },
};

Rockets.destructionTypes = Object.freeze({
    hitTarget: 0,
    hitRocket: 1,
    timedOut: 2
});


Rockets.extend = utils.extend;



// var DoubleRockets = Rockets.extend({
//     fire: function( playerID, source, target ) {
//         if( !target || !(target instanceof THREE.Object3D) ) return;

//         // Make sure we're not firing too often
//         if( Date.now() - this.launchTimes[ playerID ] < this.launchGap ) {
//             return;
//         }

//         this.launchTimes[ playerID ] = Date.now();

//         var that = this;
//         var rocket = that._getFromPool();
//         var emitter = that._getFromEmitterPool();

//         that._setupRocket( rocket, source, emitter );
//         that.activeRockets.push( rocket );

//         rocket.userData.target = target;
//         rocket.translateX( -30 );


//         setTimeout(function() {
//             var rocket = that._getFromPool();
//             var emitter = that._getFromEmitterPool();

//             that._setupRocket( rocket, source, emitter );
//             that.activeRockets.push( rocket );

//             rocket.userData.target = target;
//             rocket.translateX( 30 );
//         }, 0);
//     }
// })