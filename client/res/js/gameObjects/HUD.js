function HUD() {

	this.innerReticuleMoveScale = 0.07;
	this.outerReticuleMoveScale = 1.5;

	this.transforms = {
		reticuleOuter: { x: 0, y: 0, z: 0, scale: 1, rotate: 0 },
		reticuleInner: { x: 0, y: 0, z: 0, scale: 1, rotate: 0 },
		centerThing: { x: 0, y: 0, z: 0, scale: 1, rotate: 0 },
		centerThingOne: { x: 0, y: 0, z: 0, scale: 1, rotate: 0 },
		centerThingTwo: { x: 0, y: 0, z: 0, scale: 1, rotate: 0 },
		centerThingThree: { x: 0, y: 0, z: 0, scale: 1, rotate: 0 },
		centerThingFour: { x: 0, y: 0, z: 0, scale: 1, rotate: 0 },
		centerThingFive: { x: 0, y: 0, z: 0, scale: 1, rotate: 0 },
		centerThingSix: { x: 0, y: 0, z: 0, scale: 1, rotate: 0 },
	};

	this.elements = {
		wrapper: null,
		reticule: {},
		centerThing: {}
	};

	this.mouse = {
		x: 0,
		y: 0
	};

	this.createElements();
	this.addEvents();
}

