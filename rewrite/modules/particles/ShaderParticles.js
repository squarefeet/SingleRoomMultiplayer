function ShaderParticleEmitter( options ) {
    options = options || {};

    this.particlesPerSecond     = options.particlesPerSecond || 100;

    this.type                   = options.type || 'cube';

    // Attribute properties ( per particle settings )
    this.position               = options.position || new THREE.Vector3();
    this.positionSpread         = options.positionSpread || new THREE.Vector3();
    this.radius                 = typeof options.radius === 'number' ? options.radius : 10;

    this.acceleration           = options.acceleration || new THREE.Vector3();
    this.accelerationSpread     = options.accelerationSpread || new THREE.Vector3();

    this.velocity               = options.velocity || new THREE.Vector3();
    this.velocitySpread         = options.velocitySpread || new THREE.Vector3();

    this.speed                  = typeof options.speed === 'number' ? options.speed : 0;
    this.speedSpread            = typeof options.speedSpread === 'number' ? options.speedSpread : 0;

    this.size                   = options.size || 10.0;
    this.sizeSpread             = options.sizeSpread || 0;
    this.sizeEnd                = options.sizeEnd || 10.0;

    this.emitterDuration        = options.emitterDuration || null;
    this.alive                  = typeof options.alive === 'number' ? options.alive : 1;

    this.numParticles           = null;

    this.attributes             = null;
    this.vertices               = null;
    this.verticesIndex          = 0;
    this.age                    = 0;
    this.maxAge                 = null;
    this.recycled               = [];

    this.userData = {};
}

ShaderParticleEmitter.prototype = {
    _resetParticle: function( p ) {
        var spread = this.positionSpread;

        // Optimise for no position spread or radius
        if(
            ( this.type === 'cube' && spread.x === 0 && spread.y === 0 && spread.z === 0 ) ||
            ( this.type === 'sphere' && this.radius === 0 )
        ) {
            p.copy( this.position );
        }

        // If there is a position spread, then get a new position based on this spread.
        else if( this.type === 'cube' ) {
            this._randomizeExistingVector3( p, this.position, spread );
        }

        else if( this.type === 'sphere') {
            this._randomizeExistingVector3OnSphere( p, this.position, this.radius );
        }
    },

    _randomizeExistingVector3: function( v, base, spread ) {
        v.copy( base );

        v.x += Math.random() * spread.x - (spread.x/2);
        v.y += Math.random() * spread.y - (spread.y/2);
        v.z += Math.random() * spread.z - (spread.z/2);
    },

    _randomizeExistingVector3OnSphere: function( v, base, radius ) {
        var z = 2 * Math.random() - 1;
        var t = 6.2832 * Math.random();
        var r = Math.sqrt( 1 - z*z );

        var x = ((r * Math.cos(t)) * radius) + base.x;
        var y = ((r * Math.sin(t)) * radius) + base.y;
        var z = (z * radius) + base.z;

        v.set(x, y, z);
    },

    tick: function( dt ) {
        var a = this.attributes,
            alive = a.alive.value,
            age = a.age.value,
            velocity = a.velocity.value,
            start = this.verticesIndex,
            end = start + this.numParticles,
            r = this.recycled,
            pps = this.particlesPerSecond,
            m = this.maxAge,
            emitterAge = this.age;

        r.length = 0;

        for( var i = start; i < end; ++i ) {
            if( alive[i] === 1.0 ) {
                age[i] += dt;
            }

            if(age[i] >= m) {
                age[i] = 0.0;
                alive[i] = 0.0;
                r.push(i);
            }
        }




        if( !this.alive ) {
            if(r.length) {
                for(var i = 0; i < r.length; ++i) {
                    this._resetParticle( this.vertices[ r[i] ] );
                }
            }

            this.age = 0;
            return;
        }

        if( typeof this.emitterDuration === 'number' && this.age > this.emitterDuration ) {
            this.alive = 0;
            return;
        }


        if( emitterAge <= this.maxAge ) {
            // determine indices of particles to activate
            var startIndex  = start + Math.round( pps * emitterAge );
            var endIndex    = start + Math.round( pps * (emitterAge + dt) );

            if( endIndex > start + this.numParticles ) {
                endIndex = start + this.numParticles;
            }

            for( var i = startIndex; i < endIndex; i++ ) {
                alive[i] = 1.0;
                this._resetParticle( this.vertices[i] );
            }
        }

        for(var i = 0; i < r.length; ++i) {
            alive[ r[i] ] = 1.0;
            this._resetParticle( this.vertices[ r[i] ] );
        }

        this.age += dt;
    }
};


