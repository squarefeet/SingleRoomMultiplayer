var vertices = [];
var verticesCopy = [];
var accelerations = [];


var Vec3 = function(x, y, z) {
    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
}


var accelerationSpread = {
    x: 5,
    y: 5,
    z: 5
};

var ages = [];


function compute() {
    for(var i = 0; i < vertices.length; ++i) {
        vertices[i].x += accelerations[i].x;
        vertices[i].y += accelerations[i].y;
        vertices[i].z += accelerations[i].z;

        ++ages[i];

        if(ages[i] > 200) {
            vertices[i].z = 0;
            vertices[i].y = 0;
            vertices[i].x = 0;
            ages[i] = 0;
        }
    }

    self.postMessage({
        message: 'result',
        vertices: vertices
    });

    setTimeout(compute, 25);
}



self.addEventListener('message', function( e ) {
    if(e.data.message === 'start') {
        vertices = e.data.vertices;

        for(var i = 0; i < vertices.length; ++i) {
            accelerations[i] = new Vec3(
                Math.random() * accelerationSpread.x - accelerationSpread.x/2,
                Math.random() * accelerationSpread.y - accelerationSpread.y/2,
                Math.random() * accelerationSpread.z - accelerationSpread.z/2
            );
            ages[i] = -Math.random() * 200;
        }

        compute();
    }

}, false);