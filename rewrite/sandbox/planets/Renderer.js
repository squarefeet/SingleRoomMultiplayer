function Renderer( opts ) {

	var options = {
		width: window.innerWidth,
		height: window.innerHeight,
		parent: document.body,

		// Renderer settings
		antialias: true,
		alpha: true,
		precision: 'highp',
		stencil: true,
		preserveDrawingBuffer: false,
		clearColor: 0x000000,
		clearAlpha: 1,
		maxLights: 4,
		faceCulling: 0,
		autoClear: false,
		gammaInput: false,
		gammaOutput: false,
		physicallyBasedShading: false
	};

	if( typeof opts === 'object' ) {
		for( var i in opts ) {
			options[ i ] = opts[ i ];
		}
	}

	// Nullify opts for GC.
	opts = null;
	i = null;


	// Some useful variables...
	var isRendering = 0,
		deltaTime = 0,
		layerManager = null,
		statsInstance = null,
		postProcesses = null;




	// Setup the renderer
	var renderer = new THREE.WebGLRenderer({
		antialias: 				options.antialias,
		alpha: 					options.alpha,
		precision: 				options.precision,
		stencil: 				options.stencil,
		preserveDrawingBuffer: 	options.preserveDrawingBuffer,
		maxLights: 				options.maxLights,
	});

	renderer.setFaceCulling( options.faceCulling );
	renderer.setClearColor( options.clearColor, options.clearAlpha );
	renderer.setSize( options.width, options.height );
	renderer.autoClear = options.autoClear;
	renderer.gammaInput = options.gammaInput;
	renderer.gammaOutput = options.gammaOutput;
	renderer.physicallyBasedShading = options.physicallyBasedShading;

	// Setup the clock
	var clock = new THREE.Clock();


	// Utilities
	var setLayerManager = function( manager ) {
		layerManager = manager;
	};

	var addStats = function( stats ) {
		var el = stats.domElement,
			style = el.style;

		style.position = 'absolute';
		style.top = '0px';
		style.left = '0px';
		style.zIndex = '999999';
		options.parent.appendChild( el );

		statsInstance = stats;
	};

	var addToDOM = function() {
		options.parent.appendChild( renderer.domElement );
	};


	// Create start/stop/animate
	var start = function() {
		if( isRendering === 0 && layerManager !== null ) {
			isRendering = 1;
			requestAnimationFrame( animate );
		}
	};

	var stop = function() {
		if( isRendering === 1 ) {
			isRendering = 0;
		}
	};

	var animate = function() {
		if( isRendering === 0 ) return;

		requestAnimationFrame( animate );
		render();

		if( statsInstance ) {
			statsInstance.update();
		}
	};

	var render = function( ) {
		var layers = layerManager.getLayers(),
			i = 0, il = layers.length,
			layer, scene, camera;

		if( !options.autoClear ) renderer.clear();

		deltaTime = clock.getDelta();

		if(postProcesses) {
			for( i; i < il; ++i ) {
				layer = layers[i];
				if( typeof layer.tick === 'function' ) {
					layer.tick( deltaTime );
				}
			}

            layers[1].scene.overrideMaterial = postProcesses.depthMaterial;
            renderer.render( layers[1].scene, layers[1].camera, postProcesses.depthTarget, true );
            layers[1].scene.overrideMaterial = null;
            postProcesses.composer.render();
            renderer.clear(false, true, false);
            renderer.render( layers[2].scene, layers[2].camera );
        }
        else {
        	for( i; i < il; ++i ) {
				layer = layers[i];

				if( typeof layer.tick === 'function' ) {
					layer.tick( deltaTime );
				}

				renderer.render( layer.scene, layer.camera );

				if( !options.autoClear ) {
					renderer.clear( false, true, false );
				}
			}
        }

        layers = null;
        i = null;
        il = null;
        layer = null;
        scene = null;
        camera = null;
	};



	var enablePostProcessing = function(enabledScenes, clearScene) {
		if(postProcesses) return;

	    postProcesses = {};

	    // Setup all the depth stuff.
	    postProcesses.depthShader = THREE.ShaderLib[ "depthRGBA" ];
	    postProcesses.depthUniforms = THREE.UniformsUtils.clone( postProcesses.depthShader.uniforms );
	    postProcesses.depthMaterial = new THREE.ShaderMaterial({
	        fragmentShader: postProcesses.depthShader.fragmentShader,
	        vertexShader: postProcesses.depthShader.vertexShader,
	        uniforms: postProcesses.depthUniforms
	    }) ;
	    postProcesses.depthMaterial.blending = THREE.NoBlending;

	    // Create
	    postProcesses.renderTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, {
	        minFilter: THREE.LinearFilter,
	        magFilter: THREE.LinearFilter,
	        format: THREE.RGBAFormat,
	        stencilBuffer: true
	    });
	    postProcesses.composer = new THREE.EffectComposer( renderer, postProcesses.renderTarget );




	    postProcesses.renderPasses = [];

	    for( var i = 0; i < enabledScenes.length; ++i ) {
	    	enabledScenes[i] = layerManager.getLayerWithName( enabledScenes[i] );
			postProcesses.renderPasses.push( new THREE.RenderPass( enabledScenes[i].scene, enabledScenes[i].camera ) );

			if(i !== 0) {
				postProcesses.renderPasses[i].clear = false;
			}
		}

		clearScene = layerManager.getLayerWithName( clearScene );

	    postProcesses.clearMask = new THREE.ClearMaskPass();
	    postProcesses.clearMaskPass = new THREE.MaskPass( clearScene.scene, clearScene.camera );
	    postProcesses.depthTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
            minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBAFormat
        });

	    var bloomPass = new THREE.BloomPass( 2 );
	    var copyPass = new THREE.ShaderPass( THREE.CopyShader );
	    copyPass.renderToScreen = true;

	    var bloomPass = bloomPass;

	    for( var i = 0; i < postProcesses.renderPasses.length; ++i ) {
	    	postProcesses.composer.addPass( postProcesses.renderPasses[i] );
	    }

	    postProcesses.composer.addPass( postProcesses.clearMaskPass );
	    postProcesses.composer.addPass( postProcesses.clearMask );
	    postProcesses.composer.addPass( bloomPass );
	    postProcesses.composer.addPass( copyPass );
	};


	// Expose certain functions
	this.start = start;
	this.stop = stop;
	this.setLayerManager = setLayerManager;
	this.addStats = addStats;
	this.addToDOM = addToDOM;
	this.enablePostProcessing = enablePostProcessing
}

Renderer.prototype.setBloomLevel = function( level ) {
    this.bloomLevel = level;
    this.bloomPass.materialCopy.uniforms.opacity.value = level;
};

Renderer.prototype.renderHit = function() {
    this.setBloomLevel( 5 );
    this.rampBloom = true;
};