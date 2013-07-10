/**
*	@requires utils, Weapon.js, ParticleWeapon.js
*/
var PlasmaCannon = Weapon.extend({
	initialize: function() {
		console.log('PlasmaCannon', arguments);
		ParticleWeapon.prototype.initialize.apply(this, arguments);

		var config = CONFIG.plasmaCannon;
	}
});