function ShaderParticleGroup( options ) {
    this.fixedTimeStep          = options.fixedTimeStep || 0.016;

    // Uniform properties ( applied to all particles )
    this.maxAge                 = options.maxAge || 3;

    this.colorStart             = options.colorStart || new THREE.Color( 'white' );
    this.colorEnd               = options.colorEnd || new THREE.Color( 'blue' );

    this.opacityStart           = typeof options.opacityStart !== 'undefined' ? options.opacityStart : 1;
    this.opacityEnd             = typeof options.opacityEnd === 'number' ? options.opacityEnd : 0;

    this.texture                = ( typeof options.texture === 'string' ? ASSET_LOADER.loaded.textures[ options.texture ] : options.texture ) || null;
    this.hasPerspective         = typeof options.hasPerspective === 'number' ? options.hasPerspective : 1;
    this.colorize               = options.colorize || 1;

    this.blending               = options.blending || THREE.AdditiveBlending;
    this.transparent            = options.transparent || true;
    this.alphaTest              = options.alphaTest || 0.5;
    this.depthWrite             = options.depthWrite || false;
    this.depthTest              = options.depthTest || true;

    // Create uniforms
    this.uniforms = {
        customColor:    { type: 'c', value: this.colorStart },
        customColorEnd: { type: 'c', value: this.colorEnd },
        duration:       { type: 'f', value: parseFloat( this.maxAge ) },
        texture:        { type: 't', value: this.texture },
        hasPerspective: { type: 'i', value: parseInt( this.hasPerspective ) },
        colorize:       { type: 'i', value: parseInt( this.colorize ) },
        opacity:        { type: 'f', value: parseFloat(this.opacityStart) },
        opacityEnd:     { type: 'f', value: parseFloat(this.opacityEnd) }
    };

    this.attributes = {
        acceleration:   { type: 'v3', value: [] },
        velocity:       { type: 'v3', value: [] },
        alive:          { type: 'f', value: [] },
        age:            { type: 'f', value: [] },
        size:           { type: 'f', value: [] },
        sizeEnd:        { type: 'f', value: [] }
    };

    this.emitters   = [];
    this.geometry   = null;
    this.material   = null;
    this.mesh       = null;

    this._createGeometry();
    this._createMaterial();
    this._createMesh();

}

ShaderParticleGroup.prototype = {
    _createGeometry: function() {
        this.geometry = new THREE.Geometry();
    },

    _createMaterial: function() {
        this.material = new THREE.ShaderMaterial({
            uniforms:       this.uniforms,
            attributes:     this.attributes,
            vertexShader:   ShaderParticleGroup.shaders.vertex,
            fragmentShader: ShaderParticleGroup.shaders.fragment,
            blending:       THREE.AdditiveBlending,
            transparent:    this.transparent,
            alphaTest:      this.alphaTest,
            depthWrite:     this.depthWrite,
            depthTest:      this.depthTest,
        });
    },

    _createMesh: function() {
        this.mesh = new THREE.ParticleSystem( this.geometry, this.material );
        this.mesh.dynamic = true;
    },

    _randomVector3: function( base, spread ) {
        var v = new THREE.Vector3();

        v.copy( base );

        v.x += Math.random() * spread.x - (spread.x/2);
        v.y += Math.random() * spread.y - (spread.y/2);
        v.z += Math.random() * spread.z - (spread.z/2);

        return v;
    },

    _randomFloat: function( base, spread ) {
        return base + spread * (Math.random() - 0.5);
    },

    _randomVector3OnSphere: function( base, radius ) {
        var z = 2 * Math.random() - 1;
        var t = 6.2832 * Math.random();
        var r = Math.sqrt( 1 - z*z );
        var vec3 = new THREE.Vector3( r * Math.cos(t), r * Math.sin(t), z );
        return new THREE.Vector3().addVectors( base, vec3.multiplyScalar( radius ) );
    },

    _randomVelocityVector3OnSphere: function( base, position, speed, speedSpread ) {
        var direction = new THREE.Vector3().subVectors( base, position );
        return direction.normalize().multiplyScalar( this._randomFloat( speed, speedSpread ) );
    },

    _randomizeExistingVector3: function( vector, base, spread ) {
        vector.set(
            Math.random() * base.x - spread.x,
            Math.random() * base.y - spread.y,
            Math.random() * base.z - spread.z
        );
    },

    addEmitter: function( emitter ) {
        if( emitter.duration ) {
            emitter.numParticles = emitter.particlesPerSecond * (this.maxAge < emitter.emitterDuration ? this.maxAge : emitter.emitterDuration);
        }
        else {
            emitter.numParticles = emitter.particlesPerSecond * this.maxAge;
        }

        emitter.numParticles = Math.ceil(emitter.numParticles);

        var vertices = this.geometry.vertices,
            start = vertices.length,
            end = emitter.numParticles + start,
            a = this.attributes,
            acceleration = a.acceleration.value,
            velocity = a.velocity.value,
            alive = a.alive.value,
            age = a.age.value,
            size = a.size.value,
            sizeEnd = a.sizeEnd.value;

        // Create the values
        for( var i = start; i < end; ++i ) {

            if( emitter.type === 'sphere' ) {
                vertices[i]     = this._randomVector3OnSphere( emitter.position,   emitter.radius );
                velocity[i]     = this._randomVelocityVector3OnSphere( vertices[i], emitter.position, emitter.speed, emitter.speedSpread );
            }
            else {
                vertices[i]     = this._randomVector3( emitter.position, emitter.positionSpread );
                velocity[i]     = this._randomVector3( emitter.velocity, emitter.velocitySpread );
            }


            acceleration[i] = this._randomVector3( emitter.acceleration, emitter.accelerationSpread );


            size[i]         = Math.max( 0.1, this._randomFloat( emitter.size, emitter.sizeSpread ) );
            sizeEnd[i]      = emitter.sizeEnd;
            age[i]          = 0.0;
            alive[i]        = 0.0;
        }

        // Cache properties on the emitter so we can access
        // them from its tick function.
        emitter.verticesIndex   = start;
        emitter.attributes      = this.attributes;
        emitter.vertices        = this.geometry.vertices;
        emitter.maxAge          = this.maxAge;

        // Save this emitter in an array for processing during this.tick()
        this.emitters.push( emitter );
    },

    tick: function( dt ) {
        dt = dt || this.fixedTimeStep;

        for( var i = 0; i < this.emitters.length; ++i ) {
            this.emitters[i].tick( dt );
        }

        // Set flags to update (causes less garbage than ParticleSystem.sortParticles = true);
        this.attributes.age.needsUpdate = true;
        this.attributes.alive.needsUpdate = true;
        this.geometry.verticesNeedUpdate = true;
    }
};



