// A base class that most weapons inherit from
function Weapon( options ) {
	if( typeof this.initialize === 'function' ) {
		this.initialize( options );
	}
}


Weapon.prototype = {
    initialize: function( options ) {
        GameObject.call( this );

        this.pool = [];
        this.activeObjects = [];
        this.launchTimes = {};


        // Base settings
        this.acceleration       = options.acceleration;
        this.velocity           = options.velocity;
        this.maxVelocity        = options.maxVelocity;
        this.freeFlightDuration = options.freeFlightDuration;
        this.lerpAmount         = options.lerpAmount;
        this.maxAge             = options.maxAge;
        this.launchGap          = options.launchGap;
        this.name               = options.name;
        this.scale              = options.scale;
        this.bulletConstructor  = options.bulletConstructor;


        // Create a parent mesh that'll hold all the rockets
        this.mesh = new THREE.Object3D();

        this.model = ASSET_LOADER.loaded.models[ options.model ].dae.clone();
        this.material = new THREE.MeshBasicMaterial({
            transparent: true,
            map: ASSET_LOADER.loaded.textures[ options.texture ],
            blending: THREE.AdditiveBlending
        });

        // Reused objects
        this.targetMatrix = new THREE.Matrix4();
        this.targetQuaternion = new THREE.Quaternion();
        this.invertXAxisQuaternion = new THREE.Quaternion(1, 0, 0, 0);

        // Add objects to the scene
        this.renderables.push( this.mesh );

        // Override some GameObject defaults
        // this.collideWithGameObjects = 1;
    },

    // Object creation functions
    _makeSingleObject: function() {
        var obj = new window[ this.bulletConstructor ] ( 
            this.model, 
            this.material, 
            this.scale, 
            this.velocity, 
            this.lerpAmount 
        );

        LAYER_MANAGER.addCollider( obj );

        return obj;
    },

    _makeObjects: function() {
        for(var i = 0, obj; i < 40; ++i) {
            obj = this._makeSingleRocket();

            this.pool.push( obj );
        }
    },

    // Pool functions
    _getFromPool: function() {
        var p = this.pool,
            o;

        // Grab a obj from the pool if one is available.
        if( p.length ) {
            o = p.pop();
        }

        // If the pool has run out, make another obj and add it to the
        // parent mesh.
        else {
            o = this._makeSingleObject();
        }

        this.mesh.add( o.model );

        return o;
    },

    _returnToPool: function( obj ) {
        this.pool.push( obj );
        this.mesh.remove( obj.model );
        // obj.dispose();
    },

    _setupObject: function( obj, position, quaternion, velocity, phase ) {
        obj.model.position.copy( position );
        obj.model.quaternion.copy( quaternion );
        obj.model.quaternion.multiply( this.invertXAxisQuaternion );
        obj.model.translateX( phase ? 50 : -50 );

        this._resetObject( obj );
    },

    _resetObject: function( obj ) {
        obj.model.userData.velocity.copy( this.velocity );
        obj.model.userData.age = 0;
        obj.model.userData.lerpAmount = 0;
        obj.model.userData.distanceToTarget = Number.POSITIVE_INFINITY;
    },

    _destroyObject: function( obj, destructionType ) {
        var userData = obj.model.userData;
        var pos = Number.NEGATIVE_INFINITY;

        EVENTS.trigger('weapon:' + this.name + ':destroyed', destructionType, obj.model.position.x, obj.model.position.y, obj.model.position.z );

        obj.model.position.set( pos, pos, pos );
        this._resetObject( obj );

        this._returnToPool( obj );
    },


    fire: function( playerID, position, quaternion, velocity, target ) {
        // if( !target || !(target instanceof THREE.Object3D) ) return;

        // Make sure we're not firing too often
        if( Date.now() - this.launchTimes[ playerID ] < this.launchGap ) {
            return;
        }

        this.launchTimes[ playerID ] = Date.now();

        var obj = this._getFromPool();

        this.phase = !this.phase;

        this._setupObject( obj, position, quaternion, velocity, this.phase );
        this.activeObjects.push( obj );

        obj.model.userData.target = target;
        obj.model.playerID = playerID;
    },


    tick: function( dt ) {
        var active = this.activeObjects,
            numActive = active.length,
            min = Math.min,
            obj, userData;


        if( !numActive ) return;


        for(var i = 0; i < numActive; ++i ) {
            obj = active[i];
            userData = obj.model.userData;

            // If the obj's too old, or has collided, destroy it.
            if( userData.age > this.maxAge || (userData.target && userData.distanceToTarget < 100) ) {
                if( userData.target && userData.distanceToTarget < 100 ) {
                    this._destroyObject( obj, Rockets.destructionTypes.hitTarget );
                }
                else if( userData.age === Number.POSITIVE_INFINITY ) {
                    this._destroyObject( obj, Rockets.destructionTypes.hitRocket );
                }
                else {
                    this._destroyObject( obj, Rockets.destructionTypes.timedOut );
                }

                active.splice(i, 1);
                --numActive;

                continue;
            }


            userData.velocity.lerp( this.acceleration, 0.01 );

            if( userData.velocity.z > this.maxVelocity ) {
                userData.velocity.z = this.maxVelocity
            }

            if( userData.target ) {
                userData.distanceToTarget = obj.model.position.distanceTo( userData.target.position );
                userData.lerpAmount = min( this.lerpAmount, 50 / userData.distanceToTarget );
            }            

            if( userData.target && userData.age > this.freeFlightDuration ) {
                this.targetMatrix.lookAt( userData.target.position, obj.model.position, obj.model.up );
                this.targetQuaternion.setFromRotationMatrix( this.targetMatrix );
                obj.model.quaternion.slerp( this.targetQuaternion, userData.lerpAmount );
            }

            obj.model.translateZ( userData.velocity.z * dt );

            userData.age += dt;

            this.checkCollision( obj );
        }
    },

    checkCollision: function( obj ) {
        var colliders = LAYER_MANAGER.getGeometryWeaponColliders();

        for( var i = 0; i < colliders.length; ++i ) {
            if( obj.model.userData.playerID === colliders[i].playerID ) continue;

            if( GJK_COLLISIONS.intersect( 
                obj.mesh, 
                colliders[i].getBoundingModel()
            ) ) {
                console.log( obj.model.userData.playerID, colliders[i].playerID )
                obj.onCollision();
                break;
            }
        }
    }
};


Weapon.extend = utils.extend;