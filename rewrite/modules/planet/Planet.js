function Planet( options ) {

    GameObject.call( this );

    var internalScale = 0.3,
        textures = ASSET_LOADER.loaded.textures;

    this.details = {
        jupiter: {
            size: 71492 * options.scale,
            distance: 0,
            period: 0
        },
        io: {
            size: 3642 * options.scale,
            distance: 421800 * options.scale * internalScale,
            period: (4 - 1.769) * options.scale * internalScale
        },
        europa: {
            size: 3121 * options.scale,
            distance: 671100 * options.scale * internalScale,
            period: (4 - 3.551) * options.scale * internalScale
        },
        ganymede: {
            size: 5262 * options.scale,
            distance: 1070400 * options.scale * internalScale,
            period: 7.155 * options.scale * internalScale
        },
        callisto: {
            size: 4820 * options.scale,
            distance: 1882700 * options.scale * internalScale,
            period: 16.69 * options.scale * internalScale
        }
    };

    this.jupiterMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shininess: 10,
        specular: 0xf8dab7,
        map: textures[ options.planetTexture ]
    });

    this.jupiterAtmosphereMaterial = new THREE.MeshPhongMaterial({
        transparent: true,
        map: textures[ options.atmosphereTexture ],
        color: 0xffffff,
        blending: THREE.AdditiveBlending,
        opacity: 0.8
    });

    this.ioMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shininess: 10,
        map: textures[ options.smallMoonTexture ]
    });

    this.europaMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shininess: 10,
        map: textures[ options.largeMoonTexture ]
    });


    this.jupiterGeometry                = new THREE.SphereGeometry( this.details.jupiter.size,       64, 64 );
    this.jupiterAtmosphereGeometry      = new THREE.SphereGeometry( this.details.jupiter.size + 2,   64, 64 );
    this.jupiterAtmosphereGeometry2     = new THREE.SphereGeometry( this.details.jupiter.size + 4,   64, 64 );
    this.ioGeometry                     = new THREE.SphereGeometry( this.details.io.size,            32, 32 );
    this.europaGeometry                 = new THREE.SphereGeometry( this.details.europa.size ,       32, 32 );


    this.jupiter = new THREE.Mesh( this.jupiterGeometry, this.jupiterMaterial );
    this.jupiterAtmosphere = new THREE.Mesh( this.jupiterAtmosphereGeometry, this.jupiterAtmosphereMaterial );
    this.jupiterAtmosphere2 = new THREE.Mesh( this.jupiterAtmosphereGeometry2, this.jupiterAtmosphereMaterial );
    this.io = new THREE.Mesh( this.ioGeometry, this.ioMaterial );
    this.europa = new THREE.Mesh( this.europaGeometry, this.europaMaterial );


    this.jupiter.position = options.position;

    this.jupiterAtmosphere.position = this.jupiterAtmosphere2.position = this.jupiter.position;
    this.jupiterAtmosphere2.rotation.y = Math.PI/2;

    this.io.position = options.position.clone();
    this.io.position.z += this.details.io.distance;

    this.europa.position = options.position.clone();
    this.europa.position.z += this.details.europa.distance;

    this.mesh = new THREE.Object3D();

    this.mesh.add( this.jupiter );
    this.mesh.add( this.jupiterAtmosphere );
    this.mesh.add( this.jupiterAtmosphere2 );
    this.mesh.add( this.io );
    this.mesh.add( this.europa );

    this.renderables.push( this.mesh );
}

Planet.prototype = {
    tick: function( dt ) {
        var center = this.jupiter.position.z,
            io
            now = Date.now() * 0.05;

        this.jupiter.rotation.y += 0.02 * dt;
        this.jupiterAtmosphere.rotation.y += 0.05 * dt;
        this.jupiterAtmosphere2.rotation.y += 0.1 * dt;

        this.io.rotation.y -= 0.09 * dt;
        this.io.position.z = center + Math.sin( now * this.details.io.period ) * this.details.io.distance;
        this.io.position.x = Math.cos( now * this.details.io.period ) * this.details.io.distance;

        this.europa.rotation.y -= 0.09 * dt;
        this.europa.position.z = center + Math.sin( now * this.details.europa.period ) * this.details.europa.distance;
        this.europa.position.x = Math.cos( now * this.details.europa.period ) * this.details.europa.distance;
    }
};




function Sun( options ) {
    GameObject.call( this );

    this.material = new THREE.MeshBasicMaterial({
        map: ASSET_LOADER.loaded.textures[ options.sunTexture ],
        transparent: true
    });
    this.material.blending = THREE.AdditiveBlending;

    this.geometry = new THREE.PlaneGeometry( 200, 200, 1, 1 );
    this.sun = new THREE.Mesh( this.geometry, this.material );

    this.sun.position = options.position;
    this.sun.rotation.y = Math.PI/2;

    this.mesh = new THREE.Object3D();
    this.mesh.add( this.sun );

    this.addLensFlare( options );
    this.renderables.push( this.mesh );
}

Sun.prototype = {
    addLensFlare: function( options ) {
        function lensFlareUpdateCallback( object ) {
            var f, fl = object.lensFlares.length;
            var flare;
            var vecX = -object.positionScreen.x * 2;
            var vecY = -object.positionScreen.y * 2;

            for( f = 0; f < fl; f++ ) {
                flare = object.lensFlares[ f ];
                flare.x = object.positionScreen.x + vecX * flare.distance;
                flare.y = object.positionScreen.y + vecY * flare.distance;
                flare.rotation = 0;
            }

            object.lensFlares[ 2 ].y += 0.025;
            object.lensFlares[ 3 ].rotation = object.positionScreen.x * 0.5 + THREE.Math.degToRad( 45 );
        }


        var textureFlare0 = ASSET_LOADER.loaded.textures[ options.flare0Texture ];
        var textureFlare1 = ASSET_LOADER.loaded.textures[ options.flare1Texture ];
        var textureFlare2 = ASSET_LOADER.loaded.textures[ options.flare2Texture ];
        var textureFlare3 = ASSET_LOADER.loaded.textures[ options.flare3Texture ];


        var flareColor = new THREE.Color( 0xffffff );
        var lensFlare = new THREE.LensFlare( textureFlare0, 256, 0.0, THREE.AdditiveBlending, flareColor );


        lensFlare.add( textureFlare2, 512, 0.0,     THREE.AdditiveBlending );
        lensFlare.add( textureFlare2, 512, 0.05,    THREE.AdditiveBlending );
        lensFlare.add( textureFlare2, 256, 0.0,     THREE.AdditiveBlending );
        lensFlare.add( textureFlare3, 60, 0.6,      THREE.AdditiveBlending );
        lensFlare.add( textureFlare3, 70, 0.7,      THREE.AdditiveBlending );
        lensFlare.add( textureFlare3, 120, 0.9,     THREE.AdditiveBlending );
        lensFlare.add( textureFlare3, 30, 0.3,      THREE.AdditiveBlending );
        lensFlare.add( textureFlare3, 83, 0.5,      THREE.AdditiveBlending );
        lensFlare.add( textureFlare3, 100, 1.0,     THREE.AdditiveBlending );

        lensFlare.customUpdateCallback = lensFlareUpdateCallback;

        lensFlare.position = this.mesh.position.clone();
        lensFlare.position.z += 50;
        // lensFlare.position.x += 100;

        this.sun.add( lensFlare );
    }
};