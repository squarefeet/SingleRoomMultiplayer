function ParticleEmitter( options ) {
    options = options || {};

    this.particlesPerSecond     = options.particlesPerSecond || 100;

    // Attribute properties ( per particle settings )
    this.position               = options.position || new THREE.Vector3();
    this.positionSpread         = options.positionSpread || new THREE.Vector3();

    this.acceleration           = options.acceleration || new THREE.Vector3();
    this.accelerationSpread     = options.accelerationSpread || new THREE.Vector3();

    this.velocity               = options.velocity || new THREE.Vector3();
    this.velocitySpread         = options.velocitySpread || new THREE.Vector3();

    this.size                   = options.size || 10;
    this.sizeSpread             = options.sizeSpread || 0;
    this.sizeEnd                = options.sizeEnd || 10.0;

    this.numParticles           = null;

    this.attributes             = null;
    this.vertices               = null;
    this.verticesIndex          = 0;
    this.age                    = 0;
    this.maxAge                 = null;
    this.recycled               = [];
}

ParticleEmitter.prototype = {
    _resetParticle: function( p ) {
        var spread = this.positionSpread;

        // Optimise for no position spread
        if(spread.x === 0 && spread.y === 0 && spread.z === 0) {
            p.copy( this.position );
        }

        // If there is a position spread, then get a new position based on this spread.
        else {
            this._randomizeExistingVector3( p, this.position, spread );
        }
    },

    _randomizeExistingVector3: function( v, base, spread ) {
        v.copy( base );

        v.x += Math.random() * spread.x - (spread.x/2);
        v.y += Math.random() * spread.y - (spread.y/2);
        v.z += Math.random() * spread.z - (spread.z/2);
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


function ParticleGroup( options ) {
    this.fixedTimeStep          = options.fixedTimeStep || 0.016;

    this.shape                  = options.shape || 'sphere';

    // Uniform properties ( applied to all particles )
    this.maxAge                 = options.maxAge || 3;

    this.colorStart             = options.colorStart || new THREE.Color( 'white' );
    this.colorEnd               = options.colorEnd || new THREE.Color( 'blue' );

    this.opacityStart           = typeof options.opacityStart !== 'undefined' ? options.opacityStart : 1;
    this.opacityEnd             = options.opacityEnd || 0;

    this.texture                = options.texture || null;
    this.hasPerspective         = options.hasPerspective || 1;
    this.colorize               = options.colorize || 1;

    this.blending               = options.blending || THREE.AdditiveBlending;
    this.transparent            = options.transparent || true;
    this.alphaTest              = options.alphaTest || 0.5;
    this.depthWrite             = options.depthWrite || false;
    this.depthTest              = options.depthTest || false;

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

ParticleGroup.prototype = {
    _createGeometry: function() {
        this.geometry = new THREE.Geometry();
    },

    _createMaterial: function() {
        this.material = new THREE.ShaderMaterial({
            uniforms:       this.uniforms,
            attributes:     this.attributes,
            vertexShader:   document.getElementById('vertex').textContent,
            fragmentShader: document.getElementById('fragment').textContent,
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

        // return new THREE.Vector3(
        //     Math.random() * base.x - spread.x,
        //     Math.random() * base.y - spread.y,
        //     Math.random() * base.z - spread.z
        // );
    },

    _randomFloat: function( base, spread ) {
        return base + (Math.random() * spread - (spread/2));
        // return Math.random() * base - spread;
    },

    _randomizeExistingVector3: function( vector, base, spread ) {
        vector.set(
            Math.random() * base.x - spread.x,
            Math.random() * base.y - spread.y,
            Math.random() * base.z - spread.z
        );
    },

    addEmitter: function( emitter ) {
        emitter.numParticles = emitter.particlesPerSecond * this.maxAge;

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
            vertices[i]     = this._randomVector3( emitter.position, emitter.positionSpread );
            acceleration[i] = this._randomVector3( emitter.acceleration, emitter.accelerationSpread );
            velocity[i]     = this._randomVector3( emitter.velocity, emitter.velocitySpread );
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