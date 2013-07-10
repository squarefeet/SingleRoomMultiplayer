// A base class that most weapons inherit from
function Weapon() {
	if( typeof this.initialize === 'function' ) {
		this.initialize();
	}
}

Weapon.prototype = {

};


Weapon.extend = utils.extend;