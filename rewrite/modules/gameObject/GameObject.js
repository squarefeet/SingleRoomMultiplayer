function GameObject() {
	this.isTargetable = 0;
	
	this.collideWithParticleWeapons = 0;
	this.collideWithGeometryWeapons = 0;
	this.collideWithGameObjects = 0;

	this.renderables = [];
	

	this.checkCollision = function( objects, obj, threshold ) {
		for(var i = 0; i < objects.length; ++i ) {
			if( objects[i].position.distanceTo( obj.position ) < threshold ) {
				return true;
			}
		}
	};
}

GameObject.extend = utils.extend;