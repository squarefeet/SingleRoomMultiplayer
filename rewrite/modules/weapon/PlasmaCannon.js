/**
*	@requires utils, Weapon.js, ParticleWeapon.js
*/
var PlasmaCannon = Weapon.extend({
	initialize: function( options ) {
		Weapon.prototype.initialize.apply(this, arguments);

		this.fireTimers = {};
		this.phase = false;
		this.fireRate = options.rate;
	},

	_fireSingle: function( playerID, position, quaternion, velocity, target ) {
        var obj = this._getFromPool();

        this.phase = !this.phase;

        this._setupObject( obj, position, quaternion, velocity, this.phase );
        this.activeObjects.push( obj );

        obj.userData.target = target;
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

        this.fireTimers[ playerID ] = setInterval( function() {
            that._fireSingle( playerID, position, quaternion, velocity, target );
            that._fireSingle( playerID, position, quaternion, velocity, target );
        }, this.fireRate );
    },

    stopFiring: function( playerID ) {
        clearInterval( this.fireTimers[ playerID ] );
    },
});