// The all-important shaders
ShaderParticleGroup.shaders = {
    vertex: [
        'uniform float duration;',
        'uniform vec3 customColor;',
        'uniform vec3 customColorEnd;',
        'uniform int hasPerspective;',
        'uniform float opacity;',
        'uniform float opacityEnd;',

        'attribute vec3 acceleration;',
        'attribute vec3 velocity;',
        'attribute float alive;',
        'attribute float age;',
        'attribute float size;',
        'attribute float sizeEnd;',

        'varying vec4 vColor;',

        // Linearly lerp a float
        'float Lerp( float start, float end ) {',
            'return (start + ((end - start) * (age / duration)));',
        '}',

        // Linearly lerp a vector3
        'vec3 Lerp( vec3 start, vec3 end ) {',
            'return (start + ((end - start) * (age / duration)));',
        '}',

        // Return the size of the particle
        'float GetSize( float newSize, vec4 mvPosition ) {',
            'if( hasPerspective == 1 ) {',
                'newSize = newSize * (300.0 / length( mvPosition.xyz ) );',
            '}',
            'return newSize;',
        '}',

        // Integrate acceleration into velocity and apply it to the particle's position
        'vec4 GetPos() {',
            'vec3 newPos = vec3( position );',
            'float positionInTime = age / duration;',

            // Move acceleration & velocity vectors to the value they should be at the current age
            'vec3 a = acceleration * positionInTime;',
            'vec3 v = velocity * positionInTime;',

            // Move velocity vector to correct values at this age
            'v = v + (a * age);',

            'newPos = newPos + v;',

            'vec4 mvPosition = modelViewMatrix * vec4( newPos, 1.0 );',

            // Set point size (should be moved to main() block, really)
            'gl_PointSize = Lerp( GetSize( size, mvPosition ), GetSize( sizeEnd, mvPosition ) );',

            'return mvPosition;',
        '}',


        'void main() {',

            'if( alive > 0.5 ) {',

                // Integrate color "tween"
                'vec3 color = vec3( customColor );',
                'if( customColor != customColorEnd ) {',
                    'color = Lerp( customColor, customColorEnd );',
                '}',

                // Store the color of this particle in the varying vColor, so frag shader can access it.
                'if( opacity != opacityEnd ) {',
                    'vColor = vec4( color, Lerp( opacity, opacityEnd ) );',
                '}',
                'else {',
                    'vColor = vec4( color, opacity );',
                '}',

                // Set the position of this particle
                'gl_Position = projectionMatrix * GetPos();',
            '}',

            'else {',
                // Hide particle and set its position to the (maybe) glsl equivalent of Number.POSITIVE_INFINITY
                'vColor = vec4( customColor, 0.0 );',
                'gl_Position = vec4(1e20, 1e20, 1e20, 0);',
            '}',
        '}',
    ].join('\n'),

    fragment: [
        'uniform sampler2D texture;',
        'uniform int colorize;',

        'varying vec4 vColor;',

        'void main() {',
            'float c = cos(0.0);',
            'float s = sin(0.0);',

            'vec2 rotatedUV = vec2(c * (gl_PointCoord.x - 0.5) + s * (gl_PointCoord.y - 0.5) + 0.5,',
                                  'c * (gl_PointCoord.y - 0.5) - s * (gl_PointCoord.x - 0.5) + 0.5);',

            'vec4 rotatedTexture = texture2D( texture,  rotatedUV );',

            'if( colorize == 1 ) {',
                'gl_FragColor = vColor * rotatedTexture;',
            '}',
            'else {',
                'gl_FragColor = rotatedTexture;',
            '}',
        '}'
    ].join('\n')
};