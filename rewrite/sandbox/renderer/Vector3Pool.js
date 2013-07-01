function Vector3Pool( size ) {
    var memory = [];

    this.get = function() {
        return memory.pop();
    };

    this.release = function( v ) {
        v.set( 0, 0, 0 );
        memory.push( v );
    };

    while( --size >= 0 ) {
        memory.push( new THREE.Vector3() );
    }
}