function HUD( options ) {
	this.elements = {};


	this._makeElements();
}

HUD.prototype = {

	_makePrimaryWeaponIndicator: function() {
		var elements = {};
		
		elements.wrapper = document.createElement( 'div' );
		elements.wrapper.className = 'hud-primaryWeaponIndicator';

		// 1st weapon
		elements.weaponOne = document.createElement('div');
		elements.weaponOne.textContent = 'Pulse Cannon';
		elements.weaponOne.className = 'hud-weapon hud-one active';

		// 2nd weapon
		elements.weaponTwo = document.createElement('div');
		elements.weaponTwo.textContent = 'Plasma Cannon';
		elements.weaponTwo.className = 'hud-weapon hud-two';

		elements.wrapper.appendChild( elements.weaponOne );
		elements.wrapper.appendChild( elements.weaponTwo );

		elements.weapons = [ elements.weaponOne, elements.weaponTwo ];

		this.elements.wrapper.appendChild( elements.wrapper );

		this.elements.primaryWeaponIndicator = elements;
	},

	_makeSecondaryWeaponIndicator: function() {
		var elements = {};
		
		elements.wrapper = document.createElement( 'div' );
		elements.wrapper.className = 'hud-secondaryWeaponIndicator';

		// 1st weapon
		elements.weaponOne = document.createElement('div');
		elements.weaponOne.textContent = 'Sidewinder';
		elements.weaponOne.className = 'hud-weapon hud-one active';

		// 2nd weapon
		elements.weaponTwo = document.createElement('div');
		elements.weaponTwo.textContent = 'Hellfire';
		elements.weaponTwo.className = 'hud-weapon hud-two';

		elements.wrapper.appendChild( elements.weaponOne );
		elements.wrapper.appendChild( elements.weaponTwo );

		elements.weapons = [ elements.weaponOne, elements.weaponTwo ];

		this.elements.wrapper.appendChild( elements.wrapper );

		this.elements.secondaryWeaponIndicator = elements;
	},

	_makeElements: function() {
		var elements = this.elements;

		elements.wrapper = document.createElement( 'div' );
		elements.wrapper.className = 'hud-wrapper';

		// Weapon indicators
		this._makePrimaryWeaponIndicator();
		this._makeSecondaryWeaponIndicator();
	},

	addToDOM: function() {
		document.body.appendChild( this.elements.wrapper );
	},

	selectWeapon: function( type, index ) {
		var elements;

		if( type === 'primary' ) {
			elements = this.elements.primaryWeaponIndicator.weapons;
		}
		else {
			elements = this.elements.secondaryWeaponIndicator.weapons;
		}


		for( var i = 0; i < 2; ++i ) {
			elements[i].classList.toggle( 'active' );
		}
	},


	renderHit: function() {
		var that = this;

		this.elements.wrapper.classList.add('hit');

		setTimeout(function() {
			that.elements.wrapper.classList.remove('hit');
		}, 50);
	}

};