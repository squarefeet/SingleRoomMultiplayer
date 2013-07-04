/**
* Written by Luke Moody	  http://www.github.com/squarefeet/
* 	A rewrite of Lee Stemkoski's ParticleEngine: http://www.adelphi.edu/~stemkoski/
*/


function Particle() {
	this.position = null;
	this.velocity = null;
	this.acceleration = null;

	this.color = new THREE.Color();
	this.colorVector = new THREE.Vector3();
	this.opacity = 1;

	this.angle = 0.0;
	this.angleVelocity = 0;
	this.angleAcceleration = 0;

	this.age = 0;
	this.alive = 0.0;
	this.size = 10;
}

Particle.prototype = {
	update: function( dt ) {
		this.position.x += this.velocity.x * dt;
		this.position.y += this.velocity.y * dt;
		this.position.z += this.velocity.z * dt;

		this.velocity.x += this.acceleration.x * dt;
		this.velocity.y += this.acceleration.y * dt;
		this.velocity.z += this.acceleration.z * dt;

		this.angle         += this.angleVelocity     * 0.01745329251 * dt;
		this.angleVelocity += this.angleAcceleration * 0.01745329251 * dt;

		this.age += dt;
	}
};


function ParticleEmitter( options ) {
	this.particlesPerSecond = 	options.particlesPerSecond || 10;
	this.maxAge 			= 	options.maxAge || 5;

	this.position 			=	options.position 		|| new THREE.Vector3();
	this.acceleration 		=	options.acceleration 	|| new THREE.Vector3();
	this.velocity 			= 	options.velocity 		|| new THREE.Vector3();
	this.angle 				= 	options.angle 			|| new THREE.Vector3();
	this.size 				=	options.size 			|| new THREE.Vector3();
	this.opacity 			= 	options.opacity 		|| 0;
	this.color 				=	options.color 			|| new THREE.Vector3();

	this.positionSpread		=	options.positionSpread;
	this.accelerationSpread =	options.accelerationSpread;
	this.velocitySpread		= 	options.velocitySpread;
	this.angleSpread 		= 	options.angleSpread;
	this.sizeSpread 		= 	options.sizeSpread;
	this.opacitySpread		= 	options.opacitySpread;
	this.colorSpread 		=	options.colorSpread;

	this.opacityTweenTo 	=	options.opacityTweenTo;
	this.sizeTweenTo 		= 	options.sizeTweenTo;
	this.colorTweenTo 		=	options.colorTweenTo;

	this.emitterDuration 	= options.emitterDuration;

	this.particleCount = this.particlesPerSecond * this.maxAge;
	this.lerpAmount = 1 / (this.maxAge * 10);

	this.particles = [];
	this.recycledIndices = [];
	this.alive = 1;
	this.age = 0;
	this.materialAttributes = null;
	this.groupStartIndex = 0;
	this.firstRun = 1;

	if( options.autoInitialize ) {
		this.initialize();
	}
}

