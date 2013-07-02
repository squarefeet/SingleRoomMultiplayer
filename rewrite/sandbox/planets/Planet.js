function Planet( options ) {

    var internalScale = 0.3;

    this.details = {
        jupiter: {
            size: 71492 * options.scale,
            distance: 0,
            period: 0
        },
        io: {
            size: 3642 * options.scale,
            distance: 421800 * options.scale * internalScale,
            period: 1.769 * options.scale * internalScale
        },
        europa: {
            size: 3121 * options.scale,
            distance: 671100 * options.scale * internalScale,
            period: 3.551 * options.scale * internalScale
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
        map: assetLoader.loaded.textures['../../res/textures/jupiter.jpg']
    });

    this.ioMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shininess: 10,
        map: assetLoader.loaded.textures['../../res/textures/io.jpg']
    });

    this.europaMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shininess: 10,
        map: assetLoader.loaded.textures['../../res/textures/europa.jpg']
    });

    this.jupiterGeometry    = new THREE.SphereGeometry( this.details.jupiter.size,  32, 32 );
    this.ioGeometry         = new THREE.SphereGeometry( this.details.io.size,       32, 32 );
    this.europaGeometry     = new THREE.SphereGeometry( this.details.europa.size ,  32, 32 );

    this.jupiter = new THREE.Mesh( this.jupiterGeometry, this.jupiterMaterial );
    this.io = new THREE.Mesh( this.ioGeometry, this.ioMaterial );
    this.europa = new THREE.Mesh( this.europaGeometry, this.europaMaterial );


    this.jupiter.position = options.position;

    this.io.position = options.position.clone();
    this.io.position.z += this.details.io.distance;

    this.europa.position = options.position.clone();
    this.europa.position.z += this.details.europa.distance;

    this.renderables = [];
    this.renderables.push( this.jupiter );
    this.renderables.push( this.io );
    this.renderables.push( this.europa );
}

Planet.prototype = {
    tick: function( dt ) {
        var center = this.jupiter.position.z,
            io
            now = Date.now() * 0.05;


        this.jupiter.rotation.y += 0.02 * dt;

        this.io.rotation.y -= 0.09 * dt;
        this.io.position.z = center + Math.sin( now * this.details.io.period ) * this.details.io.distance;
        this.io.position.x = Math.cos( now * this.details.io.period ) * this.details.io.distance;

        this.europa.rotation.y -= 0.09 * dt;
        this.europa.position.z = center + Math.sin( now * this.details.europa.period ) * this.details.europa.distance;
        this.europa.position.x = Math.cos( now * this.details.europa.period ) * this.details.europa.distance;
    },

    getRenderables: function() {
        return this.renderables;
    }
};




function Sun( options ) {
    this.material = new THREE.MeshBasicMaterial({
        map: assetLoader.loaded.textures['../../res/textures/sun.jpg'],
        transparent: true
    });
    this.material.blending = THREE.AdditiveBlending;

    this.geometry = new THREE.PlaneGeometry( 200, 200, 1, 1 );
    this.mesh = new THREE.Mesh( this.geometry, this.material );

    this.mesh.position = options.position;
    this.mesh.rotation.y = Math.PI/2;

    this.renderables = [];
    this.renderables.push( this.mesh );

    this.addLensFlare();
}

Sun.prototype = {
    addLensFlare: function() {
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


        var textureFlare0 = assetLoader.loaded.textures['../../res/textures/lensflares/lensflare0.png'];
        var textureFlare1 = assetLoader.loaded.textures['../../res/textures/lensflares/lensflare1.png'];
        var textureFlare2 = assetLoader.loaded.textures['../../res/textures/lensflares/lensflare2.png'];
        var textureFlare3 = assetLoader.loaded.textures['../../res/textures/lensflares/lensflare3.png'];


        var flareColor = new THREE.Color( 0xffffff );
        var lensFlare = new THREE.LensFlare( textureFlare0, 1024, 0.0, THREE.AdditiveBlending, flareColor );


        lensFlare.add( textureFlare2, 512, 0.0, THREE.AdditiveBlending );
        lensFlare.add( textureFlare2, 512, 0.05, THREE.AdditiveBlending );
        lensFlare.add( textureFlare2, 256, 0.0, THREE.AdditiveBlending );

        lensFlare.add( textureFlare3, 60, 0.6, THREE.AdditiveBlending );
        lensFlare.add( textureFlare3, 70, 0.7, THREE.AdditiveBlending );
        lensFlare.add( textureFlare3, 120, 0.9, THREE.AdditiveBlending );
        lensFlare.add( textureFlare3, 30, 0.3, THREE.AdditiveBlending );
        lensFlare.add( textureFlare3, 83, 0.5, THREE.AdditiveBlending );
        lensFlare.add( textureFlare3, 100, 1.0, THREE.AdditiveBlending );

        lensFlare.customUpdateCallback = lensFlareUpdateCallback;

        lensFlare.position = this.mesh.position.clone();
        lensFlare.position.lerp( new THREE.Vector3(), 0.1 );

        this.renderables.push( lensFlare );
    },

    getRenderables: function() {
        return this.renderables;
    }
};