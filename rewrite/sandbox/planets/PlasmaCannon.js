function PlasmaCannon( options ) {

    this.pool = [];
    this.origins = [];
    this.activeBullets = [];

    this.material = new THREE.ParticleBasicMaterial({
        color: 0xffffff,
        size: CONFIG.plasmaCannon.size,
        // map: assetLoader.loaded.textures[ '../../res/textures/plasmaBullet.png' ],
        blending: THREE.AdditiveBlending,
        opacity: 0.5
    });

    // this.material = new THREE.ShaderMaterial({
    //     uniforms: {
    //         texture:   { type: "t", value: assetLoader.loaded.textures[ '../../res/textures/plasmaBullet.jpg' ] },
    //     },

    //     attributes: {
    //         customVisible:  { type: 'f',  value: [] },
    //         customAngle:    { type: 'f',  value: [] },
    //         customSize:     { type: 'f',  value: [] },
    //         customColor:    { type: 'c',  value: [] },
    //         customOpacity:  { type: 'f',  value: [] }
    //     },

    //     vertexShader:   PlasmaCannon.shaders.vertex,
    //     fragmentShader: PlasmaCannon.shaders.fragment,

    //     transparent: true,
    //     alphaTest: 0.5,
    //     blending: THREE.AdditiveBlending,
    //     depthTest: true
    // });

    this.geometry = new THREE.Geometry();

    this._makeVertices( options.numBullets );


    this.mesh = new THREE.ParticleSystem( this.geometry, this.material );
    this.mesh.dynamic = true;

    this.renderables = [];
    this.renderables.push( this.mesh );

    // Bind scope
    this.fire = this.fire.bind( this );
    this.tick = this.tick.bind( this );
}

PlasmaCannon.prototype = {
    getRenderables: function() {
        return this.renderables;
    },

    _getFromPool: function() {
        var p = this.pool;

        if( p.length ) return p.pop();
    },

    _returnToPool: function( i ) {
        this.pool.push( i );
    },

    _makeOrigin: function() {
        var obj3d = new THREE.Object3D(),
            c = CONFIG.plasmaCannon;

        obj3d.position.set( Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY );
        obj3d.useQuaternion = true;

        return {
            object3d: obj3d,
            playerID: null,
            age: 0
        };
    },

    _makeVertices: function( n ) {
        var pos = Number.NEGATIVE_INFINITY,
            v = this.geometry.vertices,
            p = this.pool,
            o = this.origins,
            a = this.material.attributes;

        for( var i = 0; i < n; ++i ) {
            v.push( new THREE.Vector3( pos, pos, pos ) );
            p.push( i );
            o.push( this._makeOrigin() );
            // a.customVisible.value.push( 1.0 );
            // a.customAngle.value.push( 0.0 );
            // a.customSize.value.push( 200.0 );
            // a.customColor.value.push( new THREE.Color() );
            // a.customOpacity.value.push( 0.8 );
        }
    },

    _resetOrigin: function( origin ) {
        origin.object3d.position.x = origin.object3d.position.y = origin.object3d.position.z = Number.NEGATIVE_INFINITY;
        origin.age = 0;
    },


    fire: function( playerID, originMesh ) {
        var i, origin, obj3d;

        // Attempt to get an unused vertex index from the pool
        i = this._getFromPool();

        // If there isn't one available, stop here.
        if( typeof i !== 'number' ) return;

        // Fetch the origin associated with this vertex and catch the .obj3d property.
        origin = this.origins[ i ];
        obj3d = origin.object3d;

        // Ensure the obj3d is at correct position and rotation
        obj3d.position = originMesh.position.clone();
        obj3d.quaternion = originMesh.quaternion.clone();

        obj3d.translateZ( -500 );

        // Cache the ID of the player that fired this bullet so we can know
        // who killed who later on
        origin.playerID = playerID;

        // Set the selected vertex position to track the position of this obj3d
        this.geometry.vertices[ i ] = obj3d.position;

        // Push this index into the activeBullets array
        this.activeBullets.push( i );
    },


    tick: function( dt ) {
        var active = this.activeBullets,
            numActive = active.length,
            origins = this.origins,
            c = CONFIG.plasmaCannon,
            index, origin;

        this.geometry.verticesNeedUpdate = true;

        // If there are bullets to move, do it
        if( numActive ) {
            for( var i = 0; i < numActive; ++i ) {
                index = active[i];
                origin = this.origins[ index ];

                if( !origin ) continue;

                // If this bullet should still be alive, translate it.
                if( origin.age < c.maxAge) {

                    // Increase age of this bullet
                    origin.age += dt;

                    // Translate the Object3d instance so the bullet will stay on the correct path
                    origin.object3d.translateZ( -c.speed * dt );

                    // Now's the time to check for collisions
                    // ...
                }

                // Otherwise, move the origin back to NEGATIVE_INFINITY and
                // remove this vertex index from the active array.
                else {
                    this._resetOrigin( origin );
                    this._returnToPool( index );
                    active.splice( i, 1 );
                    numActive;
                }
            }
        }
    }

};


PlasmaCannon.shaders = {
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