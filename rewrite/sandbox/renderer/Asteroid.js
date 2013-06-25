function getDistance3d( vertex1, vertex2 ) {
    var xfactor = vertex2.x - vertex1.x;
    var yfactor = vertex2.y - vertex1.y;
    var zfactor = vertex2.z - vertex1.z;
    return Math.sqrt( (xfactor*xfactor) + (yfactor*yfactor) + (zfactor*zfactor) );
}

function Asteroid( size ) {
    var start = Date.now();

    this.material = new THREE.MeshPhongMaterial({
        map: assetLoader.loaded.textures['../../res/textures/phobos2k.jpg']
    });

    this.geometry = new THREE.Geometry();

    var geometries = [],
        sphere = null,
        vertices,
        offsetX = 0,
        offsetY = 0,
        offsetZ = 0,
        halfSize = size/2,
        matrix = null,
        magnet = [],
        strength = 1000,
        factor = 100,
        sphereRadius, morphMax,
        subdivisionModifier = new THREE.SubdivisionModifier();

    for(var i = 0; i < 50; ++i) {
        sphereRadius = Math.random() * 300;
        morphMax = sphereRadius / 10;

        sphere = new THREE.SphereGeometry(sphereRadius, 32, 32);

        matrix = new THREE.Matrix4().makeScale(
            Math.random() + 0.5,
            Math.random() + 0.5,
            Math.random() + 0.5
        );


        // for(var k = 0; k < 10; ++k) {
        //     magnet[k] = new THREE.Vector3(
        //         Math.random() * sphereRadius,
        //         Math.random() * sphereRadius,
        //         Math.random() * sphereRadius
        //     );
        // }

        vertices = sphere.vertices;

        offsetX = (Math.random() * size) - halfSize;
        offsetY = (Math.random() * size) - halfSize;
        offsetZ = (Math.random() * size) - halfSize;



        // sphere.mergeVertices();

        for(var j = 0; j < vertices.length; ++j) {

            // for(k = 0; k < 10; ++k) {
            //     var distance = getDistance3d(magnet[k], vertices[j]);
            //     var power = 10000 / distance / strength;

            //     vertices[j].x += ( (magnet[k].x - vertices[j].x) * power ) * factor;
            //     vertices[j].y += ( (magnet[k].y - vertices[j].y) * power ) * factor;
            //     vertices[j].z += ( (magnet[k].z - vertices[j].z) * power ) * factor;

            // }
            vertices[j].x += offsetX;
            vertices[j].y += offsetY;
            vertices[j].z += offsetZ;

            vertices[j].x += (Math.random() * morphMax);
            vertices[j].y += (Math.random() * morphMax);
            vertices[j].z += (Math.random() * morphMax);
        }

        sphere.applyMatrix( matrix )

        geometries.push( sphere );
    }

    for( var i = 0; i < geometries.length; ++i ) {
        THREE.GeometryUtils.merge( this.geometry, geometries[i] );
    }

    this.mesh = new THREE.Mesh( this.geometry, this.material );


    // this.mesh.scale.x += (Math.random() * 0.5) - 0.25;
    // this.mesh.scale.y += (Math.random() * 0.5) - 0.25;
    // this.mesh.scale.z += (Math.random() * 0.5) - 0.25;

    this.renderables = [];
    this.renderables.push( this.mesh );

    console.log(Date.now() - start + 'ms');
}

Asteroid.prototype = {
    getRenderables: function() {
        return this.renderables;
    }
};