HUD.prototype = {

	createElements: function() {
		this.elements.wrapper = document.createElement('div');
		this.elements.wrapper.className = 'hud';

		this.createReticule();
		this.createCenterThing();
		this.createTarget();

		document.body.appendChild(this.elements.wrapper);
	},

	createReticule: function() {
		var wrapper = this.elements.reticule.wrapper = document.createElement('div');
		var inner = this.elements.reticule.inner = document.createElement('div');
		var outer = this.elements.reticule.outer = document.createElement('div');

		wrapper.className = 'reticule';
		inner.className = 'inner';
		outer.className = 'outer';

		wrapper.appendChild(outer);
		wrapper.appendChild(inner);

		this.elements.wrapper.appendChild(wrapper);
	},

	createTarget: function() {
		this.elements.targetDistance = document.createElement( 'div' );
		this.elements.targetDistance.className = 'targetDistance';

		this.elements.targetAngle = document.createElement( 'div' );
		this.elements.targetAngle.className = 'targetAngle';

		this.elements.targetAngle.appendChild( this.elements.targetDistance );
		this.elements.wrapper.appendChild( this.elements.targetAngle );
	},

	createCenterThing: function() {
		var wrapper = this.elements.centerThing.wrapper = document.createElement('div');
		var one = this.elements.centerThing.one = document.createElement('div');
		var two = this.elements.centerThing.two = document.createElement('div');
		var three = this.elements.centerThing.three = document.createElement('div');
		var four = this.elements.centerThing.four = document.createElement('div');
		var five = this.elements.centerThing.five = document.createElement('div');
		var six = this.elements.centerThing.six = document.createElement('div');

		wrapper.className = 'centerThing';
		one.className = 'one';
		two.className = 'two';
		three.className = 'three';
		four.className = 'four';
		five.className = 'five';
		six.className = 'six';

		wrapper.appendChild(one);
		wrapper.appendChild(two);
		wrapper.appendChild(three);
		wrapper.appendChild(four);
		wrapper.appendChild(five);
		wrapper.appendChild(six);

		this.elements.wrapper.appendChild(wrapper);
	},

	addEvents: function() {
		this.elements.wrapper.addEventListener('mousedown', this, false);
		this.elements.wrapper.addEventListener('mousemove', this, false);
		this.elements.wrapper.addEventListener('mouseup', this, false);
	},

	handleEvent: function(e) {
		if(typeof this[e.type] === 'function') {
			this[e.type](e);
		}
	},

	mousedown: function(e) {
		var that = this;

		this.elements.reticule.wrapper.classList.add('shudder');
	},

	mousemove: function(e) {
		var halfWidth = window.innerWidth / 2,
			halfHeight = window.innerHeight / 2,
			x = (e.pageX - halfWidth) / (halfWidth * this.innerReticuleMoveScale),
			y = (e.pageY - halfHeight) / (halfHeight * this.innerReticuleMoveScale);


		this.transforms.reticuleInner.x = x;
		this.transforms.reticuleInner.y = y;
		this.transforms.reticuleOuter.x = x / this.outerReticuleMoveScale;
		this.transforms.reticuleOuter.y = y / this.outerReticuleMoveScale;

		this.updateReticule();
	},

	mouseup: function(e) {
		var that = this;
		this.elements.reticule.wrapper.classList.remove('shudder');
		this.elements.reticule.wrapper.classList.add('shudderSlow');

		setTimeout(function() {
			that.elements.reticule.wrapper.classList.remove('shudderSlow');
		}, 250);
	},

	applyTransform: function( element, transform ) {
		element.style.webkitTransform =
			'translate3d(' +
				transform.x + 'px,' +
				transform.y + 'px,' +
				transform.z + 'px' +
			')' +
			'scale(' + transform.scale + ')' +
			'rotate(' + transform.rotate + 'deg)';
	},

	updateReticule: function() {
		this.applyTransform(this.elements.reticule.inner, this.transforms.reticuleInner);
		this.applyTransform(this.elements.reticule.outer, this.transforms.reticuleOuter);
	},

	updateRoll: function( roll ) {

		// this.transforms.centerThing.rotate += -(roll * 25);
		this.transforms.centerThingOne.rotate += (roll * 30);
		this.transforms.centerThingTwo.rotate += -(roll * 60);
		this.transforms.centerThingThree.rotate += (roll * 50);
		this.transforms.centerThingFour.rotate += -(roll * 65);
		this.transforms.centerThingFive.rotate += (roll * 45);
		this.transforms.centerThingSix.rotate += -(roll * 50);

		// this.applyTransform(this.elements.centerThing.wrapper, this.transforms.centerThing);
		this.applyTransform(this.elements.centerThing.one, this.transforms.centerThingOne);
		this.applyTransform(this.elements.centerThing.two, this.transforms.centerThingTwo);
		this.applyTransform(this.elements.centerThing.three, this.transforms.centerThingThree);
		this.applyTransform(this.elements.centerThing.four, this.transforms.centerThingFour);
		this.applyTransform(this.elements.centerThing.five, this.transforms.centerThingFive);
		this.applyTransform(this.elements.centerThing.six, this.transforms.centerThingSix);
	},


	updateTarget: function( angle, text ) {
		if(typeof angle === 'undefined') {
			// this.elements.targetAngle.style.opacity = 0;
		}
		else {
			this.elements.targetAngle.style.opacity = 1;
			this.elements.targetAngle.style.webkitTransform = 'rotate(' + angle + 'deg)';
			this.elements.targetDistance.style.webkitTransform = 'rotate(-' + (angle+360) + 'deg)';
		}

		if(text) {
			this.elements.targetDistance.textContent = text;
		}
	},

	updateTargetAngle: function() {
		if(!currentTarget) return;

		var pos = utils.getScreenXY(
            currentTarget.position,
            sceneManager.middleground.camera,
            window.innerWidth,
            window.innerHeight
        );

		var center = new THREE.Vector2( window.innerWidth/2, window.innerHeight/2 );
		var dist = sceneManager.middleground.camera.position.distanceTo(currentTarget.position) | 0;

        // if(	center.distanceTo( pos ) < 150 ) {
        // 	this.updateTarget( undefined, dist );
        // }
        // else {
	        var angle = utils.get2dAngle( pos, center );

	        angle *= 180 / Math.PI;
	        angle -= 90;

	        this.updateTarget( angle, dist );
	    // }
	}

};