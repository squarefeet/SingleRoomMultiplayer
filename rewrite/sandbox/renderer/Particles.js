/*
    Requirements
    ------------

    Create a single particle group for each type of particle effect:
        - engine trails
        - wingtip vortices
        - explosions
        - bullets

    Each particle group will have its own geometry (to hold all the particles
    for that group), its own material and mesh.

    A particle group will have a function to add a new emitter to it.
    An emitter will detail base position.


    One ParticleRenderer
        - Add particle group
*/







function Particle( vectorPool ) {
    this.vectorPool = vectorPool;
    this.position = this.vectorPool.get();
    this.velocity = this.vectorPool.get();
    this.acceleration = this.vectorPool.get();

    this.angle = 0;
    this.angleVelocity = 0;
    this.angleAcceleration = 0;

    this.size = 16.0;

    this.color = new THREE.Color();
    this.opacity = 1.0;

    this.age = 0;
    this.alive = 0;
};

Particle.prototype.update = function( dt ) {

    this.vectorPool.set(
        this.position,
        this.vectorPool.getX( this.velocity ) * dt,
        this.vectorPool.getY( this.velocity ) * dt,
        this.vectorPool.getZ( this.velocity ) * dt
    );

    this.vectorPool.set(
        this.velocity,
        this.vectorPool.getX( this.acceleration ) * dt,
        this.vectorPool.getY( this.acceleration ) * dt,
        this.vectorPool.getZ( this.acceleration ) * dt
    );

    this.angle         += this.angleVelocity     * 0.01745329251 * dt;
    this.angleVelocity += this.angleAcceleration * 0.01745329251 * dt;

    this.age += dt;
};



function ParticleEmitter( options ) {
    this.vectorPool = options.vectorPool;
    this.positionBase = this.vectorPool.get();
    this.positionSpread = this.vectorPool.get();

    this.particlesPerSecond = options.particlesPerSecond || 50;
    this.particleLifetime = options.particleLifetime || 2.0;
    this.emitterLifetime = options.emitterLifetime || 0.0;

    this.numParticles = this.particlesPerSecond * this.particleLifetime;

    this.particles = [];
}

ParticleEmitter.prototype = {

    createParticle: function() {
        var particle = new Particle();

        // ...

        return particle;
    },

    createParticles: function() {
        for(var i = 0; i < this.numParticles; ++i) {
            this.particles.push( this.createParticle() );
        }
    },

    setPositionBase: function( x, y, z ) {
        this.vectorPool.set( this.positionBase, x, y, z );
    },
    setPositionSpread: function( x, y, z ) {
        this.vectorPool.set( this.positionSpread, x, y, z );
    },

    update: function( dt ) {
        for(var i = 0; i < this.numParticles; ++i) {
            this.particles[i].update( dt );
        }
    }
};



function ParticleGroup( options ) {
    this.vectorPool = options.vectorPool;
    this.texture = options.texture;

    this.geometry = new THREE.Geometry();
    this.material = new THREE.ShaderMaterial({
        uniforms: {
            texture:   { type: "t", value: this.texture },
        },

        attributes: {
            customVisible:  { type: 'f',  value: [] },
            customAngle:    { type: 'f',  value: [] },
            customSize:     { type: 'f',  value: [] },
            customColor:    { type: 'c',  value: [] },
            customOpacity:  { type: 'f',  value: [] }
        },

        vertexShader:   particleVertexShader,
        fragmentShader: particleFragmentShader,

        transparent: true,
        alphaTest: 0.5, // if having transparency issues, try including: alphaTest: 0.5,
        blending: THREE.NormalBlending,
        depthTest: true
    });

    this.mesh = new THREE.ParticleSystem();

    this.particleGroups = [];
}


ParticleGroup.prototype = {
    _addParticlesToGeometry: function( particles ) {
        for( var i = 0, il = particles.length; i < il; ++i ) {
            this.geometry.vertices[i] = particles[i]
        }
    },

    addEmitter: function( particleEmitter ) {
        // Add emitter's particles to this group's geometry
        this._addParticlesToGeometry( particleEmitter.particles );
    }
}





function ParticleManager( numVectors ) {
    this.vectorPool = new Vector3Pool( numVectors );
}


ParticleManager.prototype = {
    _randomVec3: function( base, spread ) {
        var pool = this.options.vectorPool;

        var resultX = pool.getX( base ) * (pool.getX( spread ) * (Math.random() - 0.5)),
            resultY = pool.getY( base ) * (pool.getY( spread ) * (Math.random() - 0.5)),
            resultZ = pool.getZ( base ) * (pool.getZ( spread ) * (Math.random() - 0.5)),
            randomVec = pool.get();

        pool.set( randomVec, resultX, resultY, resultZ );

        return randomVec;
    },


    createParticle: function() {
        var particle = new Particle( this.options.vectorPool );
    }
};



ParticleManager.shaders = {
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
}