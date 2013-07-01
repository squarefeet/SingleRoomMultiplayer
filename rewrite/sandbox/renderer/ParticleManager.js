function Particle() {
    // has position, velocity, acceleration
}

Particle.prototype = {
    update: function( dt ) {

    }
}




function ParticleEmitter( pool ) {
    this.vectorPool = pool;

    this.positionBase = pool.get();
}

ParticleEmitter.prototype = {
    update: function( dt ) {
        // Move particles
        // Lerp opacity, size, color, etc.
        // "Remove" particles that are too old (set pos to Number.POSITIVE_INFINITY)
        //
    }
};





function ParticleGroup() {
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

        vertexShader:   ParticleManager.shaders.vertex,
        fragmentShader: ParticleManager.shaders.fragment,

        transparent: true,
        alphaTest: 0.5, // if having transparency issues, try including: alphaTest: 0.5,
        blending: THREE.NormalBlending,
        depthTest: true
    });

    this.mesh = new THREE.ParticleSystem();
    this.emitters = [];
}

ParticleGroup.prototype = {
    addEmitter: function( emitter ) {

    },

    update: function( dt ) {
        for( var i = 0; i < this.emitters.length; ++i ) {
            this.emitters.update( dt );
        }
    }
};





function ParticleManager( pool ) {
    this.vectorPool = pool;
    this.groups = [];
}

ParticleManager.prototype = {
    addGroup: function( particleGroup ) {
        this.groups.push( particleGroup );
    },
    update: function( dt ) {
        for( var i = 0; i < this.groups.length; ++i ) {
            this.groups[i].update( dt );
        }
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