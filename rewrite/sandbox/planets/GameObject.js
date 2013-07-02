function GameObject() {
    this.material = new THREE.MeshPhongMaterial({
        color: 0xff00000,
        shininess: 10,
        specular: 0xffffff
    });

    this.geometry = new THREE.CubeGeometry( 10, 100, 100 );

    this.mesh = new THREE.Mesh( this.geometry, this.material );

    this.renderables = [];
    this.renderables.push( this.mesh );
}

GameObject.prototype = {
    getRenderables: function() {
        return this.renderables;
    }
};