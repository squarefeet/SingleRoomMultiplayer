var PlasmaObject = function( material ) {
	this.mesh = ASSET_LOADER.loaded.models[ '../../res/models/PlasmaCannon.dae' ].dae.clone();
	this.mesh.children[0].material = material;
};