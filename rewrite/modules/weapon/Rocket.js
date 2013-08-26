/**
*	@requires utils, Weapon.js
*/
var Rocket = function( model, material, scale, velocity, lerpAmount ) {
    var pos = Number.NEGATIVE_INFINITY;

    this.model = model.clone();

    if( scale ) {
        this.model.scale.set( scale, scale, scale );
    }
    
    this.model.position.set( pos, pos, pos );

    this.model.userData.velocity = (new THREE.Vector3()).copy( velocity );
    this.model.userData.age = 0;
    this.model.userData.lerpAmount = lerpAmount;
    this.model.userData.distanceToTarget = Number.POSITIVE_INFINITY;
    this.model.userData.target = null;

    this.model.children[0].geometry.computeBoundingBox();

    this.boundingBox = this.model.children[0].geometry.boundingBox;
    
    this.mesh = this.model.children[0];

    if( CONFIG.drawBoundingBoxes ) {
        this.mesh.add( utils.createDrawableBoundingBox( this.boundingBox ) );
    }
    
    this.onCollision = function() {
        this.model.userData.age = Number.POSITIVE_INFINITY;
    };
};


var Rockets = Weapon.extend({
	initialize: function( options ) {
		Weapon.prototype.initialize.apply(this, arguments);

		this.fireTimers = {};
		this.phase = false;
		this.fireRate = options.rate;

        // Store particle groups
        this.particleGroup = options.particleGroup;
	},

	_fireSingle: function( playerID, position, quaternion, velocity, target ) {
        var obj = this._getFromPool();
        var emitter = this._getFromEmitterPool();

        this.phase = !this.phase;

        this._setupObject( obj, position, quaternion, velocity, this.phase, emitter );
        this.activeObjects.push( obj );

        obj.model.userData.target = target;
        obj.model.userData.playerID = playerID;
    },

    fire: function( playerID, position, quaternion, velocity, target ) {
        // if( !target || !(target instanceof THREE.Object3D) ) return;

        var that = this;

        // Make sure we're not firing too often
        if( Date.now() - this.launchTimes[ playerID ] < this.launchGap ) {
            return;
        }

        this.launchTimes[ playerID ] = Date.now();

        this._fireSingle( playerID, position, quaternion, velocity, target );
        this._fireSingle( playerID, position, quaternion, velocity, target );
    },
});