ParticleEmitter.prototype = {

	_randomizeVector: function( vector, spread, invert ) {
		if( !invert ) {
			vector.x += spread.x * (Math.random() - 0.5);
			vector.y += spread.y * (Math.random() - 0.5);
			vector.z += spread.z * (Math.random() - 0.5);
		}

		else {
			vector.x = spread.x * -invert.x / 200;
			vector.y = spread.y * -invert.y / 200;
			vector.z = spread.z * -invert.z / 200;
		}
	},

	_randomizeColor: function( vector, spread ) {
		if(spread.x) {
			vector.x = spread.x * (Math.random() - 0.5);
		}

		if(spread.y) {
			vector.y = spread.y * (Math.random() - 0.5);
		}

		if(spread.z) {
			vector.z = spread.z * (Math.random() - 0.5);
		}
	},

	_randomValue: function( base, spread ) {
		return base + spread * (Math.random() - 0.5);
	},

	_lerp: function( start, end, amount ) {
		return (start + ( ( end - start ) * amount ) );
	},

	initialize: function() {
		for( var i = 0, particle; i < this.particleCount; ++i ) {
			particle = this.createParticle();
			this.particles.push( particle );
		}
	},

	createParticle: function() {
		var particle = new Particle();

		particle.position = new THREE.Vector3( this.position.x, this.position.y, this.position.z );
		particle.velocity = new THREE.Vector3( this.velocity.x, this.velocity.y, this.velocity.z );
		particle.acceleration = new THREE.Vector3( this.acceleration.x, this.acceleration.y, this.acceleration.z );

		particle.size = this.size;
		particle.colorVector.copy( this.color );
		particle.color.setHSL( this.color.x, this.color.y, this.color.z );
		particle.opacity = this.opacity;
		particle.angle = this.angle;

		this.applySpreads( particle );

		return particle;
	},

	update: function( dt ) {
		if(!this.alive) return;

		var i = this.particleCount,
			recycled = this.recycledIndices,
			aliveCount = 0,
			particle;

		recycled.length = 0;

		while( --i >= 0 ) {
			particle = this.particles[i];

			if( particle.alive ) {

				++aliveCount;
				particle.update( dt );

				if( particle.age >= this.maxAge || this.firstRun ) {
					particle.alive = 0.0;
					recycled.push( i );
				}

				if( typeof this.opacityTweenTo === 'number' ) {
					particle.opacity = this._lerp( particle.opacity, this.opacityTweenTo, this.lerpAmount );
				}

				if( typeof this.sizeTweenTo === 'number' ) {
					particle.size = this._lerp( particle.size, this.sizeTweenTo, this.lerpAmount );
				}

				if( this.colorTweenTo ) {
					particle.colorVector.x = this._lerp( particle.colorVector.x, this.colorTweenTo.x, this.lerpAmount );
					particle.colorVector.y = this._lerp( particle.colorVector.y, this.colorTweenTo.y, this.lerpAmount );
					particle.colorVector.z = this._lerp( particle.colorVector.z, this.colorTweenTo.z, this.lerpAmount );

					particle.color.setHSL(
						particle.colorVector.x,
						particle.colorVector.y,
						particle.colorVector.z
					);
				}

				this.materialAttributes.customVisible.value[i + this.groupStartIndex] = particle.alive;
				this.materialAttributes.customColor.value[i + this.groupStartIndex]   = particle.color;
				this.materialAttributes.customOpacity.value[i + this.groupStartIndex] = particle.opacity;
				this.materialAttributes.customSize.value[i + this.groupStartIndex]    = particle.size;
				this.materialAttributes.customAngle.value[i + this.groupStartIndex]   = particle.angle;
			}
		}

		this.firstRun = 0;

		if( this.age > this.emitterDuration ) {
			if(aliveCount === 0) {
				this.alive = 0;
			}
			return;
		}

		if( this.age < this.maxAge ) {
			// determine indices of particles to activate
			var startIndex 	= Math.round( this.particlesPerSecond * this.age );
			var endIndex 	= Math.round( this.particlesPerSecond * (this.age + dt) );

			if( endIndex > this.particleCount ) {
				endIndex = this.particleCount;
			}
		}


		for( i = startIndex; i < endIndex; i++ ) {
			this.particles[i].alive = 1.0;
		}

		for( var j = 0; j < recycled.length; ++j ) {
			this.resetParticle( this.particles[ recycled[j] ] );
		}

		this.age += dt;
	},

	resetParticle: function( p ) {
		p.position.set( this.position.x, this.position.y, this.position.z );
		p.velocity.set( this.velocity.x, this.velocity.y, this.velocity.z );
		p.alive = 1.0; // activate right away
		p.age = 0;
		p.opacity = this.opacity;
		p.size = this.size;
		p.colorVector.copy( this.color );
		p.color.setHSL( this.color.x, this.color.y, this.color.z );

		this.applySpreads( p );
	},

	applySpreads: function( p ) {
		if( this.positionSpread ) {
			this._randomizeVector( p.position, this.positionSpread );
		}

		if( this.velocitySpread ) {
			this._randomizeVector( p.velocity, this.velocitySpread );
			// this._randomizeVector( p.acceleration, this.velocitySpread, p.velocity );
		}

		if( this.accelerationSpread ) {
			this._randomizeVector( p.acceleration, this.accelerationSpread );
		}

		if( this.angleSpread ) {
			p.angle = this._randomValue( this.angle, this.angleSpread );
		}

		if( this.sizeSpread ) {
			p.size = this._randomValue( this.size, this.sizeSpread );
		}

		if( this.opacitySpread ) {
			p.opacity = this._randomValue( this.opacity, this.opacitySpread );
		}

		if( this.colorSpread ) {
			this._randomizeColor( this.color, this.colorSpread );
			p.color.setHSL( this.color.x, this.color.y, this.color.z );
		}
	}
};


