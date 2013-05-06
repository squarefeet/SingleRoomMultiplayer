var Pool = function() {
    this.__pools = [];
}

Pool.prototype = {
    // Get a new Vector
    get: function() {
        if ( this.__pools.length > 0 ) {
            return this.__pools.pop();
        }

        console.log( "pool ran out!" )
        return null;
    },

    // Release a vector back into the pool
    add: function( v ) {
        this.__pools.push( v );
    },

    release: function( v ) {
        this.add( v );
    }
};