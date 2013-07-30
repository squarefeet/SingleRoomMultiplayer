function HUD( options ) {

	this.options = {
		controls: null
	};

	if( options ) {
		for( var i in options ) {
			this.options[i] = options[i];
		}
	}

	this.fillColor = new THREE.Color();
	
	this.elements = {};
	this._makeElements();
	this.setColor();

	this.tick = this.tick.bind( this );
}

HUD.prototype = {

	prevForwardSpeed: 0,

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

	_makeReticule: function() {
		var elements = this.elements;

		elements.reticule = document.createElement('div');
		elements.reticule.className = 'hud-reticule';

		this.elements.wrapper.appendChild( elements.reticule );
	},

	_makeSpeedIndicators: function() {
		var elements = {};

		elements.leftBackground = document.createElement('div');
		elements.leftBackground.className = 'hud-speedIndicator left';
		elements.rightBackground = document.createElement('div');
		elements.rightBackground.className = 'hud-speedIndicator right';

		elements.leftIndicatorWrapper = document.createElement('div');
		elements.leftIndicatorWrapper.className = 'hud-speedIndicator left';
		elements.rightIndicatorWrapper = document.createElement('div');
		elements.rightIndicatorWrapper.className = 'hud-speedIndicator right';

		elements.leftIndicator = document.createElement('div');
		elements.leftIndicator.className = 'hud-indicator';
		elements.rightIndicator = document.createElement('div');
		elements.rightIndicator.className = 'hud-indicator';

		elements.leftIndicatorWrapper.appendChild( elements.leftIndicator );
		elements.rightIndicatorWrapper.appendChild( elements.rightIndicator );

		this.elements.wrapper.appendChild( elements.leftBackground );
		this.elements.wrapper.appendChild( elements.rightBackground );
		this.elements.wrapper.appendChild( elements.leftIndicatorWrapper );
		this.elements.wrapper.appendChild( elements.rightIndicatorWrapper );

		this.elements.speedIndicators = elements;
	},


	_makeElements: function() {
		var elements = this.elements;

		elements.wrapper = document.createElement( 'div' );
		elements.wrapper.className = 'hud-wrapper';

		// Weapon indicators
		elements.weaponIndicators = {};
		this._makeWeaponIndicator( 'primary' );
		this._makeWeaponIndicator( 'secondary' );

		// Create reticule
		this._makeReticule();
		this._makeSpeedIndicators();
	},

	_setElementColor: function( el, prop, base, newColor ) {
		var color = this.fillColor;

		color.setHSL( base.h, base.s, base.l );
		color.offsetHSL( newColor.h, newColor.s, newColor.l );

		if( prop !== 'border' ) {
			el.style[ prop ] = utils.makeCSSRGBAString( 
				color.r * 255,
				color.g * 255,
				color.b * 255,
				base.a + newColor.a
			);
		}
		else {
			el.style[ prop ] = '1px solid ' + utils.makeCSSRGBAString( 
				color.r * 255,
				color.g * 255,
				color.b * 255,
				base.a + newColor.a
			);
		}
	},


	addToDOM: function() {
		document.body.appendChild( this.elements.wrapper );
	},

	setColor: function() {
		var config = CONFIG.hud,
			configColor = config.color,
			h = configColor.h,
			s = configColor.s,
			l = configColor.l,
			a = configColor.a,

			color = this.fillColor,

			textAdjustment = config.textAdjustment,
			weaponIndicatorAdjustment = config.weaponIndicatorAdjustment,
			speedIndicatorAdjustment = config.speedIndicatorAdjustment,
			speedIndicatorOverlayAdjustment = config.speedIndicatorOverlayAdjustment,
			reticuleAdjustment = config.reticuleAdjustment;


		this._setElementColor( 
			this.elements.wrapper, 
			'color', 
			configColor,
			textAdjustment
		);

		var weaponIndicators = this.elements.weaponIndicators;
		for( var i in weaponIndicators ) {

			this._setElementColor(
				weaponIndicators[i].wrapper,
				'backgroundColor',
				configColor,
				weaponIndicatorAdjustment
			);

			this._setElementColor(
				weaponIndicators[i].wrapper,
				'border',
				configColor,
				weaponIndicatorAdjustment
			);
		}


		// Set reticule color
		this._setElementColor(
			this.elements.reticule,
			'backgroundColor',
			configColor,
			reticuleAdjustment
		);


		// Set speed indicator colors
		var speedIndicators = this.elements.speedIndicators;

		this._setElementColor(
			speedIndicators.leftBackground,
			'backgroundColor',
			configColor,
			speedIndicatorAdjustment
		);

		this._setElementColor(
			speedIndicators.rightBackground,
			'backgroundColor',
			configColor,
			speedIndicatorAdjustment
		);

		this._setElementColor(
			speedIndicators.leftIndicator,
			'backgroundColor',
			configColor,
			speedIndicatorAdjustment
		);

		this._setElementColor(
			speedIndicators.rightIndicator,
			'backgroundColor',
			configColor,
			speedIndicatorAdjustment
		);
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
		var controls = this.options.controls,
			forwardSpeed = controls.getAbsoluteForwardSpeedAsPercentage();


		// Only draw if value has updated.
		if(this.prevForwardSpeed !== forwardSpeed) {
			this.elements.speedIndicators.leftIndicator.style.height = forwardSpeed * 100 + '%';
			this.prevForwardSpeed = forwardSpeed;
		}

	}

};