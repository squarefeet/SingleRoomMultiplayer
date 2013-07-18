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
	this._drawCanvas();
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

	_makeCanvas: function() {
		var elements = this.elements,
			canvas = document.createElement('canvas'),
			ctx = canvas.getContext( '2d' );

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		elements.canvas = canvas;
		elements.ctx = ctx;

		this.elements.canvas = elements;
		this.elements.wrapper.appendChild( canvas );
	},

	_makeElements: function() {
		var elements = this.elements;

		elements.wrapper = document.createElement( 'div' );
		elements.wrapper.className = 'hud-wrapper';

		// Weapon indicators
		elements.weaponIndicators = {};
		this._makeWeaponIndicator( 'primary' );
		this._makeWeaponIndicator( 'secondary' );

		// Create canvas element for reticule and other elements that can't be made
		// easily using DOM elements
		this._makeCanvas();
	},

	_drawSpeedIndicators: function( ctx, color, x, y, h, s, l, a ) {
		color.setHSL(h, s, l);
		ctx.fillStyle = utils.makeCSSRGBAString( 
			color.r * 255, color.g * 255, color.b * 255, a + CONFIG.hud.speedAdjustment.a 
		);
		ctx.beginPath();
		ctx.arc( x, y, 116, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.fill();

		// Cut out the middle of the circle just drawn
		ctx.fillStyle = utils.makeCSSRGBAString( 
			color.r * 255, color.g * 255, color.b * 255, 1
		);
		ctx.globalCompositeOperation = 'destination-out';

		ctx.save();
		ctx.scale(1, 1.1);
		ctx.beginPath();
		ctx.arc( x, y/1.1, 100, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.fill();
		ctx.restore();

		ctx.fillRect( x - 10, y, 20, 150 );
		ctx.fillRect( x - 150, y, 300, -150);
	},

	_drawReticule: function( ctx, color, x, y, h, s, l, a ) {
		color.setHSL(h, s, l);
		color.offsetHSL( CONFIG.hud.reticuleAdjustment.h, CONFIG.hud.reticuleAdjustment.s, CONFIG.hud.reticuleAdjustment.l );

		ctx.fillStyle = utils.makeCSSRGBAString( 
			color.r * 255, color.g * 255, color.b * 255, a + CONFIG.hud.reticuleAdjustment.a 
		);
		ctx.lineWidth = 8;
		ctx.globalCompositeOperation = 'source-over';

		// Draw reticule
		ctx.beginPath();
		ctx.arc( x, y, 15, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.fill();

		ctx.fillStyle = utils.makeCSSRGBAString( 
			color.r * 255, color.g * 255, color.b * 255, 1
		);
		ctx.beginPath();
		ctx.arc( x, y, 7, 0, Math.PI * 2, false);
		ctx.fill();

		ctx.moveTo( x, y );
		ctx.lineTo( x, y - 16 );

		ctx.moveTo( x, y );
		ctx.lineTo( x - 15, y + 10 );

		ctx.moveTo( x, y );
		ctx.lineTo( x + 15, y + 10 );
		ctx.closePath();
		ctx.stroke();

		// Draw reticule center dot
		ctx.globalCompositeOperation = 'source-over';

		color.setHSL(h, s, l);
		color.offsetHSL( CONFIG.hud.reticuleAdjustment.h, CONFIG.hud.reticuleAdjustment.s, CONFIG.hud.reticuleAdjustment.l );

		ctx.fillStyle = utils.makeCSSRGBAString( 
			color.r * 255, color.g * 255, color.b * 255, a + CONFIG.hud.reticuleAdjustment.a 
		);

		ctx.beginPath();
		ctx.arc( x, y, 1, 0, Math.PI * 2, false);
		ctx.closePath();
		ctx.fill();
	},


	_drawCanvas: function() {
		var ctx = this.elements.canvas.ctx,
			middleX = window.innerWidth/2,
			middleY = window.innerHeight/2,

			configColor = CONFIG.hud.color,
			h = configColor.h,
			s = configColor.s,
			l = configColor.l,
			a = configColor.a,
			color = this.fillColor;





		// Draw speed indicators
		this._drawSpeedIndicators( ctx, color, middleX, middleY, h, s, l, a );

		this._drawReticule( ctx, color, middleX, middleY, h, s, l, a );
		
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
			weaponIndicatorAdjustment = config.weaponIndicatorAdjustment;

		// Set base text color
		color.setHSL( h, s, l );
		color.offsetHSL( textAdjustment.h, textAdjustment.s, textAdjustment.l );

		this.elements.wrapper.style.color = utils.makeCSSRGBAString( 
			color.r * 255, color.g * 255, color.b * 255, a + textAdjustment.a 
		);


		// Set weapon indicator colors
		color.setHSL( h, s, l );
		color.offsetHSL( weaponIndicatorAdjustment.h, weaponIndicatorAdjustment.s, weaponIndicatorAdjustment.l );

		var weaponIndicators = this.elements.weaponIndicators;
		for( var i in weaponIndicators ) {
			weaponIndicators[i].wrapper.style.backgroundColor = utils.makeCSSRGBAString( 
				color.r * 255, color.g * 255, color.b * 255, a + weaponIndicatorAdjustment.a 
			);
			weaponIndicators[i].wrapper.style.border = '1px solid ' + utils.makeCSSRGBAString( 
				color.r * 255, color.g * 255, color.b * 255, a + weaponIndicatorAdjustment.a - 0.5 
			);
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