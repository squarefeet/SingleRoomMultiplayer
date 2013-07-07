function GameObject() {
    this.renderables = [];
    this.renderables.push( this.mesh );
}

GameObject.prototype = {
    getRenderables: function() {
        return this.renderables;
    }
};

GameObject.extend = utils.extend;