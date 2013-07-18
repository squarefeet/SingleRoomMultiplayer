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