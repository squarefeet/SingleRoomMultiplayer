(function(attachTo) {


    function Renderer(width, height, parent) {

        width = width || window.innerWidth;
        height = height || window.innerHeight;
        parent = parent || document.body;

        this.active = false;

        this.init(width, height, parent);
    }

    Renderer.prototype.active = false;

    Renderer.prototype.init = function(width, height, parent) {
        var that = this;

        that.renderer = new THREE.WebGLRenderer({
            // antialias: true,
            // alpha: true
        });
    	that.renderer.setFaceCulling(0);
    	that.renderer.setSize(width, height);
    	that.renderer.autoClear = false;
        // that.renderer.sortObjects = false;

        that.renderer.gammaInput = true;
        that.renderer.gammaOutput = true;
        that.renderer.physicallyBasedShading = true;

    	parent.appendChild( that.renderer.domElement );

    	that.clock = new THREE.Clock();

    	window.addEventListener('resize', function(e) {
    	    that.onWindowResize(e);
    	}, false);
    };


    Renderer.prototype.onWindowResize = function() {
        var height = window.innerHeight,
            width = window.innerWidth,
            aspect = width / height;

		this.renderer.setSize( width, height );

        if(this.sceneManager) {
            this.sceneManager.background.camera.aspect = aspect;
            this.sceneManager.middleground.camera.aspect = aspect;
            this.sceneManager.foreground.camera.aspect = aspect;

            this.sceneManager.background.camera.updateProjectionMatrix();
            this.sceneManager.middleground.camera.updateProjectionMatrix();
            this.sceneManager.foreground.camera.updateProjectionMatrix();
        }
    };


    Renderer.prototype.setSceneManager = function(manager) {
        this.sceneManager = manager;
    };


    Renderer.prototype.start = function() {
        var that = this;

        if(!that.sceneManager) return;

        var sceneManager = that.sceneManager,
            getDelta = that.clock.getDelta,
            tickCount = 0;

        function animate() {
            if(that.active) {
                requestAnimationFrame(animate);

                ++tickCount;

                // if(tickCount % 1 === 0) {
                    that.render( getDelta.call(that.clock), sceneManager.getObjects() );
                    tickCount = 0;
                // }
            }
        }


        that.active = true;

        animate();
    };


    Renderer.prototype.stop = function() {
        this.active = false;
    };


    Renderer.prototype.render = function(dt, objects) {
        var that = this,
            renderer = that.renderer,
            i = 0,
            il = objects.length,
            obj,
            sceneManager = that.sceneManager,
            bg = sceneManager.background,
            mg = sceneManager.middleground,
            fg = sceneManager.foreground;


        // We need to clear the canvas since this renderer doesn't autoclear.
        renderer.clear();


        // Update all the objects in the sceneManager's cache.
		for(i = 0; i < il; ++i) {
			obj = objects[i];
            obj.tick(dt);
		}


		// Call each scene's tick function (just in case the camera is using
	    // any controls and requires updating on a per-frame basis).
	    bg.tick.call(bg, dt);
	    mg.tick.call(mg, dt);
	    // fg.tick.call(fg, dt);


        // Render the scenes
        // if(this.postProcesses['background']) {
        //     this.postProcesses['background'].composer.render();
        // }
        // else {
            // renderer.render(bg.scene, bg.camera);
        // }

        // if(this.postProcesses['middleground']) {
        //     this.postProcesses['middleground'].composer.render();
        // }
        // else {
            // renderer.render(mg.scene, mg.camera);
        // }

        // Clear only the depth buffer we've accumulated so far, so anything
        // in the foreground scene is drawn on top of the background
        // and middleground scenes.
        // renderer.clear(false, true, false);


        // if(this.postProcesses['foreground']) {
        //     this.postProcesses['foreground'].composer.render();
        // }
        // else {
        //     renderer.render(fg.scene, fg.camera);
        // }


        if(this.postProcesses) {
            mg.scene.overrideMaterial = this.postProcesses.mgDepthBuffer;
            renderer.render( mg.scene, mg.camera, this.postProcesses.depthTarget, true );
            mg.scene.overrideMaterial = null;
            this.postProcesses.composer.render();
            renderer.clear(false, true, false);
            renderer.render( fg.scene, fg.camera );
        }
        else {
            renderer.render( bg.scene, bg.camera );
            renderer.render( mg.scene, mg.camera );
            renderer.clear(false, true, false);
            renderer.render( fg.scene, fg.camera );
        }

    };


    Renderer.prototype.enablePostProcessing = function() {
        if(this.postProcesses) return;

        this.postProcesses = {};

        this.postProcesses.depthShader = THREE.ShaderLib[ "depthRGBA" ];
        this.postProcesses.depthUniforms = THREE.UniformsUtils.clone( this.postProcesses.depthShader.uniforms );

        this.postProcesses.depthMaterial = new THREE.ShaderMaterial({
            fragmentShader: this.postProcesses.depthShader.fragmentShader,
            vertexShader: this.postProcesses.depthShader.vertexShader,
            uniforms: this.postProcesses.depthUniforms
        }) ;
        this.postProcesses.depthMaterial.blending = THREE.NoBlending;


        this.postProcesses.renderTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            stencilBuffer: true
        });
        this.postProcesses.composer = new THREE.EffectComposer( this.renderer, this.postProcesses.renderTarget );

        this.postProcesses.bgRenderPass = new THREE.RenderPass( this.sceneManager.background.scene, this.sceneManager.background.camera );
        this.postProcesses.mgRenderPass = new THREE.RenderPass( this.sceneManager.middleground.scene, this.sceneManager.middleground.camera );
        this.postProcesses.mgRenderPass.clear = false;

        this.postProcesses.clearMask = new THREE.ClearMaskPass();
        this.postProcesses.mgRenderMask = new THREE.MaskPass( this.sceneManager.middleground.scene, this.sceneManager.middleground.camera );
        this.postProcesses.depthTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
            minFilter: THREE.NearestFilter,
            magFilter: THREE.NearestFilter,
            format: THREE.RGBAFormat
        });


        var bloomPass = new THREE.BloomPass( 1.2 );
        var copyPass = new THREE.ShaderPass( THREE.CopyShader );
        copyPass.renderToScreen = true;

        this.bloomPass = bloomPass;

        this.postProcesses.composer.addPass( this.postProcesses.bgRenderPass );
        this.postProcesses.composer.addPass( this.postProcesses.mgRenderPass );
        this.postProcesses.composer.addPass( this.postProcesses.mgRenderMask );
        this.postProcesses.composer.addPass( this.postProcesses.clearMask );
        this.postProcesses.composer.addPass( bloomPass );
        this.postProcesses.composer.addPass( copyPass );
    };



    Renderer.prototype.setBloomLevel = function( level ) {
        this.bloomPass.materialCopy.uniforms.opacity.value = level;
    };



    attachTo.Renderer = Renderer;

}(window));