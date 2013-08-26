var utils = {};

utils.noop = function(){};

// Helper function to correctly set up the prototype chain, for subclasses.
// Swiped from backbone.js
//     (c) 2010-2013 Jeremy Ashkenas, DocumentCloud Inc.
utils.extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has( protoProps, 'constructor' ) ) {
        child = protoProps.constructor;
    }
    else {
        child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
};


utils.makeCSSRGBAString = function( r, g, b, a ) {
    r = Math.max(0, Math.min(255, r)) | 0;
    g = Math.max(0, Math.min(255, g)) | 0;
    b = Math.max(0, Math.min(255, b)) | 0;
    a = Math.max(0, Math.min(1, a));

    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
};

// Given an input value and its high and low bounds, scale
// that value to new high and low bounds.
//
// Formula from MaxMSP's Scale object:
//  http://www.cycling74.com/forums/topic.php?id=26593
//
utils.scaleNumber = function(num, lowIn, highIn, lowOut, highOut) {
    return ((num-lowIn) / (highIn-lowIn)) * (highOut-lowOut) + lowOut;
};


// Create a new THREE.CubeGeometry based on a bounding box
utils.createDrawableBoundingBox = (function() {
    var material = new THREE.MeshBasicMaterial({
        wireframe: true
    });

    return function( b ) {
        var width   = b.max.x - b.min.x,
            height  = b.max.y - b.min.y,
            depth   = b.max.z - b.min.z;

        return new THREE.Mesh( new THREE.CubeGeometry( width, height, depth ), material );
    };
}());

utils.getMaxBoundingSize = function( box ) {
    var x = Math.abs( box.max.x - box.min.x ),
        y = Math.abs( box.max.y - box.min.y ),
        z = Math.abs( box.max.z - box.min.z );

    return Math.max( x, y, z );
};