function ParticleGroup( options ) {
	this.material = new THREE.ShaderMaterial({
		uniforms: {
            texture:   { type: "t", value: options.texture },
        },

        attributes: {
            customVisible:  { type: 'f',  value: [] },
            customAngle:    { type: 'f',  value: [] },
            customSize:     { type: 'f',  value: [] },
            customColor:    { type: 'c',  value: [] },
            customOpacity:  { type: 'f',  value: [] }
        },

        vertexShader:   ParticleGroup.shaders.vertex,
        fragmentShader: ParticleGroup.shaders.fragment,

        transparent: true,
        alphaTest: 0.5,
        blending: (options.blending || THREE.NormalBlending),
        depthTest: (typeof options.depthTest !== 'undefined' ? options.depthTest : ((options.blending && options.blending === THREE.AdditiveBlending) ? false : true))
	});

	this.geometry = new THREE.Geometry();
	this.emitters = [];
}


ParticleGroup.prototype = {
	addEmitter: function( emitter ) {
		var particles = emitter.particles,
			i = particles.length,
			j = this.geometry.vertices.length;

		emitter.groupStartIndex = this.geometry.vertices.length;
		emitter.materialAttributes = this.material.attributes;

		this.emitters.push( emitter );

		for( var i = 0; i < particles.length; ++i ) {
			this.geometry.vertices.push( particles[i].position );

			this.material.attributes.customVisible.value[i+j] = 0.0;
			this.material.attributes.customColor.value[i+j]   = particles[i].color;
			this.material.attributes.customOpacity.value[i+j] = particles[i].opacity;
			this.material.attributes.customSize.value[i+j]    = particles[i].size;
			this.material.attributes.customAngle.value[i+j]   = particles[i].angle;
		}

		var mesh = this.mesh = new THREE.ParticleSystem( this.geometry, this.material );
		// mesh.frustrumCulled = true;
		mesh.dynamic = true;
		mesh.sortParticles = true;
	},

	update: function( dt ) {
		for( var i = 0; i < this.emitters.length; ++i ) {
			this.emitters[i].update( dt );
		}
	}
};


ParticleGroup.shaders = {
    vertex: [
        "attribute vec3  customColor;",
        "attribute float customOpacity;",
        "attribute float customSize;",
        "attribute float customAngle;",
        "attribute float customVisible;",  // float used as boolean (0 = false, 1 = true)
        "varying vec4  vColor;",
        "varying float vAngle;",
        "void main()",
        "{",
            "if ( customVisible > 0.5 )",
                "vColor = vec4( customColor, customOpacity );", //     set color associated to vertex; use later in fragment shader.
            "else",
                "vColor = vec4(0.0, 0.0, 0.0, 0.0);",       //     make particle invisible.

            "vAngle = customAngle;",

            "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
            "gl_PointSize = customSize * ( 300.0 / length( mvPosition.xyz ) );",     // scale particles as objects in 3D space
            "gl_Position = projectionMatrix * mvPosition;",
        "}"
    ].join("\n"),

    fragment: [
        "uniform sampler2D texture;",
        "varying vec4 vColor;",
        "varying float vAngle;",
        "void main()",
        "{",
            "gl_FragColor = vColor;",

            "float c = cos(vAngle);",
            "float s = sin(vAngle);",
            "vec2 rotatedUV = vec2(c * (gl_PointCoord.x - 0.5) + s * (gl_PointCoord.y - 0.5) + 0.5,",
                                  "c * (gl_PointCoord.y - 0.5) - s * (gl_PointCoord.x - 0.5) + 0.5);",  // rotate UV coordinates to rotate texture
                "vec4 rotatedTexture = texture2D( texture,  rotatedUV );",
            "gl_FragColor = gl_FragColor * rotatedTexture;",    // sets an otherwise white particle texture to desired color
        "}"
    ].join("\n")
};