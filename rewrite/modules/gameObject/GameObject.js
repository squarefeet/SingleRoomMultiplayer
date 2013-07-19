function GameObject() {
	this.isTargetable = 0;
	this.collideWithWeapons = 0;
	this.renderables = [];
}

GameObject.extend = utils.extend;