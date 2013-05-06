/**
 * @requires Sparks.js
 * @requires Pool.js
 */

function Particles( options ) {

    this.options = {
        numParticles: 100000,
        size: 50,
        color: 0xffffff
    };

    if(options) {
        for(var i in options) {
            this.options[i] = options[i];
        }
    }

    this.particleMaterial = null;
    this.shaderAttributes = null;
    this.shaderUniforms = null;

    this.pool = new Pool();
    this.particleGeometry = new THREE.Geometry();
    this._createShaderMaterial();

    this.initialize();
    this.createSparks();
}

Particles.prototype = {

    initialize: function() {
        for(var i = 0; i < this.options.numParticles; ++i) {
            this.particleGeometry.vertices.push(
                new THREE.Vector3(
                    Math.random() * 200 - 100,
                    Math.random() * 100 + 150,
                    Math.random() * 50
                )
            );

            this.pool.add(i);
        }

        this.particles = new THREE.ParticleSystem(
            this.particleGeometry,
            this.material
        );
        this.particles.dynamic = true;

        var vertices = this.particles.geometry.vertices,
            size = this.shaderAttributes.size.value,
            color = this.shaderAttributes.pcolor.value;

        for( var v = 0; v < vertices.length; v ++ ) {
            // size[ v ] = this.options.size;
            // color[ v ] = new THREE.Color( this.options.color );

            this.particles.geometry.vertices[ v ].set(
                Number.POSITIVE_INFINITY,
                Number.POSITIVE_INFINITY,
                Number.POSITIVE_INFINITY
            );
        }
    },

    createSparks: function() {
        var sparksEmitter = this.emitter = new SPARKS.Emitter(
            new SPARKS.SteadyCounter( 10 )
        );

        sparksEmitter.addInitializer(
            new SPARKS.Position(
                new SPARKS.PointZone(
                    new THREE.Vector3(0, 0, 0)
                )
            )
        );

        sparksEmitter.addInitializer(
            new SPARKS.Lifetime( 1, 10 )
        );

        sparksEmitter.addInitializer(
            new SPARKS.Target(
                null, this.setTargetParticle.bind(this)
            )
        );


        sparksEmitter.addInitializer(
            new SPARKS.Velocity(
                new SPARKS.PointZone(
                    new THREE.Vector3( 0, -5, 1 )
                )
            )
        );

        sparksEmitter.addAction( new SPARKS.Age(TWEEN.Easing.Linear.EaseNone) );
        sparksEmitter.addAction( new SPARKS.Accelerate( 0, 50, 0 ) );
        sparksEmitter.addAction( new SPARKS.Move() );
        sparksEmitter.addAction( new SPARKS.RandomDrift( 90, 100, 2000 ) );


        sparksEmitter.addCallback( "created", this.onParticleCreated.bind(this) );
        sparksEmitter.addCallback( "dead", this.onParticleDead.bind(this) );
    },

    setTargetParticle: function() {
        var target = this.pool.get();
        this.shaderAttributes.size.value[ target ] = Math.random() * 200 + 100;
        return target;
    },

    onParticleCreated: function( p ) {
        var position = p.position;
        p.target.position = position;

        var target = p.target;

        if ( target ) {
            // hue += 0.0003 * delta;
            // if ( hue > 1 ) hue -= 1;

            // TODO Create a PointOnShape Action/Zone in the particle engine

            // timeOnShapePath += 0.00035 * delta;
            // if ( timeOnShapePath > 1 ) timeOnShapePath -= 1;

            // var pointOnShape = heartShape.getPointAt( timeOnShapePath );

            // emitterpos.x = pointOnShape.x * 5 - 100;
            // emitterpos.y = -pointOnShape.y * 5 + 400;

            // pointLight.position.copy( emitterpos );
            // pointLight.position.x = emitterpos.x;
            // pointLight.position.y = emitterpos.y;
            // pointLight.position.z = 100;

            // this.particleGeometry.vertices[ target ] = p.position;
            // this.shaderAttributes.pcolor.value[ target ].setHSL( hue, 0.6, 0.1 );

            // pointLight.color.setHSL( hue, 0.8, 0.5 );
        }
    },

    onParticleDead: function( particle ) {
        var target = particle.target;

        if ( target ) {
            // Hide the particle
            // this.shaderAttributes.pcolor.value[ target ].setRGB( 0, 0, 0 );
            this.particleGeometry.vertices[ target ].set(
                Number.POSITIVE_INFINITY,
                Number.POSITIVE_INFINITY,
                Number.POSITIVE_INFINITY
            );

            // Mark particle system as available by returning to pool
            this.pool.add( particle.target );
        }
    },

    _generateSprite: function() {
        var canvas = document.createElement( 'canvas' );
        canvas.width = 128;
        canvas.height = 128;

        var context = canvas.getContext( '2d' );

        context.beginPath();
        context.arc( 64, 64, 60, 0, Math.PI * 2, false) ;
        context.closePath();

        context.lineWidth = 0.5; //0.05
        context.stroke();
        context.restore();

        var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );

        gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
        gradient.addColorStop( 0.2, 'rgba(255,255,255,1)' );
        gradient.addColorStop( 0.4, 'rgba(200,200,200,1)' );
        gradient.addColorStop( 1, 'rgba(0,0,0,1)' );

        context.fillStyle = gradient;

        context.fill();

        return canvas;
    },

    _createShaderMaterial: function() {
        var attributes = {
                size:  { type: 'f', value: [] },
                pcolor: { type: 'c', value: [] }
            },
            sprite = this._generateSprite(),
            texture = new THREE.Texture( sprite ),
            uniforms = {
                texture:   { type: "t", value: texture }
            },
            material;

        texture.needsUpdate = true;


        this.shaderAttributes = attributes;
        this.shaderUniforms = uniforms;

        material = new THREE.ShaderMaterial( {
            uniforms:       uniforms,
            attributes:     attributes,

            vertexShader:   Particles.vertexShader,
            fragmentShader: Particles.fragmentShader,

            blending:       THREE.AdditiveBlending,
            depthWrite:     false,
            transparent:    true
        });

        material = new THREE.ParticleBasicMaterial({
            color: this.options.color
        });

        this.material = material;

        return this.material;
    },

    start: function() {
        this.emitter.start();
    }
};


Particles.vertexShader = [
    'attribute float size;',
    'attribute vec3 pcolor;',
    'varying vec3 vColor;',
    'void main() {',
        'vColor = pcolor;',
        'vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );',
        'gl_PointSize = size * ( 200.0 / length( mvPosition.xyz ) );',
        'gl_Position = projectionMatrix * mvPosition;',
    '}'
].join('\n');


Particles.fragmentShader = [
    'uniform sampler2D texture;',
    'varying vec3 vColor;',
    'void main() {',
        'vec4 outColor = texture2D( texture, gl_PointCoord );',
        'gl_FragColor = outColor * vec4( vColor, 1.0 );',
    '}'
].join('\n');