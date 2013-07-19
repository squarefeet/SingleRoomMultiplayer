function Skybox( options ) {

    GameObject.call( this );

    this.material = new THREE.MeshBasicMaterial({
        map: ASSET_LOADER.loaded.textures[ options.texture ],
        side: THREE.BackSide
    });

    this.geometry = new THREE.SphereGeometry( options.radius, options.segmentsWidth, options.segmentsHeight );
    this.mesh = new THREE.Mesh( this.geometry, this.material );

    // Add lights
    // this.purpleLight = new THREE.PointLight( 0xbe5282, 1.5 );
    // this.purpleLight.position.set(1600, -1300, -3000);

    // this.renderables = [];
    this.renderables.push( this.mesh );

    // this.renderables.push( this.purpleLight );
}

// Skybox.prototype = {
//     getRenderables: function() {
//         return this.renderables;
//     }
// };