function GameObject() {
	this.targetable = 0;

	this.health = 100;
	this.team = null;

	this.collideWithParticleWeapons = 0;
	this.collideWithGeometryWeapons = 0;
	this.collideWithGameObjects = 0;

	this.checkedCollisionWithGameObjects = 0;

	this.renderables = [];
	

	this.checkCollision = function( objects, obj, threshold ) {
		for(var i = 0; i < objects.length; ++i ) {
			if( objects[i].position.distanceTo( obj.position ) < threshold ) {
				return true;
			}
		}
	};



	this.onCollision = function( ) {

	};
}

GameObject.extend = utils.extend;