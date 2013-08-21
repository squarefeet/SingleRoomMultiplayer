function GameObject() {
	this.targetable = 0;

	this.health = 100;
	this.team = null;

	this.collideWithParticleWeapons = 0;
	this.collideWithGeometryWeapons = 0;
	this.collideWithGameObjects = 0;

	this.checkedCollisionWithGameObjects = 0;

	this.renderables = [];
}

GameObject.extend = utils.extend;