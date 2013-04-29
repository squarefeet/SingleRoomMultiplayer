function HUD() {

	this.innerReticuleMoveScale = 0.07;
	this.outerReticuleMoveScale = 1.5;

	this.transforms = {
		reticuleOuter: { x: 0, y: 0, z: 0, scale: 1 },
		reticuleInner: { x: 0, y: 0, z: 0, scale: 1 }
	};

	this.elements = {
		wrapper: null,
		reticule: {}
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

		this.update();
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
			'scale(' + transform.scale + ')';
	},

	update: function() {
		this.applyTransform(this.elements.reticule.inner, this.transforms.reticuleInner);
		this.applyTransform(this.elements.reticule.outer, this.transforms.reticuleOuter);
	}

};