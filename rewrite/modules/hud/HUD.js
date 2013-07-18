function HUD( options ) {

	this.options = {
		controls: null
	};

	if( options ) {
		for( var i in options ) {
			this.options[i] = options[i];
		}
	}

	this.elements = {};
	this._makeElements();
	this.setColor();
}

HUD.prototype = {

	_makeWeaponIndicator: function( type ) {
		var elements = {},
			weapons = CONFIG.weapons.names[ type ];

		elements.wrapper = document.createElement( 'div' );
		elements.wrapper.className = 'hud-' + type + 'WeaponIndicator';

		elements.weapons = [];

		for( var i = 0; i < weapons.length; ++i ) {
			var weapon = document.createElement('div');
			weapon.textContent = weapons[i];
			weapon.className = 'hud-weapon hud-' + i + (i === 0 ? ' active' : '');
			elements.weapons.push( weapon );
			elements.wrapper.appendChild( weapon );
		}

		this.elements.wrapper.appendChild( elements.wrapper );
		this.elements.weaponIndicators[type] = elements;
	},

	_makeElements: function() {
		var elements = this.elements;

		elements.wrapper = document.createElement( 'div' );
		elements.wrapper.className = 'hud-wrapper';

		// Weapon indicators
		elements.weaponIndicators = {};
		this._makeWeaponIndicator( 'primary' );
		this._makeWeaponIndicator( 'secondary' );
	},

	addToDOM: function() {
		document.body.appendChild( this.elements.wrapper );
	},

	setColor: function() {
		var config = CONFIG.hud,
			configColor = config.color,
			h = utils.scaleNumber( configColor.h, 0, 360, 0, 1),
			s = utils.scaleNumber( configColor.s, 0, 100, 0, 1),
			l = utils.scaleNumber( configColor.l, 0, 100, 0, 1),
			a = configColor.a,

			color = new THREE.Color(),

			textAdjustment = config.textAdjustment,
			weaponIndicatorAdjustment = config.weaponIndicatorAdjustment;

		// Set base text color
		color.setHSL( h, s, l );
		color.offsetHSL( textAdjustment.h, textAdjustment.s, textAdjustment.l );
		this.elements.wrapper.style.color = utils.makeCSSRGBAString( color.r, color.g, color.b, a + textAdjustment.a );

		// Set weapon indicator colors
		color.setHSL( h, s, l );
		color.offsetHSL( weaponIndicatorAdjustment.h, weaponIndicatorAdjustment.s, weaponIndicatorAdjustment.l );

		var weaponIndicators = this.elements.weaponIndicators;
		for( var i in weaponIndicators ) {
			weaponIndicators[i].wrapper.style.backgroundColor = utils.makeCSSRGBAString( color.r, color.g, color.b, a + weaponIndicatorAdjustment.a );
			weaponIndicators[i].wrapper.style.border = '1px solid ' + utils.makeCSSRGBAString( color.r, color.g, color.b, a + weaponIndicatorAdjustment.a - 0.5 );
		}

	},


	selectWeapon: function( type, index ) {
		var elements = this.elements.weaponIndicators[ type ].weapons;

		for( var i = 0; i < elements.length; ++i ) {
			if(i === index) {
				elements[i].classList.add( 'active' );
			}
			else {
				elements[i].classList.remove( 'active' );
			}
		}
	},

	renderHit: function() {
		var that = this;

		this.elements.wrapper.classList.add('hit');

		setTimeout(function() {
			that.elements.wrapper.classList.remove('hit');
		}, 50);
	},

	tick: function() {

	}

};