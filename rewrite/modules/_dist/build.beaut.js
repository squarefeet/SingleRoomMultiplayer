(function() {
    function a(a) {
        if (this.options = {
            models: null,
            images: null,
            textures: null,
            fonts: null,
            sounds: null,
            parent: document.body,
            onModelsLoaded: null,
            onImagesLoaded: null,
            onTexturesLoaded: null,
            onFontsLoaded: null,
            onSoundsLoaded: null,
            onAllLoaded: null,
            events: null
        }, a) for (var b in a) this.options[b] = a[b];
        this.colladaLoader = new v.ColladaLoader(), this.loaded = {
            models: {},
            images: {},
            textures: {},
            fonts: {},
            sounds: {}
        }, this.domElement = document.createElement("div"), this._makeLoaderElements(), 
        this.options.parent.appendChild(this.domElement);
        for (var b in this) "function" == typeof this[b] && (this[b] = this[b].bind(this));
    }
    function b(a) {
        var b = {
            keyboardHandler: null,
            mouseHandler: null,
            targetCameras: null,
            positionVelocityIncrement: 10,
            positionVelocityDecrement: .99,
            rotationDamping: 50,
            rollVelocityIncrement: .05,
            rollVelocityDecrement: .95,
            maxPositionVelocity: 1e3,
            maxRotationVelocity: 1e3,
            maxRollVelocity: 2
        };
        if (a) for (var c in a) b[c] = a[c];
        var d = 0, e = 0, f = 0, g = 0, h = !1, i = !1, j = !1, k = !1, l = !1, m = !1, n = 0, o = new v.Vector3(), p = new v.Quaternion(), q = new v.Vector3(), r = !(!b.keyboardHandler || !b.mouseHandler);
        x.controls;
        for (var c = 0; c < b.targetCameras.length; ++c) b.targetCameras[c].useQuaternion = !0;
        for (var c in this) "function" == typeof this[c] && (this[c] = this[c].bind(this));
        var s = function() {
            var a = b.rollVelocityIncrement, c = b.rollVelocityDecrement, h = b.maxRollVelocity;
            l ? n += a : m ? n -= a : n *= c, n > h ? n = h : -h > n && (n = -h), f && g && (o.y = -(d - f) / f / b.rotationDamping, 
            o.x = -(e - g) / g / b.rotationDamping), a = null, c = null, h = null;
        }, t = function() {
            var a = b.positionVelocityIncrement, c = b.positionVelocityDecrement, d = b.maxPositionVelocity;
            h ? q.z -= a : i ? q.z += a : x.automaticShipDeceleration && (q.z *= c), j ? q.x -= a : k ? q.x += a : q.x *= c, 
            q.z > d ? q.z = d : q.z < -d && (q.z = -d), q.x > d ? q.x = d : q.x < -d && (q.x = -d), 
            a = null, c = null, d = null;
        }, u = function(a, b, c, d) {
            a.__updatePosition && (a.translateX(b), a.translateY(c), a.translateZ(d)), a.__updateRotation && a.quaternion.multiply(p);
        }, w = function(a) {
            var c, d = q.x * a, e = q.y * a, f = q.z * a, g = n * a, h = b.targetCameras, i = h.length;
            for (p.set(o.x, o.y, g, 1).normalize(), c = 0; i > c; ++c) u(h[c], d, e, f);
            d = null, e = null, f = null, g = null, h = null, i = null, c = null;
        }, y = function() {
            var a = b.mouseHandler;
            b.keyboardHandler, d = a.x, e = a.y, f = a.centerX, g = a.centerY;
        };
        this.tick = function(a) {
            r && y(), s(), t(), w(a);
        }, this.set = function() {}, this.setForward = function(a) {
            h = a;
        }, this.setBackward = function(a) {
            i = a;
        }, this.setLeft = function(a) {
            j = a;
        }, this.setRight = function(a) {
            k = a;
        }, this.setRollLeft = function(a) {
            l = a;
        }, this.setRollRight = function(a) {
            m = a;
        }, this.setX = function(a) {
            d = a;
        }, this.setY = function(a) {
            e = a;
        }, this.setCenterX = function(a) {
            f = a;
        }, this.setCenterY = function(a) {
            g = a;
        };
    }
    function c() {
        this.elements = {}, this._makeElements();
    }
    function d() {
        var a = 1, b = 3, c = [], d = [], e = this;
        this.prevX = 0, this.prevY = 0, this.centerX = 0 | window.innerWidth / 2, this.centerY = 0 | window.innerHeight / 2, 
        this.x = +this.centerX, this.y = +this.centerY, this.left = 0, this.right = 0, document.addEventListener("mousedown", function(d) {
            d.preventDefault(), d.which === a ? e.left = 1 : d.which === b && (e.right = 1);
            for (var f = 0; f < c.length; ++f) c[f]();
        }, !1), document.addEventListener("mousemove", function(a) {
            e.prevX = e.x, e.prevY = e.y, e.x = a.pageX, e.y = a.pageY;
        }, !1), document.addEventListener("mouseup", function(c) {
            c.preventDefault(), c.which === a ? e.left = 0 : c.which === b && (e.right = 0);
            for (var f = 0; f < d.length; ++f) d[f]();
        }, !1), this.onResize = function() {
            e.centerX = window.innerWidth / 2, e.centerY = window.innerHeight / 2;
        }, this.addMouseDownListener = function(a) {
            c.push(a);
        }, this.addMouseUpListener = function(a) {
            d.push(a);
        };
    }
    function e() {
        var a = [], b = {}, c = {}, d = !1, e = !1, f = !1, g = !1, h = !1;
        document.addEventListener("keydown", function(c) {
            var i = String.fromCharCode(c.keyCode).toLowerCase(), j = c.keyCode, k = b[i];
            for (var l in x.keyMap) if (j === x.keyMap[l]) {
                x.keyMapPreventDefaults.indexOf(l) > -1 && c.preventDefault(), i = l;
                break;
            }
            if (console.log(j, i), d = c.metaKey, e = c.shiftKey, f = c.altKey, g = c.altGraphKey, 
            h = c.ctrlKey, a[j] = 1, k) for (var l = 0; l < k.length; ++l) k[l]();
        }, !1), document.addEventListener("keyup", function(b) {
            var i = String.fromCharCode(b.keyCode).toLowerCase(), j = i.charCodeAt(0), k = c[i];
            if (d = b.metaKey, e = b.shiftKey, f = b.altKey, g = b.altGraphKey, h = b.ctrlKey, 
            a[j] = 0, k) for (var l = 0; l < k.length; ++l) k[l]();
        }, !1), this.isPressed = function(b) {
            var c = !1;
            b = b.split("+");
            for (var i = 0; i < b.length; ++i) if (c = !1, "meta" === b[i] && d || "shift" === b[i] && e || "alt" === b[i] && f || "altGraph" === b[i] && g || "ctrl" === b[i] && h ? c = !0 : a[b[i].charCodeAt(0)] && (c = !0), 
            !c) return !1;
            return !0;
        }, this.addKeyDownListener = function(a, c) {
            b[a] || (b[a] = []), b[a].push(c);
        }, this.addKeyUpListener = function(a, b) {
            c[a] || (c[a] = []), c[a].push(b);
        };
    }
    function f(a) {
        var b = {
            layers: null,
            layerOrder: [],
            fov: 75,
            aspect: window.innerWidth / window.innerHeight,
            near: .1,
            far: 1e5,
            useQuaternion: !0
        };
        if (a) for (var c in a) b[c] = a[c];
        a = null, c = null;
        var d = {}, e = {}, f = [], g = function(a, c) {
            var f = {};
            f.scene = new v.Scene(), f.camera = new v.PerspectiveCamera(b.fov, b.aspect, b.near, b.far), 
            f.camera.useQuaternion = b.useQuaternion, f.tick = null, c && (f.camera.__updatePosition = !!c.updatePosition, 
            f.camera.__updateRotation = !!c.updateRotation), d[a] = f, e[a] = [];
        }, h = function(a, b, c) {
            d[a].scene.fog = new v.FogExp2(b, c);
        }, i = function(a, b) {
            e[a].push(b), d[a].scene.add(b);
        }, j = function(a, b) {
            for (var c = b.getRenderables(), f = e[a], g = d[a].scene, h = 0; h < c.length; ++h) f.push(c[h]), 
            g.add(c[h]);
            c = null, h = null, f = null, g = null;
        }, k = function(a) {
            return e[a];
        }, l = function() {
            return f;
        }, m = function(a) {
            return d[a];
        }, n = function(a) {
            return e[a];
        }, o = function() {
            var a = [];
            for (var b in d) a.push(d[b].camera);
            return a;
        }, p = function(a, b, c, e) {
            var f = d[a].camera;
            f.position.x = b, f.position.y = c, f.position.z = e;
        }, q = function(a, b, c, e, f) {
            var g = d[a].camera;
            g.useQuaternion ? (g.quaternion.x = b, g.quaternion.y = c, g.quaternion.z = e, g.quaternion.w = f) : (g.rotation.x = b, 
            g.rotation.y = c, g.rotation.z = e);
        }, r = function(a, b) {
            d[a].camera.lookAt(b);
        };
        for (var c in b.layers) g(c, b.layers[c]);
        for (var c = 0; c < b.layerOrder.length; ++c) f.push(d[b.layerOrder[c]]);
        this.addObjectToLayer = j, this.addObject3dToLayer = i, this.addFogToLayer = h, 
        this.getRenderablesForLayer = k, this.getLayers = l, this.getLayerWithName = m, 
        this.getStoreWithName = n, this.setCameraRotationForLayer = q, this.setCameraPositionForLayer = p, 
        this.setCameraLookAtForLayer = r, this.getAllCameras = o;
    }
    function g(a) {
        this.options = a, "function" == typeof this.initialize && this.initialize();
    }
    function h() {}
    function i(a) {
        a = a || {}, this.particlesPerSecond = a.particlesPerSecond || 100, this.type = a.type || "cube", 
        this.position = a.position || new v.Vector3(), this.positionSpread = a.positionSpread || new v.Vector3(), 
        this.radius = "number" == typeof a.radius ? a.radius : 10, this.acceleration = a.acceleration || new v.Vector3(), 
        this.accelerationSpread = a.accelerationSpread || new v.Vector3(), this.velocity = a.velocity || new v.Vector3(), 
        this.velocitySpread = a.velocitySpread || new v.Vector3(), this.speed = "number" == typeof a.speed ? a.speed : 0, 
        this.speedSpread = "number" == typeof a.speedSpread ? a.speedSpread : 0, this.size = a.size || 10, 
        this.sizeSpread = a.sizeSpread || 0, this.sizeEnd = a.sizeEnd || 10, this.emitterDuration = a.emitterDuration || null, 
        this.alive = "number" == typeof a.alive ? a.alive : 1, this.numParticles = null, 
        this.attributes = null, this.vertices = null, this.verticesIndex = 0, this.age = 0, 
        this.maxAge = null, this.recycled = [], this.userData = {};
    }
    function j(a) {
        this.fixedTimeStep = a.fixedTimeStep || .016, this.maxAge = a.maxAge || 3, this.colorStart = a.colorStart || new v.Color("white"), 
        this.colorEnd = a.colorEnd || new v.Color("blue"), this.opacityStart = "undefined" != typeof a.opacityStart ? a.opacityStart : 1, 
        this.opacityEnd = a.opacityEnd || 0, this.texture = ("string" == typeof a.texture ? G.loaded.textures[a.texture] : a.texture) || null, 
        this.hasPerspective = a.hasPerspective || 1, this.colorize = a.colorize || 1, this.blending = a.blending || v.AdditiveBlending, 
        this.transparent = a.transparent || !0, this.alphaTest = a.alphaTest || .5, this.depthWrite = a.depthWrite || !1, 
        this.depthTest = a.depthTest || !1, this.uniforms = {
            customColor: {
                type: "c",
                value: this.colorStart
            },
            customColorEnd: {
                type: "c",
                value: this.colorEnd
            },
            duration: {
                type: "f",
                value: parseFloat(this.maxAge)
            },
            texture: {
                type: "t",
                value: this.texture
            },
            hasPerspective: {
                type: "i",
                value: parseInt(this.hasPerspective)
            },
            colorize: {
                type: "i",
                value: parseInt(this.colorize)
            },
            opacity: {
                type: "f",
                value: parseFloat(this.opacityStart)
            },
            opacityEnd: {
                type: "f",
                value: parseFloat(this.opacityEnd)
            }
        }, this.attributes = {
            acceleration: {
                type: "v3",
                value: []
            },
            velocity: {
                type: "v3",
                value: []
            },
            alive: {
                type: "f",
                value: []
            },
            age: {
                type: "f",
                value: []
            },
            size: {
                type: "f",
                value: []
            },
            sizeEnd: {
                type: "f",
                value: []
            }
        }, this.emitters = [], this.geometry = null, this.material = null, this.mesh = null, 
        this._createGeometry(), this._createMaterial(), this._createMesh();
    }
    function k(a) {
        var b = .3, c = G.loaded.textures;
        this.details = {
            jupiter: {
                size: 71492 * a.scale,
                distance: 0,
                period: 0
            },
            io: {
                size: 3642 * a.scale,
                distance: 421800 * a.scale * b,
                period: 2.231 * a.scale * b
            },
            europa: {
                size: 3121 * a.scale,
                distance: 671100 * a.scale * b,
                period: (4 - 3.551) * a.scale * b
            },
            ganymede: {
                size: 5262 * a.scale,
                distance: 1070400 * a.scale * b,
                period: 7.155 * a.scale * b
            },
            callisto: {
                size: 4820 * a.scale,
                distance: 1882700 * a.scale * b,
                period: 16.69 * a.scale * b
            }
        }, this.jupiterMaterial = new v.MeshPhongMaterial({
            color: 16777215,
            shininess: 10,
            specular: 16308919,
            map: c[a.planetTexture]
        }), this.jupiterAtmosphereMaterial = new v.MeshPhongMaterial({
            transparent: !0,
            map: c[a.atmosphereTexture],
            color: 16777215,
            blending: v.AdditiveBlending,
            opacity: .8
        }), this.ioMaterial = new v.MeshPhongMaterial({
            color: 16777215,
            shininess: 10,
            map: c[a.smallMoonTexture]
        }), this.europaMaterial = new v.MeshPhongMaterial({
            color: 16777215,
            shininess: 10,
            map: c[a.largeMoonTexture]
        }), this.jupiterGeometry = new v.SphereGeometry(this.details.jupiter.size, 32, 32), 
        this.jupiterAtmosphereGeometry = new v.SphereGeometry(this.details.jupiter.size + 2, 32, 32), 
        this.jupiterAtmosphereGeometry2 = new v.SphereGeometry(this.details.jupiter.size + 4, 32, 32), 
        this.ioGeometry = new v.SphereGeometry(this.details.io.size, 32, 32), this.europaGeometry = new v.SphereGeometry(this.details.europa.size, 32, 32), 
        this.jupiter = new v.Mesh(this.jupiterGeometry, this.jupiterMaterial), this.jupiterAtmosphere = new v.Mesh(this.jupiterAtmosphereGeometry, this.jupiterAtmosphereMaterial), 
        this.jupiterAtmosphere2 = new v.Mesh(this.jupiterAtmosphereGeometry2, this.jupiterAtmosphereMaterial), 
        this.io = new v.Mesh(this.ioGeometry, this.ioMaterial), this.europa = new v.Mesh(this.europaGeometry, this.europaMaterial), 
        this.jupiter.position = a.position, this.jupiterAtmosphere.position = this.jupiterAtmosphere2.position = this.jupiter.position, 
        this.jupiterAtmosphere2.rotation.y = Math.PI / 2, this.io.position = a.position.clone(), 
        this.io.position.z += this.details.io.distance, this.europa.position = a.position.clone(), 
        this.europa.position.z += this.details.europa.distance, this.renderables = [], this.renderables.push(this.jupiter), 
        this.renderables.push(this.jupiterAtmosphere), this.renderables.push(this.jupiterAtmosphere2), 
        this.renderables.push(this.io), this.renderables.push(this.europa);
    }
    function l(a) {
        this.renderables = [], this.material = new v.MeshBasicMaterial({
            map: G.loaded.textures[a.sunTexture],
            transparent: !0
        }), this.material.blending = v.AdditiveBlending, this.geometry = new v.PlaneGeometry(200, 200, 1, 1), 
        this.mesh = new v.Mesh(this.geometry, this.material), this.mesh.position = a.position, 
        this.mesh.rotation.y = Math.PI / 2, this.addLensFlare(a), this.renderables.push(this.mesh);
    }
    function m(a, b, c) {
        var d = [];
        this.get = function() {
            return d.length ? d.pop() : void 0;
        }, this.release = function(a) {
            this.reset(a), d.unshift(a);
        }, this.reset = function() {}, this.getLength = function() {
            return d.length;
        }, this.getStore = function() {
            return d;
        };
        for (var e, f = 0; a > f; ++f) e = new b(c), d.push(e);
    }
    function n(a) {
        var b = {
            width: window.innerWidth,
            height: window.innerHeight,
            elementWidth: window.innerWidth,
            elementHeight: window.innerHeight,
            parent: document.body,
            antialias: !0,
            alpha: !0,
            precision: "highp",
            stencil: !0,
            preserveDrawingBuffer: !1,
            clearColor: 0,
            clearAlpha: 1,
            maxLights: 4,
            faceCulling: 0,
            autoClear: !1,
            gammaInput: !1,
            gammaOutput: !1,
            physicallyBasedShading: !1
        };
        if ("object" == typeof a) for (var c in a) b[c] = a[c];
        a = null, c = null;
        var d = 0, e = 0, f = null, g = null, h = null, i = [], j = 0, k = new v.WebGLRenderer({
            antialias: b.antialias,
            alpha: b.alpha,
            precision: b.precision,
            stencil: b.stencil,
            preserveDrawingBuffer: b.preserveDrawingBuffer,
            maxLights: b.maxLights
        });
        k.setFaceCulling(b.faceCulling), k.setClearColor(b.clearColor, b.clearAlpha), k.setSize(b.width, b.height), 
        k.domElement.style.width = b.elementWidth + "px", k.domElement.style.height = b.elementHeight + "px", 
        k.autoClear = b.autoClear, k.gammaInput = b.gammaInput, k.gammaOutput = b.gammaOutput, 
        k.physicallyBasedShading = b.physicallyBasedShading;
        var l = new v.Clock(), m = function(a) {
            f = a;
        }, n = function(a) {
            var c = a.domElement, d = c.style;
            d.position = "absolute", d.top = "0px", d.left = "0px", d.zIndex = "999999", b.parent.appendChild(c), 
            g = a;
        }, o = function() {
            b.parent.appendChild(k.domElement);
        }, p = function(a) {
            "function" == typeof a && (i.push(a), j = i.length);
        }, q = function() {
            0 === d && null !== f && (d = 1, requestAnimationFrame(s));
        }, r = function() {
            1 === d && (d = 0);
        }, s = function() {
            0 !== d && (requestAnimationFrame(s), t(), g && g.update());
        }, t = function() {
            var a, c, d, g = f.getLayers(), m = 0, n = g.length;
            for (b.autoClear || k.clear(), e = l.getDelta(), m; j > m; ++m) i[m](e);
            if (h) g[1].scene.overrideMaterial = h.depthMaterial, k.render(g[1].scene, g[1].camera, h.depthTarget, !0), 
            g[1].scene.overrideMaterial = null, h.composer.render(), k.clear(!1, !0, !1), k.render(g[2].scene, g[2].camera); else for (m = 0; n > m; ++m) a = g[m], 
            k.render(a.scene, a.camera), b.autoClear || k.clear(!1, !0, !1);
            g = null, m = null, n = null, a = null, c = null, d = null;
        }, u = function(a, b) {
            if (!h) {
                h = {}, h.depthShader = v.ShaderLib.depthRGBA, h.depthUniforms = v.UniformsUtils.clone(h.depthShader.uniforms), 
                h.depthMaterial = new v.ShaderMaterial({
                    fragmentShader: h.depthShader.fragmentShader,
                    vertexShader: h.depthShader.vertexShader,
                    uniforms: h.depthUniforms
                }), h.depthMaterial.blending = v.NoBlending, h.renderTarget = new v.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
                    minFilter: v.LinearFilter,
                    magFilter: v.LinearFilter,
                    format: v.RGBAFormat,
                    stencilBuffer: !0
                }), h.composer = new v.EffectComposer(k, h.renderTarget), h.renderPasses = [];
                for (var c = 0; c < a.length; ++c) a[c] = f.getLayerWithName(a[c]), h.renderPasses.push(new v.RenderPass(a[c].scene, a[c].camera)), 
                0 !== c && (h.renderPasses[c].clear = !1);
                b = f.getLayerWithName(b), h.clearMask = new v.ClearMaskPass(), h.clearMaskPass = new v.MaskPass(b.scene, b.camera), 
                h.depthTarget = new v.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
                    minFilter: v.NearestFilter,
                    magFilter: v.NearestFilter,
                    format: v.RGBAFormat
                });
                var d = new v.BloomPass(.5), e = new v.ShaderPass(v.CopyShader);
                e.renderToScreen = !0;
                for (var c = 0; c < h.renderPasses.length; ++c) h.composer.addPass(h.renderPasses[c]);
                h.composer.addPass(h.clearMaskPass), h.composer.addPass(h.clearMask), h.composer.addPass(d), 
                h.composer.addPass(e), this.bloomPass = d;
            }
        };
        this.start = q, this.stop = r, this.setLayerManager = m, this.addStats = n, this.addToDOM = o, 
        this.addPreRenderTickFunction = p, this.enablePostProcessing = u;
    }
    function o(a) {
        this.pool = [], this.emitterPool = [], this.activeRockets = [], this.launchTimes = {}, 
        this.model = G.loaded.models[a.model].dae.clone(), this.mesh = new v.Object3D(), 
        this.particleGroup = a.particleGroup, this._makeRockets(), this.targetMatrix = new v.Matrix4(), 
        this.targetQuaternion = new v.Quaternion(), this.invertXAxisQuaternion = new v.Quaternion(1, 0, 0, 0), 
        this.acceleration = a.acceleration, this.velocity = a.velocity, this.maxVelocity = a.maxVelocity, 
        this.freeFlightDuration = a.freeFlightDuration, this.lerpAmount = a.lerpAmount, 
        this.maxAge = a.maxAge, this.launchGap = a.launchGap, this.renderables = [], this.renderables.push(this.mesh), 
        this.tick = this.tick.bind(this);
    }
    function p(a) {
        this.controls = null, this.emitter = null, this.particleGroup = a.particleGroup, 
        this.booster = null, this.weapons = {}, this.mesh = assetLoader.loaded.models[a.model].dae.clone(), 
        this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = x.ship.scale, this.mesh.position.setX(a.x), 
        this.mesh.position.setY(a.y), this.mesh.position.setZ(a.z), this._addControls(), 
        this._addWeapons(), a.useEmitter && this.particleGroup ? this._addEmitter(this.particleGroup) : this._addBooster(), 
        this.renderables = [], this.renderables.push(this.mesh);
    }
    function q(a) {
        this.material = new v.MeshBasicMaterial({
            map: G.loaded.textures[a.texture],
            side: v.BackSide
        }), this.geometry = new v.SphereGeometry(a.radius, a.segmentsWidth, a.segmentsHeight), 
        this.mesh = new v.Mesh(this.geometry, this.material), this.renderables = [], this.renderables.push(this.mesh);
    }
    function r(a) {
        var b = {
            width: 1e5,
            height: 1e5,
            depth: 1e5,
            stars: 1e6,
            color: 16777215,
            size: 1,
            minDistance: 0,
            texture: null
        };
        if (a) for (var c in a) b[c] = a[c];
        var d = function() {
            return new v.ParticleBasicMaterial({
                size: b.size,
                map: G.loaded.textures[b.texture],
                blending: v.AdditiveBlending,
                depthTest: !0,
                transparent: !0
            });
        }, e = function() {
            var a = Math.random() * b.width - b.width / 2;
            return a > 0 && a < b.minDistance ? a += b.minDistance : 0 > a && a > -b.minDistance && (a -= b.minDistance), 
            a;
        }, f = function() {
            for (var a = 0; a < b.stars; ++a) h.vertices.push(new v.Vector3(e(), e(), e()));
        }, g = d(), h = new v.Geometry();
        f(), this.mesh = new v.ParticleSystem(h, g), this.renderables = [ this.mesh ], this.getRenderables = function() {
            return this.renderables;
        };
    }
    function s() {
        "function" == typeof this.initialize && this.initialize();
    }
    function t() {
        var a = x.controls, b = H, c = E;
        c.addKeyDownListener(a.FORWARD, function() {
            b.setForward(!0);
        }), c.addKeyDownListener(a.BACKWARD, function() {
            b.setBackward(!0);
        }), c.addKeyDownListener(a.LEFT, function() {
            b.setLeft(!0);
        }), c.addKeyDownListener(a.RIGHT, function() {
            b.setRight(!0);
        }), c.addKeyDownListener(a.ROLL_LEFT, function() {
            b.setRollLeft(!0);
        }), c.addKeyDownListener(a.ROLL_RIGHT, function() {
            b.setRollRight(!0);
        }), c.addKeyUpListener(a.FORWARD, function() {
            b.setForward(!1);
        }), c.addKeyUpListener(a.BACKWARD, function() {
            b.setBackward(!1);
        }), c.addKeyUpListener(a.LEFT, function() {
            b.setLeft(!1);
        }), c.addKeyUpListener(a.RIGHT, function() {
            b.setRight(!1);
        }), c.addKeyUpListener(a.ROLL_LEFT, function() {
            b.setRollLeft(!1);
        }), c.addKeyUpListener(a.ROLL_RIGHT, function() {
            b.setRollRight(!1);
        });
    }
    var u = function() {
        var a = Date.now(), b = a, c = 0, d = 1/0, e = 0, f = 0, g = 1/0, h = 0, i = 0, j = 0, k = document.createElement("div");
        k.id = "stats", k.addEventListener("mousedown", function(a) {
            a.preventDefault(), s(++j % 2);
        }, !1), k.style.cssText = "width:80px;opacity:0.9;cursor:pointer";
        var l = document.createElement("div");
        l.id = "fps", l.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#002", 
        k.appendChild(l);
        var m = document.createElement("div");
        m.id = "fpsText", m.style.cssText = "color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px", 
        m.innerHTML = "FPS", l.appendChild(m);
        var n = document.createElement("div");
        for (n.id = "fpsGraph", n.style.cssText = "position:relative;width:74px;height:30px;background-color:#0ff", 
        l.appendChild(n); 74 > n.children.length; ) {
            var o = document.createElement("span");
            o.style.cssText = "width:1px;height:30px;float:left;background-color:#113", n.appendChild(o);
        }
        var p = document.createElement("div");
        p.id = "ms", p.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#020;display:none", 
        k.appendChild(p);
        var q = document.createElement("div");
        q.id = "msText", q.style.cssText = "color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px", 
        q.innerHTML = "MS", p.appendChild(q);
        var r = document.createElement("div");
        for (r.id = "msGraph", r.style.cssText = "position:relative;width:74px;height:30px;background-color:#0f0", 
        p.appendChild(r); 74 > r.children.length; ) o = document.createElement("span"), 
        o.style.cssText = "width:1px;height:30px;float:left;background-color:#131", r.appendChild(o);
        var s = function(a) {
            switch (j = a) {
              case 0:
                l.style.display = "block", p.style.display = "none";
                break;

              case 1:
                l.style.display = "none", p.style.display = "block";
            }
        };
        return {
            REVISION: 11,
            domElement: k,
            setMode: s,
            begin: function() {
                a = Date.now();
            },
            end: function() {
                var j = Date.now();
                c = j - a, d = Math.min(d, c), e = Math.max(e, c), q.textContent = c + " MS (" + d + "-" + e + ")";
                var k = Math.min(30, 30 - 30 * (c / 200));
                return r.appendChild(r.firstChild).style.height = k + "px", i++, j > b + 1e3 && (f = Math.round(1e3 * i / (j - b)), 
                g = Math.min(g, f), h = Math.max(h, f), m.textContent = f + " FPS (" + g + "-" + h + ")", 
                k = Math.min(30, 30 - 30 * (f / 100)), n.appendChild(n.firstChild).style.height = k + "px", 
                b = j, i = 0), j;
            },
            update: function() {
                a = this.end();
            }
        };
    }, v = v || {
        REVISION: "58"
    };
    self.console = self.console || {
        info: function() {},
        log: function() {},
        debug: function() {},
        warn: function() {},
        error: function() {}
    }, self.Int32Array = self.Int32Array || Array, self.Float32Array = self.Float32Array || Array, 
    String.prototype.trim = String.prototype.trim || function() {
        return this.replace(/^\s+|\s+$/g, "");
    }, v.extend = function(a, b) {
        if (Object.keys) for (var c = Object.keys(b), d = 0, e = c.length; e > d; d++) {
            var f = c[d];
            Object.defineProperty(a, f, Object.getOwnPropertyDescriptor(b, f));
        } else {
            var g = {}.hasOwnProperty;
            for (var f in b) g.call(b, f) && (a[f] = b[f]);
        }
        return a;
    }, function() {
        for (var a = 0, b = [ "ms", "moz", "webkit", "o" ], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"], 
        window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
        void 0 === window.requestAnimationFrame && (window.requestAnimationFrame = function(b) {
            var c = Date.now(), d = Math.max(0, 16 - (c - a)), e = window.setTimeout(function() {
                b(c + d);
            }, d);
            return a = c + d, e;
        }), window.cancelAnimationFrame = window.cancelAnimationFrame || function(a) {
            window.clearTimeout(a);
        };
    }(), v.CullFaceNone = 0, v.CullFaceBack = 1, v.CullFaceFront = 2, v.CullFaceFrontBack = 3, 
    v.FrontFaceDirectionCW = 0, v.FrontFaceDirectionCCW = 1, v.BasicShadowMap = 0, v.PCFShadowMap = 1, 
    v.PCFSoftShadowMap = 2, v.FrontSide = 0, v.BackSide = 1, v.DoubleSide = 2, v.NoShading = 0, 
    v.FlatShading = 1, v.SmoothShading = 2, v.NoColors = 0, v.FaceColors = 1, v.VertexColors = 2, 
    v.NoBlending = 0, v.NormalBlending = 1, v.AdditiveBlending = 2, v.SubtractiveBlending = 3, 
    v.MultiplyBlending = 4, v.CustomBlending = 5, v.AddEquation = 100, v.SubtractEquation = 101, 
    v.ReverseSubtractEquation = 102, v.ZeroFactor = 200, v.OneFactor = 201, v.SrcColorFactor = 202, 
    v.OneMinusSrcColorFactor = 203, v.SrcAlphaFactor = 204, v.OneMinusSrcAlphaFactor = 205, 
    v.DstAlphaFactor = 206, v.OneMinusDstAlphaFactor = 207, v.DstColorFactor = 208, 
    v.OneMinusDstColorFactor = 209, v.SrcAlphaSaturateFactor = 210, v.MultiplyOperation = 0, 
    v.MixOperation = 1, v.AddOperation = 2, v.UVMapping = function() {}, v.CubeReflectionMapping = function() {}, 
    v.CubeRefractionMapping = function() {}, v.SphericalReflectionMapping = function() {}, 
    v.SphericalRefractionMapping = function() {}, v.RepeatWrapping = 1e3, v.ClampToEdgeWrapping = 1001, 
    v.MirroredRepeatWrapping = 1002, v.NearestFilter = 1003, v.NearestMipMapNearestFilter = 1004, 
    v.NearestMipMapLinearFilter = 1005, v.LinearFilter = 1006, v.LinearMipMapNearestFilter = 1007, 
    v.LinearMipMapLinearFilter = 1008, v.UnsignedByteType = 1009, v.ByteType = 1010, 
    v.ShortType = 1011, v.UnsignedShortType = 1012, v.IntType = 1013, v.UnsignedIntType = 1014, 
    v.FloatType = 1015, v.UnsignedShort4444Type = 1016, v.UnsignedShort5551Type = 1017, 
    v.UnsignedShort565Type = 1018, v.AlphaFormat = 1019, v.RGBFormat = 1020, v.RGBAFormat = 1021, 
    v.LuminanceFormat = 1022, v.LuminanceAlphaFormat = 1023, v.RGB_S3TC_DXT1_Format = 2001, 
    v.RGBA_S3TC_DXT1_Format = 2002, v.RGBA_S3TC_DXT3_Format = 2003, v.RGBA_S3TC_DXT5_Format = 2004, 
    v.Color = function(a) {
        return void 0 !== a && this.set(a), this;
    }, v.Color.prototype = {
        constructor: v.Color,
        r: 1,
        g: 1,
        b: 1,
        set: function(a) {
            return a instanceof v.Color ? this.copy(a) : "number" == typeof a ? this.setHex(a) : "string" == typeof a && this.setStyle(a), 
            this;
        },
        setHex: function(a) {
            return a = Math.floor(a), this.r = (255 & a >> 16) / 255, this.g = (255 & a >> 8) / 255, 
            this.b = (255 & a) / 255, this;
        },
        setRGB: function(a, b, c) {
            return this.r = a, this.g = b, this.b = c, this;
        },
        setHSL: function(a, b, c) {
            if (0 === b) this.r = this.g = this.b = c; else {
                var d = function(a, b, c) {
                    return 0 > c && (c += 1), c > 1 && (c -= 1), 1 / 6 > c ? a + 6 * (b - a) * c : .5 > c ? b : 2 / 3 > c ? a + 6 * (b - a) * (2 / 3 - c) : a;
                }, e = .5 >= c ? c * (1 + b) : c + b - c * b, f = 2 * c - e;
                this.r = d(f, e, a + 1 / 3), this.g = d(f, e, a), this.b = d(f, e, a - 1 / 3);
            }
            return this;
        },
        setStyle: function(a) {
            if (/^rgb\((\d+),(\d+),(\d+)\)$/i.test(a)) {
                var b = /^rgb\((\d+),(\d+),(\d+)\)$/i.exec(a);
                return this.r = Math.min(255, parseInt(b[1], 10)) / 255, this.g = Math.min(255, parseInt(b[2], 10)) / 255, 
                this.b = Math.min(255, parseInt(b[3], 10)) / 255, this;
            }
            if (/^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.test(a)) {
                var b = /^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.exec(a);
                return this.r = Math.min(100, parseInt(b[1], 10)) / 100, this.g = Math.min(100, parseInt(b[2], 10)) / 100, 
                this.b = Math.min(100, parseInt(b[3], 10)) / 100, this;
            }
            if (/^\#([0-9a-f]{6})$/i.test(a)) {
                var b = /^\#([0-9a-f]{6})$/i.exec(a);
                return this.setHex(parseInt(b[1], 16)), this;
            }
            if (/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(a)) {
                var b = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(a);
                return this.setHex(parseInt(b[1] + b[1] + b[2] + b[2] + b[3] + b[3], 16)), this;
            }
            return /^(\w+)$/i.test(a) ? (this.setHex(v.ColorKeywords[a]), this) : void 0;
        },
        copy: function(a) {
            return this.r = a.r, this.g = a.g, this.b = a.b, this;
        },
        copyGammaToLinear: function(a) {
            return this.r = a.r * a.r, this.g = a.g * a.g, this.b = a.b * a.b, this;
        },
        copyLinearToGamma: function(a) {
            return this.r = Math.sqrt(a.r), this.g = Math.sqrt(a.g), this.b = Math.sqrt(a.b), 
            this;
        },
        convertGammaToLinear: function() {
            var a = this.r, b = this.g, c = this.b;
            return this.r = a * a, this.g = b * b, this.b = c * c, this;
        },
        convertLinearToGamma: function() {
            return this.r = Math.sqrt(this.r), this.g = Math.sqrt(this.g), this.b = Math.sqrt(this.b), 
            this;
        },
        getHex: function() {
            return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0;
        },
        getHexString: function() {
            return ("000000" + this.getHex().toString(16)).slice(-6);
        },
        getHSL: function() {
            var a = {
                h: 0,
                s: 0,
                l: 0
            };
            return function() {
                var b, c, d = this.r, e = this.g, f = this.b, g = Math.max(d, e, f), h = Math.min(d, e, f), i = (h + g) / 2;
                if (h === g) b = 0, c = 0; else {
                    var j = g - h;
                    switch (c = .5 >= i ? j / (g + h) : j / (2 - g - h), g) {
                      case d:
                        b = (e - f) / j + (f > e ? 6 : 0);
                        break;

                      case e:
                        b = (f - d) / j + 2;
                        break;

                      case f:
                        b = (d - e) / j + 4;
                    }
                    b /= 6;
                }
                return a.h = b, a.s = c, a.l = i, a;
            };
        }(),
        getStyle: function() {
            return "rgb(" + (0 | 255 * this.r) + "," + (0 | 255 * this.g) + "," + (0 | 255 * this.b) + ")";
        },
        offsetHSL: function(a, b, c) {
            var d = this.getHSL();
            return d.h += a, d.s += b, d.l += c, this.setHSL(d.h, d.s, d.l), this;
        },
        add: function(a) {
            return this.r += a.r, this.g += a.g, this.b += a.b, this;
        },
        addColors: function(a, b) {
            return this.r = a.r + b.r, this.g = a.g + b.g, this.b = a.b + b.b, this;
        },
        addScalar: function(a) {
            return this.r += a, this.g += a, this.b += a, this;
        },
        multiply: function(a) {
            return this.r *= a.r, this.g *= a.g, this.b *= a.b, this;
        },
        multiplyScalar: function(a) {
            return this.r *= a, this.g *= a, this.b *= a, this;
        },
        lerp: function(a, b) {
            return this.r += (a.r - this.r) * b, this.g += (a.g - this.g) * b, this.b += (a.b - this.b) * b, 
            this;
        },
        equals: function(a) {
            return a.r === this.r && a.g === this.g && a.b === this.b;
        },
        clone: function() {
            return new v.Color().setRGB(this.r, this.g, this.b);
        }
    }, v.ColorKeywords = {
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074
    }, v.Quaternion = function(a, b, c, d) {
        this.x = a || 0, this.y = b || 0, this.z = c || 0, this.w = void 0 !== d ? d : 1;
    }, v.Quaternion.prototype = {
        constructor: v.Quaternion,
        set: function(a, b, c, d) {
            return this.x = a, this.y = b, this.z = c, this.w = d, this;
        },
        copy: function(a) {
            return this.x = a.x, this.y = a.y, this.z = a.z, this.w = a.w, this;
        },
        setFromEuler: function(a, b) {
            var c = Math.cos(a.x / 2), d = Math.cos(a.y / 2), e = Math.cos(a.z / 2), f = Math.sin(a.x / 2), g = Math.sin(a.y / 2), h = Math.sin(a.z / 2);
            return void 0 === b || "XYZ" === b ? (this.x = f * d * e + c * g * h, this.y = c * g * e - f * d * h, 
            this.z = c * d * h + f * g * e, this.w = c * d * e - f * g * h) : "YXZ" === b ? (this.x = f * d * e + c * g * h, 
            this.y = c * g * e - f * d * h, this.z = c * d * h - f * g * e, this.w = c * d * e + f * g * h) : "ZXY" === b ? (this.x = f * d * e - c * g * h, 
            this.y = c * g * e + f * d * h, this.z = c * d * h + f * g * e, this.w = c * d * e - f * g * h) : "ZYX" === b ? (this.x = f * d * e - c * g * h, 
            this.y = c * g * e + f * d * h, this.z = c * d * h - f * g * e, this.w = c * d * e + f * g * h) : "YZX" === b ? (this.x = f * d * e + c * g * h, 
            this.y = c * g * e + f * d * h, this.z = c * d * h - f * g * e, this.w = c * d * e - f * g * h) : "XZY" === b && (this.x = f * d * e - c * g * h, 
            this.y = c * g * e - f * d * h, this.z = c * d * h + f * g * e, this.w = c * d * e + f * g * h), 
            this;
        },
        setFromAxisAngle: function(a, b) {
            var c = b / 2, d = Math.sin(c);
            return this.x = a.x * d, this.y = a.y * d, this.z = a.z * d, this.w = Math.cos(c), 
            this;
        },
        setFromRotationMatrix: function(a) {
            var b, c = a.elements, d = c[0], e = c[4], f = c[8], g = c[1], h = c[5], i = c[9], j = c[2], k = c[6], l = c[10], m = d + h + l;
            return m > 0 ? (b = .5 / Math.sqrt(m + 1), this.w = .25 / b, this.x = (k - i) * b, 
            this.y = (f - j) * b, this.z = (g - e) * b) : d > h && d > l ? (b = 2 * Math.sqrt(1 + d - h - l), 
            this.w = (k - i) / b, this.x = .25 * b, this.y = (e + g) / b, this.z = (f + j) / b) : h > l ? (b = 2 * Math.sqrt(1 + h - d - l), 
            this.w = (f - j) / b, this.x = (e + g) / b, this.y = .25 * b, this.z = (i + k) / b) : (b = 2 * Math.sqrt(1 + l - d - h), 
            this.w = (g - e) / b, this.x = (f + j) / b, this.y = (i + k) / b, this.z = .25 * b), 
            this;
        },
        inverse: function() {
            return this.conjugate().normalize(), this;
        },
        conjugate: function() {
            return this.x *= -1, this.y *= -1, this.z *= -1, this;
        },
        lengthSq: function() {
            return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
        },
        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        },
        normalize: function() {
            var a = this.length();
            return 0 === a ? (this.x = 0, this.y = 0, this.z = 0, this.w = 1) : (a = 1 / a, 
            this.x = this.x * a, this.y = this.y * a, this.z = this.z * a, this.w = this.w * a), 
            this;
        },
        multiply: function(a, b) {
            return void 0 !== b ? (console.warn("DEPRECATED: Quaternion's .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."), 
            this.multiplyQuaternions(a, b)) : this.multiplyQuaternions(this, a);
        },
        multiplyQuaternions: function(a, b) {
            var c = a.x, d = a.y, e = a.z, f = a.w, g = b.x, h = b.y, i = b.z, j = b.w;
            return this.x = c * j + f * g + d * i - e * h, this.y = d * j + f * h + e * g - c * i, 
            this.z = e * j + f * i + c * h - d * g, this.w = f * j - c * g - d * h - e * i, 
            this;
        },
        multiplyVector3: function(a) {
            return console.warn("DEPRECATED: Quaternion's .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."), 
            a.applyQuaternion(this);
        },
        slerp: function(a, b) {
            var c = this.x, d = this.y, e = this.z, f = this.w, g = f * a.w + c * a.x + d * a.y + e * a.z;
            if (0 > g ? (this.w = -a.w, this.x = -a.x, this.y = -a.y, this.z = -a.z, g = -g) : this.copy(a), 
            g >= 1) return this.w = f, this.x = c, this.y = d, this.z = e, this;
            var h = Math.acos(g), i = Math.sqrt(1 - g * g);
            if (Math.abs(i) < .001) return this.w = .5 * (f + this.w), this.x = .5 * (c + this.x), 
            this.y = .5 * (d + this.y), this.z = .5 * (e + this.z), this;
            var j = Math.sin((1 - b) * h) / i, k = Math.sin(b * h) / i;
            return this.w = f * j + this.w * k, this.x = c * j + this.x * k, this.y = d * j + this.y * k, 
            this.z = e * j + this.z * k, this;
        },
        equals: function(a) {
            return a.x === this.x && a.y === this.y && a.z === this.z && a.w === this.w;
        },
        fromArray: function(a) {
            return this.x = a[0], this.y = a[1], this.z = a[2], this.w = a[3], this;
        },
        toArray: function() {
            return [ this.x, this.y, this.z, this.w ];
        },
        clone: function() {
            return new v.Quaternion(this.x, this.y, this.z, this.w);
        }
    }, v.Quaternion.slerp = function(a, b, c, d) {
        return c.copy(a).slerp(b, d);
    }, v.Vector2 = function(a, b) {
        this.x = a || 0, this.y = b || 0;
    }, v.Vector2.prototype = {
        constructor: v.Vector2,
        set: function(a, b) {
            return this.x = a, this.y = b, this;
        },
        setX: function(a) {
            return this.x = a, this;
        },
        setY: function(a) {
            return this.y = a, this;
        },
        setComponent: function(a, b) {
            switch (a) {
              case 0:
                this.x = b;
                break;

              case 1:
                this.y = b;
                break;

              default:
                throw new Error("index is out of range: " + a);
            }
        },
        getComponent: function(a) {
            switch (a) {
              case 0:
                return this.x;

              case 1:
                return this.y;

              default:
                throw new Error("index is out of range: " + a);
            }
        },
        copy: function(a) {
            return this.x = a.x, this.y = a.y, this;
        },
        add: function(a, b) {
            return void 0 !== b ? (console.warn("DEPRECATED: Vector2's .add() now only accepts one argument. Use .addVectors( a, b ) instead."), 
            this.addVectors(a, b)) : (this.x += a.x, this.y += a.y, this);
        },
        addVectors: function(a, b) {
            return this.x = a.x + b.x, this.y = a.y + b.y, this;
        },
        addScalar: function(a) {
            return this.x += a, this.y += a, this;
        },
        sub: function(a, b) {
            return void 0 !== b ? (console.warn("DEPRECATED: Vector2's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), 
            this.subVectors(a, b)) : (this.x -= a.x, this.y -= a.y, this);
        },
        subVectors: function(a, b) {
            return this.x = a.x - b.x, this.y = a.y - b.y, this;
        },
        multiplyScalar: function(a) {
            return this.x *= a, this.y *= a, this;
        },
        divideScalar: function(a) {
            return 0 !== a ? (this.x /= a, this.y /= a) : this.set(0, 0), this;
        },
        min: function(a) {
            return this.x > a.x && (this.x = a.x), this.y > a.y && (this.y = a.y), this;
        },
        max: function(a) {
            return this.x < a.x && (this.x = a.x), this.y < a.y && (this.y = a.y), this;
        },
        clamp: function(a, b) {
            return this.x < a.x ? this.x = a.x : this.x > b.x && (this.x = b.x), this.y < a.y ? this.y = a.y : this.y > b.y && (this.y = b.y), 
            this;
        },
        negate: function() {
            return this.multiplyScalar(-1);
        },
        dot: function(a) {
            return this.x * a.x + this.y * a.y;
        },
        lengthSq: function() {
            return this.x * this.x + this.y * this.y;
        },
        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        normalize: function() {
            return this.divideScalar(this.length());
        },
        distanceTo: function(a) {
            return Math.sqrt(this.distanceToSquared(a));
        },
        distanceToSquared: function(a) {
            var b = this.x - a.x, c = this.y - a.y;
            return b * b + c * c;
        },
        setLength: function(a) {
            var b = this.length();
            return 0 !== b && a !== b && this.multiplyScalar(a / b), this;
        },
        lerp: function(a, b) {
            return this.x += (a.x - this.x) * b, this.y += (a.y - this.y) * b, this;
        },
        equals: function(a) {
            return a.x === this.x && a.y === this.y;
        },
        fromArray: function(a) {
            return this.x = a[0], this.y = a[1], this;
        },
        toArray: function() {
            return [ this.x, this.y ];
        },
        clone: function() {
            return new v.Vector2(this.x, this.y);
        }
    }, v.Vector3 = function(a, b, c) {
        this.x = a || 0, this.y = b || 0, this.z = c || 0;
    }, v.Vector3.prototype = {
        constructor: v.Vector3,
        set: function(a, b, c) {
            return this.x = a, this.y = b, this.z = c, this;
        },
        setX: function(a) {
            return this.x = a, this;
        },
        setY: function(a) {
            return this.y = a, this;
        },
        setZ: function(a) {
            return this.z = a, this;
        },
        setComponent: function(a, b) {
            switch (a) {
              case 0:
                this.x = b;
                break;

              case 1:
                this.y = b;
                break;

              case 2:
                this.z = b;
                break;

              default:
                throw new Error("index is out of range: " + a);
            }
        },
        getComponent: function(a) {
            switch (a) {
              case 0:
                return this.x;

              case 1:
                return this.y;

              case 2:
                return this.z;

              default:
                throw new Error("index is out of range: " + a);
            }
        },
        copy: function(a) {
            return this.x = a.x, this.y = a.y, this.z = a.z, this;
        },
        add: function(a, b) {
            return void 0 !== b ? (console.warn("DEPRECATED: Vector3's .add() now only accepts one argument. Use .addVectors( a, b ) instead."), 
            this.addVectors(a, b)) : (this.x += a.x, this.y += a.y, this.z += a.z, this);
        },
        addScalar: function(a) {
            return this.x += a, this.y += a, this.z += a, this;
        },
        addVectors: function(a, b) {
            return this.x = a.x + b.x, this.y = a.y + b.y, this.z = a.z + b.z, this;
        },
        sub: function(a, b) {
            return void 0 !== b ? (console.warn("DEPRECATED: Vector3's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), 
            this.subVectors(a, b)) : (this.x -= a.x, this.y -= a.y, this.z -= a.z, this);
        },
        subVectors: function(a, b) {
            return this.x = a.x - b.x, this.y = a.y - b.y, this.z = a.z - b.z, this;
        },
        multiply: function(a, b) {
            return void 0 !== b ? (console.warn("DEPRECATED: Vector3's .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."), 
            this.multiplyVectors(a, b)) : (this.x *= a.x, this.y *= a.y, this.z *= a.z, this);
        },
        multiplyScalar: function(a) {
            return this.x *= a, this.y *= a, this.z *= a, this;
        },
        multiplyVectors: function(a, b) {
            return this.x = a.x * b.x, this.y = a.y * b.y, this.z = a.z * b.z, this;
        },
        applyMatrix3: function(a) {
            var b = this.x, c = this.y, d = this.z, e = a.elements;
            return this.x = e[0] * b + e[3] * c + e[6] * d, this.y = e[1] * b + e[4] * c + e[7] * d, 
            this.z = e[2] * b + e[5] * c + e[8] * d, this;
        },
        applyMatrix4: function(a) {
            var b = this.x, c = this.y, d = this.z, e = a.elements;
            return this.x = e[0] * b + e[4] * c + e[8] * d + e[12], this.y = e[1] * b + e[5] * c + e[9] * d + e[13], 
            this.z = e[2] * b + e[6] * c + e[10] * d + e[14], this;
        },
        applyProjection: function(a) {
            var b = this.x, c = this.y, d = this.z, e = a.elements, f = 1 / (e[3] * b + e[7] * c + e[11] * d + e[15]);
            return this.x = (e[0] * b + e[4] * c + e[8] * d + e[12]) * f, this.y = (e[1] * b + e[5] * c + e[9] * d + e[13]) * f, 
            this.z = (e[2] * b + e[6] * c + e[10] * d + e[14]) * f, this;
        },
        applyQuaternion: function(a) {
            var b = this.x, c = this.y, d = this.z, e = a.x, f = a.y, g = a.z, h = a.w, i = h * b + f * d - g * c, j = h * c + g * b - e * d, k = h * d + e * c - f * b, l = -e * b - f * c - g * d;
            return this.x = i * h + l * -e + j * -g - k * -f, this.y = j * h + l * -f + k * -e - i * -g, 
            this.z = k * h + l * -g + i * -f - j * -e, this;
        },
        transformDirection: function(a) {
            var b = this.x, c = this.y, d = this.z, e = a.elements;
            return this.x = e[0] * b + e[4] * c + e[8] * d, this.y = e[1] * b + e[5] * c + e[9] * d, 
            this.z = e[2] * b + e[6] * c + e[10] * d, this.normalize(), this;
        },
        divide: function(a) {
            return this.x /= a.x, this.y /= a.y, this.z /= a.z, this;
        },
        divideScalar: function(a) {
            return 0 !== a ? (this.x /= a, this.y /= a, this.z /= a) : (this.x = 0, this.y = 0, 
            this.z = 0), this;
        },
        min: function(a) {
            return this.x > a.x && (this.x = a.x), this.y > a.y && (this.y = a.y), this.z > a.z && (this.z = a.z), 
            this;
        },
        max: function(a) {
            return this.x < a.x && (this.x = a.x), this.y < a.y && (this.y = a.y), this.z < a.z && (this.z = a.z), 
            this;
        },
        clamp: function(a, b) {
            return this.x < a.x ? this.x = a.x : this.x > b.x && (this.x = b.x), this.y < a.y ? this.y = a.y : this.y > b.y && (this.y = b.y), 
            this.z < a.z ? this.z = a.z : this.z > b.z && (this.z = b.z), this;
        },
        negate: function() {
            return this.multiplyScalar(-1);
        },
        dot: function(a) {
            return this.x * a.x + this.y * a.y + this.z * a.z;
        },
        lengthSq: function() {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        },
        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        },
        lengthManhattan: function() {
            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
        },
        normalize: function() {
            return this.divideScalar(this.length());
        },
        setLength: function(a) {
            var b = this.length();
            return 0 !== b && a !== b && this.multiplyScalar(a / b), this;
        },
        lerp: function(a, b) {
            return this.x += (a.x - this.x) * b, this.y += (a.y - this.y) * b, this.z += (a.z - this.z) * b, 
            this;
        },
        cross: function(a, b) {
            if (void 0 !== b) return console.warn("DEPRECATED: Vector3's .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."), 
            this.crossVectors(a, b);
            var c = this.x, d = this.y, e = this.z;
            return this.x = d * a.z - e * a.y, this.y = e * a.x - c * a.z, this.z = c * a.y - d * a.x, 
            this;
        },
        crossVectors: function(a, b) {
            return this.x = a.y * b.z - a.z * b.y, this.y = a.z * b.x - a.x * b.z, this.z = a.x * b.y - a.y * b.x, 
            this;
        },
        angleTo: function(a) {
            var b = this.dot(a) / (this.length() * a.length());
            return Math.acos(v.Math.clamp(b, -1, 1));
        },
        distanceTo: function(a) {
            return Math.sqrt(this.distanceToSquared(a));
        },
        distanceToSquared: function(a) {
            var b = this.x - a.x, c = this.y - a.y, d = this.z - a.z;
            return b * b + c * c + d * d;
        },
        setEulerFromRotationMatrix: function(a, b) {
            function c(a) {
                return Math.min(Math.max(a, -1), 1);
            }
            var d = a.elements, e = d[0], f = d[4], g = d[8], h = d[1], i = d[5], j = d[9], k = d[2], l = d[6], m = d[10];
            return void 0 === b || "XYZ" === b ? (this.y = Math.asin(c(g)), Math.abs(g) < .99999 ? (this.x = Math.atan2(-j, m), 
            this.z = Math.atan2(-f, e)) : (this.x = Math.atan2(l, i), this.z = 0)) : "YXZ" === b ? (this.x = Math.asin(-c(j)), 
            Math.abs(j) < .99999 ? (this.y = Math.atan2(g, m), this.z = Math.atan2(h, i)) : (this.y = Math.atan2(-k, e), 
            this.z = 0)) : "ZXY" === b ? (this.x = Math.asin(c(l)), Math.abs(l) < .99999 ? (this.y = Math.atan2(-k, m), 
            this.z = Math.atan2(-f, i)) : (this.y = 0, this.z = Math.atan2(h, e))) : "ZYX" === b ? (this.y = Math.asin(-c(k)), 
            Math.abs(k) < .99999 ? (this.x = Math.atan2(l, m), this.z = Math.atan2(h, e)) : (this.x = 0, 
            this.z = Math.atan2(-f, i))) : "YZX" === b ? (this.z = Math.asin(c(h)), Math.abs(h) < .99999 ? (this.x = Math.atan2(-j, i), 
            this.y = Math.atan2(-k, e)) : (this.x = 0, this.y = Math.atan2(g, m))) : "XZY" === b && (this.z = Math.asin(-c(f)), 
            Math.abs(f) < .99999 ? (this.x = Math.atan2(l, i), this.y = Math.atan2(g, e)) : (this.x = Math.atan2(-j, m), 
            this.y = 0)), this;
        },
        setEulerFromQuaternion: function(a, b) {
            function c(a) {
                return Math.min(Math.max(a, -1), 1);
            }
            var d = a.x * a.x, e = a.y * a.y, f = a.z * a.z, g = a.w * a.w;
            return void 0 === b || "XYZ" === b ? (this.x = Math.atan2(2 * (a.x * a.w - a.y * a.z), g - d - e + f), 
            this.y = Math.asin(c(2 * (a.x * a.z + a.y * a.w))), this.z = Math.atan2(2 * (a.z * a.w - a.x * a.y), g + d - e - f)) : "YXZ" === b ? (this.x = Math.asin(c(2 * (a.x * a.w - a.y * a.z))), 
            this.y = Math.atan2(2 * (a.x * a.z + a.y * a.w), g - d - e + f), this.z = Math.atan2(2 * (a.x * a.y + a.z * a.w), g - d + e - f)) : "ZXY" === b ? (this.x = Math.asin(c(2 * (a.x * a.w + a.y * a.z))), 
            this.y = Math.atan2(2 * (a.y * a.w - a.z * a.x), g - d - e + f), this.z = Math.atan2(2 * (a.z * a.w - a.x * a.y), g - d + e - f)) : "ZYX" === b ? (this.x = Math.atan2(2 * (a.x * a.w + a.z * a.y), g - d - e + f), 
            this.y = Math.asin(c(2 * (a.y * a.w - a.x * a.z))), this.z = Math.atan2(2 * (a.x * a.y + a.z * a.w), g + d - e - f)) : "YZX" === b ? (this.x = Math.atan2(2 * (a.x * a.w - a.z * a.y), g - d + e - f), 
            this.y = Math.atan2(2 * (a.y * a.w - a.x * a.z), g + d - e - f), this.z = Math.asin(c(2 * (a.x * a.y + a.z * a.w)))) : "XZY" === b && (this.x = Math.atan2(2 * (a.x * a.w + a.y * a.z), g - d + e - f), 
            this.y = Math.atan2(2 * (a.x * a.z + a.y * a.w), g + d - e - f), this.z = Math.asin(c(2 * (a.z * a.w - a.x * a.y)))), 
            this;
        },
        getPositionFromMatrix: function(a) {
            return this.x = a.elements[12], this.y = a.elements[13], this.z = a.elements[14], 
            this;
        },
        getScaleFromMatrix: function(a) {
            var b = this.set(a.elements[0], a.elements[1], a.elements[2]).length(), c = this.set(a.elements[4], a.elements[5], a.elements[6]).length(), d = this.set(a.elements[8], a.elements[9], a.elements[10]).length();
            return this.x = b, this.y = c, this.z = d, this;
        },
        getColumnFromMatrix: function(a, b) {
            var c = 4 * a, d = b.elements;
            return this.x = d[c], this.y = d[c + 1], this.z = d[c + 2], this;
        },
        equals: function(a) {
            return a.x === this.x && a.y === this.y && a.z === this.z;
        },
        fromArray: function(a) {
            return this.x = a[0], this.y = a[1], this.z = a[2], this;
        },
        toArray: function() {
            return [ this.x, this.y, this.z ];
        },
        clone: function() {
            return new v.Vector3(this.x, this.y, this.z);
        }
    }, v.extend(v.Vector3.prototype, {
        applyEuler: function() {
            var a = new v.Quaternion();
            return function(b, c) {
                var d = a.setFromEuler(b, c);
                return this.applyQuaternion(d), this;
            };
        }(),
        applyAxisAngle: function() {
            var a = new v.Quaternion();
            return function(b, c) {
                var d = a.setFromAxisAngle(b, c);
                return this.applyQuaternion(d), this;
            };
        }(),
        projectOnVector: function() {
            var a = new v.Vector3();
            return function(b) {
                a.copy(b).normalize();
                var c = this.dot(a);
                return this.copy(a).multiplyScalar(c);
            };
        }(),
        projectOnPlane: function() {
            var a = new v.Vector3();
            return function(b) {
                return a.copy(this).projectOnVector(b), this.sub(a);
            };
        }(),
        reflect: function() {
            var a = new v.Vector3();
            return function(b) {
                return a.copy(this).projectOnVector(b).multiplyScalar(2), this.subVectors(a, this);
            };
        }()
    }), v.Vector4 = function(a, b, c, d) {
        this.x = a || 0, this.y = b || 0, this.z = c || 0, this.w = void 0 !== d ? d : 1;
    }, v.Vector4.prototype = {
        constructor: v.Vector4,
        set: function(a, b, c, d) {
            return this.x = a, this.y = b, this.z = c, this.w = d, this;
        },
        setX: function(a) {
            return this.x = a, this;
        },
        setY: function(a) {
            return this.y = a, this;
        },
        setZ: function(a) {
            return this.z = a, this;
        },
        setW: function(a) {
            return this.w = a, this;
        },
        setComponent: function(a, b) {
            switch (a) {
              case 0:
                this.x = b;
                break;

              case 1:
                this.y = b;
                break;

              case 2:
                this.z = b;
                break;

              case 3:
                this.w = b;
                break;

              default:
                throw new Error("index is out of range: " + a);
            }
        },
        getComponent: function(a) {
            switch (a) {
              case 0:
                return this.x;

              case 1:
                return this.y;

              case 2:
                return this.z;

              case 3:
                return this.w;

              default:
                throw new Error("index is out of range: " + a);
            }
        },
        copy: function(a) {
            return this.x = a.x, this.y = a.y, this.z = a.z, this.w = void 0 !== a.w ? a.w : 1, 
            this;
        },
        add: function(a, b) {
            return void 0 !== b ? (console.warn("DEPRECATED: Vector4's .add() now only accepts one argument. Use .addVectors( a, b ) instead."), 
            this.addVectors(a, b)) : (this.x += a.x, this.y += a.y, this.z += a.z, this.w += a.w, 
            this);
        },
        addScalar: function(a) {
            return this.x += a, this.y += a, this.z += a, this.w += a, this;
        },
        addVectors: function(a, b) {
            return this.x = a.x + b.x, this.y = a.y + b.y, this.z = a.z + b.z, this.w = a.w + b.w, 
            this;
        },
        sub: function(a, b) {
            return void 0 !== b ? (console.warn("DEPRECATED: Vector4's .sub() now only accepts one argument. Use .subVectors( a, b ) instead."), 
            this.subVectors(a, b)) : (this.x -= a.x, this.y -= a.y, this.z -= a.z, this.w -= a.w, 
            this);
        },
        subVectors: function(a, b) {
            return this.x = a.x - b.x, this.y = a.y - b.y, this.z = a.z - b.z, this.w = a.w - b.w, 
            this;
        },
        multiplyScalar: function(a) {
            return this.x *= a, this.y *= a, this.z *= a, this.w *= a, this;
        },
        applyMatrix4: function(a) {
            var b = this.x, c = this.y, d = this.z, e = this.w, f = a.elements;
            return this.x = f[0] * b + f[4] * c + f[8] * d + f[12] * e, this.y = f[1] * b + f[5] * c + f[9] * d + f[13] * e, 
            this.z = f[2] * b + f[6] * c + f[10] * d + f[14] * e, this.w = f[3] * b + f[7] * c + f[11] * d + f[15] * e, 
            this;
        },
        divideScalar: function(a) {
            return 0 !== a ? (this.x /= a, this.y /= a, this.z /= a, this.w /= a) : (this.x = 0, 
            this.y = 0, this.z = 0, this.w = 1), this;
        },
        setAxisAngleFromQuaternion: function(a) {
            this.w = 2 * Math.acos(a.w);
            var b = Math.sqrt(1 - a.w * a.w);
            return 1e-4 > b ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = a.x / b, this.y = a.y / b, 
            this.z = a.z / b), this;
        },
        setAxisAngleFromRotationMatrix: function(a) {
            var b, c, d, e, f = .01, g = .1, h = a.elements, i = h[0], j = h[4], k = h[8], l = h[1], m = h[5], n = h[9], o = h[2], p = h[6], q = h[10];
            if (Math.abs(j - l) < f && Math.abs(k - o) < f && Math.abs(n - p) < f) {
                if (Math.abs(j + l) < g && Math.abs(k + o) < g && Math.abs(n + p) < g && Math.abs(i + m + q - 3) < g) return this.set(1, 0, 0, 0), 
                this;
                b = Math.PI;
                var r = (i + 1) / 2, s = (m + 1) / 2, t = (q + 1) / 2, u = (j + l) / 4, v = (k + o) / 4, w = (n + p) / 4;
                return r > s && r > t ? f > r ? (c = 0, d = .707106781, e = .707106781) : (c = Math.sqrt(r), 
                d = u / c, e = v / c) : s > t ? f > s ? (c = .707106781, d = 0, e = .707106781) : (d = Math.sqrt(s), 
                c = u / d, e = w / d) : f > t ? (c = .707106781, d = .707106781, e = 0) : (e = Math.sqrt(t), 
                c = v / e, d = w / e), this.set(c, d, e, b), this;
            }
            var x = Math.sqrt((p - n) * (p - n) + (k - o) * (k - o) + (l - j) * (l - j));
            return Math.abs(x) < .001 && (x = 1), this.x = (p - n) / x, this.y = (k - o) / x, 
            this.z = (l - j) / x, this.w = Math.acos((i + m + q - 1) / 2), this;
        },
        min: function(a) {
            return this.x > a.x && (this.x = a.x), this.y > a.y && (this.y = a.y), this.z > a.z && (this.z = a.z), 
            this.w > a.w && (this.w = a.w), this;
        },
        max: function(a) {
            return this.x < a.x && (this.x = a.x), this.y < a.y && (this.y = a.y), this.z < a.z && (this.z = a.z), 
            this.w < a.w && (this.w = a.w), this;
        },
        clamp: function(a, b) {
            return this.x < a.x ? this.x = a.x : this.x > b.x && (this.x = b.x), this.y < a.y ? this.y = a.y : this.y > b.y && (this.y = b.y), 
            this.z < a.z ? this.z = a.z : this.z > b.z && (this.z = b.z), this.w < a.w ? this.w = a.w : this.w > b.w && (this.w = b.w), 
            this;
        },
        negate: function() {
            return this.multiplyScalar(-1);
        },
        dot: function(a) {
            return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w;
        },
        lengthSq: function() {
            return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
        },
        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        },
        lengthManhattan: function() {
            return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
        },
        normalize: function() {
            return this.divideScalar(this.length());
        },
        setLength: function(a) {
            var b = this.length();
            return 0 !== b && a !== b && this.multiplyScalar(a / b), this;
        },
        lerp: function(a, b) {
            return this.x += (a.x - this.x) * b, this.y += (a.y - this.y) * b, this.z += (a.z - this.z) * b, 
            this.w += (a.w - this.w) * b, this;
        },
        equals: function(a) {
            return a.x === this.x && a.y === this.y && a.z === this.z && a.w === this.w;
        },
        fromArray: function(a) {
            return this.x = a[0], this.y = a[1], this.z = a[2], this.w = a[3], this;
        },
        toArray: function() {
            return [ this.x, this.y, this.z, this.w ];
        },
        clone: function() {
            return new v.Vector4(this.x, this.y, this.z, this.w);
        }
    }, v.Line3 = function(a, b) {
        this.start = void 0 !== a ? a : new v.Vector3(), this.end = void 0 !== b ? b : new v.Vector3();
    }, v.Line3.prototype = {
        constructor: v.Line3,
        set: function(a, b) {
            return this.start.copy(a), this.end.copy(b), this;
        },
        copy: function(a) {
            return this.start.copy(a.start), this.end.copy(a.end), this;
        },
        center: function(a) {
            var b = a || new v.Vector3();
            return b.addVectors(this.start, this.end).multiplyScalar(.5);
        },
        delta: function(a) {
            var b = a || new v.Vector3();
            return b.subVectors(this.end, this.start);
        },
        distanceSq: function() {
            return this.start.distanceToSquared(this.end);
        },
        distance: function() {
            return this.start.distanceTo(this.end);
        },
        at: function(a, b) {
            var c = b || new v.Vector3();
            return this.delta(c).multiplyScalar(a).add(this.start);
        },
        closestPointToPointParameter: function() {
            var a = new v.Vector3(), b = new v.Vector3();
            return function(c, d) {
                a.subVectors(c, this.start), b.subVectors(this.end, this.start);
                var e = b.dot(b), f = b.dot(a), g = f / e;
                return d && (g = v.Math.clamp(g, 0, 1)), g;
            };
        }(),
        closestPointToPoint: function(a, b, c) {
            var d = this.closestPointToPointParameter(a, b), e = c || new v.Vector3();
            return this.delta(e).multiplyScalar(d).add(this.start);
        },
        applyMatrix4: function(a) {
            return this.start.applyMatrix4(a), this.end.applyMatrix4(a), this;
        },
        equals: function(a) {
            return a.start.equals(this.start) && a.end.equals(this.end);
        },
        clone: function() {
            return new v.Line3().copy(this);
        }
    }, v.Box2 = function(a, b) {
        this.min = void 0 !== a ? a : new v.Vector2(1/0, 1/0), this.max = void 0 !== b ? b : new v.Vector2(-1/0, -1/0);
    }, v.Box2.prototype = {
        constructor: v.Box2,
        set: function(a, b) {
            return this.min.copy(a), this.max.copy(b), this;
        },
        setFromPoints: function(a) {
            if (a.length > 0) {
                var b = a[0];
                this.min.copy(b), this.max.copy(b);
                for (var c = 1, d = a.length; d > c; c++) b = a[c], b.x < this.min.x ? this.min.x = b.x : b.x > this.max.x && (this.max.x = b.x), 
                b.y < this.min.y ? this.min.y = b.y : b.y > this.max.y && (this.max.y = b.y);
            } else this.makeEmpty();
            return this;
        },
        setFromCenterAndSize: function() {
            var a = new v.Vector2();
            return function(b, c) {
                var d = a.copy(c).multiplyScalar(.5);
                return this.min.copy(b).sub(d), this.max.copy(b).add(d), this;
            };
        }(),
        copy: function(a) {
            return this.min.copy(a.min), this.max.copy(a.max), this;
        },
        makeEmpty: function() {
            return this.min.x = this.min.y = 1/0, this.max.x = this.max.y = -1/0, this;
        },
        empty: function() {
            return this.max.x < this.min.x || this.max.y < this.min.y;
        },
        center: function(a) {
            var b = a || new v.Vector2();
            return b.addVectors(this.min, this.max).multiplyScalar(.5);
        },
        size: function(a) {
            var b = a || new v.Vector2();
            return b.subVectors(this.max, this.min);
        },
        expandByPoint: function(a) {
            return this.min.min(a), this.max.max(a), this;
        },
        expandByVector: function(a) {
            return this.min.sub(a), this.max.add(a), this;
        },
        expandByScalar: function(a) {
            return this.min.addScalar(-a), this.max.addScalar(a), this;
        },
        containsPoint: function(a) {
            return a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y ? !1 : !0;
        },
        containsBox: function(a) {
            return this.min.x <= a.min.x && a.max.x <= this.max.x && this.min.y <= a.min.y && a.max.y <= this.max.y ? !0 : !1;
        },
        getParameter: function(a) {
            return new v.Vector2((a.x - this.min.x) / (this.max.x - this.min.x), (a.y - this.min.y) / (this.max.y - this.min.y));
        },
        isIntersectionBox: function(a) {
            return a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y ? !1 : !0;
        },
        clampPoint: function(a, b) {
            var c = b || new v.Vector2();
            return c.copy(a).clamp(this.min, this.max);
        },
        distanceToPoint: function() {
            var a = new v.Vector2();
            return function(b) {
                var c = a.copy(b).clamp(this.min, this.max);
                return c.sub(b).length();
            };
        }(),
        intersect: function(a) {
            return this.min.max(a.min), this.max.min(a.max), this;
        },
        union: function(a) {
            return this.min.min(a.min), this.max.max(a.max), this;
        },
        translate: function(a) {
            return this.min.add(a), this.max.add(a), this;
        },
        equals: function(a) {
            return a.min.equals(this.min) && a.max.equals(this.max);
        },
        clone: function() {
            return new v.Box2().copy(this);
        }
    }, v.Box3 = function(a, b) {
        this.min = void 0 !== a ? a : new v.Vector3(1/0, 1/0, 1/0), this.max = void 0 !== b ? b : new v.Vector3(-1/0, -1/0, -1/0);
    }, v.Box3.prototype = {
        constructor: v.Box3,
        set: function(a, b) {
            return this.min.copy(a), this.max.copy(b), this;
        },
        setFromPoints: function(a) {
            if (a.length > 0) {
                var b = a[0];
                this.min.copy(b), this.max.copy(b);
                for (var c = 1, d = a.length; d > c; c++) b = a[c], b.x < this.min.x ? this.min.x = b.x : b.x > this.max.x && (this.max.x = b.x), 
                b.y < this.min.y ? this.min.y = b.y : b.y > this.max.y && (this.max.y = b.y), b.z < this.min.z ? this.min.z = b.z : b.z > this.max.z && (this.max.z = b.z);
            } else this.makeEmpty();
            return this;
        },
        setFromCenterAndSize: function() {
            var a = new v.Vector3();
            return function(b, c) {
                var d = a.copy(c).multiplyScalar(.5);
                return this.min.copy(b).sub(d), this.max.copy(b).add(d), this;
            };
        }(),
        copy: function(a) {
            return this.min.copy(a.min), this.max.copy(a.max), this;
        },
        makeEmpty: function() {
            return this.min.x = this.min.y = this.min.z = 1/0, this.max.x = this.max.y = this.max.z = -1/0, 
            this;
        },
        empty: function() {
            return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
        },
        center: function(a) {
            var b = a || new v.Vector3();
            return b.addVectors(this.min, this.max).multiplyScalar(.5);
        },
        size: function(a) {
            var b = a || new v.Vector3();
            return b.subVectors(this.max, this.min);
        },
        expandByPoint: function(a) {
            return this.min.min(a), this.max.max(a), this;
        },
        expandByVector: function(a) {
            return this.min.sub(a), this.max.add(a), this;
        },
        expandByScalar: function(a) {
            return this.min.addScalar(-a), this.max.addScalar(a), this;
        },
        containsPoint: function(a) {
            return a.x < this.min.x || a.x > this.max.x || a.y < this.min.y || a.y > this.max.y || a.z < this.min.z || a.z > this.max.z ? !1 : !0;
        },
        containsBox: function(a) {
            return this.min.x <= a.min.x && a.max.x <= this.max.x && this.min.y <= a.min.y && a.max.y <= this.max.y && this.min.z <= a.min.z && a.max.z <= this.max.z ? !0 : !1;
        },
        getParameter: function(a) {
            return new v.Vector3((a.x - this.min.x) / (this.max.x - this.min.x), (a.y - this.min.y) / (this.max.y - this.min.y), (a.z - this.min.z) / (this.max.z - this.min.z));
        },
        isIntersectionBox: function(a) {
            return a.max.x < this.min.x || a.min.x > this.max.x || a.max.y < this.min.y || a.min.y > this.max.y || a.max.z < this.min.z || a.min.z > this.max.z ? !1 : !0;
        },
        clampPoint: function(a, b) {
            var c = b || new v.Vector3();
            return c.copy(a).clamp(this.min, this.max);
        },
        distanceToPoint: function() {
            var a = new v.Vector3();
            return function(b) {
                var c = a.copy(b).clamp(this.min, this.max);
                return c.sub(b).length();
            };
        }(),
        getBoundingSphere: function() {
            var a = new v.Vector3();
            return function(b) {
                var c = b || new v.Sphere();
                return c.center = this.center(), c.radius = .5 * this.size(a).length(), c;
            };
        }(),
        intersect: function(a) {
            return this.min.max(a.min), this.max.min(a.max), this;
        },
        union: function(a) {
            return this.min.min(a.min), this.max.max(a.max), this;
        },
        applyMatrix4: function() {
            var a = [ new v.Vector3(), new v.Vector3(), new v.Vector3(), new v.Vector3(), new v.Vector3(), new v.Vector3(), new v.Vector3(), new v.Vector3() ];
            return function(b) {
                return a[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(b), a[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(b), 
                a[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(b), a[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(b), 
                a[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(b), a[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(b), 
                a[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(b), a[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(b), 
                this.makeEmpty(), this.setFromPoints(a), this;
            };
        }(),
        translate: function(a) {
            return this.min.add(a), this.max.add(a), this;
        },
        equals: function(a) {
            return a.min.equals(this.min) && a.max.equals(this.max);
        },
        clone: function() {
            return new v.Box3().copy(this);
        }
    }, v.Matrix3 = function(a, b, c, d, e, f, g, h, i) {
        this.elements = new Float32Array(9), this.set(void 0 !== a ? a : 1, b || 0, c || 0, d || 0, void 0 !== e ? e : 1, f || 0, g || 0, h || 0, void 0 !== i ? i : 1);
    }, v.Matrix3.prototype = {
        constructor: v.Matrix3,
        set: function(a, b, c, d, e, f, g, h, i) {
            var j = this.elements;
            return j[0] = a, j[3] = b, j[6] = c, j[1] = d, j[4] = e, j[7] = f, j[2] = g, j[5] = h, 
            j[8] = i, this;
        },
        identity: function() {
            return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
        },
        copy: function(a) {
            var b = a.elements;
            return this.set(b[0], b[3], b[6], b[1], b[4], b[7], b[2], b[5], b[8]), this;
        },
        multiplyVector3: function(a) {
            return console.warn("DEPRECATED: Matrix3's .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."), 
            a.applyMatrix3(this);
        },
        multiplyVector3Array: function() {
            var a = new v.Vector3();
            return function(b) {
                for (var c = 0, d = b.length; d > c; c += 3) a.x = b[c], a.y = b[c + 1], a.z = b[c + 2], 
                a.applyMatrix3(this), b[c] = a.x, b[c + 1] = a.y, b[c + 2] = a.z;
                return b;
            };
        }(),
        multiplyScalar: function(a) {
            var b = this.elements;
            return b[0] *= a, b[3] *= a, b[6] *= a, b[1] *= a, b[4] *= a, b[7] *= a, b[2] *= a, 
            b[5] *= a, b[8] *= a, this;
        },
        determinant: function() {
            var a = this.elements, b = a[0], c = a[1], d = a[2], e = a[3], f = a[4], g = a[5], h = a[6], i = a[7], j = a[8];
            return b * f * j - b * g * i - c * e * j + c * g * h + d * e * i - d * f * h;
        },
        getInverse: function(a, b) {
            var c = a.elements, d = this.elements;
            d[0] = c[10] * c[5] - c[6] * c[9], d[1] = -c[10] * c[1] + c[2] * c[9], d[2] = c[6] * c[1] - c[2] * c[5], 
            d[3] = -c[10] * c[4] + c[6] * c[8], d[4] = c[10] * c[0] - c[2] * c[8], d[5] = -c[6] * c[0] + c[2] * c[4], 
            d[6] = c[9] * c[4] - c[5] * c[8], d[7] = -c[9] * c[0] + c[1] * c[8], d[8] = c[5] * c[0] - c[1] * c[4];
            var e = c[0] * d[0] + c[1] * d[3] + c[2] * d[6];
            if (0 === e) {
                var f = "Matrix3.getInverse(): can't invert matrix, determinant is 0";
                if (b) throw new Error(f);
                return console.warn(f), this.identity(), this;
            }
            return this.multiplyScalar(1 / e), this;
        },
        transpose: function() {
            var a, b = this.elements;
            return a = b[1], b[1] = b[3], b[3] = a, a = b[2], b[2] = b[6], b[6] = a, a = b[5], 
            b[5] = b[7], b[7] = a, this;
        },
        getNormalMatrix: function(a) {
            return this.getInverse(a).transpose(), this;
        },
        transposeIntoArray: function(a) {
            var b = this.elements;
            return a[0] = b[0], a[1] = b[3], a[2] = b[6], a[3] = b[1], a[4] = b[4], a[5] = b[7], 
            a[6] = b[2], a[7] = b[5], a[8] = b[8], this;
        },
        clone: function() {
            var a = this.elements;
            return new v.Matrix3(a[0], a[3], a[6], a[1], a[4], a[7], a[2], a[5], a[8]);
        }
    }, v.Matrix4 = function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
        var q = this.elements = new Float32Array(16);
        q[0] = void 0 !== a ? a : 1, q[4] = b || 0, q[8] = c || 0, q[12] = d || 0, q[1] = e || 0, 
        q[5] = void 0 !== f ? f : 1, q[9] = g || 0, q[13] = h || 0, q[2] = i || 0, q[6] = j || 0, 
        q[10] = void 0 !== k ? k : 1, q[14] = l || 0, q[3] = m || 0, q[7] = n || 0, q[11] = o || 0, 
        q[15] = void 0 !== p ? p : 1;
    }, v.Matrix4.prototype = {
        constructor: v.Matrix4,
        set: function(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
            var q = this.elements;
            return q[0] = a, q[4] = b, q[8] = c, q[12] = d, q[1] = e, q[5] = f, q[9] = g, q[13] = h, 
            q[2] = i, q[6] = j, q[10] = k, q[14] = l, q[3] = m, q[7] = n, q[11] = o, q[15] = p, 
            this;
        },
        identity: function() {
            return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
        },
        copy: function(a) {
            var b = a.elements;
            return this.set(b[0], b[4], b[8], b[12], b[1], b[5], b[9], b[13], b[2], b[6], b[10], b[14], b[3], b[7], b[11], b[15]), 
            this;
        },
        extractPosition: function(a) {
            return console.warn("DEPRECATED: Matrix4's .extractPosition() has been renamed to .copyPosition()."), 
            this.copyPosition(a);
        },
        copyPosition: function(a) {
            var b = this.elements, c = a.elements;
            return b[12] = c[12], b[13] = c[13], b[14] = c[14], this;
        },
        extractRotation: function() {
            var a = new v.Vector3();
            return function(b) {
                var c = this.elements, d = b.elements, e = 1 / a.set(d[0], d[1], d[2]).length(), f = 1 / a.set(d[4], d[5], d[6]).length(), g = 1 / a.set(d[8], d[9], d[10]).length();
                return c[0] = d[0] * e, c[1] = d[1] * e, c[2] = d[2] * e, c[4] = d[4] * f, c[5] = d[5] * f, 
                c[6] = d[6] * f, c[8] = d[8] * g, c[9] = d[9] * g, c[10] = d[10] * g, this;
            };
        }(),
        setRotationFromEuler: function(a, b) {
            return console.warn("DEPRECATED: Matrix4's .setRotationFromEuler() has been deprecated in favor of makeRotationFromEuler.  Please update your code."), 
            this.makeRotationFromEuler(a, b);
        },
        makeRotationFromEuler: function(a, b) {
            var c = this.elements, d = a.x, e = a.y, f = a.z, g = Math.cos(d), h = Math.sin(d), i = Math.cos(e), j = Math.sin(e), k = Math.cos(f), l = Math.sin(f);
            if (void 0 === b || "XYZ" === b) {
                var m = g * k, n = g * l, o = h * k, p = h * l;
                c[0] = i * k, c[4] = -i * l, c[8] = j, c[1] = n + o * j, c[5] = m - p * j, c[9] = -h * i, 
                c[2] = p - m * j, c[6] = o + n * j, c[10] = g * i;
            } else if ("YXZ" === b) {
                var q = i * k, r = i * l, s = j * k, t = j * l;
                c[0] = q + t * h, c[4] = s * h - r, c[8] = g * j, c[1] = g * l, c[5] = g * k, c[9] = -h, 
                c[2] = r * h - s, c[6] = t + q * h, c[10] = g * i;
            } else if ("ZXY" === b) {
                var q = i * k, r = i * l, s = j * k, t = j * l;
                c[0] = q - t * h, c[4] = -g * l, c[8] = s + r * h, c[1] = r + s * h, c[5] = g * k, 
                c[9] = t - q * h, c[2] = -g * j, c[6] = h, c[10] = g * i;
            } else if ("ZYX" === b) {
                var m = g * k, n = g * l, o = h * k, p = h * l;
                c[0] = i * k, c[4] = o * j - n, c[8] = m * j + p, c[1] = i * l, c[5] = p * j + m, 
                c[9] = n * j - o, c[2] = -j, c[6] = h * i, c[10] = g * i;
            } else if ("YZX" === b) {
                var u = g * i, v = g * j, w = h * i, x = h * j;
                c[0] = i * k, c[4] = x - u * l, c[8] = w * l + v, c[1] = l, c[5] = g * k, c[9] = -h * k, 
                c[2] = -j * k, c[6] = v * l + w, c[10] = u - x * l;
            } else if ("XZY" === b) {
                var u = g * i, v = g * j, w = h * i, x = h * j;
                c[0] = i * k, c[4] = -l, c[8] = j * k, c[1] = u * l + x, c[5] = g * k, c[9] = v * l - w, 
                c[2] = w * l - v, c[6] = h * k, c[10] = x * l + u;
            }
            return c[3] = 0, c[7] = 0, c[11] = 0, c[12] = 0, c[13] = 0, c[14] = 0, c[15] = 1, 
            this;
        },
        setRotationFromQuaternion: function(a) {
            return console.warn("DEPRECATED: Matrix4's .setRotationFromQuaternion() has been deprecated in favor of makeRotationFromQuaternion.  Please update your code."), 
            this.makeRotationFromQuaternion(a);
        },
        makeRotationFromQuaternion: function(a) {
            var b = this.elements, c = a.x, d = a.y, e = a.z, f = a.w, g = c + c, h = d + d, i = e + e, j = c * g, k = c * h, l = c * i, m = d * h, n = d * i, o = e * i, p = f * g, q = f * h, r = f * i;
            return b[0] = 1 - (m + o), b[4] = k - r, b[8] = l + q, b[1] = k + r, b[5] = 1 - (j + o), 
            b[9] = n - p, b[2] = l - q, b[6] = n + p, b[10] = 1 - (j + m), b[3] = 0, b[7] = 0, 
            b[11] = 0, b[12] = 0, b[13] = 0, b[14] = 0, b[15] = 1, this;
        },
        lookAt: function() {
            var a = new v.Vector3(), b = new v.Vector3(), c = new v.Vector3();
            return function(d, e, f) {
                var g = this.elements;
                return c.subVectors(d, e).normalize(), 0 === c.length() && (c.z = 1), a.crossVectors(f, c).normalize(), 
                0 === a.length() && (c.x += 1e-4, a.crossVectors(f, c).normalize()), b.crossVectors(c, a), 
                g[0] = a.x, g[4] = b.x, g[8] = c.x, g[1] = a.y, g[5] = b.y, g[9] = c.y, g[2] = a.z, 
                g[6] = b.z, g[10] = c.z, this;
            };
        }(),
        multiply: function(a, b) {
            return void 0 !== b ? (console.warn("DEPRECATED: Matrix4's .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."), 
            this.multiplyMatrices(a, b)) : this.multiplyMatrices(this, a);
        },
        multiplyMatrices: function(a, b) {
            var c = a.elements, d = b.elements, e = this.elements, f = c[0], g = c[4], h = c[8], i = c[12], j = c[1], k = c[5], l = c[9], m = c[13], n = c[2], o = c[6], p = c[10], q = c[14], r = c[3], s = c[7], t = c[11], u = c[15], v = d[0], w = d[4], x = d[8], y = d[12], z = d[1], A = d[5], B = d[9], C = d[13], D = d[2], E = d[6], F = d[10], G = d[14], H = d[3], I = d[7], J = d[11], K = d[15];
            return e[0] = f * v + g * z + h * D + i * H, e[4] = f * w + g * A + h * E + i * I, 
            e[8] = f * x + g * B + h * F + i * J, e[12] = f * y + g * C + h * G + i * K, e[1] = j * v + k * z + l * D + m * H, 
            e[5] = j * w + k * A + l * E + m * I, e[9] = j * x + k * B + l * F + m * J, e[13] = j * y + k * C + l * G + m * K, 
            e[2] = n * v + o * z + p * D + q * H, e[6] = n * w + o * A + p * E + q * I, e[10] = n * x + o * B + p * F + q * J, 
            e[14] = n * y + o * C + p * G + q * K, e[3] = r * v + s * z + t * D + u * H, e[7] = r * w + s * A + t * E + u * I, 
            e[11] = r * x + s * B + t * F + u * J, e[15] = r * y + s * C + t * G + u * K, this;
        },
        multiplyToArray: function(a, b, c) {
            var d = this.elements;
            return this.multiplyMatrices(a, b), c[0] = d[0], c[1] = d[1], c[2] = d[2], c[3] = d[3], 
            c[4] = d[4], c[5] = d[5], c[6] = d[6], c[7] = d[7], c[8] = d[8], c[9] = d[9], c[10] = d[10], 
            c[11] = d[11], c[12] = d[12], c[13] = d[13], c[14] = d[14], c[15] = d[15], this;
        },
        multiplyScalar: function(a) {
            var b = this.elements;
            return b[0] *= a, b[4] *= a, b[8] *= a, b[12] *= a, b[1] *= a, b[5] *= a, b[9] *= a, 
            b[13] *= a, b[2] *= a, b[6] *= a, b[10] *= a, b[14] *= a, b[3] *= a, b[7] *= a, 
            b[11] *= a, b[15] *= a, this;
        },
        multiplyVector3: function(a) {
            return console.warn("DEPRECATED: Matrix4's .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead."), 
            a.applyProjection(this);
        },
        multiplyVector4: function(a) {
            return console.warn("DEPRECATED: Matrix4's .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."), 
            a.applyMatrix4(this);
        },
        multiplyVector3Array: function() {
            var a = new v.Vector3();
            return function(b) {
                for (var c = 0, d = b.length; d > c; c += 3) a.x = b[c], a.y = b[c + 1], a.z = b[c + 2], 
                a.applyProjection(this), b[c] = a.x, b[c + 1] = a.y, b[c + 2] = a.z;
                return b;
            };
        }(),
        rotateAxis: function(a) {
            console.warn("DEPRECATED: Matrix4's .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."), 
            a.transformDirection(this);
        },
        crossVector: function(a) {
            return console.warn("DEPRECATED: Matrix4's .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."), 
            a.applyMatrix4(this);
        },
        determinant: function() {
            var a = this.elements, b = a[0], c = a[4], d = a[8], e = a[12], f = a[1], g = a[5], h = a[9], i = a[13], j = a[2], k = a[6], l = a[10], m = a[14], n = a[3], o = a[7], p = a[11], q = a[15];
            return n * (+e * h * k - d * i * k - e * g * l + c * i * l + d * g * m - c * h * m) + o * (+b * h * m - b * i * l + e * f * l - d * f * m + d * i * j - e * h * j) + p * (+b * i * k - b * g * m - e * f * k + c * f * m + e * g * j - c * i * j) + q * (-d * g * j - b * h * k + b * g * l + d * f * k - c * f * l + c * h * j);
        },
        transpose: function() {
            var a, b = this.elements;
            return a = b[1], b[1] = b[4], b[4] = a, a = b[2], b[2] = b[8], b[8] = a, a = b[6], 
            b[6] = b[9], b[9] = a, a = b[3], b[3] = b[12], b[12] = a, a = b[7], b[7] = b[13], 
            b[13] = a, a = b[11], b[11] = b[14], b[14] = a, this;
        },
        flattenToArray: function(a) {
            var b = this.elements;
            return a[0] = b[0], a[1] = b[1], a[2] = b[2], a[3] = b[3], a[4] = b[4], a[5] = b[5], 
            a[6] = b[6], a[7] = b[7], a[8] = b[8], a[9] = b[9], a[10] = b[10], a[11] = b[11], 
            a[12] = b[12], a[13] = b[13], a[14] = b[14], a[15] = b[15], a;
        },
        flattenToArrayOffset: function(a, b) {
            var c = this.elements;
            return a[b] = c[0], a[b + 1] = c[1], a[b + 2] = c[2], a[b + 3] = c[3], a[b + 4] = c[4], 
            a[b + 5] = c[5], a[b + 6] = c[6], a[b + 7] = c[7], a[b + 8] = c[8], a[b + 9] = c[9], 
            a[b + 10] = c[10], a[b + 11] = c[11], a[b + 12] = c[12], a[b + 13] = c[13], a[b + 14] = c[14], 
            a[b + 15] = c[15], a;
        },
        getPosition: function() {
            var a = new v.Vector3();
            return function() {
                console.warn("DEPRECATED: Matrix4's .getPosition() has been removed. Use Vector3.getPositionFromMatrix( matrix ) instead.");
                var b = this.elements;
                return a.set(b[12], b[13], b[14]);
            };
        }(),
        setPosition: function(a) {
            var b = this.elements;
            return b[12] = a.x, b[13] = a.y, b[14] = a.z, this;
        },
        getInverse: function(a, b) {
            var c = this.elements, d = a.elements, e = d[0], f = d[4], g = d[8], h = d[12], i = d[1], j = d[5], k = d[9], l = d[13], m = d[2], n = d[6], o = d[10], p = d[14], q = d[3], r = d[7], s = d[11], t = d[15];
            c[0] = k * p * r - l * o * r + l * n * s - j * p * s - k * n * t + j * o * t, c[4] = h * o * r - g * p * r - h * n * s + f * p * s + g * n * t - f * o * t, 
            c[8] = g * l * r - h * k * r + h * j * s - f * l * s - g * j * t + f * k * t, c[12] = h * k * n - g * l * n - h * j * o + f * l * o + g * j * p - f * k * p, 
            c[1] = l * o * q - k * p * q - l * m * s + i * p * s + k * m * t - i * o * t, c[5] = g * p * q - h * o * q + h * m * s - e * p * s - g * m * t + e * o * t, 
            c[9] = h * k * q - g * l * q - h * i * s + e * l * s + g * i * t - e * k * t, c[13] = g * l * m - h * k * m + h * i * o - e * l * o - g * i * p + e * k * p, 
            c[2] = j * p * q - l * n * q + l * m * r - i * p * r - j * m * t + i * n * t, c[6] = h * n * q - f * p * q - h * m * r + e * p * r + f * m * t - e * n * t, 
            c[10] = f * l * q - h * j * q + h * i * r - e * l * r - f * i * t + e * j * t, c[14] = h * j * m - f * l * m - h * i * n + e * l * n + f * i * p - e * j * p, 
            c[3] = k * n * q - j * o * q - k * m * r + i * o * r + j * m * s - i * n * s, c[7] = f * o * q - g * n * q + g * m * r - e * o * r - f * m * s + e * n * s, 
            c[11] = g * j * q - f * k * q - g * i * r + e * k * r + f * i * s - e * j * s, c[15] = f * k * m - g * j * m + g * i * n - e * k * n - f * i * o + e * j * o;
            var u = d[0] * c[0] + d[1] * c[4] + d[2] * c[8] + d[3] * c[12];
            if (0 == u) {
                var v = "Matrix4.getInverse(): can't invert matrix, determinant is 0";
                if (b) throw new Error(v);
                return console.warn(v), this.identity(), this;
            }
            return this.multiplyScalar(1 / u), this;
        },
        translate: function() {
            console.warn("DEPRECATED: Matrix4's .translate() has been removed.");
        },
        rotateX: function() {
            console.warn("DEPRECATED: Matrix4's .rotateX() has been removed.");
        },
        rotateY: function() {
            console.warn("DEPRECATED: Matrix4's .rotateY() has been removed.");
        },
        rotateZ: function() {
            console.warn("DEPRECATED: Matrix4's .rotateZ() has been removed.");
        },
        rotateByAxis: function() {
            console.warn("DEPRECATED: Matrix4's .rotateByAxis() has been removed.");
        },
        scale: function(a) {
            var b = this.elements, c = a.x, d = a.y, e = a.z;
            return b[0] *= c, b[4] *= d, b[8] *= e, b[1] *= c, b[5] *= d, b[9] *= e, b[2] *= c, 
            b[6] *= d, b[10] *= e, b[3] *= c, b[7] *= d, b[11] *= e, this;
        },
        getMaxScaleOnAxis: function() {
            var a = this.elements, b = a[0] * a[0] + a[1] * a[1] + a[2] * a[2], c = a[4] * a[4] + a[5] * a[5] + a[6] * a[6], d = a[8] * a[8] + a[9] * a[9] + a[10] * a[10];
            return Math.sqrt(Math.max(b, Math.max(c, d)));
        },
        makeTranslation: function(a, b, c) {
            return this.set(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, c, 0, 0, 0, 1), this;
        },
        makeRotationX: function(a) {
            var b = Math.cos(a), c = Math.sin(a);
            return this.set(1, 0, 0, 0, 0, b, -c, 0, 0, c, b, 0, 0, 0, 0, 1), this;
        },
        makeRotationY: function(a) {
            var b = Math.cos(a), c = Math.sin(a);
            return this.set(b, 0, c, 0, 0, 1, 0, 0, -c, 0, b, 0, 0, 0, 0, 1), this;
        },
        makeRotationZ: function(a) {
            var b = Math.cos(a), c = Math.sin(a);
            return this.set(b, -c, 0, 0, c, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
        },
        makeRotationAxis: function(a, b) {
            var c = Math.cos(b), d = Math.sin(b), e = 1 - c, f = a.x, g = a.y, h = a.z, i = e * f, j = e * g;
            return this.set(i * f + c, i * g - d * h, i * h + d * g, 0, i * g + d * h, j * g + c, j * h - d * f, 0, i * h - d * g, j * h + d * f, e * h * h + c, 0, 0, 0, 0, 1), 
            this;
        },
        makeScale: function(a, b, c) {
            return this.set(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1), this;
        },
        compose: function(a, b, c) {
            return console.warn("DEPRECATED: Matrix4's .compose() has been deprecated in favor of makeFromPositionQuaternionScale. Please update your code."), 
            this.makeFromPositionQuaternionScale(a, b, c);
        },
        makeFromPositionQuaternionScale: function(a, b, c) {
            return this.makeRotationFromQuaternion(b), this.scale(c), this.setPosition(a), this;
        },
        makeFromPositionEulerScale: function(a, b, c, d) {
            return this.makeRotationFromEuler(b, c), this.scale(d), this.setPosition(a), this;
        },
        makeFrustum: function(a, b, c, d, e, f) {
            var g = this.elements, h = 2 * e / (b - a), i = 2 * e / (d - c), j = (b + a) / (b - a), k = (d + c) / (d - c), l = -(f + e) / (f - e), m = -2 * f * e / (f - e);
            return g[0] = h, g[4] = 0, g[8] = j, g[12] = 0, g[1] = 0, g[5] = i, g[9] = k, g[13] = 0, 
            g[2] = 0, g[6] = 0, g[10] = l, g[14] = m, g[3] = 0, g[7] = 0, g[11] = -1, g[15] = 0, 
            this;
        },
        makePerspective: function(a, b, c, d) {
            var e = c * Math.tan(v.Math.degToRad(.5 * a)), f = -e, g = f * b, h = e * b;
            return this.makeFrustum(g, h, f, e, c, d);
        },
        makeOrthographic: function(a, b, c, d, e, f) {
            var g = this.elements, h = b - a, i = c - d, j = f - e, k = (b + a) / h, l = (c + d) / i, m = (f + e) / j;
            return g[0] = 2 / h, g[4] = 0, g[8] = 0, g[12] = -k, g[1] = 0, g[5] = 2 / i, g[9] = 0, 
            g[13] = -l, g[2] = 0, g[6] = 0, g[10] = -2 / j, g[14] = -m, g[3] = 0, g[7] = 0, 
            g[11] = 0, g[15] = 1, this;
        },
        clone: function() {
            var a = this.elements;
            return new v.Matrix4(a[0], a[4], a[8], a[12], a[1], a[5], a[9], a[13], a[2], a[6], a[10], a[14], a[3], a[7], a[11], a[15]);
        }
    }, v.extend(v.Matrix4.prototype, {
        decompose: function() {
            var a = new v.Vector3(), b = new v.Vector3(), c = new v.Vector3(), d = new v.Matrix4();
            return function(e, f, g) {
                var h = this.elements;
                return a.set(h[0], h[1], h[2]), b.set(h[4], h[5], h[6]), c.set(h[8], h[9], h[10]), 
                e = e instanceof v.Vector3 ? e : new v.Vector3(), f = f instanceof v.Quaternion ? f : new v.Quaternion(), 
                g = g instanceof v.Vector3 ? g : new v.Vector3(), g.x = a.length(), g.y = b.length(), 
                g.z = c.length(), e.x = h[12], e.y = h[13], e.z = h[14], d.copy(this), d.elements[0] /= g.x, 
                d.elements[1] /= g.x, d.elements[2] /= g.x, d.elements[4] /= g.y, d.elements[5] /= g.y, 
                d.elements[6] /= g.y, d.elements[8] /= g.z, d.elements[9] /= g.z, d.elements[10] /= g.z, 
                f.setFromRotationMatrix(d), [ e, f, g ];
            };
        }()
    }), v.Ray = function(a, b) {
        this.origin = void 0 !== a ? a : new v.Vector3(), this.direction = void 0 !== b ? b : new v.Vector3();
    }, v.Ray.prototype = {
        constructor: v.Ray,
        set: function(a, b) {
            return this.origin.copy(a), this.direction.copy(b), this;
        },
        copy: function(a) {
            return this.origin.copy(a.origin), this.direction.copy(a.direction), this;
        },
        at: function(a, b) {
            var c = b || new v.Vector3();
            return c.copy(this.direction).multiplyScalar(a).add(this.origin);
        },
        recast: function() {
            var a = new v.Vector3();
            return function(b) {
                return this.origin.copy(this.at(b, a)), this;
            };
        }(),
        closestPointToPoint: function(a, b) {
            var c = b || new v.Vector3();
            c.subVectors(a, this.origin);
            var d = c.dot(this.direction);
            return c.copy(this.direction).multiplyScalar(d).add(this.origin);
        },
        distanceToPoint: function() {
            var a = new v.Vector3();
            return function(b) {
                var c = a.subVectors(b, this.origin).dot(this.direction);
                return a.copy(this.direction).multiplyScalar(c).add(this.origin), a.distanceTo(b);
            };
        }(),
        isIntersectionSphere: function(a) {
            return this.distanceToPoint(a.center) <= a.radius;
        },
        isIntersectionPlane: function(a) {
            var b = a.normal.dot(this.direction);
            return 0 != b ? !0 : 0 == a.distanceToPoint(this.origin) ? !0 : !1;
        },
        distanceToPlane: function(a) {
            var b = a.normal.dot(this.direction);
            if (0 == b) return 0 == a.distanceToPoint(this.origin) ? 0 : void 0;
            var c = -(this.origin.dot(a.normal) + a.constant) / b;
            return c;
        },
        intersectPlane: function(a, b) {
            var c = this.distanceToPlane(a);
            return void 0 === c ? void 0 : this.at(c, b);
        },
        applyMatrix4: function(a) {
            return this.direction.add(this.origin).applyMatrix4(a), this.origin.applyMatrix4(a), 
            this.direction.sub(this.origin), this;
        },
        equals: function(a) {
            return a.origin.equals(this.origin) && a.direction.equals(this.direction);
        },
        clone: function() {
            return new v.Ray().copy(this);
        }
    }, v.Sphere = function(a, b) {
        this.center = void 0 !== a ? a : new v.Vector3(), this.radius = void 0 !== b ? b : 0;
    }, v.Sphere.prototype = {
        constructor: v.Sphere,
        set: function(a, b) {
            return this.center.copy(a), this.radius = b, this;
        },
        setFromCenterAndPoints: function(a, b) {
            for (var c = 0, d = 0, e = b.length; e > d; d++) {
                var f = a.distanceToSquared(b[d]);
                c = Math.max(c, f);
            }
            return this.center = a, this.radius = Math.sqrt(c), this;
        },
        copy: function(a) {
            return this.center.copy(a.center), this.radius = a.radius, this;
        },
        empty: function() {
            return this.radius <= 0;
        },
        containsPoint: function(a) {
            return a.distanceToSquared(this.center) <= this.radius * this.radius;
        },
        distanceToPoint: function(a) {
            return a.distanceTo(this.center) - this.radius;
        },
        intersectsSphere: function(a) {
            var b = this.radius + a.radius;
            return a.center.distanceToSquared(this.center) <= b * b;
        },
        clampPoint: function(a, b) {
            var c = this.center.distanceToSquared(a), d = b || new v.Vector3();
            return d.copy(a), c > this.radius * this.radius && (d.sub(this.center).normalize(), 
            d.multiplyScalar(this.radius).add(this.center)), d;
        },
        getBoundingBox: function(a) {
            var b = a || new v.Box3();
            return b.set(this.center, this.center), b.expandByScalar(this.radius), b;
        },
        applyMatrix4: function(a) {
            return this.center.applyMatrix4(a), this.radius = this.radius * a.getMaxScaleOnAxis(), 
            this;
        },
        translate: function(a) {
            return this.center.add(a), this;
        },
        equals: function(a) {
            return a.center.equals(this.center) && a.radius === this.radius;
        },
        clone: function() {
            return new v.Sphere().copy(this);
        }
    }, v.Frustum = function(a, b, c, d, e, f) {
        this.planes = [ void 0 !== a ? a : new v.Plane(), void 0 !== b ? b : new v.Plane(), void 0 !== c ? c : new v.Plane(), void 0 !== d ? d : new v.Plane(), void 0 !== e ? e : new v.Plane(), void 0 !== f ? f : new v.Plane() ];
    }, v.Frustum.prototype = {
        constructor: v.Frustum,
        set: function(a, b, c, d, e, f) {
            var g = this.planes;
            return g[0].copy(a), g[1].copy(b), g[2].copy(c), g[3].copy(d), g[4].copy(e), g[5].copy(f), 
            this;
        },
        copy: function(a) {
            for (var b = this.planes, c = 0; 6 > c; c++) b[c].copy(a.planes[c]);
            return this;
        },
        setFromMatrix: function(a) {
            var b = this.planes, c = a.elements, d = c[0], e = c[1], f = c[2], g = c[3], h = c[4], i = c[5], j = c[6], k = c[7], l = c[8], m = c[9], n = c[10], o = c[11], p = c[12], q = c[13], r = c[14], s = c[15];
            return b[0].setComponents(g - d, k - h, o - l, s - p).normalize(), b[1].setComponents(g + d, k + h, o + l, s + p).normalize(), 
            b[2].setComponents(g + e, k + i, o + m, s + q).normalize(), b[3].setComponents(g - e, k - i, o - m, s - q).normalize(), 
            b[4].setComponents(g - f, k - j, o - n, s - r).normalize(), b[5].setComponents(g + f, k + j, o + n, s + r).normalize(), 
            this;
        },
        intersectsObject: function() {
            var a = new v.Vector3();
            return function(b) {
                var c = b.matrixWorld, d = this.planes, e = -b.geometry.boundingSphere.radius * c.getMaxScaleOnAxis();
                a.getPositionFromMatrix(c);
                for (var f = 0; 6 > f; f++) {
                    var g = d[f].distanceToPoint(a);
                    if (e > g) return !1;
                }
                return !0;
            };
        }(),
        intersectsSphere: function(a) {
            for (var b = this.planes, c = a.center, d = -a.radius, e = 0; 6 > e; e++) {
                var f = b[e].distanceToPoint(c);
                if (d > f) return !1;
            }
            return !0;
        },
        containsPoint: function(a) {
            for (var b = this.planes, c = 0; 6 > c; c++) if (b[c].distanceToPoint(a) < 0) return !1;
            return !0;
        },
        clone: function() {
            return new v.Frustum().copy(this);
        }
    }, v.Plane = function(a, b) {
        this.normal = void 0 !== a ? a : new v.Vector3(1, 0, 0), this.constant = void 0 !== b ? b : 0;
    }, v.Plane.prototype = {
        constructor: v.Plane,
        set: function(a, b) {
            return this.normal.copy(a), this.constant = b, this;
        },
        setComponents: function(a, b, c, d) {
            return this.normal.set(a, b, c), this.constant = d, this;
        },
        setFromNormalAndCoplanarPoint: function(a, b) {
            return this.normal.copy(a), this.constant = -b.dot(this.normal), this;
        },
        setFromCoplanarPoints: function() {
            var a = new v.Vector3(), b = new v.Vector3();
            return function(c, d, e) {
                var f = a.subVectors(e, d).cross(b.subVectors(c, d)).normalize();
                return this.setFromNormalAndCoplanarPoint(f, c), this;
            };
        }(),
        copy: function(a) {
            return this.normal.copy(a.normal), this.constant = a.constant, this;
        },
        normalize: function() {
            var a = 1 / this.normal.length();
            return this.normal.multiplyScalar(a), this.constant *= a, this;
        },
        negate: function() {
            return this.constant *= -1, this.normal.negate(), this;
        },
        distanceToPoint: function(a) {
            return this.normal.dot(a) + this.constant;
        },
        distanceToSphere: function(a) {
            return this.distanceToPoint(a.center) - a.radius;
        },
        projectPoint: function(a, b) {
            return this.orthoPoint(a, b).sub(a).negate();
        },
        orthoPoint: function(a, b) {
            var c = this.distanceToPoint(a), d = b || new v.Vector3();
            return d.copy(this.normal).multiplyScalar(c);
        },
        isIntersectionLine: function(a) {
            var b = this.distanceToPoint(a.start), c = this.distanceToPoint(a.end);
            return 0 > b && c > 0 || 0 > c && b > 0;
        },
        intersectLine: function() {
            var a = new v.Vector3();
            return function(b, c) {
                var d = c || new v.Vector3(), e = b.delta(a), f = this.normal.dot(e);
                if (0 == f) return 0 == this.distanceToPoint(b.start) ? d.copy(b.start) : void 0;
                var g = -(b.start.dot(this.normal) + this.constant) / f;
                return 0 > g || g > 1 ? void 0 : d.copy(e).multiplyScalar(g).add(b.start);
            };
        }(),
        coplanarPoint: function(a) {
            var b = a || new v.Vector3();
            return b.copy(this.normal).multiplyScalar(-this.constant);
        },
        applyMatrix4: function() {
            var a = new v.Vector3(), b = new v.Vector3();
            return function(c, d) {
                d = d || new v.Matrix3().getNormalMatrix(c);
                var e = a.copy(this.normal).applyMatrix3(d), f = this.coplanarPoint(b);
                return f.applyMatrix4(c), this.setFromNormalAndCoplanarPoint(e, f), this;
            };
        }(),
        translate: function(a) {
            return this.constant = this.constant - a.dot(this.normal), this;
        },
        equals: function(a) {
            return a.normal.equals(this.normal) && a.constant == this.constant;
        },
        clone: function() {
            return new v.Plane().copy(this);
        }
    }, v.Math = {
        clamp: function(a, b, c) {
            return b > a ? b : a > c ? c : a;
        },
        clampBottom: function(a, b) {
            return b > a ? b : a;
        },
        mapLinear: function(a, b, c, d, e) {
            return d + (a - b) * (e - d) / (c - b);
        },
        smoothstep: function(a, b, c) {
            return b >= a ? 0 : a >= c ? 1 : (a = (a - b) / (c - b), a * a * (3 - 2 * a));
        },
        smootherstep: function(a, b, c) {
            return b >= a ? 0 : a >= c ? 1 : (a = (a - b) / (c - b), a * a * a * (a * (6 * a - 15) + 10));
        },
        random16: function() {
            return (65280 * Math.random() + 255 * Math.random()) / 65535;
        },
        randInt: function(a, b) {
            return a + Math.floor(Math.random() * (b - a + 1));
        },
        randFloat: function(a, b) {
            return a + Math.random() * (b - a);
        },
        randFloatSpread: function(a) {
            return a * (.5 - Math.random());
        },
        sign: function(a) {
            return 0 > a ? -1 : a > 0 ? 1 : 0;
        },
        degToRad: function() {
            var a = Math.PI / 180;
            return function(b) {
                return b * a;
            };
        }(),
        radToDeg: function() {
            var a = 180 / Math.PI;
            return function(b) {
                return b * a;
            };
        }()
    }, v.Spline = function(a) {
        function b(a, b, c, d, e, f, g) {
            var h = .5 * (c - a), i = .5 * (d - b);
            return (2 * (b - c) + h + i) * g + (-3 * (b - c) - 2 * h - i) * f + h * e + b;
        }
        this.points = a;
        var c, d, e, f, g, h, i, j, k, l = [], m = {
            x: 0,
            y: 0,
            z: 0
        };
        this.initFromArray = function(a) {
            this.points = [];
            for (var b = 0; b < a.length; b++) this.points[b] = {
                x: a[b][0],
                y: a[b][1],
                z: a[b][2]
            };
        }, this.getPoint = function(a) {
            return c = (this.points.length - 1) * a, d = Math.floor(c), e = c - d, l[0] = 0 === d ? d : d - 1, 
            l[1] = d, l[2] = d > this.points.length - 2 ? this.points.length - 1 : d + 1, l[3] = d > this.points.length - 3 ? this.points.length - 1 : d + 2, 
            h = this.points[l[0]], i = this.points[l[1]], j = this.points[l[2]], k = this.points[l[3]], 
            f = e * e, g = e * f, m.x = b(h.x, i.x, j.x, k.x, e, f, g), m.y = b(h.y, i.y, j.y, k.y, e, f, g), 
            m.z = b(h.z, i.z, j.z, k.z, e, f, g), m;
        }, this.getControlPointsArray = function() {
            var a, b, c = this.points.length, d = [];
            for (a = 0; c > a; a++) b = this.points[a], d[a] = [ b.x, b.y, b.z ];
            return d;
        }, this.getLength = function(a) {
            var b, c, d, e, f = 0, g = 0, h = 0, i = new v.Vector3(), j = new v.Vector3(), k = [], l = 0;
            for (k[0] = 0, a || (a = 100), d = this.points.length * a, i.copy(this.points[0]), 
            b = 1; d > b; b++) c = b / d, e = this.getPoint(c), j.copy(e), l += j.distanceTo(i), 
            i.copy(e), f = (this.points.length - 1) * c, g = Math.floor(f), g != h && (k[g] = l, 
            h = g);
            return k[k.length] = l, {
                chunks: k,
                total: l
            };
        }, this.reparametrizeByArcLength = function(a) {
            var b, c, d, e, f, g, h, i, j = [], k = new v.Vector3(), l = this.getLength();
            for (j.push(k.copy(this.points[0]).clone()), b = 1; b < this.points.length; b++) {
                for (g = l.chunks[b] - l.chunks[b - 1], h = Math.ceil(a * g / l.total), e = (b - 1) / (this.points.length - 1), 
                f = b / (this.points.length - 1), c = 1; h - 1 > c; c++) d = e + c * (1 / h) * (f - e), 
                i = this.getPoint(d), j.push(k.copy(i).clone());
                j.push(k.copy(this.points[b]).clone());
            }
            this.points = j;
        };
    }, v.Triangle = function(a, b, c) {
        this.a = void 0 !== a ? a : new v.Vector3(), this.b = void 0 !== b ? b : new v.Vector3(), 
        this.c = void 0 !== c ? c : new v.Vector3();
    }, v.Triangle.normal = function() {
        var a = new v.Vector3();
        return function(b, c, d, e) {
            var f = e || new v.Vector3();
            f.subVectors(d, c), a.subVectors(b, c), f.cross(a);
            var g = f.lengthSq();
            return g > 0 ? f.multiplyScalar(1 / Math.sqrt(g)) : f.set(0, 0, 0);
        };
    }(), v.Triangle.barycoordFromPoint = function() {
        var a = new v.Vector3(), b = new v.Vector3(), c = new v.Vector3();
        return function(d, e, f, g, h) {
            a.subVectors(g, e), b.subVectors(f, e), c.subVectors(d, e);
            var i = a.dot(a), j = a.dot(b), k = a.dot(c), l = b.dot(b), m = b.dot(c), n = i * l - j * j, o = h || new v.Vector3();
            if (0 == n) return o.set(-2, -1, -1);
            var p = 1 / n, q = (l * k - j * m) * p, r = (i * m - j * k) * p;
            return o.set(1 - q - r, r, q);
        };
    }(), v.Triangle.containsPoint = function() {
        var a = new v.Vector3();
        return function(b, c, d, e) {
            var f = v.Triangle.barycoordFromPoint(b, c, d, e, a);
            return f.x >= 0 && f.y >= 0 && f.x + f.y <= 1;
        };
    }(), v.Triangle.prototype = {
        constructor: v.Triangle,
        set: function(a, b, c) {
            return this.a.copy(a), this.b.copy(b), this.c.copy(c), this;
        },
        setFromPointsAndIndices: function(a, b, c, d) {
            return this.a.copy(a[b]), this.b.copy(a[c]), this.c.copy(a[d]), this;
        },
        copy: function(a) {
            return this.a.copy(a.a), this.b.copy(a.b), this.c.copy(a.c), this;
        },
        area: function() {
            var a = new v.Vector3(), b = new v.Vector3();
            return function() {
                return a.subVectors(this.c, this.b), b.subVectors(this.a, this.b), .5 * a.cross(b).length();
            };
        }(),
        midpoint: function(a) {
            var b = a || new v.Vector3();
            return b.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
        },
        normal: function(a) {
            return v.Triangle.normal(this.a, this.b, this.c, a);
        },
        plane: function(a) {
            var b = a || new v.Plane();
            return b.setFromCoplanarPoints(this.a, this.b, this.c);
        },
        barycoordFromPoint: function(a, b) {
            return v.Triangle.barycoordFromPoint(a, this.a, this.b, this.c, b);
        },
        containsPoint: function(a) {
            return v.Triangle.containsPoint(a, this.a, this.b, this.c);
        },
        equals: function(a) {
            return a.a.equals(this.a) && a.b.equals(this.b) && a.c.equals(this.c);
        },
        clone: function() {
            return new v.Triangle().copy(this);
        }
    }, v.Vertex = function(a) {
        return console.warn("THREE.Vertex has been DEPRECATED. Use THREE.Vector3 instead."), 
        a;
    }, v.UV = function(a, b) {
        return console.warn("THREE.UV has been DEPRECATED. Use THREE.Vector2 instead."), 
        new v.Vector2(a, b);
    }, v.Clock = function(a) {
        this.autoStart = void 0 !== a ? a : !0, this.startTime = 0, this.oldTime = 0, this.elapsedTime = 0, 
        this.running = !1;
    }, v.Clock.prototype = {
        constructor: v.Clock,
        start: function() {
            this.startTime = void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now(), 
            this.oldTime = this.startTime, this.running = !0;
        },
        stop: function() {
            this.getElapsedTime(), this.running = !1;
        },
        getElapsedTime: function() {
            return this.getDelta(), this.elapsedTime;
        },
        getDelta: function() {
            var a = 0;
            if (this.autoStart && !this.running && this.start(), this.running) {
                var b = void 0 !== window.performance && void 0 !== window.performance.now ? window.performance.now() : Date.now();
                a = .001 * (b - this.oldTime), this.oldTime = b, this.elapsedTime += a;
            }
            return a;
        }
    }, v.EventDispatcher = function() {}, v.EventDispatcher.prototype = {
        constructor: v.EventDispatcher,
        addEventListener: function(a, b) {
            void 0 === this._listeners && (this._listeners = {});
            var c = this._listeners;
            void 0 === c[a] && (c[a] = []), -1 === c[a].indexOf(b) && c[a].push(b);
        },
        hasEventListener: function(a, b) {
            if (void 0 === this._listeners) return !1;
            var c = this._listeners;
            return void 0 !== c[a] && -1 !== c[a].indexOf(b) ? !0 : !1;
        },
        removeEventListener: function(a, b) {
            if (void 0 !== this._listeners) {
                var c = this._listeners, d = c[a].indexOf(b);
                -1 !== d && c[a].splice(d, 1);
            }
        },
        dispatchEvent: function(a) {
            if (void 0 !== this._listeners) {
                var b = this._listeners, c = b[a.type];
                if (void 0 !== c) {
                    a.target = this;
                    for (var d = 0, e = c.length; e > d; d++) c[d].call(this, a);
                }
            }
        }
    }, function(a) {
        a.Raycaster = function(b, c, d, e) {
            this.ray = new a.Ray(b, c), this.ray.direction.lengthSq() > 0 && this.ray.direction.normalize(), 
            this.near = d || 0, this.far = e || 1/0;
        };
        var b = new a.Sphere(), c = new a.Ray(), d = new a.Plane(), e = new a.Vector3(), f = new a.Vector3(), g = new a.Matrix4(), h = function(a, b) {
            return a.distance - b.distance;
        }, i = function(h, j, k) {
            if (h instanceof a.Particle) {
                f.getPositionFromMatrix(h.matrixWorld);
                var l = j.ray.distanceToPoint(f);
                if (l > h.scale.x) return k;
                k.push({
                    distance: l,
                    point: h.position,
                    face: null,
                    object: h
                });
            } else if (h instanceof a.LOD) {
                f.getPositionFromMatrix(h.matrixWorld);
                var l = j.ray.origin.distanceTo(f);
                i(h.getObjectForDistance(l), j, k);
            } else if (h instanceof a.Mesh) {
                if (f.getPositionFromMatrix(h.matrixWorld), b.set(f, h.geometry.boundingSphere.radius * h.matrixWorld.getMaxScaleOnAxis()), 
                !j.ray.isIntersectionSphere(b)) return k;
                var m, n, o, p, q = h.geometry, r = q.vertices, s = h.material instanceof a.MeshFaceMaterial, t = s === !0 ? h.material.materials : null, u = h.material.side, v = j.precision;
                g.getInverse(h.matrixWorld), c.copy(j.ray).applyMatrix4(g);
                for (var w = 0, x = q.faces.length; x > w; w++) {
                    var y = q.faces[w], z = s === !0 ? t[y.materialIndex] : h.material;
                    if (void 0 !== z) {
                        d.setFromNormalAndCoplanarPoint(y.normal, r[y.a]);
                        var A = c.distanceToPlane(d);
                        if (!(Math.abs(A) < v || 0 > A)) {
                            if (u = z.side, u !== a.DoubleSide) {
                                var B = c.direction.dot(d.normal);
                                if (!(u === a.FrontSide ? 0 > B : B > 0)) continue;
                            }
                            if (!(A < j.near || A > j.far)) {
                                if (e = c.at(A, e), y instanceof a.Face3) {
                                    if (m = r[y.a], n = r[y.b], o = r[y.c], !a.Triangle.containsPoint(e, m, n, o)) continue;
                                } else {
                                    if (!(y instanceof a.Face4)) throw Error("face type not supported");
                                    if (m = r[y.a], n = r[y.b], o = r[y.c], p = r[y.d], !a.Triangle.containsPoint(e, m, n, p) && !a.Triangle.containsPoint(e, n, o, p)) continue;
                                }
                                k.push({
                                    distance: A,
                                    point: j.ray.at(A),
                                    face: y,
                                    faceIndex: w,
                                    object: h
                                });
                            }
                        }
                    }
                }
            }
        }, j = function(a, b, c) {
            for (var d = a.getDescendants(), e = 0, f = d.length; f > e; e++) i(d[e], b, c);
        };
        a.Raycaster.prototype.precision = 1e-4, a.Raycaster.prototype.set = function(a, b) {
            this.ray.set(a, b), this.ray.direction.length() > 0 && this.ray.direction.normalize();
        }, a.Raycaster.prototype.intersectObject = function(a, b) {
            var c = [];
            return b === !0 && j(a, this, c), i(a, this, c), c.sort(h), c;
        }, a.Raycaster.prototype.intersectObjects = function(a, b) {
            for (var c = [], d = 0, e = a.length; e > d; d++) i(a[d], this, c), b === !0 && j(a[d], this, c);
            return c.sort(h), c;
        };
    }(v), v.Object3D = function() {
        this.id = v.Object3DIdCount++, this.name = "", this.parent = void 0, this.children = [], 
        this.up = new v.Vector3(0, 1, 0), this.position = new v.Vector3(), this.rotation = new v.Vector3(), 
        this.eulerOrder = v.Object3D.defaultEulerOrder, this.scale = new v.Vector3(1, 1, 1), 
        this.renderDepth = null, this.rotationAutoUpdate = !0, this.matrix = new v.Matrix4(), 
        this.matrixWorld = new v.Matrix4(), this.matrixAutoUpdate = !0, this.matrixWorldNeedsUpdate = !0, 
        this.quaternion = new v.Quaternion(), this.useQuaternion = !1, this.visible = !0, 
        this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.userData = {};
    }, v.Object3D.prototype = {
        constructor: v.Object3D,
        applyMatrix: function() {
            var a = new v.Matrix4();
            return function(b) {
                this.matrix.multiplyMatrices(b, this.matrix), this.position.getPositionFromMatrix(this.matrix), 
                this.scale.getScaleFromMatrix(this.matrix), a.extractRotation(this.matrix), this.useQuaternion === !0 ? this.quaternion.setFromRotationMatrix(a) : this.rotation.setEulerFromRotationMatrix(a, this.eulerOrder);
            };
        }(),
        rotateOnAxis: function() {
            var a = new v.Quaternion(), b = new v.Quaternion();
            return function(c, d) {
                return a.setFromAxisAngle(c, d), this.useQuaternion === !0 ? this.quaternion.multiply(a) : (b.setFromEuler(this.rotation, this.eulerOrder), 
                b.multiply(a), this.rotation.setEulerFromQuaternion(b, this.eulerOrder)), this;
            };
        }(),
        translateOnAxis: function() {
            var a = new v.Vector3();
            return function(b, c) {
                return a.copy(b), this.useQuaternion === !0 ? a.applyQuaternion(this.quaternion) : a.applyEuler(this.rotation, this.eulerOrder), 
                this.position.add(a.multiplyScalar(c)), this;
            };
        }(),
        translate: function(a, b) {
            return console.warn("DEPRECATED: Object3D's .translate() has been removed. Use .translateOnAxis( axis, distance ) instead. Note args have been changed."), 
            this.translateOnAxis(b, a);
        },
        translateX: function() {
            var a = new v.Vector3(1, 0, 0);
            return function(b) {
                return this.translateOnAxis(a, b);
            };
        }(),
        translateY: function() {
            var a = new v.Vector3(0, 1, 0);
            return function(b) {
                return this.translateOnAxis(a, b);
            };
        }(),
        translateZ: function() {
            var a = new v.Vector3(0, 0, 1);
            return function(b) {
                return this.translateOnAxis(a, b);
            };
        }(),
        localToWorld: function(a) {
            return a.applyMatrix4(this.matrixWorld);
        },
        worldToLocal: function() {
            var a = new v.Matrix4();
            return function(b) {
                return b.applyMatrix4(a.getInverse(this.matrixWorld));
            };
        }(),
        lookAt: function() {
            var a = new v.Matrix4();
            return function(b) {
                a.lookAt(b, this.position, this.up), this.useQuaternion === !0 ? this.quaternion.setFromRotationMatrix(a) : this.rotation.setEulerFromRotationMatrix(a, this.eulerOrder);
            };
        }(),
        add: function(a) {
            if (a === this) return console.warn("THREE.Object3D.add: An object can't be added as a child of itself."), 
            void 0;
            if (a instanceof v.Object3D) {
                void 0 !== a.parent && a.parent.remove(a), a.parent = this, this.children.push(a);
                for (var b = this; void 0 !== b.parent; ) b = b.parent;
                void 0 !== b && b instanceof v.Scene && b.__addObject(a);
            }
        },
        remove: function(a) {
            var b = this.children.indexOf(a);
            if (-1 !== b) {
                a.parent = void 0, this.children.splice(b, 1);
                for (var c = this; void 0 !== c.parent; ) c = c.parent;
                void 0 !== c && c instanceof v.Scene && c.__removeObject(a);
            }
        },
        traverse: function(a) {
            a(this);
            for (var b = 0, c = this.children.length; c > b; b++) this.children[b].traverse(a);
        },
        getObjectById: function(a, b) {
            for (var c = 0, d = this.children.length; d > c; c++) {
                var e = this.children[c];
                if (e.id === a) return e;
                if (b === !0 && (e = e.getObjectById(a, b), void 0 !== e)) return e;
            }
            return void 0;
        },
        getObjectByName: function(a, b) {
            for (var c = 0, d = this.children.length; d > c; c++) {
                var e = this.children[c];
                if (e.name === a) return e;
                if (b === !0 && (e = e.getObjectByName(a, b), void 0 !== e)) return e;
            }
            return void 0;
        },
        getChildByName: function(a, b) {
            return console.warn("DEPRECATED: Object3D's .getChildByName() has been renamed to .getObjectByName()."), 
            this.getObjectByName(a, b);
        },
        getDescendants: function(a) {
            void 0 === a && (a = []), Array.prototype.push.apply(a, this.children);
            for (var b = 0, c = this.children.length; c > b; b++) this.children[b].getDescendants(a);
            return a;
        },
        updateMatrix: function() {
            this.useQuaternion === !1 ? this.matrix.makeFromPositionEulerScale(this.position, this.rotation, this.eulerOrder, this.scale) : this.matrix.makeFromPositionQuaternionScale(this.position, this.quaternion, this.scale), 
            this.matrixWorldNeedsUpdate = !0;
        },
        updateMatrixWorld: function(a) {
            this.matrixAutoUpdate === !0 && this.updateMatrix(), (this.matrixWorldNeedsUpdate === !0 || a === !0) && (void 0 === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), 
            this.matrixWorldNeedsUpdate = !1, a = !0);
            for (var b = 0, c = this.children.length; c > b; b++) this.children[b].updateMatrixWorld(a);
        },
        clone: function(a) {
            void 0 === a && (a = new v.Object3D()), a.name = this.name, a.up.copy(this.up), 
            a.position.copy(this.position), a.rotation instanceof v.Vector3 && a.rotation.copy(this.rotation), 
            a.eulerOrder = this.eulerOrder, a.scale.copy(this.scale), a.renderDepth = this.renderDepth, 
            a.rotationAutoUpdate = this.rotationAutoUpdate, a.matrix.copy(this.matrix), a.matrixWorld.copy(this.matrixWorld), 
            a.matrixAutoUpdate = this.matrixAutoUpdate, a.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate, 
            a.quaternion.copy(this.quaternion), a.useQuaternion = this.useQuaternion, a.visible = this.visible, 
            a.castShadow = this.castShadow, a.receiveShadow = this.receiveShadow, a.frustumCulled = this.frustumCulled, 
            a.userData = JSON.parse(JSON.stringify(this.userData));
            for (var b = 0; b < this.children.length; b++) {
                var c = this.children[b];
                a.add(c.clone());
            }
            return a;
        }
    }, v.Object3D.defaultEulerOrder = "XYZ", v.Object3DIdCount = 0, v.Projector = function() {
        function a() {
            if (j === w) {
                var a = new v.RenderableObject();
                return u.push(a), w++, j++, a;
            }
            return u[j++];
        }
        function b() {
            if (l === y) {
                var a = new v.RenderableVertex();
                return x.push(a), y++, l++, a;
            }
            return x[l++];
        }
        function c() {
            if (n === A) {
                var a = new v.RenderableFace3();
                return z.push(a), A++, n++, a;
            }
            return z[n++];
        }
        function d() {
            if (o === C) {
                var a = new v.RenderableFace4();
                return B.push(a), C++, o++, a;
            }
            return B[o++];
        }
        function e() {
            if (q === E) {
                var a = new v.RenderableLine();
                return D.push(a), E++, q++, a;
            }
            return D[q++];
        }
        function f() {
            if (s === G) {
                var a = new v.RenderableParticle();
                return F.push(a), G++, s++, a;
            }
            return F[s++];
        }
        function g(a, b) {
            return b.z - a.z;
        }
        function h(a, b) {
            var c = 0, d = 1, e = a.z + a.w, f = b.z + b.w, g = -a.z + a.w, h = -b.z + b.w;
            return e >= 0 && f >= 0 && g >= 0 && h >= 0 ? !0 : 0 > e && 0 > f || 0 > g && 0 > h ? !1 : (0 > e ? c = Math.max(c, e / (e - f)) : 0 > f && (d = Math.min(d, e / (e - f))), 
            0 > g ? c = Math.max(c, g / (g - h)) : 0 > h && (d = Math.min(d, g / (g - h))), 
            c > d ? !1 : (a.lerp(b, c), b.lerp(a, 1 - d), !0));
        }
        var i, j, k, l, m, n, o, p, q, r, s, t, u = [], w = 0, x = [], y = 0, z = [], A = 0, B = [], C = 0, D = [], E = 0, F = [], G = 0, H = {
            objects: [],
            sprites: [],
            lights: [],
            elements: []
        }, I = new v.Vector3(), J = new v.Vector4(), K = new v.Box3(new v.Vector3(-1, -1, -1), new v.Vector3(1, 1, 1)), L = new v.Box3(), M = new Array(3), N = new Array(4), O = new v.Matrix4(), P = new v.Matrix4(), Q = new v.Matrix4(), R = new v.Matrix3(), S = new v.Matrix3(), T = new v.Vector3(), U = new v.Frustum(), V = new v.Vector4(), W = new v.Vector4();
        this.projectVector = function(a, b) {
            return b.matrixWorldInverse.getInverse(b.matrixWorld), P.multiplyMatrices(b.projectionMatrix, b.matrixWorldInverse), 
            a.applyProjection(P);
        }, this.unprojectVector = function(a, b) {
            return b.projectionMatrixInverse.getInverse(b.projectionMatrix), P.multiplyMatrices(b.matrixWorld, b.projectionMatrixInverse), 
            a.applyProjection(P);
        }, this.pickingRay = function(a, b) {
            a.z = -1;
            var c = new v.Vector3(a.x, a.y, 1);
            return this.unprojectVector(a, b), this.unprojectVector(c, b), c.sub(a).normalize(), 
            new v.Raycaster(a, c);
        };
        var X = function(b, c) {
            j = 0, H.objects.length = 0, H.sprites.length = 0, H.lights.length = 0;
            var d = function(b) {
                for (var c = 0, e = b.children.length; e > c; c++) {
                    var f = b.children[c];
                    f.visible !== !1 && (f instanceof v.Light ? H.lights.push(f) : f instanceof v.Mesh || f instanceof v.Line ? (f.frustumCulled === !1 || U.intersectsObject(f) === !0) && (i = a(), 
                    i.object = f, null !== f.renderDepth ? i.z = f.renderDepth : (I.getPositionFromMatrix(f.matrixWorld), 
                    I.applyProjection(P), i.z = I.z), H.objects.push(i)) : f instanceof v.Sprite || f instanceof v.Particle ? (i = a(), 
                    i.object = f, null !== f.renderDepth ? i.z = f.renderDepth : (I.getPositionFromMatrix(f.matrixWorld), 
                    I.applyProjection(P), i.z = I.z), H.sprites.push(i)) : (i = a(), i.object = f, null !== f.renderDepth ? i.z = f.renderDepth : (I.getPositionFromMatrix(f.matrixWorld), 
                    I.applyProjection(P), i.z = I.z), H.objects.push(i)), d(f));
                }
            };
            return d(b), c === !0 && H.objects.sort(g), H;
        };
        this.projectScene = function(a, i, j, u) {
            var w, y, z, A, B, C, D, E, F, G, I, Y, Z, $, _, ab, bb, cb, db, eb, fb, gb, hb, ib, jb, kb, lb = !1;
            for (n = 0, o = 0, q = 0, s = 0, H.elements.length = 0, a.autoUpdate === !0 && a.updateMatrixWorld(), 
            void 0 === i.parent && i.updateMatrixWorld(), O.copy(i.matrixWorldInverse.getInverse(i.matrixWorld)), 
            P.multiplyMatrices(i.projectionMatrix, O), S.getNormalMatrix(O), U.setFromMatrix(P), 
            H = X(a, j), w = 0, y = H.objects.length; y > w; w++) if (Z = H.objects[w].object, 
            t = Z.matrixWorld, l = 0, Z instanceof v.Mesh) {
                for ($ = Z.geometry, _ = $.vertices, ab = $.faces, db = $.faceVertexUvs, R.getNormalMatrix(t), 
                jb = Z.material instanceof v.MeshFaceMaterial, kb = jb === !0 ? Z.material : null, 
                z = 0, A = _.length; A > z; z++) k = b(), k.positionWorld.copy(_[z]).applyMatrix4(t), 
                k.positionScreen.copy(k.positionWorld).applyMatrix4(P), k.positionScreen.x /= k.positionScreen.w, 
                k.positionScreen.y /= k.positionScreen.w, k.positionScreen.z /= k.positionScreen.w, 
                k.visible = !(k.positionScreen.x < -1 || k.positionScreen.x > 1 || k.positionScreen.y < -1 || k.positionScreen.y > 1 || k.positionScreen.z < -1 || k.positionScreen.z > 1);
                for (B = 0, C = ab.length; C > B; B++) {
                    bb = ab[B];
                    var mb = jb === !0 ? kb.materials[bb.materialIndex] : Z.material;
                    if (void 0 !== mb) {
                        var nb = mb.side;
                        if (bb instanceof v.Face3) {
                            if (fb = x[bb.a], gb = x[bb.b], hb = x[bb.c], M[0] = fb.positionScreen, M[1] = gb.positionScreen, 
                            M[2] = hb.positionScreen, fb.visible !== !0 && gb.visible !== !0 && hb.visible !== !0 && !K.isIntersectionBox(L.setFromPoints(M))) continue;
                            if (lb = (hb.positionScreen.x - fb.positionScreen.x) * (gb.positionScreen.y - fb.positionScreen.y) - (hb.positionScreen.y - fb.positionScreen.y) * (gb.positionScreen.x - fb.positionScreen.x) < 0, 
                            nb !== v.DoubleSide && lb !== (nb === v.FrontSide)) continue;
                            m = c(), m.v1.copy(fb), m.v2.copy(gb), m.v3.copy(hb);
                        } else if (bb instanceof v.Face4) {
                            if (fb = x[bb.a], gb = x[bb.b], hb = x[bb.c], ib = x[bb.d], N[0] = fb.positionScreen, 
                            N[1] = gb.positionScreen, N[2] = hb.positionScreen, N[3] = ib.positionScreen, fb.visible !== !0 && gb.visible !== !0 && hb.visible !== !0 && ib.visible !== !0 && !K.isIntersectionBox(L.setFromPoints(N))) continue;
                            if (lb = (ib.positionScreen.x - fb.positionScreen.x) * (gb.positionScreen.y - fb.positionScreen.y) - (ib.positionScreen.y - fb.positionScreen.y) * (gb.positionScreen.x - fb.positionScreen.x) < 0 || (gb.positionScreen.x - hb.positionScreen.x) * (ib.positionScreen.y - hb.positionScreen.y) - (gb.positionScreen.y - hb.positionScreen.y) * (ib.positionScreen.x - hb.positionScreen.x) < 0, 
                            nb !== v.DoubleSide && lb !== (nb === v.FrontSide)) continue;
                            m = d(), m.v1.copy(fb), m.v2.copy(gb), m.v3.copy(hb), m.v4.copy(ib);
                        }
                        for (m.normalModel.copy(bb.normal), lb !== !1 || nb !== v.BackSide && nb !== v.DoubleSide || m.normalModel.negate(), 
                        m.normalModel.applyMatrix3(R).normalize(), m.normalModelView.copy(m.normalModel).applyMatrix3(S), 
                        m.centroidModel.copy(bb.centroid).applyMatrix4(t), cb = bb.vertexNormals, D = 0, 
                        E = cb.length; E > D; D++) {
                            var ob = m.vertexNormalsModel[D];
                            ob.copy(cb[D]), lb !== !1 || nb !== v.BackSide && nb !== v.DoubleSide || ob.negate(), 
                            ob.applyMatrix3(R).normalize();
                            var pb = m.vertexNormalsModelView[D];
                            pb.copy(ob).applyMatrix3(S);
                        }
                        for (m.vertexNormalsLength = cb.length, F = 0, G = db.length; G > F; F++) if (eb = db[F][B], 
                        void 0 !== eb) for (I = 0, Y = eb.length; Y > I; I++) m.uvs[F][I] = eb[I];
                        m.color = bb.color, m.material = mb, T.copy(m.centroidModel).applyProjection(P), 
                        m.z = T.z, H.elements.push(m);
                    }
                }
            } else if (Z instanceof v.Line) {
                Q.multiplyMatrices(P, t), _ = Z.geometry.vertices, fb = b(), fb.positionScreen.copy(_[0]).applyMatrix4(Q);
                var qb = Z.type === v.LinePieces ? 2 : 1;
                for (z = 1, A = _.length; A > z; z++) fb = b(), fb.positionScreen.copy(_[z]).applyMatrix4(Q), 
                (z + 1) % qb > 0 || (gb = x[l - 2], V.copy(fb.positionScreen), W.copy(gb.positionScreen), 
                h(V, W) === !0 && (V.multiplyScalar(1 / V.w), W.multiplyScalar(1 / W.w), p = e(), 
                p.v1.positionScreen.copy(V), p.v2.positionScreen.copy(W), p.z = Math.max(V.z, W.z), 
                p.material = Z.material, Z.material.vertexColors === v.VertexColors && (p.vertexColors[0].copy(Z.geometry.colors[z]), 
                p.vertexColors[1].copy(Z.geometry.colors[z - 1])), H.elements.push(p)));
            }
            for (w = 0, y = H.sprites.length; y > w; w++) Z = H.sprites[w].object, t = Z.matrixWorld, 
            Z instanceof v.Particle && (J.set(t.elements[12], t.elements[13], t.elements[14], 1), 
            J.applyMatrix4(P), J.z /= J.w, J.z > 0 && J.z < 1 && (r = f(), r.object = Z, r.x = J.x / J.w, 
            r.y = J.y / J.w, r.z = J.z, r.rotation = Z.rotation.z, r.scale.x = Z.scale.x * Math.abs(r.x - (J.x + i.projectionMatrix.elements[0]) / (J.w + i.projectionMatrix.elements[12])), 
            r.scale.y = Z.scale.y * Math.abs(r.y - (J.y + i.projectionMatrix.elements[5]) / (J.w + i.projectionMatrix.elements[13])), 
            r.material = Z.material, H.elements.push(r)));
            return u === !0 && H.elements.sort(g), H;
        };
    }, v.Face3 = function(a, b, c, d, e, f) {
        this.a = a, this.b = b, this.c = c, this.normal = d instanceof v.Vector3 ? d : new v.Vector3(), 
        this.vertexNormals = d instanceof Array ? d : [], this.color = e instanceof v.Color ? e : new v.Color(), 
        this.vertexColors = e instanceof Array ? e : [], this.vertexTangents = [], this.materialIndex = void 0 !== f ? f : 0, 
        this.centroid = new v.Vector3();
    }, v.Face3.prototype = {
        constructor: v.Face3,
        clone: function() {
            var a = new v.Face3(this.a, this.b, this.c);
            a.normal.copy(this.normal), a.color.copy(this.color), a.centroid.copy(this.centroid), 
            a.materialIndex = this.materialIndex;
            var b, c;
            for (b = 0, c = this.vertexNormals.length; c > b; b++) a.vertexNormals[b] = this.vertexNormals[b].clone();
            for (b = 0, c = this.vertexColors.length; c > b; b++) a.vertexColors[b] = this.vertexColors[b].clone();
            for (b = 0, c = this.vertexTangents.length; c > b; b++) a.vertexTangents[b] = this.vertexTangents[b].clone();
            return a;
        }
    }, v.Face4 = function(a, b, c, d, e, f, g) {
        this.a = a, this.b = b, this.c = c, this.d = d, this.normal = e instanceof v.Vector3 ? e : new v.Vector3(), 
        this.vertexNormals = e instanceof Array ? e : [], this.color = f instanceof v.Color ? f : new v.Color(), 
        this.vertexColors = f instanceof Array ? f : [], this.vertexTangents = [], this.materialIndex = void 0 !== g ? g : 0, 
        this.centroid = new v.Vector3();
    }, v.Face4.prototype = {
        constructor: v.Face4,
        clone: function() {
            var a = new v.Face4(this.a, this.b, this.c, this.d);
            a.normal.copy(this.normal), a.color.copy(this.color), a.centroid.copy(this.centroid), 
            a.materialIndex = this.materialIndex;
            var b, c;
            for (b = 0, c = this.vertexNormals.length; c > b; b++) a.vertexNormals[b] = this.vertexNormals[b].clone();
            for (b = 0, c = this.vertexColors.length; c > b; b++) a.vertexColors[b] = this.vertexColors[b].clone();
            for (b = 0, c = this.vertexTangents.length; c > b; b++) a.vertexTangents[b] = this.vertexTangents[b].clone();
            return a;
        }
    }, v.Geometry = function() {
        this.id = v.GeometryIdCount++, this.name = "", this.vertices = [], this.colors = [], 
        this.normals = [], this.faces = [], this.faceUvs = [ [] ], this.faceVertexUvs = [ [] ], 
        this.morphTargets = [], this.morphColors = [], this.morphNormals = [], this.skinWeights = [], 
        this.skinIndices = [], this.lineDistances = [], this.boundingBox = null, this.boundingSphere = null, 
        this.hasTangents = !1, this.dynamic = !0, this.verticesNeedUpdate = !1, this.elementsNeedUpdate = !1, 
        this.uvsNeedUpdate = !1, this.normalsNeedUpdate = !1, this.tangentsNeedUpdate = !1, 
        this.colorsNeedUpdate = !1, this.lineDistancesNeedUpdate = !1, this.buffersNeedUpdate = !1;
    }, v.Geometry.prototype = {
        constructor: v.Geometry,
        addEventListener: v.EventDispatcher.prototype.addEventListener,
        hasEventListener: v.EventDispatcher.prototype.hasEventListener,
        removeEventListener: v.EventDispatcher.prototype.removeEventListener,
        dispatchEvent: v.EventDispatcher.prototype.dispatchEvent,
        applyMatrix: function(a) {
            for (var b = new v.Matrix3().getNormalMatrix(a), c = 0, d = this.vertices.length; d > c; c++) {
                var e = this.vertices[c];
                e.applyMatrix4(a);
            }
            for (var c = 0, d = this.faces.length; d > c; c++) {
                var f = this.faces[c];
                f.normal.applyMatrix3(b).normalize();
                for (var g = 0, h = f.vertexNormals.length; h > g; g++) f.vertexNormals[g].applyMatrix3(b).normalize();
                f.centroid.applyMatrix4(a);
            }
        },
        computeCentroids: function() {
            var a, b, c;
            for (a = 0, b = this.faces.length; b > a; a++) c = this.faces[a], c.centroid.set(0, 0, 0), 
            c instanceof v.Face3 ? (c.centroid.add(this.vertices[c.a]), c.centroid.add(this.vertices[c.b]), 
            c.centroid.add(this.vertices[c.c]), c.centroid.divideScalar(3)) : c instanceof v.Face4 && (c.centroid.add(this.vertices[c.a]), 
            c.centroid.add(this.vertices[c.b]), c.centroid.add(this.vertices[c.c]), c.centroid.add(this.vertices[c.d]), 
            c.centroid.divideScalar(4));
        },
        computeFaceNormals: function() {
            for (var a = new v.Vector3(), b = new v.Vector3(), c = 0, d = this.faces.length; d > c; c++) {
                var e = this.faces[c], f = this.vertices[e.a], g = this.vertices[e.b], h = this.vertices[e.c];
                a.subVectors(h, g), b.subVectors(f, g), a.cross(b), a.normalize(), e.normal.copy(a);
            }
        },
        computeVertexNormals: function(a) {
            var b, c, d, e, f, g;
            if (void 0 === this.__tmpVertices) {
                for (this.__tmpVertices = new Array(this.vertices.length), g = this.__tmpVertices, 
                b = 0, c = this.vertices.length; c > b; b++) g[b] = new v.Vector3();
                for (d = 0, e = this.faces.length; e > d; d++) f = this.faces[d], f instanceof v.Face3 ? f.vertexNormals = [ new v.Vector3(), new v.Vector3(), new v.Vector3() ] : f instanceof v.Face4 && (f.vertexNormals = [ new v.Vector3(), new v.Vector3(), new v.Vector3(), new v.Vector3() ]);
            } else for (g = this.__tmpVertices, b = 0, c = this.vertices.length; c > b; b++) g[b].set(0, 0, 0);
            if (a) {
                var h, i, j, k, l = new v.Vector3(), m = new v.Vector3(), n = new v.Vector3(), o = new v.Vector3(), p = new v.Vector3();
                for (d = 0, e = this.faces.length; e > d; d++) f = this.faces[d], f instanceof v.Face3 ? (h = this.vertices[f.a], 
                i = this.vertices[f.b], j = this.vertices[f.c], l.subVectors(j, i), m.subVectors(h, i), 
                l.cross(m), g[f.a].add(l), g[f.b].add(l), g[f.c].add(l)) : f instanceof v.Face4 && (h = this.vertices[f.a], 
                i = this.vertices[f.b], j = this.vertices[f.c], k = this.vertices[f.d], n.subVectors(k, i), 
                m.subVectors(h, i), n.cross(m), g[f.a].add(n), g[f.b].add(n), g[f.d].add(n), o.subVectors(k, j), 
                p.subVectors(i, j), o.cross(p), g[f.b].add(o), g[f.c].add(o), g[f.d].add(o));
            } else for (d = 0, e = this.faces.length; e > d; d++) f = this.faces[d], f instanceof v.Face3 ? (g[f.a].add(f.normal), 
            g[f.b].add(f.normal), g[f.c].add(f.normal)) : f instanceof v.Face4 && (g[f.a].add(f.normal), 
            g[f.b].add(f.normal), g[f.c].add(f.normal), g[f.d].add(f.normal));
            for (b = 0, c = this.vertices.length; c > b; b++) g[b].normalize();
            for (d = 0, e = this.faces.length; e > d; d++) f = this.faces[d], f instanceof v.Face3 ? (f.vertexNormals[0].copy(g[f.a]), 
            f.vertexNormals[1].copy(g[f.b]), f.vertexNormals[2].copy(g[f.c])) : f instanceof v.Face4 && (f.vertexNormals[0].copy(g[f.a]), 
            f.vertexNormals[1].copy(g[f.b]), f.vertexNormals[2].copy(g[f.c]), f.vertexNormals[3].copy(g[f.d]));
        },
        computeMorphNormals: function() {
            var a, b, c, d, e;
            for (c = 0, d = this.faces.length; d > c; c++) for (e = this.faces[c], e.__originalFaceNormal ? e.__originalFaceNormal.copy(e.normal) : e.__originalFaceNormal = e.normal.clone(), 
            e.__originalVertexNormals || (e.__originalVertexNormals = []), a = 0, b = e.vertexNormals.length; b > a; a++) e.__originalVertexNormals[a] ? e.__originalVertexNormals[a].copy(e.vertexNormals[a]) : e.__originalVertexNormals[a] = e.vertexNormals[a].clone();
            var f = new v.Geometry();
            for (f.faces = this.faces, a = 0, b = this.morphTargets.length; b > a; a++) {
                if (!this.morphNormals[a]) {
                    this.morphNormals[a] = {}, this.morphNormals[a].faceNormals = [], this.morphNormals[a].vertexNormals = [];
                    var g, h, i = this.morphNormals[a].faceNormals, j = this.morphNormals[a].vertexNormals;
                    for (c = 0, d = this.faces.length; d > c; c++) e = this.faces[c], g = new v.Vector3(), 
                    h = e instanceof v.Face3 ? {
                        a: new v.Vector3(),
                        b: new v.Vector3(),
                        c: new v.Vector3()
                    } : {
                        a: new v.Vector3(),
                        b: new v.Vector3(),
                        c: new v.Vector3(),
                        d: new v.Vector3()
                    }, i.push(g), j.push(h);
                }
                var k = this.morphNormals[a];
                f.vertices = this.morphTargets[a].vertices, f.computeFaceNormals(), f.computeVertexNormals();
                var g, h;
                for (c = 0, d = this.faces.length; d > c; c++) e = this.faces[c], g = k.faceNormals[c], 
                h = k.vertexNormals[c], g.copy(e.normal), e instanceof v.Face3 ? (h.a.copy(e.vertexNormals[0]), 
                h.b.copy(e.vertexNormals[1]), h.c.copy(e.vertexNormals[2])) : (h.a.copy(e.vertexNormals[0]), 
                h.b.copy(e.vertexNormals[1]), h.c.copy(e.vertexNormals[2]), h.d.copy(e.vertexNormals[3]));
            }
            for (c = 0, d = this.faces.length; d > c; c++) e = this.faces[c], e.normal = e.__originalFaceNormal, 
            e.vertexNormals = e.__originalVertexNormals;
        },
        computeTangents: function() {
            function a(a, b, c, d, e, f, g) {
                j = a.vertices[b], k = a.vertices[c], l = a.vertices[d], m = i[e], n = i[f], o = i[g], 
                p = k.x - j.x, q = l.x - j.x, r = k.y - j.y, s = l.y - j.y, t = k.z - j.z, u = l.z - j.z, 
                w = n.x - m.x, x = o.x - m.x, y = n.y - m.y, z = o.y - m.y, A = 1 / (w * z - x * y), 
                G.set((z * p - y * q) * A, (z * r - y * s) * A, (z * t - y * u) * A), H.set((w * q - x * p) * A, (w * s - x * r) * A, (w * u - x * t) * A), 
                E[b].add(G), E[c].add(G), E[d].add(G), F[b].add(H), F[c].add(H), F[d].add(H);
            }
            var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, w, x, y, z, A, B, C, D, E = [], F = [], G = new v.Vector3(), H = new v.Vector3(), I = new v.Vector3(), J = new v.Vector3(), K = new v.Vector3();
            for (d = 0, e = this.vertices.length; e > d; d++) E[d] = new v.Vector3(), F[d] = new v.Vector3();
            for (b = 0, c = this.faces.length; c > b; b++) h = this.faces[b], i = this.faceVertexUvs[0][b], 
            h instanceof v.Face3 ? a(this, h.a, h.b, h.c, 0, 1, 2) : h instanceof v.Face4 && (a(this, h.a, h.b, h.d, 0, 1, 3), 
            a(this, h.b, h.c, h.d, 1, 2, 3));
            var L = [ "a", "b", "c", "d" ];
            for (b = 0, c = this.faces.length; c > b; b++) for (h = this.faces[b], f = 0; f < h.vertexNormals.length; f++) K.copy(h.vertexNormals[f]), 
            g = h[L[f]], B = E[g], I.copy(B), I.sub(K.multiplyScalar(K.dot(B))).normalize(), 
            J.crossVectors(h.vertexNormals[f], B), C = J.dot(F[g]), D = 0 > C ? -1 : 1, h.vertexTangents[f] = new v.Vector4(I.x, I.y, I.z, D);
            this.hasTangents = !0;
        },
        computeLineDistances: function() {
            for (var a = 0, b = this.vertices, c = 0, d = b.length; d > c; c++) c > 0 && (a += b[c].distanceTo(b[c - 1])), 
            this.lineDistances[c] = a;
        },
        computeBoundingBox: function() {
            null === this.boundingBox && (this.boundingBox = new v.Box3()), this.boundingBox.setFromPoints(this.vertices);
        },
        computeBoundingSphere: function() {
            null === this.boundingSphere && (this.boundingSphere = new v.Sphere()), this.boundingSphere.setFromCenterAndPoints(this.boundingSphere.center, this.vertices);
        },
        mergeVertices: function() {
            var a, b, c, d, e, f, g, h, i, j = {}, k = [], l = [], m = 4, n = Math.pow(10, m);
            for (this.__tmpVertices = void 0, c = 0, d = this.vertices.length; d > c; c++) a = this.vertices[c], 
            b = [ Math.round(a.x * n), Math.round(a.y * n), Math.round(a.z * n) ].join("_"), 
            void 0 === j[b] ? (j[b] = c, k.push(this.vertices[c]), l[c] = k.length - 1) : l[c] = l[j[b]];
            var o = [];
            for (c = 0, d = this.faces.length; d > c; c++) if (e = this.faces[c], e instanceof v.Face3) {
                e.a = l[e.a], e.b = l[e.b], e.c = l[e.c], f = [ e.a, e.b, e.c ];
                for (var p = -1, q = 0; 3 > q; q++) if (f[q] == f[(q + 1) % 3]) {
                    p = q, o.push(c);
                    break;
                }
            } else if (e instanceof v.Face4) {
                e.a = l[e.a], e.b = l[e.b], e.c = l[e.c], e.d = l[e.d], f = [ e.a, e.b, e.c, e.d ];
                for (var p = -1, q = 0; 4 > q; q++) f[q] == f[(q + 1) % 4] && (p >= 0 && o.push(c), 
                p = q);
                if (p >= 0) {
                    f.splice(p, 1);
                    var r = new v.Face3(f[0], f[1], f[2], e.normal, e.color, e.materialIndex);
                    for (g = 0, h = this.faceVertexUvs.length; h > g; g++) i = this.faceVertexUvs[g][c], 
                    i && i.splice(p, 1);
                    e.vertexNormals && e.vertexNormals.length > 0 && (r.vertexNormals = e.vertexNormals, 
                    r.vertexNormals.splice(p, 1)), e.vertexColors && e.vertexColors.length > 0 && (r.vertexColors = e.vertexColors, 
                    r.vertexColors.splice(p, 1)), this.faces[c] = r;
                }
            }
            for (c = o.length - 1; c >= 0; c--) for (this.faces.splice(c, 1), g = 0, h = this.faceVertexUvs.length; h > g; g++) this.faceVertexUvs[g].splice(c, 1);
            var s = this.vertices.length - k.length;
            return this.vertices = k, s;
        },
        clone: function() {
            for (var a = new v.Geometry(), b = this.vertices, c = 0, d = b.length; d > c; c++) a.vertices.push(b[c].clone());
            for (var e = this.faces, c = 0, d = e.length; d > c; c++) a.faces.push(e[c].clone());
            for (var f = this.faceVertexUvs[0], c = 0, d = f.length; d > c; c++) {
                for (var g = f[c], h = [], i = 0, j = g.length; j > i; i++) h.push(new v.Vector2(g[i].x, g[i].y));
                a.faceVertexUvs[0].push(h);
            }
            return a;
        },
        dispose: function() {
            this.dispatchEvent({
                type: "dispose"
            });
        }
    }, v.GeometryIdCount = 0, v.BufferGeometry = function() {
        this.id = v.GeometryIdCount++, this.attributes = {}, this.dynamic = !1, this.offsets = [], 
        this.boundingBox = null, this.boundingSphere = null, this.hasTangents = !1, this.morphTargets = [];
    }, v.BufferGeometry.prototype = {
        constructor: v.BufferGeometry,
        addEventListener: v.EventDispatcher.prototype.addEventListener,
        hasEventListener: v.EventDispatcher.prototype.hasEventListener,
        removeEventListener: v.EventDispatcher.prototype.removeEventListener,
        dispatchEvent: v.EventDispatcher.prototype.dispatchEvent,
        applyMatrix: function(a) {
            var b, c;
            if (this.attributes.position && (b = this.attributes.position.array), this.attributes.normal && (c = this.attributes.normal.array), 
            void 0 !== b && (a.multiplyVector3Array(b), this.verticesNeedUpdate = !0), void 0 !== c) {
                var d = new v.Matrix3().getNormalMatrix(a);
                d.multiplyVector3Array(c), this.normalizeNormals(), this.normalsNeedUpdate = !0;
            }
        },
        computeBoundingBox: function() {
            null === this.boundingBox && (this.boundingBox = new v.Box3());
            var a = this.attributes.position.array;
            if (a) {
                var b, c, d, e = this.boundingBox;
                a.length >= 3 && (e.min.x = e.max.x = a[0], e.min.y = e.max.y = a[1], e.min.z = e.max.z = a[2]);
                for (var f = 3, g = a.length; g > f; f += 3) b = a[f], c = a[f + 1], d = a[f + 2], 
                b < e.min.x ? e.min.x = b : b > e.max.x && (e.max.x = b), c < e.min.y ? e.min.y = c : c > e.max.y && (e.max.y = c), 
                d < e.min.z ? e.min.z = d : d > e.max.z && (e.max.z = d);
            }
            (void 0 === a || 0 === a.length) && (this.boundingBox.min.set(0, 0, 0), this.boundingBox.max.set(0, 0, 0));
        },
        computeBoundingSphere: function() {
            null === this.boundingSphere && (this.boundingSphere = new v.Sphere());
            var a = this.attributes.position.array;
            if (a) {
                for (var b, c, d, e, f = 0, g = 0, h = a.length; h > g; g += 3) c = a[g], d = a[g + 1], 
                e = a[g + 2], b = c * c + d * d + e * e, b > f && (f = b);
                this.boundingSphere.radius = Math.sqrt(f);
            }
        },
        computeVertexNormals: function() {
            if (this.attributes.position) {
                var a, b, c, d, e = this.attributes.position.array.length;
                if (void 0 === this.attributes.normal) this.attributes.normal = {
                    itemSize: 3,
                    array: new Float32Array(e),
                    numItems: e
                }; else for (a = 0, b = this.attributes.normal.array.length; b > a; a++) this.attributes.normal.array[a] = 0;
                var f, g, h, i, j, k, l = this.attributes.position.array, m = this.attributes.normal.array, n = new v.Vector3(), o = new v.Vector3(), p = new v.Vector3(), q = new v.Vector3(), r = new v.Vector3();
                if (this.attributes.index) {
                    var s = this.attributes.index.array, t = this.offsets;
                    for (c = 0, d = t.length; d > c; ++c) {
                        var u = t[c].start, w = t[c].count, x = t[c].index;
                        for (a = u, b = u + w; b > a; a += 3) f = x + s[a], g = x + s[a + 1], h = x + s[a + 2], 
                        i = l[3 * f], j = l[3 * f + 1], k = l[3 * f + 2], n.set(i, j, k), i = l[3 * g], 
                        j = l[3 * g + 1], k = l[3 * g + 2], o.set(i, j, k), i = l[3 * h], j = l[3 * h + 1], 
                        k = l[3 * h + 2], p.set(i, j, k), q.subVectors(p, o), r.subVectors(n, o), q.cross(r), 
                        m[3 * f] += q.x, m[3 * f + 1] += q.y, m[3 * f + 2] += q.z, m[3 * g] += q.x, m[3 * g + 1] += q.y, 
                        m[3 * g + 2] += q.z, m[3 * h] += q.x, m[3 * h + 1] += q.y, m[3 * h + 2] += q.z;
                    }
                } else for (a = 0, b = l.length; b > a; a += 9) i = l[a], j = l[a + 1], k = l[a + 2], 
                n.set(i, j, k), i = l[a + 3], j = l[a + 4], k = l[a + 5], o.set(i, j, k), i = l[a + 6], 
                j = l[a + 7], k = l[a + 8], p.set(i, j, k), q.subVectors(p, o), r.subVectors(n, o), 
                q.cross(r), m[a] = q.x, m[a + 1] = q.y, m[a + 2] = q.z, m[a + 3] = q.x, m[a + 4] = q.y, 
                m[a + 5] = q.z, m[a + 6] = q.x, m[a + 7] = q.y, m[a + 8] = q.z;
                this.normalizeNormals(), this.normalsNeedUpdate = !0;
            }
        },
        normalizeNormals: function() {
            for (var a, b, c, d, e = this.attributes.normal.array, f = 0, g = e.length; g > f; f += 3) a = e[f], 
            b = e[f + 1], c = e[f + 2], d = 1 / Math.sqrt(a * a + b * b + c * c), e[f] *= d, 
            e[f + 1] *= d, e[f + 2] *= d;
        },
        computeTangents: function() {
            function a(a, b, c) {
                m = d[3 * a], n = d[3 * a + 1], o = d[3 * a + 2], p = d[3 * b], q = d[3 * b + 1], 
                r = d[3 * b + 2], s = d[3 * c], t = d[3 * c + 1], u = d[3 * c + 2], w = f[2 * a], 
                x = f[2 * a + 1], y = f[2 * b], z = f[2 * b + 1], A = f[2 * c], B = f[2 * c + 1], 
                C = p - m, D = s - m, E = q - n, F = t - n, G = r - o, H = u - o, I = y - w, J = A - w, 
                K = z - x, L = B - x, M = 1 / (I * L - J * K), U.set((L * C - K * D) * M, (L * E - K * F) * M, (L * G - K * H) * M), 
                V.set((I * D - J * C) * M, (I * F - J * E) * M, (I * H - J * G) * M), j[a].add(U), 
                j[b].add(U), j[c].add(U), k[a].add(V), k[b].add(V), k[c].add(V);
            }
            function b(a) {
                db.x = e[3 * a], db.y = e[3 * a + 1], db.z = e[3 * a + 2], eb.copy(db), _ = j[a], 
                bb.copy(_), bb.sub(db.multiplyScalar(db.dot(_))).normalize(), cb.crossVectors(eb, _), 
                ab = cb.dot(k[a]), $ = 0 > ab ? -1 : 1, i[4 * a] = bb.x, i[4 * a + 1] = bb.y, i[4 * a + 2] = bb.z, 
                i[4 * a + 3] = $;
            }
            if (void 0 === this.attributes.index || void 0 === this.attributes.position || void 0 === this.attributes.normal || void 0 === this.attributes.uv) return console.warn("Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()"), 
            void 0;
            var c = this.attributes.index.array, d = this.attributes.position.array, e = this.attributes.normal.array, f = this.attributes.uv.array, g = d.length / 3;
            if (void 0 === this.attributes.tangent) {
                var h = 4 * g;
                this.attributes.tangent = {
                    itemSize: 4,
                    array: new Float32Array(h),
                    numItems: h
                };
            }
            for (var i = this.attributes.tangent.array, j = [], k = [], l = 0; g > l; l++) j[l] = new v.Vector3(), 
            k[l] = new v.Vector3();
            var m, n, o, p, q, r, s, t, u, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U = new v.Vector3(), V = new v.Vector3(), W = this.offsets;
            for (P = 0, Q = W.length; Q > P; ++P) {
                var X = W[P].start, Y = W[P].count, Z = W[P].index;
                for (N = X, O = X + Y; O > N; N += 3) R = Z + c[N], S = Z + c[N + 1], T = Z + c[N + 2], 
                a(R, S, T);
            }
            var $, _, ab, bb = new v.Vector3(), cb = new v.Vector3(), db = new v.Vector3(), eb = new v.Vector3();
            for (P = 0, Q = W.length; Q > P; ++P) {
                var X = W[P].start, Y = W[P].count, Z = W[P].index;
                for (N = X, O = X + Y; O > N; N += 3) R = Z + c[N], S = Z + c[N + 1], T = Z + c[N + 2], 
                b(R), b(S), b(T);
            }
            this.hasTangents = !0, this.tangentsNeedUpdate = !0;
        },
        dispose: function() {
            this.dispatchEvent({
                type: "dispose"
            });
        }
    }, v.Camera = function() {
        v.Object3D.call(this), this.matrixWorldInverse = new v.Matrix4(), this.projectionMatrix = new v.Matrix4(), 
        this.projectionMatrixInverse = new v.Matrix4();
    }, v.Camera.prototype = Object.create(v.Object3D.prototype), v.Camera.prototype.lookAt = function() {
        var a = new v.Matrix4();
        return function(b) {
            a.lookAt(this.position, b, this.up), this.useQuaternion === !0 ? this.quaternion.setFromRotationMatrix(a) : this.rotation.setEulerFromRotationMatrix(a, this.eulerOrder);
        };
    }(), v.OrthographicCamera = function(a, b, c, d, e, f) {
        v.Camera.call(this), this.left = a, this.right = b, this.top = c, this.bottom = d, 
        this.near = void 0 !== e ? e : .1, this.far = void 0 !== f ? f : 2e3, this.updateProjectionMatrix();
    }, v.OrthographicCamera.prototype = Object.create(v.Camera.prototype), v.OrthographicCamera.prototype.updateProjectionMatrix = function() {
        this.projectionMatrix.makeOrthographic(this.left, this.right, this.top, this.bottom, this.near, this.far);
    }, v.PerspectiveCamera = function(a, b, c, d) {
        v.Camera.call(this), this.fov = void 0 !== a ? a : 50, this.aspect = void 0 !== b ? b : 1, 
        this.near = void 0 !== c ? c : .1, this.far = void 0 !== d ? d : 2e3, this.updateProjectionMatrix();
    }, v.PerspectiveCamera.prototype = Object.create(v.Camera.prototype), v.PerspectiveCamera.prototype.setLens = function(a, b) {
        void 0 === b && (b = 24), this.fov = 2 * v.Math.radToDeg(Math.atan(b / (2 * a))), 
        this.updateProjectionMatrix();
    }, v.PerspectiveCamera.prototype.setViewOffset = function(a, b, c, d, e, f) {
        this.fullWidth = a, this.fullHeight = b, this.x = c, this.y = d, this.width = e, 
        this.height = f, this.updateProjectionMatrix();
    }, v.PerspectiveCamera.prototype.updateProjectionMatrix = function() {
        if (this.fullWidth) {
            var a = this.fullWidth / this.fullHeight, b = Math.tan(v.Math.degToRad(.5 * this.fov)) * this.near, c = -b, d = a * c, e = a * b, f = Math.abs(e - d), g = Math.abs(b - c);
            this.projectionMatrix.makeFrustum(d + this.x * f / this.fullWidth, d + (this.x + this.width) * f / this.fullWidth, b - (this.y + this.height) * g / this.fullHeight, b - this.y * g / this.fullHeight, this.near, this.far);
        } else this.projectionMatrix.makePerspective(this.fov, this.aspect, this.near, this.far);
    }, v.Light = function(a) {
        v.Object3D.call(this), this.color = new v.Color(a);
    }, v.Light.prototype = Object.create(v.Object3D.prototype), v.Light.prototype.clone = function(a) {
        return void 0 === a && (a = new v.Light()), v.Object3D.prototype.clone.call(this, a), 
        a.color.copy(this.color), a;
    }, v.AmbientLight = function(a) {
        v.Light.call(this, a);
    }, v.AmbientLight.prototype = Object.create(v.Light.prototype), v.AmbientLight.prototype.clone = function() {
        var a = new v.AmbientLight();
        return v.Light.prototype.clone.call(this, a), a;
    }, v.AreaLight = function(a, b) {
        v.Light.call(this, a), this.normal = new v.Vector3(0, -1, 0), this.right = new v.Vector3(1, 0, 0), 
        this.intensity = void 0 !== b ? b : 1, this.width = 1, this.height = 1, this.constantAttenuation = 1.5, 
        this.linearAttenuation = .5, this.quadraticAttenuation = .1;
    }, v.AreaLight.prototype = Object.create(v.Light.prototype), v.DirectionalLight = function(a, b) {
        v.Light.call(this, a), this.position.set(0, 1, 0), this.target = new v.Object3D(), 
        this.intensity = void 0 !== b ? b : 1, this.castShadow = !1, this.onlyShadow = !1, 
        this.shadowCameraNear = 50, this.shadowCameraFar = 5e3, this.shadowCameraLeft = -500, 
        this.shadowCameraRight = 500, this.shadowCameraTop = 500, this.shadowCameraBottom = -500, 
        this.shadowCameraVisible = !1, this.shadowBias = 0, this.shadowDarkness = .5, this.shadowMapWidth = 512, 
        this.shadowMapHeight = 512, this.shadowCascade = !1, this.shadowCascadeOffset = new v.Vector3(0, 0, -1e3), 
        this.shadowCascadeCount = 2, this.shadowCascadeBias = [ 0, 0, 0 ], this.shadowCascadeWidth = [ 512, 512, 512 ], 
        this.shadowCascadeHeight = [ 512, 512, 512 ], this.shadowCascadeNearZ = [ -1, .99, .998 ], 
        this.shadowCascadeFarZ = [ .99, .998, 1 ], this.shadowCascadeArray = [], this.shadowMap = null, 
        this.shadowMapSize = null, this.shadowCamera = null, this.shadowMatrix = null;
    }, v.DirectionalLight.prototype = Object.create(v.Light.prototype), v.DirectionalLight.prototype.clone = function() {
        var a = new v.DirectionalLight();
        return v.Light.prototype.clone.call(this, a), a.target = this.target.clone(), a.intensity = this.intensity, 
        a.castShadow = this.castShadow, a.onlyShadow = this.onlyShadow, a;
    }, v.HemisphereLight = function(a, b, c) {
        v.Light.call(this, a), this.position.set(0, 100, 0), this.groundColor = new v.Color(b), 
        this.intensity = void 0 !== c ? c : 1;
    }, v.HemisphereLight.prototype = Object.create(v.Light.prototype), v.HemisphereLight.prototype.clone = function() {
        var a = new v.PointLight();
        return v.Light.prototype.clone.call(this, a), a.groundColor.copy(this.groundColor), 
        a.intensity = this.intensity, a;
    }, v.PointLight = function(a, b, c) {
        v.Light.call(this, a), this.intensity = void 0 !== b ? b : 1, this.distance = void 0 !== c ? c : 0;
    }, v.PointLight.prototype = Object.create(v.Light.prototype), v.PointLight.prototype.clone = function() {
        var a = new v.PointLight();
        return v.Light.prototype.clone.call(this, a), a.intensity = this.intensity, a.distance = this.distance, 
        a;
    }, v.SpotLight = function(a, b, c, d, e) {
        v.Light.call(this, a), this.position.set(0, 1, 0), this.target = new v.Object3D(), 
        this.intensity = void 0 !== b ? b : 1, this.distance = void 0 !== c ? c : 0, this.angle = void 0 !== d ? d : Math.PI / 3, 
        this.exponent = void 0 !== e ? e : 10, this.castShadow = !1, this.onlyShadow = !1, 
        this.shadowCameraNear = 50, this.shadowCameraFar = 5e3, this.shadowCameraFov = 50, 
        this.shadowCameraVisible = !1, this.shadowBias = 0, this.shadowDarkness = .5, this.shadowMapWidth = 512, 
        this.shadowMapHeight = 512, this.shadowMap = null, this.shadowMapSize = null, this.shadowCamera = null, 
        this.shadowMatrix = null;
    }, v.SpotLight.prototype = Object.create(v.Light.prototype), v.SpotLight.prototype.clone = function() {
        var a = new v.SpotLight();
        return v.Light.prototype.clone.call(this, a), a.target = this.target.clone(), a.intensity = this.intensity, 
        a.distance = this.distance, a.angle = this.angle, a.exponent = this.exponent, a.castShadow = this.castShadow, 
        a.onlyShadow = this.onlyShadow, a;
    }, v.Loader = function(a) {
        this.showStatus = a, this.statusDomElement = a ? v.Loader.prototype.addStatusElement() : null, 
        this.onLoadStart = function() {}, this.onLoadProgress = function() {}, this.onLoadComplete = function() {};
    }, v.Loader.prototype = {
        constructor: v.Loader,
        crossOrigin: "anonymous",
        addStatusElement: function() {
            var a = document.createElement("div");
            return a.style.position = "absolute", a.style.right = "0px", a.style.top = "0px", 
            a.style.fontSize = "0.8em", a.style.textAlign = "left", a.style.background = "rgba(0,0,0,0.25)", 
            a.style.color = "#fff", a.style.width = "120px", a.style.padding = "0.5em 0.5em 0.5em 0.5em", 
            a.style.zIndex = 1e3, a.innerHTML = "Loading ...", a;
        },
        updateProgress: function(a) {
            var b = "Loaded ";
            b += a.total ? (100 * a.loaded / a.total).toFixed(0) + "%" : (a.loaded / 1e3).toFixed(2) + " KB", 
            this.statusDomElement.innerHTML = b;
        },
        extractUrlBase: function(a) {
            var b = a.split("/");
            return b.pop(), (b.length < 1 ? "." : b.join("/")) + "/";
        },
        initMaterials: function(a, b) {
            for (var c = [], d = 0; d < a.length; ++d) c[d] = v.Loader.prototype.createMaterial(a[d], b);
            return c;
        },
        needsTangents: function(a) {
            for (var b = 0, c = a.length; c > b; b++) {
                var d = a[b];
                if (d instanceof v.ShaderMaterial) return !0;
            }
            return !1;
        },
        createMaterial: function(a, b) {
            function c(a) {
                var b = Math.log(a) / Math.LN2;
                return Math.floor(b) == b;
            }
            function d(a) {
                var b = Math.log(a) / Math.LN2;
                return Math.pow(2, Math.round(b));
            }
            function e(a, b) {
                var e = new Image();
                e.onload = function() {
                    if (c(this.width) && c(this.height)) a.image = this; else {
                        var b = d(this.width), e = d(this.height);
                        a.image.width = b, a.image.height = e, a.image.getContext("2d").drawImage(this, 0, 0, b, e);
                    }
                    a.needsUpdate = !0;
                }, e.crossOrigin = h.crossOrigin, e.src = b;
            }
            function f(a, c, d, f, g, h, i) {
                var j = /\.dds$/i.test(d), k = b + "/" + d;
                if (j) {
                    var l = v.ImageUtils.loadCompressedTexture(k);
                    a[c] = l;
                } else {
                    var l = document.createElement("canvas");
                    a[c] = new v.Texture(l);
                }
                if (a[c].sourceFile = d, f && (a[c].repeat.set(f[0], f[1]), 1 !== f[0] && (a[c].wrapS = v.RepeatWrapping), 
                1 !== f[1] && (a[c].wrapT = v.RepeatWrapping)), g && a[c].offset.set(g[0], g[1]), 
                h) {
                    var m = {
                        repeat: v.RepeatWrapping,
                        mirror: v.MirroredRepeatWrapping
                    };
                    void 0 !== m[h[0]] && (a[c].wrapS = m[h[0]]), void 0 !== m[h[1]] && (a[c].wrapT = m[h[1]]);
                }
                i && (a[c].anisotropy = i), j || e(a[c], k);
            }
            function g(a) {
                return (255 * a[0] << 16) + (255 * a[1] << 8) + 255 * a[2];
            }
            var h = this, i = "MeshLambertMaterial", j = {
                color: 15658734,
                opacity: 1,
                map: null,
                lightMap: null,
                normalMap: null,
                bumpMap: null,
                wireframe: !1
            };
            if (a.shading) {
                var k = a.shading.toLowerCase();
                "phong" === k ? i = "MeshPhongMaterial" : "basic" === k && (i = "MeshBasicMaterial");
            }
            if (void 0 !== a.blending && void 0 !== v[a.blending] && (j.blending = v[a.blending]), 
            (void 0 !== a.transparent || a.opacity < 1) && (j.transparent = a.transparent), 
            void 0 !== a.depthTest && (j.depthTest = a.depthTest), void 0 !== a.depthWrite && (j.depthWrite = a.depthWrite), 
            void 0 !== a.visible && (j.visible = a.visible), void 0 !== a.flipSided && (j.side = v.BackSide), 
            void 0 !== a.doubleSided && (j.side = v.DoubleSide), void 0 !== a.wireframe && (j.wireframe = a.wireframe), 
            void 0 !== a.vertexColors && ("face" === a.vertexColors ? j.vertexColors = v.FaceColors : a.vertexColors && (j.vertexColors = v.VertexColors)), 
            a.colorDiffuse ? j.color = g(a.colorDiffuse) : a.DbgColor && (j.color = a.DbgColor), 
            a.colorSpecular && (j.specular = g(a.colorSpecular)), a.colorAmbient && (j.ambient = g(a.colorAmbient)), 
            a.transparency && (j.opacity = a.transparency), a.specularCoef && (j.shininess = a.specularCoef), 
            a.mapDiffuse && b && f(j, "map", a.mapDiffuse, a.mapDiffuseRepeat, a.mapDiffuseOffset, a.mapDiffuseWrap, a.mapDiffuseAnisotropy), 
            a.mapLight && b && f(j, "lightMap", a.mapLight, a.mapLightRepeat, a.mapLightOffset, a.mapLightWrap, a.mapLightAnisotropy), 
            a.mapBump && b && f(j, "bumpMap", a.mapBump, a.mapBumpRepeat, a.mapBumpOffset, a.mapBumpWrap, a.mapBumpAnisotropy), 
            a.mapNormal && b && f(j, "normalMap", a.mapNormal, a.mapNormalRepeat, a.mapNormalOffset, a.mapNormalWrap, a.mapNormalAnisotropy), 
            a.mapSpecular && b && f(j, "specularMap", a.mapSpecular, a.mapSpecularRepeat, a.mapSpecularOffset, a.mapSpecularWrap, a.mapSpecularAnisotropy), 
            a.mapBumpScale && (j.bumpScale = a.mapBumpScale), a.mapNormal) {
                var l = v.ShaderLib.normalmap, m = v.UniformsUtils.clone(l.uniforms);
                m.tNormal.value = j.normalMap, a.mapNormalFactor && m.uNormalScale.value.set(a.mapNormalFactor, a.mapNormalFactor), 
                j.map && (m.tDiffuse.value = j.map, m.enableDiffuse.value = !0), j.specularMap && (m.tSpecular.value = j.specularMap, 
                m.enableSpecular.value = !0), j.lightMap && (m.tAO.value = j.lightMap, m.enableAO.value = !0), 
                m.uDiffuseColor.value.setHex(j.color), m.uSpecularColor.value.setHex(j.specular), 
                m.uAmbientColor.value.setHex(j.ambient), m.uShininess.value = j.shininess, void 0 !== j.opacity && (m.uOpacity.value = j.opacity);
                var n = {
                    fragmentShader: l.fragmentShader,
                    vertexShader: l.vertexShader,
                    uniforms: m,
                    lights: !0,
                    fog: !0
                }, o = new v.ShaderMaterial(n);
                j.transparent && (o.transparent = !0);
            } else var o = new v[i](j);
            return void 0 !== a.DbgName && (o.name = a.DbgName), o;
        }
    }, v.ImageLoader = function() {
        this.crossOrigin = null;
    }, v.ImageLoader.prototype = {
        constructor: v.ImageLoader,
        addEventListener: v.EventDispatcher.prototype.addEventListener,
        hasEventListener: v.EventDispatcher.prototype.hasEventListener,
        removeEventListener: v.EventDispatcher.prototype.removeEventListener,
        dispatchEvent: v.EventDispatcher.prototype.dispatchEvent,
        load: function(a, b) {
            var c = this;
            void 0 === b && (b = new Image()), b.addEventListener("load", function() {
                c.dispatchEvent({
                    type: "load",
                    content: b
                });
            }, !1), b.addEventListener("error", function() {
                c.dispatchEvent({
                    type: "error",
                    message: "Couldn't load URL [" + a + "]"
                });
            }, !1), c.crossOrigin && (b.crossOrigin = c.crossOrigin), b.src = a;
        }
    }, v.JSONLoader = function(a) {
        v.Loader.call(this, a), this.withCredentials = !1;
    }, v.JSONLoader.prototype = Object.create(v.Loader.prototype), v.JSONLoader.prototype.load = function(a, b, c) {
        c = c && "string" == typeof c ? c : this.extractUrlBase(a), this.onLoadStart(), 
        this.loadAjaxJSON(this, a, b, c);
    }, v.JSONLoader.prototype.loadAjaxJSON = function(a, b, c, d, e) {
        var f = new XMLHttpRequest(), g = 0;
        f.onreadystatechange = function() {
            if (f.readyState === f.DONE) if (200 === f.status || 0 === f.status) {
                if (f.responseText) {
                    var h = JSON.parse(f.responseText), i = a.parse(h, d);
                    c(i.geometry, i.materials);
                } else console.warn("THREE.JSONLoader: [" + b + "] seems to be unreachable or file there is empty");
                a.onLoadComplete();
            } else console.error("THREE.JSONLoader: Couldn't load [" + b + "] [" + f.status + "]"); else f.readyState === f.LOADING ? e && (0 === g && (g = f.getResponseHeader("Content-Length")), 
            e({
                total: g,
                loaded: f.responseText.length
            })) : f.readyState === f.HEADERS_RECEIVED && void 0 !== e && (g = f.getResponseHeader("Content-Length"));
        }, f.open("GET", b, !0), f.withCredentials = this.withCredentials, f.send(null);
    }, v.JSONLoader.prototype.parse = function(a, b) {
        function c(b) {
            function c(a, b) {
                return a & 1 << b;
            }
            var d, e, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, w, x, y, z, A, B, C, D, E, F, G = a.faces, H = a.vertices, I = a.normals, J = a.colors, K = 0;
            for (d = 0; d < a.uvs.length; d++) a.uvs[d].length && K++;
            for (d = 0; K > d; d++) f.faceUvs[d] = [], f.faceVertexUvs[d] = [];
            for (h = 0, i = H.length; i > h; ) y = new v.Vector3(), y.x = H[h++] * b, y.y = H[h++] * b, 
            y.z = H[h++] * b, f.vertices.push(y);
            for (h = 0, i = G.length; i > h; ) {
                if (o = G[h++], p = c(o, 0), q = c(o, 1), r = c(o, 2), s = c(o, 3), t = c(o, 4), 
                u = c(o, 5), w = c(o, 6), x = c(o, 7), p ? (z = new v.Face4(), z.a = G[h++], z.b = G[h++], 
                z.c = G[h++], z.d = G[h++], j = 4) : (z = new v.Face3(), z.a = G[h++], z.b = G[h++], 
                z.c = G[h++], j = 3), q && (n = G[h++], z.materialIndex = n), g = f.faces.length, 
                r) for (d = 0; K > d; d++) C = a.uvs[d], m = G[h++], E = C[2 * m], F = C[2 * m + 1], 
                f.faceUvs[d][g] = new v.Vector2(E, F);
                if (s) for (d = 0; K > d; d++) {
                    for (C = a.uvs[d], D = [], e = 0; j > e; e++) m = G[h++], E = C[2 * m], F = C[2 * m + 1], 
                    D[e] = new v.Vector2(E, F);
                    f.faceVertexUvs[d][g] = D;
                }
                if (t && (l = 3 * G[h++], B = new v.Vector3(), B.x = I[l++], B.y = I[l++], B.z = I[l], 
                z.normal = B), u) for (d = 0; j > d; d++) l = 3 * G[h++], B = new v.Vector3(), B.x = I[l++], 
                B.y = I[l++], B.z = I[l], z.vertexNormals.push(B);
                if (w && (k = G[h++], A = new v.Color(J[k]), z.color = A), x) for (d = 0; j > d; d++) k = G[h++], 
                A = new v.Color(J[k]), z.vertexColors.push(A);
                f.faces.push(z);
            }
        }
        function d() {
            var b, c, d, e, g, h, i, j, k, l;
            if (a.skinWeights) for (b = 0, c = a.skinWeights.length; c > b; b += 2) d = a.skinWeights[b], 
            e = a.skinWeights[b + 1], g = 0, h = 0, f.skinWeights.push(new v.Vector4(d, e, g, h));
            if (a.skinIndices) for (b = 0, c = a.skinIndices.length; c > b; b += 2) i = a.skinIndices[b], 
            j = a.skinIndices[b + 1], k = 0, l = 0, f.skinIndices.push(new v.Vector4(i, j, k, l));
            f.bones = a.bones, f.animation = a.animation;
        }
        function e(b) {
            if (void 0 !== a.morphTargets) {
                var c, d, e, g, h, i;
                for (c = 0, d = a.morphTargets.length; d > c; c++) for (f.morphTargets[c] = {}, 
                f.morphTargets[c].name = a.morphTargets[c].name, f.morphTargets[c].vertices = [], 
                h = f.morphTargets[c].vertices, i = a.morphTargets[c].vertices, e = 0, g = i.length; g > e; e += 3) {
                    var j = new v.Vector3();
                    j.x = i[e] * b, j.y = i[e + 1] * b, j.z = i[e + 2] * b, h.push(j);
                }
            }
            if (void 0 !== a.morphColors) {
                var c, d, k, l, m, n, o;
                for (c = 0, d = a.morphColors.length; d > c; c++) for (f.morphColors[c] = {}, f.morphColors[c].name = a.morphColors[c].name, 
                f.morphColors[c].colors = [], m = f.morphColors[c].colors, n = a.morphColors[c].colors, 
                k = 0, l = n.length; l > k; k += 3) o = new v.Color(16755200), o.setRGB(n[k], n[k + 1], n[k + 2]), 
                m.push(o);
            }
        }
        var f = new v.Geometry(), g = void 0 !== a.scale ? 1 / a.scale : 1;
        if (c(g), d(), e(g), f.computeCentroids(), f.computeFaceNormals(), void 0 === a.materials) return {
            geometry: f
        };
        var h = this.initMaterials(a.materials, b);
        return this.needsTangents(h) && f.computeTangents(), {
            geometry: f,
            materials: h
        };
    }, v.LoadingMonitor = function() {
        var a = this, b = 0, c = 0, d = function() {
            b++, a.dispatchEvent({
                type: "progress",
                loaded: b,
                total: c
            }), b === c && a.dispatchEvent({
                type: "load"
            });
        };
        this.add = function(a) {
            c++, a.addEventListener("load", d, !1);
        };
    }, v.LoadingMonitor.prototype = {
        constructor: v.LoadingMonitor,
        addEventListener: v.EventDispatcher.prototype.addEventListener,
        hasEventListener: v.EventDispatcher.prototype.hasEventListener,
        removeEventListener: v.EventDispatcher.prototype.removeEventListener,
        dispatchEvent: v.EventDispatcher.prototype.dispatchEvent
    }, v.GeometryLoader = function() {}, v.GeometryLoader.prototype = {
        constructor: v.GeometryLoader,
        addEventListener: v.EventDispatcher.prototype.addEventListener,
        hasEventListener: v.EventDispatcher.prototype.hasEventListener,
        removeEventListener: v.EventDispatcher.prototype.removeEventListener,
        dispatchEvent: v.EventDispatcher.prototype.dispatchEvent,
        load: function(a) {
            var b = this, c = new XMLHttpRequest();
            c.addEventListener("load", function(a) {
                var c = b.parse(JSON.parse(a.target.responseText));
                b.dispatchEvent({
                    type: "load",
                    content: c
                });
            }, !1), c.addEventListener("progress", function(a) {
                b.dispatchEvent({
                    type: "progress",
                    loaded: a.loaded,
                    total: a.total
                });
            }, !1), c.addEventListener("error", function() {
                b.dispatchEvent({
                    type: "error",
                    message: "Couldn't load URL [" + a + "]"
                });
            }, !1), c.open("GET", a, !0), c.send(null);
        },
        parse: function() {}
    }, v.MaterialLoader = function() {}, v.MaterialLoader.prototype = {
        constructor: v.MaterialLoader,
        addEventListener: v.EventDispatcher.prototype.addEventListener,
        hasEventListener: v.EventDispatcher.prototype.hasEventListener,
        removeEventListener: v.EventDispatcher.prototype.removeEventListener,
        dispatchEvent: v.EventDispatcher.prototype.dispatchEvent,
        load: function(a) {
            var b = this, c = new XMLHttpRequest();
            c.addEventListener("load", function(a) {
                var c = b.parse(JSON.parse(a.target.responseText));
                b.dispatchEvent({
                    type: "load",
                    content: c
                });
            }, !1), c.addEventListener("progress", function(a) {
                b.dispatchEvent({
                    type: "progress",
                    loaded: a.loaded,
                    total: a.total
                });
            }, !1), c.addEventListener("error", function() {
                b.dispatchEvent({
                    type: "error",
                    message: "Couldn't load URL [" + a + "]"
                });
            }, !1), c.open("GET", a, !0), c.send(null);
        },
        parse: function(a) {
            var b;
            switch (a.type) {
              case "MeshBasicMaterial":
                b = new v.MeshBasicMaterial({
                    color: a.color,
                    opacity: a.opacity,
                    transparent: a.transparent,
                    wireframe: a.wireframe
                });
                break;

              case "MeshLambertMaterial":
                b = new v.MeshLambertMaterial({
                    color: a.color,
                    ambient: a.ambient,
                    emissive: a.emissive,
                    opacity: a.opacity,
                    transparent: a.transparent,
                    wireframe: a.wireframe
                });
                break;

              case "MeshPhongMaterial":
                b = new v.MeshPhongMaterial({
                    color: a.color,
                    ambient: a.ambient,
                    emissive: a.emissive,
                    specular: a.specular,
                    shininess: a.shininess,
                    opacity: a.opacity,
                    transparent: a.transparent,
                    wireframe: a.wireframe
                });
                break;

              case "MeshNormalMaterial":
                b = new v.MeshNormalMaterial({
                    opacity: a.opacity,
                    transparent: a.transparent,
                    wireframe: a.wireframe
                });
                break;

              case "MeshDepthMaterial":
                b = new v.MeshDepthMaterial({
                    opacity: a.opacity,
                    transparent: a.transparent,
                    wireframe: a.wireframe
                });
            }
            return b;
        }
    }, v.SceneLoader = function() {
        this.onLoadStart = function() {}, this.onLoadProgress = function() {}, this.onLoadComplete = function() {}, 
        this.callbackSync = function() {}, this.callbackProgress = function() {}, this.geometryHandlerMap = {}, 
        this.hierarchyHandlerMap = {}, this.addGeometryHandler("ascii", v.JSONLoader);
    }, v.SceneLoader.prototype.constructor = v.SceneLoader, v.SceneLoader.prototype.load = function(a, b) {
        var c = this, d = new XMLHttpRequest();
        d.onreadystatechange = function() {
            if (4 === d.readyState) if (200 === d.status || 0 === d.status) {
                var e = JSON.parse(d.responseText);
                c.parse(e, b, a);
            } else console.error("THREE.SceneLoader: Couldn't load [" + a + "] [" + d.status + "]");
        }, d.open("GET", a, !0), d.send(null);
    }, v.SceneLoader.prototype.addGeometryHandler = function(a, b) {
        this.geometryHandlerMap[a] = {
            loaderClass: b
        };
    }, v.SceneLoader.prototype.addHierarchyHandler = function(a, b) {
        this.hierarchyHandlerMap[a] = {
            loaderClass: b
        };
    }, v.SceneLoader.prototype.parse = function(a, b, c) {
        function d(a, b) {
            return "relativeToHTML" == b ? a : D + "/" + a;
        }
        function e() {
            f(B.scene, F.objects);
        }
        function f(a, b) {
            var c, e, g, h, i, k;
            for (var l in b) if (void 0 === B.objects[l]) {
                var m = b[l], q = null;
                if (m.type && m.type in C.hierarchyHandlerMap) {
                    if (void 0 === m.loading) {
                        var r = {
                            type: 1,
                            url: 1,
                            material: 1,
                            position: 1,
                            rotation: 1,
                            scale: 1,
                            visible: 1,
                            children: 1,
                            userData: 1,
                            skin: 1,
                            morph: 1,
                            mirroredLoop: 1,
                            duration: 1
                        }, s = {};
                        for (var x in m) x in r || (s[x] = m[x]);
                        o = B.materials[m.material], m.loading = !0;
                        var y = C.hierarchyHandlerMap[m.type].loaderObject;
                        y.options ? y.load(d(m.url, F.urlBaseType), j(l, a, o, m)) : y.load(d(m.url, F.urlBaseType), j(l, a, o, m), s);
                    }
                } else if (void 0 !== m.geometry) {
                    if (n = B.geometries[m.geometry]) {
                        var z = !1;
                        if (o = B.materials[m.material], z = o instanceof v.ShaderMaterial, g = m.position, 
                        h = m.rotation, i = m.scale, c = m.matrix, k = m.quaternion, m.material || (o = new v.MeshFaceMaterial(B.face_materials[m.geometry])), 
                        o instanceof v.MeshFaceMaterial && 0 === o.materials.length && (o = new v.MeshFaceMaterial(B.face_materials[m.geometry])), 
                        o instanceof v.MeshFaceMaterial) for (var A = 0; A < o.materials.length; A++) z = z || o.materials[A] instanceof v.ShaderMaterial;
                        z && n.computeTangents(), m.skin ? q = new v.SkinnedMesh(n, o) : m.morph ? (q = new v.MorphAnimMesh(n, o), 
                        void 0 !== m.duration && (q.duration = m.duration), void 0 !== m.time && (q.time = m.time), 
                        void 0 !== m.mirroredLoop && (q.mirroredLoop = m.mirroredLoop), o.morphNormals && n.computeMorphNormals()) : q = new v.Mesh(n, o), 
                        q.name = l, c ? (q.matrixAutoUpdate = !1, q.matrix.set(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7], c[8], c[9], c[10], c[11], c[12], c[13], c[14], c[15])) : (q.position.set(g[0], g[1], g[2]), 
                        k ? (q.quaternion.set(k[0], k[1], k[2], k[3]), q.useQuaternion = !0) : q.rotation.set(h[0], h[1], h[2]), 
                        q.scale.set(i[0], i[1], i[2])), q.visible = m.visible, q.castShadow = m.castShadow, 
                        q.receiveShadow = m.receiveShadow, a.add(q), B.objects[l] = q;
                    }
                } else "DirectionalLight" === m.type || "PointLight" === m.type || "AmbientLight" === m.type ? (u = void 0 !== m.color ? m.color : 16777215, 
                w = void 0 !== m.intensity ? m.intensity : 1, "DirectionalLight" === m.type ? (g = m.direction, 
                t = new v.DirectionalLight(u, w), t.position.set(g[0], g[1], g[2]), m.target && (E.push({
                    object: t,
                    targetName: m.target
                }), t.target = null)) : "PointLight" === m.type ? (g = m.position, e = m.distance, 
                t = new v.PointLight(u, w, e), t.position.set(g[0], g[1], g[2])) : "AmbientLight" === m.type && (t = new v.AmbientLight(u)), 
                a.add(t), t.name = l, B.lights[l] = t, B.objects[l] = t) : "PerspectiveCamera" === m.type || "OrthographicCamera" === m.type ? (g = m.position, 
                h = m.rotation, k = m.quaternion, "PerspectiveCamera" === m.type ? p = new v.PerspectiveCamera(m.fov, m.aspect, m.near, m.far) : "OrthographicCamera" === m.type && (p = new v.OrthographicCamera(m.left, m.right, m.top, m.bottom, m.near, m.far)), 
                p.name = l, p.position.set(g[0], g[1], g[2]), void 0 !== k ? (p.quaternion.set(k[0], k[1], k[2], k[3]), 
                p.useQuaternion = !0) : void 0 !== h && p.rotation.set(h[0], h[1], h[2]), a.add(p), 
                B.cameras[l] = p, B.objects[l] = p) : (g = m.position, h = m.rotation, i = m.scale, 
                k = m.quaternion, q = new v.Object3D(), q.name = l, q.position.set(g[0], g[1], g[2]), 
                k ? (q.quaternion.set(k[0], k[1], k[2], k[3]), q.useQuaternion = !0) : q.rotation.set(h[0], h[1], h[2]), 
                q.scale.set(i[0], i[1], i[2]), q.visible = void 0 !== m.visible ? m.visible : !1, 
                a.add(q), B.objects[l] = q, B.empties[l] = q);
                if (q) {
                    if (void 0 !== m.userData) for (var D in m.userData) {
                        var G = m.userData[D];
                        q.userData[D] = G;
                    }
                    if (void 0 !== m.groups) for (var A = 0; A < m.groups.length; A++) {
                        var H = m.groups[A];
                        void 0 === B.groups[H] && (B.groups[H] = []), B.groups[H].push(l);
                    }
                    void 0 !== m.children && f(q, m.children);
                }
            }
        }
        function g(a, b, c) {
            B.geometries[c] = a, B.face_materials[c] = b, e();
        }
        function h(a, b, c, d, f) {
            var g = f.position, h = f.rotation, i = f.quaternion, j = f.scale;
            a.position.set(g[0], g[1], g[2]), i ? (a.quaternion.set(i[0], i[1], i[2], i[3]), 
            a.useQuaternion = !0) : a.rotation.set(h[0], h[1], h[2]), a.scale.set(j[0], j[1], j[2]), 
            d && a.traverse(function(a) {
                a.material = d;
            });
            var k = void 0 !== f.visible ? f.visible : !0;
            a.traverse(function(a) {
                a.visible = k;
            }), c.add(a), a.name = b, B.objects[b] = a, e();
        }
        function i(a) {
            return function(b, c) {
                b.name = a, g(b, c, a), x -= 1, C.onLoadComplete(), l();
            };
        }
        function j(a, b, c, d) {
            return function(e) {
                var f;
                f = e.content ? e.content : e.dae ? e.scene : e, h(f, a, b, c, d), x -= 1, C.onLoadComplete(), 
                l();
            };
        }
        function k(a) {
            return function(b, c) {
                b.name = a, B.geometries[a] = b, B.face_materials[a] = c;
            };
        }
        function l() {
            var a = {
                totalModels: z,
                totalTextures: A,
                loadedModels: z - x,
                loadedTextures: A - y
            };
            C.callbackProgress(a, B), C.onLoadProgress(), 0 === x && 0 === y && (m(), b(B));
        }
        function m() {
            for (var a = 0; a < E.length; a++) {
                var b = E[a], c = B.objects[b.targetName];
                c ? b.object.target = c : (b.object.target = new v.Object3D(), B.scene.add(b.object.target)), 
                b.object.target.userData.targetInverse = b.object;
            }
        }
        var n, o, p, q, r, s, t, u, w, x, y, z, A, B, C = this, D = v.Loader.prototype.extractUrlBase(c), E = [], F = a;
        for (var G in this.geometryHandlerMap) {
            var H = this.geometryHandlerMap[G].loaderClass;
            this.geometryHandlerMap[G].loaderObject = new H();
        }
        for (var G in this.hierarchyHandlerMap) {
            var H = this.hierarchyHandlerMap[G].loaderClass;
            this.hierarchyHandlerMap[G].loaderObject = new H();
        }
        if (x = 0, y = 0, B = {
            scene: new v.Scene(),
            geometries: {},
            face_materials: {},
            materials: {},
            textures: {},
            objects: {},
            cameras: {},
            lights: {},
            fogs: {},
            empties: {},
            groups: {}
        }, F.transform) {
            var I = F.transform.position, J = F.transform.rotation, K = F.transform.scale;
            I && B.scene.position.set(I[0], I[1], I[2]), J && B.scene.rotation.set(J[0], J[1], J[2]), 
            K && B.scene.scale.set(K[0], K[1], K[2]), (I || J || K) && (B.scene.updateMatrix(), 
            B.scene.updateMatrixWorld());
        }
        var L, M, N = function(a) {
            y -= a, l(), C.onLoadComplete();
        }, O = function(a) {
            return function() {
                N(a);
            };
        };
        for (L in F.fogs) M = F.fogs[L], "linear" === M.type ? q = new v.Fog(0, M.near, M.far) : "exp2" === M.type && (q = new v.FogExp2(0, M.density)), 
        s = M.color, q.color.setRGB(s[0], s[1], s[2]), B.fogs[L] = q;
        var P, Q;
        for (P in F.geometries) Q = F.geometries[P], Q.type in this.geometryHandlerMap && (x += 1, 
        C.onLoadStart());
        var R, S;
        for (R in F.objects) S = F.objects[R], S.type && S.type in this.hierarchyHandlerMap && (x += 1, 
        C.onLoadStart());
        z = x;
        for (P in F.geometries) if (Q = F.geometries[P], "cube" === Q.type) n = new v.CubeGeometry(Q.width, Q.height, Q.depth, Q.widthSegments, Q.heightSegments, Q.depthSegments), 
        n.name = P, B.geometries[P] = n; else if ("plane" === Q.type) n = new v.PlaneGeometry(Q.width, Q.height, Q.widthSegments, Q.heightSegments), 
        n.name = P, B.geometries[P] = n; else if ("sphere" === Q.type) n = new v.SphereGeometry(Q.radius, Q.widthSegments, Q.heightSegments), 
        n.name = P, B.geometries[P] = n; else if ("cylinder" === Q.type) n = new v.CylinderGeometry(Q.topRad, Q.botRad, Q.height, Q.radSegs, Q.heightSegs), 
        n.name = P, B.geometries[P] = n; else if ("torus" === Q.type) n = new v.TorusGeometry(Q.radius, Q.tube, Q.segmentsR, Q.segmentsT), 
        n.name = P, B.geometries[P] = n; else if ("icosahedron" === Q.type) n = new v.IcosahedronGeometry(Q.radius, Q.subdivisions), 
        n.name = P, B.geometries[P] = n; else if (Q.type in this.geometryHandlerMap) {
            var T = {};
            for (var U in Q) "type" !== U && "url" !== U && (T[U] = Q[U]);
            var V = this.geometryHandlerMap[Q.type].loaderObject;
            V.load(d(Q.url, F.urlBaseType), i(P), T);
        } else if ("embedded" === Q.type) {
            var W = F.embeds[Q.id], X = "";
            if (W.metadata = F.metadata, W) {
                var Y = this.geometryHandlerMap.ascii.loaderObject, Z = Y.parse(W, X);
                k(P)(Z.geometry, Z.materials);
            }
        }
        var $, _;
        for ($ in F.textures) if (_ = F.textures[$], _.url instanceof Array) {
            y += _.url.length;
            for (var ab = 0; ab < _.url.length; ab++) C.onLoadStart();
        } else y += 1, C.onLoadStart();
        A = y;
        for ($ in F.textures) {
            if (_ = F.textures[$], void 0 !== _.mapping && void 0 !== v[_.mapping] && (_.mapping = new v[_.mapping]()), 
            _.url instanceof Array) {
                for (var bb = _.url.length, cb = [], db = 0; bb > db; db++) cb[db] = d(_.url[db], F.urlBaseType);
                var eb = /\.dds$/i.test(cb[0]);
                r = eb ? v.ImageUtils.loadCompressedTextureCube(cb, _.mapping, O(bb)) : v.ImageUtils.loadTextureCube(cb, _.mapping, O(bb));
            } else {
                var eb = /\.dds$/i.test(_.url), fb = d(_.url, F.urlBaseType), gb = O(1);
                if (r = eb ? v.ImageUtils.loadCompressedTexture(fb, _.mapping, gb) : v.ImageUtils.loadTexture(fb, _.mapping, gb), 
                void 0 !== v[_.minFilter] && (r.minFilter = v[_.minFilter]), void 0 !== v[_.magFilter] && (r.magFilter = v[_.magFilter]), 
                _.anisotropy && (r.anisotropy = _.anisotropy), _.repeat && (r.repeat.set(_.repeat[0], _.repeat[1]), 
                1 !== _.repeat[0] && (r.wrapS = v.RepeatWrapping), 1 !== _.repeat[1] && (r.wrapT = v.RepeatWrapping)), 
                _.offset && r.offset.set(_.offset[0], _.offset[1]), _.wrap) {
                    var hb = {
                        repeat: v.RepeatWrapping,
                        mirror: v.MirroredRepeatWrapping
                    };
                    void 0 !== hb[_.wrap[0]] && (r.wrapS = hb[_.wrap[0]]), void 0 !== hb[_.wrap[1]] && (r.wrapT = hb[_.wrap[1]]);
                }
            }
            B.textures[$] = r;
        }
        var ib, jb, kb;
        for (ib in F.materials) {
            jb = F.materials[ib];
            for (kb in jb.parameters) if ("envMap" === kb || "map" === kb || "lightMap" === kb || "bumpMap" === kb) jb.parameters[kb] = B.textures[jb.parameters[kb]]; else if ("shading" === kb) jb.parameters[kb] = "flat" === jb.parameters[kb] ? v.FlatShading : v.SmoothShading; else if ("side" === kb) jb.parameters[kb] = "double" == jb.parameters[kb] ? v.DoubleSide : "back" == jb.parameters[kb] ? v.BackSide : v.FrontSide; else if ("blending" === kb) jb.parameters[kb] = jb.parameters[kb] in v ? v[jb.parameters[kb]] : v.NormalBlending; else if ("combine" === kb) jb.parameters[kb] = jb.parameters[kb] in v ? v[jb.parameters[kb]] : v.MultiplyOperation; else if ("vertexColors" === kb) "face" == jb.parameters[kb] ? jb.parameters[kb] = v.FaceColors : jb.parameters[kb] && (jb.parameters[kb] = v.VertexColors); else if ("wrapRGB" === kb) {
                var lb = jb.parameters[kb];
                jb.parameters[kb] = new v.Vector3(lb[0], lb[1], lb[2]);
            }
            if (void 0 !== jb.parameters.opacity && jb.parameters.opacity < 1 && (jb.parameters.transparent = !0), 
            jb.parameters.normalMap) {
                var mb = v.ShaderLib.normalmap, nb = v.UniformsUtils.clone(mb.uniforms), ob = jb.parameters.color, pb = jb.parameters.specular, qb = jb.parameters.ambient, rb = jb.parameters.shininess;
                nb.tNormal.value = B.textures[jb.parameters.normalMap], jb.parameters.normalScale && nb.uNormalScale.value.set(jb.parameters.normalScale[0], jb.parameters.normalScale[1]), 
                jb.parameters.map && (nb.tDiffuse.value = jb.parameters.map, nb.enableDiffuse.value = !0), 
                jb.parameters.envMap && (nb.tCube.value = jb.parameters.envMap, nb.enableReflection.value = !0, 
                nb.uReflectivity.value = jb.parameters.reflectivity), jb.parameters.lightMap && (nb.tAO.value = jb.parameters.lightMap, 
                nb.enableAO.value = !0), jb.parameters.specularMap && (nb.tSpecular.value = B.textures[jb.parameters.specularMap], 
                nb.enableSpecular.value = !0), jb.parameters.displacementMap && (nb.tDisplacement.value = B.textures[jb.parameters.displacementMap], 
                nb.enableDisplacement.value = !0, nb.uDisplacementBias.value = jb.parameters.displacementBias, 
                nb.uDisplacementScale.value = jb.parameters.displacementScale), nb.uDiffuseColor.value.setHex(ob), 
                nb.uSpecularColor.value.setHex(pb), nb.uAmbientColor.value.setHex(qb), nb.uShininess.value = rb, 
                jb.parameters.opacity && (nb.uOpacity.value = jb.parameters.opacity);
                var sb = {
                    fragmentShader: mb.fragmentShader,
                    vertexShader: mb.vertexShader,
                    uniforms: nb,
                    lights: !0,
                    fog: !0
                };
                o = new v.ShaderMaterial(sb);
            } else o = new v[jb.type](jb.parameters);
            o.name = ib, B.materials[ib] = o;
        }
        for (ib in F.materials) if (jb = F.materials[ib], jb.parameters.materials) {
            for (var tb = [], db = 0; db < jb.parameters.materials.length; db++) {
                var ub = jb.parameters.materials[db];
                tb.push(B.materials[ub]);
            }
            B.materials[ib].materials = tb;
        }
        e(), B.cameras && F.defaults.camera && (B.currentCamera = B.cameras[F.defaults.camera]), 
        B.fogs && F.defaults.fog && (B.scene.fog = B.fogs[F.defaults.fog]), C.callbackSync(B), 
        l();
    }, v.TextureLoader = function() {
        this.crossOrigin = null;
    }, v.TextureLoader.prototype = {
        constructor: v.TextureLoader,
        addEventListener: v.EventDispatcher.prototype.addEventListener,
        hasEventListener: v.EventDispatcher.prototype.hasEventListener,
        removeEventListener: v.EventDispatcher.prototype.removeEventListener,
        dispatchEvent: v.EventDispatcher.prototype.dispatchEvent,
        load: function(a) {
            var b = this, c = new Image();
            c.addEventListener("load", function() {
                var a = new v.Texture(c);
                a.needsUpdate = !0, b.dispatchEvent({
                    type: "load",
                    content: a
                });
            }, !1), c.addEventListener("error", function() {
                b.dispatchEvent({
                    type: "error",
                    message: "Couldn't load URL [" + a + "]"
                });
            }, !1), b.crossOrigin && (c.crossOrigin = b.crossOrigin), c.src = a;
        }
    }, v.Material = function() {
        this.id = v.MaterialIdCount++, this.name = "", this.side = v.FrontSide, this.opacity = 1, 
        this.transparent = !1, this.blending = v.NormalBlending, this.blendSrc = v.SrcAlphaFactor, 
        this.blendDst = v.OneMinusSrcAlphaFactor, this.blendEquation = v.AddEquation, this.depthTest = !0, 
        this.depthWrite = !0, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, 
        this.alphaTest = 0, this.overdraw = !1, this.visible = !0, this.needsUpdate = !0;
    }, v.Material.prototype = {
        constructor: v.Material,
        addEventListener: v.EventDispatcher.prototype.addEventListener,
        hasEventListener: v.EventDispatcher.prototype.hasEventListener,
        removeEventListener: v.EventDispatcher.prototype.removeEventListener,
        dispatchEvent: v.EventDispatcher.prototype.dispatchEvent,
        setValues: function(a) {
            if (void 0 !== a) for (var b in a) {
                var c = a[b];
                if (void 0 !== c) {
                    if (b in this) {
                        var d = this[b];
                        d instanceof v.Color ? d.set(c) : d instanceof v.Vector3 && c instanceof v.Vector3 ? d.copy(c) : this[b] = c;
                    }
                } else console.warn("THREE.Material: '" + b + "' parameter is undefined.");
            }
        },
        clone: function(a) {
            return void 0 === a && (a = new v.Material()), a.name = this.name, a.side = this.side, 
            a.opacity = this.opacity, a.transparent = this.transparent, a.blending = this.blending, 
            a.blendSrc = this.blendSrc, a.blendDst = this.blendDst, a.blendEquation = this.blendEquation, 
            a.depthTest = this.depthTest, a.depthWrite = this.depthWrite, a.polygonOffset = this.polygonOffset, 
            a.polygonOffsetFactor = this.polygonOffsetFactor, a.polygonOffsetUnits = this.polygonOffsetUnits, 
            a.alphaTest = this.alphaTest, a.overdraw = this.overdraw, a.visible = this.visible, 
            a;
        },
        dispose: function() {
            this.dispatchEvent({
                type: "dispose"
            });
        }
    }, v.MaterialIdCount = 0, v.LineBasicMaterial = function(a) {
        v.Material.call(this), this.color = new v.Color(16777215), this.linewidth = 1, this.linecap = "round", 
        this.linejoin = "round", this.vertexColors = !1, this.fog = !0, this.setValues(a);
    }, v.LineBasicMaterial.prototype = Object.create(v.Material.prototype), v.LineBasicMaterial.prototype.clone = function() {
        var a = new v.LineBasicMaterial();
        return v.Material.prototype.clone.call(this, a), a.color.copy(this.color), a.linewidth = this.linewidth, 
        a.linecap = this.linecap, a.linejoin = this.linejoin, a.vertexColors = this.vertexColors, 
        a.fog = this.fog, a;
    }, v.LineDashedMaterial = function(a) {
        v.Material.call(this), this.color = new v.Color(16777215), this.linewidth = 1, this.scale = 1, 
        this.dashSize = 3, this.gapSize = 1, this.vertexColors = !1, this.fog = !0, this.setValues(a);
    }, v.LineDashedMaterial.prototype = Object.create(v.Material.prototype), v.LineDashedMaterial.prototype.clone = function() {
        var a = new v.LineDashedMaterial();
        return v.Material.prototype.clone.call(this, a), a.color.copy(this.color), a.linewidth = this.linewidth, 
        a.scale = this.scale, a.dashSize = this.dashSize, a.gapSize = this.gapSize, a.vertexColors = this.vertexColors, 
        a.fog = this.fog, a;
    }, v.MeshBasicMaterial = function(a) {
        v.Material.call(this), this.color = new v.Color(16777215), this.map = null, this.lightMap = null, 
        this.specularMap = null, this.envMap = null, this.combine = v.MultiplyOperation, 
        this.reflectivity = 1, this.refractionRatio = .98, this.fog = !0, this.shading = v.SmoothShading, 
        this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", 
        this.wireframeLinejoin = "round", this.vertexColors = v.NoColors, this.skinning = !1, 
        this.morphTargets = !1, this.setValues(a);
    }, v.MeshBasicMaterial.prototype = Object.create(v.Material.prototype), v.MeshBasicMaterial.prototype.clone = function() {
        var a = new v.MeshBasicMaterial();
        return v.Material.prototype.clone.call(this, a), a.color.copy(this.color), a.map = this.map, 
        a.lightMap = this.lightMap, a.specularMap = this.specularMap, a.envMap = this.envMap, 
        a.combine = this.combine, a.reflectivity = this.reflectivity, a.refractionRatio = this.refractionRatio, 
        a.fog = this.fog, a.shading = this.shading, a.wireframe = this.wireframe, a.wireframeLinewidth = this.wireframeLinewidth, 
        a.wireframeLinecap = this.wireframeLinecap, a.wireframeLinejoin = this.wireframeLinejoin, 
        a.vertexColors = this.vertexColors, a.skinning = this.skinning, a.morphTargets = this.morphTargets, 
        a;
    }, v.MeshLambertMaterial = function(a) {
        v.Material.call(this), this.color = new v.Color(16777215), this.ambient = new v.Color(16777215), 
        this.emissive = new v.Color(0), this.wrapAround = !1, this.wrapRGB = new v.Vector3(1, 1, 1), 
        this.map = null, this.lightMap = null, this.specularMap = null, this.envMap = null, 
        this.combine = v.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, 
        this.fog = !0, this.shading = v.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, 
        this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.vertexColors = v.NoColors, 
        this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(a);
    }, v.MeshLambertMaterial.prototype = Object.create(v.Material.prototype), v.MeshLambertMaterial.prototype.clone = function() {
        var a = new v.MeshLambertMaterial();
        return v.Material.prototype.clone.call(this, a), a.color.copy(this.color), a.ambient.copy(this.ambient), 
        a.emissive.copy(this.emissive), a.wrapAround = this.wrapAround, a.wrapRGB.copy(this.wrapRGB), 
        a.map = this.map, a.lightMap = this.lightMap, a.specularMap = this.specularMap, 
        a.envMap = this.envMap, a.combine = this.combine, a.reflectivity = this.reflectivity, 
        a.refractionRatio = this.refractionRatio, a.fog = this.fog, a.shading = this.shading, 
        a.wireframe = this.wireframe, a.wireframeLinewidth = this.wireframeLinewidth, a.wireframeLinecap = this.wireframeLinecap, 
        a.wireframeLinejoin = this.wireframeLinejoin, a.vertexColors = this.vertexColors, 
        a.skinning = this.skinning, a.morphTargets = this.morphTargets, a.morphNormals = this.morphNormals, 
        a;
    }, v.MeshPhongMaterial = function(a) {
        v.Material.call(this), this.color = new v.Color(16777215), this.ambient = new v.Color(16777215), 
        this.emissive = new v.Color(0), this.specular = new v.Color(1118481), this.shininess = 30, 
        this.metal = !1, this.perPixel = !0, this.wrapAround = !1, this.wrapRGB = new v.Vector3(1, 1, 1), 
        this.map = null, this.lightMap = null, this.bumpMap = null, this.bumpScale = 1, 
        this.normalMap = null, this.normalScale = new v.Vector2(1, 1), this.specularMap = null, 
        this.envMap = null, this.combine = v.MultiplyOperation, this.reflectivity = 1, this.refractionRatio = .98, 
        this.fog = !0, this.shading = v.SmoothShading, this.wireframe = !1, this.wireframeLinewidth = 1, 
        this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.vertexColors = v.NoColors, 
        this.skinning = !1, this.morphTargets = !1, this.morphNormals = !1, this.setValues(a);
    }, v.MeshPhongMaterial.prototype = Object.create(v.Material.prototype), v.MeshPhongMaterial.prototype.clone = function() {
        var a = new v.MeshPhongMaterial();
        return v.Material.prototype.clone.call(this, a), a.color.copy(this.color), a.ambient.copy(this.ambient), 
        a.emissive.copy(this.emissive), a.specular.copy(this.specular), a.shininess = this.shininess, 
        a.metal = this.metal, a.perPixel = this.perPixel, a.wrapAround = this.wrapAround, 
        a.wrapRGB.copy(this.wrapRGB), a.map = this.map, a.lightMap = this.lightMap, a.bumpMap = this.bumpMap, 
        a.bumpScale = this.bumpScale, a.normalMap = this.normalMap, a.normalScale.copy(this.normalScale), 
        a.specularMap = this.specularMap, a.envMap = this.envMap, a.combine = this.combine, 
        a.reflectivity = this.reflectivity, a.refractionRatio = this.refractionRatio, a.fog = this.fog, 
        a.shading = this.shading, a.wireframe = this.wireframe, a.wireframeLinewidth = this.wireframeLinewidth, 
        a.wireframeLinecap = this.wireframeLinecap, a.wireframeLinejoin = this.wireframeLinejoin, 
        a.vertexColors = this.vertexColors, a.skinning = this.skinning, a.morphTargets = this.morphTargets, 
        a.morphNormals = this.morphNormals, a;
    }, v.MeshDepthMaterial = function(a) {
        v.Material.call(this), this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(a);
    }, v.MeshDepthMaterial.prototype = Object.create(v.Material.prototype), v.MeshDepthMaterial.prototype.clone = function() {
        var a = new v.MeshDepthMaterial();
        return v.Material.prototype.clone.call(this, a), a.wireframe = this.wireframe, a.wireframeLinewidth = this.wireframeLinewidth, 
        a;
    }, v.MeshNormalMaterial = function(a) {
        v.Material.call(this, a), this.shading = v.FlatShading, this.wireframe = !1, this.wireframeLinewidth = 1, 
        this.morphTargets = !1, this.setValues(a);
    }, v.MeshNormalMaterial.prototype = Object.create(v.Material.prototype), v.MeshNormalMaterial.prototype.clone = function() {
        var a = new v.MeshNormalMaterial();
        return v.Material.prototype.clone.call(this, a), a.shading = this.shading, a.wireframe = this.wireframe, 
        a.wireframeLinewidth = this.wireframeLinewidth, a;
    }, v.MeshFaceMaterial = function(a) {
        this.materials = a instanceof Array ? a : [];
    }, v.MeshFaceMaterial.prototype.clone = function() {
        return new v.MeshFaceMaterial(this.materials.slice(0));
    }, v.ParticleBasicMaterial = function(a) {
        v.Material.call(this), this.color = new v.Color(16777215), this.map = null, this.size = 1, 
        this.sizeAttenuation = !0, this.vertexColors = !1, this.fog = !0, this.setValues(a);
    }, v.ParticleBasicMaterial.prototype = Object.create(v.Material.prototype), v.ParticleBasicMaterial.prototype.clone = function() {
        var a = new v.ParticleBasicMaterial();
        return v.Material.prototype.clone.call(this, a), a.color.copy(this.color), a.map = this.map, 
        a.size = this.size, a.sizeAttenuation = this.sizeAttenuation, a.vertexColors = this.vertexColors, 
        a.fog = this.fog, a;
    }, v.ParticleCanvasMaterial = function(a) {
        v.Material.call(this), this.color = new v.Color(16777215), this.program = function() {}, 
        this.setValues(a);
    }, v.ParticleCanvasMaterial.prototype = Object.create(v.Material.prototype), v.ParticleCanvasMaterial.prototype.clone = function() {
        var a = new v.ParticleCanvasMaterial();
        return v.Material.prototype.clone.call(this, a), a.color.copy(this.color), a.program = this.program, 
        a;
    }, v.ShaderMaterial = function(a) {
        v.Material.call(this), this.fragmentShader = "void main() {}", this.vertexShader = "void main() {}", 
        this.uniforms = {}, this.defines = {}, this.attributes = null, this.shading = v.SmoothShading, 
        this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, 
        this.lights = !1, this.vertexColors = v.NoColors, this.skinning = !1, this.morphTargets = !1, 
        this.morphNormals = !1, this.setValues(a);
    }, v.ShaderMaterial.prototype = Object.create(v.Material.prototype), v.ShaderMaterial.prototype.clone = function() {
        var a = new v.ShaderMaterial();
        return v.Material.prototype.clone.call(this, a), a.fragmentShader = this.fragmentShader, 
        a.vertexShader = this.vertexShader, a.uniforms = v.UniformsUtils.clone(this.uniforms), 
        a.attributes = this.attributes, a.defines = this.defines, a.shading = this.shading, 
        a.wireframe = this.wireframe, a.wireframeLinewidth = this.wireframeLinewidth, a.fog = this.fog, 
        a.lights = this.lights, a.vertexColors = this.vertexColors, a.skinning = this.skinning, 
        a.morphTargets = this.morphTargets, a.morphNormals = this.morphNormals, a;
    }, v.SpriteMaterial = function(a) {
        v.Material.call(this), this.color = new v.Color(16777215), this.map = new v.Texture(), 
        this.useScreenCoordinates = !0, this.depthTest = !this.useScreenCoordinates, this.sizeAttenuation = !this.useScreenCoordinates, 
        this.scaleByViewport = !this.sizeAttenuation, this.alignment = v.SpriteAlignment.center.clone(), 
        this.fog = !1, this.uvOffset = new v.Vector2(0, 0), this.uvScale = new v.Vector2(1, 1), 
        this.setValues(a), a = a || {}, void 0 === a.depthTest && (this.depthTest = !this.useScreenCoordinates), 
        void 0 === a.sizeAttenuation && (this.sizeAttenuation = !this.useScreenCoordinates), 
        void 0 === a.scaleByViewport && (this.scaleByViewport = !this.sizeAttenuation);
    }, v.SpriteMaterial.prototype = Object.create(v.Material.prototype), v.SpriteMaterial.prototype.clone = function() {
        var a = new v.SpriteMaterial();
        return v.Material.prototype.clone.call(this, a), a.color.copy(this.color), a.map = this.map, 
        a.useScreenCoordinates = this.useScreenCoordinates, a.sizeAttenuation = this.sizeAttenuation, 
        a.scaleByViewport = this.scaleByViewport, a.alignment.copy(this.alignment), a.uvOffset.copy(this.uvOffset), 
        a.uvScale.copy(this.uvScale), a.fog = this.fog, a;
    }, v.SpriteAlignment = {}, v.SpriteAlignment.topLeft = new v.Vector2(1, -1), v.SpriteAlignment.topCenter = new v.Vector2(0, -1), 
    v.SpriteAlignment.topRight = new v.Vector2(-1, -1), v.SpriteAlignment.centerLeft = new v.Vector2(1, 0), 
    v.SpriteAlignment.center = new v.Vector2(0, 0), v.SpriteAlignment.centerRight = new v.Vector2(-1, 0), 
    v.SpriteAlignment.bottomLeft = new v.Vector2(1, 1), v.SpriteAlignment.bottomCenter = new v.Vector2(0, 1), 
    v.SpriteAlignment.bottomRight = new v.Vector2(-1, 1), v.Texture = function(a, b, c, d, e, f, g, h, i) {
        this.id = v.TextureIdCount++, this.name = "", this.image = a, this.mipmaps = [], 
        this.mapping = void 0 !== b ? b : new v.UVMapping(), this.wrapS = void 0 !== c ? c : v.ClampToEdgeWrapping, 
        this.wrapT = void 0 !== d ? d : v.ClampToEdgeWrapping, this.magFilter = void 0 !== e ? e : v.LinearFilter, 
        this.minFilter = void 0 !== f ? f : v.LinearMipMapLinearFilter, this.anisotropy = void 0 !== i ? i : 1, 
        this.format = void 0 !== g ? g : v.RGBAFormat, this.type = void 0 !== h ? h : v.UnsignedByteType, 
        this.offset = new v.Vector2(0, 0), this.repeat = new v.Vector2(1, 1), this.generateMipmaps = !0, 
        this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.needsUpdate = !1, 
        this.onUpdate = null;
    }, v.Texture.prototype = {
        constructor: v.Texture,
        addEventListener: v.EventDispatcher.prototype.addEventListener,
        hasEventListener: v.EventDispatcher.prototype.hasEventListener,
        removeEventListener: v.EventDispatcher.prototype.removeEventListener,
        dispatchEvent: v.EventDispatcher.prototype.dispatchEvent,
        clone: function(a) {
            return void 0 === a && (a = new v.Texture()), a.image = this.image, a.mipmaps = this.mipmaps.slice(0), 
            a.mapping = this.mapping, a.wrapS = this.wrapS, a.wrapT = this.wrapT, a.magFilter = this.magFilter, 
            a.minFilter = this.minFilter, a.anisotropy = this.anisotropy, a.format = this.format, 
            a.type = this.type, a.offset.copy(this.offset), a.repeat.copy(this.repeat), a.generateMipmaps = this.generateMipmaps, 
            a.premultiplyAlpha = this.premultiplyAlpha, a.flipY = this.flipY, a.unpackAlignment = this.unpackAlignment, 
            a;
        },
        dispose: function() {
            this.dispatchEvent({
                type: "dispose"
            });
        }
    }, v.TextureIdCount = 0, v.CompressedTexture = function(a, b, c, d, e, f, g, h, i, j, k) {
        v.Texture.call(this, null, f, g, h, i, j, d, e, k), this.image = {
            width: b,
            height: c
        }, this.mipmaps = a, this.generateMipmaps = !1;
    }, v.CompressedTexture.prototype = Object.create(v.Texture.prototype), v.CompressedTexture.prototype.clone = function() {
        var a = new v.CompressedTexture();
        return v.Texture.prototype.clone.call(this, a), a;
    }, v.DataTexture = function(a, b, c, d, e, f, g, h, i, j, k) {
        v.Texture.call(this, null, f, g, h, i, j, d, e, k), this.image = {
            data: a,
            width: b,
            height: c
        };
    }, v.DataTexture.prototype = Object.create(v.Texture.prototype), v.DataTexture.prototype.clone = function() {
        var a = new v.DataTexture();
        return v.Texture.prototype.clone.call(this, a), a;
    }, v.Particle = function(a) {
        v.Object3D.call(this), this.material = a;
    }, v.Particle.prototype = Object.create(v.Object3D.prototype), v.Particle.prototype.clone = function(a) {
        return void 0 === a && (a = new v.Particle(this.material)), v.Object3D.prototype.clone.call(this, a), 
        a;
    }, v.ParticleSystem = function(a, b) {
        v.Object3D.call(this), this.geometry = a, this.material = void 0 !== b ? b : new v.ParticleBasicMaterial({
            color: 16777215 * Math.random()
        }), this.sortParticles = !1, this.geometry && null === this.geometry.boundingSphere && this.geometry.computeBoundingSphere(), 
        this.frustumCulled = !1;
    }, v.ParticleSystem.prototype = Object.create(v.Object3D.prototype), v.ParticleSystem.prototype.clone = function(a) {
        return void 0 === a && (a = new v.ParticleSystem(this.geometry, this.material)), 
        a.sortParticles = this.sortParticles, v.Object3D.prototype.clone.call(this, a), 
        a;
    }, v.Line = function(a, b, c) {
        v.Object3D.call(this), this.geometry = a, this.material = void 0 !== b ? b : new v.LineBasicMaterial({
            color: 16777215 * Math.random()
        }), this.type = void 0 !== c ? c : v.LineStrip, this.geometry && (this.geometry.boundingSphere || this.geometry.computeBoundingSphere());
    }, v.LineStrip = 0, v.LinePieces = 1, v.Line.prototype = Object.create(v.Object3D.prototype), 
    v.Line.prototype.clone = function(a) {
        return void 0 === a && (a = new v.Line(this.geometry, this.material, this.type)), 
        v.Object3D.prototype.clone.call(this, a), a;
    }, v.Mesh = function(a, b) {
        v.Object3D.call(this), this.geometry = null, this.material = null, this.setGeometry(a), 
        this.setMaterial(b);
    }, v.Mesh.prototype = Object.create(v.Object3D.prototype), v.Mesh.prototype.setGeometry = function(a) {
        void 0 !== a && (this.geometry = a, null === this.geometry.boundingSphere && this.geometry.computeBoundingSphere(), 
        this.updateMorphTargets());
    }, v.Mesh.prototype.setMaterial = function(a) {
        this.material = void 0 !== a ? a : new v.MeshBasicMaterial({
            color: 16777215 * Math.random(),
            wireframe: !0
        });
    }, v.Mesh.prototype.updateMorphTargets = function() {
        if (this.geometry.morphTargets.length > 0) {
            this.morphTargetBase = -1, this.morphTargetForcedOrder = [], this.morphTargetInfluences = [], 
            this.morphTargetDictionary = {};
            for (var a = 0, b = this.geometry.morphTargets.length; b > a; a++) this.morphTargetInfluences.push(0), 
            this.morphTargetDictionary[this.geometry.morphTargets[a].name] = a;
        }
    }, v.Mesh.prototype.getMorphTargetIndexByName = function(a) {
        return void 0 !== this.morphTargetDictionary[a] ? this.morphTargetDictionary[a] : (console.log("THREE.Mesh.getMorphTargetIndexByName: morph target " + a + " does not exist. Returning 0."), 
        0);
    }, v.Mesh.prototype.clone = function(a) {
        return void 0 === a && (a = new v.Mesh(this.geometry, this.material)), v.Object3D.prototype.clone.call(this, a), 
        a;
    }, v.Bone = function(a) {
        v.Object3D.call(this), this.skin = a, this.skinMatrix = new v.Matrix4();
    }, v.Bone.prototype = Object.create(v.Object3D.prototype), v.Bone.prototype.update = function(a, b) {
        this.matrixAutoUpdate && (b |= this.updateMatrix()), (b || this.matrixWorldNeedsUpdate) && (a ? this.skinMatrix.multiplyMatrices(a, this.matrix) : this.skinMatrix.copy(this.matrix), 
        this.matrixWorldNeedsUpdate = !1, b = !0);
        var c, d = this.children.length;
        for (c = 0; d > c; c++) this.children[c].update(this.skinMatrix, b);
    }, v.SkinnedMesh = function(a, b, c) {
        v.Mesh.call(this, a, b), this.useVertexTexture = void 0 !== c ? c : !0, this.identityMatrix = new v.Matrix4(), 
        this.bones = [], this.boneMatrices = [];
        var d, e, f, g, h, i;
        if (this.geometry && void 0 !== this.geometry.bones) {
            for (d = 0; d < this.geometry.bones.length; d++) f = this.geometry.bones[d], g = f.pos, 
            h = f.rotq, i = f.scl, e = this.addBone(), e.name = f.name, e.position.set(g[0], g[1], g[2]), 
            e.quaternion.set(h[0], h[1], h[2], h[3]), e.useQuaternion = !0, void 0 !== i ? e.scale.set(i[0], i[1], i[2]) : e.scale.set(1, 1, 1);
            for (d = 0; d < this.bones.length; d++) f = this.geometry.bones[d], e = this.bones[d], 
            -1 === f.parent ? this.add(e) : this.bones[f.parent].add(e);
            var j = this.bones.length;
            if (this.useVertexTexture) {
                var k;
                k = j > 256 ? 64 : j > 64 ? 32 : j > 16 ? 16 : 8, this.boneTextureWidth = k, this.boneTextureHeight = k, 
                this.boneMatrices = new Float32Array(4 * this.boneTextureWidth * this.boneTextureHeight), 
                this.boneTexture = new v.DataTexture(this.boneMatrices, this.boneTextureWidth, this.boneTextureHeight, v.RGBAFormat, v.FloatType), 
                this.boneTexture.minFilter = v.NearestFilter, this.boneTexture.magFilter = v.NearestFilter, 
                this.boneTexture.generateMipmaps = !1, this.boneTexture.flipY = !1;
            } else this.boneMatrices = new Float32Array(16 * j);
            this.pose();
        }
    }, v.SkinnedMesh.prototype = Object.create(v.Mesh.prototype), v.SkinnedMesh.prototype.addBone = function(a) {
        return void 0 === a && (a = new v.Bone(this)), this.bones.push(a), a;
    }, v.SkinnedMesh.prototype.updateMatrixWorld = function(a) {
        this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || a) && (this.parent ? this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix) : this.matrixWorld.copy(this.matrix), 
        this.matrixWorldNeedsUpdate = !1, a = !0);
        for (var b = 0, c = this.children.length; c > b; b++) {
            var d = this.children[b];
            d instanceof v.Bone ? d.update(this.identityMatrix, !1) : d.updateMatrixWorld(!0);
        }
        if (void 0 == this.boneInverses) {
            this.boneInverses = [];
            for (var e = 0, f = this.bones.length; f > e; e++) {
                var g = new v.Matrix4();
                g.getInverse(this.bones[e].skinMatrix), this.boneInverses.push(g);
            }
        }
        for (var e = 0, f = this.bones.length; f > e; e++) v.SkinnedMesh.offsetMatrix.multiplyMatrices(this.bones[e].skinMatrix, this.boneInverses[e]), 
        v.SkinnedMesh.offsetMatrix.flattenToArrayOffset(this.boneMatrices, 16 * e);
        this.useVertexTexture && (this.boneTexture.needsUpdate = !0);
    }, v.SkinnedMesh.prototype.pose = function() {
        this.updateMatrixWorld(!0);
        for (var a = 0; a < this.geometry.skinIndices.length; a++) {
            var b = this.geometry.skinWeights[a], c = 1 / b.lengthManhattan();
            1/0 !== c ? b.multiplyScalar(c) : b.set(1);
        }
    }, v.SkinnedMesh.prototype.clone = function(a) {
        return void 0 === a && (a = new v.SkinnedMesh(this.geometry, this.material, this.useVertexTexture)), 
        v.Mesh.prototype.clone.call(this, a), a;
    }, v.SkinnedMesh.offsetMatrix = new v.Matrix4(), v.MorphAnimMesh = function(a, b) {
        v.Mesh.call(this, a, b), this.duration = 1e3, this.mirroredLoop = !1, this.time = 0, 
        this.lastKeyframe = 0, this.currentKeyframe = 0, this.direction = 1, this.directionBackwards = !1, 
        this.setFrameRange(0, this.geometry.morphTargets.length - 1);
    }, v.MorphAnimMesh.prototype = Object.create(v.Mesh.prototype), v.MorphAnimMesh.prototype.setFrameRange = function(a, b) {
        this.startKeyframe = a, this.endKeyframe = b, this.length = this.endKeyframe - this.startKeyframe + 1;
    }, v.MorphAnimMesh.prototype.setDirectionForward = function() {
        this.direction = 1, this.directionBackwards = !1;
    }, v.MorphAnimMesh.prototype.setDirectionBackward = function() {
        this.direction = -1, this.directionBackwards = !0;
    }, v.MorphAnimMesh.prototype.parseAnimations = function() {
        var a = this.geometry;
        a.animations || (a.animations = {});
        for (var b, c = a.animations, d = /([a-z]+)(\d+)/, e = 0, f = a.morphTargets.length; f > e; e++) {
            var g = a.morphTargets[e], h = g.name.match(d);
            if (h && h.length > 1) {
                var i = h[1];
                h[2], c[i] || (c[i] = {
                    start: 1/0,
                    end: -1/0
                });
                var j = c[i];
                e < j.start && (j.start = e), e > j.end && (j.end = e), b || (b = i);
            }
        }
        a.firstAnimation = b;
    }, v.MorphAnimMesh.prototype.setAnimationLabel = function(a, b, c) {
        this.geometry.animations || (this.geometry.animations = {}), this.geometry.animations[a] = {
            start: b,
            end: c
        };
    }, v.MorphAnimMesh.prototype.playAnimation = function(a, b) {
        var c = this.geometry.animations[a];
        c ? (this.setFrameRange(c.start, c.end), this.duration = 1e3 * ((c.end - c.start) / b), 
        this.time = 0) : console.warn("animation[" + a + "] undefined");
    }, v.MorphAnimMesh.prototype.updateAnimation = function(a) {
        var b = this.duration / this.length;
        this.time += this.direction * a, this.mirroredLoop ? (this.time > this.duration || this.time < 0) && (this.direction *= -1, 
        this.time > this.duration && (this.time = this.duration, this.directionBackwards = !0), 
        this.time < 0 && (this.time = 0, this.directionBackwards = !1)) : (this.time = this.time % this.duration, 
        this.time < 0 && (this.time += this.duration));
        var c = this.startKeyframe + v.Math.clamp(Math.floor(this.time / b), 0, this.length - 1);
        c !== this.currentKeyframe && (this.morphTargetInfluences[this.lastKeyframe] = 0, 
        this.morphTargetInfluences[this.currentKeyframe] = 1, this.morphTargetInfluences[c] = 0, 
        this.lastKeyframe = this.currentKeyframe, this.currentKeyframe = c);
        var d = this.time % b / b;
        this.directionBackwards && (d = 1 - d), this.morphTargetInfluences[this.currentKeyframe] = d, 
        this.morphTargetInfluences[this.lastKeyframe] = 1 - d;
    }, v.MorphAnimMesh.prototype.clone = function(a) {
        return void 0 === a && (a = new v.MorphAnimMesh(this.geometry, this.material)), 
        a.duration = this.duration, a.mirroredLoop = this.mirroredLoop, a.time = this.time, 
        a.lastKeyframe = this.lastKeyframe, a.currentKeyframe = this.currentKeyframe, a.direction = this.direction, 
        a.directionBackwards = this.directionBackwards, v.Mesh.prototype.clone.call(this, a), 
        a;
    }, v.Ribbon = function(a, b) {
        v.Object3D.call(this), this.geometry = a, this.material = b;
    }, v.Ribbon.prototype = Object.create(v.Object3D.prototype), v.Ribbon.prototype.clone = function(a) {
        return void 0 === a && (a = new v.Ribbon(this.geometry, this.material)), v.Object3D.prototype.clone.call(this, a), 
        a;
    }, v.LOD = function() {
        v.Object3D.call(this), this.objects = [];
    }, v.LOD.prototype = Object.create(v.Object3D.prototype), v.LOD.prototype.addLevel = function(a, b) {
        void 0 === b && (b = 0), b = Math.abs(b);
        for (var c = 0; c < this.objects.length && !(b < this.objects[c].distance); c++) ;
        this.objects.splice(c, 0, {
            distance: b,
            object: a
        }), this.add(a);
    }, v.LOD.prototype.getObjectForDistance = function(a) {
        for (var b = 1, c = this.objects.length; c > b && !(a < this.objects[b].distance); b++) ;
        return this.objects[b - 1].object;
    }, v.LOD.prototype.update = function() {
        var a = new v.Vector3(), b = new v.Vector3();
        return function(c) {
            if (this.objects.length > 1) {
                a.getPositionFromMatrix(c.matrixWorld), b.getPositionFromMatrix(this.matrixWorld);
                var d = a.distanceTo(b);
                this.objects[0].object.visible = !0;
                for (var e = 1, f = this.objects.length; f > e && d >= this.objects[e].distance; e++) this.objects[e - 1].object.visible = !1, 
                this.objects[e].object.visible = !0;
                for (;f > e; e++) this.objects[e].object.visible = !1;
            }
        };
    }(), v.LOD.prototype.clone = function() {}, v.Sprite = function(a) {
        v.Object3D.call(this), this.material = void 0 !== a ? a : new v.SpriteMaterial(), 
        this.rotation3d = this.rotation, this.rotation = 0;
    }, v.Sprite.prototype = Object.create(v.Object3D.prototype), v.Sprite.prototype.updateMatrix = function() {
        this.rotation3d.set(0, 0, this.rotation), this.quaternion.setFromEuler(this.rotation3d, this.eulerOrder), 
        this.matrix.makeFromPositionQuaternionScale(this.position, this.quaternion, this.scale), 
        this.matrixWorldNeedsUpdate = !0;
    }, v.Sprite.prototype.clone = function(a) {
        return void 0 === a && (a = new v.Sprite(this.material)), v.Object3D.prototype.clone.call(this, a), 
        a;
    }, v.Scene = function() {
        v.Object3D.call(this), this.fog = null, this.overrideMaterial = null, this.autoUpdate = !0, 
        this.matrixAutoUpdate = !1, this.__objects = [], this.__lights = [], this.__objectsAdded = [], 
        this.__objectsRemoved = [];
    }, v.Scene.prototype = Object.create(v.Object3D.prototype), v.Scene.prototype.__addObject = function(a) {
        if (a instanceof v.Light) -1 === this.__lights.indexOf(a) && this.__lights.push(a), 
        a.target && void 0 === a.target.parent && this.add(a.target); else if (!(a instanceof v.Camera || a instanceof v.Bone) && -1 === this.__objects.indexOf(a)) {
            this.__objects.push(a), this.__objectsAdded.push(a);
            var b = this.__objectsRemoved.indexOf(a);
            -1 !== b && this.__objectsRemoved.splice(b, 1);
        }
        for (var c = 0; c < a.children.length; c++) this.__addObject(a.children[c]);
    }, v.Scene.prototype.__removeObject = function(a) {
        if (a instanceof v.Light) {
            var b = this.__lights.indexOf(a);
            -1 !== b && this.__lights.splice(b, 1);
        } else if (!(a instanceof v.Camera)) {
            var b = this.__objects.indexOf(a);
            if (-1 !== b) {
                this.__objects.splice(b, 1), this.__objectsRemoved.push(a);
                var c = this.__objectsAdded.indexOf(a);
                -1 !== c && this.__objectsAdded.splice(c, 1);
            }
        }
        for (var d = 0; d < a.children.length; d++) this.__removeObject(a.children[d]);
    }, v.Fog = function(a, b, c) {
        this.name = "", this.color = new v.Color(a), this.near = void 0 !== b ? b : 1, this.far = void 0 !== c ? c : 1e3;
    }, v.Fog.prototype.clone = function() {
        return new v.Fog(this.color.getHex(), this.near, this.far);
    }, v.FogExp2 = function(a, b) {
        this.name = "", this.color = new v.Color(a), this.density = void 0 !== b ? b : 25e-5;
    }, v.FogExp2.prototype.clone = function() {
        return new v.FogExp2(this.color.getHex(), this.density);
    }, v.CanvasRenderer = function(a) {
        function b(a) {
            cb !== a && (_.globalAlpha = a, cb = a);
        }
        function c(a) {
            db !== a && (a === v.NormalBlending ? _.globalCompositeOperation = "source-over" : a === v.AdditiveBlending ? _.globalCompositeOperation = "lighter" : a === v.SubtractiveBlending && (_.globalCompositeOperation = "darker"), 
            db = a);
        }
        function d(a) {
            gb !== a && (_.lineWidth = a, gb = a);
        }
        function e(a) {
            hb !== a && (_.lineCap = a, hb = a);
        }
        function f(a) {
            ib !== a && (_.lineJoin = a, ib = a);
        }
        function g(a) {
            eb !== a && (_.strokeStyle = a, eb = a);
        }
        function h(a) {
            fb !== a && (_.fillStyle = a, fb = a);
        }
        function i(a, b) {
            (jb !== a || kb !== b) && (_.setLineDash([ a, b ]), jb = a, kb = b);
        }
        console.log("THREE.CanvasRenderer", v.REVISION);
        var j = v.Math.smoothstep;
        a = a || {};
        var k, l, m, n, o, p, q, r, s, t, u, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y = this, Z = new v.Projector(), $ = void 0 !== a.canvas ? a.canvas : document.createElement("canvas"), _ = $.getContext("2d"), ab = new v.Color(0), bb = 0, cb = 1, db = 0, eb = null, fb = null, gb = null, hb = null, ib = null, jb = null, kb = 0, lb = new v.RenderableVertex(), mb = new v.RenderableVertex(), nb = new v.Color(), ob = new v.Color(), pb = new v.Color(), qb = new v.Color(), rb = new v.Color(), sb = new v.Color(), tb = new v.Color(), ub = new v.Color(), vb = {}, wb = {}, xb = new v.Box2(), yb = new v.Box2(), zb = new v.Box2(), Ab = new v.Color(), Bb = new v.Color(), Cb = new v.Color(), Db = new v.Vector3(), Eb = 16;
        S = document.createElement("canvas"), S.width = S.height = 2, T = S.getContext("2d"), 
        T.fillStyle = "rgba(0,0,0,1)", T.fillRect(0, 0, 2, 2), U = T.getImageData(0, 0, 2, 2), 
        V = U.data, W = document.createElement("canvas"), W.width = W.height = Eb, X = W.getContext("2d"), 
        X.translate(-Eb / 2, -Eb / 2), X.scale(Eb, Eb), Eb--, void 0 === _.setLineDash && (_.setLineDash = void 0 !== _.mozDash ? function(a) {
            _.mozDash = null !== a[0] ? a : null;
        } : function() {}), this.domElement = $, this.devicePixelRatio = void 0 !== a.devicePixelRatio ? a.devicePixelRatio : void 0 !== window.devicePixelRatio ? window.devicePixelRatio : 1, 
        this.autoClear = !0, this.sortObjects = !0, this.sortElements = !0, this.info = {
            render: {
                vertices: 0,
                faces: 0
            }
        }, this.supportsVertexTextures = function() {}, this.setFaceCulling = function() {}, 
        this.setSize = function(a, b, c) {
            n = a * this.devicePixelRatio, o = b * this.devicePixelRatio, p = Math.floor(n / 2), 
            q = Math.floor(o / 2), $.width = n, $.height = o, 1 !== this.devicePixelRatio && c !== !1 && ($.style.width = a + "px", 
            $.style.height = b + "px"), xb.set(new v.Vector2(-p, -q), new v.Vector2(p, q)), 
            yb.set(new v.Vector2(-p, -q), new v.Vector2(p, q)), cb = 1, db = 0, eb = null, fb = null, 
            gb = null, hb = null, ib = null;
        }, this.setClearColor = function(a, b) {
            ab.set(a), bb = void 0 !== b ? b : 1, yb.set(new v.Vector2(-p, -q), new v.Vector2(p, q));
        }, this.setClearColorHex = function(a, b) {
            console.warn("DEPRECATED: .setClearColorHex() is being removed. Use .setClearColor() instead."), 
            this.setClearColor(a, b);
        }, this.getMaxAnisotropy = function() {
            return 0;
        }, this.clear = function() {
            _.setTransform(1, 0, 0, -1, p, q), yb.empty() === !1 && (yb.intersect(xb), yb.expandByScalar(2), 
            1 > bb && _.clearRect(0 | yb.min.x, 0 | yb.min.y, 0 | yb.max.x - yb.min.x, 0 | yb.max.y - yb.min.y), 
            bb > 0 && (c(v.NormalBlending), b(1), h("rgba(" + Math.floor(255 * ab.r) + "," + Math.floor(255 * ab.g) + "," + Math.floor(255 * ab.b) + "," + bb + ")"), 
            _.fillRect(0 | yb.min.x, 0 | yb.min.y, 0 | yb.max.x - yb.min.x, 0 | yb.max.y - yb.min.y)), 
            yb.makeEmpty());
        }, this.render = function(a, n) {
            function o() {
                Ab.setRGB(0, 0, 0), Bb.setRGB(0, 0, 0), Cb.setRGB(0, 0, 0);
                for (var a = 0, b = m.length; b > a; a++) {
                    var c = m[a], d = c.color;
                    c instanceof v.AmbientLight ? Ab.add(d) : c instanceof v.DirectionalLight ? Bb.add(d) : c instanceof v.PointLight && Cb.add(d);
                }
            }
            function $(a, b, c) {
                for (var d = 0, e = m.length; e > d; d++) {
                    var f = m[d];
                    if (ub.copy(f.color), f instanceof v.DirectionalLight) {
                        var g = Db.getPositionFromMatrix(f.matrixWorld).normalize(), h = b.dot(g);
                        if (0 >= h) continue;
                        h *= f.intensity, c.add(ub.multiplyScalar(h));
                    } else if (f instanceof v.PointLight) {
                        var g = Db.getPositionFromMatrix(f.matrixWorld), h = b.dot(Db.subVectors(g, a).normalize());
                        if (0 >= h) continue;
                        if (h *= 0 == f.distance ? 1 : 1 - Math.min(a.distanceTo(g) / f.distance, 1), 0 == h) continue;
                        h *= f.intensity, c.add(ub.multiplyScalar(h));
                    }
                }
            }
            function ab(a, d, e) {
                b(e.opacity), c(e.blending);
                var f, i, j, k, l, m, n;
                if (e instanceof v.ParticleBasicMaterial) if (null === e.map) {
                    if (j = d.object.scale.x, k = d.object.scale.y, j *= d.scale.x * p, k *= d.scale.y * q, 
                    zb.min.set(a.x - j, a.y - k), zb.max.set(a.x + j, a.y + k), xb.isIntersectionBox(zb) === !1) return zb.makeEmpty(), 
                    void 0;
                    h(e.color.getStyle()), _.save(), _.translate(a.x, a.y), _.rotate(-d.rotation), _.scale(j, k), 
                    _.fillRect(-1, -1, 2, 2), _.restore();
                } else {
                    if (l = e.map.image, m = l.width >> 1, n = l.height >> 1, j = d.scale.x * p, k = d.scale.y * q, 
                    f = j * m, i = k * n, zb.min.set(a.x - f, a.y - i), zb.max.set(a.x + f, a.y + i), 
                    xb.isIntersectionBox(zb) === !1) return zb.makeEmpty(), void 0;
                    _.save(), _.translate(a.x, a.y), _.rotate(-d.rotation), _.scale(j, -k), _.translate(-m, -n), 
                    _.drawImage(l, 0, 0), _.restore();
                } else if (e instanceof v.ParticleCanvasMaterial) {
                    if (f = d.scale.x * p, i = d.scale.y * q, zb.min.set(a.x - f, a.y - i), zb.max.set(a.x + f, a.y + i), 
                    xb.isIntersectionBox(zb) === !1) return zb.makeEmpty(), void 0;
                    g(e.color.getStyle()), h(e.color.getStyle()), _.save(), _.translate(a.x, a.y), _.rotate(-d.rotation), 
                    _.scale(f, i), e.program(_), _.restore();
                }
            }
            function bb(a, h, j, k) {
                if (b(k.opacity), c(k.blending), _.beginPath(), _.moveTo(a.positionScreen.x, a.positionScreen.y), 
                _.lineTo(h.positionScreen.x, h.positionScreen.y), k instanceof v.LineBasicMaterial) {
                    if (d(k.linewidth), e(k.linecap), f(k.linejoin), k.vertexColors !== v.VertexColors) g(k.color.getStyle()); else {
                        var l = j.vertexColors[0].getStyle(), m = j.vertexColors[1].getStyle();
                        if (l === m) g(l); else {
                            try {
                                var n = _.createLinearGradient(a.positionScreen.x, a.positionScreen.y, h.positionScreen.x, h.positionScreen.y);
                                n.addColorStop(0, l), n.addColorStop(1, m);
                            } catch (o) {
                                n = l;
                            }
                            g(n);
                        }
                    }
                    _.stroke(), zb.expandByScalar(2 * k.linewidth);
                } else k instanceof v.LineDashedMaterial && (d(k.linewidth), e(k.linecap), f(k.linejoin), 
                g(k.color.getStyle()), i(k.dashSize, k.gapSize), _.stroke(), zb.expandByScalar(2 * k.linewidth), 
                i(null, null));
            }
            function cb(a, d, e, f, g, h, i, k) {
                if (Y.info.render.vertices += 3, Y.info.render.faces++, b(k.opacity), c(k.blending), 
                w = a.positionScreen.x, x = a.positionScreen.y, y = d.positionScreen.x, z = d.positionScreen.y, 
                A = e.positionScreen.x, B = e.positionScreen.y, eb(w, x, y, z, A, B), (k instanceof v.MeshLambertMaterial || k instanceof v.MeshPhongMaterial) && null === k.map) sb.copy(k.color), 
                tb.copy(k.emissive), k.vertexColors === v.FaceColors && sb.multiply(i.color), k.wireframe === !1 && k.shading == v.SmoothShading && 3 == i.vertexNormalsLength ? (ob.copy(Ab), 
                pb.copy(Ab), qb.copy(Ab), $(i.v1.positionWorld, i.vertexNormalsModel[0], ob), $(i.v2.positionWorld, i.vertexNormalsModel[1], pb), 
                $(i.v3.positionWorld, i.vertexNormalsModel[2], qb), ob.multiply(sb).add(tb), pb.multiply(sb).add(tb), 
                qb.multiply(sb).add(tb), rb.addColors(pb, qb).multiplyScalar(.5), K = kb(ob, pb, qb, rb), 
                jb(w, x, y, z, A, B, 0, 0, 1, 0, 0, 1, K)) : (nb.copy(Ab), $(i.centroidModel, i.normalModel, nb), 
                nb.multiply(sb).add(tb), k.wireframe === !0 ? gb(nb, k.wireframeLinewidth, k.wireframeLinecap, k.wireframeLinejoin) : hb(nb)); else if (k instanceof v.MeshBasicMaterial || k instanceof v.MeshLambertMaterial || k instanceof v.MeshPhongMaterial) null !== k.map ? k.map.mapping instanceof v.UVMapping && (L = i.uvs[0], 
                ib(w, x, y, z, A, B, L[f].x, L[f].y, L[g].x, L[g].y, L[h].x, L[h].y, k.map)) : null !== k.envMap ? k.envMap.mapping instanceof v.SphericalReflectionMapping && (Db.copy(i.vertexNormalsModelView[f]), 
                M = .5 * Db.x + .5, N = .5 * Db.y + .5, Db.copy(i.vertexNormalsModelView[g]), O = .5 * Db.x + .5, 
                P = .5 * Db.y + .5, Db.copy(i.vertexNormalsModelView[h]), Q = .5 * Db.x + .5, R = .5 * Db.y + .5, 
                ib(w, x, y, z, A, B, M, N, O, P, Q, R, k.envMap)) : (nb.copy(k.color), k.vertexColors === v.FaceColors && nb.multiply(i.color), 
                k.wireframe === !0 ? gb(nb, k.wireframeLinewidth, k.wireframeLinecap, k.wireframeLinejoin) : hb(nb)); else if (k instanceof v.MeshDepthMaterial) I = n.near, 
                J = n.far, ob.r = ob.g = ob.b = 1 - j(a.positionScreen.z * a.positionScreen.w, I, J), 
                pb.r = pb.g = pb.b = 1 - j(d.positionScreen.z * d.positionScreen.w, I, J), qb.r = qb.g = qb.b = 1 - j(e.positionScreen.z * e.positionScreen.w, I, J), 
                rb.addColors(pb, qb).multiplyScalar(.5), K = kb(ob, pb, qb, rb), jb(w, x, y, z, A, B, 0, 0, 1, 0, 0, 1, K); else if (k instanceof v.MeshNormalMaterial) {
                    var l;
                    k.shading == v.FlatShading ? (l = i.normalModelView, nb.setRGB(l.x, l.y, l.z).multiplyScalar(.5).addScalar(.5), 
                    k.wireframe === !0 ? gb(nb, k.wireframeLinewidth, k.wireframeLinecap, k.wireframeLinejoin) : hb(nb)) : k.shading == v.SmoothShading && (l = i.vertexNormalsModelView[f], 
                    ob.setRGB(l.x, l.y, l.z).multiplyScalar(.5).addScalar(.5), l = i.vertexNormalsModelView[g], 
                    pb.setRGB(l.x, l.y, l.z).multiplyScalar(.5).addScalar(.5), l = i.vertexNormalsModelView[h], 
                    qb.setRGB(l.x, l.y, l.z).multiplyScalar(.5).addScalar(.5), rb.addColors(pb, qb).multiplyScalar(.5), 
                    K = kb(ob, pb, qb, rb), jb(w, x, y, z, A, B, 0, 0, 1, 0, 0, 1, K));
                }
            }
            function db(a, d, e, f, g, h, i, k) {
                if (Y.info.render.vertices += 4, Y.info.render.faces++, b(k.opacity), c(k.blending), 
                void 0 !== k.map && null !== k.map || void 0 !== k.envMap && null !== k.envMap) return cb(a, d, f, 0, 1, 3, i, k), 
                cb(g, e, h, 1, 2, 3, i, k), void 0;
                if (w = a.positionScreen.x, x = a.positionScreen.y, y = d.positionScreen.x, z = d.positionScreen.y, 
                A = e.positionScreen.x, B = e.positionScreen.y, C = f.positionScreen.x, D = f.positionScreen.y, 
                E = g.positionScreen.x, F = g.positionScreen.y, G = h.positionScreen.x, H = h.positionScreen.y, 
                k instanceof v.MeshLambertMaterial || k instanceof v.MeshPhongMaterial) sb.copy(k.color), 
                tb.copy(k.emissive), k.vertexColors === v.FaceColors && sb.multiply(i.color), k.wireframe === !1 && k.shading == v.SmoothShading && 4 == i.vertexNormalsLength ? (ob.copy(Ab), 
                pb.copy(Ab), qb.copy(Ab), rb.copy(Ab), $(i.v1.positionWorld, i.vertexNormalsModel[0], ob), 
                $(i.v2.positionWorld, i.vertexNormalsModel[1], pb), $(i.v4.positionWorld, i.vertexNormalsModel[3], qb), 
                $(i.v3.positionWorld, i.vertexNormalsModel[2], rb), ob.multiply(sb).add(tb), pb.multiply(sb).add(tb), 
                qb.multiply(sb).add(tb), rb.multiply(sb).add(tb), K = kb(ob, pb, qb, rb), eb(w, x, y, z, C, D), 
                jb(w, x, y, z, C, D, 0, 0, 1, 0, 0, 1, K), eb(E, F, A, B, G, H), jb(E, F, A, B, G, H, 1, 0, 1, 1, 0, 1, K)) : (nb.copy(Ab), 
                $(i.centroidModel, i.normalModel, nb), nb.multiply(sb).add(tb), fb(w, x, y, z, A, B, C, D), 
                k.wireframe === !0 ? gb(nb, k.wireframeLinewidth, k.wireframeLinecap, k.wireframeLinejoin) : hb(nb)); else if (k instanceof v.MeshBasicMaterial) nb.copy(k.color), 
                k.vertexColors === v.FaceColors && nb.multiply(i.color), fb(w, x, y, z, A, B, C, D), 
                k.wireframe === !0 ? gb(nb, k.wireframeLinewidth, k.wireframeLinecap, k.wireframeLinejoin) : hb(nb); else if (k instanceof v.MeshNormalMaterial) {
                    var l;
                    k.shading == v.FlatShading ? (l = i.normalModelView, nb.setRGB(l.x, l.y, l.z).multiplyScalar(.5).addScalar(.5), 
                    fb(w, x, y, z, A, B, C, D), k.wireframe === !0 ? gb(nb, k.wireframeLinewidth, k.wireframeLinecap, k.wireframeLinejoin) : hb(nb)) : k.shading == v.SmoothShading && (l = i.vertexNormalsModelView[0], 
                    ob.setRGB(l.x, l.y, l.z).multiplyScalar(.5).addScalar(.5), l = i.vertexNormalsModelView[1], 
                    pb.setRGB(l.x, l.y, l.z).multiplyScalar(.5).addScalar(.5), l = i.vertexNormalsModelView[3], 
                    qb.setRGB(l.x, l.y, l.z).multiplyScalar(.5).addScalar(.5), l = i.vertexNormalsModelView[2], 
                    rb.setRGB(l.x, l.y, l.z).multiplyScalar(.5).addScalar(.5), K = kb(ob, pb, qb, rb), 
                    eb(w, x, y, z, C, D), jb(w, x, y, z, C, D, 0, 0, 1, 0, 0, 1, K), eb(E, F, A, B, G, H), 
                    jb(E, F, A, B, G, H, 1, 0, 1, 1, 0, 1, K));
                } else k instanceof v.MeshDepthMaterial && (I = n.near, J = n.far, ob.r = ob.g = ob.b = 1 - j(a.positionScreen.z * a.positionScreen.w, I, J), 
                pb.r = pb.g = pb.b = 1 - j(d.positionScreen.z * d.positionScreen.w, I, J), qb.r = qb.g = qb.b = 1 - j(f.positionScreen.z * f.positionScreen.w, I, J), 
                rb.r = rb.g = rb.b = 1 - j(e.positionScreen.z * e.positionScreen.w, I, J), K = kb(ob, pb, qb, rb), 
                eb(w, x, y, z, C, D), jb(w, x, y, z, C, D, 0, 0, 1, 0, 0, 1, K), eb(E, F, A, B, G, H), 
                jb(E, F, A, B, G, H, 1, 0, 1, 1, 0, 1, K));
            }
            function eb(a, b, c, d, e, f) {
                _.beginPath(), _.moveTo(a, b), _.lineTo(c, d), _.lineTo(e, f), _.closePath();
            }
            function fb(a, b, c, d, e, f, g, h) {
                _.beginPath(), _.moveTo(a, b), _.lineTo(c, d), _.lineTo(e, f), _.lineTo(g, h), _.closePath();
            }
            function gb(a, b, c, h) {
                d(b), e(c), f(h), g(a.getStyle()), _.stroke(), zb.expandByScalar(2 * b);
            }
            function hb(a) {
                h(a.getStyle()), _.fill();
            }
            function ib(a, b, c, d, e, f, g, i, j, k, l, m, n) {
                if (!(n instanceof v.DataTexture || void 0 === n.image || 0 == n.image.width)) {
                    if (n.needsUpdate === !0) {
                        var o = n.wrapS == v.RepeatWrapping, p = n.wrapT == v.RepeatWrapping;
                        vb[n.id] = _.createPattern(n.image, o === !0 && p === !0 ? "repeat" : o === !0 && p === !1 ? "repeat-x" : o === !1 && p === !0 ? "repeat-y" : "no-repeat"), 
                        n.needsUpdate = !1;
                    }
                    void 0 === vb[n.id] ? h("rgba(0,0,0,1)") : h(vb[n.id]);
                    var q, r, s, t, u, w, x, y, z = n.offset.x / n.repeat.x, A = n.offset.y / n.repeat.y, B = n.image.width * n.repeat.x, C = n.image.height * n.repeat.y;
                    if (g = (g + z) * B, i = (1 - i + A) * C, j = (j + z) * B, k = (1 - k + A) * C, 
                    l = (l + z) * B, m = (1 - m + A) * C, c -= a, d -= b, e -= a, f -= b, j -= g, k -= i, 
                    l -= g, m -= i, x = j * m - l * k, 0 === x) {
                        if (void 0 === wb[n.id]) {
                            var D = document.createElement("canvas");
                            D.width = n.image.width, D.height = n.image.height;
                            var E = D.getContext("2d");
                            E.drawImage(n.image, 0, 0), wb[n.id] = E.getImageData(0, 0, n.image.width, n.image.height).data;
                        }
                        var F = wb[n.id], G = 4 * (Math.floor(g) + Math.floor(i) * n.image.width);
                        return nb.setRGB(F[G] / 255, F[G + 1] / 255, F[G + 2] / 255), hb(nb), void 0;
                    }
                    y = 1 / x, q = (m * c - k * e) * y, r = (m * d - k * f) * y, s = (j * e - l * c) * y, 
                    t = (j * f - l * d) * y, u = a - q * g - s * i, w = b - r * g - t * i, _.save(), 
                    _.transform(q, r, s, t, u, w), _.fill(), _.restore();
                }
            }
            function jb(a, b, c, d, e, f, g, h, i, j, k, l, m) {
                var n, o, p, q, r, s, t, u, v = m.width - 1, w = m.height - 1;
                g *= v, h *= w, i *= v, j *= w, k *= v, l *= w, c -= a, d -= b, e -= a, f -= b, 
                i -= g, j -= h, k -= g, l -= h, t = i * l - k * j, u = 1 / t, n = (l * c - j * e) * u, 
                o = (l * d - j * f) * u, p = (i * e - k * c) * u, q = (i * f - k * d) * u, r = a - n * g - p * h, 
                s = b - o * g - q * h, _.save(), _.transform(n, o, p, q, r, s), _.clip(), _.drawImage(m, 0, 0), 
                _.restore();
            }
            function kb(a, b, c, d) {
                return V[0] = 0 | 255 * a.r, V[1] = 0 | 255 * a.g, V[2] = 0 | 255 * a.b, V[4] = 0 | 255 * b.r, 
                V[5] = 0 | 255 * b.g, V[6] = 0 | 255 * b.b, V[8] = 0 | 255 * c.r, V[9] = 0 | 255 * c.g, 
                V[10] = 0 | 255 * c.b, V[12] = 0 | 255 * d.r, V[13] = 0 | 255 * d.g, V[14] = 0 | 255 * d.b, 
                T.putImageData(U, 0, 0), X.drawImage(S, 0, 0), W;
            }
            function Eb(a, b) {
                var c, d = b.x - a.x, e = b.y - a.y, f = d * d + e * e;
                0 !== f && (c = 1 / Math.sqrt(f), d *= c, e *= c, b.x += d, b.y += e, a.x -= d, 
                a.y -= e);
            }
            if (n instanceof v.Camera == !1) return console.error("THREE.CanvasRenderer.render: camera is not an instance of THREE.Camera."), 
            void 0;
            this.autoClear === !0 && this.clear(), _.setTransform(1, 0, 0, -1, p, q), Y.info.render.vertices = 0, 
            Y.info.render.faces = 0, k = Z.projectScene(a, n, this.sortObjects, this.sortElements), 
            l = k.elements, m = k.lights, o();
            for (var Fb = 0, Gb = l.length; Gb > Fb; Fb++) {
                var Hb = l[Fb], Ib = Hb.material;
                if (void 0 !== Ib && Ib.visible !== !1) {
                    if (zb.makeEmpty(), Hb instanceof v.RenderableParticle) r = Hb, r.x *= p, r.y *= q, 
                    ab(r, Hb, Ib); else if (Hb instanceof v.RenderableLine) r = Hb.v1, s = Hb.v2, r.positionScreen.x *= p, 
                    r.positionScreen.y *= q, s.positionScreen.x *= p, s.positionScreen.y *= q, zb.setFromPoints([ r.positionScreen, s.positionScreen ]), 
                    xb.isIntersectionBox(zb) === !0 && bb(r, s, Hb, Ib); else if (Hb instanceof v.RenderableFace3) {
                        if (r = Hb.v1, s = Hb.v2, t = Hb.v3, r.positionScreen.z < -1 || r.positionScreen.z > 1) continue;
                        if (s.positionScreen.z < -1 || s.positionScreen.z > 1) continue;
                        if (t.positionScreen.z < -1 || t.positionScreen.z > 1) continue;
                        r.positionScreen.x *= p, r.positionScreen.y *= q, s.positionScreen.x *= p, s.positionScreen.y *= q, 
                        t.positionScreen.x *= p, t.positionScreen.y *= q, Ib.overdraw === !0 && (Eb(r.positionScreen, s.positionScreen), 
                        Eb(s.positionScreen, t.positionScreen), Eb(t.positionScreen, r.positionScreen)), 
                        zb.setFromPoints([ r.positionScreen, s.positionScreen, t.positionScreen ]), xb.isIntersectionBox(zb) === !0 && cb(r, s, t, 0, 1, 2, Hb, Ib);
                    } else if (Hb instanceof v.RenderableFace4) {
                        if (r = Hb.v1, s = Hb.v2, t = Hb.v3, u = Hb.v4, r.positionScreen.z < -1 || r.positionScreen.z > 1) continue;
                        if (s.positionScreen.z < -1 || s.positionScreen.z > 1) continue;
                        if (t.positionScreen.z < -1 || t.positionScreen.z > 1) continue;
                        if (u.positionScreen.z < -1 || u.positionScreen.z > 1) continue;
                        r.positionScreen.x *= p, r.positionScreen.y *= q, s.positionScreen.x *= p, s.positionScreen.y *= q, 
                        t.positionScreen.x *= p, t.positionScreen.y *= q, u.positionScreen.x *= p, u.positionScreen.y *= q, 
                        lb.positionScreen.copy(s.positionScreen), mb.positionScreen.copy(u.positionScreen), 
                        Ib.overdraw === !0 && (Eb(r.positionScreen, s.positionScreen), Eb(s.positionScreen, u.positionScreen), 
                        Eb(u.positionScreen, r.positionScreen), Eb(t.positionScreen, lb.positionScreen), 
                        Eb(t.positionScreen, mb.positionScreen)), zb.setFromPoints([ r.positionScreen, s.positionScreen, t.positionScreen, u.positionScreen ]), 
                        xb.isIntersectionBox(zb) === !0 && db(r, s, t, u, lb, mb, Hb, Ib);
                    }
                    yb.union(zb);
                }
            }
            _.setTransform(1, 0, 0, 1, 0, 0);
        };
    }, v.ShaderChunk = {
        fog_pars_fragment: [ "#ifdef USE_FOG", "uniform vec3 fogColor;", "#ifdef FOG_EXP2", "uniform float fogDensity;", "#else", "uniform float fogNear;", "uniform float fogFar;", "#endif", "#endif" ].join("\n"),
        fog_fragment: [ "#ifdef USE_FOG", "float depth = gl_FragCoord.z / gl_FragCoord.w;", "#ifdef FOG_EXP2", "const float LOG2 = 1.442695;", "float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );", "fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );", "#else", "float fogFactor = smoothstep( fogNear, fogFar, depth );", "#endif", "gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );", "#endif" ].join("\n"),
        envmap_pars_fragment: [ "#ifdef USE_ENVMAP", "uniform float reflectivity;", "uniform samplerCube envMap;", "uniform float flipEnvMap;", "uniform int combine;", "#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )", "uniform bool useRefract;", "uniform float refractionRatio;", "#else", "varying vec3 vReflect;", "#endif", "#endif" ].join("\n"),
        envmap_fragment: [ "#ifdef USE_ENVMAP", "vec3 reflectVec;", "#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )", "vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );", "if ( useRefract ) {", "reflectVec = refract( cameraToVertex, normal, refractionRatio );", "} else { ", "reflectVec = reflect( cameraToVertex, normal );", "}", "#else", "reflectVec = vReflect;", "#endif", "#ifdef DOUBLE_SIDED", "float flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );", "vec4 cubeColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );", "#else", "vec4 cubeColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );", "#endif", "#ifdef GAMMA_INPUT", "cubeColor.xyz *= cubeColor.xyz;", "#endif", "if ( combine == 1 ) {", "gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularStrength * reflectivity );", "} else if ( combine == 2 ) {", "gl_FragColor.xyz += cubeColor.xyz * specularStrength * reflectivity;", "} else {", "gl_FragColor.xyz = mix( gl_FragColor.xyz, gl_FragColor.xyz * cubeColor.xyz, specularStrength * reflectivity );", "}", "#endif" ].join("\n"),
        envmap_pars_vertex: [ "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )", "varying vec3 vReflect;", "uniform float refractionRatio;", "uniform bool useRefract;", "#endif" ].join("\n"),
        worldpos_vertex: [ "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )", "#ifdef USE_SKINNING", "vec4 worldPosition = modelMatrix * skinned;", "#endif", "#if defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )", "vec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );", "#endif", "#if ! defined( USE_MORPHTARGETS ) && ! defined( USE_SKINNING )", "vec4 worldPosition = modelMatrix * vec4( position, 1.0 );", "#endif", "#endif" ].join("\n"),
        envmap_vertex: [ "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP )", "vec3 worldNormal = mat3( modelMatrix[ 0 ].xyz, modelMatrix[ 1 ].xyz, modelMatrix[ 2 ].xyz ) * objectNormal;", "worldNormal = normalize( worldNormal );", "vec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );", "if ( useRefract ) {", "vReflect = refract( cameraToVertex, worldNormal, refractionRatio );", "} else {", "vReflect = reflect( cameraToVertex, worldNormal );", "}", "#endif" ].join("\n"),
        map_particle_pars_fragment: [ "#ifdef USE_MAP", "uniform sampler2D map;", "#endif" ].join("\n"),
        map_particle_fragment: [ "#ifdef USE_MAP", "gl_FragColor = gl_FragColor * texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) );", "#endif" ].join("\n"),
        map_pars_vertex: [ "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )", "varying vec2 vUv;", "uniform vec4 offsetRepeat;", "#endif" ].join("\n"),
        map_pars_fragment: [ "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )", "varying vec2 vUv;", "#endif", "#ifdef USE_MAP", "uniform sampler2D map;", "#endif" ].join("\n"),
        map_vertex: [ "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP )", "vUv = uv * offsetRepeat.zw + offsetRepeat.xy;", "#endif" ].join("\n"),
        map_fragment: [ "#ifdef USE_MAP", "vec4 texelColor = texture2D( map, vUv );", "#ifdef GAMMA_INPUT", "texelColor.xyz *= texelColor.xyz;", "#endif", "gl_FragColor = gl_FragColor * texelColor;", "#endif" ].join("\n"),
        lightmap_pars_fragment: [ "#ifdef USE_LIGHTMAP", "varying vec2 vUv2;", "uniform sampler2D lightMap;", "#endif" ].join("\n"),
        lightmap_pars_vertex: [ "#ifdef USE_LIGHTMAP", "varying vec2 vUv2;", "#endif" ].join("\n"),
        lightmap_fragment: [ "#ifdef USE_LIGHTMAP", "gl_FragColor = gl_FragColor * texture2D( lightMap, vUv2 );", "#endif" ].join("\n"),
        lightmap_vertex: [ "#ifdef USE_LIGHTMAP", "vUv2 = uv2;", "#endif" ].join("\n"),
        bumpmap_pars_fragment: [ "#ifdef USE_BUMPMAP", "uniform sampler2D bumpMap;", "uniform float bumpScale;", "vec2 dHdxy_fwd() {", "vec2 dSTdx = dFdx( vUv );", "vec2 dSTdy = dFdy( vUv );", "float Hll = bumpScale * texture2D( bumpMap, vUv ).x;", "float dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;", "float dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;", "return vec2( dBx, dBy );", "}", "vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {", "vec3 vSigmaX = dFdx( surf_pos );", "vec3 vSigmaY = dFdy( surf_pos );", "vec3 vN = surf_norm;", "vec3 R1 = cross( vSigmaY, vN );", "vec3 R2 = cross( vN, vSigmaX );", "float fDet = dot( vSigmaX, R1 );", "vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );", "return normalize( abs( fDet ) * surf_norm - vGrad );", "}", "#endif" ].join("\n"),
        normalmap_pars_fragment: [ "#ifdef USE_NORMALMAP", "uniform sampler2D normalMap;", "uniform vec2 normalScale;", "vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {", "vec3 q0 = dFdx( eye_pos.xyz );", "vec3 q1 = dFdy( eye_pos.xyz );", "vec2 st0 = dFdx( vUv.st );", "vec2 st1 = dFdy( vUv.st );", "vec3 S = normalize(  q0 * st1.t - q1 * st0.t );", "vec3 T = normalize( -q0 * st1.s + q1 * st0.s );", "vec3 N = normalize( surf_norm );", "vec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;", "mapN.xy = normalScale * mapN.xy;", "mat3 tsn = mat3( S, T, N );", "return normalize( tsn * mapN );", "}", "#endif" ].join("\n"),
        specularmap_pars_fragment: [ "#ifdef USE_SPECULARMAP", "uniform sampler2D specularMap;", "#endif" ].join("\n"),
        specularmap_fragment: [ "float specularStrength;", "#ifdef USE_SPECULARMAP", "vec4 texelSpecular = texture2D( specularMap, vUv );", "specularStrength = texelSpecular.r;", "#else", "specularStrength = 1.0;", "#endif" ].join("\n"),
        lights_lambert_pars_vertex: [ "uniform vec3 ambient;", "uniform vec3 diffuse;", "uniform vec3 emissive;", "uniform vec3 ambientLightColor;", "#if MAX_DIR_LIGHTS > 0", "uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];", "uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];", "#endif", "#if MAX_HEMI_LIGHTS > 0", "uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];", "uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];", "uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];", "#endif", "#if MAX_POINT_LIGHTS > 0", "uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];", "uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];", "uniform float pointLightDistance[ MAX_POINT_LIGHTS ];", "#endif", "#if MAX_SPOT_LIGHTS > 0", "uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];", "uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];", "uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];", "uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];", "uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];", "uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];", "#endif", "#ifdef WRAP_AROUND", "uniform vec3 wrapRGB;", "#endif" ].join("\n"),
        lights_lambert_vertex: [ "vLightFront = vec3( 0.0 );", "#ifdef DOUBLE_SIDED", "vLightBack = vec3( 0.0 );", "#endif", "transformedNormal = normalize( transformedNormal );", "#if MAX_DIR_LIGHTS > 0", "for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {", "vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );", "vec3 dirVector = normalize( lDirection.xyz );", "float dotProduct = dot( transformedNormal, dirVector );", "vec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );", "#ifdef DOUBLE_SIDED", "vec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );", "#ifdef WRAP_AROUND", "vec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );", "#endif", "#endif", "#ifdef WRAP_AROUND", "vec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );", "directionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );", "#ifdef DOUBLE_SIDED", "directionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );", "#endif", "#endif", "vLightFront += directionalLightColor[ i ] * directionalLightWeighting;", "#ifdef DOUBLE_SIDED", "vLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;", "#endif", "}", "#endif", "#if MAX_POINT_LIGHTS > 0", "for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {", "vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );", "vec3 lVector = lPosition.xyz - mvPosition.xyz;", "float lDistance = 1.0;", "if ( pointLightDistance[ i ] > 0.0 )", "lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );", "lVector = normalize( lVector );", "float dotProduct = dot( transformedNormal, lVector );", "vec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );", "#ifdef DOUBLE_SIDED", "vec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );", "#ifdef WRAP_AROUND", "vec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );", "#endif", "#endif", "#ifdef WRAP_AROUND", "vec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );", "pointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );", "#ifdef DOUBLE_SIDED", "pointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );", "#endif", "#endif", "vLightFront += pointLightColor[ i ] * pointLightWeighting * lDistance;", "#ifdef DOUBLE_SIDED", "vLightBack += pointLightColor[ i ] * pointLightWeightingBack * lDistance;", "#endif", "}", "#endif", "#if MAX_SPOT_LIGHTS > 0", "for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {", "vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );", "vec3 lVector = lPosition.xyz - mvPosition.xyz;", "float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );", "if ( spotEffect > spotLightAngleCos[ i ] ) {", "spotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );", "float lDistance = 1.0;", "if ( spotLightDistance[ i ] > 0.0 )", "lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );", "lVector = normalize( lVector );", "float dotProduct = dot( transformedNormal, lVector );", "vec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );", "#ifdef DOUBLE_SIDED", "vec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );", "#ifdef WRAP_AROUND", "vec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );", "#endif", "#endif", "#ifdef WRAP_AROUND", "vec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );", "spotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );", "#ifdef DOUBLE_SIDED", "spotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );", "#endif", "#endif", "vLightFront += spotLightColor[ i ] * spotLightWeighting * lDistance * spotEffect;", "#ifdef DOUBLE_SIDED", "vLightBack += spotLightColor[ i ] * spotLightWeightingBack * lDistance * spotEffect;", "#endif", "}", "}", "#endif", "#if MAX_HEMI_LIGHTS > 0", "for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {", "vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );", "vec3 lVector = normalize( lDirection.xyz );", "float dotProduct = dot( transformedNormal, lVector );", "float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;", "float hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;", "vLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );", "#ifdef DOUBLE_SIDED", "vLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );", "#endif", "}", "#endif", "vLightFront = vLightFront * diffuse + ambient * ambientLightColor + emissive;", "#ifdef DOUBLE_SIDED", "vLightBack = vLightBack * diffuse + ambient * ambientLightColor + emissive;", "#endif" ].join("\n"),
        lights_phong_pars_vertex: [ "#ifndef PHONG_PER_PIXEL", "#if MAX_POINT_LIGHTS > 0", "uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];", "uniform float pointLightDistance[ MAX_POINT_LIGHTS ];", "varying vec4 vPointLight[ MAX_POINT_LIGHTS ];", "#endif", "#if MAX_SPOT_LIGHTS > 0", "uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];", "uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];", "varying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];", "#endif", "#endif", "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )", "varying vec3 vWorldPosition;", "#endif" ].join("\n"),
        lights_phong_vertex: [ "#ifndef PHONG_PER_PIXEL", "#if MAX_POINT_LIGHTS > 0", "for( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {", "vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );", "vec3 lVector = lPosition.xyz - mvPosition.xyz;", "float lDistance = 1.0;", "if ( pointLightDistance[ i ] > 0.0 )", "lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );", "vPointLight[ i ] = vec4( lVector, lDistance );", "}", "#endif", "#if MAX_SPOT_LIGHTS > 0", "for( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {", "vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );", "vec3 lVector = lPosition.xyz - mvPosition.xyz;", "float lDistance = 1.0;", "if ( spotLightDistance[ i ] > 0.0 )", "lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );", "vSpotLight[ i ] = vec4( lVector, lDistance );", "}", "#endif", "#endif", "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )", "vWorldPosition = worldPosition.xyz;", "#endif" ].join("\n"),
        lights_phong_pars_fragment: [ "uniform vec3 ambientLightColor;", "#if MAX_DIR_LIGHTS > 0", "uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];", "uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];", "#endif", "#if MAX_HEMI_LIGHTS > 0", "uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];", "uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];", "uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];", "#endif", "#if MAX_POINT_LIGHTS > 0", "uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];", "#ifdef PHONG_PER_PIXEL", "uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];", "uniform float pointLightDistance[ MAX_POINT_LIGHTS ];", "#else", "varying vec4 vPointLight[ MAX_POINT_LIGHTS ];", "#endif", "#endif", "#if MAX_SPOT_LIGHTS > 0", "uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];", "uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];", "uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];", "uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];", "uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];", "#ifdef PHONG_PER_PIXEL", "uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];", "#else", "varying vec4 vSpotLight[ MAX_SPOT_LIGHTS ];", "#endif", "#endif", "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP )", "varying vec3 vWorldPosition;", "#endif", "#ifdef WRAP_AROUND", "uniform vec3 wrapRGB;", "#endif", "varying vec3 vViewPosition;", "varying vec3 vNormal;" ].join("\n"),
        lights_phong_fragment: [ "vec3 normal = normalize( vNormal );", "vec3 viewPosition = normalize( vViewPosition );", "#ifdef DOUBLE_SIDED", "normal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );", "#endif", "#ifdef USE_NORMALMAP", "normal = perturbNormal2Arb( -vViewPosition, normal );", "#elif defined( USE_BUMPMAP )", "normal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );", "#endif", "#if MAX_POINT_LIGHTS > 0", "vec3 pointDiffuse  = vec3( 0.0 );", "vec3 pointSpecular = vec3( 0.0 );", "for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {", "#ifdef PHONG_PER_PIXEL", "vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );", "vec3 lVector = lPosition.xyz + vViewPosition.xyz;", "float lDistance = 1.0;", "if ( pointLightDistance[ i ] > 0.0 )", "lDistance = 1.0 - min( ( length( lVector ) / pointLightDistance[ i ] ), 1.0 );", "lVector = normalize( lVector );", "#else", "vec3 lVector = normalize( vPointLight[ i ].xyz );", "float lDistance = vPointLight[ i ].w;", "#endif", "float dotProduct = dot( normal, lVector );", "#ifdef WRAP_AROUND", "float pointDiffuseWeightFull = max( dotProduct, 0.0 );", "float pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );", "vec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );", "#else", "float pointDiffuseWeight = max( dotProduct, 0.0 );", "#endif", "pointDiffuse  += diffuse * pointLightColor[ i ] * pointDiffuseWeight * lDistance;", "vec3 pointHalfVector = normalize( lVector + viewPosition );", "float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );", "float pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );", "#ifdef PHYSICALLY_BASED_SHADING", "float specularNormalization = ( shininess + 2.0001 ) / 8.0;", "vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, pointHalfVector ), 5.0 );", "pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance * specularNormalization;", "#else", "pointSpecular += specular * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * lDistance;", "#endif", "}", "#endif", "#if MAX_SPOT_LIGHTS > 0", "vec3 spotDiffuse  = vec3( 0.0 );", "vec3 spotSpecular = vec3( 0.0 );", "for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {", "#ifdef PHONG_PER_PIXEL", "vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );", "vec3 lVector = lPosition.xyz + vViewPosition.xyz;", "float lDistance = 1.0;", "if ( spotLightDistance[ i ] > 0.0 )", "lDistance = 1.0 - min( ( length( lVector ) / spotLightDistance[ i ] ), 1.0 );", "lVector = normalize( lVector );", "#else", "vec3 lVector = normalize( vSpotLight[ i ].xyz );", "float lDistance = vSpotLight[ i ].w;", "#endif", "float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );", "if ( spotEffect > spotLightAngleCos[ i ] ) {", "spotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );", "float dotProduct = dot( normal, lVector );", "#ifdef WRAP_AROUND", "float spotDiffuseWeightFull = max( dotProduct, 0.0 );", "float spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );", "vec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );", "#else", "float spotDiffuseWeight = max( dotProduct, 0.0 );", "#endif", "spotDiffuse += diffuse * spotLightColor[ i ] * spotDiffuseWeight * lDistance * spotEffect;", "vec3 spotHalfVector = normalize( lVector + viewPosition );", "float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );", "float spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );", "#ifdef PHYSICALLY_BASED_SHADING", "float specularNormalization = ( shininess + 2.0001 ) / 8.0;", "vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, spotHalfVector ), 5.0 );", "spotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * specularNormalization * spotEffect;", "#else", "spotSpecular += specular * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * lDistance * spotEffect;", "#endif", "}", "}", "#endif", "#if MAX_DIR_LIGHTS > 0", "vec3 dirDiffuse  = vec3( 0.0 );", "vec3 dirSpecular = vec3( 0.0 );", "for( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {", "vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );", "vec3 dirVector = normalize( lDirection.xyz );", "float dotProduct = dot( normal, dirVector );", "#ifdef WRAP_AROUND", "float dirDiffuseWeightFull = max( dotProduct, 0.0 );", "float dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );", "vec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );", "#else", "float dirDiffuseWeight = max( dotProduct, 0.0 );", "#endif", "dirDiffuse  += diffuse * directionalLightColor[ i ] * dirDiffuseWeight;", "vec3 dirHalfVector = normalize( dirVector + viewPosition );", "float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );", "float dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );", "#ifdef PHYSICALLY_BASED_SHADING", "float specularNormalization = ( shininess + 2.0001 ) / 8.0;", "vec3 schlick = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );", "dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;", "#else", "dirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight;", "#endif", "}", "#endif", "#if MAX_HEMI_LIGHTS > 0", "vec3 hemiDiffuse  = vec3( 0.0 );", "vec3 hemiSpecular = vec3( 0.0 );", "for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {", "vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );", "vec3 lVector = normalize( lDirection.xyz );", "float dotProduct = dot( normal, lVector );", "float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;", "vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );", "hemiDiffuse += diffuse * hemiColor;", "vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );", "float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;", "float hemiSpecularWeightSky = specularStrength * max( pow( hemiDotNormalHalfSky, shininess ), 0.0 );", "vec3 lVectorGround = -lVector;", "vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );", "float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;", "float hemiSpecularWeightGround = specularStrength * max( pow( hemiDotNormalHalfGround, shininess ), 0.0 );", "#ifdef PHYSICALLY_BASED_SHADING", "float dotProductGround = dot( normal, lVectorGround );", "float specularNormalization = ( shininess + 2.0001 ) / 8.0;", "vec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );", "vec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );", "hemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );", "#else", "hemiSpecular += specular * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;", "#endif", "}", "#endif", "vec3 totalDiffuse = vec3( 0.0 );", "vec3 totalSpecular = vec3( 0.0 );", "#if MAX_DIR_LIGHTS > 0", "totalDiffuse += dirDiffuse;", "totalSpecular += dirSpecular;", "#endif", "#if MAX_HEMI_LIGHTS > 0", "totalDiffuse += hemiDiffuse;", "totalSpecular += hemiSpecular;", "#endif", "#if MAX_POINT_LIGHTS > 0", "totalDiffuse += pointDiffuse;", "totalSpecular += pointSpecular;", "#endif", "#if MAX_SPOT_LIGHTS > 0", "totalDiffuse += spotDiffuse;", "totalSpecular += spotSpecular;", "#endif", "#ifdef METAL", "gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient + totalSpecular );", "#else", "gl_FragColor.xyz = gl_FragColor.xyz * ( emissive + totalDiffuse + ambientLightColor * ambient ) + totalSpecular;", "#endif" ].join("\n"),
        color_pars_fragment: [ "#ifdef USE_COLOR", "varying vec3 vColor;", "#endif" ].join("\n"),
        color_fragment: [ "#ifdef USE_COLOR", "gl_FragColor = gl_FragColor * vec4( vColor, opacity );", "#endif" ].join("\n"),
        color_pars_vertex: [ "#ifdef USE_COLOR", "varying vec3 vColor;", "#endif" ].join("\n"),
        color_vertex: [ "#ifdef USE_COLOR", "#ifdef GAMMA_INPUT", "vColor = color * color;", "#else", "vColor = color;", "#endif", "#endif" ].join("\n"),
        skinning_pars_vertex: [ "#ifdef USE_SKINNING", "#ifdef BONE_TEXTURE", "uniform sampler2D boneTexture;", "mat4 getBoneMatrix( const in float i ) {", "float j = i * 4.0;", "float x = mod( j, N_BONE_PIXEL_X );", "float y = floor( j / N_BONE_PIXEL_X );", "const float dx = 1.0 / N_BONE_PIXEL_X;", "const float dy = 1.0 / N_BONE_PIXEL_Y;", "y = dy * ( y + 0.5 );", "vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );", "vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );", "vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );", "vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );", "mat4 bone = mat4( v1, v2, v3, v4 );", "return bone;", "}", "#else", "uniform mat4 boneGlobalMatrices[ MAX_BONES ];", "mat4 getBoneMatrix( const in float i ) {", "mat4 bone = boneGlobalMatrices[ int(i) ];", "return bone;", "}", "#endif", "#endif" ].join("\n"),
        skinbase_vertex: [ "#ifdef USE_SKINNING", "mat4 boneMatX = getBoneMatrix( skinIndex.x );", "mat4 boneMatY = getBoneMatrix( skinIndex.y );", "#endif" ].join("\n"),
        skinning_vertex: [ "#ifdef USE_SKINNING", "#ifdef USE_MORPHTARGETS", "vec4 skinVertex = vec4( morphed, 1.0 );", "#else", "vec4 skinVertex = vec4( position, 1.0 );", "#endif", "vec4 skinned  = boneMatX * skinVertex * skinWeight.x;", "skinned 	  += boneMatY * skinVertex * skinWeight.y;", "#endif" ].join("\n"),
        morphtarget_pars_vertex: [ "#ifdef USE_MORPHTARGETS", "#ifndef USE_MORPHNORMALS", "uniform float morphTargetInfluences[ 8 ];", "#else", "uniform float morphTargetInfluences[ 4 ];", "#endif", "#endif" ].join("\n"),
        morphtarget_vertex: [ "#ifdef USE_MORPHTARGETS", "vec3 morphed = vec3( 0.0 );", "morphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];", "morphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];", "morphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];", "morphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];", "#ifndef USE_MORPHNORMALS", "morphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];", "morphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];", "morphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];", "morphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];", "#endif", "morphed += position;", "#endif" ].join("\n"),
        default_vertex: [ "vec4 mvPosition;", "#ifdef USE_SKINNING", "mvPosition = modelViewMatrix * skinned;", "#endif", "#if !defined( USE_SKINNING ) && defined( USE_MORPHTARGETS )", "mvPosition = modelViewMatrix * vec4( morphed, 1.0 );", "#endif", "#if !defined( USE_SKINNING ) && ! defined( USE_MORPHTARGETS )", "mvPosition = modelViewMatrix * vec4( position, 1.0 );", "#endif", "gl_Position = projectionMatrix * mvPosition;" ].join("\n"),
        morphnormal_vertex: [ "#ifdef USE_MORPHNORMALS", "vec3 morphedNormal = vec3( 0.0 );", "morphedNormal +=  ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];", "morphedNormal +=  ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];", "morphedNormal +=  ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];", "morphedNormal +=  ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];", "morphedNormal += normal;", "#endif" ].join("\n"),
        skinnormal_vertex: [ "#ifdef USE_SKINNING", "mat4 skinMatrix = skinWeight.x * boneMatX;", "skinMatrix 	+= skinWeight.y * boneMatY;", "#ifdef USE_MORPHNORMALS", "vec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );", "#else", "vec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );", "#endif", "#endif" ].join("\n"),
        defaultnormal_vertex: [ "vec3 objectNormal;", "#ifdef USE_SKINNING", "objectNormal = skinnedNormal.xyz;", "#endif", "#if !defined( USE_SKINNING ) && defined( USE_MORPHNORMALS )", "objectNormal = morphedNormal;", "#endif", "#if !defined( USE_SKINNING ) && ! defined( USE_MORPHNORMALS )", "objectNormal = normal;", "#endif", "#ifdef FLIP_SIDED", "objectNormal = -objectNormal;", "#endif", "vec3 transformedNormal = normalMatrix * objectNormal;" ].join("\n"),
        shadowmap_pars_fragment: [ "#ifdef USE_SHADOWMAP", "uniform sampler2D shadowMap[ MAX_SHADOWS ];", "uniform vec2 shadowMapSize[ MAX_SHADOWS ];", "uniform float shadowDarkness[ MAX_SHADOWS ];", "uniform float shadowBias[ MAX_SHADOWS ];", "varying vec4 vShadowCoord[ MAX_SHADOWS ];", "float unpackDepth( const in vec4 rgba_depth ) {", "const vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );", "float depth = dot( rgba_depth, bit_shift );", "return depth;", "}", "#endif" ].join("\n"),
        shadowmap_fragment: [ "#ifdef USE_SHADOWMAP", "#ifdef SHADOWMAP_DEBUG", "vec3 frustumColors[3];", "frustumColors[0] = vec3( 1.0, 0.5, 0.0 );", "frustumColors[1] = vec3( 0.0, 1.0, 0.8 );", "frustumColors[2] = vec3( 0.0, 0.5, 1.0 );", "#endif", "#ifdef SHADOWMAP_CASCADE", "int inFrustumCount = 0;", "#endif", "float fDepth;", "vec3 shadowColor = vec3( 1.0 );", "for( int i = 0; i < MAX_SHADOWS; i ++ ) {", "vec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;", "bvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );", "bool inFrustum = all( inFrustumVec );", "#ifdef SHADOWMAP_CASCADE", "inFrustumCount += int( inFrustum );", "bvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );", "#else", "bvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );", "#endif", "bool frustumTest = all( frustumTestVec );", "if ( frustumTest ) {", "shadowCoord.z += shadowBias[ i ];", "#if defined( SHADOWMAP_TYPE_PCF )", "float shadow = 0.0;", "const float shadowDelta = 1.0 / 9.0;", "float xPixelOffset = 1.0 / shadowMapSize[ i ].x;", "float yPixelOffset = 1.0 / shadowMapSize[ i ].y;", "float dx0 = -1.25 * xPixelOffset;", "float dy0 = -1.25 * yPixelOffset;", "float dx1 = 1.25 * xPixelOffset;", "float dy1 = 1.25 * yPixelOffset;", "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );", "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;", "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );", "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;", "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );", "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;", "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );", "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;", "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );", "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;", "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );", "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;", "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );", "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;", "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );", "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;", "fDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );", "if ( fDepth < shadowCoord.z ) shadow += shadowDelta;", "shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );", "#elif defined( SHADOWMAP_TYPE_PCF_SOFT )", "float shadow = 0.0;", "float xPixelOffset = 1.0 / shadowMapSize[ i ].x;", "float yPixelOffset = 1.0 / shadowMapSize[ i ].y;", "float dx0 = -1.0 * xPixelOffset;", "float dy0 = -1.0 * yPixelOffset;", "float dx1 = 1.0 * xPixelOffset;", "float dy1 = 1.0 * yPixelOffset;", "mat3 shadowKernel;", "mat3 depthKernel;", "depthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );", "depthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );", "depthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );", "depthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );", "depthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );", "depthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );", "depthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );", "depthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );", "depthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );", "vec3 shadowZ = vec3( shadowCoord.z );", "shadowKernel[0] = vec3(lessThan(depthKernel[0], shadowZ ));", "shadowKernel[0] *= vec3(0.25);", "shadowKernel[1] = vec3(lessThan(depthKernel[1], shadowZ ));", "shadowKernel[1] *= vec3(0.25);", "shadowKernel[2] = vec3(lessThan(depthKernel[2], shadowZ ));", "shadowKernel[2] *= vec3(0.25);", "vec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );", "shadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );", "shadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );", "vec4 shadowValues;", "shadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );", "shadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );", "shadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );", "shadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );", "shadow = dot( shadowValues, vec4( 1.0 ) );", "shadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );", "#else", "vec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );", "float fDepth = unpackDepth( rgbaDepth );", "if ( fDepth < shadowCoord.z )", "shadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );", "#endif", "}", "#ifdef SHADOWMAP_DEBUG", "#ifdef SHADOWMAP_CASCADE", "if ( inFrustum && inFrustumCount == 1 ) gl_FragColor.xyz *= frustumColors[ i ];", "#else", "if ( inFrustum ) gl_FragColor.xyz *= frustumColors[ i ];", "#endif", "#endif", "}", "#ifdef GAMMA_OUTPUT", "shadowColor *= shadowColor;", "#endif", "gl_FragColor.xyz = gl_FragColor.xyz * shadowColor;", "#endif" ].join("\n"),
        shadowmap_pars_vertex: [ "#ifdef USE_SHADOWMAP", "varying vec4 vShadowCoord[ MAX_SHADOWS ];", "uniform mat4 shadowMatrix[ MAX_SHADOWS ];", "#endif" ].join("\n"),
        shadowmap_vertex: [ "#ifdef USE_SHADOWMAP", "for( int i = 0; i < MAX_SHADOWS; i ++ ) {", "vShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;", "}", "#endif" ].join("\n"),
        alphatest_fragment: [ "#ifdef ALPHATEST", "if ( gl_FragColor.a < ALPHATEST ) discard;", "#endif" ].join("\n"),
        linear_to_gamma_fragment: [ "#ifdef GAMMA_OUTPUT", "gl_FragColor.xyz = sqrt( gl_FragColor.xyz );", "#endif" ].join("\n")
    }, v.UniformsUtils = {
        merge: function(a) {
            var b, c, d, e = {};
            for (b = 0; b < a.length; b++) {
                d = this.clone(a[b]);
                for (c in d) e[c] = d[c];
            }
            return e;
        },
        clone: function(a) {
            var b, c, d, e = {};
            for (b in a) {
                e[b] = {};
                for (c in a[b]) d = a[b][c], e[b][c] = d instanceof v.Color || d instanceof v.Vector2 || d instanceof v.Vector3 || d instanceof v.Vector4 || d instanceof v.Matrix4 || d instanceof v.Texture ? d.clone() : d instanceof Array ? d.slice() : d;
            }
            return e;
        }
    }, v.UniformsLib = {
        common: {
            diffuse: {
                type: "c",
                value: new v.Color(15658734)
            },
            opacity: {
                type: "f",
                value: 1
            },
            map: {
                type: "t",
                value: null
            },
            offsetRepeat: {
                type: "v4",
                value: new v.Vector4(0, 0, 1, 1)
            },
            lightMap: {
                type: "t",
                value: null
            },
            specularMap: {
                type: "t",
                value: null
            },
            envMap: {
                type: "t",
                value: null
            },
            flipEnvMap: {
                type: "f",
                value: -1
            },
            useRefract: {
                type: "i",
                value: 0
            },
            reflectivity: {
                type: "f",
                value: 1
            },
            refractionRatio: {
                type: "f",
                value: .98
            },
            combine: {
                type: "i",
                value: 0
            },
            morphTargetInfluences: {
                type: "f",
                value: 0
            }
        },
        bump: {
            bumpMap: {
                type: "t",
                value: null
            },
            bumpScale: {
                type: "f",
                value: 1
            }
        },
        normalmap: {
            normalMap: {
                type: "t",
                value: null
            },
            normalScale: {
                type: "v2",
                value: new v.Vector2(1, 1)
            }
        },
        fog: {
            fogDensity: {
                type: "f",
                value: 25e-5
            },
            fogNear: {
                type: "f",
                value: 1
            },
            fogFar: {
                type: "f",
                value: 2e3
            },
            fogColor: {
                type: "c",
                value: new v.Color(16777215)
            }
        },
        lights: {
            ambientLightColor: {
                type: "fv",
                value: []
            },
            directionalLightDirection: {
                type: "fv",
                value: []
            },
            directionalLightColor: {
                type: "fv",
                value: []
            },
            hemisphereLightDirection: {
                type: "fv",
                value: []
            },
            hemisphereLightSkyColor: {
                type: "fv",
                value: []
            },
            hemisphereLightGroundColor: {
                type: "fv",
                value: []
            },
            pointLightColor: {
                type: "fv",
                value: []
            },
            pointLightPosition: {
                type: "fv",
                value: []
            },
            pointLightDistance: {
                type: "fv1",
                value: []
            },
            spotLightColor: {
                type: "fv",
                value: []
            },
            spotLightPosition: {
                type: "fv",
                value: []
            },
            spotLightDirection: {
                type: "fv",
                value: []
            },
            spotLightDistance: {
                type: "fv1",
                value: []
            },
            spotLightAngleCos: {
                type: "fv1",
                value: []
            },
            spotLightExponent: {
                type: "fv1",
                value: []
            }
        },
        particle: {
            psColor: {
                type: "c",
                value: new v.Color(15658734)
            },
            opacity: {
                type: "f",
                value: 1
            },
            size: {
                type: "f",
                value: 1
            },
            scale: {
                type: "f",
                value: 1
            },
            map: {
                type: "t",
                value: null
            },
            fogDensity: {
                type: "f",
                value: 25e-5
            },
            fogNear: {
                type: "f",
                value: 1
            },
            fogFar: {
                type: "f",
                value: 2e3
            },
            fogColor: {
                type: "c",
                value: new v.Color(16777215)
            }
        },
        shadowmap: {
            shadowMap: {
                type: "tv",
                value: []
            },
            shadowMapSize: {
                type: "v2v",
                value: []
            },
            shadowBias: {
                type: "fv1",
                value: []
            },
            shadowDarkness: {
                type: "fv1",
                value: []
            },
            shadowMatrix: {
                type: "m4v",
                value: []
            }
        }
    }, v.ShaderLib = {
        basic: {
            uniforms: v.UniformsUtils.merge([ v.UniformsLib.common, v.UniformsLib.fog, v.UniformsLib.shadowmap ]),
            vertexShader: [ v.ShaderChunk.map_pars_vertex, v.ShaderChunk.lightmap_pars_vertex, v.ShaderChunk.envmap_pars_vertex, v.ShaderChunk.color_pars_vertex, v.ShaderChunk.morphtarget_pars_vertex, v.ShaderChunk.skinning_pars_vertex, v.ShaderChunk.shadowmap_pars_vertex, "void main() {", v.ShaderChunk.map_vertex, v.ShaderChunk.lightmap_vertex, v.ShaderChunk.color_vertex, v.ShaderChunk.skinbase_vertex, "#ifdef USE_ENVMAP", v.ShaderChunk.morphnormal_vertex, v.ShaderChunk.skinnormal_vertex, v.ShaderChunk.defaultnormal_vertex, "#endif", v.ShaderChunk.morphtarget_vertex, v.ShaderChunk.skinning_vertex, v.ShaderChunk.default_vertex, v.ShaderChunk.worldpos_vertex, v.ShaderChunk.envmap_vertex, v.ShaderChunk.shadowmap_vertex, "}" ].join("\n"),
            fragmentShader: [ "uniform vec3 diffuse;", "uniform float opacity;", v.ShaderChunk.color_pars_fragment, v.ShaderChunk.map_pars_fragment, v.ShaderChunk.lightmap_pars_fragment, v.ShaderChunk.envmap_pars_fragment, v.ShaderChunk.fog_pars_fragment, v.ShaderChunk.shadowmap_pars_fragment, v.ShaderChunk.specularmap_pars_fragment, "void main() {", "gl_FragColor = vec4( diffuse, opacity );", v.ShaderChunk.map_fragment, v.ShaderChunk.alphatest_fragment, v.ShaderChunk.specularmap_fragment, v.ShaderChunk.lightmap_fragment, v.ShaderChunk.color_fragment, v.ShaderChunk.envmap_fragment, v.ShaderChunk.shadowmap_fragment, v.ShaderChunk.linear_to_gamma_fragment, v.ShaderChunk.fog_fragment, "}" ].join("\n")
        },
        lambert: {
            uniforms: v.UniformsUtils.merge([ v.UniformsLib.common, v.UniformsLib.fog, v.UniformsLib.lights, v.UniformsLib.shadowmap, {
                ambient: {
                    type: "c",
                    value: new v.Color(16777215)
                },
                emissive: {
                    type: "c",
                    value: new v.Color(0)
                },
                wrapRGB: {
                    type: "v3",
                    value: new v.Vector3(1, 1, 1)
                }
            } ]),
            vertexShader: [ "#define LAMBERT", "varying vec3 vLightFront;", "#ifdef DOUBLE_SIDED", "varying vec3 vLightBack;", "#endif", v.ShaderChunk.map_pars_vertex, v.ShaderChunk.lightmap_pars_vertex, v.ShaderChunk.envmap_pars_vertex, v.ShaderChunk.lights_lambert_pars_vertex, v.ShaderChunk.color_pars_vertex, v.ShaderChunk.morphtarget_pars_vertex, v.ShaderChunk.skinning_pars_vertex, v.ShaderChunk.shadowmap_pars_vertex, "void main() {", v.ShaderChunk.map_vertex, v.ShaderChunk.lightmap_vertex, v.ShaderChunk.color_vertex, v.ShaderChunk.morphnormal_vertex, v.ShaderChunk.skinbase_vertex, v.ShaderChunk.skinnormal_vertex, v.ShaderChunk.defaultnormal_vertex, v.ShaderChunk.morphtarget_vertex, v.ShaderChunk.skinning_vertex, v.ShaderChunk.default_vertex, v.ShaderChunk.worldpos_vertex, v.ShaderChunk.envmap_vertex, v.ShaderChunk.lights_lambert_vertex, v.ShaderChunk.shadowmap_vertex, "}" ].join("\n"),
            fragmentShader: [ "uniform float opacity;", "varying vec3 vLightFront;", "#ifdef DOUBLE_SIDED", "varying vec3 vLightBack;", "#endif", v.ShaderChunk.color_pars_fragment, v.ShaderChunk.map_pars_fragment, v.ShaderChunk.lightmap_pars_fragment, v.ShaderChunk.envmap_pars_fragment, v.ShaderChunk.fog_pars_fragment, v.ShaderChunk.shadowmap_pars_fragment, v.ShaderChunk.specularmap_pars_fragment, "void main() {", "gl_FragColor = vec4( vec3 ( 1.0 ), opacity );", v.ShaderChunk.map_fragment, v.ShaderChunk.alphatest_fragment, v.ShaderChunk.specularmap_fragment, "#ifdef DOUBLE_SIDED", "if ( gl_FrontFacing )", "gl_FragColor.xyz *= vLightFront;", "else", "gl_FragColor.xyz *= vLightBack;", "#else", "gl_FragColor.xyz *= vLightFront;", "#endif", v.ShaderChunk.lightmap_fragment, v.ShaderChunk.color_fragment, v.ShaderChunk.envmap_fragment, v.ShaderChunk.shadowmap_fragment, v.ShaderChunk.linear_to_gamma_fragment, v.ShaderChunk.fog_fragment, "}" ].join("\n")
        },
        phong: {
            uniforms: v.UniformsUtils.merge([ v.UniformsLib.common, v.UniformsLib.bump, v.UniformsLib.normalmap, v.UniformsLib.fog, v.UniformsLib.lights, v.UniformsLib.shadowmap, {
                ambient: {
                    type: "c",
                    value: new v.Color(16777215)
                },
                emissive: {
                    type: "c",
                    value: new v.Color(0)
                },
                specular: {
                    type: "c",
                    value: new v.Color(1118481)
                },
                shininess: {
                    type: "f",
                    value: 30
                },
                wrapRGB: {
                    type: "v3",
                    value: new v.Vector3(1, 1, 1)
                }
            } ]),
            vertexShader: [ "#define PHONG", "varying vec3 vViewPosition;", "varying vec3 vNormal;", v.ShaderChunk.map_pars_vertex, v.ShaderChunk.lightmap_pars_vertex, v.ShaderChunk.envmap_pars_vertex, v.ShaderChunk.lights_phong_pars_vertex, v.ShaderChunk.color_pars_vertex, v.ShaderChunk.morphtarget_pars_vertex, v.ShaderChunk.skinning_pars_vertex, v.ShaderChunk.shadowmap_pars_vertex, "void main() {", v.ShaderChunk.map_vertex, v.ShaderChunk.lightmap_vertex, v.ShaderChunk.color_vertex, v.ShaderChunk.morphnormal_vertex, v.ShaderChunk.skinbase_vertex, v.ShaderChunk.skinnormal_vertex, v.ShaderChunk.defaultnormal_vertex, "vNormal = normalize( transformedNormal );", v.ShaderChunk.morphtarget_vertex, v.ShaderChunk.skinning_vertex, v.ShaderChunk.default_vertex, "vViewPosition = -mvPosition.xyz;", v.ShaderChunk.worldpos_vertex, v.ShaderChunk.envmap_vertex, v.ShaderChunk.lights_phong_vertex, v.ShaderChunk.shadowmap_vertex, "}" ].join("\n"),
            fragmentShader: [ "uniform vec3 diffuse;", "uniform float opacity;", "uniform vec3 ambient;", "uniform vec3 emissive;", "uniform vec3 specular;", "uniform float shininess;", v.ShaderChunk.color_pars_fragment, v.ShaderChunk.map_pars_fragment, v.ShaderChunk.lightmap_pars_fragment, v.ShaderChunk.envmap_pars_fragment, v.ShaderChunk.fog_pars_fragment, v.ShaderChunk.lights_phong_pars_fragment, v.ShaderChunk.shadowmap_pars_fragment, v.ShaderChunk.bumpmap_pars_fragment, v.ShaderChunk.normalmap_pars_fragment, v.ShaderChunk.specularmap_pars_fragment, "void main() {", "gl_FragColor = vec4( vec3 ( 1.0 ), opacity );", v.ShaderChunk.map_fragment, v.ShaderChunk.alphatest_fragment, v.ShaderChunk.specularmap_fragment, v.ShaderChunk.lights_phong_fragment, v.ShaderChunk.lightmap_fragment, v.ShaderChunk.color_fragment, v.ShaderChunk.envmap_fragment, v.ShaderChunk.shadowmap_fragment, v.ShaderChunk.linear_to_gamma_fragment, v.ShaderChunk.fog_fragment, "}" ].join("\n")
        },
        particle_basic: {
            uniforms: v.UniformsUtils.merge([ v.UniformsLib.particle, v.UniformsLib.shadowmap ]),
            vertexShader: [ "uniform float size;", "uniform float scale;", v.ShaderChunk.color_pars_vertex, v.ShaderChunk.shadowmap_pars_vertex, "void main() {", v.ShaderChunk.color_vertex, "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "#ifdef USE_SIZEATTENUATION", "gl_PointSize = size * ( scale / length( mvPosition.xyz ) );", "#else", "gl_PointSize = size;", "#endif", "gl_Position = projectionMatrix * mvPosition;", v.ShaderChunk.worldpos_vertex, v.ShaderChunk.shadowmap_vertex, "}" ].join("\n"),
            fragmentShader: [ "uniform vec3 psColor;", "uniform float opacity;", v.ShaderChunk.color_pars_fragment, v.ShaderChunk.map_particle_pars_fragment, v.ShaderChunk.fog_pars_fragment, v.ShaderChunk.shadowmap_pars_fragment, "void main() {", "gl_FragColor = vec4( psColor, opacity );", v.ShaderChunk.map_particle_fragment, v.ShaderChunk.alphatest_fragment, v.ShaderChunk.color_fragment, v.ShaderChunk.shadowmap_fragment, v.ShaderChunk.fog_fragment, "}" ].join("\n")
        },
        dashed: {
            uniforms: v.UniformsUtils.merge([ v.UniformsLib.common, v.UniformsLib.fog, {
                scale: {
                    type: "f",
                    value: 1
                },
                dashSize: {
                    type: "f",
                    value: 1
                },
                totalSize: {
                    type: "f",
                    value: 2
                }
            } ]),
            vertexShader: [ "uniform float scale;", "attribute float lineDistance;", "varying float vLineDistance;", v.ShaderChunk.color_pars_vertex, "void main() {", v.ShaderChunk.color_vertex, "vLineDistance = scale * lineDistance;", "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "gl_Position = projectionMatrix * mvPosition;", "}" ].join("\n"),
            fragmentShader: [ "uniform vec3 diffuse;", "uniform float opacity;", "uniform float dashSize;", "uniform float totalSize;", "varying float vLineDistance;", v.ShaderChunk.color_pars_fragment, v.ShaderChunk.fog_pars_fragment, "void main() {", "if ( mod( vLineDistance, totalSize ) > dashSize ) {", "discard;", "}", "gl_FragColor = vec4( diffuse, opacity );", v.ShaderChunk.color_fragment, v.ShaderChunk.fog_fragment, "}" ].join("\n")
        },
        depth: {
            uniforms: {
                mNear: {
                    type: "f",
                    value: 1
                },
                mFar: {
                    type: "f",
                    value: 2e3
                },
                opacity: {
                    type: "f",
                    value: 1
                }
            },
            vertexShader: [ "void main() {", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}" ].join("\n"),
            fragmentShader: [ "uniform float mNear;", "uniform float mFar;", "uniform float opacity;", "void main() {", "float depth = gl_FragCoord.z / gl_FragCoord.w;", "float color = 1.0 - smoothstep( mNear, mFar, depth );", "gl_FragColor = vec4( vec3( color ), opacity );", "}" ].join("\n")
        },
        normal: {
            uniforms: {
                opacity: {
                    type: "f",
                    value: 1
                }
            },
            vertexShader: [ "varying vec3 vNormal;", v.ShaderChunk.morphtarget_pars_vertex, "void main() {", "vNormal = normalize( normalMatrix * normal );", v.ShaderChunk.morphtarget_vertex, v.ShaderChunk.default_vertex, "}" ].join("\n"),
            fragmentShader: [ "uniform float opacity;", "varying vec3 vNormal;", "void main() {", "gl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );", "}" ].join("\n")
        },
        normalmap: {
            uniforms: v.UniformsUtils.merge([ v.UniformsLib.fog, v.UniformsLib.lights, v.UniformsLib.shadowmap, {
                enableAO: {
                    type: "i",
                    value: 0
                },
                enableDiffuse: {
                    type: "i",
                    value: 0
                },
                enableSpecular: {
                    type: "i",
                    value: 0
                },
                enableReflection: {
                    type: "i",
                    value: 0
                },
                enableDisplacement: {
                    type: "i",
                    value: 0
                },
                tDisplacement: {
                    type: "t",
                    value: null
                },
                tDiffuse: {
                    type: "t",
                    value: null
                },
                tCube: {
                    type: "t",
                    value: null
                },
                tNormal: {
                    type: "t",
                    value: null
                },
                tSpecular: {
                    type: "t",
                    value: null
                },
                tAO: {
                    type: "t",
                    value: null
                },
                uNormalScale: {
                    type: "v2",
                    value: new v.Vector2(1, 1)
                },
                uDisplacementBias: {
                    type: "f",
                    value: 0
                },
                uDisplacementScale: {
                    type: "f",
                    value: 1
                },
                uDiffuseColor: {
                    type: "c",
                    value: new v.Color(16777215)
                },
                uSpecularColor: {
                    type: "c",
                    value: new v.Color(1118481)
                },
                uAmbientColor: {
                    type: "c",
                    value: new v.Color(16777215)
                },
                uShininess: {
                    type: "f",
                    value: 30
                },
                uOpacity: {
                    type: "f",
                    value: 1
                },
                useRefract: {
                    type: "i",
                    value: 0
                },
                uRefractionRatio: {
                    type: "f",
                    value: .98
                },
                uReflectivity: {
                    type: "f",
                    value: .5
                },
                uOffset: {
                    type: "v2",
                    value: new v.Vector2(0, 0)
                },
                uRepeat: {
                    type: "v2",
                    value: new v.Vector2(1, 1)
                },
                wrapRGB: {
                    type: "v3",
                    value: new v.Vector3(1, 1, 1)
                }
            } ]),
            fragmentShader: [ "uniform vec3 uAmbientColor;", "uniform vec3 uDiffuseColor;", "uniform vec3 uSpecularColor;", "uniform float uShininess;", "uniform float uOpacity;", "uniform bool enableDiffuse;", "uniform bool enableSpecular;", "uniform bool enableAO;", "uniform bool enableReflection;", "uniform sampler2D tDiffuse;", "uniform sampler2D tNormal;", "uniform sampler2D tSpecular;", "uniform sampler2D tAO;", "uniform samplerCube tCube;", "uniform vec2 uNormalScale;", "uniform bool useRefract;", "uniform float uRefractionRatio;", "uniform float uReflectivity;", "varying vec3 vTangent;", "varying vec3 vBinormal;", "varying vec3 vNormal;", "varying vec2 vUv;", "uniform vec3 ambientLightColor;", "#if MAX_DIR_LIGHTS > 0", "uniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];", "uniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];", "#endif", "#if MAX_HEMI_LIGHTS > 0", "uniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];", "uniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];", "uniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];", "#endif", "#if MAX_POINT_LIGHTS > 0", "uniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];", "uniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];", "uniform float pointLightDistance[ MAX_POINT_LIGHTS ];", "#endif", "#if MAX_SPOT_LIGHTS > 0", "uniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];", "uniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];", "uniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];", "uniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];", "uniform float spotLightExponent[ MAX_SPOT_LIGHTS ];", "uniform float spotLightDistance[ MAX_SPOT_LIGHTS ];", "#endif", "#ifdef WRAP_AROUND", "uniform vec3 wrapRGB;", "#endif", "varying vec3 vWorldPosition;", "varying vec3 vViewPosition;", v.ShaderChunk.shadowmap_pars_fragment, v.ShaderChunk.fog_pars_fragment, "void main() {", "gl_FragColor = vec4( vec3( 1.0 ), uOpacity );", "vec3 specularTex = vec3( 1.0 );", "vec3 normalTex = texture2D( tNormal, vUv ).xyz * 2.0 - 1.0;", "normalTex.xy *= uNormalScale;", "normalTex = normalize( normalTex );", "if( enableDiffuse ) {", "#ifdef GAMMA_INPUT", "vec4 texelColor = texture2D( tDiffuse, vUv );", "texelColor.xyz *= texelColor.xyz;", "gl_FragColor = gl_FragColor * texelColor;", "#else", "gl_FragColor = gl_FragColor * texture2D( tDiffuse, vUv );", "#endif", "}", "if( enableAO ) {", "#ifdef GAMMA_INPUT", "vec4 aoColor = texture2D( tAO, vUv );", "aoColor.xyz *= aoColor.xyz;", "gl_FragColor.xyz = gl_FragColor.xyz * aoColor.xyz;", "#else", "gl_FragColor.xyz = gl_FragColor.xyz * texture2D( tAO, vUv ).xyz;", "#endif", "}", "if( enableSpecular )", "specularTex = texture2D( tSpecular, vUv ).xyz;", "mat3 tsb = mat3( normalize( vTangent ), normalize( vBinormal ), normalize( vNormal ) );", "vec3 finalNormal = tsb * normalTex;", "#ifdef FLIP_SIDED", "finalNormal = -finalNormal;", "#endif", "vec3 normal = normalize( finalNormal );", "vec3 viewPosition = normalize( vViewPosition );", "#if MAX_POINT_LIGHTS > 0", "vec3 pointDiffuse = vec3( 0.0 );", "vec3 pointSpecular = vec3( 0.0 );", "for ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {", "vec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );", "vec3 pointVector = lPosition.xyz + vViewPosition.xyz;", "float pointDistance = 1.0;", "if ( pointLightDistance[ i ] > 0.0 )", "pointDistance = 1.0 - min( ( length( pointVector ) / pointLightDistance[ i ] ), 1.0 );", "pointVector = normalize( pointVector );", "#ifdef WRAP_AROUND", "float pointDiffuseWeightFull = max( dot( normal, pointVector ), 0.0 );", "float pointDiffuseWeightHalf = max( 0.5 * dot( normal, pointVector ) + 0.5, 0.0 );", "vec3 pointDiffuseWeight = mix( vec3 ( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );", "#else", "float pointDiffuseWeight = max( dot( normal, pointVector ), 0.0 );", "#endif", "pointDiffuse += pointDistance * pointLightColor[ i ] * uDiffuseColor * pointDiffuseWeight;", "vec3 pointHalfVector = normalize( pointVector + viewPosition );", "float pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );", "float pointSpecularWeight = specularTex.r * max( pow( pointDotNormalHalf, uShininess ), 0.0 );", "#ifdef PHYSICALLY_BASED_SHADING", "float specularNormalization = ( uShininess + 2.0001 ) / 8.0;", "vec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( pointVector, pointHalfVector ), 5.0 );", "pointSpecular += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * pointDistance * specularNormalization;", "#else", "pointSpecular += pointDistance * pointLightColor[ i ] * uSpecularColor * pointSpecularWeight * pointDiffuseWeight;", "#endif", "}", "#endif", "#if MAX_SPOT_LIGHTS > 0", "vec3 spotDiffuse = vec3( 0.0 );", "vec3 spotSpecular = vec3( 0.0 );", "for ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {", "vec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );", "vec3 spotVector = lPosition.xyz + vViewPosition.xyz;", "float spotDistance = 1.0;", "if ( spotLightDistance[ i ] > 0.0 )", "spotDistance = 1.0 - min( ( length( spotVector ) / spotLightDistance[ i ] ), 1.0 );", "spotVector = normalize( spotVector );", "float spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );", "if ( spotEffect > spotLightAngleCos[ i ] ) {", "spotEffect = max( pow( spotEffect, spotLightExponent[ i ] ), 0.0 );", "#ifdef WRAP_AROUND", "float spotDiffuseWeightFull = max( dot( normal, spotVector ), 0.0 );", "float spotDiffuseWeightHalf = max( 0.5 * dot( normal, spotVector ) + 0.5, 0.0 );", "vec3 spotDiffuseWeight = mix( vec3 ( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );", "#else", "float spotDiffuseWeight = max( dot( normal, spotVector ), 0.0 );", "#endif", "spotDiffuse += spotDistance * spotLightColor[ i ] * uDiffuseColor * spotDiffuseWeight * spotEffect;", "vec3 spotHalfVector = normalize( spotVector + viewPosition );", "float spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );", "float spotSpecularWeight = specularTex.r * max( pow( spotDotNormalHalf, uShininess ), 0.0 );", "#ifdef PHYSICALLY_BASED_SHADING", "float specularNormalization = ( uShininess + 2.0001 ) / 8.0;", "vec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( spotVector, spotHalfVector ), 5.0 );", "spotSpecular += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * spotDistance * specularNormalization * spotEffect;", "#else", "spotSpecular += spotDistance * spotLightColor[ i ] * uSpecularColor * spotSpecularWeight * spotDiffuseWeight * spotEffect;", "#endif", "}", "}", "#endif", "#if MAX_DIR_LIGHTS > 0", "vec3 dirDiffuse = vec3( 0.0 );", "vec3 dirSpecular = vec3( 0.0 );", "for( int i = 0; i < MAX_DIR_LIGHTS; i++ ) {", "vec4 lDirection = viewMatrix * vec4( directionalLightDirection[ i ], 0.0 );", "vec3 dirVector = normalize( lDirection.xyz );", "#ifdef WRAP_AROUND", "float directionalLightWeightingFull = max( dot( normal, dirVector ), 0.0 );", "float directionalLightWeightingHalf = max( 0.5 * dot( normal, dirVector ) + 0.5, 0.0 );", "vec3 dirDiffuseWeight = mix( vec3( directionalLightWeightingFull ), vec3( directionalLightWeightingHalf ), wrapRGB );", "#else", "float dirDiffuseWeight = max( dot( normal, dirVector ), 0.0 );", "#endif", "dirDiffuse += directionalLightColor[ i ] * uDiffuseColor * dirDiffuseWeight;", "vec3 dirHalfVector = normalize( dirVector + viewPosition );", "float dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );", "float dirSpecularWeight = specularTex.r * max( pow( dirDotNormalHalf, uShininess ), 0.0 );", "#ifdef PHYSICALLY_BASED_SHADING", "float specularNormalization = ( uShininess + 2.0001 ) / 8.0;", "vec3 schlick = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( dirVector, dirHalfVector ), 5.0 );", "dirSpecular += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;", "#else", "dirSpecular += directionalLightColor[ i ] * uSpecularColor * dirSpecularWeight * dirDiffuseWeight;", "#endif", "}", "#endif", "#if MAX_HEMI_LIGHTS > 0", "vec3 hemiDiffuse  = vec3( 0.0 );", "vec3 hemiSpecular = vec3( 0.0 );", "for( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {", "vec4 lDirection = viewMatrix * vec4( hemisphereLightDirection[ i ], 0.0 );", "vec3 lVector = normalize( lDirection.xyz );", "float dotProduct = dot( normal, lVector );", "float hemiDiffuseWeight = 0.5 * dotProduct + 0.5;", "vec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );", "hemiDiffuse += uDiffuseColor * hemiColor;", "vec3 hemiHalfVectorSky = normalize( lVector + viewPosition );", "float hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;", "float hemiSpecularWeightSky = specularTex.r * max( pow( hemiDotNormalHalfSky, uShininess ), 0.0 );", "vec3 lVectorGround = -lVector;", "vec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );", "float hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;", "float hemiSpecularWeightGround = specularTex.r * max( pow( hemiDotNormalHalfGround, uShininess ), 0.0 );", "#ifdef PHYSICALLY_BASED_SHADING", "float dotProductGround = dot( normal, lVectorGround );", "float specularNormalization = ( uShininess + 2.0001 ) / 8.0;", "vec3 schlickSky = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVector, hemiHalfVectorSky ), 5.0 );", "vec3 schlickGround = uSpecularColor + vec3( 1.0 - uSpecularColor ) * pow( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 5.0 );", "hemiSpecular += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );", "#else", "hemiSpecular += uSpecularColor * hemiColor * ( hemiSpecularWeightSky + hemiSpecularWeightGround ) * hemiDiffuseWeight;", "#endif", "}", "#endif", "vec3 totalDiffuse = vec3( 0.0 );", "vec3 totalSpecular = vec3( 0.0 );", "#if MAX_DIR_LIGHTS > 0", "totalDiffuse += dirDiffuse;", "totalSpecular += dirSpecular;", "#endif", "#if MAX_HEMI_LIGHTS > 0", "totalDiffuse += hemiDiffuse;", "totalSpecular += hemiSpecular;", "#endif", "#if MAX_POINT_LIGHTS > 0", "totalDiffuse += pointDiffuse;", "totalSpecular += pointSpecular;", "#endif", "#if MAX_SPOT_LIGHTS > 0", "totalDiffuse += spotDiffuse;", "totalSpecular += spotSpecular;", "#endif", "#ifdef METAL", "gl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor + totalSpecular );", "#else", "gl_FragColor.xyz = gl_FragColor.xyz * ( totalDiffuse + ambientLightColor * uAmbientColor ) + totalSpecular;", "#endif", "if ( enableReflection ) {", "vec3 vReflect;", "vec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );", "if ( useRefract ) {", "vReflect = refract( cameraToVertex, normal, uRefractionRatio );", "} else {", "vReflect = reflect( cameraToVertex, normal );", "}", "vec4 cubeColor = textureCube( tCube, vec3( -vReflect.x, vReflect.yz ) );", "#ifdef GAMMA_INPUT", "cubeColor.xyz *= cubeColor.xyz;", "#endif", "gl_FragColor.xyz = mix( gl_FragColor.xyz, cubeColor.xyz, specularTex.r * uReflectivity );", "}", v.ShaderChunk.shadowmap_fragment, v.ShaderChunk.linear_to_gamma_fragment, v.ShaderChunk.fog_fragment, "}" ].join("\n"),
            vertexShader: [ "attribute vec4 tangent;", "uniform vec2 uOffset;", "uniform vec2 uRepeat;", "uniform bool enableDisplacement;", "#ifdef VERTEX_TEXTURES", "uniform sampler2D tDisplacement;", "uniform float uDisplacementScale;", "uniform float uDisplacementBias;", "#endif", "varying vec3 vTangent;", "varying vec3 vBinormal;", "varying vec3 vNormal;", "varying vec2 vUv;", "varying vec3 vWorldPosition;", "varying vec3 vViewPosition;", v.ShaderChunk.skinning_pars_vertex, v.ShaderChunk.shadowmap_pars_vertex, "void main() {", v.ShaderChunk.skinbase_vertex, v.ShaderChunk.skinnormal_vertex, "#ifdef USE_SKINNING", "vNormal = normalize( normalMatrix * skinnedNormal.xyz );", "vec4 skinnedTangent = skinMatrix * vec4( tangent.xyz, 0.0 );", "vTangent = normalize( normalMatrix * skinnedTangent.xyz );", "#else", "vNormal = normalize( normalMatrix * normal );", "vTangent = normalize( normalMatrix * tangent.xyz );", "#endif", "vBinormal = normalize( cross( vNormal, vTangent ) * tangent.w );", "vUv = uv * uRepeat + uOffset;", "vec3 displacedPosition;", "#ifdef VERTEX_TEXTURES", "if ( enableDisplacement ) {", "vec3 dv = texture2D( tDisplacement, uv ).xyz;", "float df = uDisplacementScale * dv.x + uDisplacementBias;", "displacedPosition = position + normalize( normal ) * df;", "} else {", "#ifdef USE_SKINNING", "vec4 skinVertex = vec4( position, 1.0 );", "vec4 skinned  = boneMatX * skinVertex * skinWeight.x;", "skinned 	  += boneMatY * skinVertex * skinWeight.y;", "displacedPosition  = skinned.xyz;", "#else", "displacedPosition = position;", "#endif", "}", "#else", "#ifdef USE_SKINNING", "vec4 skinVertex = vec4( position, 1.0 );", "vec4 skinned  = boneMatX * skinVertex * skinWeight.x;", "skinned 	  += boneMatY * skinVertex * skinWeight.y;", "displacedPosition  = skinned.xyz;", "#else", "displacedPosition = position;", "#endif", "#endif", "vec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );", "vec4 worldPosition = modelMatrix * vec4( displacedPosition, 1.0 );", "gl_Position = projectionMatrix * mvPosition;", "vWorldPosition = worldPosition.xyz;", "vViewPosition = -mvPosition.xyz;", "#ifdef USE_SHADOWMAP", "for( int i = 0; i < MAX_SHADOWS; i ++ ) {", "vShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;", "}", "#endif", "}" ].join("\n")
        },
        cube: {
            uniforms: {
                tCube: {
                    type: "t",
                    value: null
                },
                tFlip: {
                    type: "f",
                    value: -1
                }
            },
            vertexShader: [ "varying vec3 vWorldPosition;", "void main() {", "vec4 worldPosition = modelMatrix * vec4( position, 1.0 );", "vWorldPosition = worldPosition.xyz;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}" ].join("\n"),
            fragmentShader: [ "uniform samplerCube tCube;", "uniform float tFlip;", "varying vec3 vWorldPosition;", "void main() {", "gl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );", "}" ].join("\n")
        },
        depthRGBA: {
            uniforms: {},
            vertexShader: [ v.ShaderChunk.morphtarget_pars_vertex, v.ShaderChunk.skinning_pars_vertex, "void main() {", v.ShaderChunk.skinbase_vertex, v.ShaderChunk.morphtarget_vertex, v.ShaderChunk.skinning_vertex, v.ShaderChunk.default_vertex, "}" ].join("\n"),
            fragmentShader: [ "vec4 pack_depth( const in float depth ) {", "const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );", "const vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );", "vec4 res = fract( depth * bit_shift );", "res -= res.xxyz * bit_mask;", "return res;", "}", "void main() {", "gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );", "}" ].join("\n")
        }
    }, v.WebGLRenderer = function(a) {
        function b(a) {
            a.__webglVertexBuffer = Nb.createBuffer(), a.__webglColorBuffer = Nb.createBuffer(), 
            Sb.info.memory.geometries++;
        }
        function c(a) {
            a.__webglVertexBuffer = Nb.createBuffer(), a.__webglColorBuffer = Nb.createBuffer(), 
            a.__webglLineDistanceBuffer = Nb.createBuffer(), Sb.info.memory.geometries++;
        }
        function d(a) {
            a.__webglVertexBuffer = Nb.createBuffer(), a.__webglColorBuffer = Nb.createBuffer(), 
            a.__webglNormalBuffer = Nb.createBuffer(), Sb.info.memory.geometries++;
        }
        function e(a) {
            a.__webglVertexBuffer = Nb.createBuffer(), a.__webglNormalBuffer = Nb.createBuffer(), 
            a.__webglTangentBuffer = Nb.createBuffer(), a.__webglColorBuffer = Nb.createBuffer(), 
            a.__webglUVBuffer = Nb.createBuffer(), a.__webglUV2Buffer = Nb.createBuffer(), a.__webglSkinIndicesBuffer = Nb.createBuffer(), 
            a.__webglSkinWeightsBuffer = Nb.createBuffer(), a.__webglFaceBuffer = Nb.createBuffer(), 
            a.__webglLineBuffer = Nb.createBuffer();
            var b, c;
            if (a.numMorphTargets) for (a.__webglMorphTargetsBuffers = [], b = 0, c = a.numMorphTargets; c > b; b++) a.__webglMorphTargetsBuffers.push(Nb.createBuffer());
            if (a.numMorphNormals) for (a.__webglMorphNormalsBuffers = [], b = 0, c = a.numMorphNormals; c > b; b++) a.__webglMorphNormalsBuffers.push(Nb.createBuffer());
            Sb.info.memory.geometries++;
        }
        function f(a) {
            if (a.__webglCustomAttributesList) for (var b in a.__webglCustomAttributesList) Nb.deleteBuffer(a.__webglCustomAttributesList[b].buffer);
        }
        function g(a, b) {
            var c = a.vertices.length, d = b.material;
            if (d.attributes) {
                void 0 === a.__webglCustomAttributesList && (a.__webglCustomAttributesList = []);
                for (var e in d.attributes) {
                    var f = d.attributes[e];
                    if (!f.__webglInitialized || f.createUniqueBuffers) {
                        f.__webglInitialized = !0;
                        var g = 1;
                        "v2" === f.type ? g = 2 : "v3" === f.type ? g = 3 : "v4" === f.type ? g = 4 : "c" === f.type && (g = 3), 
                        f.size = g, f.array = new Float32Array(c * g), f.buffer = Nb.createBuffer(), f.buffer.belongsToAttribute = e, 
                        f.needsUpdate = !0;
                    }
                    a.__webglCustomAttributesList.push(f);
                }
            }
        }
        function h(a, b) {
            var c = a.vertices.length;
            a.__vertexArray = new Float32Array(3 * c), a.__colorArray = new Float32Array(3 * c), 
            a.__sortArray = [], a.__webglParticleCount = c, g(a, b);
        }
        function i(a, b) {
            var c = a.vertices.length;
            a.__vertexArray = new Float32Array(3 * c), a.__colorArray = new Float32Array(3 * c), 
            a.__lineDistanceArray = new Float32Array(1 * c), a.__webglLineCount = c, g(a, b);
        }
        function j(a, b) {
            var c = a.vertices.length;
            a.__vertexArray = new Float32Array(3 * c), a.__colorArray = new Float32Array(3 * c), 
            a.__normalArray = new Float32Array(3 * c), a.__webglVertexCount = c, g(a, b);
        }
        function k(a, b) {
            var c = b.geometry, d = a.faces3, e = a.faces4, f = 3 * d.length + 4 * e.length, g = 1 * d.length + 2 * e.length, h = 3 * d.length + 4 * e.length, i = l(b, a), j = p(i), k = n(i), m = o(i);
            a.__vertexArray = new Float32Array(3 * f), k && (a.__normalArray = new Float32Array(3 * f)), 
            c.hasTangents && (a.__tangentArray = new Float32Array(4 * f)), m && (a.__colorArray = new Float32Array(3 * f)), 
            j && ((c.faceUvs.length > 0 || c.faceVertexUvs.length > 0) && (a.__uvArray = new Float32Array(2 * f)), 
            (c.faceUvs.length > 1 || c.faceVertexUvs.length > 1) && (a.__uv2Array = new Float32Array(2 * f))), 
            b.geometry.skinWeights.length && b.geometry.skinIndices.length && (a.__skinIndexArray = new Float32Array(4 * f), 
            a.__skinWeightArray = new Float32Array(4 * f)), a.__faceArray = new Uint16Array(3 * g), 
            a.__lineArray = new Uint16Array(2 * h);
            var q, r;
            if (a.numMorphTargets) for (a.__morphTargetsArrays = [], q = 0, r = a.numMorphTargets; r > q; q++) a.__morphTargetsArrays.push(new Float32Array(3 * f));
            if (a.numMorphNormals) for (a.__morphNormalsArrays = [], q = 0, r = a.numMorphNormals; r > q; q++) a.__morphNormalsArrays.push(new Float32Array(3 * f));
            if (a.__webglFaceCount = 3 * g, a.__webglLineCount = 2 * h, i.attributes) {
                void 0 === a.__webglCustomAttributesList && (a.__webglCustomAttributesList = []);
                for (var s in i.attributes) {
                    var t = i.attributes[s], u = {};
                    for (var v in t) u[v] = t[v];
                    if (!u.__webglInitialized || u.createUniqueBuffers) {
                        u.__webglInitialized = !0;
                        var w = 1;
                        "v2" === u.type ? w = 2 : "v3" === u.type ? w = 3 : "v4" === u.type ? w = 4 : "c" === u.type && (w = 3), 
                        u.size = w, u.array = new Float32Array(f * w), u.buffer = Nb.createBuffer(), u.buffer.belongsToAttribute = s, 
                        t.needsUpdate = !0, u.__original = t;
                    }
                    a.__webglCustomAttributesList.push(u);
                }
            }
            a.__inittedArrays = !0;
        }
        function l(a, b) {
            return a.material instanceof v.MeshFaceMaterial ? a.material.materials[b.materialIndex] : a.material;
        }
        function m(a) {
            return a && void 0 !== a.shading && a.shading === v.SmoothShading;
        }
        function n(a) {
            return a instanceof v.MeshBasicMaterial && !a.envMap || a instanceof v.MeshDepthMaterial ? !1 : m(a) ? v.SmoothShading : v.FlatShading;
        }
        function o(a) {
            return a.vertexColors ? a.vertexColors : !1;
        }
        function p(a) {
            return a.map || a.lightMap || a.bumpMap || a.normalMap || a.specularMap || a instanceof v.ShaderMaterial ? !0 : !1;
        }
        function q(a) {
            var b, c, d;
            for (b in a.attributes) d = "index" === b ? Nb.ELEMENT_ARRAY_BUFFER : Nb.ARRAY_BUFFER, 
            c = a.attributes[b], c.buffer = Nb.createBuffer(), Nb.bindBuffer(d, c.buffer), Nb.bufferData(d, c.array, Nb.STATIC_DRAW);
        }
        function r(a, b, c) {
            var d, e, f, g, h, i, j, k, l, m, n, o, p = a.vertices, q = p.length, r = a.colors, s = r.length, t = a.__vertexArray, u = a.__colorArray, v = a.__sortArray, w = a.verticesNeedUpdate, x = (a.elementsNeedUpdate, 
            a.colorsNeedUpdate), y = a.__webglCustomAttributesList;
            if (c.sortParticles) {
                for (vc.copy(uc), vc.multiply(c.matrixWorld), d = 0; q > d; d++) f = p[d], wc.copy(f), 
                wc.applyProjection(vc), v[d] = [ wc.z, d ];
                for (v.sort(B), d = 0; q > d; d++) f = p[v[d][1]], g = 3 * d, t[g] = f.x, t[g + 1] = f.y, 
                t[g + 2] = f.z;
                for (e = 0; s > e; e++) g = 3 * e, i = r[v[e][1]], u[g] = i.r, u[g + 1] = i.g, u[g + 2] = i.b;
                if (y) for (j = 0, k = y.length; k > j; j++) if (o = y[j], void 0 === o.boundTo || "vertices" === o.boundTo) if (g = 0, 
                m = o.value.length, 1 === o.size) for (l = 0; m > l; l++) h = v[l][1], o.array[l] = o.value[h]; else if (2 === o.size) for (l = 0; m > l; l++) h = v[l][1], 
                n = o.value[h], o.array[g] = n.x, o.array[g + 1] = n.y, g += 2; else if (3 === o.size) if ("c" === o.type) for (l = 0; m > l; l++) h = v[l][1], 
                n = o.value[h], o.array[g] = n.r, o.array[g + 1] = n.g, o.array[g + 2] = n.b, g += 3; else for (l = 0; m > l; l++) h = v[l][1], 
                n = o.value[h], o.array[g] = n.x, o.array[g + 1] = n.y, o.array[g + 2] = n.z, g += 3; else if (4 === o.size) for (l = 0; m > l; l++) h = v[l][1], 
                n = o.value[h], o.array[g] = n.x, o.array[g + 1] = n.y, o.array[g + 2] = n.z, o.array[g + 3] = n.w, 
                g += 4;
            } else {
                if (w) for (d = 0; q > d; d++) f = p[d], g = 3 * d, t[g] = f.x, t[g + 1] = f.y, 
                t[g + 2] = f.z;
                if (x) for (e = 0; s > e; e++) i = r[e], g = 3 * e, u[g] = i.r, u[g + 1] = i.g, 
                u[g + 2] = i.b;
                if (y) for (j = 0, k = y.length; k > j; j++) if (o = y[j], o.needsUpdate && (void 0 === o.boundTo || "vertices" === o.boundTo)) if (m = o.value.length, 
                g = 0, 1 === o.size) for (l = 0; m > l; l++) o.array[l] = o.value[l]; else if (2 === o.size) for (l = 0; m > l; l++) n = o.value[l], 
                o.array[g] = n.x, o.array[g + 1] = n.y, g += 2; else if (3 === o.size) if ("c" === o.type) for (l = 0; m > l; l++) n = o.value[l], 
                o.array[g] = n.r, o.array[g + 1] = n.g, o.array[g + 2] = n.b, g += 3; else for (l = 0; m > l; l++) n = o.value[l], 
                o.array[g] = n.x, o.array[g + 1] = n.y, o.array[g + 2] = n.z, g += 3; else if (4 === o.size) for (l = 0; m > l; l++) n = o.value[l], 
                o.array[g] = n.x, o.array[g + 1] = n.y, o.array[g + 2] = n.z, o.array[g + 3] = n.w, 
                g += 4;
            }
            if ((w || c.sortParticles) && (Nb.bindBuffer(Nb.ARRAY_BUFFER, a.__webglVertexBuffer), 
            Nb.bufferData(Nb.ARRAY_BUFFER, t, b)), (x || c.sortParticles) && (Nb.bindBuffer(Nb.ARRAY_BUFFER, a.__webglColorBuffer), 
            Nb.bufferData(Nb.ARRAY_BUFFER, u, b)), y) for (j = 0, k = y.length; k > j; j++) o = y[j], 
            (o.needsUpdate || c.sortParticles) && (Nb.bindBuffer(Nb.ARRAY_BUFFER, o.buffer), 
            Nb.bufferData(Nb.ARRAY_BUFFER, o.array, b));
        }
        function s(a, b) {
            var c, d, e, f, g, h, i, j, k, l, m, n, o = a.vertices, p = a.colors, q = a.lineDistances, r = o.length, s = p.length, t = q.length, u = a.__vertexArray, v = a.__colorArray, w = a.__lineDistanceArray, x = a.verticesNeedUpdate, y = a.colorsNeedUpdate, z = a.lineDistancesNeedUpdate, A = a.__webglCustomAttributesList;
            if (x) {
                for (c = 0; r > c; c++) f = o[c], g = 3 * c, u[g] = f.x, u[g + 1] = f.y, u[g + 2] = f.z;
                Nb.bindBuffer(Nb.ARRAY_BUFFER, a.__webglVertexBuffer), Nb.bufferData(Nb.ARRAY_BUFFER, u, b);
            }
            if (y) {
                for (d = 0; s > d; d++) h = p[d], g = 3 * d, v[g] = h.r, v[g + 1] = h.g, v[g + 2] = h.b;
                Nb.bindBuffer(Nb.ARRAY_BUFFER, a.__webglColorBuffer), Nb.bufferData(Nb.ARRAY_BUFFER, v, b);
            }
            if (z) {
                for (e = 0; t > e; e++) w[e] = q[e];
                Nb.bindBuffer(Nb.ARRAY_BUFFER, a.__webglLineDistanceBuffer), Nb.bufferData(Nb.ARRAY_BUFFER, w, b);
            }
            if (A) for (i = 0, j = A.length; j > i; i++) if (n = A[i], n.needsUpdate && (void 0 === n.boundTo || "vertices" === n.boundTo)) {
                if (g = 0, l = n.value.length, 1 === n.size) for (k = 0; l > k; k++) n.array[k] = n.value[k]; else if (2 === n.size) for (k = 0; l > k; k++) m = n.value[k], 
                n.array[g] = m.x, n.array[g + 1] = m.y, g += 2; else if (3 === n.size) if ("c" === n.type) for (k = 0; l > k; k++) m = n.value[k], 
                n.array[g] = m.r, n.array[g + 1] = m.g, n.array[g + 2] = m.b, g += 3; else for (k = 0; l > k; k++) m = n.value[k], 
                n.array[g] = m.x, n.array[g + 1] = m.y, n.array[g + 2] = m.z, g += 3; else if (4 === n.size) for (k = 0; l > k; k++) m = n.value[k], 
                n.array[g] = m.x, n.array[g + 1] = m.y, n.array[g + 2] = m.z, n.array[g + 3] = m.w, 
                g += 4;
                Nb.bindBuffer(Nb.ARRAY_BUFFER, n.buffer), Nb.bufferData(Nb.ARRAY_BUFFER, n.array, b);
            }
        }
        function t(a, b) {
            var c, d, e, f, g, h, i, j, k, l, m, n, o, p = a.vertices, q = a.colors, r = a.normals, s = p.length, t = q.length, u = r.length, v = a.__vertexArray, w = a.__colorArray, x = a.__normalArray, y = a.verticesNeedUpdate, z = a.colorsNeedUpdate, A = a.normalsNeedUpdate, B = a.__webglCustomAttributesList;
            if (y) {
                for (c = 0; s > c; c++) f = p[c], g = 3 * c, v[g] = f.x, v[g + 1] = f.y, v[g + 2] = f.z;
                Nb.bindBuffer(Nb.ARRAY_BUFFER, a.__webglVertexBuffer), Nb.bufferData(Nb.ARRAY_BUFFER, v, b);
            }
            if (z) {
                for (d = 0; t > d; d++) h = q[d], g = 3 * d, w[g] = h.r, w[g + 1] = h.g, w[g + 2] = h.b;
                Nb.bindBuffer(Nb.ARRAY_BUFFER, a.__webglColorBuffer), Nb.bufferData(Nb.ARRAY_BUFFER, w, b);
            }
            if (A) {
                for (e = 0; u > e; e++) i = r[e], g = 3 * e, x[g] = i.x, x[g + 1] = i.y, x[g + 2] = i.z;
                Nb.bindBuffer(Nb.ARRAY_BUFFER, a.__webglNormalBuffer), Nb.bufferData(Nb.ARRAY_BUFFER, x, b);
            }
            if (B) for (j = 0, k = B.length; k > j; j++) if (n = B[j], n.needsUpdate && (void 0 === n.boundTo || "vertices" === n.boundTo)) {
                if (g = 0, m = n.value.length, 1 === n.size) for (l = 0; m > l; l++) n.array[l] = n.value[l]; else if (2 === n.size) for (l = 0; m > l; l++) o = n.value[l], 
                n.array[g] = o.x, n.array[g + 1] = o.y, g += 2; else if (3 === n.size) if ("c" === n.type) for (l = 0; m > l; l++) o = n.value[l], 
                n.array[g] = o.r, n.array[g + 1] = o.g, n.array[g + 2] = o.b, g += 3; else for (l = 0; m > l; l++) o = n.value[l], 
                n.array[g] = o.x, n.array[g + 1] = o.y, n.array[g + 2] = o.z, g += 3; else if (4 === n.size) for (l = 0; m > l; l++) o = n.value[l], 
                n.array[g] = o.x, n.array[g + 1] = o.y, n.array[g + 2] = o.z, n.array[g + 3] = o.w, 
                g += 4;
                Nb.bindBuffer(Nb.ARRAY_BUFFER, n.buffer), Nb.bufferData(Nb.ARRAY_BUFFER, n.array, b);
            }
        }
        function u(a, b, c, d, e) {
            if (a.__inittedArrays) {
                var f, g, h, i, j, k, l, m, q, r, s, t, u, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, ab, bb, cb, db = n(e), eb = o(e), fb = p(e), gb = db === v.SmoothShading, hb = 0, ib = 0, jb = 0, kb = 0, lb = 0, mb = 0, nb = 0, ob = 0, pb = 0, qb = 0, rb = 0, sb = 0, tb = 0, ub = a.__vertexArray, vb = a.__uvArray, wb = a.__uv2Array, xb = a.__normalArray, yb = a.__tangentArray, zb = a.__colorArray, Ab = a.__skinIndexArray, Bb = a.__skinWeightArray, Cb = a.__morphTargetsArrays, Db = a.__morphNormalsArrays, Eb = a.__webglCustomAttributesList, Fb = a.__faceArray, Gb = a.__lineArray, Hb = b.geometry, Ib = Hb.verticesNeedUpdate, Jb = Hb.elementsNeedUpdate, Kb = Hb.uvsNeedUpdate, Lb = Hb.normalsNeedUpdate, Mb = Hb.tangentsNeedUpdate, Ob = Hb.colorsNeedUpdate, Pb = Hb.morphTargetsNeedUpdate, Qb = Hb.vertices, Rb = a.faces3, Sb = a.faces4, Tb = Hb.faces, Ub = Hb.faceVertexUvs[0], Vb = Hb.faceVertexUvs[1], Wb = (Hb.colors, 
                Hb.skinIndices), Xb = Hb.skinWeights, Yb = Hb.morphTargets, Zb = Hb.morphNormals;
                if (Ib) {
                    for (f = 0, g = Rb.length; g > f; f++) i = Tb[Rb[f]], t = Qb[i.a], u = Qb[i.b], 
                    w = Qb[i.c], ub[ib] = t.x, ub[ib + 1] = t.y, ub[ib + 2] = t.z, ub[ib + 3] = u.x, 
                    ub[ib + 4] = u.y, ub[ib + 5] = u.z, ub[ib + 6] = w.x, ub[ib + 7] = w.y, ub[ib + 8] = w.z, 
                    ib += 9;
                    for (f = 0, g = Sb.length; g > f; f++) i = Tb[Sb[f]], t = Qb[i.a], u = Qb[i.b], 
                    w = Qb[i.c], x = Qb[i.d], ub[ib] = t.x, ub[ib + 1] = t.y, ub[ib + 2] = t.z, ub[ib + 3] = u.x, 
                    ub[ib + 4] = u.y, ub[ib + 5] = u.z, ub[ib + 6] = w.x, ub[ib + 7] = w.y, ub[ib + 8] = w.z, 
                    ub[ib + 9] = x.x, ub[ib + 10] = x.y, ub[ib + 11] = x.z, ib += 12;
                    Nb.bindBuffer(Nb.ARRAY_BUFFER, a.__webglVertexBuffer), Nb.bufferData(Nb.ARRAY_BUFFER, ub, c);
                }
                if (Pb) for (X = 0, Y = Yb.length; Y > X; X++) {
                    for (rb = 0, f = 0, g = Rb.length; g > f; f++) _ = Rb[f], i = Tb[_], t = Yb[X].vertices[i.a], 
                    u = Yb[X].vertices[i.b], w = Yb[X].vertices[i.c], Z = Cb[X], Z[rb] = t.x, Z[rb + 1] = t.y, 
                    Z[rb + 2] = t.z, Z[rb + 3] = u.x, Z[rb + 4] = u.y, Z[rb + 5] = u.z, Z[rb + 6] = w.x, 
                    Z[rb + 7] = w.y, Z[rb + 8] = w.z, e.morphNormals && (gb ? (ab = Zb[X].vertexNormals[_], 
                    C = ab.a, D = ab.b, E = ab.c) : (C = Zb[X].faceNormals[_], D = C, E = C), $ = Db[X], 
                    $[rb] = C.x, $[rb + 1] = C.y, $[rb + 2] = C.z, $[rb + 3] = D.x, $[rb + 4] = D.y, 
                    $[rb + 5] = D.z, $[rb + 6] = E.x, $[rb + 7] = E.y, $[rb + 8] = E.z), rb += 9;
                    for (f = 0, g = Sb.length; g > f; f++) _ = Sb[f], i = Tb[_], t = Yb[X].vertices[i.a], 
                    u = Yb[X].vertices[i.b], w = Yb[X].vertices[i.c], x = Yb[X].vertices[i.d], Z = Cb[X], 
                    Z[rb] = t.x, Z[rb + 1] = t.y, Z[rb + 2] = t.z, Z[rb + 3] = u.x, Z[rb + 4] = u.y, 
                    Z[rb + 5] = u.z, Z[rb + 6] = w.x, Z[rb + 7] = w.y, Z[rb + 8] = w.z, Z[rb + 9] = x.x, 
                    Z[rb + 10] = x.y, Z[rb + 11] = x.z, e.morphNormals && (gb ? (ab = Zb[X].vertexNormals[_], 
                    C = ab.a, D = ab.b, E = ab.c, F = ab.d) : (C = Zb[X].faceNormals[_], D = C, E = C, 
                    F = C), $ = Db[X], $[rb] = C.x, $[rb + 1] = C.y, $[rb + 2] = C.z, $[rb + 3] = D.x, 
                    $[rb + 4] = D.y, $[rb + 5] = D.z, $[rb + 6] = E.x, $[rb + 7] = E.y, $[rb + 8] = E.z, 
                    $[rb + 9] = F.x, $[rb + 10] = F.y, $[rb + 11] = F.z), rb += 12;
                    Nb.bindBuffer(Nb.ARRAY_BUFFER, a.__webglMorphTargetsBuffers[X]), Nb.bufferData(Nb.ARRAY_BUFFER, Cb[X], c), 
                    e.morphNormals && (Nb.bindBuffer(Nb.ARRAY_BUFFER, a.__webglMorphNormalsBuffers[X]), 
                    Nb.bufferData(Nb.ARRAY_BUFFER, Db[X], c));
                }
                if (Xb.length) {
                    for (f = 0, g = Rb.length; g > f; f++) i = Tb[Rb[f]], K = Xb[i.a], L = Xb[i.b], 
                    M = Xb[i.c], Bb[qb] = K.x, Bb[qb + 1] = K.y, Bb[qb + 2] = K.z, Bb[qb + 3] = K.w, 
                    Bb[qb + 4] = L.x, Bb[qb + 5] = L.y, Bb[qb + 6] = L.z, Bb[qb + 7] = L.w, Bb[qb + 8] = M.x, 
                    Bb[qb + 9] = M.y, Bb[qb + 10] = M.z, Bb[qb + 11] = M.w, O = Wb[i.a], P = Wb[i.b], 
                    Q = Wb[i.c], Ab[qb] = O.x, Ab[qb + 1] = O.y, Ab[qb + 2] = O.z, Ab[qb + 3] = O.w, 
                    Ab[qb + 4] = P.x, Ab[qb + 5] = P.y, Ab[qb + 6] = P.z, Ab[qb + 7] = P.w, Ab[qb + 8] = Q.x, 
                    Ab[qb + 9] = Q.y, Ab[qb + 10] = Q.z, Ab[qb + 11] = Q.w, qb += 12;
                    for (f = 0, g = Sb.length; g > f; f++) i = Tb[Sb[f]], K = Xb[i.a], L = Xb[i.b], 
                    M = Xb[i.c], N = Xb[i.d], Bb[qb] = K.x, Bb[qb + 1] = K.y, Bb[qb + 2] = K.z, Bb[qb + 3] = K.w, 
                    Bb[qb + 4] = L.x, Bb[qb + 5] = L.y, Bb[qb + 6] = L.z, Bb[qb + 7] = L.w, Bb[qb + 8] = M.x, 
                    Bb[qb + 9] = M.y, Bb[qb + 10] = M.z, Bb[qb + 11] = M.w, Bb[qb + 12] = N.x, Bb[qb + 13] = N.y, 
                    Bb[qb + 14] = N.z, Bb[qb + 15] = N.w, O = Wb[i.a], P = Wb[i.b], Q = Wb[i.c], R = Wb[i.d], 
                    Ab[qb] = O.x, Ab[qb + 1] = O.y, Ab[qb + 2] = O.z, Ab[qb + 3] = O.w, Ab[qb + 4] = P.x, 
                    Ab[qb + 5] = P.y, Ab[qb + 6] = P.z, Ab[qb + 7] = P.w, Ab[qb + 8] = Q.x, Ab[qb + 9] = Q.y, 
                    Ab[qb + 10] = Q.z, Ab[qb + 11] = Q.w, Ab[qb + 12] = R.x, Ab[qb + 13] = R.y, Ab[qb + 14] = R.z, 
                    Ab[qb + 15] = R.w, qb += 16;
                    qb > 0 && (Nb.bindBuffer(Nb.ARRAY_BUFFER, a.__webglSkinIndicesBuffer), Nb.bufferData(Nb.ARRAY_BUFFER, Ab, c), 
                    Nb.bindBuffer(Nb.ARRAY_BUFFER, a.__webglSkinWeightsBuffer), Nb.bufferData(Nb.ARRAY_BUFFER, Bb, c));
                }
                if (Ob && eb) {
                    for (f = 0, g = Rb.length; g > f; f++) i = Tb[Rb[f]], l = i.vertexColors, m = i.color, 
                    3 === l.length && eb === v.VertexColors ? (G = l[0], H = l[1], I = l[2]) : (G = m, 
                    H = m, I = m), zb[pb] = G.r, zb[pb + 1] = G.g, zb[pb + 2] = G.b, zb[pb + 3] = H.r, 
                    zb[pb + 4] = H.g, zb[pb + 5] = H.b, zb[pb + 6] = I.r, zb[pb + 7] = I.g, zb[pb + 8] = I.b, 
                    pb += 9;
                    for (f = 0, g = Sb.length; g > f; f++) i = Tb[Sb[f]], l = i.vertexColors, m = i.color, 
                    4 === l.length && eb === v.VertexColors ? (G = l[0], H = l[1], I = l[2], J = l[3]) : (G = m, 
                    H = m, I = m, J = m), zb[pb] = G.r, zb[pb + 1] = G.g, zb[pb + 2] = G.b, zb[pb + 3] = H.r, 
                    zb[pb + 4] = H.g, zb[pb + 5] = H.b, zb[pb + 6] = I.r, zb[pb + 7] = I.g, zb[pb + 8] = I.b, 
                    zb[pb + 9] = J.r, zb[pb + 10] = J.g, zb[pb + 11] = J.b, pb += 12;
                    pb > 0 && (Nb.bindBuffer(Nb.ARRAY_BUFFER, a.__webglColorBuffer), Nb.bufferData(Nb.ARRAY_BUFFER, zb, c));
                }
                if (Mb && Hb.hasTangents) {
                    for (f = 0, g = Rb.length; g > f; f++) i = Tb[Rb[f]], q = i.vertexTangents, y = q[0], 
                    z = q[1], A = q[2], yb[nb] = y.x, yb[nb + 1] = y.y, yb[nb + 2] = y.z, yb[nb + 3] = y.w, 
                    yb[nb + 4] = z.x, yb[nb + 5] = z.y, yb[nb + 6] = z.z, yb[nb + 7] = z.w, yb[nb + 8] = A.x, 
                    yb[nb + 9] = A.y, yb[nb + 10] = A.z, yb[nb + 11] = A.w, nb += 12;
                    for (f = 0, g = Sb.length; g > f; f++) i = Tb[Sb[f]], q = i.vertexTangents, y = q[0], 
                    z = q[1], A = q[2], B = q[3], yb[nb] = y.x, yb[nb + 1] = y.y, yb[nb + 2] = y.z, 
                    yb[nb + 3] = y.w, yb[nb + 4] = z.x, yb[nb + 5] = z.y, yb[nb + 6] = z.z, yb[nb + 7] = z.w, 
                    yb[nb + 8] = A.x, yb[nb + 9] = A.y, yb[nb + 10] = A.z, yb[nb + 11] = A.w, yb[nb + 12] = B.x, 
                    yb[nb + 13] = B.y, yb[nb + 14] = B.z, yb[nb + 15] = B.w, nb += 16;
                    Nb.bindBuffer(Nb.ARRAY_BUFFER, a.__webglTangentBuffer), Nb.bufferData(Nb.ARRAY_BUFFER, yb, c);
                }
                if (Lb && db) {
                    for (f = 0, g = Rb.length; g > f; f++) if (i = Tb[Rb[f]], j = i.vertexNormals, k = i.normal, 
                    3 === j.length && gb) for (S = 0; 3 > S; S++) U = j[S], xb[mb] = U.x, xb[mb + 1] = U.y, 
                    xb[mb + 2] = U.z, mb += 3; else for (S = 0; 3 > S; S++) xb[mb] = k.x, xb[mb + 1] = k.y, 
                    xb[mb + 2] = k.z, mb += 3;
                    for (f = 0, g = Sb.length; g > f; f++) if (i = Tb[Sb[f]], j = i.vertexNormals, k = i.normal, 
                    4 === j.length && gb) for (S = 0; 4 > S; S++) U = j[S], xb[mb] = U.x, xb[mb + 1] = U.y, 
                    xb[mb + 2] = U.z, mb += 3; else for (S = 0; 4 > S; S++) xb[mb] = k.x, xb[mb + 1] = k.y, 
                    xb[mb + 2] = k.z, mb += 3;
                    Nb.bindBuffer(Nb.ARRAY_BUFFER, a.__webglNormalBuffer), Nb.bufferData(Nb.ARRAY_BUFFER, xb, c);
                }
                if (Kb && Ub && fb) {
                    for (f = 0, g = Rb.length; g > f; f++) if (h = Rb[f], r = Ub[h], void 0 !== r) for (S = 0; 3 > S; S++) V = r[S], 
                    vb[jb] = V.x, vb[jb + 1] = V.y, jb += 2;
                    for (f = 0, g = Sb.length; g > f; f++) if (h = Sb[f], r = Ub[h], void 0 !== r) for (S = 0; 4 > S; S++) V = r[S], 
                    vb[jb] = V.x, vb[jb + 1] = V.y, jb += 2;
                    jb > 0 && (Nb.bindBuffer(Nb.ARRAY_BUFFER, a.__webglUVBuffer), Nb.bufferData(Nb.ARRAY_BUFFER, vb, c));
                }
                if (Kb && Vb && fb) {
                    for (f = 0, g = Rb.length; g > f; f++) if (h = Rb[f], s = Vb[h], void 0 !== s) for (S = 0; 3 > S; S++) W = s[S], 
                    wb[kb] = W.x, wb[kb + 1] = W.y, kb += 2;
                    for (f = 0, g = Sb.length; g > f; f++) if (h = Sb[f], s = Vb[h], void 0 !== s) for (S = 0; 4 > S; S++) W = s[S], 
                    wb[kb] = W.x, wb[kb + 1] = W.y, kb += 2;
                    kb > 0 && (Nb.bindBuffer(Nb.ARRAY_BUFFER, a.__webglUV2Buffer), Nb.bufferData(Nb.ARRAY_BUFFER, wb, c));
                }
                if (Jb) {
                    for (f = 0, g = Rb.length; g > f; f++) Fb[lb] = hb, Fb[lb + 1] = hb + 1, Fb[lb + 2] = hb + 2, 
                    lb += 3, Gb[ob] = hb, Gb[ob + 1] = hb + 1, Gb[ob + 2] = hb, Gb[ob + 3] = hb + 2, 
                    Gb[ob + 4] = hb + 1, Gb[ob + 5] = hb + 2, ob += 6, hb += 3;
                    for (f = 0, g = Sb.length; g > f; f++) Fb[lb] = hb, Fb[lb + 1] = hb + 1, Fb[lb + 2] = hb + 3, 
                    Fb[lb + 3] = hb + 1, Fb[lb + 4] = hb + 2, Fb[lb + 5] = hb + 3, lb += 6, Gb[ob] = hb, 
                    Gb[ob + 1] = hb + 1, Gb[ob + 2] = hb, Gb[ob + 3] = hb + 3, Gb[ob + 4] = hb + 1, 
                    Gb[ob + 5] = hb + 2, Gb[ob + 6] = hb + 2, Gb[ob + 7] = hb + 3, ob += 8, hb += 4;
                    Nb.bindBuffer(Nb.ELEMENT_ARRAY_BUFFER, a.__webglFaceBuffer), Nb.bufferData(Nb.ELEMENT_ARRAY_BUFFER, Fb, c), 
                    Nb.bindBuffer(Nb.ELEMENT_ARRAY_BUFFER, a.__webglLineBuffer), Nb.bufferData(Nb.ELEMENT_ARRAY_BUFFER, Gb, c);
                }
                if (Eb) for (S = 0, T = Eb.length; T > S; S++) if (cb = Eb[S], cb.__original.needsUpdate) {
                    if (sb = 0, tb = 0, 1 === cb.size) {
                        if (void 0 === cb.boundTo || "vertices" === cb.boundTo) {
                            for (f = 0, g = Rb.length; g > f; f++) i = Tb[Rb[f]], cb.array[sb] = cb.value[i.a], 
                            cb.array[sb + 1] = cb.value[i.b], cb.array[sb + 2] = cb.value[i.c], sb += 3;
                            for (f = 0, g = Sb.length; g > f; f++) i = Tb[Sb[f]], cb.array[sb] = cb.value[i.a], 
                            cb.array[sb + 1] = cb.value[i.b], cb.array[sb + 2] = cb.value[i.c], cb.array[sb + 3] = cb.value[i.d], 
                            sb += 4;
                        } else if ("faces" === cb.boundTo) {
                            for (f = 0, g = Rb.length; g > f; f++) bb = cb.value[Rb[f]], cb.array[sb] = bb, 
                            cb.array[sb + 1] = bb, cb.array[sb + 2] = bb, sb += 3;
                            for (f = 0, g = Sb.length; g > f; f++) bb = cb.value[Sb[f]], cb.array[sb] = bb, 
                            cb.array[sb + 1] = bb, cb.array[sb + 2] = bb, cb.array[sb + 3] = bb, sb += 4;
                        }
                    } else if (2 === cb.size) {
                        if (void 0 === cb.boundTo || "vertices" === cb.boundTo) {
                            for (f = 0, g = Rb.length; g > f; f++) i = Tb[Rb[f]], t = cb.value[i.a], u = cb.value[i.b], 
                            w = cb.value[i.c], cb.array[sb] = t.x, cb.array[sb + 1] = t.y, cb.array[sb + 2] = u.x, 
                            cb.array[sb + 3] = u.y, cb.array[sb + 4] = w.x, cb.array[sb + 5] = w.y, sb += 6;
                            for (f = 0, g = Sb.length; g > f; f++) i = Tb[Sb[f]], t = cb.value[i.a], u = cb.value[i.b], 
                            w = cb.value[i.c], x = cb.value[i.d], cb.array[sb] = t.x, cb.array[sb + 1] = t.y, 
                            cb.array[sb + 2] = u.x, cb.array[sb + 3] = u.y, cb.array[sb + 4] = w.x, cb.array[sb + 5] = w.y, 
                            cb.array[sb + 6] = x.x, cb.array[sb + 7] = x.y, sb += 8;
                        } else if ("faces" === cb.boundTo) {
                            for (f = 0, g = Rb.length; g > f; f++) bb = cb.value[Rb[f]], t = bb, u = bb, w = bb, 
                            cb.array[sb] = t.x, cb.array[sb + 1] = t.y, cb.array[sb + 2] = u.x, cb.array[sb + 3] = u.y, 
                            cb.array[sb + 4] = w.x, cb.array[sb + 5] = w.y, sb += 6;
                            for (f = 0, g = Sb.length; g > f; f++) bb = cb.value[Sb[f]], t = bb, u = bb, w = bb, 
                            x = bb, cb.array[sb] = t.x, cb.array[sb + 1] = t.y, cb.array[sb + 2] = u.x, cb.array[sb + 3] = u.y, 
                            cb.array[sb + 4] = w.x, cb.array[sb + 5] = w.y, cb.array[sb + 6] = x.x, cb.array[sb + 7] = x.y, 
                            sb += 8;
                        }
                    } else if (3 === cb.size) {
                        var $b;
                        if ($b = "c" === cb.type ? [ "r", "g", "b" ] : [ "x", "y", "z" ], void 0 === cb.boundTo || "vertices" === cb.boundTo) {
                            for (f = 0, g = Rb.length; g > f; f++) i = Tb[Rb[f]], t = cb.value[i.a], u = cb.value[i.b], 
                            w = cb.value[i.c], cb.array[sb] = t[$b[0]], cb.array[sb + 1] = t[$b[1]], cb.array[sb + 2] = t[$b[2]], 
                            cb.array[sb + 3] = u[$b[0]], cb.array[sb + 4] = u[$b[1]], cb.array[sb + 5] = u[$b[2]], 
                            cb.array[sb + 6] = w[$b[0]], cb.array[sb + 7] = w[$b[1]], cb.array[sb + 8] = w[$b[2]], 
                            sb += 9;
                            for (f = 0, g = Sb.length; g > f; f++) i = Tb[Sb[f]], t = cb.value[i.a], u = cb.value[i.b], 
                            w = cb.value[i.c], x = cb.value[i.d], cb.array[sb] = t[$b[0]], cb.array[sb + 1] = t[$b[1]], 
                            cb.array[sb + 2] = t[$b[2]], cb.array[sb + 3] = u[$b[0]], cb.array[sb + 4] = u[$b[1]], 
                            cb.array[sb + 5] = u[$b[2]], cb.array[sb + 6] = w[$b[0]], cb.array[sb + 7] = w[$b[1]], 
                            cb.array[sb + 8] = w[$b[2]], cb.array[sb + 9] = x[$b[0]], cb.array[sb + 10] = x[$b[1]], 
                            cb.array[sb + 11] = x[$b[2]], sb += 12;
                        } else if ("faces" === cb.boundTo) {
                            for (f = 0, g = Rb.length; g > f; f++) bb = cb.value[Rb[f]], t = bb, u = bb, w = bb, 
                            cb.array[sb] = t[$b[0]], cb.array[sb + 1] = t[$b[1]], cb.array[sb + 2] = t[$b[2]], 
                            cb.array[sb + 3] = u[$b[0]], cb.array[sb + 4] = u[$b[1]], cb.array[sb + 5] = u[$b[2]], 
                            cb.array[sb + 6] = w[$b[0]], cb.array[sb + 7] = w[$b[1]], cb.array[sb + 8] = w[$b[2]], 
                            sb += 9;
                            for (f = 0, g = Sb.length; g > f; f++) bb = cb.value[Sb[f]], t = bb, u = bb, w = bb, 
                            x = bb, cb.array[sb] = t[$b[0]], cb.array[sb + 1] = t[$b[1]], cb.array[sb + 2] = t[$b[2]], 
                            cb.array[sb + 3] = u[$b[0]], cb.array[sb + 4] = u[$b[1]], cb.array[sb + 5] = u[$b[2]], 
                            cb.array[sb + 6] = w[$b[0]], cb.array[sb + 7] = w[$b[1]], cb.array[sb + 8] = w[$b[2]], 
                            cb.array[sb + 9] = x[$b[0]], cb.array[sb + 10] = x[$b[1]], cb.array[sb + 11] = x[$b[2]], 
                            sb += 12;
                        } else if ("faceVertices" === cb.boundTo) {
                            for (f = 0, g = Rb.length; g > f; f++) bb = cb.value[Rb[f]], t = bb[0], u = bb[1], 
                            w = bb[2], cb.array[sb] = t[$b[0]], cb.array[sb + 1] = t[$b[1]], cb.array[sb + 2] = t[$b[2]], 
                            cb.array[sb + 3] = u[$b[0]], cb.array[sb + 4] = u[$b[1]], cb.array[sb + 5] = u[$b[2]], 
                            cb.array[sb + 6] = w[$b[0]], cb.array[sb + 7] = w[$b[1]], cb.array[sb + 8] = w[$b[2]], 
                            sb += 9;
                            for (f = 0, g = Sb.length; g > f; f++) bb = cb.value[Sb[f]], t = bb[0], u = bb[1], 
                            w = bb[2], x = bb[3], cb.array[sb] = t[$b[0]], cb.array[sb + 1] = t[$b[1]], cb.array[sb + 2] = t[$b[2]], 
                            cb.array[sb + 3] = u[$b[0]], cb.array[sb + 4] = u[$b[1]], cb.array[sb + 5] = u[$b[2]], 
                            cb.array[sb + 6] = w[$b[0]], cb.array[sb + 7] = w[$b[1]], cb.array[sb + 8] = w[$b[2]], 
                            cb.array[sb + 9] = x[$b[0]], cb.array[sb + 10] = x[$b[1]], cb.array[sb + 11] = x[$b[2]], 
                            sb += 12;
                        }
                    } else if (4 === cb.size) if (void 0 === cb.boundTo || "vertices" === cb.boundTo) {
                        for (f = 0, g = Rb.length; g > f; f++) i = Tb[Rb[f]], t = cb.value[i.a], u = cb.value[i.b], 
                        w = cb.value[i.c], cb.array[sb] = t.x, cb.array[sb + 1] = t.y, cb.array[sb + 2] = t.z, 
                        cb.array[sb + 3] = t.w, cb.array[sb + 4] = u.x, cb.array[sb + 5] = u.y, cb.array[sb + 6] = u.z, 
                        cb.array[sb + 7] = u.w, cb.array[sb + 8] = w.x, cb.array[sb + 9] = w.y, cb.array[sb + 10] = w.z, 
                        cb.array[sb + 11] = w.w, sb += 12;
                        for (f = 0, g = Sb.length; g > f; f++) i = Tb[Sb[f]], t = cb.value[i.a], u = cb.value[i.b], 
                        w = cb.value[i.c], x = cb.value[i.d], cb.array[sb] = t.x, cb.array[sb + 1] = t.y, 
                        cb.array[sb + 2] = t.z, cb.array[sb + 3] = t.w, cb.array[sb + 4] = u.x, cb.array[sb + 5] = u.y, 
                        cb.array[sb + 6] = u.z, cb.array[sb + 7] = u.w, cb.array[sb + 8] = w.x, cb.array[sb + 9] = w.y, 
                        cb.array[sb + 10] = w.z, cb.array[sb + 11] = w.w, cb.array[sb + 12] = x.x, cb.array[sb + 13] = x.y, 
                        cb.array[sb + 14] = x.z, cb.array[sb + 15] = x.w, sb += 16;
                    } else if ("faces" === cb.boundTo) {
                        for (f = 0, g = Rb.length; g > f; f++) bb = cb.value[Rb[f]], t = bb, u = bb, w = bb, 
                        cb.array[sb] = t.x, cb.array[sb + 1] = t.y, cb.array[sb + 2] = t.z, cb.array[sb + 3] = t.w, 
                        cb.array[sb + 4] = u.x, cb.array[sb + 5] = u.y, cb.array[sb + 6] = u.z, cb.array[sb + 7] = u.w, 
                        cb.array[sb + 8] = w.x, cb.array[sb + 9] = w.y, cb.array[sb + 10] = w.z, cb.array[sb + 11] = w.w, 
                        sb += 12;
                        for (f = 0, g = Sb.length; g > f; f++) bb = cb.value[Sb[f]], t = bb, u = bb, w = bb, 
                        x = bb, cb.array[sb] = t.x, cb.array[sb + 1] = t.y, cb.array[sb + 2] = t.z, cb.array[sb + 3] = t.w, 
                        cb.array[sb + 4] = u.x, cb.array[sb + 5] = u.y, cb.array[sb + 6] = u.z, cb.array[sb + 7] = u.w, 
                        cb.array[sb + 8] = w.x, cb.array[sb + 9] = w.y, cb.array[sb + 10] = w.z, cb.array[sb + 11] = w.w, 
                        cb.array[sb + 12] = x.x, cb.array[sb + 13] = x.y, cb.array[sb + 14] = x.z, cb.array[sb + 15] = x.w, 
                        sb += 16;
                    } else if ("faceVertices" === cb.boundTo) {
                        for (f = 0, g = Rb.length; g > f; f++) bb = cb.value[Rb[f]], t = bb[0], u = bb[1], 
                        w = bb[2], cb.array[sb] = t.x, cb.array[sb + 1] = t.y, cb.array[sb + 2] = t.z, cb.array[sb + 3] = t.w, 
                        cb.array[sb + 4] = u.x, cb.array[sb + 5] = u.y, cb.array[sb + 6] = u.z, cb.array[sb + 7] = u.w, 
                        cb.array[sb + 8] = w.x, cb.array[sb + 9] = w.y, cb.array[sb + 10] = w.z, cb.array[sb + 11] = w.w, 
                        sb += 12;
                        for (f = 0, g = Sb.length; g > f; f++) bb = cb.value[Sb[f]], t = bb[0], u = bb[1], 
                        w = bb[2], x = bb[3], cb.array[sb] = t.x, cb.array[sb + 1] = t.y, cb.array[sb + 2] = t.z, 
                        cb.array[sb + 3] = t.w, cb.array[sb + 4] = u.x, cb.array[sb + 5] = u.y, cb.array[sb + 6] = u.z, 
                        cb.array[sb + 7] = u.w, cb.array[sb + 8] = w.x, cb.array[sb + 9] = w.y, cb.array[sb + 10] = w.z, 
                        cb.array[sb + 11] = w.w, cb.array[sb + 12] = x.x, cb.array[sb + 13] = x.y, cb.array[sb + 14] = x.z, 
                        cb.array[sb + 15] = x.w, sb += 16;
                    }
                    Nb.bindBuffer(Nb.ARRAY_BUFFER, cb.buffer), Nb.bufferData(Nb.ARRAY_BUFFER, cb.array, c);
                }
                d && (delete a.__inittedArrays, delete a.__colorArray, delete a.__normalArray, delete a.__tangentArray, 
                delete a.__uvArray, delete a.__uv2Array, delete a.__faceArray, delete a.__vertexArray, 
                delete a.__lineArray, delete a.__skinIndexArray, delete a.__skinWeightArray);
            }
        }
        function w(a, b, c) {
            var d, e, f = a.attributes;
            for (d in f) e = f[d], e.needsUpdate && ("index" === d ? (Nb.bindBuffer(Nb.ELEMENT_ARRAY_BUFFER, e.buffer), 
            Nb.bufferData(Nb.ELEMENT_ARRAY_BUFFER, e.array, b)) : (Nb.bindBuffer(Nb.ARRAY_BUFFER, e.buffer), 
            Nb.bufferData(Nb.ARRAY_BUFFER, e.array, b)), e.needsUpdate = !1), c && !e.dynamic && delete e.array;
        }
        function x(a) {
            sc[a] || (Nb.enableVertexAttribArray(a), sc[a] = !0);
        }
        function y() {
            for (var a in sc) sc[a] && (Nb.disableVertexAttribArray(a), sc[a] = !1);
        }
        function z(a, b, c) {
            var d = a.program.attributes;
            if (-1 !== c.morphTargetBase && d.position >= 0 ? (Nb.bindBuffer(Nb.ARRAY_BUFFER, b.__webglMorphTargetsBuffers[c.morphTargetBase]), 
            x(d.position), Nb.vertexAttribPointer(d.position, 3, Nb.FLOAT, !1, 0, 0)) : d.position >= 0 && (Nb.bindBuffer(Nb.ARRAY_BUFFER, b.__webglVertexBuffer), 
            x(d.position), Nb.vertexAttribPointer(d.position, 3, Nb.FLOAT, !1, 0, 0)), c.morphTargetForcedOrder.length) for (var e = 0, f = c.morphTargetForcedOrder, g = c.morphTargetInfluences; e < a.numSupportedMorphTargets && e < f.length; ) d["morphTarget" + e] >= 0 && (Nb.bindBuffer(Nb.ARRAY_BUFFER, b.__webglMorphTargetsBuffers[f[e]]), 
            x(d["morphTarget" + e]), Nb.vertexAttribPointer(d["morphTarget" + e], 3, Nb.FLOAT, !1, 0, 0)), 
            d["morphNormal" + e] >= 0 && a.morphNormals && (Nb.bindBuffer(Nb.ARRAY_BUFFER, b.__webglMorphNormalsBuffers[f[e]]), 
            x(d["morphNormal" + e]), Nb.vertexAttribPointer(d["morphNormal" + e], 3, Nb.FLOAT, !1, 0, 0)), 
            c.__webglMorphTargetInfluences[e] = g[f[e]], e++; else {
                var h, i, j = [], g = c.morphTargetInfluences, k = g.length;
                for (i = 0; k > i; i++) h = g[i], h > 0 && j.push([ h, i ]);
                j.length > a.numSupportedMorphTargets ? (j.sort(B), j.length = a.numSupportedMorphTargets) : j.length > a.numSupportedMorphNormals ? j.sort(B) : 0 === j.length && j.push([ 0, 0 ]);
                for (var l, e = 0; e < a.numSupportedMorphTargets; ) j[e] ? (l = j[e][1], d["morphTarget" + e] >= 0 && (Nb.bindBuffer(Nb.ARRAY_BUFFER, b.__webglMorphTargetsBuffers[l]), 
                x(d["morphTarget" + e]), Nb.vertexAttribPointer(d["morphTarget" + e], 3, Nb.FLOAT, !1, 0, 0)), 
                d["morphNormal" + e] >= 0 && a.morphNormals && (Nb.bindBuffer(Nb.ARRAY_BUFFER, b.__webglMorphNormalsBuffers[l]), 
                x(d["morphNormal" + e]), Nb.vertexAttribPointer(d["morphNormal" + e], 3, Nb.FLOAT, !1, 0, 0)), 
                c.__webglMorphTargetInfluences[e] = g[l]) : c.__webglMorphTargetInfluences[e] = 0, 
                e++;
            }
            null !== a.program.uniforms.morphTargetInfluences && Nb.uniform1fv(a.program.uniforms.morphTargetInfluences, c.__webglMorphTargetInfluences);
        }
        function A(a, b) {
            return a.z !== b.z ? b.z - a.z : a.id - b.id;
        }
        function B(a, b) {
            return b[0] - a[0];
        }
        function C(a, b, c) {
            if (a.length) for (var d = 0, e = a.length; e > d; d++) Vb = null, Zb = null, cc = -1, 
            gc = -1, hc = -1, ac = -1, bc = -1, Yb = -1, Xb = -1, yc = !0, a[d].render(b, c, qc, rc), 
            Vb = null, Zb = null, cc = -1, gc = -1, hc = -1, ac = -1, bc = -1, Yb = -1, Xb = -1, 
            yc = !0;
        }
        function D(a, b, c, d, e, f, g, h) {
            var i, j, k, l, m, n, o;
            b ? (m = a.length - 1, n = -1, o = -1) : (m = 0, n = a.length, o = 1);
            for (var p = m; p !== n; p += o) if (i = a[p], i.render) {
                if (j = i.object, k = i.buffer, h) l = h; else {
                    if (l = i[c], !l) continue;
                    g && Sb.setBlending(l.blending, l.blendEquation, l.blendSrc, l.blendDst), Sb.setDepthTest(l.depthTest), 
                    Sb.setDepthWrite(l.depthWrite), ib(l.polygonOffset, l.polygonOffsetFactor, l.polygonOffsetUnits);
                }
                Sb.setMaterialFaces(l), k instanceof v.BufferGeometry ? Sb.renderBufferDirect(d, e, f, l, k, j) : Sb.renderBuffer(d, e, f, l, k, j);
            }
        }
        function E(a, b, c, d, e, f, g) {
            for (var h, i, j, k = 0, l = a.length; l > k; k++) if (h = a[k], i = h.object, i.visible) {
                if (g) j = g; else {
                    if (j = h[b], !j) continue;
                    f && Sb.setBlending(j.blending, j.blendEquation, j.blendSrc, j.blendDst), Sb.setDepthTest(j.depthTest), 
                    Sb.setDepthWrite(j.depthWrite), ib(j.polygonOffset, j.polygonOffsetFactor, j.polygonOffsetUnits);
                }
                Sb.renderImmediateObject(c, d, e, j, i);
            }
        }
        function F(a) {
            var b = a.object, c = b.material;
            c.transparent ? (a.transparent = c, a.opaque = null) : (a.opaque = c, a.transparent = null);
        }
        function G(a) {
            var b, c, d, e = a.object, f = a.buffer;
            d = e.material, d instanceof v.MeshFaceMaterial ? (c = f.materialIndex, b = d.materials[c], 
            b.transparent ? (a.transparent = b, a.opaque = null) : (a.opaque = b, a.transparent = null)) : (b = d, 
            b && (b.transparent ? (a.transparent = b, a.opaque = null) : (a.opaque = b, a.transparent = null)));
        }
        function H(a, b) {
            var c, d, e, f, g, h, i = {}, j = a.morphTargets.length, k = a.morphNormals.length, l = b instanceof v.MeshFaceMaterial;
            for (a.geometryGroups = {}, c = 0, d = a.faces.length; d > c; c++) e = a.faces[c], 
            f = l ? e.materialIndex : 0, void 0 === i[f] && (i[f] = {
                hash: f,
                counter: 0
            }), h = i[f].hash + "_" + i[f].counter, void 0 === a.geometryGroups[h] && (a.geometryGroups[h] = {
                faces3: [],
                faces4: [],
                materialIndex: f,
                vertices: 0,
                numMorphTargets: j,
                numMorphNormals: k
            }), g = e instanceof v.Face3 ? 3 : 4, a.geometryGroups[h].vertices + g > 65535 && (i[f].counter += 1, 
            h = i[f].hash + "_" + i[f].counter, void 0 === a.geometryGroups[h] && (a.geometryGroups[h] = {
                faces3: [],
                faces4: [],
                materialIndex: f,
                vertices: 0,
                numMorphTargets: j,
                numMorphNormals: k
            })), e instanceof v.Face3 ? a.geometryGroups[h].faces3.push(c) : a.geometryGroups[h].faces4.push(c), 
            a.geometryGroups[h].vertices += g;
            a.geometryGroupsList = [];
            for (var m in a.geometryGroups) a.geometryGroups[m].id = $b++, a.geometryGroupsList.push(a.geometryGroups[m]);
        }
        function I(a, f) {
            var g, l, m, n;
            if (void 0 === a.__webglInit) if (a.__webglInit = !0, a._modelViewMatrix = new v.Matrix4(), 
            a._normalMatrix = new v.Matrix3(), void 0 !== a.geometry && void 0 === a.geometry.__webglInit && (a.geometry.__webglInit = !0, 
            a.geometry.addEventListener("dispose", Mc)), l = a.geometry, void 0 === l) ; else if (l instanceof v.BufferGeometry) q(l); else if (a instanceof v.Mesh) {
                m = a.material, void 0 === l.geometryGroups && H(l, m);
                for (g in l.geometryGroups) n = l.geometryGroups[g], n.__webglVertexBuffer || (e(n), 
                k(n, a), l.verticesNeedUpdate = !0, l.morphTargetsNeedUpdate = !0, l.elementsNeedUpdate = !0, 
                l.uvsNeedUpdate = !0, l.normalsNeedUpdate = !0, l.tangentsNeedUpdate = !0, l.colorsNeedUpdate = !0);
            } else a instanceof v.Ribbon ? l.__webglVertexBuffer || (d(l), j(l, a), l.verticesNeedUpdate = !0, 
            l.colorsNeedUpdate = !0, l.normalsNeedUpdate = !0) : a instanceof v.Line ? l.__webglVertexBuffer || (c(l), 
            i(l, a), l.verticesNeedUpdate = !0, l.colorsNeedUpdate = !0, l.lineDistancesNeedUpdate = !0) : a instanceof v.ParticleSystem && (l.__webglVertexBuffer || (b(l), 
            h(l, a), l.verticesNeedUpdate = !0, l.colorsNeedUpdate = !0));
            if (void 0 === a.__webglActive) {
                if (a instanceof v.Mesh) {
                    if (l = a.geometry, l instanceof v.BufferGeometry) J(f.__webglObjects, l, a); else if (l instanceof v.Geometry) for (g in l.geometryGroups) n = l.geometryGroups[g], 
                    J(f.__webglObjects, n, a);
                } else a instanceof v.Ribbon || a instanceof v.Line || a instanceof v.ParticleSystem ? (l = a.geometry, 
                J(f.__webglObjects, l, a)) : a instanceof v.ImmediateRenderObject || a.immediateRenderCallback ? K(f.__webglObjectsImmediate, a) : a instanceof v.Sprite ? f.__webglSprites.push(a) : a instanceof v.LensFlare && f.__webglFlares.push(a);
                a.__webglActive = !0;
            }
        }
        function J(a, b, c) {
            a.push({
                buffer: b,
                object: c,
                opaque: null,
                transparent: null
            });
        }
        function K(a, b) {
            a.push({
                object: b,
                opaque: null,
                transparent: null
            });
        }
        function L(a) {
            var b, c, d, e = a.geometry;
            if (e instanceof v.BufferGeometry) w(e, Nb.DYNAMIC_DRAW, !e.dynamic); else if (a instanceof v.Mesh) {
                for (var f = 0, g = e.geometryGroupsList.length; g > f; f++) b = e.geometryGroupsList[f], 
                d = l(a, b), e.buffersNeedUpdate && k(b, a), c = d.attributes && M(d), (e.verticesNeedUpdate || e.morphTargetsNeedUpdate || e.elementsNeedUpdate || e.uvsNeedUpdate || e.normalsNeedUpdate || e.colorsNeedUpdate || e.tangentsNeedUpdate || c) && u(b, a, Nb.DYNAMIC_DRAW, !e.dynamic, d);
                e.verticesNeedUpdate = !1, e.morphTargetsNeedUpdate = !1, e.elementsNeedUpdate = !1, 
                e.uvsNeedUpdate = !1, e.normalsNeedUpdate = !1, e.colorsNeedUpdate = !1, e.tangentsNeedUpdate = !1, 
                e.buffersNeedUpdate = !1, d.attributes && N(d);
            } else a instanceof v.Ribbon ? (d = l(a, e), c = d.attributes && M(d), (e.verticesNeedUpdate || e.colorsNeedUpdate || e.normalsNeedUpdate || c) && t(e, Nb.DYNAMIC_DRAW), 
            e.verticesNeedUpdate = !1, e.colorsNeedUpdate = !1, e.normalsNeedUpdate = !1, d.attributes && N(d)) : a instanceof v.Line ? (d = l(a, e), 
            c = d.attributes && M(d), (e.verticesNeedUpdate || e.colorsNeedUpdate || e.lineDistancesNeedUpdate || c) && s(e, Nb.DYNAMIC_DRAW), 
            e.verticesNeedUpdate = !1, e.colorsNeedUpdate = !1, e.lineDistancesNeedUpdate = !1, 
            d.attributes && N(d)) : a instanceof v.ParticleSystem && (d = l(a, e), c = d.attributes && M(d), 
            (e.verticesNeedUpdate || e.colorsNeedUpdate || a.sortParticles || c) && r(e, Nb.DYNAMIC_DRAW, a), 
            e.verticesNeedUpdate = !1, e.colorsNeedUpdate = !1, d.attributes && N(d));
        }
        function M(a) {
            for (var b in a.attributes) if (a.attributes[b].needsUpdate) return !0;
            return !1;
        }
        function N(a) {
            for (var b in a.attributes) a.attributes[b].needsUpdate = !1;
        }
        function O(a, b) {
            a instanceof v.Mesh || a instanceof v.ParticleSystem || a instanceof v.Ribbon || a instanceof v.Line ? P(b.__webglObjects, a) : a instanceof v.Sprite ? Q(b.__webglSprites, a) : a instanceof v.LensFlare ? Q(b.__webglFlares, a) : (a instanceof v.ImmediateRenderObject || a.immediateRenderCallback) && P(b.__webglObjectsImmediate, a), 
            delete a.__webglActive;
        }
        function P(a, b) {
            for (var c = a.length - 1; c >= 0; c--) a[c].object === b && a.splice(c, 1);
        }
        function Q(a, b) {
            for (var c = a.length - 1; c >= 0; c--) a[c] === b && a.splice(c, 1);
        }
        function R(a, b) {
            a.uniforms = v.UniformsUtils.clone(b.uniforms), a.vertexShader = b.vertexShader, 
            a.fragmentShader = b.fragmentShader;
        }
        function S(a, b, c, d, e) {
            _b = 0, d.needsUpdate && (d.program && Tc(d), Sb.initMaterial(d, b, c, e), d.needsUpdate = !1), 
            d.morphTargets && (e.__webglMorphTargetInfluences || (e.__webglMorphTargetInfluences = new Float32Array(Sb.maxMorphTargets)));
            var f = !1, g = d.program, h = g.uniforms, i = d.uniforms;
            if (g !== Vb && (Nb.useProgram(g), Vb = g, f = !0), d.id !== Xb && (Xb = d.id, f = !0), 
            (f || a !== Zb) && (Nb.uniformMatrix4fv(h.projectionMatrix, !1, a.projectionMatrix.elements), 
            a !== Zb && (Zb = a)), d.skinning) if (Fc && e.useVertexTexture) {
                if (null !== h.boneTexture) {
                    var j = bb();
                    Nb.uniform1i(h.boneTexture, j), Sb.setTexture(e.boneTexture, j);
                }
            } else null !== h.boneGlobalMatrices && Nb.uniformMatrix4fv(h.boneGlobalMatrices, !1, e.boneMatrices);
            return f && (c && d.fog && X(i, c), (d instanceof v.MeshPhongMaterial || d instanceof v.MeshLambertMaterial || d.lights) && (yc && (gb(g, b), 
            yc = !1), $(i, zc)), (d instanceof v.MeshBasicMaterial || d instanceof v.MeshLambertMaterial || d instanceof v.MeshPhongMaterial) && T(i, d), 
            d instanceof v.LineBasicMaterial ? U(i, d) : d instanceof v.LineDashedMaterial ? (U(i, d), 
            V(i, d)) : d instanceof v.ParticleBasicMaterial ? W(i, d) : d instanceof v.MeshPhongMaterial ? Y(i, d) : d instanceof v.MeshLambertMaterial ? Z(i, d) : d instanceof v.MeshDepthMaterial ? (i.mNear.value = a.near, 
            i.mFar.value = a.far, i.opacity.value = d.opacity) : d instanceof v.MeshNormalMaterial && (i.opacity.value = d.opacity), 
            e.receiveShadow && !d._shadowPass && _(i, b), cb(g, d.uniformsList), (d instanceof v.ShaderMaterial || d instanceof v.MeshPhongMaterial || d.envMap) && null !== h.cameraPosition && (wc.getPositionFromMatrix(a.matrixWorld), 
            Nb.uniform3f(h.cameraPosition, wc.x, wc.y, wc.z)), (d instanceof v.MeshPhongMaterial || d instanceof v.MeshLambertMaterial || d instanceof v.ShaderMaterial || d.skinning) && null !== h.viewMatrix && Nb.uniformMatrix4fv(h.viewMatrix, !1, a.matrixWorldInverse.elements)), 
            ab(h, e), null !== h.modelMatrix && Nb.uniformMatrix4fv(h.modelMatrix, !1, e.matrixWorld.elements), 
            g;
        }
        function T(a, b) {
            a.opacity.value = b.opacity, Sb.gammaInput ? a.diffuse.value.copyGammaToLinear(b.color) : a.diffuse.value = b.color, 
            a.map.value = b.map, a.lightMap.value = b.lightMap, a.specularMap.value = b.specularMap, 
            b.bumpMap && (a.bumpMap.value = b.bumpMap, a.bumpScale.value = b.bumpScale), b.normalMap && (a.normalMap.value = b.normalMap, 
            a.normalScale.value.copy(b.normalScale));
            var c;
            if (b.map ? c = b.map : b.specularMap ? c = b.specularMap : b.normalMap ? c = b.normalMap : b.bumpMap && (c = b.bumpMap), 
            void 0 !== c) {
                var d = c.offset, e = c.repeat;
                a.offsetRepeat.value.set(d.x, d.y, e.x, e.y);
            }
            a.envMap.value = b.envMap, a.flipEnvMap.value = b.envMap instanceof v.WebGLRenderTargetCube ? 1 : -1, 
            a.reflectivity.value = Sb.gammaInput ? b.reflectivity : b.reflectivity, a.refractionRatio.value = b.refractionRatio, 
            a.combine.value = b.combine, a.useRefract.value = b.envMap && b.envMap.mapping instanceof v.CubeRefractionMapping;
        }
        function U(a, b) {
            a.diffuse.value = b.color, a.opacity.value = b.opacity;
        }
        function V(a, b) {
            a.dashSize.value = b.dashSize, a.totalSize.value = b.dashSize + b.gapSize, a.scale.value = b.scale;
        }
        function W(a, b) {
            a.psColor.value = b.color, a.opacity.value = b.opacity, a.size.value = b.size, a.scale.value = Eb.height / 2, 
            a.map.value = b.map;
        }
        function X(a, b) {
            a.fogColor.value = b.color, b instanceof v.Fog ? (a.fogNear.value = b.near, a.fogFar.value = b.far) : b instanceof v.FogExp2 && (a.fogDensity.value = b.density);
        }
        function Y(a, b) {
            a.shininess.value = b.shininess, Sb.gammaInput ? (a.ambient.value.copyGammaToLinear(b.ambient), 
            a.emissive.value.copyGammaToLinear(b.emissive), a.specular.value.copyGammaToLinear(b.specular)) : (a.ambient.value = b.ambient, 
            a.emissive.value = b.emissive, a.specular.value = b.specular), b.wrapAround && a.wrapRGB.value.copy(b.wrapRGB);
        }
        function Z(a, b) {
            Sb.gammaInput ? (a.ambient.value.copyGammaToLinear(b.ambient), a.emissive.value.copyGammaToLinear(b.emissive)) : (a.ambient.value = b.ambient, 
            a.emissive.value = b.emissive), b.wrapAround && a.wrapRGB.value.copy(b.wrapRGB);
        }
        function $(a, b) {
            a.ambientLightColor.value = b.ambient, a.directionalLightColor.value = b.directional.colors, 
            a.directionalLightDirection.value = b.directional.positions, a.pointLightColor.value = b.point.colors, 
            a.pointLightPosition.value = b.point.positions, a.pointLightDistance.value = b.point.distances, 
            a.spotLightColor.value = b.spot.colors, a.spotLightPosition.value = b.spot.positions, 
            a.spotLightDistance.value = b.spot.distances, a.spotLightDirection.value = b.spot.directions, 
            a.spotLightAngleCos.value = b.spot.anglesCos, a.spotLightExponent.value = b.spot.exponents, 
            a.hemisphereLightSkyColor.value = b.hemi.skyColors, a.hemisphereLightGroundColor.value = b.hemi.groundColors, 
            a.hemisphereLightDirection.value = b.hemi.positions;
        }
        function _(a, b) {
            if (a.shadowMatrix) for (var c = 0, d = 0, e = b.length; e > d; d++) {
                var f = b[d];
                f.castShadow && (f instanceof v.SpotLight || f instanceof v.DirectionalLight && !f.shadowCascade) && (a.shadowMap.value[c] = f.shadowMap, 
                a.shadowMapSize.value[c] = f.shadowMapSize, a.shadowMatrix.value[c] = f.shadowMatrix, 
                a.shadowDarkness.value[c] = f.shadowDarkness, a.shadowBias.value[c] = f.shadowBias, 
                c++);
            }
        }
        function ab(a, b) {
            Nb.uniformMatrix4fv(a.modelViewMatrix, !1, b._modelViewMatrix.elements), a.normalMatrix && Nb.uniformMatrix3fv(a.normalMatrix, !1, b._normalMatrix.elements);
        }
        function bb() {
            var a = _b;
            return a >= Ac && console.warn("WebGLRenderer: trying to use " + a + " texture units while this GPU supports only " + Ac), 
            _b += 1, a;
        }
        function cb(a, b) {
            var c, d, e, f, g, h, i, j, k, l, m;
            for (k = 0, l = b.length; l > k; k++) if (f = a.uniforms[b[k][1]]) if (c = b[k][0], 
            e = c.type, d = c.value, "i" === e) Nb.uniform1i(f, d); else if ("f" === e) Nb.uniform1f(f, d); else if ("v2" === e) Nb.uniform2f(f, d.x, d.y); else if ("v3" === e) Nb.uniform3f(f, d.x, d.y, d.z); else if ("v4" === e) Nb.uniform4f(f, d.x, d.y, d.z, d.w); else if ("c" === e) Nb.uniform3f(f, d.r, d.g, d.b); else if ("iv1" === e) Nb.uniform1iv(f, d); else if ("iv" === e) Nb.uniform3iv(f, d); else if ("fv1" === e) Nb.uniform1fv(f, d); else if ("fv" === e) Nb.uniform3fv(f, d); else if ("v2v" === e) {
                for (void 0 === c._array && (c._array = new Float32Array(2 * d.length)), i = 0, 
                j = d.length; j > i; i++) m = 2 * i, c._array[m] = d[i].x, c._array[m + 1] = d[i].y;
                Nb.uniform2fv(f, c._array);
            } else if ("v3v" === e) {
                for (void 0 === c._array && (c._array = new Float32Array(3 * d.length)), i = 0, 
                j = d.length; j > i; i++) m = 3 * i, c._array[m] = d[i].x, c._array[m + 1] = d[i].y, 
                c._array[m + 2] = d[i].z;
                Nb.uniform3fv(f, c._array);
            } else if ("v4v" === e) {
                for (void 0 === c._array && (c._array = new Float32Array(4 * d.length)), i = 0, 
                j = d.length; j > i; i++) m = 4 * i, c._array[m] = d[i].x, c._array[m + 1] = d[i].y, 
                c._array[m + 2] = d[i].z, c._array[m + 3] = d[i].w;
                Nb.uniform4fv(f, c._array);
            } else if ("m4" === e) void 0 === c._array && (c._array = new Float32Array(16)), 
            d.flattenToArray(c._array), Nb.uniformMatrix4fv(f, !1, c._array); else if ("m4v" === e) {
                for (void 0 === c._array && (c._array = new Float32Array(16 * d.length)), i = 0, 
                j = d.length; j > i; i++) d[i].flattenToArrayOffset(c._array, 16 * i);
                Nb.uniformMatrix4fv(f, !1, c._array);
            } else if ("t" === e) {
                if (g = d, h = bb(), Nb.uniform1i(f, h), !g) continue;
                g.image instanceof Array && 6 === g.image.length ? sb(g, h) : g instanceof v.WebGLRenderTargetCube ? tb(g, h) : Sb.setTexture(g, h);
            } else if ("tv" === e) {
                for (void 0 === c._array && (c._array = []), i = 0, j = c.value.length; j > i; i++) c._array[i] = bb();
                for (Nb.uniform1iv(f, c._array), i = 0, j = c.value.length; j > i; i++) g = c.value[i], 
                h = c._array[i], g && Sb.setTexture(g, h);
            }
        }
        function db(a, b) {
            a._modelViewMatrix.multiplyMatrices(b.matrixWorldInverse, a.matrixWorld), a._normalMatrix.getNormalMatrix(a._modelViewMatrix);
        }
        function eb(a, b, c, d) {
            a[b] = c.r * c.r * d, a[b + 1] = c.g * c.g * d, a[b + 2] = c.b * c.b * d;
        }
        function fb(a, b, c, d) {
            a[b] = c.r * d, a[b + 1] = c.g * d, a[b + 2] = c.b * d;
        }
        function gb(a, b) {
            var c, d, e, f, g, h, i, j, k, l = 0, m = 0, n = 0, o = zc, p = o.directional.colors, q = o.directional.positions, r = o.point.colors, s = o.point.positions, t = o.point.distances, u = o.spot.colors, w = o.spot.positions, x = o.spot.distances, y = o.spot.directions, z = o.spot.anglesCos, A = o.spot.exponents, B = o.hemi.skyColors, C = o.hemi.groundColors, D = o.hemi.positions, E = 0, F = 0, G = 0, H = 0, I = 0, J = 0, K = 0, L = 0, M = 0, N = 0, O = 0, P = 0;
            for (c = 0, d = b.length; d > c; c++) if (e = b[c], !e.onlyShadow) if (f = e.color, 
            i = e.intensity, k = e.distance, e instanceof v.AmbientLight) {
                if (!e.visible) continue;
                Sb.gammaInput ? (l += f.r * f.r, m += f.g * f.g, n += f.b * f.b) : (l += f.r, m += f.g, 
                n += f.b);
            } else if (e instanceof v.DirectionalLight) {
                if (I += 1, !e.visible) continue;
                if (xc.getPositionFromMatrix(e.matrixWorld), wc.getPositionFromMatrix(e.target.matrixWorld), 
                xc.sub(wc), xc.normalize(), 0 === xc.x && 0 === xc.y && 0 === xc.z) continue;
                M = 3 * E, q[M] = xc.x, q[M + 1] = xc.y, q[M + 2] = xc.z, Sb.gammaInput ? eb(p, M, f, i * i) : fb(p, M, f, i), 
                E += 1;
            } else if (e instanceof v.PointLight) {
                if (J += 1, !e.visible) continue;
                N = 3 * F, Sb.gammaInput ? eb(r, N, f, i * i) : fb(r, N, f, i), wc.getPositionFromMatrix(e.matrixWorld), 
                s[N] = wc.x, s[N + 1] = wc.y, s[N + 2] = wc.z, t[F] = k, F += 1;
            } else if (e instanceof v.SpotLight) {
                if (K += 1, !e.visible) continue;
                O = 3 * G, Sb.gammaInput ? eb(u, O, f, i * i) : fb(u, O, f, i), wc.getPositionFromMatrix(e.matrixWorld), 
                w[O] = wc.x, w[O + 1] = wc.y, w[O + 2] = wc.z, x[G] = k, xc.copy(wc), wc.getPositionFromMatrix(e.target.matrixWorld), 
                xc.sub(wc), xc.normalize(), y[O] = xc.x, y[O + 1] = xc.y, y[O + 2] = xc.z, z[G] = Math.cos(e.angle), 
                A[G] = e.exponent, G += 1;
            } else if (e instanceof v.HemisphereLight) {
                if (L += 1, !e.visible) continue;
                if (xc.getPositionFromMatrix(e.matrixWorld), xc.normalize(), 0 === xc.x && 0 === xc.y && 0 === xc.z) continue;
                P = 3 * H, D[P] = xc.x, D[P + 1] = xc.y, D[P + 2] = xc.z, g = e.color, h = e.groundColor, 
                Sb.gammaInput ? (j = i * i, eb(B, P, g, j), eb(C, P, h, j)) : (fb(B, P, g, i), fb(C, P, h, i)), 
                H += 1;
            }
            for (c = 3 * E, d = Math.max(p.length, 3 * I); d > c; c++) p[c] = 0;
            for (c = 3 * F, d = Math.max(r.length, 3 * J); d > c; c++) r[c] = 0;
            for (c = 3 * G, d = Math.max(u.length, 3 * K); d > c; c++) u[c] = 0;
            for (c = 3 * H, d = Math.max(B.length, 3 * L); d > c; c++) B[c] = 0;
            for (c = 3 * H, d = Math.max(C.length, 3 * L); d > c; c++) C[c] = 0;
            o.directional.length = E, o.point.length = F, o.spot.length = G, o.hemi.length = H, 
            o.ambient[0] = l, o.ambient[1] = m, o.ambient[2] = n;
        }
        function hb(a) {
            a !== lc && (Nb.lineWidth(a), lc = a);
        }
        function ib(a, b, c) {
            ic !== a && (a ? Nb.enable(Nb.POLYGON_OFFSET_FILL) : Nb.disable(Nb.POLYGON_OFFSET_FILL), 
            ic = a), !a || jc === b && kc === c || (Nb.polygonOffset(b, c), jc = b, kc = c);
        }
        function jb(a) {
            var b, c, d = [];
            for (var e in a) b = a[e], b !== !1 && (c = "#define " + e + " " + b, d.push(c));
            return d.join("\n");
        }
        function kb(a, b, c, d, e, f, g) {
            var h, i, j, k, l, m = [];
            a ? m.push(a) : (m.push(b), m.push(c));
            for (j in f) m.push(j), m.push(f[j]);
            for (h in g) m.push(h), m.push(g[h]);
            for (l = m.join(), h = 0, i = Tb.length; i > h; h++) {
                var n = Tb[h];
                if (n.code === l) return n.usedTimes++, n.program;
            }
            var o = "SHADOWMAP_TYPE_BASIC";
            g.shadowMapType === v.PCFShadowMap ? o = "SHADOWMAP_TYPE_PCF" : g.shadowMapType === v.PCFSoftShadowMap && (o = "SHADOWMAP_TYPE_PCF_SOFT");
            var p = jb(f);
            k = Nb.createProgram();
            var q = [ "precision " + Fb + " float;", p, Ec ? "#define VERTEX_TEXTURES" : "", Sb.gammaInput ? "#define GAMMA_INPUT" : "", Sb.gammaOutput ? "#define GAMMA_OUTPUT" : "", Sb.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "", "#define MAX_DIR_LIGHTS " + g.maxDirLights, "#define MAX_POINT_LIGHTS " + g.maxPointLights, "#define MAX_SPOT_LIGHTS " + g.maxSpotLights, "#define MAX_HEMI_LIGHTS " + g.maxHemiLights, "#define MAX_SHADOWS " + g.maxShadows, "#define MAX_BONES " + g.maxBones, g.map ? "#define USE_MAP" : "", g.envMap ? "#define USE_ENVMAP" : "", g.lightMap ? "#define USE_LIGHTMAP" : "", g.bumpMap ? "#define USE_BUMPMAP" : "", g.normalMap ? "#define USE_NORMALMAP" : "", g.specularMap ? "#define USE_SPECULARMAP" : "", g.vertexColors ? "#define USE_COLOR" : "", g.skinning ? "#define USE_SKINNING" : "", g.useVertexTexture ? "#define BONE_TEXTURE" : "", g.boneTextureWidth ? "#define N_BONE_PIXEL_X " + g.boneTextureWidth.toFixed(1) : "", g.boneTextureHeight ? "#define N_BONE_PIXEL_Y " + g.boneTextureHeight.toFixed(1) : "", g.morphTargets ? "#define USE_MORPHTARGETS" : "", g.morphNormals ? "#define USE_MORPHNORMALS" : "", g.perPixel ? "#define PHONG_PER_PIXEL" : "", g.wrapAround ? "#define WRAP_AROUND" : "", g.doubleSided ? "#define DOUBLE_SIDED" : "", g.flipSided ? "#define FLIP_SIDED" : "", g.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", g.shadowMapEnabled ? "#define " + o : "", g.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", g.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", g.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "attribute vec2 uv2;", "#ifdef USE_COLOR", "attribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "attribute vec3 morphTarget0;", "attribute vec3 morphTarget1;", "attribute vec3 morphTarget2;", "attribute vec3 morphTarget3;", "#ifdef USE_MORPHNORMALS", "attribute vec3 morphNormal0;", "attribute vec3 morphNormal1;", "attribute vec3 morphNormal2;", "attribute vec3 morphNormal3;", "#else", "attribute vec3 morphTarget4;", "attribute vec3 morphTarget5;", "attribute vec3 morphTarget6;", "attribute vec3 morphTarget7;", "#endif", "#endif", "#ifdef USE_SKINNING", "attribute vec4 skinIndex;", "attribute vec4 skinWeight;", "#endif", "" ].join("\n"), r = [ "precision " + Fb + " float;", g.bumpMap || g.normalMap ? "#extension GL_OES_standard_derivatives : enable" : "", p, "#define MAX_DIR_LIGHTS " + g.maxDirLights, "#define MAX_POINT_LIGHTS " + g.maxPointLights, "#define MAX_SPOT_LIGHTS " + g.maxSpotLights, "#define MAX_HEMI_LIGHTS " + g.maxHemiLights, "#define MAX_SHADOWS " + g.maxShadows, g.alphaTest ? "#define ALPHATEST " + g.alphaTest : "", Sb.gammaInput ? "#define GAMMA_INPUT" : "", Sb.gammaOutput ? "#define GAMMA_OUTPUT" : "", Sb.physicallyBasedShading ? "#define PHYSICALLY_BASED_SHADING" : "", g.useFog && g.fog ? "#define USE_FOG" : "", g.useFog && g.fogExp ? "#define FOG_EXP2" : "", g.map ? "#define USE_MAP" : "", g.envMap ? "#define USE_ENVMAP" : "", g.lightMap ? "#define USE_LIGHTMAP" : "", g.bumpMap ? "#define USE_BUMPMAP" : "", g.normalMap ? "#define USE_NORMALMAP" : "", g.specularMap ? "#define USE_SPECULARMAP" : "", g.vertexColors ? "#define USE_COLOR" : "", g.metal ? "#define METAL" : "", g.perPixel ? "#define PHONG_PER_PIXEL" : "", g.wrapAround ? "#define WRAP_AROUND" : "", g.doubleSided ? "#define DOUBLE_SIDED" : "", g.flipSided ? "#define FLIP_SIDED" : "", g.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", g.shadowMapEnabled ? "#define " + o : "", g.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", g.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "" ].join("\n"), s = ob("vertex", q + c), t = ob("fragment", r + b);
            Nb.attachShader(k, s), Nb.attachShader(k, t), Nb.linkProgram(k), Nb.getProgramParameter(k, Nb.LINK_STATUS) || console.error("Could not initialise shader\nVALIDATE_STATUS: " + Nb.getProgramParameter(k, Nb.VALIDATE_STATUS) + ", gl error [" + Nb.getError() + "]"), 
            Nb.deleteShader(t), Nb.deleteShader(s), k.uniforms = {}, k.attributes = {};
            var u, w, x, y;
            u = [ "viewMatrix", "modelViewMatrix", "projectionMatrix", "normalMatrix", "modelMatrix", "cameraPosition", "morphTargetInfluences" ], 
            g.useVertexTexture ? u.push("boneTexture") : u.push("boneGlobalMatrices");
            for (w in d) u.push(w);
            for (lb(k, u), u = [ "position", "normal", "uv", "uv2", "tangent", "color", "skinIndex", "skinWeight", "lineDistance" ], 
            y = 0; y < g.maxMorphTargets; y++) u.push("morphTarget" + y);
            for (y = 0; y < g.maxMorphNormals; y++) u.push("morphNormal" + y);
            for (x in e) u.push(x);
            return mb(k, u), k.id = Ub++, Tb.push({
                program: k,
                code: l,
                usedTimes: 1
            }), Sb.info.memory.programs = Tb.length, k;
        }
        function lb(a, b) {
            var c, d, e;
            for (c = 0, d = b.length; d > c; c++) e = b[c], a.uniforms[e] = Nb.getUniformLocation(a, e);
        }
        function mb(a, b) {
            var c, d, e;
            for (c = 0, d = b.length; d > c; c++) e = b[c], a.attributes[e] = Nb.getAttribLocation(a, e);
        }
        function nb(a) {
            for (var b = a.split("\n"), c = 0, d = b.length; d > c; c++) b[c] = c + 1 + ": " + b[c];
            return b.join("\n");
        }
        function ob(a, b) {
            var c;
            return "fragment" === a ? c = Nb.createShader(Nb.FRAGMENT_SHADER) : "vertex" === a && (c = Nb.createShader(Nb.VERTEX_SHADER)), 
            Nb.shaderSource(c, b), Nb.compileShader(c), Nb.getShaderParameter(c, Nb.COMPILE_STATUS) ? c : (console.error(Nb.getShaderInfoLog(c)), 
            console.error(nb(b)), null);
        }
        function pb(a) {
            return 0 === (a & a - 1);
        }
        function qb(a, b, c) {
            c ? (Nb.texParameteri(a, Nb.TEXTURE_WRAP_S, yb(b.wrapS)), Nb.texParameteri(a, Nb.TEXTURE_WRAP_T, yb(b.wrapT)), 
            Nb.texParameteri(a, Nb.TEXTURE_MAG_FILTER, yb(b.magFilter)), Nb.texParameteri(a, Nb.TEXTURE_MIN_FILTER, yb(b.minFilter))) : (Nb.texParameteri(a, Nb.TEXTURE_WRAP_S, Nb.CLAMP_TO_EDGE), 
            Nb.texParameteri(a, Nb.TEXTURE_WRAP_T, Nb.CLAMP_TO_EDGE), Nb.texParameteri(a, Nb.TEXTURE_MAG_FILTER, xb(b.magFilter)), 
            Nb.texParameteri(a, Nb.TEXTURE_MIN_FILTER, xb(b.minFilter))), Qb && b.type !== v.FloatType && (b.anisotropy > 1 || b.__oldAnisotropy) && (Nb.texParameterf(a, Qb.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(b.anisotropy, Dc)), 
            b.__oldAnisotropy = b.anisotropy);
        }
        function rb(a, b) {
            if (a.width <= b && a.height <= b) return a;
            var c = Math.max(a.width, a.height), d = Math.floor(a.width * b / c), e = Math.floor(a.height * b / c), f = document.createElement("canvas");
            f.width = d, f.height = e;
            var g = f.getContext("2d");
            return g.drawImage(a, 0, 0, a.width, a.height, 0, 0, d, e), f;
        }
        function sb(a, b) {
            if (6 === a.image.length) if (a.needsUpdate) {
                a.image.__webglTextureCube || (a.image.__webglTextureCube = Nb.createTexture(), 
                Sb.info.memory.textures++), Nb.activeTexture(Nb.TEXTURE0 + b), Nb.bindTexture(Nb.TEXTURE_CUBE_MAP, a.image.__webglTextureCube), 
                Nb.pixelStorei(Nb.UNPACK_FLIP_Y_WEBGL, a.flipY);
                for (var c = a instanceof v.CompressedTexture, d = [], e = 0; 6 > e; e++) d[e] = Sb.autoScaleCubemaps && !c ? rb(a.image[e], Cc) : a.image[e];
                var f = d[0], g = pb(f.width) && pb(f.height), h = yb(a.format), i = yb(a.type);
                qb(Nb.TEXTURE_CUBE_MAP, a, g);
                for (var e = 0; 6 > e; e++) if (c) for (var j, k = d[e].mipmaps, l = 0, m = k.length; m > l; l++) j = k[l], 
                Nb.compressedTexImage2D(Nb.TEXTURE_CUBE_MAP_POSITIVE_X + e, l, h, j.width, j.height, 0, j.data); else Nb.texImage2D(Nb.TEXTURE_CUBE_MAP_POSITIVE_X + e, 0, h, h, i, d[e]);
                a.generateMipmaps && g && Nb.generateMipmap(Nb.TEXTURE_CUBE_MAP), a.needsUpdate = !1, 
                a.onUpdate && a.onUpdate();
            } else Nb.activeTexture(Nb.TEXTURE0 + b), Nb.bindTexture(Nb.TEXTURE_CUBE_MAP, a.image.__webglTextureCube);
        }
        function tb(a, b) {
            Nb.activeTexture(Nb.TEXTURE0 + b), Nb.bindTexture(Nb.TEXTURE_CUBE_MAP, a.__webglTexture);
        }
        function ub(a, b, c) {
            Nb.bindFramebuffer(Nb.FRAMEBUFFER, a), Nb.framebufferTexture2D(Nb.FRAMEBUFFER, Nb.COLOR_ATTACHMENT0, c, b.__webglTexture, 0);
        }
        function vb(a, b) {
            Nb.bindRenderbuffer(Nb.RENDERBUFFER, a), b.depthBuffer && !b.stencilBuffer ? (Nb.renderbufferStorage(Nb.RENDERBUFFER, Nb.DEPTH_COMPONENT16, b.width, b.height), 
            Nb.framebufferRenderbuffer(Nb.FRAMEBUFFER, Nb.DEPTH_ATTACHMENT, Nb.RENDERBUFFER, a)) : b.depthBuffer && b.stencilBuffer ? (Nb.renderbufferStorage(Nb.RENDERBUFFER, Nb.DEPTH_STENCIL, b.width, b.height), 
            Nb.framebufferRenderbuffer(Nb.FRAMEBUFFER, Nb.DEPTH_STENCIL_ATTACHMENT, Nb.RENDERBUFFER, a)) : Nb.renderbufferStorage(Nb.RENDERBUFFER, Nb.RGBA4, b.width, b.height);
        }
        function wb(a) {
            a instanceof v.WebGLRenderTargetCube ? (Nb.bindTexture(Nb.TEXTURE_CUBE_MAP, a.__webglTexture), 
            Nb.generateMipmap(Nb.TEXTURE_CUBE_MAP), Nb.bindTexture(Nb.TEXTURE_CUBE_MAP, null)) : (Nb.bindTexture(Nb.TEXTURE_2D, a.__webglTexture), 
            Nb.generateMipmap(Nb.TEXTURE_2D), Nb.bindTexture(Nb.TEXTURE_2D, null));
        }
        function xb(a) {
            return a === v.NearestFilter || a === v.NearestMipMapNearestFilter || a === v.NearestMipMapLinearFilter ? Nb.NEAREST : Nb.LINEAR;
        }
        function yb(a) {
            if (a === v.RepeatWrapping) return Nb.REPEAT;
            if (a === v.ClampToEdgeWrapping) return Nb.CLAMP_TO_EDGE;
            if (a === v.MirroredRepeatWrapping) return Nb.MIRRORED_REPEAT;
            if (a === v.NearestFilter) return Nb.NEAREST;
            if (a === v.NearestMipMapNearestFilter) return Nb.NEAREST_MIPMAP_NEAREST;
            if (a === v.NearestMipMapLinearFilter) return Nb.NEAREST_MIPMAP_LINEAR;
            if (a === v.LinearFilter) return Nb.LINEAR;
            if (a === v.LinearMipMapNearestFilter) return Nb.LINEAR_MIPMAP_NEAREST;
            if (a === v.LinearMipMapLinearFilter) return Nb.LINEAR_MIPMAP_LINEAR;
            if (a === v.UnsignedByteType) return Nb.UNSIGNED_BYTE;
            if (a === v.UnsignedShort4444Type) return Nb.UNSIGNED_SHORT_4_4_4_4;
            if (a === v.UnsignedShort5551Type) return Nb.UNSIGNED_SHORT_5_5_5_1;
            if (a === v.UnsignedShort565Type) return Nb.UNSIGNED_SHORT_5_6_5;
            if (a === v.ByteType) return Nb.BYTE;
            if (a === v.ShortType) return Nb.SHORT;
            if (a === v.UnsignedShortType) return Nb.UNSIGNED_SHORT;
            if (a === v.IntType) return Nb.INT;
            if (a === v.UnsignedIntType) return Nb.UNSIGNED_INT;
            if (a === v.FloatType) return Nb.FLOAT;
            if (a === v.AlphaFormat) return Nb.ALPHA;
            if (a === v.RGBFormat) return Nb.RGB;
            if (a === v.RGBAFormat) return Nb.RGBA;
            if (a === v.LuminanceFormat) return Nb.LUMINANCE;
            if (a === v.LuminanceAlphaFormat) return Nb.LUMINANCE_ALPHA;
            if (a === v.AddEquation) return Nb.FUNC_ADD;
            if (a === v.SubtractEquation) return Nb.FUNC_SUBTRACT;
            if (a === v.ReverseSubtractEquation) return Nb.FUNC_REVERSE_SUBTRACT;
            if (a === v.ZeroFactor) return Nb.ZERO;
            if (a === v.OneFactor) return Nb.ONE;
            if (a === v.SrcColorFactor) return Nb.SRC_COLOR;
            if (a === v.OneMinusSrcColorFactor) return Nb.ONE_MINUS_SRC_COLOR;
            if (a === v.SrcAlphaFactor) return Nb.SRC_ALPHA;
            if (a === v.OneMinusSrcAlphaFactor) return Nb.ONE_MINUS_SRC_ALPHA;
            if (a === v.DstAlphaFactor) return Nb.DST_ALPHA;
            if (a === v.OneMinusDstAlphaFactor) return Nb.ONE_MINUS_DST_ALPHA;
            if (a === v.DstColorFactor) return Nb.DST_COLOR;
            if (a === v.OneMinusDstColorFactor) return Nb.ONE_MINUS_DST_COLOR;
            if (a === v.SrcAlphaSaturateFactor) return Nb.SRC_ALPHA_SATURATE;
            if (void 0 !== Rb) {
                if (a === v.RGB_S3TC_DXT1_Format) return Rb.COMPRESSED_RGB_S3TC_DXT1_EXT;
                if (a === v.RGBA_S3TC_DXT1_Format) return Rb.COMPRESSED_RGBA_S3TC_DXT1_EXT;
                if (a === v.RGBA_S3TC_DXT3_Format) return Rb.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                if (a === v.RGBA_S3TC_DXT5_Format) return Rb.COMPRESSED_RGBA_S3TC_DXT5_EXT;
            }
            return 0;
        }
        function zb(a) {
            if (Fc && a && a.useVertexTexture) return 1024;
            var b = Nb.getParameter(Nb.MAX_VERTEX_UNIFORM_VECTORS), c = Math.floor((b - 20) / 4), d = c;
            return void 0 !== a && a instanceof v.SkinnedMesh && (d = Math.min(a.bones.length, d), 
            d < a.bones.length && console.warn("WebGLRenderer: too many bones - " + a.bones.length + ", this GPU supports just " + d + " (try OpenGL instead of ANGLE)")), 
            d;
        }
        function Ab(a) {
            var b, c, d, e, f, g, h;
            for (e = f = g = h = 0, b = 0, c = a.length; c > b; b++) d = a[b], d.onlyShadow || (d instanceof v.DirectionalLight && e++, 
            d instanceof v.PointLight && f++, d instanceof v.SpotLight && g++, d instanceof v.HemisphereLight && h++);
            return {
                directional: e,
                point: f,
                spot: g,
                hemi: h
            };
        }
        function Bb(a) {
            var b, c, d, e = 0;
            for (b = 0, c = a.length; c > b; b++) d = a[b], d.castShadow && (d instanceof v.SpotLight && e++, 
            d instanceof v.DirectionalLight && !d.shadowCascade && e++);
            return e;
        }
        function Cb() {
            try {
                if (!(Nb = Eb.getContext("experimental-webgl", {
                    alpha: Gb,
                    premultipliedAlpha: Hb,
                    antialias: Ib,
                    stencil: Jb,
                    preserveDrawingBuffer: Kb
                }))) throw "Error creating WebGL context.";
            } catch (a) {
                console.error(a);
            }
            Ob = Nb.getExtension("OES_texture_float"), Pb = Nb.getExtension("OES_standard_derivatives"), 
            Qb = Nb.getExtension("EXT_texture_filter_anisotropic") || Nb.getExtension("MOZ_EXT_texture_filter_anisotropic") || Nb.getExtension("WEBKIT_EXT_texture_filter_anisotropic"), 
            Rb = Nb.getExtension("WEBGL_compressed_texture_s3tc") || Nb.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || Nb.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc"), 
            Ob || console.log("THREE.WebGLRenderer: Float textures not supported."), Pb || console.log("THREE.WebGLRenderer: Standard derivatives not supported."), 
            Qb || console.log("THREE.WebGLRenderer: Anisotropic texture filtering not supported."), 
            Rb || console.log("THREE.WebGLRenderer: S3TC compressed textures not supported."), 
            void 0 === Nb.getShaderPrecisionFormat && (Nb.getShaderPrecisionFormat = function() {
                return {
                    rangeMin: 1,
                    rangeMax: 1,
                    precision: 1
                };
            });
        }
        function Db() {
            Nb.clearColor(0, 0, 0, 1), Nb.clearDepth(1), Nb.clearStencil(0), Nb.enable(Nb.DEPTH_TEST), 
            Nb.depthFunc(Nb.LEQUAL), Nb.frontFace(Nb.CCW), Nb.cullFace(Nb.BACK), Nb.enable(Nb.CULL_FACE), 
            Nb.enable(Nb.BLEND), Nb.blendEquation(Nb.FUNC_ADD), Nb.blendFunc(Nb.SRC_ALPHA, Nb.ONE_MINUS_SRC_ALPHA), 
            Nb.clearColor(Lb.r, Lb.g, Lb.b, Mb);
        }
        console.log("THREE.WebGLRenderer", v.REVISION), a = a || {};
        var Eb = void 0 !== a.canvas ? a.canvas : document.createElement("canvas"), Fb = void 0 !== a.precision ? a.precision : "highp", Gb = void 0 !== a.alpha ? a.alpha : !0, Hb = void 0 !== a.premultipliedAlpha ? a.premultipliedAlpha : !0, Ib = void 0 !== a.antialias ? a.antialias : !1, Jb = void 0 !== a.stencil ? a.stencil : !0, Kb = void 0 !== a.preserveDrawingBuffer ? a.preserveDrawingBuffer : !1, Lb = new v.Color(0), Mb = 0;
        void 0 !== a.clearColor && (console.warn("DEPRECATED: clearColor in WebGLRenderer constructor parameters is being removed. Use .setClearColor() instead."), 
        Lb.setHex(a.clearColor)), void 0 !== a.clearAlpha && (console.warn("DEPRECATED: clearAlpha in WebGLRenderer constructor parameters is being removed. Use .setClearColor() instead."), 
        Mb = a.clearAlpha), this.domElement = Eb, this.context = null, this.devicePixelRatio = void 0 !== a.devicePixelRatio ? a.devicePixelRatio : void 0 !== window.devicePixelRatio ? window.devicePixelRatio : 1, 
        this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, 
        this.sortObjects = !0, this.autoUpdateObjects = !0, this.gammaInput = !1, this.gammaOutput = !1, 
        this.physicallyBasedShading = !1, this.shadowMapEnabled = !1, this.shadowMapAutoUpdate = !0, 
        this.shadowMapType = v.PCFShadowMap, this.shadowMapCullFace = v.CullFaceFront, this.shadowMapDebug = !1, 
        this.shadowMapCascade = !1, this.maxMorphTargets = 8, this.maxMorphNormals = 4, 
        this.autoScaleCubemaps = !0, this.renderPluginsPre = [], this.renderPluginsPost = [], 
        this.info = {
            memory: {
                programs: 0,
                geometries: 0,
                textures: 0
            },
            render: {
                calls: 0,
                vertices: 0,
                faces: 0,
                points: 0
            }
        };
        var Nb, Ob, Pb, Qb, Rb, Sb = this, Tb = [], Ub = 0, Vb = null, Wb = null, Xb = -1, Yb = null, Zb = null, $b = 0, _b = 0, ac = -1, bc = -1, cc = -1, dc = -1, ec = -1, fc = -1, gc = -1, hc = -1, ic = null, jc = null, kc = null, lc = null, mc = 0, nc = 0, oc = 0, pc = 0, qc = 0, rc = 0, sc = {}, tc = new v.Frustum(), uc = new v.Matrix4(), vc = new v.Matrix4(), wc = new v.Vector3(), xc = new v.Vector3(), yc = !0, zc = {
            ambient: [ 0, 0, 0 ],
            directional: {
                length: 0,
                colors: new Array(),
                positions: new Array()
            },
            point: {
                length: 0,
                colors: new Array(),
                positions: new Array(),
                distances: new Array()
            },
            spot: {
                length: 0,
                colors: new Array(),
                positions: new Array(),
                distances: new Array(),
                directions: new Array(),
                anglesCos: new Array(),
                exponents: new Array()
            },
            hemi: {
                length: 0,
                skyColors: new Array(),
                groundColors: new Array(),
                positions: new Array()
            }
        };
        Cb(), Db(), this.context = Nb;
        var Ac = Nb.getParameter(Nb.MAX_TEXTURE_IMAGE_UNITS), Bc = Nb.getParameter(Nb.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
        Nb.getParameter(Nb.MAX_TEXTURE_SIZE);
        var Cc = Nb.getParameter(Nb.MAX_CUBE_MAP_TEXTURE_SIZE), Dc = Qb ? Nb.getParameter(Qb.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0, Ec = Bc > 0, Fc = Ec && Ob;
        Rb ? Nb.getParameter(Nb.COMPRESSED_TEXTURE_FORMATS) : [];
        var Gc = Nb.getShaderPrecisionFormat(Nb.VERTEX_SHADER, Nb.HIGH_FLOAT), Hc = Nb.getShaderPrecisionFormat(Nb.VERTEX_SHADER, Nb.MEDIUM_FLOAT);
        Nb.getShaderPrecisionFormat(Nb.VERTEX_SHADER, Nb.LOW_FLOAT);
        var Ic = Nb.getShaderPrecisionFormat(Nb.FRAGMENT_SHADER, Nb.HIGH_FLOAT), Jc = Nb.getShaderPrecisionFormat(Nb.FRAGMENT_SHADER, Nb.MEDIUM_FLOAT);
        Nb.getShaderPrecisionFormat(Nb.FRAGMENT_SHADER, Nb.LOW_FLOAT), Nb.getShaderPrecisionFormat(Nb.VERTEX_SHADER, Nb.HIGH_INT), 
        Nb.getShaderPrecisionFormat(Nb.VERTEX_SHADER, Nb.MEDIUM_INT), Nb.getShaderPrecisionFormat(Nb.VERTEX_SHADER, Nb.LOW_INT), 
        Nb.getShaderPrecisionFormat(Nb.FRAGMENT_SHADER, Nb.HIGH_INT), Nb.getShaderPrecisionFormat(Nb.FRAGMENT_SHADER, Nb.MEDIUM_INT), 
        Nb.getShaderPrecisionFormat(Nb.FRAGMENT_SHADER, Nb.LOW_INT);
        var Kc = Gc.precision > 0 && Ic.precision > 0, Lc = Hc.precision > 0 && Jc.precision > 0;
        "highp" !== Fb || Kc || (Lc ? (Fb = "mediump", console.warn("WebGLRenderer: highp not supported, using mediump")) : (Fb = "lowp", 
        console.warn("WebGLRenderer: highp and mediump not supported, using lowp"))), "mediump" !== Fb || Lc || (Fb = "lowp", 
        console.warn("WebGLRenderer: mediump not supported, using lowp")), this.getContext = function() {
            return Nb;
        }, this.supportsVertexTextures = function() {
            return Ec;
        }, this.supportsFloatTextures = function() {
            return Ob;
        }, this.supportsStandardDerivatives = function() {
            return Pb;
        }, this.supportsCompressedTextureS3TC = function() {
            return Rb;
        }, this.getMaxAnisotropy = function() {
            return Dc;
        }, this.getPrecision = function() {
            return Fb;
        }, this.setSize = function(a, b, c) {
            Eb.width = a * this.devicePixelRatio, Eb.height = b * this.devicePixelRatio, 1 !== this.devicePixelRatio && c !== !1 && (Eb.style.width = a + "px", 
            Eb.style.height = b + "px"), this.setViewport(0, 0, Eb.width, Eb.height);
        }, this.setViewport = function(a, b, c, d) {
            mc = void 0 !== a ? a : 0, nc = void 0 !== b ? b : 0, oc = void 0 !== c ? c : Eb.width, 
            pc = void 0 !== d ? d : Eb.height, Nb.viewport(mc, nc, oc, pc);
        }, this.setScissor = function(a, b, c, d) {
            Nb.scissor(a, b, c, d);
        }, this.enableScissorTest = function(a) {
            a ? Nb.enable(Nb.SCISSOR_TEST) : Nb.disable(Nb.SCISSOR_TEST);
        }, this.setClearColor = function(a, b) {
            Lb.set(a), Mb = void 0 !== b ? b : 1, Nb.clearColor(Lb.r, Lb.g, Lb.b, Mb);
        }, this.setClearColorHex = function(a, b) {
            console.warn("DEPRECATED: .setClearColorHex() is being removed. Use .setClearColor() instead."), 
            this.setClearColor(a, b);
        }, this.getClearColor = function() {
            return Lb;
        }, this.getClearAlpha = function() {
            return Mb;
        }, this.clear = function(a, b, c) {
            var d = 0;
            (void 0 === a || a) && (d |= Nb.COLOR_BUFFER_BIT), (void 0 === b || b) && (d |= Nb.DEPTH_BUFFER_BIT), 
            (void 0 === c || c) && (d |= Nb.STENCIL_BUFFER_BIT), Nb.clear(d);
        }, this.clearTarget = function(a, b, c, d) {
            this.setRenderTarget(a), this.clear(b, c, d);
        }, this.addPostPlugin = function(a) {
            a.init(this), this.renderPluginsPost.push(a);
        }, this.addPrePlugin = function(a) {
            a.init(this), this.renderPluginsPre.push(a);
        }, this.updateShadowMap = function(a, b) {
            Vb = null, cc = -1, gc = -1, hc = -1, Yb = -1, Xb = -1, yc = !0, ac = -1, bc = -1, 
            this.shadowMapPlugin.update(a, b);
        };
        var Mc = function(a) {
            var b = a.target;
            b.removeEventListener("dispose", Mc), Qc(b), Sb.info.memory.geometries--;
        }, Nc = function(a) {
            var b = a.target;
            b.removeEventListener("dispose", Nc), Rc(b), Sb.info.memory.textures--;
        }, Oc = function(a) {
            var b = a.target;
            b.removeEventListener("dispose", Oc), Sc(b), Sb.info.memory.textures--;
        }, Pc = function(a) {
            var b = a.target;
            b.removeEventListener("dispose", Pc), Tc(b);
        }, Qc = function(a) {
            if (a.__webglInit = void 0, void 0 !== a.__webglVertexBuffer && Nb.deleteBuffer(a.__webglVertexBuffer), 
            void 0 !== a.__webglNormalBuffer && Nb.deleteBuffer(a.__webglNormalBuffer), void 0 !== a.__webglTangentBuffer && Nb.deleteBuffer(a.__webglTangentBuffer), 
            void 0 !== a.__webglColorBuffer && Nb.deleteBuffer(a.__webglColorBuffer), void 0 !== a.__webglUVBuffer && Nb.deleteBuffer(a.__webglUVBuffer), 
            void 0 !== a.__webglUV2Buffer && Nb.deleteBuffer(a.__webglUV2Buffer), void 0 !== a.__webglSkinIndicesBuffer && Nb.deleteBuffer(a.__webglSkinIndicesBuffer), 
            void 0 !== a.__webglSkinWeightsBuffer && Nb.deleteBuffer(a.__webglSkinWeightsBuffer), 
            void 0 !== a.__webglFaceBuffer && Nb.deleteBuffer(a.__webglFaceBuffer), void 0 !== a.__webglLineBuffer && Nb.deleteBuffer(a.__webglLineBuffer), 
            void 0 !== a.__webglLineDistanceBuffer && Nb.deleteBuffer(a.__webglLineDistanceBuffer), 
            void 0 !== a.geometryGroups) for (var b in a.geometryGroups) {
                var c = a.geometryGroups[b];
                if (void 0 !== c.numMorphTargets) for (var d = 0, e = c.numMorphTargets; e > d; d++) Nb.deleteBuffer(c.__webglMorphTargetsBuffers[d]);
                if (void 0 !== c.numMorphNormals) for (var d = 0, e = c.numMorphNormals; e > d; d++) Nb.deleteBuffer(c.__webglMorphNormalsBuffers[d]);
                f(c);
            }
            f(a);
        }, Rc = function(a) {
            if (a.image && a.image.__webglTextureCube) Nb.deleteTexture(a.image.__webglTextureCube); else {
                if (!a.__webglInit) return;
                a.__webglInit = !1, Nb.deleteTexture(a.__webglTexture);
            }
        }, Sc = function(a) {
            if (a && a.__webglTexture) if (Nb.deleteTexture(a.__webglTexture), a instanceof v.WebGLRenderTargetCube) for (var b = 0; 6 > b; b++) Nb.deleteFramebuffer(a.__webglFramebuffer[b]), 
            Nb.deleteRenderbuffer(a.__webglRenderbuffer[b]); else Nb.deleteFramebuffer(a.__webglFramebuffer), 
            Nb.deleteRenderbuffer(a.__webglRenderbuffer);
        }, Tc = function(a) {
            var b = a.program;
            if (void 0 !== b) {
                a.program = void 0;
                var c, d, e, f = !1;
                for (c = 0, d = Tb.length; d > c; c++) if (e = Tb[c], e.program === b) {
                    e.usedTimes--, 0 === e.usedTimes && (f = !0);
                    break;
                }
                if (f === !0) {
                    var g = [];
                    for (c = 0, d = Tb.length; d > c; c++) e = Tb[c], e.program !== b && g.push(e);
                    Tb = g, Nb.deleteProgram(b), Sb.info.memory.programs--;
                }
            }
        };
        this.renderBufferImmediate = function(a, b, c) {
            if (a.hasPositions && !a.__webglVertexBuffer && (a.__webglVertexBuffer = Nb.createBuffer()), 
            a.hasNormals && !a.__webglNormalBuffer && (a.__webglNormalBuffer = Nb.createBuffer()), 
            a.hasUvs && !a.__webglUvBuffer && (a.__webglUvBuffer = Nb.createBuffer()), a.hasColors && !a.__webglColorBuffer && (a.__webglColorBuffer = Nb.createBuffer()), 
            a.hasPositions && (Nb.bindBuffer(Nb.ARRAY_BUFFER, a.__webglVertexBuffer), Nb.bufferData(Nb.ARRAY_BUFFER, a.positionArray, Nb.DYNAMIC_DRAW), 
            Nb.enableVertexAttribArray(b.attributes.position), Nb.vertexAttribPointer(b.attributes.position, 3, Nb.FLOAT, !1, 0, 0)), 
            a.hasNormals) {
                if (Nb.bindBuffer(Nb.ARRAY_BUFFER, a.__webglNormalBuffer), c.shading === v.FlatShading) {
                    var d, e, f, g, h, i, j, k, l, m, n, o, p, q, r = 3 * a.count;
                    for (q = 0; r > q; q += 9) p = a.normalArray, g = p[q], j = p[q + 1], m = p[q + 2], 
                    h = p[q + 3], k = p[q + 4], n = p[q + 5], i = p[q + 6], l = p[q + 7], o = p[q + 8], 
                    d = (g + h + i) / 3, e = (j + k + l) / 3, f = (m + n + o) / 3, p[q] = d, p[q + 1] = e, 
                    p[q + 2] = f, p[q + 3] = d, p[q + 4] = e, p[q + 5] = f, p[q + 6] = d, p[q + 7] = e, 
                    p[q + 8] = f;
                }
                Nb.bufferData(Nb.ARRAY_BUFFER, a.normalArray, Nb.DYNAMIC_DRAW), Nb.enableVertexAttribArray(b.attributes.normal), 
                Nb.vertexAttribPointer(b.attributes.normal, 3, Nb.FLOAT, !1, 0, 0);
            }
            a.hasUvs && c.map && (Nb.bindBuffer(Nb.ARRAY_BUFFER, a.__webglUvBuffer), Nb.bufferData(Nb.ARRAY_BUFFER, a.uvArray, Nb.DYNAMIC_DRAW), 
            Nb.enableVertexAttribArray(b.attributes.uv), Nb.vertexAttribPointer(b.attributes.uv, 2, Nb.FLOAT, !1, 0, 0)), 
            a.hasColors && c.vertexColors !== v.NoColors && (Nb.bindBuffer(Nb.ARRAY_BUFFER, a.__webglColorBuffer), 
            Nb.bufferData(Nb.ARRAY_BUFFER, a.colorArray, Nb.DYNAMIC_DRAW), Nb.enableVertexAttribArray(b.attributes.color), 
            Nb.vertexAttribPointer(b.attributes.color, 3, Nb.FLOAT, !1, 0, 0)), Nb.drawArrays(Nb.TRIANGLES, 0, a.count), 
            a.count = 0;
        }, this.renderBufferDirect = function(a, b, c, d, e, f) {
            if (d.visible !== !1) {
                var g, h, i, j, k, l, m;
                g = S(a, b, c, d, f), h = g.attributes, i = e.attributes;
                var n = !1, o = d.wireframe ? 1 : 0, p = 16777215 * e.id + 2 * g.id + o;
                if (p !== Yb && (Yb = p, n = !0), n && y(), f instanceof v.Mesh) {
                    var q = i.index;
                    if (q) {
                        var r = e.offsets;
                        r.length > 1 && (n = !0);
                        for (var s = 0, t = r.length; t > s; s++) {
                            var u = r[s].index;
                            if (n) {
                                for (k in i) "index" !== k && (l = h[k], j = i[k], m = j.itemSize, l >= 0 && (Nb.bindBuffer(Nb.ARRAY_BUFFER, j.buffer), 
                                x(l), Nb.vertexAttribPointer(l, m, Nb.FLOAT, !1, 0, 4 * u * m)));
                                Nb.bindBuffer(Nb.ELEMENT_ARRAY_BUFFER, q.buffer);
                            }
                            Nb.drawElements(Nb.TRIANGLES, r[s].count, Nb.UNSIGNED_SHORT, 2 * r[s].start), Sb.info.render.calls++, 
                            Sb.info.render.vertices += r[s].count, Sb.info.render.faces += r[s].count / 3;
                        }
                    } else {
                        if (n) for (k in i) "index" !== k && (l = h[k], j = i[k], m = j.itemSize, l >= 0 && (Nb.bindBuffer(Nb.ARRAY_BUFFER, j.buffer), 
                        x(l), Nb.vertexAttribPointer(l, m, Nb.FLOAT, !1, 0, 0)));
                        var w = e.attributes.position;
                        Nb.drawArrays(Nb.TRIANGLES, 0, w.numItems / 3), Sb.info.render.calls++, Sb.info.render.vertices += w.numItems / 3, 
                        Sb.info.render.faces += w.numItems / 3 / 3;
                    }
                } else if (f instanceof v.ParticleSystem) {
                    if (n) {
                        for (k in i) l = h[k], j = i[k], m = j.itemSize, l >= 0 && (Nb.bindBuffer(Nb.ARRAY_BUFFER, j.buffer), 
                        x(l), Nb.vertexAttribPointer(l, m, Nb.FLOAT, !1, 0, 0));
                        var w = i.position;
                        Nb.drawArrays(Nb.POINTS, 0, w.numItems / 3), Sb.info.render.calls++, Sb.info.render.points += w.numItems / 3;
                    }
                } else if (f instanceof v.Line && n) {
                    for (k in i) l = h[k], j = i[k], m = j.itemSize, l >= 0 && (Nb.bindBuffer(Nb.ARRAY_BUFFER, j.buffer), 
                    x(l), Nb.vertexAttribPointer(l, m, Nb.FLOAT, !1, 0, 0));
                    hb(d.linewidth);
                    var w = i.position;
                    Nb.drawArrays(Nb.LINE_STRIP, 0, w.numItems / 3), Sb.info.render.calls++, Sb.info.render.points += w.numItems;
                }
            }
        }, this.renderBuffer = function(a, b, c, d, e, f) {
            if (d.visible !== !1) {
                var g, h, i, j, k, l;
                g = S(a, b, c, d, f), h = g.attributes;
                var m = !1, n = d.wireframe ? 1 : 0, o = 16777215 * e.id + 2 * g.id + n;
                if (o !== Yb && (Yb = o, m = !0), m && y(), !d.morphTargets && h.position >= 0 ? m && (Nb.bindBuffer(Nb.ARRAY_BUFFER, e.__webglVertexBuffer), 
                x(h.position), Nb.vertexAttribPointer(h.position, 3, Nb.FLOAT, !1, 0, 0)) : f.morphTargetBase && z(d, e, f), 
                m) {
                    if (e.__webglCustomAttributesList) for (k = 0, l = e.__webglCustomAttributesList.length; l > k; k++) j = e.__webglCustomAttributesList[k], 
                    h[j.buffer.belongsToAttribute] >= 0 && (Nb.bindBuffer(Nb.ARRAY_BUFFER, j.buffer), 
                    x(h[j.buffer.belongsToAttribute]), Nb.vertexAttribPointer(h[j.buffer.belongsToAttribute], j.size, Nb.FLOAT, !1, 0, 0));
                    h.color >= 0 && (Nb.bindBuffer(Nb.ARRAY_BUFFER, e.__webglColorBuffer), x(h.color), 
                    Nb.vertexAttribPointer(h.color, 3, Nb.FLOAT, !1, 0, 0)), h.normal >= 0 && (Nb.bindBuffer(Nb.ARRAY_BUFFER, e.__webglNormalBuffer), 
                    x(h.normal), Nb.vertexAttribPointer(h.normal, 3, Nb.FLOAT, !1, 0, 0)), h.tangent >= 0 && (Nb.bindBuffer(Nb.ARRAY_BUFFER, e.__webglTangentBuffer), 
                    x(h.tangent), Nb.vertexAttribPointer(h.tangent, 4, Nb.FLOAT, !1, 0, 0)), h.uv >= 0 && (Nb.bindBuffer(Nb.ARRAY_BUFFER, e.__webglUVBuffer), 
                    x(h.uv), Nb.vertexAttribPointer(h.uv, 2, Nb.FLOAT, !1, 0, 0)), h.uv2 >= 0 && (Nb.bindBuffer(Nb.ARRAY_BUFFER, e.__webglUV2Buffer), 
                    x(h.uv2), Nb.vertexAttribPointer(h.uv2, 2, Nb.FLOAT, !1, 0, 0)), d.skinning && h.skinIndex >= 0 && h.skinWeight >= 0 && (Nb.bindBuffer(Nb.ARRAY_BUFFER, e.__webglSkinIndicesBuffer), 
                    x(h.skinIndex), Nb.vertexAttribPointer(h.skinIndex, 4, Nb.FLOAT, !1, 0, 0), Nb.bindBuffer(Nb.ARRAY_BUFFER, e.__webglSkinWeightsBuffer), 
                    x(h.skinWeight), Nb.vertexAttribPointer(h.skinWeight, 4, Nb.FLOAT, !1, 0, 0)), h.lineDistance >= 0 && (Nb.bindBuffer(Nb.ARRAY_BUFFER, e.__webglLineDistanceBuffer), 
                    x(h.lineDistance), Nb.vertexAttribPointer(h.lineDistance, 1, Nb.FLOAT, !1, 0, 0));
                }
                f instanceof v.Mesh ? (d.wireframe ? (hb(d.wireframeLinewidth), m && Nb.bindBuffer(Nb.ELEMENT_ARRAY_BUFFER, e.__webglLineBuffer), 
                Nb.drawElements(Nb.LINES, e.__webglLineCount, Nb.UNSIGNED_SHORT, 0)) : (m && Nb.bindBuffer(Nb.ELEMENT_ARRAY_BUFFER, e.__webglFaceBuffer), 
                Nb.drawElements(Nb.TRIANGLES, e.__webglFaceCount, Nb.UNSIGNED_SHORT, 0)), Sb.info.render.calls++, 
                Sb.info.render.vertices += e.__webglFaceCount, Sb.info.render.faces += e.__webglFaceCount / 3) : f instanceof v.Line ? (i = f.type === v.LineStrip ? Nb.LINE_STRIP : Nb.LINES, 
                hb(d.linewidth), Nb.drawArrays(i, 0, e.__webglLineCount), Sb.info.render.calls++) : f instanceof v.ParticleSystem ? (Nb.drawArrays(Nb.POINTS, 0, e.__webglParticleCount), 
                Sb.info.render.calls++, Sb.info.render.points += e.__webglParticleCount) : f instanceof v.Ribbon && (Nb.drawArrays(Nb.TRIANGLE_STRIP, 0, e.__webglVertexCount), 
                Sb.info.render.calls++);
            }
        }, this.render = function(a, b, c, d) {
            if (b instanceof v.Camera == !1) return console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera."), 
            void 0;
            var e, f, g, h, i, j = a.__lights, k = a.fog;
            for (Xb = -1, yc = !0, a.autoUpdate === !0 && a.updateMatrixWorld(), void 0 === b.parent && b.updateMatrixWorld(), 
            b.matrixWorldInverse.getInverse(b.matrixWorld), uc.multiplyMatrices(b.projectionMatrix, b.matrixWorldInverse), 
            tc.setFromMatrix(uc), this.autoUpdateObjects && this.initWebGLObjects(a), C(this.renderPluginsPre, a, b), 
            Sb.info.render.calls = 0, Sb.info.render.vertices = 0, Sb.info.render.faces = 0, 
            Sb.info.render.points = 0, this.setRenderTarget(c), (this.autoClear || d) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil), 
            i = a.__webglObjects, e = 0, f = i.length; f > e; e++) g = i[e], h = g.object, g.id = e, 
            g.render = !1, h.visible && ((h instanceof v.Mesh || h instanceof v.ParticleSystem) && h.frustumCulled && !tc.intersectsObject(h) || (db(h, b), 
            G(g), g.render = !0, this.sortObjects === !0 && (null !== h.renderDepth ? g.z = h.renderDepth : (wc.getPositionFromMatrix(h.matrixWorld), 
            wc.applyProjection(uc), g.z = wc.z))));
            for (this.sortObjects && i.sort(A), i = a.__webglObjectsImmediate, e = 0, f = i.length; f > e; e++) g = i[e], 
            h = g.object, h.visible && (db(h, b), F(g));
            if (a.overrideMaterial) {
                var l = a.overrideMaterial;
                this.setBlending(l.blending, l.blendEquation, l.blendSrc, l.blendDst), this.setDepthTest(l.depthTest), 
                this.setDepthWrite(l.depthWrite), ib(l.polygonOffset, l.polygonOffsetFactor, l.polygonOffsetUnits), 
                D(a.__webglObjects, !1, "", b, j, k, !0, l), E(a.__webglObjectsImmediate, "", b, j, k, !1, l);
            } else {
                var l = null;
                this.setBlending(v.NoBlending), D(a.__webglObjects, !0, "opaque", b, j, k, !1, l), 
                E(a.__webglObjectsImmediate, "opaque", b, j, k, !1, l), D(a.__webglObjects, !1, "transparent", b, j, k, !0, l), 
                E(a.__webglObjectsImmediate, "transparent", b, j, k, !0, l);
            }
            C(this.renderPluginsPost, a, b), c && c.generateMipmaps && c.minFilter !== v.NearestFilter && c.minFilter !== v.LinearFilter && wb(c), 
            this.setDepthTest(!0), this.setDepthWrite(!0);
        }, this.renderImmediateObject = function(a, b, c, d, e) {
            var f = S(a, b, c, d, e);
            Yb = -1, Sb.setMaterialFaces(d), e.immediateRenderCallback ? e.immediateRenderCallback(f, Nb, tc) : e.render(function(a) {
                Sb.renderBufferImmediate(a, f, d);
            });
        }, this.initWebGLObjects = function(a) {
            for (a.__webglObjects || (a.__webglObjects = [], a.__webglObjectsImmediate = [], 
            a.__webglSprites = [], a.__webglFlares = []); a.__objectsAdded.length; ) I(a.__objectsAdded[0], a), 
            a.__objectsAdded.splice(0, 1);
            for (;a.__objectsRemoved.length; ) O(a.__objectsRemoved[0], a), a.__objectsRemoved.splice(0, 1);
            for (var b = 0, c = a.__webglObjects.length; c > b; b++) {
                var d = a.__webglObjects[b].object;
                void 0 === d.__webglInit && (void 0 !== d.__webglActive && O(d, a), I(d, a)), L(d);
            }
        }, this.initMaterial = function(a, b, c, d) {
            a.addEventListener("dispose", Pc);
            var e, f, g, h, i, j, k;
            a instanceof v.MeshDepthMaterial ? k = "depth" : a instanceof v.MeshNormalMaterial ? k = "normal" : a instanceof v.MeshBasicMaterial ? k = "basic" : a instanceof v.MeshLambertMaterial ? k = "lambert" : a instanceof v.MeshPhongMaterial ? k = "phong" : a instanceof v.LineBasicMaterial ? k = "basic" : a instanceof v.LineDashedMaterial ? k = "dashed" : a instanceof v.ParticleBasicMaterial && (k = "particle_basic"), 
            k && R(a, v.ShaderLib[k]), h = Ab(b), j = Bb(b), i = zb(d), g = {
                map: !!a.map,
                envMap: !!a.envMap,
                lightMap: !!a.lightMap,
                bumpMap: !!a.bumpMap,
                normalMap: !!a.normalMap,
                specularMap: !!a.specularMap,
                vertexColors: a.vertexColors,
                fog: c,
                useFog: a.fog,
                fogExp: c instanceof v.FogExp2,
                sizeAttenuation: a.sizeAttenuation,
                skinning: a.skinning,
                maxBones: i,
                useVertexTexture: Fc && d && d.useVertexTexture,
                boneTextureWidth: d && d.boneTextureWidth,
                boneTextureHeight: d && d.boneTextureHeight,
                morphTargets: a.morphTargets,
                morphNormals: a.morphNormals,
                maxMorphTargets: this.maxMorphTargets,
                maxMorphNormals: this.maxMorphNormals,
                maxDirLights: h.directional,
                maxPointLights: h.point,
                maxSpotLights: h.spot,
                maxHemiLights: h.hemi,
                maxShadows: j,
                shadowMapEnabled: this.shadowMapEnabled && d.receiveShadow,
                shadowMapType: this.shadowMapType,
                shadowMapDebug: this.shadowMapDebug,
                shadowMapCascade: this.shadowMapCascade,
                alphaTest: a.alphaTest,
                metal: a.metal,
                perPixel: a.perPixel,
                wrapAround: a.wrapAround,
                doubleSided: a.side === v.DoubleSide,
                flipSided: a.side === v.BackSide
            }, a.program = kb(k, a.fragmentShader, a.vertexShader, a.uniforms, a.attributes, a.defines, g);
            var l = a.program.attributes;
            if (a.morphTargets) {
                a.numSupportedMorphTargets = 0;
                var m, n = "morphTarget";
                for (f = 0; f < this.maxMorphTargets; f++) m = n + f, l[m] >= 0 && a.numSupportedMorphTargets++;
            }
            if (a.morphNormals) {
                a.numSupportedMorphNormals = 0;
                var m, n = "morphNormal";
                for (f = 0; f < this.maxMorphNormals; f++) m = n + f, l[m] >= 0 && a.numSupportedMorphNormals++;
            }
            a.uniformsList = [];
            for (e in a.uniforms) a.uniformsList.push([ a.uniforms[e], e ]);
        }, this.setFaceCulling = function(a, b) {
            a === v.CullFaceNone ? Nb.disable(Nb.CULL_FACE) : (b === v.FrontFaceDirectionCW ? Nb.frontFace(Nb.CW) : Nb.frontFace(Nb.CCW), 
            a === v.CullFaceBack ? Nb.cullFace(Nb.BACK) : a === v.CullFaceFront ? Nb.cullFace(Nb.FRONT) : Nb.cullFace(Nb.FRONT_AND_BACK), 
            Nb.enable(Nb.CULL_FACE));
        }, this.setMaterialFaces = function(a) {
            var b = a.side === v.DoubleSide, c = a.side === v.BackSide;
            ac !== b && (b ? Nb.disable(Nb.CULL_FACE) : Nb.enable(Nb.CULL_FACE), ac = b), bc !== c && (c ? Nb.frontFace(Nb.CW) : Nb.frontFace(Nb.CCW), 
            bc = c);
        }, this.setDepthTest = function(a) {
            gc !== a && (a ? Nb.enable(Nb.DEPTH_TEST) : Nb.disable(Nb.DEPTH_TEST), gc = a);
        }, this.setDepthWrite = function(a) {
            hc !== a && (Nb.depthMask(a), hc = a);
        }, this.setBlending = function(a, b, c, d) {
            a !== cc && (a === v.NoBlending ? Nb.disable(Nb.BLEND) : a === v.AdditiveBlending ? (Nb.enable(Nb.BLEND), 
            Nb.blendEquation(Nb.FUNC_ADD), Nb.blendFunc(Nb.SRC_ALPHA, Nb.ONE)) : a === v.SubtractiveBlending ? (Nb.enable(Nb.BLEND), 
            Nb.blendEquation(Nb.FUNC_ADD), Nb.blendFunc(Nb.ZERO, Nb.ONE_MINUS_SRC_COLOR)) : a === v.MultiplyBlending ? (Nb.enable(Nb.BLEND), 
            Nb.blendEquation(Nb.FUNC_ADD), Nb.blendFunc(Nb.ZERO, Nb.SRC_COLOR)) : a === v.CustomBlending ? Nb.enable(Nb.BLEND) : (Nb.enable(Nb.BLEND), 
            Nb.blendEquationSeparate(Nb.FUNC_ADD, Nb.FUNC_ADD), Nb.blendFuncSeparate(Nb.SRC_ALPHA, Nb.ONE_MINUS_SRC_ALPHA, Nb.ONE, Nb.ONE_MINUS_SRC_ALPHA)), 
            cc = a), a === v.CustomBlending ? (b !== dc && (Nb.blendEquation(yb(b)), dc = b), 
            (c !== ec || d !== fc) && (Nb.blendFunc(yb(c), yb(d)), ec = c, fc = d)) : (dc = null, 
            ec = null, fc = null);
        }, this.setTexture = function(a, b) {
            if (a.needsUpdate) {
                a.__webglInit || (a.__webglInit = !0, a.addEventListener("dispose", Nc), a.__webglTexture = Nb.createTexture(), 
                Sb.info.memory.textures++), Nb.activeTexture(Nb.TEXTURE0 + b), Nb.bindTexture(Nb.TEXTURE_2D, a.__webglTexture), 
                Nb.pixelStorei(Nb.UNPACK_FLIP_Y_WEBGL, a.flipY), Nb.pixelStorei(Nb.UNPACK_PREMULTIPLY_ALPHA_WEBGL, a.premultiplyAlpha), 
                Nb.pixelStorei(Nb.UNPACK_ALIGNMENT, a.unpackAlignment);
                var c = a.image, d = pb(c.width) && pb(c.height), e = yb(a.format), f = yb(a.type);
                qb(Nb.TEXTURE_2D, a, d);
                var g, h = a.mipmaps;
                if (a instanceof v.DataTexture) if (h.length > 0 && d) {
                    for (var i = 0, j = h.length; j > i; i++) g = h[i], Nb.texImage2D(Nb.TEXTURE_2D, i, e, g.width, g.height, 0, e, f, g.data);
                    a.generateMipmaps = !1;
                } else Nb.texImage2D(Nb.TEXTURE_2D, 0, e, c.width, c.height, 0, e, f, c.data); else if (a instanceof v.CompressedTexture) for (var i = 0, j = h.length; j > i; i++) g = h[i], 
                Nb.compressedTexImage2D(Nb.TEXTURE_2D, i, e, g.width, g.height, 0, g.data); else if (h.length > 0 && d) {
                    for (var i = 0, j = h.length; j > i; i++) g = h[i], Nb.texImage2D(Nb.TEXTURE_2D, i, e, e, f, g);
                    a.generateMipmaps = !1;
                } else Nb.texImage2D(Nb.TEXTURE_2D, 0, e, e, f, a.image);
                a.generateMipmaps && d && Nb.generateMipmap(Nb.TEXTURE_2D), a.needsUpdate = !1, 
                a.onUpdate && a.onUpdate();
            } else Nb.activeTexture(Nb.TEXTURE0 + b), Nb.bindTexture(Nb.TEXTURE_2D, a.__webglTexture);
        }, this.setRenderTarget = function(a) {
            var b = a instanceof v.WebGLRenderTargetCube;
            if (a && !a.__webglFramebuffer) {
                void 0 === a.depthBuffer && (a.depthBuffer = !0), void 0 === a.stencilBuffer && (a.stencilBuffer = !0), 
                a.addEventListener("dispose", Oc), a.__webglTexture = Nb.createTexture(), Sb.info.memory.textures++;
                var c = pb(a.width) && pb(a.height), d = yb(a.format), e = yb(a.type);
                if (b) {
                    a.__webglFramebuffer = [], a.__webglRenderbuffer = [], Nb.bindTexture(Nb.TEXTURE_CUBE_MAP, a.__webglTexture), 
                    qb(Nb.TEXTURE_CUBE_MAP, a, c);
                    for (var f = 0; 6 > f; f++) a.__webglFramebuffer[f] = Nb.createFramebuffer(), a.__webglRenderbuffer[f] = Nb.createRenderbuffer(), 
                    Nb.texImage2D(Nb.TEXTURE_CUBE_MAP_POSITIVE_X + f, 0, d, a.width, a.height, 0, d, e, null), 
                    ub(a.__webglFramebuffer[f], a, Nb.TEXTURE_CUBE_MAP_POSITIVE_X + f), vb(a.__webglRenderbuffer[f], a);
                    c && Nb.generateMipmap(Nb.TEXTURE_CUBE_MAP);
                } else a.__webglFramebuffer = Nb.createFramebuffer(), a.__webglRenderbuffer = a.shareDepthFrom ? a.shareDepthFrom.__webglRenderbuffer : Nb.createRenderbuffer(), 
                Nb.bindTexture(Nb.TEXTURE_2D, a.__webglTexture), qb(Nb.TEXTURE_2D, a, c), Nb.texImage2D(Nb.TEXTURE_2D, 0, d, a.width, a.height, 0, d, e, null), 
                ub(a.__webglFramebuffer, a, Nb.TEXTURE_2D), a.shareDepthFrom ? a.depthBuffer && !a.stencilBuffer ? Nb.framebufferRenderbuffer(Nb.FRAMEBUFFER, Nb.DEPTH_ATTACHMENT, Nb.RENDERBUFFER, a.__webglRenderbuffer) : a.depthBuffer && a.stencilBuffer && Nb.framebufferRenderbuffer(Nb.FRAMEBUFFER, Nb.DEPTH_STENCIL_ATTACHMENT, Nb.RENDERBUFFER, a.__webglRenderbuffer) : vb(a.__webglRenderbuffer, a), 
                c && Nb.generateMipmap(Nb.TEXTURE_2D);
                b ? Nb.bindTexture(Nb.TEXTURE_CUBE_MAP, null) : Nb.bindTexture(Nb.TEXTURE_2D, null), 
                Nb.bindRenderbuffer(Nb.RENDERBUFFER, null), Nb.bindFramebuffer(Nb.FRAMEBUFFER, null);
            }
            var g, h, i, j, k;
            a ? (g = b ? a.__webglFramebuffer[a.activeCubeFace] : a.__webglFramebuffer, h = a.width, 
            i = a.height, j = 0, k = 0) : (g = null, h = oc, i = pc, j = mc, k = nc), g !== Wb && (Nb.bindFramebuffer(Nb.FRAMEBUFFER, g), 
            Nb.viewport(j, k, h, i), Wb = g), qc = h, rc = i;
        }, this.shadowMapPlugin = new v.ShadowMapPlugin(), this.addPrePlugin(this.shadowMapPlugin), 
        this.addPostPlugin(new v.SpritePlugin()), this.addPostPlugin(new v.LensFlarePlugin());
    }, v.WebGLRenderTarget = function(a, b, c) {
        this.width = a, this.height = b, c = c || {}, this.wrapS = void 0 !== c.wrapS ? c.wrapS : v.ClampToEdgeWrapping, 
        this.wrapT = void 0 !== c.wrapT ? c.wrapT : v.ClampToEdgeWrapping, this.magFilter = void 0 !== c.magFilter ? c.magFilter : v.LinearFilter, 
        this.minFilter = void 0 !== c.minFilter ? c.minFilter : v.LinearMipMapLinearFilter, 
        this.anisotropy = void 0 !== c.anisotropy ? c.anisotropy : 1, this.offset = new v.Vector2(0, 0), 
        this.repeat = new v.Vector2(1, 1), this.format = void 0 !== c.format ? c.format : v.RGBAFormat, 
        this.type = void 0 !== c.type ? c.type : v.UnsignedByteType, this.depthBuffer = void 0 !== c.depthBuffer ? c.depthBuffer : !0, 
        this.stencilBuffer = void 0 !== c.stencilBuffer ? c.stencilBuffer : !0, this.generateMipmaps = !0, 
        this.shareDepthFrom = null;
    }, v.WebGLRenderTarget.prototype = {
        constructor: v.WebGLRenderTarget,
        addEventListener: v.EventDispatcher.prototype.addEventListener,
        hasEventListener: v.EventDispatcher.prototype.hasEventListener,
        removeEventListener: v.EventDispatcher.prototype.removeEventListener,
        dispatchEvent: v.EventDispatcher.prototype.dispatchEvent,
        clone: function() {
            var a = new v.WebGLRenderTarget(this.width, this.height);
            return a.wrapS = this.wrapS, a.wrapT = this.wrapT, a.magFilter = this.magFilter, 
            a.minFilter = this.minFilter, a.anisotropy = this.anisotropy, a.offset.copy(this.offset), 
            a.repeat.copy(this.repeat), a.format = this.format, a.type = this.type, a.depthBuffer = this.depthBuffer, 
            a.stencilBuffer = this.stencilBuffer, a.generateMipmaps = this.generateMipmaps, 
            a.shareDepthFrom = this.shareDepthFrom, a;
        },
        dispose: function() {
            this.dispatchEvent({
                type: "dispose"
            });
        }
    }, v.WebGLRenderTargetCube = function(a, b, c) {
        v.WebGLRenderTarget.call(this, a, b, c), this.activeCubeFace = 0;
    }, v.WebGLRenderTargetCube.prototype = Object.create(v.WebGLRenderTarget.prototype), 
    v.RenderableVertex = function() {
        this.positionWorld = new v.Vector3(), this.positionScreen = new v.Vector4(), this.visible = !0;
    }, v.RenderableVertex.prototype.copy = function(a) {
        this.positionWorld.copy(a.positionWorld), this.positionScreen.copy(a.positionScreen);
    }, v.RenderableFace3 = function() {
        this.v1 = new v.RenderableVertex(), this.v2 = new v.RenderableVertex(), this.v3 = new v.RenderableVertex(), 
        this.centroidModel = new v.Vector3(), this.normalModel = new v.Vector3(), this.normalModelView = new v.Vector3(), 
        this.vertexNormalsLength = 0, this.vertexNormalsModel = [ new v.Vector3(), new v.Vector3(), new v.Vector3() ], 
        this.vertexNormalsModelView = [ new v.Vector3(), new v.Vector3(), new v.Vector3() ], 
        this.color = null, this.material = null, this.uvs = [ [] ], this.z = null;
    }, v.RenderableFace4 = function() {
        this.v1 = new v.RenderableVertex(), this.v2 = new v.RenderableVertex(), this.v3 = new v.RenderableVertex(), 
        this.v4 = new v.RenderableVertex(), this.centroidModel = new v.Vector3(), this.normalModel = new v.Vector3(), 
        this.normalModelView = new v.Vector3(), this.vertexNormalsLength = 0, this.vertexNormalsModel = [ new v.Vector3(), new v.Vector3(), new v.Vector3(), new v.Vector3() ], 
        this.vertexNormalsModelView = [ new v.Vector3(), new v.Vector3(), new v.Vector3(), new v.Vector3() ], 
        this.color = null, this.material = null, this.uvs = [ [] ], this.z = null;
    }, v.RenderableObject = function() {
        this.object = null, this.z = null;
    }, v.RenderableParticle = function() {
        this.object = null, this.x = null, this.y = null, this.z = null, this.rotation = null, 
        this.scale = new v.Vector2(), this.material = null;
    }, v.RenderableLine = function() {
        this.z = null, this.v1 = new v.RenderableVertex(), this.v2 = new v.RenderableVertex(), 
        this.vertexColors = [ new v.Color(), new v.Color() ], this.material = null;
    }, v.GeometryUtils = {
        merge: function(a, b, c) {
            var d, e, f = a.vertices.length, g = (a.faceVertexUvs[0].length, b instanceof v.Mesh ? b.geometry : b), h = a.vertices, i = g.vertices, j = a.faces, k = g.faces, l = a.faceVertexUvs[0], m = g.faceVertexUvs[0];
            void 0 === c && (c = 0), b instanceof v.Mesh && (b.matrixAutoUpdate && b.updateMatrix(), 
            d = b.matrix, e = new v.Matrix3().getNormalMatrix(d));
            for (var n = 0, o = i.length; o > n; n++) {
                var p = i[n], q = p.clone();
                d && q.applyMatrix4(d), h.push(q);
            }
            for (n = 0, o = k.length; o > n; n++) {
                var r, s, t, u = k[n], w = u.vertexNormals, x = u.vertexColors;
                u instanceof v.Face3 ? r = new v.Face3(u.a + f, u.b + f, u.c + f) : u instanceof v.Face4 && (r = new v.Face4(u.a + f, u.b + f, u.c + f, u.d + f)), 
                r.normal.copy(u.normal), e && r.normal.applyMatrix3(e).normalize();
                for (var y = 0, z = w.length; z > y; y++) s = w[y].clone(), e && s.applyMatrix3(e).normalize(), 
                r.vertexNormals.push(s);
                r.color.copy(u.color);
                for (var y = 0, z = x.length; z > y; y++) t = x[y], r.vertexColors.push(t.clone());
                r.materialIndex = u.materialIndex + c, r.centroid.copy(u.centroid), d && r.centroid.applyMatrix4(d), 
                j.push(r);
            }
            for (n = 0, o = m.length; o > n; n++) {
                for (var A = m[n], B = [], y = 0, z = A.length; z > y; y++) B.push(new v.Vector2(A[y].x, A[y].y));
                l.push(B);
            }
        },
        removeMaterials: function(a, b) {
            for (var c = {}, d = 0, e = b.length; e > d; d++) c[b[d]] = !0;
            for (var f, g = [], d = 0, e = a.faces.length; e > d; d++) f = a.faces[d], f.materialIndex in c || g.push(f);
            a.faces = g;
        },
        randomPointInTriangle: function(a, b, c) {
            var d, e, f, g = new v.Vector3(), h = v.GeometryUtils.__v1;
            return d = v.GeometryUtils.random(), e = v.GeometryUtils.random(), d + e > 1 && (d = 1 - d, 
            e = 1 - e), f = 1 - d - e, g.copy(a), g.multiplyScalar(d), h.copy(b), h.multiplyScalar(e), 
            g.add(h), h.copy(c), h.multiplyScalar(f), g.add(h), g;
        },
        randomPointInFace: function(a, b, c) {
            var d, e, f, g;
            if (a instanceof v.Face3) return d = b.vertices[a.a], e = b.vertices[a.b], f = b.vertices[a.c], 
            v.GeometryUtils.randomPointInTriangle(d, e, f);
            if (a instanceof v.Face4) {
                d = b.vertices[a.a], e = b.vertices[a.b], f = b.vertices[a.c], g = b.vertices[a.d];
                var h, i;
                c ? a._area1 && a._area2 ? (h = a._area1, i = a._area2) : (h = v.GeometryUtils.triangleArea(d, e, g), 
                i = v.GeometryUtils.triangleArea(e, f, g), a._area1 = h, a._area2 = i) : (h = v.GeometryUtils.triangleArea(d, e, g), 
                i = v.GeometryUtils.triangleArea(e, f, g));
                var j = v.GeometryUtils.random() * (h + i);
                return h > j ? v.GeometryUtils.randomPointInTriangle(d, e, g) : v.GeometryUtils.randomPointInTriangle(e, f, g);
            }
        },
        randomPointsInGeometry: function(a, b) {
            function c(a) {
                function b(c, d) {
                    if (c > d) return c;
                    var e = c + Math.floor((d - c) / 2);
                    return n[e] > a ? b(c, e - 1) : n[e] < a ? b(e + 1, d) : e;
                }
                var c = b(0, n.length - 1);
                return c;
            }
            var d, e, f, g, h, i, j = a.faces, k = a.vertices, l = j.length, m = 0, n = [];
            for (e = 0; l > e; e++) d = j[e], d instanceof v.Face3 ? (f = k[d.a], g = k[d.b], 
            h = k[d.c], d._area = v.GeometryUtils.triangleArea(f, g, h)) : d instanceof v.Face4 && (f = k[d.a], 
            g = k[d.b], h = k[d.c], i = k[d.d], d._area1 = v.GeometryUtils.triangleArea(f, g, i), 
            d._area2 = v.GeometryUtils.triangleArea(g, h, i), d._area = d._area1 + d._area2), 
            m += d._area, n[e] = m;
            var o, p, q = [], r = {};
            for (e = 0; b > e; e++) o = v.GeometryUtils.random() * m, p = c(o), q[e] = v.GeometryUtils.randomPointInFace(j[p], a, !0), 
            r[p] ? r[p] += 1 : r[p] = 1;
            return q;
        },
        triangleArea: function(a, b, c) {
            var d = v.GeometryUtils.__v1, e = v.GeometryUtils.__v2;
            return d.subVectors(b, a), e.subVectors(c, a), d.cross(e), .5 * d.length();
        },
        center: function(a) {
            a.computeBoundingBox();
            var b = a.boundingBox, c = new v.Vector3();
            return c.addVectors(b.min, b.max), c.multiplyScalar(-.5), a.applyMatrix(new v.Matrix4().makeTranslation(c.x, c.y, c.z)), 
            a.computeBoundingBox(), c;
        },
        normalizeUVs: function(a) {
            for (var b = a.faceVertexUvs[0], c = 0, d = b.length; d > c; c++) for (var e = b[c], f = 0, g = e.length; g > f; f++) 1 !== e[f].x && (e[f].x = e[f].x - Math.floor(e[f].x)), 
            1 !== e[f].y && (e[f].y = e[f].y - Math.floor(e[f].y));
        },
        triangulateQuads: function(a) {
            var b, c, d, e, f = [], g = [], h = [];
            for (b = 0, c = a.faceUvs.length; c > b; b++) g[b] = [];
            for (b = 0, c = a.faceVertexUvs.length; c > b; b++) h[b] = [];
            for (b = 0, c = a.faces.length; c > b; b++) {
                var i = a.faces[b];
                if (i instanceof v.Face4) {
                    var j = i.a, k = i.b, l = i.c, m = i.d, n = new v.Face3(), o = new v.Face3();
                    for (n.color.copy(i.color), o.color.copy(i.color), n.materialIndex = i.materialIndex, 
                    o.materialIndex = i.materialIndex, n.a = j, n.b = k, n.c = m, o.a = k, o.b = l, 
                    o.c = m, 4 === i.vertexColors.length && (n.vertexColors[0] = i.vertexColors[0].clone(), 
                    n.vertexColors[1] = i.vertexColors[1].clone(), n.vertexColors[2] = i.vertexColors[3].clone(), 
                    o.vertexColors[0] = i.vertexColors[1].clone(), o.vertexColors[1] = i.vertexColors[2].clone(), 
                    o.vertexColors[2] = i.vertexColors[3].clone()), f.push(n, o), d = 0, e = a.faceVertexUvs.length; e > d; d++) if (a.faceVertexUvs[d].length) {
                        var p = a.faceVertexUvs[d][b], q = p[0], r = p[1], s = p[2], t = p[3], u = [ q.clone(), r.clone(), t.clone() ], w = [ r.clone(), s.clone(), t.clone() ];
                        h[d].push(u, w);
                    }
                    for (d = 0, e = a.faceUvs.length; e > d; d++) if (a.faceUvs[d].length) {
                        var x = a.faceUvs[d][b];
                        g[d].push(x, x);
                    }
                } else {
                    for (f.push(i), d = 0, e = a.faceUvs.length; e > d; d++) g[d].push(a.faceUvs[d][b]);
                    for (d = 0, e = a.faceVertexUvs.length; e > d; d++) h[d].push(a.faceVertexUvs[d][b]);
                }
            }
            a.faces = f, a.faceUvs = g, a.faceVertexUvs = h, a.computeCentroids(), a.computeFaceNormals(), 
            a.computeVertexNormals(), a.hasTangents && a.computeTangents();
        },
        setMaterialIndex: function(a, b, c, d) {
            for (var e = a.faces, f = c || 0, g = d || e.length - 1, h = f; g >= h; h++) e[h].materialIndex = b;
        }
    }, v.GeometryUtils.random = v.Math.random16, v.GeometryUtils.__v1 = new v.Vector3(), 
    v.GeometryUtils.__v2 = new v.Vector3(), v.ImageUtils = {
        crossOrigin: "anonymous",
        loadTexture: function(a, b, c, d) {
            var e = new Image(), f = new v.Texture(e, b), g = new v.ImageLoader();
            return g.addEventListener("load", function(a) {
                f.image = a.content, f.needsUpdate = !0, c && c(f);
            }), g.addEventListener("error", function(a) {
                d && d(a.message);
            }), g.crossOrigin = this.crossOrigin, g.load(a, e), f.sourceFile = a, f;
        },
        loadCompressedTexture: function(a, b, c, d) {
            var e = new v.CompressedTexture();
            e.mapping = b;
            var f = new XMLHttpRequest();
            return f.onload = function() {
                var a = f.response, b = v.ImageUtils.parseDDS(a, !0);
                e.format = b.format, e.mipmaps = b.mipmaps, e.image.width = b.width, e.image.height = b.height, 
                e.generateMipmaps = !1, e.needsUpdate = !0, c && c(e);
            }, f.onerror = d, f.open("GET", a, !0), f.responseType = "arraybuffer", f.send(null), 
            e;
        },
        loadTextureCube: function(a, b, c, d) {
            var e = [];
            e.loadCount = 0;
            var f = new v.Texture();
            f.image = e, void 0 !== b && (f.mapping = b), f.flipY = !1;
            for (var g = 0, h = a.length; h > g; ++g) {
                var i = new Image();
                e[g] = i, i.onload = function() {
                    e.loadCount += 1, 6 === e.loadCount && (f.needsUpdate = !0, c && c(f));
                }, i.onerror = d, i.crossOrigin = this.crossOrigin, i.src = a[g];
            }
            return f;
        },
        loadCompressedTextureCube: function(a, b, c, d) {
            var e = [];
            e.loadCount = 0;
            var f = new v.CompressedTexture();
            f.image = e, void 0 !== b && (f.mapping = b), f.flipY = !1, f.generateMipmaps = !1;
            var g = function(a, b) {
                return function() {
                    var d = a.response, g = v.ImageUtils.parseDDS(d, !0);
                    b.format = g.format, b.mipmaps = g.mipmaps, b.width = g.width, b.height = g.height, 
                    e.loadCount += 1, 6 === e.loadCount && (f.format = g.format, f.needsUpdate = !0, 
                    c && c(f));
                };
            };
            if (a instanceof Array) for (var h = 0, i = a.length; i > h; ++h) {
                var j = {};
                e[h] = j;
                var k = new XMLHttpRequest();
                k.onload = g(k, j), k.onerror = d;
                var l = a[h];
                k.open("GET", l, !0), k.responseType = "arraybuffer", k.send(null);
            } else {
                var l = a, k = new XMLHttpRequest();
                k.onload = function() {
                    var a = k.response, b = v.ImageUtils.parseDDS(a, !0);
                    if (b.isCubemap) {
                        for (var d = b.mipmaps.length / b.mipmapCount, g = 0; d > g; g++) {
                            e[g] = {
                                mipmaps: []
                            };
                            for (var h = 0; h < b.mipmapCount; h++) e[g].mipmaps.push(b.mipmaps[g * b.mipmapCount + h]), 
                            e[g].format = b.format, e[g].width = b.width, e[g].height = b.height;
                        }
                        f.format = b.format, f.needsUpdate = !0, c && c(f);
                    }
                }, k.onerror = d, k.open("GET", l, !0), k.responseType = "arraybuffer", k.send(null);
            }
            return f;
        },
        parseDDS: function(a, b) {
            function c(a) {
                return a.charCodeAt(0) + (a.charCodeAt(1) << 8) + (a.charCodeAt(2) << 16) + (a.charCodeAt(3) << 24);
            }
            function d(a) {
                return String.fromCharCode(255 & a, 255 & a >> 8, 255 & a >> 16, 255 & a >> 24);
            }
            var e = {
                mipmaps: [],
                width: 0,
                height: 0,
                format: null,
                mipmapCount: 1
            }, f = 542327876, g = 131072, h = 512, i = 4, j = c("DXT1"), k = c("DXT3"), l = c("DXT5"), m = 31, n = 0, o = 1, p = 2, q = 3, r = 4, s = 7, t = 20, u = 21, w = 28, x = new Int32Array(a, 0, m);
            if (x[n] !== f) return console.error("ImageUtils.parseDDS(): Invalid magic number in DDS header"), 
            e;
            if (!x[t] & i) return console.error("ImageUtils.parseDDS(): Unsupported format, must contain a FourCC code"), 
            e;
            var y, z = x[u];
            switch (z) {
              case j:
                y = 8, e.format = v.RGB_S3TC_DXT1_Format;
                break;

              case k:
                y = 16, e.format = v.RGBA_S3TC_DXT3_Format;
                break;

              case l:
                y = 16, e.format = v.RGBA_S3TC_DXT5_Format;
                break;

              default:
                return console.error("ImageUtils.parseDDS(): Unsupported FourCC code: ", d(z)), 
                e;
            }
            e.mipmapCount = 1, x[p] & g && b !== !1 && (e.mipmapCount = Math.max(1, x[s])), 
            e.isCubemap = x[w] & h ? !0 : !1, e.width = x[r], e.height = x[q];
            for (var A = x[o] + 4, B = e.width, C = e.height, D = e.isCubemap ? 6 : 1, E = 0; D > E; E++) {
                for (var F = 0; F < e.mipmapCount; F++) {
                    var G = Math.max(4, B) / 4 * Math.max(4, C) / 4 * y, H = new Uint8Array(a, A, G), I = {
                        data: H,
                        width: B,
                        height: C
                    };
                    e.mipmaps.push(I), A += G, B = Math.max(.5 * B, 1), C = Math.max(.5 * C, 1);
                }
                B = e.width, C = e.height;
            }
            return e;
        },
        getNormalMap: function(a, b) {
            var c = function(a, b) {
                return [ a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0] ];
            }, d = function(a, b) {
                return [ a[0] - b[0], a[1] - b[1], a[2] - b[2] ];
            }, e = function(a) {
                var b = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
                return [ a[0] / b, a[1] / b, a[2] / b ];
            };
            b = 1 | b;
            var f = a.width, g = a.height, h = document.createElement("canvas");
            h.width = f, h.height = g;
            var i = h.getContext("2d");
            i.drawImage(a, 0, 0);
            for (var j = i.getImageData(0, 0, f, g).data, k = i.createImageData(f, g), l = k.data, m = 0; f > m; m++) for (var n = 0; g > n; n++) {
                var o = 0 > n - 1 ? 0 : n - 1, p = n + 1 > g - 1 ? g - 1 : n + 1, q = 0 > m - 1 ? 0 : m - 1, r = m + 1 > f - 1 ? f - 1 : m + 1, s = [], t = [ 0, 0, j[4 * (n * f + m)] / 255 * b ];
                s.push([ -1, 0, j[4 * (n * f + q)] / 255 * b ]), s.push([ -1, -1, j[4 * (o * f + q)] / 255 * b ]), 
                s.push([ 0, -1, j[4 * (o * f + m)] / 255 * b ]), s.push([ 1, -1, j[4 * (o * f + r)] / 255 * b ]), 
                s.push([ 1, 0, j[4 * (n * f + r)] / 255 * b ]), s.push([ 1, 1, j[4 * (p * f + r)] / 255 * b ]), 
                s.push([ 0, 1, j[4 * (p * f + m)] / 255 * b ]), s.push([ -1, 1, j[4 * (p * f + q)] / 255 * b ]);
                for (var u = [], v = s.length, w = 0; v > w; w++) {
                    var x = s[w], y = s[(w + 1) % v];
                    x = d(x, t), y = d(y, t), u.push(e(c(x, y)));
                }
                for (var z = [ 0, 0, 0 ], w = 0; w < u.length; w++) z[0] += u[w][0], z[1] += u[w][1], 
                z[2] += u[w][2];
                z[0] /= u.length, z[1] /= u.length, z[2] /= u.length;
                var A = 4 * (n * f + m);
                l[A] = 0 | 255 * ((z[0] + 1) / 2), l[A + 1] = 0 | 255 * ((z[1] + 1) / 2), l[A + 2] = 0 | 255 * z[2], 
                l[A + 3] = 255;
            }
            return i.putImageData(k, 0, 0), h;
        },
        generateDataTexture: function(a, b, c) {
            for (var d = a * b, e = new Uint8Array(3 * d), f = Math.floor(255 * c.r), g = Math.floor(255 * c.g), h = Math.floor(255 * c.b), i = 0; d > i; i++) e[3 * i] = f, 
            e[3 * i + 1] = g, e[3 * i + 2] = h;
            var j = new v.DataTexture(e, a, b, v.RGBFormat);
            return j.needsUpdate = !0, j;
        }
    }, v.SceneUtils = {
        createMultiMaterialObject: function(a, b) {
            for (var c = new v.Object3D(), d = 0, e = b.length; e > d; d++) c.add(new v.Mesh(a, b[d]));
            return c;
        },
        detach: function(a, b, c) {
            a.applyMatrix(b.matrixWorld), b.remove(a), c.add(a);
        },
        attach: function(a, b, c) {
            var d = new v.Matrix4();
            d.getInverse(c.matrixWorld), a.applyMatrix(d), b.remove(a), c.add(a);
        }
    }, v.FontUtils = {
        faces: {},
        face: "helvetiker",
        weight: "normal",
        style: "normal",
        size: 150,
        divisions: 10,
        getFace: function() {
            return this.faces[this.face][this.weight][this.style];
        },
        loadFace: function(a) {
            var b = a.familyName.toLowerCase(), c = this;
            return c.faces[b] = c.faces[b] || {}, c.faces[b][a.cssFontWeight] = c.faces[b][a.cssFontWeight] || {}, 
            c.faces[b][a.cssFontWeight][a.cssFontStyle] = a, c.faces[b][a.cssFontWeight][a.cssFontStyle] = a, 
            a;
        },
        drawText: function(a) {
            var b, c = this.getFace(), d = this.size / c.resolution, e = 0, f = String(a).split(""), g = f.length, h = [];
            for (b = 0; g > b; b++) {
                var i = new v.Path(), j = this.extractGlyphPoints(f[b], c, d, e, i);
                e += j.offset, h.push(j.path);
            }
            var k = e / 2;
            return {
                paths: h,
                offset: k
            };
        },
        extractGlyphPoints: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, w, x, y, z = [], A = b.glyphs[a] || b.glyphs["?"];
            if (A) {
                if (A.o) for (i = A._cachedOutline || (A._cachedOutline = A.o.split(" ")), k = i.length, 
                l = c, m = c, f = 0; k > f; ) switch (j = i[f++]) {
                  case "m":
                    n = i[f++] * l + d, o = i[f++] * m, e.moveTo(n, o);
                    break;

                  case "l":
                    n = i[f++] * l + d, o = i[f++] * m, e.lineTo(n, o);
                    break;

                  case "q":
                    if (p = i[f++] * l + d, q = i[f++] * m, t = i[f++] * l + d, u = i[f++] * m, e.quadraticCurveTo(t, u, p, q), 
                    y = z[z.length - 1]) for (r = y.x, s = y.y, g = 1, h = this.divisions; h >= g; g++) {
                        var B = g / h;
                        v.Shape.Utils.b2(B, r, t, p), v.Shape.Utils.b2(B, s, u, q);
                    }
                    break;

                  case "b":
                    if (p = i[f++] * l + d, q = i[f++] * m, t = i[f++] * l + d, u = i[f++] * -m, w = i[f++] * l + d, 
                    x = i[f++] * -m, e.bezierCurveTo(p, q, t, u, w, x), y = z[z.length - 1]) for (r = y.x, 
                    s = y.y, g = 1, h = this.divisions; h >= g; g++) {
                        var B = g / h;
                        v.Shape.Utils.b3(B, r, t, w, p), v.Shape.Utils.b3(B, s, u, x, q);
                    }
                }
                return {
                    offset: A.ha * c,
                    path: e
                };
            }
        }
    }, v.FontUtils.generateShapes = function(a, b) {
        b = b || {};
        var c = void 0 !== b.size ? b.size : 100, d = void 0 !== b.curveSegments ? b.curveSegments : 4, e = void 0 !== b.font ? b.font : "helvetiker", f = void 0 !== b.weight ? b.weight : "normal", g = void 0 !== b.style ? b.style : "normal";
        v.FontUtils.size = c, v.FontUtils.divisions = d, v.FontUtils.face = e, v.FontUtils.weight = f, 
        v.FontUtils.style = g;
        for (var h = v.FontUtils.drawText(a), i = h.paths, j = [], k = 0, l = i.length; l > k; k++) Array.prototype.push.apply(j, i[k].toShapes());
        return j;
    }, function(a) {
        var b = 1e-10, c = function(a, b) {
            var c = a.length;
            if (3 > c) return null;
            var f, g, h, i = [], j = [], k = [];
            if (d(a) > 0) for (g = 0; c > g; g++) j[g] = g; else for (g = 0; c > g; g++) j[g] = c - 1 - g;
            var l = c, m = 2 * l;
            for (g = l - 1; l > 2; ) {
                if (m-- <= 0) return console.log("Warning, unable to triangulate polygon!"), b ? k : i;
                if (f = g, f >= l && (f = 0), g = f + 1, g >= l && (g = 0), h = g + 1, h >= l && (h = 0), 
                e(a, f, g, h, l, j)) {
                    var n, o, p, q, r;
                    for (n = j[f], o = j[g], p = j[h], i.push([ a[n], a[o], a[p] ]), k.push([ j[f], j[g], j[h] ]), 
                    q = g, r = g + 1; l > r; q++, r++) j[q] = j[r];
                    l--, m = 2 * l;
                }
            }
            return b ? k : i;
        }, d = function(a) {
            for (var b = a.length, c = 0, d = b - 1, e = 0; b > e; d = e++) c += a[d].x * a[e].y - a[e].x * a[d].y;
            return .5 * c;
        }, e = function(a, c, d, e, f, g) {
            var h, i, j, k, l, m, n, o, p;
            if (i = a[g[c]].x, j = a[g[c]].y, k = a[g[d]].x, l = a[g[d]].y, m = a[g[e]].x, n = a[g[e]].y, 
            b > (k - i) * (n - j) - (l - j) * (m - i)) return !1;
            var q, r, s, t, u, v, w, x, y, z, A, B, C, D, E;
            for (q = m - k, r = n - l, s = i - m, t = j - n, u = k - i, v = l - j, h = 0; f > h; h++) if (h !== c && h !== d && h !== e && (o = a[g[h]].x, 
            p = a[g[h]].y, w = o - i, x = p - j, y = o - k, z = p - l, A = o - m, B = p - n, 
            E = q * z - r * y, C = u * x - v * w, D = s * B - t * A, E >= 0 && D >= 0 && C >= 0)) return !1;
            return !0;
        };
        return a.Triangulate = c, a.Triangulate.area = d, a;
    }(v.FontUtils), self._typeface_js = {
        faces: v.FontUtils.faces,
        loadFace: v.FontUtils.loadFace
    }, v.typeface_js = self._typeface_js, v.Curve = function() {}, v.Curve.prototype.getPoint = function() {
        return console.log("Warning, getPoint() not implemented!"), null;
    }, v.Curve.prototype.getPointAt = function(a) {
        var b = this.getUtoTmapping(a);
        return this.getPoint(b);
    }, v.Curve.prototype.getPoints = function(a) {
        a || (a = 5);
        var b, c = [];
        for (b = 0; a >= b; b++) c.push(this.getPoint(b / a));
        return c;
    }, v.Curve.prototype.getSpacedPoints = function(a) {
        a || (a = 5);
        var b, c = [];
        for (b = 0; a >= b; b++) c.push(this.getPointAt(b / a));
        return c;
    }, v.Curve.prototype.getLength = function() {
        var a = this.getLengths();
        return a[a.length - 1];
    }, v.Curve.prototype.getLengths = function(a) {
        if (a || (a = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200), this.cacheArcLengths && this.cacheArcLengths.length == a + 1 && !this.needsUpdate) return this.cacheArcLengths;
        this.needsUpdate = !1;
        var b, c, d = [], e = this.getPoint(0), f = 0;
        for (d.push(0), c = 1; a >= c; c++) b = this.getPoint(c / a), f += b.distanceTo(e), 
        d.push(f), e = b;
        return this.cacheArcLengths = d, d;
    }, v.Curve.prototype.updateArcLengths = function() {
        this.needsUpdate = !0, this.getLengths();
    }, v.Curve.prototype.getUtoTmapping = function(a, b) {
        var c, d = this.getLengths(), e = 0, f = d.length;
        c = b ? b : a * d[f - 1];
        for (var g, h = 0, i = f - 1; i >= h; ) if (e = Math.floor(h + (i - h) / 2), g = d[e] - c, 
        0 > g) h = e + 1; else {
            if (!(g > 0)) {
                i = e;
                break;
            }
            i = e - 1;
        }
        if (e = i, d[e] == c) {
            var j = e / (f - 1);
            return j;
        }
        var k = d[e], l = d[e + 1], m = l - k, n = (c - k) / m, j = (e + n) / (f - 1);
        return j;
    }, v.Curve.prototype.getTangent = function(a) {
        var b = 1e-4, c = a - b, d = a + b;
        0 > c && (c = 0), d > 1 && (d = 1);
        var e = this.getPoint(c), f = this.getPoint(d), g = f.clone().sub(e);
        return g.normalize();
    }, v.Curve.prototype.getTangentAt = function(a) {
        var b = this.getUtoTmapping(a);
        return this.getTangent(b);
    }, v.LineCurve = function(a, b) {
        this.v1 = a, this.v2 = b;
    }, v.LineCurve.prototype = Object.create(v.Curve.prototype), v.LineCurve.prototype.getPoint = function(a) {
        var b = this.v2.clone().sub(this.v1);
        return b.multiplyScalar(a).add(this.v1), b;
    }, v.LineCurve.prototype.getPointAt = function(a) {
        return this.getPoint(a);
    }, v.LineCurve.prototype.getTangent = function() {
        var a = this.v2.clone().sub(this.v1);
        return a.normalize();
    }, v.QuadraticBezierCurve = function(a, b, c) {
        this.v0 = a, this.v1 = b, this.v2 = c;
    }, v.QuadraticBezierCurve.prototype = Object.create(v.Curve.prototype), v.QuadraticBezierCurve.prototype.getPoint = function(a) {
        var b, c;
        return b = v.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x), c = v.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y), 
        new v.Vector2(b, c);
    }, v.QuadraticBezierCurve.prototype.getTangent = function(a) {
        var b, c;
        b = v.Curve.Utils.tangentQuadraticBezier(a, this.v0.x, this.v1.x, this.v2.x), c = v.Curve.Utils.tangentQuadraticBezier(a, this.v0.y, this.v1.y, this.v2.y);
        var d = new v.Vector2(b, c);
        return d.normalize(), d;
    }, v.CubicBezierCurve = function(a, b, c, d) {
        this.v0 = a, this.v1 = b, this.v2 = c, this.v3 = d;
    }, v.CubicBezierCurve.prototype = Object.create(v.Curve.prototype), v.CubicBezierCurve.prototype.getPoint = function(a) {
        var b, c;
        return b = v.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x), c = v.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y), 
        new v.Vector2(b, c);
    }, v.CubicBezierCurve.prototype.getTangent = function(a) {
        var b, c;
        b = v.Curve.Utils.tangentCubicBezier(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x), 
        c = v.Curve.Utils.tangentCubicBezier(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
        var d = new v.Vector2(b, c);
        return d.normalize(), d;
    }, v.SplineCurve = function(a) {
        this.points = void 0 == a ? [] : a;
    }, v.SplineCurve.prototype = Object.create(v.Curve.prototype), v.SplineCurve.prototype.getPoint = function(a) {
        var b, c, d, e = new v.Vector2(), f = [], g = this.points;
        return b = (g.length - 1) * a, c = Math.floor(b), d = b - c, f[0] = 0 == c ? c : c - 1, 
        f[1] = c, f[2] = c > g.length - 2 ? g.length - 1 : c + 1, f[3] = c > g.length - 3 ? g.length - 1 : c + 2, 
        e.x = v.Curve.Utils.interpolate(g[f[0]].x, g[f[1]].x, g[f[2]].x, g[f[3]].x, d), 
        e.y = v.Curve.Utils.interpolate(g[f[0]].y, g[f[1]].y, g[f[2]].y, g[f[3]].y, d), 
        e;
    }, v.EllipseCurve = function(a, b, c, d, e, f, g) {
        this.aX = a, this.aY = b, this.xRadius = c, this.yRadius = d, this.aStartAngle = e, 
        this.aEndAngle = f, this.aClockwise = g;
    }, v.EllipseCurve.prototype = Object.create(v.Curve.prototype), v.EllipseCurve.prototype.getPoint = function(a) {
        var b = this.aEndAngle - this.aStartAngle;
        this.aClockwise || (a = 1 - a);
        var c = this.aStartAngle + a * b, d = this.aX + this.xRadius * Math.cos(c), e = this.aY + this.yRadius * Math.sin(c);
        return new v.Vector2(d, e);
    }, v.ArcCurve = function(a, b, c, d, e, f) {
        v.EllipseCurve.call(this, a, b, c, c, d, e, f);
    }, v.ArcCurve.prototype = Object.create(v.EllipseCurve.prototype), v.Curve.Utils = {
        tangentQuadraticBezier: function(a, b, c, d) {
            return 2 * (1 - a) * (c - b) + 2 * a * (d - c);
        },
        tangentCubicBezier: function(a, b, c, d, e) {
            return -3 * b * (1 - a) * (1 - a) + 3 * c * (1 - a) * (1 - a) - 6 * a * c * (1 - a) + 6 * a * d * (1 - a) - 3 * a * a * d + 3 * a * a * e;
        },
        tangentSpline: function(a) {
            var b = 6 * a * a - 6 * a, c = 3 * a * a - 4 * a + 1, d = -6 * a * a + 6 * a, e = 3 * a * a - 2 * a;
            return b + c + d + e;
        },
        interpolate: function(a, b, c, d, e) {
            var f = .5 * (c - a), g = .5 * (d - b), h = e * e, i = e * h;
            return (2 * b - 2 * c + f + g) * i + (-3 * b + 3 * c - 2 * f - g) * h + f * e + b;
        }
    }, v.Curve.create = function(a, b) {
        return a.prototype = Object.create(v.Curve.prototype), a.prototype.getPoint = b, 
        a;
    }, v.LineCurve3 = v.Curve.create(function(a, b) {
        this.v1 = a, this.v2 = b;
    }, function(a) {
        var b = new v.Vector3();
        return b.subVectors(this.v2, this.v1), b.multiplyScalar(a), b.add(this.v1), b;
    }), v.QuadraticBezierCurve3 = v.Curve.create(function(a, b, c) {
        this.v0 = a, this.v1 = b, this.v2 = c;
    }, function(a) {
        var b, c, d;
        return b = v.Shape.Utils.b2(a, this.v0.x, this.v1.x, this.v2.x), c = v.Shape.Utils.b2(a, this.v0.y, this.v1.y, this.v2.y), 
        d = v.Shape.Utils.b2(a, this.v0.z, this.v1.z, this.v2.z), new v.Vector3(b, c, d);
    }), v.CubicBezierCurve3 = v.Curve.create(function(a, b, c, d) {
        this.v0 = a, this.v1 = b, this.v2 = c, this.v3 = d;
    }, function(a) {
        var b, c, d;
        return b = v.Shape.Utils.b3(a, this.v0.x, this.v1.x, this.v2.x, this.v3.x), c = v.Shape.Utils.b3(a, this.v0.y, this.v1.y, this.v2.y, this.v3.y), 
        d = v.Shape.Utils.b3(a, this.v0.z, this.v1.z, this.v2.z, this.v3.z), new v.Vector3(b, c, d);
    }), v.SplineCurve3 = v.Curve.create(function(a) {
        this.points = void 0 == a ? [] : a;
    }, function(a) {
        var b, c, d, e = new v.Vector3(), f = [], g = this.points;
        b = (g.length - 1) * a, c = Math.floor(b), d = b - c, f[0] = 0 == c ? c : c - 1, 
        f[1] = c, f[2] = c > g.length - 2 ? g.length - 1 : c + 1, f[3] = c > g.length - 3 ? g.length - 1 : c + 2;
        var h = g[f[0]], i = g[f[1]], j = g[f[2]], k = g[f[3]];
        return e.x = v.Curve.Utils.interpolate(h.x, i.x, j.x, k.x, d), e.y = v.Curve.Utils.interpolate(h.y, i.y, j.y, k.y, d), 
        e.z = v.Curve.Utils.interpolate(h.z, i.z, j.z, k.z, d), e;
    }), v.ClosedSplineCurve3 = v.Curve.create(function(a) {
        this.points = void 0 == a ? [] : a;
    }, function(a) {
        var b, c, d, e = new v.Vector3(), f = [], g = this.points;
        return b = (g.length - 0) * a, c = Math.floor(b), d = b - c, c += c > 0 ? 0 : (Math.floor(Math.abs(c) / g.length) + 1) * g.length, 
        f[0] = (c - 1) % g.length, f[1] = c % g.length, f[2] = (c + 1) % g.length, f[3] = (c + 2) % g.length, 
        e.x = v.Curve.Utils.interpolate(g[f[0]].x, g[f[1]].x, g[f[2]].x, g[f[3]].x, d), 
        e.y = v.Curve.Utils.interpolate(g[f[0]].y, g[f[1]].y, g[f[2]].y, g[f[3]].y, d), 
        e.z = v.Curve.Utils.interpolate(g[f[0]].z, g[f[1]].z, g[f[2]].z, g[f[3]].z, d), 
        e;
    }), v.CurvePath = function() {
        this.curves = [], this.bends = [], this.autoClose = !1;
    }, v.CurvePath.prototype = Object.create(v.Curve.prototype), v.CurvePath.prototype.add = function(a) {
        this.curves.push(a);
    }, v.CurvePath.prototype.checkConnection = function() {}, v.CurvePath.prototype.closePath = function() {
        var a = this.curves[0].getPoint(0), b = this.curves[this.curves.length - 1].getPoint(1);
        a.equals(b) || this.curves.push(new v.LineCurve(b, a));
    }, v.CurvePath.prototype.getPoint = function(a) {
        for (var b, c, d = a * this.getLength(), e = this.getCurveLengths(), f = 0; f < e.length; ) {
            if (e[f] >= d) {
                b = e[f] - d, c = this.curves[f];
                var g = 1 - b / c.getLength();
                return c.getPointAt(g);
            }
            f++;
        }
        return null;
    }, v.CurvePath.prototype.getLength = function() {
        var a = this.getCurveLengths();
        return a[a.length - 1];
    }, v.CurvePath.prototype.getCurveLengths = function() {
        if (this.cacheLengths && this.cacheLengths.length == this.curves.length) return this.cacheLengths;
        var a, b = [], c = 0, d = this.curves.length;
        for (a = 0; d > a; a++) c += this.curves[a].getLength(), b.push(c);
        return this.cacheLengths = b, b;
    }, v.CurvePath.prototype.getBoundingBox = function() {
        var a, b, c, d, e, f, g = this.getPoints();
        a = b = Number.NEGATIVE_INFINITY, d = e = Number.POSITIVE_INFINITY;
        var h, i, j, k, l = g[0] instanceof v.Vector3;
        for (k = l ? new v.Vector3() : new v.Vector2(), i = 0, j = g.length; j > i; i++) h = g[i], 
        h.x > a ? a = h.x : h.x < d && (d = h.x), h.y > b ? b = h.y : h.y < e && (e = h.y), 
        l && (h.z > c ? c = h.z : h.z < f && (f = h.z)), k.add(h);
        var m = {
            minX: d,
            minY: e,
            maxX: a,
            maxY: b,
            centroid: k.divideScalar(j)
        };
        return l && (m.maxZ = c, m.minZ = f), m;
    }, v.CurvePath.prototype.createPointsGeometry = function(a) {
        var b = this.getPoints(a, !0);
        return this.createGeometry(b);
    }, v.CurvePath.prototype.createSpacedPointsGeometry = function(a) {
        var b = this.getSpacedPoints(a, !0);
        return this.createGeometry(b);
    }, v.CurvePath.prototype.createGeometry = function(a) {
        for (var b = new v.Geometry(), c = 0; c < a.length; c++) b.vertices.push(new v.Vector3(a[c].x, a[c].y, a[c].z || 0));
        return b;
    }, v.CurvePath.prototype.addWrapPath = function(a) {
        this.bends.push(a);
    }, v.CurvePath.prototype.getTransformedPoints = function(a, b) {
        var c, d, e = this.getPoints(a);
        for (b || (b = this.bends), c = 0, d = b.length; d > c; c++) e = this.getWrapPoints(e, b[c]);
        return e;
    }, v.CurvePath.prototype.getTransformedSpacedPoints = function(a, b) {
        var c, d, e = this.getSpacedPoints(a);
        for (b || (b = this.bends), c = 0, d = b.length; d > c; c++) e = this.getWrapPoints(e, b[c]);
        return e;
    }, v.CurvePath.prototype.getWrapPoints = function(a, b) {
        var c, d, e, f, g, h, i = this.getBoundingBox();
        for (c = 0, d = a.length; d > c; c++) {
            e = a[c], f = e.x, g = e.y, h = f / i.maxX, h = b.getUtoTmapping(h, f);
            var j = b.getPoint(h), k = b.getNormalVector(h).multiplyScalar(g);
            e.x = j.x + k.x, e.y = j.y + k.y;
        }
        return a;
    }, v.Gyroscope = function() {
        v.Object3D.call(this);
    }, v.Gyroscope.prototype = Object.create(v.Object3D.prototype), v.Gyroscope.prototype.updateMatrixWorld = function(a) {
        this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || a) && (this.parent ? (this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), 
        this.matrixWorld.decompose(this.translationWorld, this.rotationWorld, this.scaleWorld), 
        this.matrix.decompose(this.translationObject, this.rotationObject, this.scaleObject), 
        this.matrixWorld.makeFromPositionQuaternionScale(this.translationWorld, this.rotationObject, this.scaleWorld)) : this.matrixWorld.copy(this.matrix), 
        this.matrixWorldNeedsUpdate = !1, a = !0);
        for (var b = 0, c = this.children.length; c > b; b++) this.children[b].updateMatrixWorld(a);
    }, v.Gyroscope.prototype.translationWorld = new v.Vector3(), v.Gyroscope.prototype.translationObject = new v.Vector3(), 
    v.Gyroscope.prototype.rotationWorld = new v.Quaternion(), v.Gyroscope.prototype.rotationObject = new v.Quaternion(), 
    v.Gyroscope.prototype.scaleWorld = new v.Vector3(), v.Gyroscope.prototype.scaleObject = new v.Vector3(), 
    v.Path = function(a) {
        v.CurvePath.call(this), this.actions = [], a && this.fromPoints(a);
    }, v.Path.prototype = Object.create(v.CurvePath.prototype), v.PathActions = {
        MOVE_TO: "moveTo",
        LINE_TO: "lineTo",
        QUADRATIC_CURVE_TO: "quadraticCurveTo",
        BEZIER_CURVE_TO: "bezierCurveTo",
        CSPLINE_THRU: "splineThru",
        ARC: "arc",
        ELLIPSE: "ellipse"
    }, v.Path.prototype.fromPoints = function(a) {
        this.moveTo(a[0].x, a[0].y);
        for (var b = 1, c = a.length; c > b; b++) this.lineTo(a[b].x, a[b].y);
    }, v.Path.prototype.moveTo = function() {
        var a = Array.prototype.slice.call(arguments);
        this.actions.push({
            action: v.PathActions.MOVE_TO,
            args: a
        });
    }, v.Path.prototype.lineTo = function(a, b) {
        var c = Array.prototype.slice.call(arguments), d = this.actions[this.actions.length - 1].args, e = d[d.length - 2], f = d[d.length - 1], g = new v.LineCurve(new v.Vector2(e, f), new v.Vector2(a, b));
        this.curves.push(g), this.actions.push({
            action: v.PathActions.LINE_TO,
            args: c
        });
    }, v.Path.prototype.quadraticCurveTo = function(a, b, c, d) {
        var e = Array.prototype.slice.call(arguments), f = this.actions[this.actions.length - 1].args, g = f[f.length - 2], h = f[f.length - 1], i = new v.QuadraticBezierCurve(new v.Vector2(g, h), new v.Vector2(a, b), new v.Vector2(c, d));
        this.curves.push(i), this.actions.push({
            action: v.PathActions.QUADRATIC_CURVE_TO,
            args: e
        });
    }, v.Path.prototype.bezierCurveTo = function(a, b, c, d, e, f) {
        var g = Array.prototype.slice.call(arguments), h = this.actions[this.actions.length - 1].args, i = h[h.length - 2], j = h[h.length - 1], k = new v.CubicBezierCurve(new v.Vector2(i, j), new v.Vector2(a, b), new v.Vector2(c, d), new v.Vector2(e, f));
        this.curves.push(k), this.actions.push({
            action: v.PathActions.BEZIER_CURVE_TO,
            args: g
        });
    }, v.Path.prototype.splineThru = function(a) {
        var b = Array.prototype.slice.call(arguments), c = this.actions[this.actions.length - 1].args, d = c[c.length - 2], e = c[c.length - 1], f = [ new v.Vector2(d, e) ];
        Array.prototype.push.apply(f, a);
        var g = new v.SplineCurve(f);
        this.curves.push(g), this.actions.push({
            action: v.PathActions.CSPLINE_THRU,
            args: b
        });
    }, v.Path.prototype.arc = function(a, b, c, d, e, f) {
        var g = this.actions[this.actions.length - 1].args, h = g[g.length - 2], i = g[g.length - 1];
        this.absarc(a + h, b + i, c, d, e, f);
    }, v.Path.prototype.absarc = function(a, b, c, d, e, f) {
        this.absellipse(a, b, c, c, d, e, f);
    }, v.Path.prototype.ellipse = function(a, b, c, d, e, f, g) {
        var h = this.actions[this.actions.length - 1].args, i = h[h.length - 2], j = h[h.length - 1];
        this.absellipse(a + i, b + j, c, d, e, f, g);
    }, v.Path.prototype.absellipse = function(a, b, c, d, e, f, g) {
        var h = Array.prototype.slice.call(arguments), i = new v.EllipseCurve(a, b, c, d, e, f, g);
        this.curves.push(i);
        var j = i.getPoint(g ? 1 : 0);
        h.push(j.x), h.push(j.y), this.actions.push({
            action: v.PathActions.ELLIPSE,
            args: h
        });
    }, v.Path.prototype.getSpacedPoints = function(a) {
        a || (a = 40);
        for (var b = [], c = 0; a > c; c++) b.push(this.getPoint(c / a));
        return b;
    }, v.Path.prototype.getPoints = function(a, b) {
        if (this.useSpacedPoints) return console.log("tata"), this.getSpacedPoints(a, b);
        a = a || 12;
        var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = [];
        for (c = 0, d = this.actions.length; d > c; c++) switch (e = this.actions[c], f = e.action, 
        g = e.args, f) {
          case v.PathActions.MOVE_TO:
            u.push(new v.Vector2(g[0], g[1]));
            break;

          case v.PathActions.LINE_TO:
            u.push(new v.Vector2(g[0], g[1]));
            break;

          case v.PathActions.QUADRATIC_CURVE_TO:
            for (h = g[2], i = g[3], l = g[0], m = g[1], u.length > 0 ? (p = u[u.length - 1], 
            n = p.x, o = p.y) : (p = this.actions[c - 1].args, n = p[p.length - 2], o = p[p.length - 1]), 
            q = 1; a >= q; q++) r = q / a, s = v.Shape.Utils.b2(r, n, l, h), t = v.Shape.Utils.b2(r, o, m, i), 
            u.push(new v.Vector2(s, t));
            break;

          case v.PathActions.BEZIER_CURVE_TO:
            for (h = g[4], i = g[5], l = g[0], m = g[1], j = g[2], k = g[3], u.length > 0 ? (p = u[u.length - 1], 
            n = p.x, o = p.y) : (p = this.actions[c - 1].args, n = p[p.length - 2], o = p[p.length - 1]), 
            q = 1; a >= q; q++) r = q / a, s = v.Shape.Utils.b3(r, n, l, j, h), t = v.Shape.Utils.b3(r, o, m, k, i), 
            u.push(new v.Vector2(s, t));
            break;

          case v.PathActions.CSPLINE_THRU:
            p = this.actions[c - 1].args;
            var w = new v.Vector2(p[p.length - 2], p[p.length - 1]), x = [ w ], y = a * g[0].length;
            x = x.concat(g[0]);
            var z = new v.SplineCurve(x);
            for (q = 1; y >= q; q++) u.push(z.getPointAt(q / y));
            break;

          case v.PathActions.ARC:
            var A, B = g[0], C = g[1], D = g[2], E = g[3], F = g[4], G = !!g[5], H = F - E, I = 2 * a;
            for (q = 1; I >= q; q++) r = q / I, G || (r = 1 - r), A = E + r * H, s = B + D * Math.cos(A), 
            t = C + D * Math.sin(A), u.push(new v.Vector2(s, t));
            break;

          case v.PathActions.ELLIPSE:
            var A, B = g[0], C = g[1], J = g[2], K = g[3], E = g[4], F = g[5], G = !!g[6], H = F - E, I = 2 * a;
            for (q = 1; I >= q; q++) r = q / I, G || (r = 1 - r), A = E + r * H, s = B + J * Math.cos(A), 
            t = C + K * Math.sin(A), u.push(new v.Vector2(s, t));
        }
        var L = u[u.length - 1], M = 1e-10;
        return Math.abs(L.x - u[0].x) < M && Math.abs(L.y - u[0].y) < M && u.splice(u.length - 1, 1), 
        b && u.push(u[0]), u;
    }, v.Path.prototype.toShapes = function() {
        var a, b, c, d, e, f = [], g = new v.Path();
        for (a = 0, b = this.actions.length; b > a; a++) c = this.actions[a], e = c.args, 
        d = c.action, d == v.PathActions.MOVE_TO && 0 != g.actions.length && (f.push(g), 
        g = new v.Path()), g[d].apply(g, e);
        if (0 != g.actions.length && f.push(g), 0 == f.length) return [];
        var h, i, j = [], k = !v.Shape.Utils.isClockWise(f[0].getPoints());
        if (1 == f.length) return h = f[0], i = new v.Shape(), i.actions = h.actions, i.curves = h.curves, 
        j.push(i), j;
        if (k) for (i = new v.Shape(), a = 0, b = f.length; b > a; a++) h = f[a], v.Shape.Utils.isClockWise(h.getPoints()) ? (i.actions = h.actions, 
        i.curves = h.curves, j.push(i), i = new v.Shape()) : i.holes.push(h); else {
            for (a = 0, b = f.length; b > a; a++) h = f[a], v.Shape.Utils.isClockWise(h.getPoints()) ? (i && j.push(i), 
            i = new v.Shape(), i.actions = h.actions, i.curves = h.curves) : i.holes.push(h);
            j.push(i);
        }
        return j;
    }, v.Shape = function() {
        v.Path.apply(this, arguments), this.holes = [];
    }, v.Shape.prototype = Object.create(v.Path.prototype), v.Shape.prototype.extrude = function(a) {
        var b = new v.ExtrudeGeometry(this, a);
        return b;
    }, v.Shape.prototype.makeGeometry = function(a) {
        var b = new v.ShapeGeometry(this, a);
        return b;
    }, v.Shape.prototype.getPointsHoles = function(a) {
        var b, c = this.holes.length, d = [];
        for (b = 0; c > b; b++) d[b] = this.holes[b].getTransformedPoints(a, this.bends);
        return d;
    }, v.Shape.prototype.getSpacedPointsHoles = function(a) {
        var b, c = this.holes.length, d = [];
        for (b = 0; c > b; b++) d[b] = this.holes[b].getTransformedSpacedPoints(a, this.bends);
        return d;
    }, v.Shape.prototype.extractAllPoints = function(a) {
        return {
            shape: this.getTransformedPoints(a),
            holes: this.getPointsHoles(a)
        };
    }, v.Shape.prototype.extractPoints = function(a) {
        return this.useSpacedPoints ? this.extractAllSpacedPoints(a) : this.extractAllPoints(a);
    }, v.Shape.prototype.extractAllSpacedPoints = function(a) {
        return {
            shape: this.getTransformedSpacedPoints(a),
            holes: this.getSpacedPointsHoles(a)
        };
    }, v.Shape.Utils = {
        removeHoles: function(a, b) {
            var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s = a.concat(), t = s.concat(), u = [];
            for (g = 0; g < b.length; g++) {
                for (i = b[g], Array.prototype.push.apply(t, i), j = Number.POSITIVE_INFINITY, h = 0; h < i.length; h++) {
                    m = i[h];
                    var w = [];
                    for (l = 0; l < s.length; l++) n = s[l], k = m.distanceToSquared(n), w.push(k), 
                    j > k && (j = k, e = h, f = l);
                }
                c = f - 1 >= 0 ? f - 1 : s.length - 1, d = e - 1 >= 0 ? e - 1 : i.length - 1;
                var x = [ i[e], s[f], s[c] ], y = v.FontUtils.Triangulate.area(x), z = [ i[e], i[d], s[f] ], A = v.FontUtils.Triangulate.area(z), B = 1, C = -1, D = f, E = e;
                f += B, e += C, 0 > f && (f += s.length), f %= s.length, 0 > e && (e += i.length), 
                e %= i.length, c = f - 1 >= 0 ? f - 1 : s.length - 1, d = e - 1 >= 0 ? e - 1 : i.length - 1, 
                x = [ i[e], s[f], s[c] ];
                var F = v.FontUtils.Triangulate.area(x);
                z = [ i[e], i[d], s[f] ];
                var G = v.FontUtils.Triangulate.area(z);
                y + A > F + G && (f = D, e = E, 0 > f && (f += s.length), f %= s.length, 0 > e && (e += i.length), 
                e %= i.length, c = f - 1 >= 0 ? f - 1 : s.length - 1, d = e - 1 >= 0 ? e - 1 : i.length - 1), 
                o = s.slice(0, f), p = s.slice(f), q = i.slice(e), r = i.slice(0, e);
                var H = [ i[e], s[f], s[c] ], I = [ i[e], i[d], s[f] ];
                u.push(H), u.push(I), s = o.concat(q).concat(r).concat(p);
            }
            return {
                shape: s,
                isolatedPts: u,
                allpoints: t
            };
        },
        triangulateShape: function(a, b) {
            var c, d, e, f, g, h, i = v.Shape.Utils.removeHoles(a, b), j = i.shape, k = i.allpoints, l = i.isolatedPts, m = v.FontUtils.Triangulate(j, !1), n = {};
            for (c = 0, d = k.length; d > c; c++) g = k[c].x + ":" + k[c].y, void 0 !== n[g] && console.log("Duplicate point", g), 
            n[g] = c;
            for (c = 0, d = m.length; d > c; c++) for (f = m[c], e = 0; 3 > e; e++) g = f[e].x + ":" + f[e].y, 
            h = n[g], void 0 !== h && (f[e] = h);
            for (c = 0, d = l.length; d > c; c++) for (f = l[c], e = 0; 3 > e; e++) g = f[e].x + ":" + f[e].y, 
            h = n[g], void 0 !== h && (f[e] = h);
            return m.concat(l);
        },
        isClockWise: function(a) {
            return v.FontUtils.Triangulate.area(a) < 0;
        },
        b2p0: function(a, b) {
            var c = 1 - a;
            return c * c * b;
        },
        b2p1: function(a, b) {
            return 2 * (1 - a) * a * b;
        },
        b2p2: function(a, b) {
            return a * a * b;
        },
        b2: function(a, b, c, d) {
            return this.b2p0(a, b) + this.b2p1(a, c) + this.b2p2(a, d);
        },
        b3p0: function(a, b) {
            var c = 1 - a;
            return c * c * c * b;
        },
        b3p1: function(a, b) {
            var c = 1 - a;
            return 3 * c * c * a * b;
        },
        b3p2: function(a, b) {
            var c = 1 - a;
            return 3 * c * a * a * b;
        },
        b3p3: function(a, b) {
            return a * a * a * b;
        },
        b3: function(a, b, c, d, e) {
            return this.b3p0(a, b) + this.b3p1(a, c) + this.b3p2(a, d) + this.b3p3(a, e);
        }
    }, v.AnimationHandler = function() {
        var a = [], b = {}, c = {};
        c.update = function(b) {
            for (var c = 0; c < a.length; c++) a[c].update(b);
        }, c.addToUpdate = function(b) {
            -1 === a.indexOf(b) && a.push(b);
        }, c.removeFromUpdate = function(b) {
            var c = a.indexOf(b);
            -1 !== c && a.splice(c, 1);
        }, c.add = function(a) {
            void 0 !== b[a.name] && console.log("THREE.AnimationHandler.add: Warning! " + a.name + " already exists in library. Overwriting."), 
            b[a.name] = a, e(a);
        }, c.get = function(a) {
            return "string" == typeof a ? b[a] ? b[a] : (console.log("THREE.AnimationHandler.get: Couldn't find animation " + a), 
            null) : void 0;
        }, c.parse = function(a) {
            var b = [];
            if (a instanceof v.SkinnedMesh) for (var c = 0; c < a.bones.length; c++) b.push(a.bones[c]); else d(a, b);
            return b;
        };
        var d = function(a, b) {
            b.push(a);
            for (var c = 0; c < a.children.length; c++) d(a.children[c], b);
        }, e = function(a) {
            if (a.initialized !== !0) {
                for (var b = 0; b < a.hierarchy.length; b++) {
                    for (var c = 0; c < a.hierarchy[b].keys.length; c++) if (a.hierarchy[b].keys[c].time < 0 && (a.hierarchy[b].keys[c].time = 0), 
                    void 0 !== a.hierarchy[b].keys[c].rot && !(a.hierarchy[b].keys[c].rot instanceof v.Quaternion)) {
                        var d = a.hierarchy[b].keys[c].rot;
                        a.hierarchy[b].keys[c].rot = new v.Quaternion(d[0], d[1], d[2], d[3]);
                    }
                    if (a.hierarchy[b].keys.length && void 0 !== a.hierarchy[b].keys[0].morphTargets) {
                        for (var e = {}, c = 0; c < a.hierarchy[b].keys.length; c++) for (var f = 0; f < a.hierarchy[b].keys[c].morphTargets.length; f++) {
                            var g = a.hierarchy[b].keys[c].morphTargets[f];
                            e[g] = -1;
                        }
                        a.hierarchy[b].usedMorphTargets = e;
                        for (var c = 0; c < a.hierarchy[b].keys.length; c++) {
                            var h = {};
                            for (var g in e) {
                                for (var f = 0; f < a.hierarchy[b].keys[c].morphTargets.length; f++) if (a.hierarchy[b].keys[c].morphTargets[f] === g) {
                                    h[g] = a.hierarchy[b].keys[c].morphTargetsInfluences[f];
                                    break;
                                }
                                f === a.hierarchy[b].keys[c].morphTargets.length && (h[g] = 0);
                            }
                            a.hierarchy[b].keys[c].morphTargetsInfluences = h;
                        }
                    }
                    for (var c = 1; c < a.hierarchy[b].keys.length; c++) a.hierarchy[b].keys[c].time === a.hierarchy[b].keys[c - 1].time && (a.hierarchy[b].keys.splice(c, 1), 
                    c--);
                    for (var c = 0; c < a.hierarchy[b].keys.length; c++) a.hierarchy[b].keys[c].index = c;
                }
                var i = parseInt(a.length * a.fps, 10);
                a.JIT = {}, a.JIT.hierarchy = [];
                for (var b = 0; b < a.hierarchy.length; b++) a.JIT.hierarchy.push(new Array(i));
                a.initialized = !0;
            }
        };
        return c.LINEAR = 0, c.CATMULLROM = 1, c.CATMULLROM_FORWARD = 2, c;
    }(), v.Animation = function(a, b, c) {
        this.root = a, this.data = v.AnimationHandler.get(b), this.hierarchy = v.AnimationHandler.parse(a), 
        this.currentTime = 0, this.timeScale = 1, this.isPlaying = !1, this.isPaused = !0, 
        this.loop = !0, this.interpolationType = void 0 !== c ? c : v.AnimationHandler.LINEAR, 
        this.points = [], this.target = new v.Vector3();
    }, v.Animation.prototype.play = function(a, b) {
        if (this.isPlaying === !1) {
            this.isPlaying = !0, this.loop = void 0 !== a ? a : !0, this.currentTime = void 0 !== b ? b : 0;
            var c, d, e = this.hierarchy.length;
            for (c = 0; e > c; c++) {
                d = this.hierarchy[c], this.interpolationType !== v.AnimationHandler.CATMULLROM_FORWARD && (d.useQuaternion = !0), 
                d.matrixAutoUpdate = !0, void 0 === d.animationCache && (d.animationCache = {}, 
                d.animationCache.prevKey = {
                    pos: 0,
                    rot: 0,
                    scl: 0
                }, d.animationCache.nextKey = {
                    pos: 0,
                    rot: 0,
                    scl: 0
                }, d.animationCache.originalMatrix = d instanceof v.Bone ? d.skinMatrix : d.matrix);
                var f = d.animationCache.prevKey, g = d.animationCache.nextKey;
                f.pos = this.data.hierarchy[c].keys[0], f.rot = this.data.hierarchy[c].keys[0], 
                f.scl = this.data.hierarchy[c].keys[0], g.pos = this.getNextKeyWith("pos", c, 1), 
                g.rot = this.getNextKeyWith("rot", c, 1), g.scl = this.getNextKeyWith("scl", c, 1);
            }
            this.update(0);
        }
        this.isPaused = !1, v.AnimationHandler.addToUpdate(this);
    }, v.Animation.prototype.pause = function() {
        this.isPaused === !0 ? v.AnimationHandler.addToUpdate(this) : v.AnimationHandler.removeFromUpdate(this), 
        this.isPaused = !this.isPaused;
    }, v.Animation.prototype.stop = function() {
        this.isPlaying = !1, this.isPaused = !1, v.AnimationHandler.removeFromUpdate(this);
    }, v.Animation.prototype.update = function(a) {
        if (this.isPlaying !== !1) {
            var b, c, d, e, f, g, h, i, j, k, l = [ "pos", "rot", "scl" ];
            this.data.JIT.hierarchy;
            var m, n, o, p, q;
            this.currentTime += a * this.timeScale, n = this.currentTime, m = this.currentTime = this.currentTime % this.data.length, 
            k = parseInt(Math.min(m * this.data.fps, this.data.length * this.data.fps), 10);
            for (var r = 0, s = this.hierarchy.length; s > r; r++) {
                i = this.hierarchy[r], j = i.animationCache;
                for (var t = 0; 3 > t; t++) {
                    if (b = l[t], g = j.prevKey[b], h = j.nextKey[b], h.time <= n) {
                        if (n > m) {
                            if (!this.loop) return this.stop(), void 0;
                            for (g = this.data.hierarchy[r].keys[0], h = this.getNextKeyWith(b, r, 1); h.time < m; ) g = h, 
                            h = this.getNextKeyWith(b, r, h.index + 1);
                        } else do g = h, h = this.getNextKeyWith(b, r, h.index + 1); while (h.time < m);
                        j.prevKey[b] = g, j.nextKey[b] = h;
                    }
                    i.matrixAutoUpdate = !0, i.matrixWorldNeedsUpdate = !0, c = (m - g.time) / (h.time - g.time), 
                    e = g[b], f = h[b], (0 > c || c > 1) && (console.log("THREE.Animation.update: Warning! Scale out of bounds:" + c + " on bone " + r), 
                    c = 0 > c ? 0 : 1), "pos" === b ? (d = i.position, this.interpolationType === v.AnimationHandler.LINEAR ? (d.x = e[0] + (f[0] - e[0]) * c, 
                    d.y = e[1] + (f[1] - e[1]) * c, d.z = e[2] + (f[2] - e[2]) * c) : (this.interpolationType === v.AnimationHandler.CATMULLROM || this.interpolationType === v.AnimationHandler.CATMULLROM_FORWARD) && (this.points[0] = this.getPrevKeyWith("pos", r, g.index - 1).pos, 
                    this.points[1] = e, this.points[2] = f, this.points[3] = this.getNextKeyWith("pos", r, h.index + 1).pos, 
                    c = .33 * c + .33, o = this.interpolateCatmullRom(this.points, c), d.x = o[0], d.y = o[1], 
                    d.z = o[2], this.interpolationType === v.AnimationHandler.CATMULLROM_FORWARD && (p = this.interpolateCatmullRom(this.points, 1.01 * c), 
                    this.target.set(p[0], p[1], p[2]), this.target.sub(d), this.target.y = 0, this.target.normalize(), 
                    q = Math.atan2(this.target.x, this.target.z), i.rotation.set(0, q, 0)))) : "rot" === b ? v.Quaternion.slerp(e, f, i.quaternion, c) : "scl" === b && (d = i.scale, 
                    d.x = e[0] + (f[0] - e[0]) * c, d.y = e[1] + (f[1] - e[1]) * c, d.z = e[2] + (f[2] - e[2]) * c);
                }
            }
        }
    }, v.Animation.prototype.interpolateCatmullRom = function(a, b) {
        var c, d, e, f, g, h, i, j, k, l = [], m = [];
        return c = (a.length - 1) * b, d = Math.floor(c), e = c - d, l[0] = 0 === d ? d : d - 1, 
        l[1] = d, l[2] = d > a.length - 2 ? d : d + 1, l[3] = d > a.length - 3 ? d : d + 2, 
        h = a[l[0]], i = a[l[1]], j = a[l[2]], k = a[l[3]], f = e * e, g = e * f, m[0] = this.interpolate(h[0], i[0], j[0], k[0], e, f, g), 
        m[1] = this.interpolate(h[1], i[1], j[1], k[1], e, f, g), m[2] = this.interpolate(h[2], i[2], j[2], k[2], e, f, g), 
        m;
    }, v.Animation.prototype.interpolate = function(a, b, c, d, e, f, g) {
        var h = .5 * (c - a), i = .5 * (d - b);
        return (2 * (b - c) + h + i) * g + (-3 * (b - c) - 2 * h - i) * f + h * e + b;
    }, v.Animation.prototype.getNextKeyWith = function(a, b, c) {
        var d = this.data.hierarchy[b].keys;
        for (this.interpolationType === v.AnimationHandler.CATMULLROM || this.interpolationType === v.AnimationHandler.CATMULLROM_FORWARD ? c = c < d.length - 1 ? c : d.length - 1 : c %= d.length; c < d.length; c++) if (void 0 !== d[c][a]) return d[c];
        return this.data.hierarchy[b].keys[0];
    }, v.Animation.prototype.getPrevKeyWith = function(a, b, c) {
        var d = this.data.hierarchy[b].keys;
        for (c = this.interpolationType === v.AnimationHandler.CATMULLROM || this.interpolationType === v.AnimationHandler.CATMULLROM_FORWARD ? c > 0 ? c : 0 : c >= 0 ? c : c + d.length; c >= 0; c--) if (void 0 !== d[c][a]) return d[c];
        return this.data.hierarchy[b].keys[d.length - 1];
    }, v.KeyFrameAnimation = function(a, b, c) {
        this.root = a, this.data = v.AnimationHandler.get(b), this.hierarchy = v.AnimationHandler.parse(a), 
        this.currentTime = 0, this.timeScale = .001, this.isPlaying = !1, this.isPaused = !0, 
        this.loop = !0, this.JITCompile = void 0 !== c ? c : !0;
        for (var d = 0, e = this.hierarchy.length; e > d; d++) {
            var f = this.data.hierarchy[d].keys, g = this.data.hierarchy[d].sids, h = this.hierarchy[d];
            if (f.length && g) {
                for (var i = 0; i < g.length; i++) {
                    var j = g[i], k = this.getNextKeyWith(j, d, 0);
                    k && k.apply(j);
                }
                h.matrixAutoUpdate = !1, this.data.hierarchy[d].node.updateMatrix(), h.matrixWorldNeedsUpdate = !0;
            }
        }
    }, v.KeyFrameAnimation.prototype.play = function(a, b) {
        if (!this.isPlaying) {
            this.isPlaying = !0, this.loop = void 0 !== a ? a : !0, this.currentTime = void 0 !== b ? b : 0, 
            this.startTimeMs = b, this.startTime = 1e7, this.endTime = -this.startTime;
            var c, d, e, f = this.hierarchy.length;
            for (c = 0; f > c; c++) {
                d = this.hierarchy[c], e = this.data.hierarchy[c], d.useQuaternion = !0, void 0 === e.animationCache && (e.animationCache = {}, 
                e.animationCache.prevKey = null, e.animationCache.nextKey = null, e.animationCache.originalMatrix = d instanceof v.Bone ? d.skinMatrix : d.matrix);
                var g = this.data.hierarchy[c].keys;
                g.length && (e.animationCache.prevKey = g[0], e.animationCache.nextKey = g[1], this.startTime = Math.min(g[0].time, this.startTime), 
                this.endTime = Math.max(g[g.length - 1].time, this.endTime));
            }
            this.update(0);
        }
        this.isPaused = !1, v.AnimationHandler.addToUpdate(this);
    }, v.KeyFrameAnimation.prototype.pause = function() {
        this.isPaused ? v.AnimationHandler.addToUpdate(this) : v.AnimationHandler.removeFromUpdate(this), 
        this.isPaused = !this.isPaused;
    }, v.KeyFrameAnimation.prototype.stop = function() {
        this.isPlaying = !1, this.isPaused = !1, v.AnimationHandler.removeFromUpdate(this);
        for (var a = 0; a < this.data.hierarchy.length; a++) {
            var b = this.hierarchy[a], c = this.data.hierarchy[a];
            if (void 0 !== c.animationCache) {
                var d = c.animationCache.originalMatrix;
                b instanceof v.Bone ? (d.copy(b.skinMatrix), b.skinMatrix = d) : (d.copy(b.matrix), 
                b.matrix = d), delete c.animationCache;
            }
        }
    }, v.KeyFrameAnimation.prototype.update = function(a) {
        if (this.isPlaying) {
            var b, c, d, e, f, g, h, i, j = this.data.JIT.hierarchy;
            if (this.currentTime += a * this.timeScale, h = this.currentTime, g = this.currentTime = this.currentTime % this.data.length, 
            g < this.startTimeMs && (g = this.currentTime = this.startTimeMs + g), f = parseInt(Math.min(g * this.data.fps, this.data.length * this.data.fps), 10), 
            i = h > g, i && !this.loop) {
                for (var k = 0, l = this.hierarchy.length; l > k; k++) {
                    var m = this.data.hierarchy[k].keys, n = this.data.hierarchy[k].sids, o = m.length - 1, p = this.hierarchy[k];
                    if (m.length) {
                        for (var q = 0; q < n.length; q++) {
                            var r = n[q], s = this.getPrevKeyWith(r, k, o);
                            s && s.apply(r);
                        }
                        this.data.hierarchy[k].node.updateMatrix(), p.matrixWorldNeedsUpdate = !0;
                    }
                }
                return this.stop(), void 0;
            }
            if (!(g < this.startTime)) {
                for (var k = 0, l = this.hierarchy.length; l > k; k++) {
                    d = this.hierarchy[k], e = this.data.hierarchy[k];
                    var m = e.keys, t = e.animationCache;
                    if (this.JITCompile && void 0 !== j[k][f]) d instanceof v.Bone ? (d.skinMatrix = j[k][f], 
                    d.matrixWorldNeedsUpdate = !1) : (d.matrix = j[k][f], d.matrixWorldNeedsUpdate = !0); else if (m.length) {
                        if (this.JITCompile && t && (d instanceof v.Bone ? d.skinMatrix = t.originalMatrix : d.matrix = t.originalMatrix), 
                        b = t.prevKey, c = t.nextKey, b && c) {
                            if (c.time <= h) {
                                if (i && this.loop) for (b = m[0], c = m[1]; c.time < g; ) b = c, c = m[b.index + 1]; else if (!i) for (var u = m.length - 1; c.time < g && c.index !== u; ) b = c, 
                                c = m[b.index + 1];
                                t.prevKey = b, t.nextKey = c;
                            }
                            c.time >= g ? b.interpolate(c, g) : b.interpolate(c, c.time);
                        }
                        this.data.hierarchy[k].node.updateMatrix(), d.matrixWorldNeedsUpdate = !0;
                    }
                }
                if (this.JITCompile && void 0 === j[0][f]) {
                    this.hierarchy[0].updateMatrixWorld(!0);
                    for (var k = 0; k < this.hierarchy.length; k++) j[k][f] = this.hierarchy[k] instanceof v.Bone ? this.hierarchy[k].skinMatrix.clone() : this.hierarchy[k].matrix.clone();
                }
            }
        }
    }, v.KeyFrameAnimation.prototype.getNextKeyWith = function(a, b, c) {
        var d = this.data.hierarchy[b].keys;
        for (c %= d.length; c < d.length; c++) if (d[c].hasTarget(a)) return d[c];
        return d[0];
    }, v.KeyFrameAnimation.prototype.getPrevKeyWith = function(a, b, c) {
        var d = this.data.hierarchy[b].keys;
        for (c = c >= 0 ? c : c + d.length; c >= 0; c--) if (d[c].hasTarget(a)) return d[c];
        return d[d.length - 1];
    }, v.CubeCamera = function(a, b, c) {
        v.Object3D.call(this);
        var d = 90, e = 1, f = new v.PerspectiveCamera(d, e, a, b);
        f.up.set(0, -1, 0), f.lookAt(new v.Vector3(1, 0, 0)), this.add(f);
        var g = new v.PerspectiveCamera(d, e, a, b);
        g.up.set(0, -1, 0), g.lookAt(new v.Vector3(-1, 0, 0)), this.add(g);
        var h = new v.PerspectiveCamera(d, e, a, b);
        h.up.set(0, 0, 1), h.lookAt(new v.Vector3(0, 1, 0)), this.add(h);
        var i = new v.PerspectiveCamera(d, e, a, b);
        i.up.set(0, 0, -1), i.lookAt(new v.Vector3(0, -1, 0)), this.add(i);
        var j = new v.PerspectiveCamera(d, e, a, b);
        j.up.set(0, -1, 0), j.lookAt(new v.Vector3(0, 0, 1)), this.add(j);
        var k = new v.PerspectiveCamera(d, e, a, b);
        k.up.set(0, -1, 0), k.lookAt(new v.Vector3(0, 0, -1)), this.add(k), this.renderTarget = new v.WebGLRenderTargetCube(c, c, {
            format: v.RGBFormat,
            magFilter: v.LinearFilter,
            minFilter: v.LinearFilter
        }), this.updateCubeMap = function(a, b) {
            var c = this.renderTarget, d = c.generateMipmaps;
            c.generateMipmaps = !1, c.activeCubeFace = 0, a.render(b, f, c), c.activeCubeFace = 1, 
            a.render(b, g, c), c.activeCubeFace = 2, a.render(b, h, c), c.activeCubeFace = 3, 
            a.render(b, i, c), c.activeCubeFace = 4, a.render(b, j, c), c.generateMipmaps = d, 
            c.activeCubeFace = 5, a.render(b, k, c);
        };
    }, v.CubeCamera.prototype = Object.create(v.Object3D.prototype), v.CombinedCamera = function(a, b, c, d, e, f, g) {
        v.Camera.call(this), this.fov = c, this.left = -a / 2, this.right = a / 2, this.top = b / 2, 
        this.bottom = -b / 2, this.cameraO = new v.OrthographicCamera(a / -2, a / 2, b / 2, b / -2, f, g), 
        this.cameraP = new v.PerspectiveCamera(c, a / b, d, e), this.zoom = 1, this.toPerspective();
    }, v.CombinedCamera.prototype = Object.create(v.Camera.prototype), v.CombinedCamera.prototype.toPerspective = function() {
        this.near = this.cameraP.near, this.far = this.cameraP.far, this.cameraP.fov = this.fov / this.zoom, 
        this.cameraP.updateProjectionMatrix(), this.projectionMatrix = this.cameraP.projectionMatrix, 
        this.inPerspectiveMode = !0, this.inOrthographicMode = !1;
    }, v.CombinedCamera.prototype.toOrthographic = function() {
        var a = this.fov, b = this.cameraP.aspect, c = this.cameraP.near, d = this.cameraP.far, e = (c + d) / 2, f = Math.tan(a / 2) * e, g = 2 * f, h = g * b, i = h / 2;
        f /= this.zoom, i /= this.zoom, this.cameraO.left = -i, this.cameraO.right = i, 
        this.cameraO.top = f, this.cameraO.bottom = -f, this.cameraO.updateProjectionMatrix(), 
        this.near = this.cameraO.near, this.far = this.cameraO.far, this.projectionMatrix = this.cameraO.projectionMatrix, 
        this.inPerspectiveMode = !1, this.inOrthographicMode = !0;
    }, v.CombinedCamera.prototype.setSize = function(a, b) {
        this.cameraP.aspect = a / b, this.left = -a / 2, this.right = a / 2, this.top = b / 2, 
        this.bottom = -b / 2;
    }, v.CombinedCamera.prototype.setFov = function(a) {
        this.fov = a, this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic();
    }, v.CombinedCamera.prototype.updateProjectionMatrix = function() {
        this.inPerspectiveMode ? this.toPerspective() : (this.toPerspective(), this.toOrthographic());
    }, v.CombinedCamera.prototype.setLens = function(a, b) {
        void 0 === b && (b = 24);
        var c = 2 * v.Math.radToDeg(Math.atan(b / (2 * a)));
        return this.setFov(c), c;
    }, v.CombinedCamera.prototype.setZoom = function(a) {
        this.zoom = a, this.inPerspectiveMode ? this.toPerspective() : this.toOrthographic();
    }, v.CombinedCamera.prototype.toFrontView = function() {
        this.rotation.x = 0, this.rotation.y = 0, this.rotation.z = 0, this.rotationAutoUpdate = !1;
    }, v.CombinedCamera.prototype.toBackView = function() {
        this.rotation.x = 0, this.rotation.y = Math.PI, this.rotation.z = 0, this.rotationAutoUpdate = !1;
    }, v.CombinedCamera.prototype.toLeftView = function() {
        this.rotation.x = 0, this.rotation.y = -Math.PI / 2, this.rotation.z = 0, this.rotationAutoUpdate = !1;
    }, v.CombinedCamera.prototype.toRightView = function() {
        this.rotation.x = 0, this.rotation.y = Math.PI / 2, this.rotation.z = 0, this.rotationAutoUpdate = !1;
    }, v.CombinedCamera.prototype.toTopView = function() {
        this.rotation.x = -Math.PI / 2, this.rotation.y = 0, this.rotation.z = 0, this.rotationAutoUpdate = !1;
    }, v.CombinedCamera.prototype.toBottomView = function() {
        this.rotation.x = Math.PI / 2, this.rotation.y = 0, this.rotation.z = 0, this.rotationAutoUpdate = !1;
    }, v.CircleGeometry = function(a, b, c, d) {
        v.Geometry.call(this), a = a || 50, c = void 0 !== c ? c : 0, d = void 0 !== d ? d : 2 * Math.PI, 
        b = void 0 !== b ? Math.max(3, b) : 8;
        var e, f = [], g = new v.Vector3(), h = new v.Vector2(.5, .5);
        for (this.vertices.push(g), f.push(h), e = 0; b >= e; e++) {
            var i = new v.Vector3(), j = c + e / b * d;
            i.x = a * Math.cos(j), i.y = a * Math.sin(j), this.vertices.push(i), f.push(new v.Vector2((i.x / a + 1) / 2, (i.y / a + 1) / 2));
        }
        var k = new v.Vector3(0, 0, 1);
        for (e = 1; b >= e; e++) {
            var l = e, m = e + 1, n = 0;
            this.faces.push(new v.Face3(l, m, n, [ k, k, k ])), this.faceVertexUvs[0].push([ f[e], f[e + 1], h ]);
        }
        this.computeCentroids(), this.computeFaceNormals(), this.boundingSphere = new v.Sphere(new v.Vector3(), a);
    }, v.CircleGeometry.prototype = Object.create(v.Geometry.prototype), v.CubeGeometry = function(a, b, c, d, e, f) {
        function g(a, b, c, d, e, f, g, i) {
            var j, k, l, m = h.widthSegments, n = h.heightSegments, o = e / 2, p = f / 2, q = h.vertices.length;
            "x" === a && "y" === b || "y" === a && "x" === b ? j = "z" : "x" === a && "z" === b || "z" === a && "x" === b ? (j = "y", 
            n = h.depthSegments) : ("z" === a && "y" === b || "y" === a && "z" === b) && (j = "x", 
            m = h.depthSegments);
            var r = m + 1, s = n + 1, t = e / m, u = f / n, w = new v.Vector3();
            for (w[j] = g > 0 ? 1 : -1, l = 0; s > l; l++) for (k = 0; r > k; k++) {
                var x = new v.Vector3();
                x[a] = (k * t - o) * c, x[b] = (l * u - p) * d, x[j] = g, h.vertices.push(x);
            }
            for (l = 0; n > l; l++) for (k = 0; m > k; k++) {
                var y = k + r * l, z = k + r * (l + 1), A = k + 1 + r * (l + 1), B = k + 1 + r * l, C = new v.Face4(y + q, z + q, A + q, B + q);
                C.normal.copy(w), C.vertexNormals.push(w.clone(), w.clone(), w.clone(), w.clone()), 
                C.materialIndex = i, h.faces.push(C), h.faceVertexUvs[0].push([ new v.Vector2(k / m, 1 - l / n), new v.Vector2(k / m, 1 - (l + 1) / n), new v.Vector2((k + 1) / m, 1 - (l + 1) / n), new v.Vector2((k + 1) / m, 1 - l / n) ]);
            }
        }
        v.Geometry.call(this);
        var h = this;
        this.width = a, this.height = b, this.depth = c, this.widthSegments = d || 1, this.heightSegments = e || 1, 
        this.depthSegments = f || 1;
        var i = this.width / 2, j = this.height / 2, k = this.depth / 2;
        g("z", "y", -1, -1, this.depth, this.height, i, 0), g("z", "y", 1, -1, this.depth, this.height, -i, 1), 
        g("x", "z", 1, 1, this.width, this.depth, j, 2), g("x", "z", 1, -1, this.width, this.depth, -j, 3), 
        g("x", "y", 1, -1, this.width, this.height, k, 4), g("x", "y", -1, -1, this.width, this.height, -k, 5), 
        this.computeCentroids(), this.mergeVertices();
    }, v.CubeGeometry.prototype = Object.create(v.Geometry.prototype), v.CylinderGeometry = function(a, b, c, d, e, f) {
        v.Geometry.call(this), this.radiusTop = a = void 0 !== a ? a : 20, this.radiusBottom = b = void 0 !== b ? b : 20, 
        this.height = c = void 0 !== c ? c : 100, this.radiusSegments = d = d || 8, this.heightSegments = e = e || 1, 
        this.openEnded = f = void 0 !== f ? f : !1;
        var g, h, i = c / 2, j = [], k = [];
        for (h = 0; e >= h; h++) {
            var l = [], m = [], n = h / e, o = n * (b - a) + a;
            for (g = 0; d >= g; g++) {
                var p = g / d, q = new v.Vector3();
                q.x = o * Math.sin(2 * p * Math.PI), q.y = -n * c + i, q.z = o * Math.cos(2 * p * Math.PI), 
                this.vertices.push(q), l.push(this.vertices.length - 1), m.push(new v.Vector2(p, 1 - n));
            }
            j.push(l), k.push(m);
        }
        var r, s, t = (b - a) / c;
        for (g = 0; d > g; g++) for (0 !== a ? (r = this.vertices[j[0][g]].clone(), s = this.vertices[j[0][g + 1]].clone()) : (r = this.vertices[j[1][g]].clone(), 
        s = this.vertices[j[1][g + 1]].clone()), r.setY(Math.sqrt(r.x * r.x + r.z * r.z) * t).normalize(), 
        s.setY(Math.sqrt(s.x * s.x + s.z * s.z) * t).normalize(), h = 0; e > h; h++) {
            var u = j[h][g], w = j[h + 1][g], x = j[h + 1][g + 1], y = j[h][g + 1], z = r.clone(), A = r.clone(), B = s.clone(), C = s.clone(), D = k[h][g].clone(), E = k[h + 1][g].clone(), F = k[h + 1][g + 1].clone(), G = k[h][g + 1].clone();
            this.faces.push(new v.Face4(u, w, x, y, [ z, A, B, C ])), this.faceVertexUvs[0].push([ D, E, F, G ]);
        }
        if (f === !1 && a > 0) for (this.vertices.push(new v.Vector3(0, i, 0)), g = 0; d > g; g++) {
            var u = j[0][g], w = j[0][g + 1], x = this.vertices.length - 1, z = new v.Vector3(0, 1, 0), A = new v.Vector3(0, 1, 0), B = new v.Vector3(0, 1, 0), D = k[0][g].clone(), E = k[0][g + 1].clone(), F = new v.Vector2(E.u, 0);
            this.faces.push(new v.Face3(u, w, x, [ z, A, B ])), this.faceVertexUvs[0].push([ D, E, F ]);
        }
        if (f === !1 && b > 0) for (this.vertices.push(new v.Vector3(0, -i, 0)), g = 0; d > g; g++) {
            var u = j[h][g + 1], w = j[h][g], x = this.vertices.length - 1, z = new v.Vector3(0, -1, 0), A = new v.Vector3(0, -1, 0), B = new v.Vector3(0, -1, 0), D = k[h][g + 1].clone(), E = k[h][g].clone(), F = new v.Vector2(E.u, 1);
            this.faces.push(new v.Face3(u, w, x, [ z, A, B ])), this.faceVertexUvs[0].push([ D, E, F ]);
        }
        this.computeCentroids(), this.computeFaceNormals();
    }, v.CylinderGeometry.prototype = Object.create(v.Geometry.prototype), v.ExtrudeGeometry = function(a, b) {
        return "undefined" == typeof a ? (a = [], void 0) : (v.Geometry.call(this), a = a instanceof Array ? a : [ a ], 
        this.shapebb = a[a.length - 1].getBoundingBox(), this.addShapeList(a, b), this.computeCentroids(), 
        this.computeFaceNormals(), void 0);
    }, v.ExtrudeGeometry.prototype = Object.create(v.Geometry.prototype), v.ExtrudeGeometry.prototype.addShapeList = function(a, b) {
        for (var c = a.length, d = 0; c > d; d++) {
            var e = a[d];
            this.addShape(e, b);
        }
    }, v.ExtrudeGeometry.prototype.addShape = function(a, b) {
        function c(a, b, c) {
            return b || console.log("die"), b.clone().multiplyScalar(c).add(a);
        }
        function d(a, b, c) {
            return f(a, b, c);
        }
        function e(a, b, c) {
            var d = Math.atan2(b.y - a.y, b.x - a.x), e = Math.atan2(c.y - a.y, c.x - a.x);
            d > e && (e += 2 * Math.PI);
            var f = (d + e) / 2, g = -Math.cos(f), h = -Math.sin(f), i = new v.Vector2(g, h);
            return i;
        }
        function f(a, b, c) {
            var d, f, g, h, i, j, k = v.ExtrudeGeometry.__v1, l = v.ExtrudeGeometry.__v2, m = v.ExtrudeGeometry.__v3, n = v.ExtrudeGeometry.__v4, o = v.ExtrudeGeometry.__v5, p = v.ExtrudeGeometry.__v6;
            return k.set(a.x - b.x, a.y - b.y), l.set(a.x - c.x, a.y - c.y), d = k.normalize(), 
            f = l.normalize(), m.set(-d.y, d.x), n.set(f.y, -f.x), o.copy(a).add(m), p.copy(a).add(n), 
            o.equals(p) ? n.clone() : (o.copy(b).add(m), p.copy(c).add(n), g = d.dot(n), h = p.sub(o).dot(n), 
            0 === g && (console.log("Either infinite or no solutions!"), 0 === h ? console.log("Its finite solutions.") : console.log("Too bad, no solutions.")), 
            i = h / g, 0 > i ? e(a, b, c) : (j = d.multiplyScalar(i).add(o), j.sub(a).clone()));
        }
        function g() {
            if (r) {
                var a = 0, b = V * a;
                for (Y = 0; W > Y; Y++) U = N[Y], k(U[2] + b, U[1] + b, U[0] + b, !0);
                for (a = t + 2 * q, b = V * a, Y = 0; W > Y; Y++) U = N[Y], k(U[0] + b, U[1] + b, U[2] + b, !1);
            } else {
                for (Y = 0; W > Y; Y++) U = N[Y], k(U[2], U[1], U[0], !0);
                for (Y = 0; W > Y; Y++) U = N[Y], k(U[0] + V * t, U[1] + V * t, U[2] + V * t, !1);
            }
        }
        function h() {
            var a = 0;
            for (i(O, a), a += O.length, F = 0, G = L.length; G > F; F++) E = L[F], i(E, a), 
            a += E.length;
        }
        function i(a, b) {
            var c, d;
            for (Y = a.length; --Y >= 0; ) {
                c = Y, d = Y - 1, 0 > d && (d = a.length - 1);
                var e = 0, f = t + 2 * q;
                for (e = 0; f > e; e++) {
                    var g = V * e, h = V * (e + 1), i = b + c + g, j = b + d + g, k = b + d + h, m = b + c + h;
                    l(i, j, k, m, a, e, f, c, d);
                }
            }
        }
        function j(a, b, c) {
            H.vertices.push(new v.Vector3(a, b, c));
        }
        function k(c, d, e, f) {
            c += I, d += I, e += I, H.faces.push(new v.Face3(c, d, e, null, null, x));
            var g = f ? z.generateBottomUV(H, a, b, c, d, e) : z.generateTopUV(H, a, b, c, d, e);
            H.faceVertexUvs[0].push(g);
        }
        function l(c, d, e, f, g, h, i, j, k) {
            c += I, d += I, e += I, f += I, H.faces.push(new v.Face4(c, d, e, f, null, null, y));
            var l = z.generateSideWallUV(H, a, g, b, c, d, e, f, h, i, j, k);
            H.faceVertexUvs[0].push(l);
        }
        var m, n = void 0 !== b.amount ? b.amount : 100, o = void 0 !== b.bevelThickness ? b.bevelThickness : 6, p = void 0 !== b.bevelSize ? b.bevelSize : o - 2, q = void 0 !== b.bevelSegments ? b.bevelSegments : 3, r = void 0 !== b.bevelEnabled ? b.bevelEnabled : !0, s = void 0 !== b.curveSegments ? b.curveSegments : 12, t = void 0 !== b.steps ? b.steps : 1, u = b.extrudePath, w = !1, x = b.material, y = b.extrudeMaterial, z = void 0 !== b.UVGenerator ? b.UVGenerator : v.ExtrudeGeometry.WorldUVGenerator;
        this.shapebb;
        var A, B, C, D;
        u && (m = u.getSpacedPoints(t), w = !0, r = !1, A = void 0 !== b.frames ? b.frames : new v.TubeGeometry.FrenetFrames(u, t, !1), 
        B = new v.Vector3(), C = new v.Vector3(), D = new v.Vector3()), r || (q = 0, o = 0, 
        p = 0);
        var E, F, G, H = this, I = this.vertices.length, J = a.extractPoints(s), K = J.shape, L = J.holes, M = !v.Shape.Utils.isClockWise(K);
        if (M) {
            for (K = K.reverse(), F = 0, G = L.length; G > F; F++) E = L[F], v.Shape.Utils.isClockWise(E) && (L[F] = E.reverse());
            M = !1;
        }
        var N = v.Shape.Utils.triangulateShape(K, L), O = K;
        for (F = 0, G = L.length; G > F; F++) E = L[F], K = K.concat(E);
        var P, Q, R, S, T, U, V = K.length, W = N.length;
        O.length, 180 / Math.PI;
        for (var X = [], Y = 0, Z = O.length, $ = Z - 1, _ = Y + 1; Z > Y; Y++, $++, _++) $ === Z && ($ = 0), 
        _ === Z && (_ = 0), O[Y], O[$], O[_], X[Y] = d(O[Y], O[$], O[_]);
        var ab, bb = [], cb = X.concat();
        for (F = 0, G = L.length; G > F; F++) {
            for (E = L[F], ab = [], Y = 0, Z = E.length, $ = Z - 1, _ = Y + 1; Z > Y; Y++, $++, 
            _++) $ === Z && ($ = 0), _ === Z && (_ = 0), ab[Y] = d(E[Y], E[$], E[_]);
            bb.push(ab), cb = cb.concat(ab);
        }
        for (P = 0; q > P; P++) {
            for (R = P / q, S = o * (1 - R), Q = p * Math.sin(R * Math.PI / 2), Y = 0, Z = O.length; Z > Y; Y++) T = c(O[Y], X[Y], Q), 
            j(T.x, T.y, -S);
            for (F = 0, G = L.length; G > F; F++) for (E = L[F], ab = bb[F], Y = 0, Z = E.length; Z > Y; Y++) T = c(E[Y], ab[Y], Q), 
            j(T.x, T.y, -S);
        }
        for (Q = p, Y = 0; V > Y; Y++) T = r ? c(K[Y], cb[Y], Q) : K[Y], w ? (C.copy(A.normals[0]).multiplyScalar(T.x), 
        B.copy(A.binormals[0]).multiplyScalar(T.y), D.copy(m[0]).add(C).add(B), j(D.x, D.y, D.z)) : j(T.x, T.y, 0);
        var db;
        for (db = 1; t >= db; db++) for (Y = 0; V > Y; Y++) T = r ? c(K[Y], cb[Y], Q) : K[Y], 
        w ? (C.copy(A.normals[db]).multiplyScalar(T.x), B.copy(A.binormals[db]).multiplyScalar(T.y), 
        D.copy(m[db]).add(C).add(B), j(D.x, D.y, D.z)) : j(T.x, T.y, n / t * db);
        for (P = q - 1; P >= 0; P--) {
            for (R = P / q, S = o * (1 - R), Q = p * Math.sin(R * Math.PI / 2), Y = 0, Z = O.length; Z > Y; Y++) T = c(O[Y], X[Y], Q), 
            j(T.x, T.y, n + S);
            for (F = 0, G = L.length; G > F; F++) for (E = L[F], ab = bb[F], Y = 0, Z = E.length; Z > Y; Y++) T = c(E[Y], ab[Y], Q), 
            w ? j(T.x, T.y + m[t - 1].y, m[t - 1].x + S) : j(T.x, T.y, n + S);
        }
        g(), h();
    }, v.ExtrudeGeometry.WorldUVGenerator = {
        generateTopUV: function(a, b, c, d, e, f) {
            var g = a.vertices[d].x, h = a.vertices[d].y, i = a.vertices[e].x, j = a.vertices[e].y, k = a.vertices[f].x, l = a.vertices[f].y;
            return [ new v.Vector2(g, h), new v.Vector2(i, j), new v.Vector2(k, l) ];
        },
        generateBottomUV: function(a, b, c, d, e, f) {
            return this.generateTopUV(a, b, c, d, e, f);
        },
        generateSideWallUV: function(a, b, c, d, e, f, g, h) {
            var i = a.vertices[e].x, j = a.vertices[e].y, k = a.vertices[e].z, l = a.vertices[f].x, m = a.vertices[f].y, n = a.vertices[f].z, o = a.vertices[g].x, p = a.vertices[g].y, q = a.vertices[g].z, r = a.vertices[h].x, s = a.vertices[h].y, t = a.vertices[h].z;
            return Math.abs(j - m) < .01 ? [ new v.Vector2(i, 1 - k), new v.Vector2(l, 1 - n), new v.Vector2(o, 1 - q), new v.Vector2(r, 1 - t) ] : [ new v.Vector2(j, 1 - k), new v.Vector2(m, 1 - n), new v.Vector2(p, 1 - q), new v.Vector2(s, 1 - t) ];
        }
    }, v.ExtrudeGeometry.__v1 = new v.Vector2(), v.ExtrudeGeometry.__v2 = new v.Vector2(), 
    v.ExtrudeGeometry.__v3 = new v.Vector2(), v.ExtrudeGeometry.__v4 = new v.Vector2(), 
    v.ExtrudeGeometry.__v5 = new v.Vector2(), v.ExtrudeGeometry.__v6 = new v.Vector2(), 
    v.ShapeGeometry = function(a, b) {
        v.Geometry.call(this), a instanceof Array == !1 && (a = [ a ]), this.shapebb = a[a.length - 1].getBoundingBox(), 
        this.addShapeList(a, b), this.computeCentroids(), this.computeFaceNormals();
    }, v.ShapeGeometry.prototype = Object.create(v.Geometry.prototype), v.ShapeGeometry.prototype.addShapeList = function(a, b) {
        for (var c = 0, d = a.length; d > c; c++) this.addShape(a[c], b);
        return this;
    }, v.ShapeGeometry.prototype.addShape = function(a, b) {
        void 0 === b && (b = {});
        var c = void 0 !== b.curveSegments ? b.curveSegments : 12, d = b.material, e = void 0 === b.UVGenerator ? v.ExtrudeGeometry.WorldUVGenerator : b.UVGenerator;
        this.shapebb;
        var f, g, h, i = this.vertices.length, j = a.extractPoints(c), k = j.shape, l = j.holes, m = !v.Shape.Utils.isClockWise(k);
        if (m) {
            for (k = k.reverse(), f = 0, g = l.length; g > f; f++) h = l[f], v.Shape.Utils.isClockWise(h) && (l[f] = h.reverse());
            m = !1;
        }
        var n = v.Shape.Utils.triangulateShape(k, l), o = k;
        for (f = 0, g = l.length; g > f; f++) h = l[f], k = k.concat(h);
        var p, q, r = k.length, s = n.length;
        for (o.length, f = 0; r > f; f++) p = k[f], this.vertices.push(new v.Vector3(p.x, p.y, 0));
        for (f = 0; s > f; f++) {
            q = n[f];
            var t = q[0] + i, u = q[1] + i, w = q[2] + i;
            this.faces.push(new v.Face3(t, u, w, null, null, d)), this.faceVertexUvs[0].push(e.generateBottomUV(this, a, b, t, u, w));
        }
    }, v.LatheGeometry = function(a, b, c, d) {
        v.Geometry.call(this), b = b || 12, c = c || 0, d = d || 2 * Math.PI;
        for (var e = 1 / (a.length - 1), f = 1 / b, g = 0, h = b; h >= g; g++) for (var i = c + g * f * d, j = Math.cos(i), k = Math.sin(i), l = 0, m = a.length; m > l; l++) {
            var n = a[l], o = new v.Vector3();
            o.x = j * n.x - k * n.y, o.y = k * n.x + j * n.y, o.z = n.z, this.vertices.push(o);
        }
        for (var p = a.length, g = 0, h = b; h > g; g++) for (var l = 0, m = a.length - 1; m > l; l++) {
            var q = l + p * g, r = q, s = q + p, j = q + 1 + p, t = q + 1;
            this.faces.push(new v.Face4(r, s, j, t));
            var u = g * f, w = l * e, x = u + f, y = w + e;
            this.faceVertexUvs[0].push([ new v.Vector2(u, w), new v.Vector2(x, w), new v.Vector2(x, y), new v.Vector2(u, y) ]);
        }
        this.mergeVertices(), this.computeCentroids(), this.computeFaceNormals(), this.computeVertexNormals();
    }, v.LatheGeometry.prototype = Object.create(v.Geometry.prototype), v.PlaneGeometry = function(a, b, c, d) {
        v.Geometry.call(this), this.width = a, this.height = b, this.widthSegments = c || 1, 
        this.heightSegments = d || 1;
        var e, f, g = a / 2, h = b / 2, i = this.widthSegments, j = this.heightSegments, k = i + 1, l = j + 1, m = this.width / i, n = this.height / j, o = new v.Vector3(0, 0, 1);
        for (f = 0; l > f; f++) for (e = 0; k > e; e++) {
            var p = e * m - g, q = f * n - h;
            this.vertices.push(new v.Vector3(p, -q, 0));
        }
        for (f = 0; j > f; f++) for (e = 0; i > e; e++) {
            var r = e + k * f, s = e + k * (f + 1), t = e + 1 + k * (f + 1), u = e + 1 + k * f, w = new v.Face4(r, s, t, u);
            w.normal.copy(o), w.vertexNormals.push(o.clone(), o.clone(), o.clone(), o.clone()), 
            this.faces.push(w), this.faceVertexUvs[0].push([ new v.Vector2(e / i, 1 - f / j), new v.Vector2(e / i, 1 - (f + 1) / j), new v.Vector2((e + 1) / i, 1 - (f + 1) / j), new v.Vector2((e + 1) / i, 1 - f / j) ]);
        }
        this.computeCentroids();
    }, v.PlaneGeometry.prototype = Object.create(v.Geometry.prototype), v.RingGeometry = function(a, b, c, d, e, f) {
        v.Geometry.call(this), a = a || 0, b = b || 50, e = void 0 !== e ? e : 0, f = void 0 !== f ? f : 2 * Math.PI, 
        c = void 0 !== c ? Math.max(3, c) : 8, d = void 0 !== d ? Math.max(3, d) : 8;
        var g, h, i = [], j = a, k = (b - a) / d;
        for (g = 0; d >= g; g++) {
            for (h = 0; c >= h; h++) {
                var l = new v.Vector3(), m = e + h / c * f;
                l.x = j * Math.cos(m), l.y = j * Math.sin(m), this.vertices.push(l), i.push(new v.Vector2((l.x / j + 1) / 2, -(l.y / j + 1) / 2 + 1));
            }
            j += k;
        }
        var n = new v.Vector3(0, 0, 1);
        for (g = 0; d > g; g++) {
            var o = g * c;
            for (h = 0; c >= h; h++) {
                var m = h + o, p = m + g, q = m + c + g, r = m + c + 1 + g;
                this.faces.push(new v.Face3(p, q, r, [ n, n, n ])), this.faceVertexUvs[0].push([ i[p], i[q], i[r] ]), 
                p = m + g, q = m + c + 1 + g, r = m + 1 + g, this.faces.push(new v.Face3(p, q, r, [ n, n, n ])), 
                this.faceVertexUvs[0].push([ i[p], i[q], i[r] ]);
            }
        }
        this.computeCentroids(), this.computeFaceNormals(), this.boundingSphere = new v.Sphere(new v.Vector3(), j);
    }, v.RingGeometry.prototype = Object.create(v.Geometry.prototype), v.SphereGeometry = function(a, b, c, d, e, f, g) {
        v.Geometry.call(this), this.radius = a = a || 50, this.widthSegments = b = Math.max(3, Math.floor(b) || 8), 
        this.heightSegments = c = Math.max(2, Math.floor(c) || 6), this.phiStart = d = void 0 !== d ? d : 0, 
        this.phiLength = e = void 0 !== e ? e : 2 * Math.PI, this.thetaStart = f = void 0 !== f ? f : 0, 
        this.thetaLength = g = void 0 !== g ? g : Math.PI;
        var h, i, j = [], k = [];
        for (i = 0; c >= i; i++) {
            var l = [], m = [];
            for (h = 0; b >= h; h++) {
                var n = h / b, o = i / c, p = new v.Vector3();
                p.x = -a * Math.cos(d + n * e) * Math.sin(f + o * g), p.y = a * Math.cos(f + o * g), 
                p.z = a * Math.sin(d + n * e) * Math.sin(f + o * g), this.vertices.push(p), l.push(this.vertices.length - 1), 
                m.push(new v.Vector2(n, 1 - o));
            }
            j.push(l), k.push(m);
        }
        for (i = 0; i < this.heightSegments; i++) for (h = 0; h < this.widthSegments; h++) {
            var q = j[i][h + 1], r = j[i][h], s = j[i + 1][h], t = j[i + 1][h + 1], u = this.vertices[q].clone().normalize(), w = this.vertices[r].clone().normalize(), x = this.vertices[s].clone().normalize(), y = this.vertices[t].clone().normalize(), z = k[i][h + 1].clone(), A = k[i][h].clone(), B = k[i + 1][h].clone(), C = k[i + 1][h + 1].clone();
            Math.abs(this.vertices[q].y) === this.radius ? (this.faces.push(new v.Face3(q, s, t, [ u, x, y ])), 
            this.faceVertexUvs[0].push([ z, B, C ])) : Math.abs(this.vertices[s].y) === this.radius ? (this.faces.push(new v.Face3(q, r, s, [ u, w, x ])), 
            this.faceVertexUvs[0].push([ z, A, B ])) : (this.faces.push(new v.Face4(q, r, s, t, [ u, w, x, y ])), 
            this.faceVertexUvs[0].push([ z, A, B, C ]));
        }
        this.computeCentroids(), this.computeFaceNormals(), this.boundingSphere = new v.Sphere(new v.Vector3(), a);
    }, v.SphereGeometry.prototype = Object.create(v.Geometry.prototype), v.TextGeometry = function(a, b) {
        b = b || {};
        var c = v.FontUtils.generateShapes(a, b);
        b.amount = void 0 !== b.height ? b.height : 50, void 0 === b.bevelThickness && (b.bevelThickness = 10), 
        void 0 === b.bevelSize && (b.bevelSize = 8), void 0 === b.bevelEnabled && (b.bevelEnabled = !1), 
        v.ExtrudeGeometry.call(this, c, b);
    }, v.TextGeometry.prototype = Object.create(v.ExtrudeGeometry.prototype), v.TorusGeometry = function(a, b, c, d, e) {
        v.Geometry.call(this), this.radius = a || 100, this.tube = b || 40, this.radialSegments = c || 8, 
        this.tubularSegments = d || 6, this.arc = e || 2 * Math.PI;
        for (var f = new v.Vector3(), g = [], h = [], i = 0; i <= this.radialSegments; i++) for (var j = 0; j <= this.tubularSegments; j++) {
            var k = j / this.tubularSegments * this.arc, l = 2 * i / this.radialSegments * Math.PI;
            f.x = this.radius * Math.cos(k), f.y = this.radius * Math.sin(k);
            var m = new v.Vector3();
            m.x = (this.radius + this.tube * Math.cos(l)) * Math.cos(k), m.y = (this.radius + this.tube * Math.cos(l)) * Math.sin(k), 
            m.z = this.tube * Math.sin(l), this.vertices.push(m), g.push(new v.Vector2(j / this.tubularSegments, i / this.radialSegments)), 
            h.push(m.clone().sub(f).normalize());
        }
        for (var i = 1; i <= this.radialSegments; i++) for (var j = 1; j <= this.tubularSegments; j++) {
            var n = (this.tubularSegments + 1) * i + j - 1, o = (this.tubularSegments + 1) * (i - 1) + j - 1, p = (this.tubularSegments + 1) * (i - 1) + j, q = (this.tubularSegments + 1) * i + j, r = new v.Face4(n, o, p, q, [ h[n], h[o], h[p], h[q] ]);
            r.normal.add(h[n]), r.normal.add(h[o]), r.normal.add(h[p]), r.normal.add(h[q]), 
            r.normal.normalize(), this.faces.push(r), this.faceVertexUvs[0].push([ g[n].clone(), g[o].clone(), g[p].clone(), g[q].clone() ]);
        }
        this.computeCentroids();
    }, v.TorusGeometry.prototype = Object.create(v.Geometry.prototype), v.TorusKnotGeometry = function(a, b, c, d, e, f, g) {
        function h(a, b, c) {
            return j.vertices.push(new v.Vector3(a, b, c)) - 1;
        }
        function i(a, b, c, d, e, f) {
            var g = Math.cos(a);
            Math.cos(b);
            var h = Math.sin(a), i = c / d * a, j = Math.cos(i), k = .5 * e * (2 + j) * g, l = .5 * e * (2 + j) * h, m = .5 * f * e * Math.sin(i);
            return new v.Vector3(k, l, m);
        }
        v.Geometry.call(this);
        var j = this;
        this.radius = a || 100, this.tube = b || 40, this.radialSegments = c || 64, this.tubularSegments = d || 8, 
        this.p = e || 2, this.q = f || 3, this.heightScale = g || 1, this.grid = new Array(this.radialSegments);
        for (var k = new v.Vector3(), l = new v.Vector3(), m = new v.Vector3(), n = 0; n < this.radialSegments; ++n) {
            this.grid[n] = new Array(this.tubularSegments);
            for (var o = 0; o < this.tubularSegments; ++o) {
                var p, q, r = 2 * (n / this.radialSegments) * this.p * Math.PI, s = 2 * (o / this.tubularSegments) * Math.PI, t = i(r, s, this.q, this.p, this.radius, this.heightScale), u = i(r + .01, s, this.q, this.p, this.radius, this.heightScale);
                k.subVectors(u, t), l.addVectors(u, t), m.crossVectors(k, l), l.crossVectors(m, k), 
                m.normalize(), l.normalize(), p = -this.tube * Math.cos(s), q = this.tube * Math.sin(s), 
                t.x += p * l.x + q * m.x, t.y += p * l.y + q * m.y, t.z += p * l.z + q * m.z, this.grid[n][o] = h(t.x, t.y, t.z);
            }
        }
        for (var n = 0; n < this.radialSegments; ++n) for (var o = 0; o < this.tubularSegments; ++o) {
            var w = (n + 1) % this.radialSegments, x = (o + 1) % this.tubularSegments, y = this.grid[n][o], z = this.grid[w][o], A = this.grid[w][x], B = this.grid[n][x], C = new v.Vector2(n / this.radialSegments, o / this.tubularSegments), D = new v.Vector2((n + 1) / this.radialSegments, o / this.tubularSegments), E = new v.Vector2((n + 1) / this.radialSegments, (o + 1) / this.tubularSegments), F = new v.Vector2(n / this.radialSegments, (o + 1) / this.tubularSegments);
            this.faces.push(new v.Face4(y, z, A, B)), this.faceVertexUvs[0].push([ C, D, E, F ]);
        }
        this.computeCentroids(), this.computeFaceNormals(), this.computeVertexNormals();
    }, v.TorusKnotGeometry.prototype = Object.create(v.Geometry.prototype), v.TubeGeometry = function(a, b, c, d, e, f) {
        function g(a, b, c) {
            return C.vertices.push(new v.Vector3(a, b, c)) - 1;
        }
        v.Geometry.call(this), this.path = a, this.segments = b || 64, this.radius = c || 1, 
        this.radiusSegments = d || 8, this.closed = e || !1, f && (this.debug = new v.Object3D()), 
        this.grid = [];
        var h, i, j, k, l, m, n, o, p, q, r, s, t, u, w, x, y, z, A, B, C = this, D = this.segments + 1, E = new v.Vector3(), F = new v.TubeGeometry.FrenetFrames(this.path, this.segments, this.closed), G = F.tangents, H = F.normals, I = F.binormals;
        for (this.tangents = G, this.normals = H, this.binormals = I, p = 0; D > p; p++) for (this.grid[p] = [], 
        k = p / (D - 1), o = a.getPointAt(k), h = G[p], i = H[p], j = I[p], this.debug && (this.debug.add(new v.ArrowHelper(h, o, c, 255)), 
        this.debug.add(new v.ArrowHelper(i, o, c, 16711680)), this.debug.add(new v.ArrowHelper(j, o, c, 65280))), 
        q = 0; q < this.radiusSegments; q++) l = 2 * (q / this.radiusSegments) * Math.PI, 
        m = -this.radius * Math.cos(l), n = this.radius * Math.sin(l), E.copy(o), E.x += m * i.x + n * j.x, 
        E.y += m * i.y + n * j.y, E.z += m * i.z + n * j.z, this.grid[p][q] = g(E.x, E.y, E.z);
        for (p = 0; p < this.segments; p++) for (q = 0; q < this.radiusSegments; q++) r = this.closed ? (p + 1) % this.segments : p + 1, 
        s = (q + 1) % this.radiusSegments, t = this.grid[p][q], u = this.grid[r][q], w = this.grid[r][s], 
        x = this.grid[p][s], y = new v.Vector2(p / this.segments, q / this.radiusSegments), 
        z = new v.Vector2((p + 1) / this.segments, q / this.radiusSegments), A = new v.Vector2((p + 1) / this.segments, (q + 1) / this.radiusSegments), 
        B = new v.Vector2(p / this.segments, (q + 1) / this.radiusSegments), this.faces.push(new v.Face4(t, u, w, x)), 
        this.faceVertexUvs[0].push([ y, z, A, B ]);
        this.computeCentroids(), this.computeFaceNormals(), this.computeVertexNormals();
    }, v.TubeGeometry.prototype = Object.create(v.Geometry.prototype), v.TubeGeometry.FrenetFrames = function(a, b, c) {
        function d() {
            n[0] = new v.Vector3(), o[0] = new v.Vector3(), f = Number.MAX_VALUE, g = Math.abs(m[0].x), 
            h = Math.abs(m[0].y), i = Math.abs(m[0].z), f >= g && (f = g, l.set(1, 0, 0)), f >= h && (f = h, 
            l.set(0, 1, 0)), f >= i && l.set(0, 0, 1), p.crossVectors(m[0], l).normalize(), 
            n[0].crossVectors(m[0], p), o[0].crossVectors(m[0], n[0]);
        }
        var e, f, g, h, i, j, k, l = (new v.Vector3(), new v.Vector3()), m = (new v.Vector3(), 
        []), n = [], o = [], p = new v.Vector3(), q = new v.Matrix4(), r = b + 1, s = 1e-4;
        for (this.tangents = m, this.normals = n, this.binormals = o, j = 0; r > j; j++) k = j / (r - 1), 
        m[j] = a.getTangentAt(k), m[j].normalize();
        for (d(), j = 1; r > j; j++) n[j] = n[j - 1].clone(), o[j] = o[j - 1].clone(), p.crossVectors(m[j - 1], m[j]), 
        p.length() > s && (p.normalize(), e = Math.acos(m[j - 1].dot(m[j])), n[j].applyMatrix4(q.makeRotationAxis(p, e))), 
        o[j].crossVectors(m[j], n[j]);
        if (c) for (e = Math.acos(n[0].dot(n[r - 1])), e /= r - 1, m[0].dot(p.crossVectors(n[0], n[r - 1])) > 0 && (e = -e), 
        j = 1; r > j; j++) n[j].applyMatrix4(q.makeRotationAxis(m[j], e * j)), o[j].crossVectors(m[j], n[j]);
    }, v.PolyhedronGeometry = function(a, b, c, d) {
        function e(a) {
            var b = a.normalize().clone();
            b.index = k.vertices.push(b) - 1;
            var c = h(a) / 2 / Math.PI + .5, d = i(a) / Math.PI + .5;
            return b.uv = new v.Vector2(c, 1 - d), b;
        }
        function f(a, b, c) {
            var d = new v.Face3(a.index, b.index, c.index, [ a.clone(), b.clone(), c.clone() ]);
            d.centroid.add(a).add(b).add(c).divideScalar(3), d.normal.copy(d.centroid).normalize(), 
            k.faces.push(d);
            var e = h(d.centroid);
            k.faceVertexUvs[0].push([ j(a.uv, a, e), j(b.uv, b, e), j(c.uv, c, e) ]);
        }
        function g(a, b) {
            var c = Math.pow(2, b);
            Math.pow(4, b);
            for (var d = e(k.vertices[a.a]), g = e(k.vertices[a.b]), h = e(k.vertices[a.c]), i = [], j = 0; c >= j; j++) {
                i[j] = [];
                for (var l = e(d.clone().lerp(h, j / c)), m = e(g.clone().lerp(h, j / c)), n = c - j, o = 0; n >= o; o++) i[j][o] = 0 == o && j == c ? l : e(l.clone().lerp(m, o / n));
            }
            for (var j = 0; c > j; j++) for (var o = 0; 2 * (c - j) - 1 > o; o++) {
                var p = Math.floor(o / 2);
                0 == o % 2 ? f(i[j][p + 1], i[j + 1][p], i[j][p]) : f(i[j][p + 1], i[j + 1][p + 1], i[j + 1][p]);
            }
        }
        function h(a) {
            return Math.atan2(a.z, -a.x);
        }
        function i(a) {
            return Math.atan2(-a.y, Math.sqrt(a.x * a.x + a.z * a.z));
        }
        function j(a, b, c) {
            return 0 > c && 1 === a.x && (a = new v.Vector2(a.x - 1, a.y)), 0 === b.x && 0 === b.z && (a = new v.Vector2(c / 2 / Math.PI + .5, a.y)), 
            a.clone();
        }
        v.Geometry.call(this), c = c || 1, d = d || 0;
        for (var k = this, l = 0, m = a.length; m > l; l++) e(new v.Vector3(a[l][0], a[l][1], a[l][2]));
        for (var n = this.vertices, o = [], l = 0, m = b.length; m > l; l++) {
            var p = n[b[l][0]], q = n[b[l][1]], r = n[b[l][2]];
            o[l] = new v.Face3(p.index, q.index, r.index, [ p.clone(), q.clone(), r.clone() ]);
        }
        for (var l = 0, m = o.length; m > l; l++) g(o[l], d);
        for (var l = 0, m = this.faceVertexUvs[0].length; m > l; l++) {
            var s = this.faceVertexUvs[0][l], t = s[0].x, u = s[1].x, w = s[2].x, x = Math.max(t, Math.max(u, w)), y = Math.min(t, Math.min(u, w));
            x > .9 && .1 > y && (.2 > t && (s[0].x += 1), .2 > u && (s[1].x += 1), .2 > w && (s[2].x += 1));
        }
        this.mergeVertices();
        for (var l = 0, m = this.vertices.length; m > l; l++) this.vertices[l].multiplyScalar(c);
        this.computeCentroids(), this.boundingSphere = new v.Sphere(new v.Vector3(), c);
    }, v.PolyhedronGeometry.prototype = Object.create(v.Geometry.prototype), v.IcosahedronGeometry = function(a, b) {
        this.radius = a, this.detail = b;
        var c = (1 + Math.sqrt(5)) / 2, d = [ [ -1, c, 0 ], [ 1, c, 0 ], [ -1, -c, 0 ], [ 1, -c, 0 ], [ 0, -1, c ], [ 0, 1, c ], [ 0, -1, -c ], [ 0, 1, -c ], [ c, 0, -1 ], [ c, 0, 1 ], [ -c, 0, -1 ], [ -c, 0, 1 ] ], e = [ [ 0, 11, 5 ], [ 0, 5, 1 ], [ 0, 1, 7 ], [ 0, 7, 10 ], [ 0, 10, 11 ], [ 1, 5, 9 ], [ 5, 11, 4 ], [ 11, 10, 2 ], [ 10, 7, 6 ], [ 7, 1, 8 ], [ 3, 9, 4 ], [ 3, 4, 2 ], [ 3, 2, 6 ], [ 3, 6, 8 ], [ 3, 8, 9 ], [ 4, 9, 5 ], [ 2, 4, 11 ], [ 6, 2, 10 ], [ 8, 6, 7 ], [ 9, 8, 1 ] ];
        v.PolyhedronGeometry.call(this, d, e, a, b);
    }, v.IcosahedronGeometry.prototype = Object.create(v.Geometry.prototype), v.OctahedronGeometry = function(a, b) {
        var c = [ [ 1, 0, 0 ], [ -1, 0, 0 ], [ 0, 1, 0 ], [ 0, -1, 0 ], [ 0, 0, 1 ], [ 0, 0, -1 ] ], d = [ [ 0, 2, 4 ], [ 0, 4, 3 ], [ 0, 3, 5 ], [ 0, 5, 2 ], [ 1, 2, 5 ], [ 1, 5, 3 ], [ 1, 3, 4 ], [ 1, 4, 2 ] ];
        v.PolyhedronGeometry.call(this, c, d, a, b);
    }, v.OctahedronGeometry.prototype = Object.create(v.Geometry.prototype), v.TetrahedronGeometry = function(a, b) {
        var c = [ [ 1, 1, 1 ], [ -1, -1, 1 ], [ -1, 1, -1 ], [ 1, -1, -1 ] ], d = [ [ 2, 1, 0 ], [ 0, 3, 2 ], [ 1, 3, 0 ], [ 2, 3, 1 ] ];
        v.PolyhedronGeometry.call(this, c, d, a, b);
    }, v.TetrahedronGeometry.prototype = Object.create(v.Geometry.prototype), v.ParametricGeometry = function(a, b, c, d) {
        v.Geometry.call(this);
        var e = this.vertices, f = this.faces, g = this.faceVertexUvs[0];
        d = void 0 === d ? !1 : d;
        var h, i, j, k, l, m = b + 1;
        for (h = 0; c >= h; h++) for (l = h / c, i = 0; b >= i; i++) k = i / b, j = a(k, l), 
        e.push(j);
        var n, o, p, q, r, s, t, u;
        for (h = 0; c > h; h++) for (i = 0; b > i; i++) n = h * m + i, o = h * m + i + 1, 
        p = (h + 1) * m + i, q = (h + 1) * m + i + 1, r = new v.Vector2(i / b, h / c), s = new v.Vector2((i + 1) / b, h / c), 
        t = new v.Vector2(i / b, (h + 1) / c), u = new v.Vector2((i + 1) / b, (h + 1) / c), 
        d ? (f.push(new v.Face3(n, o, p)), f.push(new v.Face3(o, q, p)), g.push([ r, s, t ]), 
        g.push([ s, u, t ])) : (f.push(new v.Face4(n, o, q, p)), g.push([ r, s, u, t ]));
        this.computeCentroids(), this.computeFaceNormals(), this.computeVertexNormals();
    }, v.ParametricGeometry.prototype = Object.create(v.Geometry.prototype), v.ConvexGeometry = function(a) {
        function b(b) {
            var d = a[b].clone(), g = d.length();
            d.x += g * f(), d.y += g * f(), d.z += g * f();
            for (var i = [], j = 0; j < h.length; ) {
                var k = h[j];
                if (c(k, d)) {
                    for (var l = 0; 3 > l; l++) {
                        for (var m = [ k[l], k[(l + 1) % 3] ], n = !0, o = 0; o < i.length; o++) if (e(i[o], m)) {
                            i[o] = i[i.length - 1], i.pop(), n = !1;
                            break;
                        }
                        n && i.push(m);
                    }
                    h[j] = h[h.length - 1], h.pop();
                } else j++;
            }
            for (var o = 0; o < i.length; o++) h.push([ i[o][0], i[o][1], b ]);
        }
        function c(b, c) {
            var e = a[b[0]], f = a[b[1]], g = a[b[2]], h = d(e, f, g), i = h.dot(e);
            return h.dot(c) >= i;
        }
        function d(a, b, c) {
            var d = new v.Vector3(), e = new v.Vector3();
            return d.subVectors(c, b), e.subVectors(a, b), d.cross(e), d.normalize(), d;
        }
        function e(a, b) {
            return a[0] === b[1] && a[1] === b[0];
        }
        function f() {
            return 1e-6 * 2 * (Math.random() - .5);
        }
        function g(a) {
            var b = a.length();
            return new v.Vector2(a.x / b, a.y / b);
        }
        v.Geometry.call(this);
        for (var h = [ [ 0, 1, 2 ], [ 0, 2, 1 ] ], i = 3; i < a.length; i++) b(i);
        for (var j = 0, k = new Array(a.length), i = 0; i < h.length; i++) for (var l = h[i], m = 0; 3 > m; m++) void 0 === k[l[m]] && (k[l[m]] = j++, 
        this.vertices.push(a[l[m]])), l[m] = k[l[m]];
        for (var i = 0; i < h.length; i++) this.faces.push(new v.Face3(h[i][0], h[i][1], h[i][2]));
        for (var i = 0; i < this.faces.length; i++) {
            var l = this.faces[i];
            this.faceVertexUvs[0].push([ g(this.vertices[l.a]), g(this.vertices[l.b]), g(this.vertices[l.c]) ]);
        }
        this.computeCentroids(), this.computeFaceNormals(), this.computeVertexNormals();
    }, v.ConvexGeometry.prototype = Object.create(v.Geometry.prototype), v.AxisHelper = function(a) {
        a = a || 1;
        var b = new v.Geometry();
        b.vertices.push(new v.Vector3(), new v.Vector3(a, 0, 0), new v.Vector3(), new v.Vector3(0, a, 0), new v.Vector3(), new v.Vector3(0, 0, a)), 
        b.colors.push(new v.Color(16711680), new v.Color(16755200), new v.Color(65280), new v.Color(11206400), new v.Color(255), new v.Color(43775));
        var c = new v.LineBasicMaterial({
            vertexColors: v.VertexColors
        });
        v.Line.call(this, b, c, v.LinePieces);
    }, v.AxisHelper.prototype = Object.create(v.Line.prototype), v.ArrowHelper = function(a, b, c, d) {
        v.Object3D.call(this), void 0 === d && (d = 16776960), void 0 === c && (c = 1), 
        this.position = b, this.useQuaternion = !0;
        var e = new v.Geometry();
        e.vertices.push(new v.Vector3(0, 0, 0)), e.vertices.push(new v.Vector3(0, 1, 0)), 
        this.line = new v.Line(e, new v.LineBasicMaterial({
            color: d
        })), this.line.matrixAutoUpdate = !1, this.add(this.line);
        var f = new v.CylinderGeometry(0, .05, .25, 5, 1);
        f.applyMatrix(new v.Matrix4().makeTranslation(0, .875, 0)), this.cone = new v.Mesh(f, new v.MeshBasicMaterial({
            color: d
        })), this.cone.matrixAutoUpdate = !1, this.add(this.cone), this.setDirection(a), 
        this.setLength(c);
    }, v.ArrowHelper.prototype = Object.create(v.Object3D.prototype), v.ArrowHelper.prototype.setDirection = function() {
        var a, b = new v.Vector3();
        return function(c) {
            c.y > .999 ? this.quaternion.set(0, 0, 0, 1) : c.y < -.999 ? this.quaternion.set(1, 0, 0, 0) : (b.set(c.z, 0, -c.x).normalize(), 
            a = Math.acos(c.y), this.quaternion.setFromAxisAngle(b, a));
        };
    }(), v.ArrowHelper.prototype.setLength = function(a) {
        this.scale.set(a, a, a);
    }, v.ArrowHelper.prototype.setColor = function(a) {
        this.line.material.color.setHex(a), this.cone.material.color.setHex(a);
    }, v.BoxHelper = function(a) {
        a = a || 1;
        var b = new v.Geometry(), c = [ new v.Vector3(a, a, a), new v.Vector3(-a, a, a), new v.Vector3(-a, -a, a), new v.Vector3(a, -a, a), new v.Vector3(a, a, -a), new v.Vector3(-a, a, -a), new v.Vector3(-a, -a, -a), new v.Vector3(a, -a, -a) ];
        b.vertices.push(c[0], c[1], c[1], c[2], c[2], c[3], c[3], c[0], c[4], c[5], c[5], c[6], c[6], c[7], c[7], c[4], c[0], c[4], c[1], c[5], c[2], c[6], c[3], c[7]), 
        this.vertices = c, v.Line.call(this, b, new v.LineBasicMaterial(), v.LinePieces);
    }, v.BoxHelper.prototype = Object.create(v.Line.prototype), v.BoxHelper.prototype.update = function(a) {
        var b = a.geometry;
        null === b.boundingBox && b.computeBoundingBox();
        var c = b.boundingBox.min, d = b.boundingBox.max, e = this.vertices;
        e[0].set(d.x, d.y, d.z), e[1].set(c.x, d.y, d.z), e[2].set(c.x, c.y, d.z), e[3].set(d.x, c.y, d.z), 
        e[4].set(d.x, d.y, c.z), e[5].set(c.x, d.y, c.z), e[6].set(c.x, c.y, c.z), e[7].set(d.x, c.y, c.z), 
        this.geometry.computeBoundingSphere(), this.geometry.verticesNeedUpdate = !0, this.matrixAutoUpdate = !1, 
        this.matrixWorld = a.matrixWorld;
    }, v.CameraHelper = function(a) {
        function b(a, b, d) {
            c(a, d), c(b, d);
        }
        function c(a, b) {
            d.vertices.push(new v.Vector3()), d.colors.push(new v.Color(b)), void 0 === f[a] && (f[a] = []), 
            f[a].push(d.vertices.length - 1);
        }
        v.Line.call(this);
        var d = new v.Geometry(), e = new v.LineBasicMaterial({
            color: 16777215,
            vertexColors: v.FaceColors
        }), f = {}, g = 16755200, h = 16711680, i = 43775, j = 16777215, k = 3355443;
        b("n1", "n2", g), b("n2", "n4", g), b("n4", "n3", g), b("n3", "n1", g), b("f1", "f2", g), 
        b("f2", "f4", g), b("f4", "f3", g), b("f3", "f1", g), b("n1", "f1", g), b("n2", "f2", g), 
        b("n3", "f3", g), b("n4", "f4", g), b("p", "n1", h), b("p", "n2", h), b("p", "n3", h), 
        b("p", "n4", h), b("u1", "u2", i), b("u2", "u3", i), b("u3", "u1", i), b("c", "t", j), 
        b("p", "c", k), b("cn1", "cn2", k), b("cn3", "cn4", k), b("cf1", "cf2", k), b("cf3", "cf4", k), 
        v.Line.call(this, d, e, v.LinePieces), this.camera = a, this.matrixWorld = a.matrixWorld, 
        this.matrixAutoUpdate = !1, this.pointMap = f, this.update();
    }, v.CameraHelper.prototype = Object.create(v.Line.prototype), v.CameraHelper.prototype.update = function() {
        var a = new v.Vector3(), b = new v.Camera(), c = new v.Projector();
        return function() {
            function d(d, f, g, h) {
                a.set(f, g, h), c.unprojectVector(a, b);
                var i = e.pointMap[d];
                if (void 0 !== i) for (var j = 0, k = i.length; k > j; j++) e.geometry.vertices[i[j]].copy(a);
            }
            var e = this, f = 1, g = 1;
            b.projectionMatrix.copy(this.camera.projectionMatrix), d("c", 0, 0, -1), d("t", 0, 0, 1), 
            d("n1", -f, -g, -1), d("n2", f, -g, -1), d("n3", -f, g, -1), d("n4", f, g, -1), 
            d("f1", -f, -g, 1), d("f2", f, -g, 1), d("f3", -f, g, 1), d("f4", f, g, 1), d("u1", .7 * f, 1.1 * g, -1), 
            d("u2", .7 * -f, 1.1 * g, -1), d("u3", 0, 2 * g, -1), d("cf1", -f, 0, 1), d("cf2", f, 0, 1), 
            d("cf3", 0, -g, 1), d("cf4", 0, g, 1), d("cn1", -f, 0, -1), d("cn2", f, 0, -1), 
            d("cn3", 0, -g, -1), d("cn4", 0, g, -1), this.geometry.verticesNeedUpdate = !0;
        };
    }(), v.DirectionalLightHelper = function(a, b) {
        v.Object3D.call(this), this.matrixAutoUpdate = !1, this.light = a;
        var c = new v.SphereGeometry(b, 4, 2), d = new v.MeshBasicMaterial({
            fog: !1,
            wireframe: !0
        });
        d.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.lightSphere = new v.Mesh(c, d), 
        this.lightSphere.matrixWorld = this.light.matrixWorld, this.lightSphere.matrixAutoUpdate = !1, 
        this.add(this.lightSphere), c = new v.Geometry(), c.vertices.push(this.light.position), 
        c.vertices.push(this.light.target.position), c.computeLineDistances(), d = new v.LineDashedMaterial({
            dashSize: 4,
            gapSize: 4,
            opacity: .75,
            transparent: !0,
            fog: !1
        }), d.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.targetLine = new v.Line(c, d), 
        this.add(this.targetLine);
    }, v.DirectionalLightHelper.prototype = Object.create(v.Object3D.prototype), v.DirectionalLightHelper.prototype.update = function() {
        this.lightSphere.material.color.copy(this.light.color).multiplyScalar(this.light.intensity), 
        this.targetLine.geometry.computeLineDistances(), this.targetLine.geometry.verticesNeedUpdate = !0, 
        this.targetLine.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);
    }, v.GridHelper = function(a, b) {
        for (var c = new v.Geometry(), d = new v.LineBasicMaterial({
            vertexColors: v.VertexColors
        }), e = new v.Color(4473924), f = new v.Color(8947848), g = -a; a >= g; g += b) {
            c.vertices.push(new v.Vector3(-a, 0, g)), c.vertices.push(new v.Vector3(a, 0, g)), 
            c.vertices.push(new v.Vector3(g, 0, -a)), c.vertices.push(new v.Vector3(g, 0, a));
            var h = 0 === g ? e : f;
            c.colors.push(h, h, h, h);
        }
        v.Line.call(this, c, d, v.LinePieces);
    }, v.GridHelper.prototype = Object.create(v.Line.prototype), v.HemisphereLightHelper = function(a, b) {
        v.Object3D.call(this), this.light = a;
        var c = new v.SphereGeometry(b, 4, 2);
        c.applyMatrix(new v.Matrix4().makeRotationX(-Math.PI / 2));
        for (var d = 0, e = 8; e > d; d++) c.faces[d].materialIndex = 4 > d ? 0 : 1;
        var f = new v.MeshBasicMaterial({
            fog: !1,
            wireframe: !0
        });
        f.color.copy(a.color).multiplyScalar(a.intensity);
        var g = new v.MeshBasicMaterial({
            fog: !1,
            wireframe: !0
        });
        g.color.copy(a.groundColor).multiplyScalar(a.intensity), this.lightSphere = new v.Mesh(c, new v.MeshFaceMaterial([ f, g ])), 
        this.lightSphere.position = a.position, this.lightSphere.lookAt(new v.Vector3()), 
        this.add(this.lightSphere);
    }, v.HemisphereLightHelper.prototype = Object.create(v.Object3D.prototype), v.HemisphereLightHelper.prototype.update = function() {
        this.lightSphere.lookAt(new v.Vector3()), this.lightSphere.material.materials[0].color.copy(this.light.color).multiplyScalar(this.light.intensity), 
        this.lightSphere.material.materials[1].color.copy(this.light.groundColor).multiplyScalar(this.light.intensity);
    }, v.PointLightHelper = function(a, b) {
        v.Object3D.call(this), this.matrixAutoUpdate = !1, this.light = a;
        var c = new v.SphereGeometry(b, 4, 2), d = new v.MeshBasicMaterial({
            fog: !1,
            wireframe: !0
        });
        d.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.lightSphere = new v.Mesh(c, d), 
        this.lightSphere.matrixWorld = this.light.matrixWorld, this.lightSphere.matrixAutoUpdate = !1, 
        this.add(this.lightSphere);
    }, v.PointLightHelper.prototype = Object.create(v.Object3D.prototype), v.PointLightHelper.prototype.update = function() {
        this.lightSphere.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);
    }, v.SpotLightHelper = function(a, b) {
        v.Object3D.call(this), this.matrixAutoUpdate = !1, this.light = a;
        var c = new v.SphereGeometry(b, 4, 2), d = new v.MeshBasicMaterial({
            fog: !1,
            wireframe: !0
        });
        d.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.lightSphere = new v.Mesh(c, d), 
        this.lightSphere.matrixWorld = this.light.matrixWorld, this.lightSphere.matrixAutoUpdate = !1, 
        this.add(this.lightSphere), c = new v.CylinderGeometry(1e-4, 1, 1, 8, 1, !0), c.applyMatrix(new v.Matrix4().makeTranslation(0, -.5, 0)), 
        c.applyMatrix(new v.Matrix4().makeRotationX(-Math.PI / 2)), d = new v.MeshBasicMaterial({
            fog: !1,
            wireframe: !0,
            opacity: .3,
            transparent: !0
        }), d.color.copy(this.light.color).multiplyScalar(this.light.intensity), this.lightCone = new v.Mesh(c, d), 
        this.lightCone.position = this.light.position;
        var e = a.distance ? a.distance : 1e4, f = e * Math.tan(a.angle);
        this.lightCone.scale.set(f, f, e), this.lightCone.lookAt(this.light.target.position), 
        this.add(this.lightCone);
    }, v.SpotLightHelper.prototype = Object.create(v.Object3D.prototype), v.SpotLightHelper.prototype.update = function() {
        var a = this.light.distance ? this.light.distance : 1e4, b = a * Math.tan(this.light.angle);
        this.lightCone.scale.set(b, b, a), this.lightCone.lookAt(this.light.target.position), 
        this.lightSphere.material.color.copy(this.light.color).multiplyScalar(this.light.intensity), 
        this.lightCone.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);
    }, v.ImmediateRenderObject = function() {
        v.Object3D.call(this), this.render = function() {};
    }, v.ImmediateRenderObject.prototype = Object.create(v.Object3D.prototype), v.LensFlare = function(a, b, c, d, e) {
        v.Object3D.call(this), this.lensFlares = [], this.positionScreen = new v.Vector3(), 
        this.customUpdateCallback = void 0, void 0 !== a && this.add(a, b, c, d, e);
    }, v.LensFlare.prototype = Object.create(v.Object3D.prototype), v.LensFlare.prototype.add = function(a, b, c, d, e, f) {
        void 0 === b && (b = -1), void 0 === c && (c = 0), void 0 === f && (f = 1), void 0 === e && (e = new v.Color(16777215)), 
        void 0 === d && (d = v.NormalBlending), c = Math.min(c, Math.max(0, c)), this.lensFlares.push({
            texture: a,
            size: b,
            distance: c,
            x: 0,
            y: 0,
            z: 0,
            scale: 1,
            rotation: 1,
            opacity: f,
            color: e,
            blending: d
        });
    }, v.LensFlare.prototype.updateLensFlares = function() {
        var a, b, c = this.lensFlares.length, d = 2 * -this.positionScreen.x, e = 2 * -this.positionScreen.y;
        for (a = 0; c > a; a++) b = this.lensFlares[a], b.x = this.positionScreen.x + d * b.distance, 
        b.y = this.positionScreen.y + e * b.distance, b.wantedRotation = .25 * b.x * Math.PI, 
        b.rotation += .25 * (b.wantedRotation - b.rotation);
    }, v.MorphBlendMesh = function(a, b) {
        v.Mesh.call(this, a, b), this.animationsMap = {}, this.animationsList = [];
        var c = this.geometry.morphTargets.length, d = "__default", e = 0, f = c - 1, g = c / 1;
        this.createAnimation(d, e, f, g), this.setAnimationWeight(d, 1);
    }, v.MorphBlendMesh.prototype = Object.create(v.Mesh.prototype), v.MorphBlendMesh.prototype.createAnimation = function(a, b, c, d) {
        var e = {
            startFrame: b,
            endFrame: c,
            length: c - b + 1,
            fps: d,
            duration: (c - b) / d,
            lastFrame: 0,
            currentFrame: 0,
            active: !1,
            time: 0,
            direction: 1,
            weight: 1,
            directionBackwards: !1,
            mirroredLoop: !1
        };
        this.animationsMap[a] = e, this.animationsList.push(e);
    }, v.MorphBlendMesh.prototype.autoCreateAnimations = function(a) {
        for (var b, c = /([a-z]+)(\d+)/, d = {}, e = this.geometry, f = 0, g = e.morphTargets.length; g > f; f++) {
            var h = e.morphTargets[f], i = h.name.match(c);
            if (i && i.length > 1) {
                var j = i[1];
                i[2], d[j] || (d[j] = {
                    start: 1/0,
                    end: -1/0
                });
                var k = d[j];
                f < k.start && (k.start = f), f > k.end && (k.end = f), b || (b = j);
            }
        }
        for (var j in d) {
            var k = d[j];
            this.createAnimation(j, k.start, k.end, a);
        }
        this.firstAnimation = b;
    }, v.MorphBlendMesh.prototype.setAnimationDirectionForward = function(a) {
        var b = this.animationsMap[a];
        b && (b.direction = 1, b.directionBackwards = !1);
    }, v.MorphBlendMesh.prototype.setAnimationDirectionBackward = function(a) {
        var b = this.animationsMap[a];
        b && (b.direction = -1, b.directionBackwards = !0);
    }, v.MorphBlendMesh.prototype.setAnimationFPS = function(a, b) {
        var c = this.animationsMap[a];
        c && (c.fps = b, c.duration = (c.end - c.start) / c.fps);
    }, v.MorphBlendMesh.prototype.setAnimationDuration = function(a, b) {
        var c = this.animationsMap[a];
        c && (c.duration = b, c.fps = (c.end - c.start) / c.duration);
    }, v.MorphBlendMesh.prototype.setAnimationWeight = function(a, b) {
        var c = this.animationsMap[a];
        c && (c.weight = b);
    }, v.MorphBlendMesh.prototype.setAnimationTime = function(a, b) {
        var c = this.animationsMap[a];
        c && (c.time = b);
    }, v.MorphBlendMesh.prototype.getAnimationTime = function(a) {
        var b = 0, c = this.animationsMap[a];
        return c && (b = c.time), b;
    }, v.MorphBlendMesh.prototype.getAnimationDuration = function(a) {
        var b = -1, c = this.animationsMap[a];
        return c && (b = c.duration), b;
    }, v.MorphBlendMesh.prototype.playAnimation = function(a) {
        var b = this.animationsMap[a];
        b ? (b.time = 0, b.active = !0) : console.warn("animation[" + a + "] undefined");
    }, v.MorphBlendMesh.prototype.stopAnimation = function(a) {
        var b = this.animationsMap[a];
        b && (b.active = !1);
    }, v.MorphBlendMesh.prototype.update = function(a) {
        for (var b = 0, c = this.animationsList.length; c > b; b++) {
            var d = this.animationsList[b];
            if (d.active) {
                var e = d.duration / d.length;
                d.time += d.direction * a, d.mirroredLoop ? (d.time > d.duration || d.time < 0) && (d.direction *= -1, 
                d.time > d.duration && (d.time = d.duration, d.directionBackwards = !0), d.time < 0 && (d.time = 0, 
                d.directionBackwards = !1)) : (d.time = d.time % d.duration, d.time < 0 && (d.time += d.duration));
                var f = d.startFrame + v.Math.clamp(Math.floor(d.time / e), 0, d.length - 1), g = d.weight;
                f !== d.currentFrame && (this.morphTargetInfluences[d.lastFrame] = 0, this.morphTargetInfluences[d.currentFrame] = 1 * g, 
                this.morphTargetInfluences[f] = 0, d.lastFrame = d.currentFrame, d.currentFrame = f);
                var h = d.time % e / e;
                d.directionBackwards && (h = 1 - h), this.morphTargetInfluences[d.currentFrame] = h * g, 
                this.morphTargetInfluences[d.lastFrame] = (1 - h) * g;
            }
        }
    }, v.LensFlarePlugin = function() {
        function a(a, c) {
            var d = b.createProgram(), e = b.createShader(b.FRAGMENT_SHADER), f = b.createShader(b.VERTEX_SHADER), g = "precision " + c + " float;\n";
            return b.shaderSource(e, g + a.fragmentShader), b.shaderSource(f, g + a.vertexShader), 
            b.compileShader(e), b.compileShader(f), b.attachShader(d, e), b.attachShader(d, f), 
            b.linkProgram(d), d;
        }
        var b, c, d, e = {};
        this.init = function(f) {
            b = f.context, c = f, d = f.getPrecision(), e.vertices = new Float32Array(16), e.faces = new Uint16Array(6);
            var g = 0;
            e.vertices[g++] = -1, e.vertices[g++] = -1, e.vertices[g++] = 0, e.vertices[g++] = 0, 
            e.vertices[g++] = 1, e.vertices[g++] = -1, e.vertices[g++] = 1, e.vertices[g++] = 0, 
            e.vertices[g++] = 1, e.vertices[g++] = 1, e.vertices[g++] = 1, e.vertices[g++] = 1, 
            e.vertices[g++] = -1, e.vertices[g++] = 1, e.vertices[g++] = 0, e.vertices[g++] = 1, 
            g = 0, e.faces[g++] = 0, e.faces[g++] = 1, e.faces[g++] = 2, e.faces[g++] = 0, e.faces[g++] = 2, 
            e.faces[g++] = 3, e.vertexBuffer = b.createBuffer(), e.elementBuffer = b.createBuffer(), 
            b.bindBuffer(b.ARRAY_BUFFER, e.vertexBuffer), b.bufferData(b.ARRAY_BUFFER, e.vertices, b.STATIC_DRAW), 
            b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, e.elementBuffer), b.bufferData(b.ELEMENT_ARRAY_BUFFER, e.faces, b.STATIC_DRAW), 
            e.tempTexture = b.createTexture(), e.occlusionTexture = b.createTexture(), b.bindTexture(b.TEXTURE_2D, e.tempTexture), 
            b.texImage2D(b.TEXTURE_2D, 0, b.RGB, 16, 16, 0, b.RGB, b.UNSIGNED_BYTE, null), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE), 
            b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST), 
            b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST), b.bindTexture(b.TEXTURE_2D, e.occlusionTexture), 
            b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, 16, 16, 0, b.RGBA, b.UNSIGNED_BYTE, null), 
            b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE), 
            b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.NEAREST), b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.NEAREST), 
            b.getParameter(b.MAX_VERTEX_TEXTURE_IMAGE_UNITS) <= 0 ? (e.hasVertexTexture = !1, 
            e.program = a(v.ShaderFlares.lensFlare, d)) : (e.hasVertexTexture = !0, e.program = a(v.ShaderFlares.lensFlareVertexTexture, d)), 
            e.attributes = {}, e.uniforms = {}, e.attributes.vertex = b.getAttribLocation(e.program, "position"), 
            e.attributes.uv = b.getAttribLocation(e.program, "uv"), e.uniforms.renderType = b.getUniformLocation(e.program, "renderType"), 
            e.uniforms.map = b.getUniformLocation(e.program, "map"), e.uniforms.occlusionMap = b.getUniformLocation(e.program, "occlusionMap"), 
            e.uniforms.opacity = b.getUniformLocation(e.program, "opacity"), e.uniforms.color = b.getUniformLocation(e.program, "color"), 
            e.uniforms.scale = b.getUniformLocation(e.program, "scale"), e.uniforms.rotation = b.getUniformLocation(e.program, "rotation"), 
            e.uniforms.screenPosition = b.getUniformLocation(e.program, "screenPosition");
        }, this.render = function(a, d, f, g) {
            var h = a.__webglFlares, i = h.length;
            if (i) {
                var j = new v.Vector3(), k = g / f, l = .5 * f, m = .5 * g, n = 16 / g, o = new v.Vector2(n * k, n), p = new v.Vector3(1, 1, 0), q = new v.Vector2(1, 1), r = e.uniforms, s = e.attributes;
                b.useProgram(e.program), b.enableVertexAttribArray(e.attributes.vertex), b.enableVertexAttribArray(e.attributes.uv), 
                b.uniform1i(r.occlusionMap, 0), b.uniform1i(r.map, 1), b.bindBuffer(b.ARRAY_BUFFER, e.vertexBuffer), 
                b.vertexAttribPointer(s.vertex, 2, b.FLOAT, !1, 16, 0), b.vertexAttribPointer(s.uv, 2, b.FLOAT, !1, 16, 8), 
                b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, e.elementBuffer), b.disable(b.CULL_FACE), b.depthMask(!1);
                var t, u, w, x, y;
                for (t = 0; i > t; t++) if (n = 16 / g, o.set(n * k, n), x = h[t], j.set(x.matrixWorld.elements[12], x.matrixWorld.elements[13], x.matrixWorld.elements[14]), 
                j.applyMatrix4(d.matrixWorldInverse), j.applyProjection(d.projectionMatrix), p.copy(j), 
                q.x = p.x * l + l, q.y = p.y * m + m, e.hasVertexTexture || q.x > 0 && q.x < f && q.y > 0 && q.y < g) for (b.activeTexture(b.TEXTURE1), 
                b.bindTexture(b.TEXTURE_2D, e.tempTexture), b.copyTexImage2D(b.TEXTURE_2D, 0, b.RGB, q.x - 8, q.y - 8, 16, 16, 0), 
                b.uniform1i(r.renderType, 0), b.uniform2f(r.scale, o.x, o.y), b.uniform3f(r.screenPosition, p.x, p.y, p.z), 
                b.disable(b.BLEND), b.enable(b.DEPTH_TEST), b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0), 
                b.activeTexture(b.TEXTURE0), b.bindTexture(b.TEXTURE_2D, e.occlusionTexture), b.copyTexImage2D(b.TEXTURE_2D, 0, b.RGBA, q.x - 8, q.y - 8, 16, 16, 0), 
                b.uniform1i(r.renderType, 1), b.disable(b.DEPTH_TEST), b.activeTexture(b.TEXTURE1), 
                b.bindTexture(b.TEXTURE_2D, e.tempTexture), b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0), 
                x.positionScreen.copy(p), x.customUpdateCallback ? x.customUpdateCallback(x) : x.updateLensFlares(), 
                b.uniform1i(r.renderType, 2), b.enable(b.BLEND), u = 0, w = x.lensFlares.length; w > u; u++) y = x.lensFlares[u], 
                y.opacity > .001 && y.scale > .001 && (p.x = y.x, p.y = y.y, p.z = y.z, n = y.size * y.scale / g, 
                o.x = n * k, o.y = n, b.uniform3f(r.screenPosition, p.x, p.y, p.z), b.uniform2f(r.scale, o.x, o.y), 
                b.uniform1f(r.rotation, y.rotation), b.uniform1f(r.opacity, y.opacity), b.uniform3f(r.color, y.color.r, y.color.g, y.color.b), 
                c.setBlending(y.blending, y.blendEquation, y.blendSrc, y.blendDst), c.setTexture(y.texture, 1), 
                b.drawElements(b.TRIANGLES, 6, b.UNSIGNED_SHORT, 0));
                b.enable(b.CULL_FACE), b.enable(b.DEPTH_TEST), b.depthMask(!0);
            }
        };
    }, v.ShadowMapPlugin = function() {
        function a(a, b) {
            var c = new v.DirectionalLight();
            c.isVirtual = !0, c.onlyShadow = !0, c.castShadow = !0, c.shadowCameraNear = a.shadowCameraNear, 
            c.shadowCameraFar = a.shadowCameraFar, c.shadowCameraLeft = a.shadowCameraLeft, 
            c.shadowCameraRight = a.shadowCameraRight, c.shadowCameraBottom = a.shadowCameraBottom, 
            c.shadowCameraTop = a.shadowCameraTop, c.shadowCameraVisible = a.shadowCameraVisible, 
            c.shadowDarkness = a.shadowDarkness, c.shadowBias = a.shadowCascadeBias[b], c.shadowMapWidth = a.shadowCascadeWidth[b], 
            c.shadowMapHeight = a.shadowCascadeHeight[b], c.pointsWorld = [], c.pointsFrustum = [];
            for (var d = c.pointsWorld, e = c.pointsFrustum, f = 0; 8 > f; f++) d[f] = new v.Vector3(), 
            e[f] = new v.Vector3();
            var g = a.shadowCascadeNearZ[b], h = a.shadowCascadeFarZ[b];
            return e[0].set(-1, -1, g), e[1].set(1, -1, g), e[2].set(-1, 1, g), e[3].set(1, 1, g), 
            e[4].set(-1, -1, h), e[5].set(1, -1, h), e[6].set(-1, 1, h), e[7].set(1, 1, h), 
            c;
        }
        function b(a, b) {
            var c = a.shadowCascadeArray[b];
            c.position.copy(a.position), c.target.position.copy(a.target.position), c.lookAt(c.target), 
            c.shadowCameraVisible = a.shadowCameraVisible, c.shadowDarkness = a.shadowDarkness, 
            c.shadowBias = a.shadowCascadeBias[b];
            var d = a.shadowCascadeNearZ[b], e = a.shadowCascadeFarZ[b], f = c.pointsFrustum;
            f[0].z = d, f[1].z = d, f[2].z = d, f[3].z = d, f[4].z = e, f[5].z = e, f[6].z = e, 
            f[7].z = e;
        }
        function c(a, b) {
            var c = b.shadowCamera, d = b.pointsFrustum, e = b.pointsWorld;
            m.set(1/0, 1/0, 1/0), n.set(-1/0, -1/0, -1/0);
            for (var f = 0; 8 > f; f++) {
                var g = e[f];
                g.copy(d[f]), v.ShadowMapPlugin.__projector.unprojectVector(g, a), g.applyMatrix4(c.matrixWorldInverse), 
                g.x < m.x && (m.x = g.x), g.x > n.x && (n.x = g.x), g.y < m.y && (m.y = g.y), g.y > n.y && (n.y = g.y), 
                g.z < m.z && (m.z = g.z), g.z > n.z && (n.z = g.z);
            }
            c.left = m.x, c.right = n.x, c.top = n.y, c.bottom = m.y, c.updateProjectionMatrix();
        }
        function d(a) {
            return a.material instanceof v.MeshFaceMaterial ? a.material.materials[0] : a.material;
        }
        var e, f, g, h, i, j, k = new v.Frustum(), l = new v.Matrix4(), m = new v.Vector3(), n = new v.Vector3(), o = new v.Vector3();
        this.init = function(a) {
            e = a.context, f = a;
            var b = v.ShaderLib.depthRGBA, c = v.UniformsUtils.clone(b.uniforms);
            g = new v.ShaderMaterial({
                fragmentShader: b.fragmentShader,
                vertexShader: b.vertexShader,
                uniforms: c
            }), h = new v.ShaderMaterial({
                fragmentShader: b.fragmentShader,
                vertexShader: b.vertexShader,
                uniforms: c,
                morphTargets: !0
            }), i = new v.ShaderMaterial({
                fragmentShader: b.fragmentShader,
                vertexShader: b.vertexShader,
                uniforms: c,
                skinning: !0
            }), j = new v.ShaderMaterial({
                fragmentShader: b.fragmentShader,
                vertexShader: b.vertexShader,
                uniforms: c,
                morphTargets: !0,
                skinning: !0
            }), g._shadowPass = !0, h._shadowPass = !0, i._shadowPass = !0, j._shadowPass = !0;
        }, this.render = function(a, b) {
            f.shadowMapEnabled && f.shadowMapAutoUpdate && this.update(a, b);
        }, this.update = function(m, n) {
            var p, q, r, s, t, u, w, x, y, z, A, B, C, D, E = [], F = 0, G = null;
            for (e.clearColor(1, 1, 1, 1), e.disable(e.BLEND), e.enable(e.CULL_FACE), e.frontFace(e.CCW), 
            f.shadowMapCullFace === v.CullFaceFront ? e.cullFace(e.FRONT) : e.cullFace(e.BACK), 
            f.setDepthTest(!0), p = 0, q = m.__lights.length; q > p; p++) if (C = m.__lights[p], 
            C.castShadow) if (C instanceof v.DirectionalLight && C.shadowCascade) for (t = 0; t < C.shadowCascadeCount; t++) {
                var H;
                if (C.shadowCascadeArray[t]) H = C.shadowCascadeArray[t]; else {
                    H = a(C, t), H.originalCamera = n;
                    var I = new v.Gyroscope();
                    I.position = C.shadowCascadeOffset, I.add(H), I.add(H.target), n.add(I), C.shadowCascadeArray[t] = H, 
                    console.log("Created virtualLight", H);
                }
                b(C, t), E[F] = H, F++;
            } else E[F] = C, F++;
            for (p = 0, q = E.length; q > p; p++) {
                if (C = E[p], !C.shadowMap) {
                    var J = v.LinearFilter;
                    f.shadowMapType === v.PCFSoftShadowMap && (J = v.NearestFilter);
                    var K = {
                        minFilter: J,
                        magFilter: J,
                        format: v.RGBAFormat
                    };
                    C.shadowMap = new v.WebGLRenderTarget(C.shadowMapWidth, C.shadowMapHeight, K), C.shadowMapSize = new v.Vector2(C.shadowMapWidth, C.shadowMapHeight), 
                    C.shadowMatrix = new v.Matrix4();
                }
                if (!C.shadowCamera) {
                    if (C instanceof v.SpotLight) C.shadowCamera = new v.PerspectiveCamera(C.shadowCameraFov, C.shadowMapWidth / C.shadowMapHeight, C.shadowCameraNear, C.shadowCameraFar); else {
                        if (!(C instanceof v.DirectionalLight)) {
                            console.error("Unsupported light type for shadow");
                            continue;
                        }
                        C.shadowCamera = new v.OrthographicCamera(C.shadowCameraLeft, C.shadowCameraRight, C.shadowCameraTop, C.shadowCameraBottom, C.shadowCameraNear, C.shadowCameraFar);
                    }
                    m.add(C.shadowCamera), m.autoUpdate === !0 && m.updateMatrixWorld();
                }
                for (C.shadowCameraVisible && !C.cameraHelper && (C.cameraHelper = new v.CameraHelper(C.shadowCamera), 
                C.shadowCamera.add(C.cameraHelper)), C.isVirtual && H.originalCamera == n && c(n, C), 
                u = C.shadowMap, w = C.shadowMatrix, x = C.shadowCamera, x.position.getPositionFromMatrix(C.matrixWorld), 
                o.getPositionFromMatrix(C.target.matrixWorld), x.lookAt(o), x.updateMatrixWorld(), 
                x.matrixWorldInverse.getInverse(x.matrixWorld), C.cameraHelper && (C.cameraHelper.visible = C.shadowCameraVisible), 
                C.shadowCameraVisible && C.cameraHelper.update(), w.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1), 
                w.multiply(x.projectionMatrix), w.multiply(x.matrixWorldInverse), l.multiplyMatrices(x.projectionMatrix, x.matrixWorldInverse), 
                k.setFromMatrix(l), f.setRenderTarget(u), f.clear(), D = m.__webglObjects, r = 0, 
                s = D.length; s > r; r++) A = D[r], B = A.object, A.render = !1, B.visible && B.castShadow && ((B instanceof v.Mesh || B instanceof v.ParticleSystem) && B.frustumCulled && !k.intersectsObject(B) || (B._modelViewMatrix.multiplyMatrices(x.matrixWorldInverse, B.matrixWorld), 
                A.render = !0));
                var L, M, N;
                for (r = 0, s = D.length; s > r; r++) A = D[r], A.render && (B = A.object, y = A.buffer, 
                L = d(B), M = B.geometry.morphTargets.length > 0 && L.morphTargets, N = B instanceof v.SkinnedMesh && L.skinning, 
                z = B.customDepthMaterial ? B.customDepthMaterial : N ? M ? j : i : M ? h : g, y instanceof v.BufferGeometry ? f.renderBufferDirect(x, m.__lights, G, z, y, B) : f.renderBuffer(x, m.__lights, G, z, y, B));
                for (D = m.__webglObjectsImmediate, r = 0, s = D.length; s > r; r++) A = D[r], B = A.object, 
                B.visible && B.castShadow && (B._modelViewMatrix.multiplyMatrices(x.matrixWorldInverse, B.matrixWorld), 
                f.renderImmediateObject(x, m.__lights, G, g, B));
            }
            var O = f.getClearColor(), P = f.getClearAlpha();
            e.clearColor(O.r, O.g, O.b, P), e.enable(e.BLEND), f.shadowMapCullFace === v.CullFaceFront && e.cullFace(e.BACK);
        };
    }, v.ShadowMapPlugin.__projector = new v.Projector(), v.SpritePlugin = function() {
        function a(a, b) {
            var d = c.createProgram(), e = c.createShader(c.FRAGMENT_SHADER), f = c.createShader(c.VERTEX_SHADER), g = "precision " + b + " float;\n";
            return c.shaderSource(e, g + a.fragmentShader), c.shaderSource(f, g + a.vertexShader), 
            c.compileShader(e), c.compileShader(f), c.attachShader(d, e), c.attachShader(d, f), 
            c.linkProgram(d), d;
        }
        function b(a, b) {
            return a.z !== b.z ? b.z - a.z : b.id - a.id;
        }
        var c, d, e, f = {};
        this.init = function(b) {
            c = b.context, d = b, e = b.getPrecision(), f.vertices = new Float32Array(16), f.faces = new Uint16Array(6);
            var g = 0;
            f.vertices[g++] = -1, f.vertices[g++] = -1, f.vertices[g++] = 0, f.vertices[g++] = 0, 
            f.vertices[g++] = 1, f.vertices[g++] = -1, f.vertices[g++] = 1, f.vertices[g++] = 0, 
            f.vertices[g++] = 1, f.vertices[g++] = 1, f.vertices[g++] = 1, f.vertices[g++] = 1, 
            f.vertices[g++] = -1, f.vertices[g++] = 1, f.vertices[g++] = 0, f.vertices[g++] = 1, 
            g = 0, f.faces[g++] = 0, f.faces[g++] = 1, f.faces[g++] = 2, f.faces[g++] = 0, f.faces[g++] = 2, 
            f.faces[g++] = 3, f.vertexBuffer = c.createBuffer(), f.elementBuffer = c.createBuffer(), 
            c.bindBuffer(c.ARRAY_BUFFER, f.vertexBuffer), c.bufferData(c.ARRAY_BUFFER, f.vertices, c.STATIC_DRAW), 
            c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, f.elementBuffer), c.bufferData(c.ELEMENT_ARRAY_BUFFER, f.faces, c.STATIC_DRAW), 
            f.program = a(v.ShaderSprite.sprite, e), f.attributes = {}, f.uniforms = {}, f.attributes.position = c.getAttribLocation(f.program, "position"), 
            f.attributes.uv = c.getAttribLocation(f.program, "uv"), f.uniforms.uvOffset = c.getUniformLocation(f.program, "uvOffset"), 
            f.uniforms.uvScale = c.getUniformLocation(f.program, "uvScale"), f.uniforms.rotation = c.getUniformLocation(f.program, "rotation"), 
            f.uniforms.scale = c.getUniformLocation(f.program, "scale"), f.uniforms.alignment = c.getUniformLocation(f.program, "alignment"), 
            f.uniforms.color = c.getUniformLocation(f.program, "color"), f.uniforms.map = c.getUniformLocation(f.program, "map"), 
            f.uniforms.opacity = c.getUniformLocation(f.program, "opacity"), f.uniforms.useScreenCoordinates = c.getUniformLocation(f.program, "useScreenCoordinates"), 
            f.uniforms.sizeAttenuation = c.getUniformLocation(f.program, "sizeAttenuation"), 
            f.uniforms.screenPosition = c.getUniformLocation(f.program, "screenPosition"), f.uniforms.modelViewMatrix = c.getUniformLocation(f.program, "modelViewMatrix"), 
            f.uniforms.projectionMatrix = c.getUniformLocation(f.program, "projectionMatrix"), 
            f.uniforms.fogType = c.getUniformLocation(f.program, "fogType"), f.uniforms.fogDensity = c.getUniformLocation(f.program, "fogDensity"), 
            f.uniforms.fogNear = c.getUniformLocation(f.program, "fogNear"), f.uniforms.fogFar = c.getUniformLocation(f.program, "fogFar"), 
            f.uniforms.fogColor = c.getUniformLocation(f.program, "fogColor"), f.uniforms.alphaTest = c.getUniformLocation(f.program, "alphaTest");
        }, this.render = function(a, e, g, h) {
            var i = a.__webglSprites, j = i.length;
            if (j) {
                var k = f.attributes, l = f.uniforms, m = h / g, n = .5 * g, o = .5 * h;
                c.useProgram(f.program), c.enableVertexAttribArray(k.position), c.enableVertexAttribArray(k.uv), 
                c.disable(c.CULL_FACE), c.enable(c.BLEND), c.bindBuffer(c.ARRAY_BUFFER, f.vertexBuffer), 
                c.vertexAttribPointer(k.position, 2, c.FLOAT, !1, 16, 0), c.vertexAttribPointer(k.uv, 2, c.FLOAT, !1, 16, 8), 
                c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, f.elementBuffer), c.uniformMatrix4fv(l.projectionMatrix, !1, e.projectionMatrix.elements), 
                c.activeTexture(c.TEXTURE0), c.uniform1i(l.map, 0);
                var p = 0, q = 0, r = a.fog;
                r ? (c.uniform3f(l.fogColor, r.color.r, r.color.g, r.color.b), r instanceof v.Fog ? (c.uniform1f(l.fogNear, r.near), 
                c.uniform1f(l.fogFar, r.far), c.uniform1i(l.fogType, 1), p = 1, q = 1) : r instanceof v.FogExp2 && (c.uniform1f(l.fogDensity, r.density), 
                c.uniform1i(l.fogType, 2), p = 2, q = 2)) : (c.uniform1i(l.fogType, 0), p = 0, q = 0);
                var s, t, u, w, x, y = [];
                for (s = 0; j > s; s++) t = i[s], u = t.material, t.visible && 0 !== u.opacity && (u.useScreenCoordinates ? t.z = -t.position.z : (t._modelViewMatrix.multiplyMatrices(e.matrixWorldInverse, t.matrixWorld), 
                t.z = -t._modelViewMatrix.elements[14]));
                for (i.sort(b), s = 0; j > s; s++) t = i[s], u = t.material, t.visible && 0 !== u.opacity && u.map && u.map.image && u.map.image.width && (c.uniform1f(l.alphaTest, u.alphaTest), 
                u.useScreenCoordinates === !0 ? (c.uniform1i(l.useScreenCoordinates, 1), c.uniform3f(l.screenPosition, (t.position.x * d.devicePixelRatio - n) / n, (o - t.position.y * d.devicePixelRatio) / o, Math.max(0, Math.min(1, t.position.z))), 
                y[0] = d.devicePixelRatio, y[1] = d.devicePixelRatio) : (c.uniform1i(l.useScreenCoordinates, 0), 
                c.uniform1i(l.sizeAttenuation, u.sizeAttenuation ? 1 : 0), c.uniformMatrix4fv(l.modelViewMatrix, !1, t._modelViewMatrix.elements), 
                y[0] = 1, y[1] = 1), x = a.fog && u.fog ? q : 0, p !== x && (c.uniform1i(l.fogType, x), 
                p = x), w = 1 / (u.scaleByViewport ? h : 1), y[0] *= w * m * t.scale.x, y[1] *= w * t.scale.y, 
                c.uniform2f(l.uvScale, u.uvScale.x, u.uvScale.y), c.uniform2f(l.uvOffset, u.uvOffset.x, u.uvOffset.y), 
                c.uniform2f(l.alignment, u.alignment.x, u.alignment.y), c.uniform1f(l.opacity, u.opacity), 
                c.uniform3f(l.color, u.color.r, u.color.g, u.color.b), c.uniform1f(l.rotation, t.rotation), 
                c.uniform2fv(l.scale, y), d.setBlending(u.blending, u.blendEquation, u.blendSrc, u.blendDst), 
                d.setDepthTest(u.depthTest), d.setDepthWrite(u.depthWrite), d.setTexture(u.map, 0), 
                c.drawElements(c.TRIANGLES, 6, c.UNSIGNED_SHORT, 0));
                c.enable(c.CULL_FACE);
            }
        };
    }, v.DepthPassPlugin = function() {
        function a(a) {
            return a.material instanceof v.MeshFaceMaterial ? a.material.materials[0] : a.material;
        }
        this.enabled = !1, this.renderTarget = null;
        var b, c, d, e, f, g, h = new v.Frustum(), i = new v.Matrix4();
        this.init = function(a) {
            b = a.context, c = a;
            var h = v.ShaderLib.depthRGBA, i = v.UniformsUtils.clone(h.uniforms);
            d = new v.ShaderMaterial({
                fragmentShader: h.fragmentShader,
                vertexShader: h.vertexShader,
                uniforms: i
            }), e = new v.ShaderMaterial({
                fragmentShader: h.fragmentShader,
                vertexShader: h.vertexShader,
                uniforms: i,
                morphTargets: !0
            }), f = new v.ShaderMaterial({
                fragmentShader: h.fragmentShader,
                vertexShader: h.vertexShader,
                uniforms: i,
                skinning: !0
            }), g = new v.ShaderMaterial({
                fragmentShader: h.fragmentShader,
                vertexShader: h.vertexShader,
                uniforms: i,
                morphTargets: !0,
                skinning: !0
            }), d._shadowPass = !0, e._shadowPass = !0, f._shadowPass = !0, g._shadowPass = !0;
        }, this.render = function(a, b) {
            this.enabled && this.update(a, b);
        }, this.update = function(j, k) {
            var l, m, n, o, p, q, r, s = null;
            for (b.clearColor(1, 1, 1, 1), b.disable(b.BLEND), c.setDepthTest(!0), j.autoUpdate === !0 && j.updateMatrixWorld(), 
            k.matrixWorldInverse.getInverse(k.matrixWorld), i.multiplyMatrices(k.projectionMatrix, k.matrixWorldInverse), 
            h.setFromMatrix(i), c.setRenderTarget(this.renderTarget), c.clear(), r = j.__webglObjects, 
            l = 0, m = r.length; m > l; l++) p = r[l], q = p.object, p.render = !1, q.visible && ((q instanceof v.Mesh || q instanceof v.ParticleSystem) && q.frustumCulled && !h.intersectsObject(q) || (q._modelViewMatrix.multiplyMatrices(k.matrixWorldInverse, q.matrixWorld), 
            p.render = !0));
            var t, u, w;
            for (l = 0, m = r.length; m > l; l++) if (p = r[l], p.render) {
                if (q = p.object, n = p.buffer, q instanceof v.ParticleSystem && !q.customDepthMaterial) continue;
                t = a(q), t && c.setMaterialFaces(q.material), u = q.geometry.morphTargets.length > 0 && t.morphTargets, 
                w = q instanceof v.SkinnedMesh && t.skinning, o = q.customDepthMaterial ? q.customDepthMaterial : w ? u ? g : f : u ? e : d, 
                n instanceof v.BufferGeometry ? c.renderBufferDirect(k, j.__lights, s, o, n, q) : c.renderBuffer(k, j.__lights, s, o, n, q);
            }
            for (r = j.__webglObjectsImmediate, l = 0, m = r.length; m > l; l++) p = r[l], q = p.object, 
            q.visible && (q._modelViewMatrix.multiplyMatrices(k.matrixWorldInverse, q.matrixWorld), 
            c.renderImmediateObject(k, j.__lights, s, d, q));
            var x = c.getClearColor(), y = c.getClearAlpha();
            b.clearColor(x.r, x.g, x.b, y), b.enable(b.BLEND);
        };
    }, v.ShaderFlares = {
        lensFlareVertexTexture: {
            vertexShader: [ "uniform lowp int renderType;", "uniform vec3 screenPosition;", "uniform vec2 scale;", "uniform float rotation;", "uniform sampler2D occlusionMap;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "varying float vVisibility;", "void main() {", "vUV = uv;", "vec2 pos = position;", "if( renderType == 2 ) {", "vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) ) +", "texture2D( occlusionMap, vec2( 0.5, 0.1 ) ) +", "texture2D( occlusionMap, vec2( 0.9, 0.1 ) ) +", "texture2D( occlusionMap, vec2( 0.9, 0.5 ) ) +", "texture2D( occlusionMap, vec2( 0.9, 0.9 ) ) +", "texture2D( occlusionMap, vec2( 0.5, 0.9 ) ) +", "texture2D( occlusionMap, vec2( 0.1, 0.9 ) ) +", "texture2D( occlusionMap, vec2( 0.1, 0.5 ) ) +", "texture2D( occlusionMap, vec2( 0.5, 0.5 ) );", "vVisibility = (       visibility.r / 9.0 ) *", "( 1.0 - visibility.g / 9.0 ) *", "(       visibility.b / 9.0 ) *", "( 1.0 - visibility.a / 9.0 );", "pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;", "pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;", "}", "gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );", "}" ].join("\n"),
            fragmentShader: [ "uniform lowp int renderType;", "uniform sampler2D map;", "uniform float opacity;", "uniform vec3 color;", "varying vec2 vUV;", "varying float vVisibility;", "void main() {", "if( renderType == 0 ) {", "gl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );", "} else if( renderType == 1 ) {", "gl_FragColor = texture2D( map, vUV );", "} else {", "vec4 texture = texture2D( map, vUV );", "texture.a *= opacity * vVisibility;", "gl_FragColor = texture;", "gl_FragColor.rgb *= color;", "}", "}" ].join("\n")
        },
        lensFlare: {
            vertexShader: [ "uniform lowp int renderType;", "uniform vec3 screenPosition;", "uniform vec2 scale;", "uniform float rotation;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "void main() {", "vUV = uv;", "vec2 pos = position;", "if( renderType == 2 ) {", "pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;", "pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;", "}", "gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );", "}" ].join("\n"),
            fragmentShader: [ "precision mediump float;", "uniform lowp int renderType;", "uniform sampler2D map;", "uniform sampler2D occlusionMap;", "uniform float opacity;", "uniform vec3 color;", "varying vec2 vUV;", "void main() {", "if( renderType == 0 ) {", "gl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );", "} else if( renderType == 1 ) {", "gl_FragColor = texture2D( map, vUV );", "} else {", "float visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a +", "texture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a +", "texture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a +", "texture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;", "visibility = ( 1.0 - visibility / 4.0 );", "vec4 texture = texture2D( map, vUV );", "texture.a *= opacity * visibility;", "gl_FragColor = texture;", "gl_FragColor.rgb *= color;", "}", "}" ].join("\n")
        }
    }, v.ShaderSprite = {
        sprite: {
            vertexShader: [ "uniform int useScreenCoordinates;", "uniform int sizeAttenuation;", "uniform vec3 screenPosition;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform float rotation;", "uniform vec2 scale;", "uniform vec2 alignment;", "uniform vec2 uvOffset;", "uniform vec2 uvScale;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "void main() {", "vUV = uvOffset + uv * uvScale;", "vec2 alignedPosition = position + alignment;", "vec2 rotatedPosition;", "rotatedPosition.x = ( cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y ) * scale.x;", "rotatedPosition.y = ( sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y ) * scale.y;", "vec4 finalPosition;", "if( useScreenCoordinates != 0 ) {", "finalPosition = vec4( screenPosition.xy + rotatedPosition, screenPosition.z, 1.0 );", "} else {", "finalPosition = projectionMatrix * modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );", "finalPosition.xy += rotatedPosition * ( sizeAttenuation == 1 ? 1.0 : finalPosition.z );", "}", "gl_Position = finalPosition;", "}" ].join("\n"),
            fragmentShader: [ "uniform vec3 color;", "uniform sampler2D map;", "uniform float opacity;", "uniform int fogType;", "uniform vec3 fogColor;", "uniform float fogDensity;", "uniform float fogNear;", "uniform float fogFar;", "uniform float alphaTest;", "varying vec2 vUV;", "void main() {", "vec4 texture = texture2D( map, vUV );", "if ( texture.a < alphaTest ) discard;", "gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );", "if ( fogType > 0 ) {", "float depth = gl_FragCoord.z / gl_FragCoord.w;", "float fogFactor = 0.0;", "if ( fogType == 1 ) {", "fogFactor = smoothstep( fogNear, fogFar, depth );", "} else {", "const float LOG2 = 1.442695;", "float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );", "fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );", "}", "gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );", "}", "}" ].join("\n")
        }
    }, v.ColladaLoader = function() {
        function a(a, c, d) {
            var e = 0;
            if (document.implementation && document.implementation.createDocument) {
                var f = new XMLHttpRequest();
                f.onreadystatechange = function() {
                    if (4 == f.readyState) {
                        if (0 == f.status || 200 == f.status) if (f.responseXML) Bb = c, b(f.responseXML, void 0, a); else if (f.responseText) {
                            Bb = c;
                            var g = new DOMParser(), h = g.parseFromString(f.responseText, "application/xml");
                            b(h, void 0, a);
                        } else console.error("ColladaLoader: Empty or non-existing file (" + a + ")");
                    } else 3 == f.readyState && d && (0 == e && (e = f.getResponseHeader("Content-Length")), 
                    d({
                        total: e,
                        loaded: f.responseText.length
                    }));
                }, f.open("GET", a, !0), f.send(null);
            } else alert("Don't know how to parse XML!");
        }
        function b(a, b, c) {
            if (zb = a, b = b || Bb, void 0 !== c) {
                var h = c.split("/");
                h.pop(), wb = (h.length < 1 ? "." : h.join("/")) + "/";
            }
            d(), nb(), Db = e("//dae:library_images/dae:image", x, "image"), Hb = e("//dae:library_materials/dae:material", Q, "material"), 
            Ib = e("//dae:library_effects/dae:effect", V, "effect"), Gb = e("//dae:library_geometries/dae:geometry", H, "geometry"), 
            Jb = e(".//dae:library_cameras/dae:camera", _, "camera"), Kb = e(".//dae:library_lights/dae:light", bb, "light"), 
            Fb = e("//dae:library_controllers/dae:controller", y, "controller"), Eb = e("//dae:library_animations/dae:animation", X, "animation"), 
            vb = e(".//dae:library_visual_scenes/dae:visual_scene", B, "visual_scene"), xb = [], 
            yb = [], tb = f(), Ab = new v.Object3D();
            for (var i = 0; i < tb.nodes.length; i++) Ab.add(n(tb.nodes[i]));
            Ab.scale.multiplyScalar(Nb), g();
            var j = {
                scene: Ab,
                morphs: xb,
                skins: yb,
                animations: ub,
                dae: {
                    images: Db,
                    materials: Hb,
                    cameras: Jb,
                    lights: Kb,
                    effects: Ib,
                    geometries: Gb,
                    controllers: Fb,
                    animations: Eb,
                    visualScenes: vb,
                    scene: tb
                }
            };
            return b && b(j), j;
        }
        function c(a) {
            Lb = a;
        }
        function d() {
            var a = zb.evaluate("//dae:asset", zb, eb, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null), b = a.iterateNext();
            if (b && b.childNodes) for (var c = 0; c < b.childNodes.length; c++) {
                var d = b.childNodes[c];
                switch (d.nodeName) {
                  case "unit":
                    var e = d.getAttribute("meter");
                    e && (Nb = parseFloat(e));
                    break;

                  case "up_axis":
                    Ob = d.textContent.charAt(0);
                }
            }
        }
        function e(a, b, c) {
            for (var d = zb.evaluate(a, zb, eb, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null), e = {}, f = d.iterateNext(), g = 0; f; ) {
                var h = new b().parse(f);
                h.id && 0 != h.id.length || (h.id = c + g++), e[h.id] = h, f = d.iterateNext();
            }
            return e;
        }
        function f() {
            var a = zb.evaluate(".//dae:scene/dae:instance_visual_scene", zb, eb, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
            if (a) {
                var b = a.getAttribute("url").replace(/^#/, "");
                return vb[b.length > 0 ? b : "visual_scene0"];
            }
            return null;
        }
        function g() {
            ub = [], h(Ab);
        }
        function h(a) {
            var b = tb.getChildById(a.name, !0), c = null;
            if (b && b.keys) {
                c = {
                    fps: 60,
                    hierarchy: [ {
                        node: b,
                        keys: b.keys,
                        sids: b.sids
                    } ],
                    node: a,
                    name: "animation_" + a.name,
                    length: 0
                }, ub.push(c);
                for (var d = 0, e = b.keys.length; e > d; d++) c.length = Math.max(c.length, b.keys[d].time);
            } else c = {
                hierarchy: [ {
                    keys: [],
                    sids: []
                } ]
            };
            for (var d = 0, e = a.children.length; e > d; d++) for (var f = h(a.children[d]), g = 0, i = f.hierarchy.length; i > g; g++) c.hierarchy.push({
                keys: [],
                sids: []
            });
            return c;
        }
        function i() {
            var a = 1e6, b = -a, c = 0;
            for (var d in Eb) for (var e = Eb[d], f = 0; f < e.sampler.length; f++) {
                var g = e.sampler[f];
                g.create(), a = Math.min(a, g.startTime), b = Math.max(b, g.endTime), c = Math.max(c, g.input.length);
            }
            return {
                start: a,
                end: b,
                frames: c
            };
        }
        function j(a, b) {
            var c = b instanceof E ? Fb[b.url] : b;
            if (!c || !c.morph) return console.log("could not find morph controller!"), void 0;
            for (var d = c.morph, e = 0; e < d.targets.length; e++) {
                var f = d.targets[e], g = Gb[f];
                if (g.mesh && g.mesh.primitives && g.mesh.primitives.length) {
                    var h = g.mesh.primitives[0].geometry;
                    h.vertices.length === a.vertices.length && a.morphTargets.push({
                        name: "target_1",
                        vertices: h.vertices
                    });
                }
            }
            a.morphTargets.push({
                name: "target_Z",
                vertices: a.vertices
            });
        }
        function k(a, b, c, d) {
            if (a.world = a.world || new v.Matrix4(), a.world.copy(a.matrix), a.channels && a.channels.length) {
                var e = a.channels[0], f = e.sampler.output[c];
                f instanceof v.Matrix4 && a.world.copy(f);
            }
            d && a.world.multiplyMatrices(d, a.world), b.push(a);
            for (var g = 0; g < a.nodes.length; g++) k(a.nodes[g], b, c, a.world);
        }
        function l(a, b) {
            for (var c = 0; c < a.length; c++) {
                var d = a[c], e = -1;
                if ("JOINT" == d.type) {
                    for (var f = 0; f < b.joints.length; f++) if (d.sid == b.joints[f]) {
                        e = f;
                        break;
                    }
                    if (!(e >= 0)) throw "ColladaLoader: Could not find joint '" + d.sid + "'.";
                    var g = b.invBindMatrices[e];
                    d.invBindMatrix = g, d.skinningMatrix = new v.Matrix4(), d.skinningMatrix.multiplyMatrices(d.world, g), 
                    d.weights = [];
                    for (var f = 0; f < b.weights.length; f++) for (var h = 0; h < b.weights[f].length; h++) {
                        var i = b.weights[f][h];
                        i.joint == e && d.weights.push(i);
                    }
                }
            }
        }
        function m(a, b, c) {
            var d = Fb[b.url];
            if (c = void 0 !== c ? c : 40, !d || !d.skin) return console.log("ColladaLoader: Could not find skin controller."), 
            void 0;
            if (!b.skeleton || !b.skeleton.length) return console.log("ColladaLoader: Could not find the skeleton for the skin. "), 
            void 0;
            var e, f, g, h, j, m, n, o = i(), p = tb.getChildById(b.skeleton[0], !0) || tb.getChildBySid(b.skeleton[0], !0), q = new v.Vector3();
            for (e = 0; e < a.vertices.length; e++) a.vertices[e].applyMatrix4(d.skin.bindShapeMatrix);
            for (c = 0; c < o.frames; c++) {
                var r = [], s = [];
                for (e = 0; e < a.vertices.length; e++) s.push(new v.Vector3());
                for (k(p, r, c), l(r, d.skin), e = 0; e < r.length; e++) if ("JOINT" == r[e].type) for (f = 0; f < r[e].weights.length; f++) g = r[e].weights[f], 
                h = g.index, j = g.weight, m = a.vertices[h], n = s[h], q.x = m.x, q.y = m.y, q.z = m.z, 
                q.applyMatrix4(r[e].skinningMatrix), n.x += q.x * j, n.y += q.y * j, n.z += q.z * j;
                a.morphTargets.push({
                    name: "target_" + c,
                    vertices: s
                });
            }
        }
        function n(a) {
            var b, c, d, e, f = new v.Object3D(), g = !1;
            for (d = 0; d < a.controllers.length; d++) {
                var h = Fb[a.controllers[d].url];
                switch (h.type) {
                  case "skin":
                    if (Gb[h.skin.source]) {
                        var i = new G();
                        i.url = h.skin.source, i.instance_material = a.controllers[d].instance_material, 
                        a.geometries.push(i), g = !0, b = a.controllers[d];
                    } else if (Fb[h.skin.source]) {
                        var k = Fb[h.skin.source];
                        if (c = k, k.morph && Gb[k.morph.source]) {
                            var i = new G();
                            i.url = k.morph.source, i.instance_material = a.controllers[d].instance_material, 
                            a.geometries.push(i);
                        }
                    }
                    break;

                  case "morph":
                    if (Gb[h.morph.source]) {
                        var i = new G();
                        i.url = h.morph.source, i.instance_material = a.controllers[d].instance_material, 
                        a.geometries.push(i), c = a.controllers[d];
                    }
                    console.log("ColladaLoader: Morph-controller partially supported.");
                }
            }
            var l = {};
            for (d = 0; d < a.geometries.length; d++) {
                var o, p = a.geometries[d], q = p.instance_material, r = Gb[p.url], s = {}, t = [], u = 0;
                if (r) {
                    if (!r.mesh || !r.mesh.primitives) continue;
                    if (0 == f.name.length && (f.name = r.id), q) for (e = 0; e < q.length; e++) {
                        var w = q[e], x = Hb[w.target], y = x.instance_effect.url, z = Ib[y].shader, A = z.material;
                        if (r.doubleSided) {
                            if (!(A in l)) {
                                var B = A.clone();
                                B.side = v.DoubleSide, l[A] = B;
                            }
                            A = l[A];
                        }
                        A.opacity = A.opacity ? A.opacity : 1, s[w.symbol] = u, t.push(A), o = A, o.name = null == x.name || "" === x.name ? x.id : x.name, 
                        u++;
                    }
                    var C, D = o || new v.MeshLambertMaterial({
                        color: 14540253,
                        shading: v.FlatShading,
                        side: r.doubleSided ? v.DoubleSide : v.FrontSide
                    }), E = r.mesh.geometry3js;
                    if (u > 1) for (D = new v.MeshFaceMaterial(t), e = 0; e < E.faces.length; e++) {
                        var F = E.faces[e];
                        F.materialIndex = s[F.daeMaterial];
                    }
                    void 0 !== b ? (m(E, b), D.morphTargets = !0, C = new v.SkinnedMesh(E, D, !1), C.skeleton = b.skeleton, 
                    C.skinController = Fb[b.url], C.skinInstanceController = b, C.name = "skin_" + yb.length, 
                    yb.push(C)) : void 0 !== c ? (j(E, c), D.morphTargets = !0, C = new v.Mesh(E, D), 
                    C.name = "morph_" + xb.length, xb.push(C)) : C = new v.Mesh(E, D), a.geometries.length > 1 ? f.add(C) : f = C;
                }
            }
            for (d = 0; d < a.cameras.length; d++) {
                var H = Jb[a.cameras[d].url];
                f = new v.PerspectiveCamera(H.fov, H.aspect_ratio, H.znear, H.zfar);
            }
            for (d = 0; d < a.lights.length; d++) {
                var H = Kb[a.lights[d].url];
                switch (H.technique) {
                  case "ambient":
                    f = new v.AmbientLight(H.color);
                    break;

                  case "point":
                    f = new v.PointLight(H.color);
                    break;

                  case "directional":
                    f = new v.DirectionalLight(H.color);
                }
            }
            f.name = a.name || a.id || "", f.matrix = a.matrix;
            var I = a.matrix.decompose();
            if (f.position = I[0], f.quaternion = I[1], f.useQuaternion = !0, f.scale = I[2], 
            Mb.centerGeometry && f.geometry) {
                var J = v.GeometryUtils.center(f.geometry);
                J.multiply(f.scale), J.applyQuaternion(f.quaternion), f.position.sub(J);
            }
            for (d = 0; d < a.nodes.length; d++) f.add(n(a.nodes[d], a));
            return f;
        }
        function o(a) {
            return zb.evaluate(".//dae:library_nodes//dae:node[@id='" + a + "']", zb, eb, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
        }
        function p(a) {
            var b = [], c = 1e6, d = -1e6;
            for (var e in Eb) for (var f = Eb[e], g = 0; g < f.channel.length; g++) {
                var h = f.channel[g], i = f.sampler[g], e = h.target.split("/")[0];
                e == a.id && (i.create(), h.sampler = i, c = Math.min(c, i.startTime), d = Math.max(d, i.endTime), 
                b.push(h));
            }
            return b.length && (a.startTime = c, a.endTime = d), b;
        }
        function q(a) {
            if (a.channels && a.channels.length) {
                for (var b = [], c = [], d = 0, e = a.channels.length; e > d; d++) {
                    var f, g = a.channels[d], h = g.fullSid, i = g.sampler, j = i.input, k = a.getTransformBySid(g.sid);
                    if (g.arrIndices) {
                        f = [];
                        for (var l = 0, m = g.arrIndices.length; m > l; l++) f[l] = rb(g.arrIndices[l]);
                    } else f = sb(g.member);
                    if (k) {
                        -1 === c.indexOf(h) && c.push(h);
                        for (var l = 0, m = j.length; m > l; l++) {
                            var n = j[l], o = i.getData(k.type, l), p = r(b, n);
                            if (!p) {
                                p = new $(n);
                                var q = s(b, n);
                                b.splice(-1 == q ? b.length : q, 0, p);
                            }
                            p.addTarget(h, k, f, o);
                        }
                    } else console.log('Could not find transform "' + g.sid + '" in node ' + a.id);
                }
                for (var d = 0; d < c.length; d++) for (var u = c[d], l = 0; l < b.length; l++) {
                    var p = b[l];
                    p.hasTarget(u) || t(b, p, l, u);
                }
                a.keys = b, a.sids = c;
            }
        }
        function r(a, b) {
            for (var c = null, d = 0, e = a.length; e > d && null == c; d++) {
                var f = a[d];
                if (f.time === b) c = f; else if (f.time > b) break;
            }
            return c;
        }
        function s(a, b) {
            for (var c = -1, d = 0, e = a.length; e > d && -1 == c; d++) {
                var f = a[d];
                f.time >= b && (c = d);
            }
            return c;
        }
        function t(a, b, c, d) {
            var e = w(a, d, c ? c - 1 : 0), f = u(a, d, c + 1);
            if (e && f) {
                var g, h = (b.time - e.time) / (f.time - e.time), i = e.getTarget(d), j = f.getTarget(d).data, k = i.data;
                if ("matrix" === i.type) g = k; else if (k.length) {
                    g = [];
                    for (var l = 0; l < k.length; ++l) g[l] = k[l] + (j[l] - k[l]) * h;
                } else g = k + (j - k) * h;
                b.addTarget(d, i.transform, i.member, g);
            }
        }
        function u(a, b, c) {
            for (;c < a.length; c++) {
                var d = a[c];
                if (d.hasTarget(b)) return d;
            }
            return null;
        }
        function w(a, b, c) {
            for (c = c >= 0 ? c : c + a.length; c >= 0; c--) {
                var d = a[c];
                if (d.hasTarget(b)) return d;
            }
            return null;
        }
        function x() {
            this.id = "", this.init_from = "";
        }
        function y() {
            this.id = "", this.name = "", this.type = "", this.skin = null, this.morph = null;
        }
        function z() {
            this.method = null, this.source = null, this.targets = null, this.weights = null;
        }
        function A() {
            this.source = "", this.bindShapeMatrix = null, this.invBindMatrices = [], this.joints = [], 
            this.weights = [];
        }
        function B() {
            this.id = "", this.name = "", this.nodes = [], this.scene = new v.Object3D();
        }
        function C() {
            this.id = "", this.name = "", this.sid = "", this.nodes = [], this.controllers = [], 
            this.transforms = [], this.geometries = [], this.channels = [], this.matrix = new v.Matrix4();
        }
        function D() {
            this.sid = "", this.type = "", this.data = [], this.obj = null;
        }
        function E() {
            this.url = "", this.skeleton = [], this.instance_material = [];
        }
        function F() {
            this.symbol = "", this.target = "";
        }
        function G() {
            this.url = "", this.instance_material = [];
        }
        function H() {
            this.id = "", this.mesh = null;
        }
        function I(a) {
            this.geometry = a.id, this.primitives = [], this.vertices = null, this.geometry3js = null;
        }
        function J() {
            this.material = "", this.count = 0, this.inputs = [], this.vcount = null, this.p = [], 
            this.geometry = new v.Geometry();
        }
        function K() {
            J.call(this), this.vcount = [];
        }
        function L() {
            J.call(this), this.vcount = 3;
        }
        function M() {
            this.source = "", this.count = 0, this.stride = 0, this.params = [];
        }
        function N() {
            this.input = {};
        }
        function O() {
            this.semantic = "", this.offset = 0, this.source = "", this.set = 0;
        }
        function P(a) {
            this.id = a, this.type = null;
        }
        function Q() {
            this.id = "", this.name = "", this.instance_effect = null;
        }
        function R() {
            this.color = new v.Color(), this.color.setRGB(Math.random(), Math.random(), Math.random()), 
            this.color.a = 1, this.texture = null, this.texcoord = null, this.texOpts = null;
        }
        function S(a, b) {
            this.type = a, this.effect = b, this.material = null;
        }
        function T(a) {
            this.effect = a, this.init_from = null, this.format = null;
        }
        function U(a) {
            this.effect = a, this.source = null, this.wrap_s = null, this.wrap_t = null, this.minfilter = null, 
            this.magfilter = null, this.mipfilter = null;
        }
        function V() {
            this.id = "", this.name = "", this.shader = null, this.surface = {}, this.sampler = {};
        }
        function W() {
            this.url = "";
        }
        function X() {
            this.id = "", this.name = "", this.source = {}, this.sampler = [], this.channel = [];
        }
        function Y(a) {
            this.animation = a, this.source = "", this.target = "", this.fullSid = null, this.sid = null, 
            this.dotSyntax = null, this.arrSyntax = null, this.arrIndices = null, this.member = null;
        }
        function Z(a) {
            this.id = "", this.animation = a, this.inputs = [], this.input = null, this.output = null, 
            this.strideOut = null, this.interpolation = null, this.startTime = null, this.endTime = null, 
            this.duration = 0;
        }
        function $(a) {
            this.targets = [], this.time = a;
        }
        function _() {
            this.id = "", this.name = "", this.technique = "";
        }
        function ab() {
            this.url = "";
        }
        function bb() {
            this.id = "", this.name = "", this.technique = "";
        }
        function cb() {
            this.url = "";
        }
        function db(a) {
            var b = a.getAttribute("id");
            return void 0 != Cb[b] ? Cb[b] : (Cb[b] = new P(b).parse(a), Cb[b]);
        }
        function eb(a) {
            return "dae" == a ? "http://www.collada.org/2005/11/COLLADASchema" : null;
        }
        function fb(a) {
            for (var b = ib(a), c = [], d = 0, e = b.length; e > d; d++) c.push("true" == b[d] || "1" == b[d] ? !0 : !1);
            return c;
        }
        function gb(a) {
            for (var b = ib(a), c = [], d = 0, e = b.length; e > d; d++) c.push(parseFloat(b[d]));
            return c;
        }
        function hb(a) {
            for (var b = ib(a), c = [], d = 0, e = b.length; e > d; d++) c.push(parseInt(b[d], 10));
            return c;
        }
        function ib(a) {
            return a.length > 0 ? jb(a).split(/\s+/) : [];
        }
        function jb(a) {
            return a.replace(/^\s+/, "").replace(/\s+$/, "");
        }
        function kb(a, b, c) {
            return a.hasAttribute(b) ? parseInt(a.getAttribute(b), 10) : c;
        }
        function lb(a, b) {
            for (var c = zb.evaluate(b, a, eb, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null), d = c.iterateNext(), e = []; d; ) e.push(d), 
            d = c.iterateNext();
            return e;
        }
        function mb(a, b) {
            a.doubleSided = !1;
            var c = zb.evaluate(".//dae:extra//dae:double_sided", b, eb, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
            c && (c = c.iterateNext(), c && 1 === parseInt(c.textContent, 10) && (a.doubleSided = !0));
        }
        function nb() {
            if (Mb.convertUpAxis && Ob !== Mb.upAxis) switch (Ob) {
              case "X":
                Pb = "Y" === Mb.upAxis ? "XtoY" : "XtoZ";
                break;

              case "Y":
                Pb = "X" === Mb.upAxis ? "YtoX" : "YtoZ";
                break;

              case "Z":
                Pb = "X" === Mb.upAxis ? "ZtoX" : "ZtoY";
            } else Pb = null;
        }
        function ob(a, b) {
            if (Mb.convertUpAxis && Ob !== Mb.upAxis) switch (Pb) {
              case "XtoY":
                var c = a[0];
                a[0] = b * a[1], a[1] = c;
                break;

              case "XtoZ":
                var c = a[2];
                a[2] = a[1], a[1] = a[0], a[0] = c;
                break;

              case "YtoX":
                var c = a[0];
                a[0] = a[1], a[1] = b * c;
                break;

              case "YtoZ":
                var c = a[1];
                a[1] = b * a[2], a[2] = c;
                break;

              case "ZtoX":
                var c = a[0];
                a[0] = a[1], a[1] = a[2], a[2] = c;
                break;

              case "ZtoY":
                var c = a[1];
                a[1] = a[2], a[2] = b * c;
            }
        }
        function pb(a, b) {
            var c = [ a[b], a[b + 1], a[b + 2] ];
            return ob(c, -1), new v.Vector3(c[0], c[1], c[2]);
        }
        function qb(a) {
            if (Mb.convertUpAxis) {
                var b = [ a[0], a[4], a[8] ];
                ob(b, -1), a[0] = b[0], a[4] = b[1], a[8] = b[2], b = [ a[1], a[5], a[9] ], ob(b, -1), 
                a[1] = b[0], a[5] = b[1], a[9] = b[2], b = [ a[2], a[6], a[10] ], ob(b, -1), a[2] = b[0], 
                a[6] = b[1], a[10] = b[2], b = [ a[0], a[1], a[2] ], ob(b, -1), a[0] = b[0], a[1] = b[1], 
                a[2] = b[2], b = [ a[4], a[5], a[6] ], ob(b, -1), a[4] = b[0], a[5] = b[1], a[6] = b[2], 
                b = [ a[8], a[9], a[10] ], ob(b, -1), a[8] = b[0], a[9] = b[1], a[10] = b[2], b = [ a[3], a[7], a[11] ], 
                ob(b, -1), a[3] = b[0], a[7] = b[1], a[11] = b[2];
            }
            return new v.Matrix4(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7], a[8], a[9], a[10], a[11], a[12], a[13], a[14], a[15]);
        }
        function rb(a) {
            if (a > -1 && 3 > a) {
                var b = [ "X", "Y", "Z" ], c = {
                    X: 0,
                    Y: 1,
                    Z: 2
                };
                a = sb(b[a]), a = c[a];
            }
            return a;
        }
        function sb(a) {
            if (Mb.convertUpAxis) switch (a) {
              case "X":
                switch (Pb) {
                  case "XtoY":
                  case "XtoZ":
                  case "YtoX":
                    a = "Y";
                    break;

                  case "ZtoX":
                    a = "Z";
                }
                break;

              case "Y":
                switch (Pb) {
                  case "XtoY":
                  case "YtoX":
                  case "ZtoX":
                    a = "X";
                    break;

                  case "XtoZ":
                  case "YtoZ":
                  case "ZtoY":
                    a = "Z";
                }
                break;

              case "Z":
                switch (Pb) {
                  case "XtoZ":
                    a = "X";
                    break;

                  case "YtoZ":
                  case "ZtoX":
                  case "ZtoY":
                    a = "Y";
                }
            }
            return a;
        }
        var tb, ub, vb, wb, xb, yb, zb = null, Ab = null, Bb = null, Cb = {}, Db = {}, Eb = {}, Fb = {}, Gb = {}, Hb = {}, Ib = {}, Jb = {}, Kb = {}, Lb = v.SmoothShading, Mb = {
            centerGeometry: !1,
            convertUpAxis: !1,
            subdivideFaces: !0,
            upAxis: "Y",
            defaultEnvMap: null
        }, Nb = 1, Ob = "Y", Pb = null;
        return x.prototype.parse = function(a) {
            this.id = a.getAttribute("id");
            for (var b = 0; b < a.childNodes.length; b++) {
                var c = a.childNodes[b];
                "init_from" == c.nodeName && (this.init_from = c.textContent);
            }
            return this;
        }, y.prototype.parse = function(a) {
            this.id = a.getAttribute("id"), this.name = a.getAttribute("name"), this.type = "none";
            for (var b = 0; b < a.childNodes.length; b++) {
                var c = a.childNodes[b];
                switch (c.nodeName) {
                  case "skin":
                    this.skin = new A().parse(c), this.type = c.nodeName;
                    break;

                  case "morph":
                    this.morph = new z().parse(c), this.type = c.nodeName;
                }
            }
            return this;
        }, z.prototype.parse = function(a) {
            var b, c = {}, d = [];
            for (this.method = a.getAttribute("method"), this.source = a.getAttribute("source").replace(/^#/, ""), 
            b = 0; b < a.childNodes.length; b++) {
                var e = a.childNodes[b];
                if (1 == e.nodeType) switch (e.nodeName) {
                  case "source":
                    var f = new P().parse(e);
                    c[f.id] = f;
                    break;

                  case "targets":
                    d = this.parseInputs(e);
                    break;

                  default:
                    console.log(e.nodeName);
                }
            }
            for (b = 0; b < d.length; b++) {
                var g = d[b], f = c[g.source];
                switch (g.semantic) {
                  case "MORPH_TARGET":
                    this.targets = f.read();
                    break;

                  case "MORPH_WEIGHT":
                    this.weights = f.read();
                }
            }
            return this;
        }, z.prototype.parseInputs = function(a) {
            for (var b = [], c = 0; c < a.childNodes.length; c++) {
                var d = a.childNodes[c];
                if (1 == d.nodeType) switch (d.nodeName) {
                  case "input":
                    b.push(new O().parse(d));
                }
            }
            return b;
        }, A.prototype.parse = function(a) {
            var b, c, d = {};
            this.source = a.getAttribute("source").replace(/^#/, ""), this.invBindMatrices = [], 
            this.joints = [], this.weights = [];
            for (var e = 0; e < a.childNodes.length; e++) {
                var f = a.childNodes[e];
                if (1 == f.nodeType) switch (f.nodeName) {
                  case "bind_shape_matrix":
                    var g = gb(f.textContent);
                    this.bindShapeMatrix = qb(g);
                    break;

                  case "source":
                    var h = new P().parse(f);
                    d[h.id] = h;
                    break;

                  case "joints":
                    b = f;
                    break;

                  case "vertex_weights":
                    c = f;
                    break;

                  default:
                    console.log(f.nodeName);
                }
            }
            return this.parseJoints(b, d), this.parseWeights(c, d), this;
        }, A.prototype.parseJoints = function(a, b) {
            for (var c = 0; c < a.childNodes.length; c++) {
                var d = a.childNodes[c];
                if (1 == d.nodeType) switch (d.nodeName) {
                  case "input":
                    var e = new O().parse(d), f = b[e.source];
                    "JOINT" == e.semantic ? this.joints = f.read() : "INV_BIND_MATRIX" == e.semantic && (this.invBindMatrices = f.read());
                }
            }
        }, A.prototype.parseWeights = function(a, b) {
            for (var c, d, e = [], f = 0; f < a.childNodes.length; f++) {
                var g = a.childNodes[f];
                if (1 == g.nodeType) switch (g.nodeName) {
                  case "input":
                    e.push(new O().parse(g));
                    break;

                  case "v":
                    c = hb(g.textContent);
                    break;

                  case "vcount":
                    d = hb(g.textContent);
                }
            }
            for (var h = 0, f = 0; f < d.length; f++) {
                for (var i = d[f], j = [], k = 0; i > k; k++) {
                    for (var l = {}, m = 0; m < e.length; m++) {
                        var n = e[m], o = c[h + n.offset];
                        switch (n.semantic) {
                          case "JOINT":
                            l.joint = o;
                            break;

                          case "WEIGHT":
                            l.weight = b[n.source].data[o];
                        }
                    }
                    j.push(l), h += e.length;
                }
                for (var k = 0; k < j.length; k++) j[k].index = f;
                this.weights.push(j);
            }
        }, B.prototype.getChildById = function(a, b) {
            for (var c = 0; c < this.nodes.length; c++) {
                var d = this.nodes[c].getChildById(a, b);
                if (d) return d;
            }
            return null;
        }, B.prototype.getChildBySid = function(a, b) {
            for (var c = 0; c < this.nodes.length; c++) {
                var d = this.nodes[c].getChildBySid(a, b);
                if (d) return d;
            }
            return null;
        }, B.prototype.parse = function(a) {
            this.id = a.getAttribute("id"), this.name = a.getAttribute("name"), this.nodes = [];
            for (var b = 0; b < a.childNodes.length; b++) {
                var c = a.childNodes[b];
                if (1 == c.nodeType) switch (c.nodeName) {
                  case "node":
                    this.nodes.push(new C().parse(c));
                }
            }
            return this;
        }, C.prototype.getChannelForTransform = function(a) {
            for (var b = 0; b < this.channels.length; b++) {
                var c = this.channels[b], d = c.target.split("/");
                d.shift();
                var e, f, g = d.shift(), h = g.indexOf(".") >= 0, i = g.indexOf("(") >= 0;
                if (h) d = g.split("."), g = d.shift(), f = d.shift(); else if (i) {
                    e = g.split("("), g = e.shift();
                    for (var j = 0; j < e.length; j++) e[j] = parseInt(e[j].replace(/\)/, ""));
                }
                if (g == a) return c.info = {
                    sid: g,
                    dotSyntax: h,
                    arrSyntax: i,
                    arrIndices: e
                }, c;
            }
            return null;
        }, C.prototype.getChildById = function(a, b) {
            if (this.id == a) return this;
            if (b) for (var c = 0; c < this.nodes.length; c++) {
                var d = this.nodes[c].getChildById(a, b);
                if (d) return d;
            }
            return null;
        }, C.prototype.getChildBySid = function(a, b) {
            if (this.sid == a) return this;
            if (b) for (var c = 0; c < this.nodes.length; c++) {
                var d = this.nodes[c].getChildBySid(a, b);
                if (d) return d;
            }
            return null;
        }, C.prototype.getTransformBySid = function(a) {
            for (var b = 0; b < this.transforms.length; b++) if (this.transforms[b].sid == a) return this.transforms[b];
            return null;
        }, C.prototype.parse = function(a) {
            var b;
            this.id = a.getAttribute("id"), this.sid = a.getAttribute("sid"), this.name = a.getAttribute("name"), 
            this.type = a.getAttribute("type"), this.type = "JOINT" == this.type ? this.type : "NODE", 
            this.nodes = [], this.transforms = [], this.geometries = [], this.cameras = [], 
            this.lights = [], this.controllers = [], this.matrix = new v.Matrix4();
            for (var c = 0; c < a.childNodes.length; c++) {
                var d = a.childNodes[c];
                if (1 == d.nodeType) switch (d.nodeName) {
                  case "node":
                    this.nodes.push(new C().parse(d));
                    break;

                  case "instance_camera":
                    this.cameras.push(new ab().parse(d));
                    break;

                  case "instance_light":
                    this.lights.push(new cb().parse(d));
                    break;

                  case "instance_controller":
                    this.controllers.push(new E().parse(d));
                    break;

                  case "instance_geometry":
                    this.geometries.push(new G().parse(d));
                    break;

                  case "instance_node":
                    b = d.getAttribute("url").replace(/^#/, "");
                    var e = o(b);
                    e && this.nodes.push(new C().parse(e));
                    break;

                  case "rotate":
                  case "translate":
                  case "scale":
                  case "matrix":
                  case "lookat":
                  case "skew":
                    this.transforms.push(new D().parse(d));
                    break;

                  case "extra":
                    break;

                  default:
                    console.log(d.nodeName);
                }
            }
            return this.channels = p(this), q(this), this.updateMatrix(), this;
        }, C.prototype.updateMatrix = function() {
            this.matrix.identity();
            for (var a = 0; a < this.transforms.length; a++) this.transforms[a].apply(this.matrix);
        }, D.prototype.parse = function(a) {
            return this.sid = a.getAttribute("sid"), this.type = a.nodeName, this.data = gb(a.textContent), 
            this.convert(), this;
        }, D.prototype.convert = function() {
            switch (this.type) {
              case "matrix":
                this.obj = qb(this.data);
                break;

              case "rotate":
                this.angle = v.Math.degToRad(this.data[3]);

              case "translate":
                ob(this.data, -1), this.obj = new v.Vector3(this.data[0], this.data[1], this.data[2]);
                break;

              case "scale":
                ob(this.data, 1), this.obj = new v.Vector3(this.data[0], this.data[1], this.data[2]);
                break;

              default:
                console.log("Can not convert Transform of type " + this.type);
            }
        }, D.prototype.apply = function() {
            var a = new v.Matrix4();
            return function(b) {
                switch (this.type) {
                  case "matrix":
                    b.multiply(this.obj);
                    break;

                  case "translate":
                    b.multiply(a.makeTranslation(this.obj.x, this.obj.y, this.obj.z));
                    break;

                  case "rotate":
                    b.multiply(a.makeRotationAxis(this.obj, this.angle));
                    break;

                  case "scale":
                    b.scale(this.obj);
                }
            };
        }(), D.prototype.update = function(a, b) {
            var c = [ "X", "Y", "Z", "ANGLE" ];
            switch (this.type) {
              case "matrix":
                if (b) if (1 === b.length) switch (b[0]) {
                  case 0:
                    this.obj.n11 = a[0], this.obj.n21 = a[1], this.obj.n31 = a[2], this.obj.n41 = a[3];
                    break;

                  case 1:
                    this.obj.n12 = a[0], this.obj.n22 = a[1], this.obj.n32 = a[2], this.obj.n42 = a[3];
                    break;

                  case 2:
                    this.obj.n13 = a[0], this.obj.n23 = a[1], this.obj.n33 = a[2], this.obj.n43 = a[3];
                    break;

                  case 3:
                    this.obj.n14 = a[0], this.obj.n24 = a[1], this.obj.n34 = a[2], this.obj.n44 = a[3];
                } else if (2 === b.length) {
                    var d = "n" + (b[0] + 1) + (b[1] + 1);
                    this.obj[d] = a;
                } else console.log("Incorrect addressing of matrix in transform."); else this.obj.copy(a);
                break;

              case "translate":
              case "scale":
                switch ("[object Array]" === Object.prototype.toString.call(b) && (b = c[b[0]]), 
                b) {
                  case "X":
                    this.obj.x = a;
                    break;

                  case "Y":
                    this.obj.y = a;
                    break;

                  case "Z":
                    this.obj.z = a;
                    break;

                  default:
                    this.obj.x = a[0], this.obj.y = a[1], this.obj.z = a[2];
                }
                break;

              case "rotate":
                switch ("[object Array]" === Object.prototype.toString.call(b) && (b = c[b[0]]), 
                b) {
                  case "X":
                    this.obj.x = a;
                    break;

                  case "Y":
                    this.obj.y = a;
                    break;

                  case "Z":
                    this.obj.z = a;
                    break;

                  case "ANGLE":
                    this.angle = v.Math.degToRad(a);
                    break;

                  default:
                    this.obj.x = a[0], this.obj.y = a[1], this.obj.z = a[2], this.angle = v.Math.degToRad(a[3]);
                }
            }
        }, E.prototype.parse = function(a) {
            this.url = a.getAttribute("url").replace(/^#/, ""), this.skeleton = [], this.instance_material = [];
            for (var b = 0; b < a.childNodes.length; b++) {
                var c = a.childNodes[b];
                if (1 === c.nodeType) switch (c.nodeName) {
                  case "skeleton":
                    this.skeleton.push(c.textContent.replace(/^#/, ""));
                    break;

                  case "bind_material":
                    var d = zb.evaluate(".//dae:instance_material", c, eb, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
                    if (d) for (var e = d.iterateNext(); e; ) this.instance_material.push(new F().parse(e)), 
                    e = d.iterateNext();
                    break;

                  case "extra":                }
            }
            return this;
        }, F.prototype.parse = function(a) {
            return this.symbol = a.getAttribute("symbol"), this.target = a.getAttribute("target").replace(/^#/, ""), 
            this;
        }, G.prototype.parse = function(a) {
            this.url = a.getAttribute("url").replace(/^#/, ""), this.instance_material = [];
            for (var b = 0; b < a.childNodes.length; b++) {
                var c = a.childNodes[b];
                if (1 == c.nodeType && "bind_material" == c.nodeName) {
                    var d = zb.evaluate(".//dae:instance_material", c, eb, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
                    if (d) for (var e = d.iterateNext(); e; ) this.instance_material.push(new F().parse(e)), 
                    e = d.iterateNext();
                    break;
                }
            }
            return this;
        }, H.prototype.parse = function(a) {
            this.id = a.getAttribute("id"), mb(this, a);
            for (var b = 0; b < a.childNodes.length; b++) {
                var c = a.childNodes[b];
                switch (c.nodeName) {
                  case "mesh":
                    this.mesh = new I(this).parse(c);
                    break;

                  case "extra":                }
            }
            return this;
        }, I.prototype.parse = function(a) {
            this.primitives = [];
            var b;
            for (b = 0; b < a.childNodes.length; b++) {
                var c = a.childNodes[b];
                switch (c.nodeName) {
                  case "source":
                    db(c);
                    break;

                  case "vertices":
                    this.vertices = new N().parse(c);
                    break;

                  case "triangles":
                    this.primitives.push(new L().parse(c));
                    break;

                  case "polygons":
                    this.primitives.push(new J().parse(c));
                    break;

                  case "polylist":
                    this.primitives.push(new K().parse(c));
                }
            }
            this.geometry3js = new v.Geometry();
            var d = Cb[this.vertices.input.POSITION.source].data;
            for (b = 0; b < d.length; b += 3) this.geometry3js.vertices.push(pb(d, b).clone());
            for (b = 0; b < this.primitives.length; b++) {
                var e = this.primitives[b];
                e.setVertices(this.vertices), this.handlePrimitive(e, this.geometry3js);
            }
            return this.geometry3js.computeCentroids(), this.geometry3js.computeFaceNormals(), 
            this.geometry3js.calcNormals && (this.geometry3js.computeVertexNormals(), delete this.geometry3js.calcNormals), 
            this.geometry3js.computeBoundingBox(), this;
        }, I.prototype.handlePrimitive = function(a, b) {
            var c, d, e, f, g, h, i, j = a.p, k = a.inputs, l = 0, m = 3, n = 0, o = [];
            for (c = 0; c < k.length; c++) {
                e = k[c];
                var p = e.offset + 1;
                switch (n = p > n ? p : n, e.semantic) {
                  case "TEXCOORD":
                    o.push(e.set);
                }
            }
            for (var q = 0; q < j.length; ++q) for (var r = j[q], s = 0; s < r.length; ) {
                var t = [], u = [], w = null, x = [];
                for (m = a.vcount ? a.vcount.length ? a.vcount[l++] : a.vcount : r.length / n, c = 0; m > c; c++) for (d = 0; d < k.length; d++) switch (e = k[d], 
                h = Cb[e.source], f = r[s + c * n + e.offset], i = h.accessor.params.length, g = f * i, 
                e.semantic) {
                  case "VERTEX":
                    t.push(f);
                    break;

                  case "NORMAL":
                    u.push(pb(h.data, g));
                    break;

                  case "TEXCOORD":
                    w = w || {}, void 0 === w[e.set] && (w[e.set] = []), w[e.set].push(new v.Vector2(h.data[g], h.data[g + 1]));
                    break;

                  case "COLOR":
                    x.push(new v.Color().setRGB(h.data[g], h.data[g + 1], h.data[g + 2]));
                }
                if (0 == u.length) if (e = this.vertices.input.NORMAL) {
                    h = Cb[e.source], i = h.accessor.params.length;
                    for (var y = 0, z = t.length; z > y; y++) u.push(pb(h.data, t[y] * i));
                } else b.calcNormals = !0;
                if (!w && (w = {}, e = this.vertices.input.TEXCOORD)) {
                    o.push(e.set), h = Cb[e.source], i = h.accessor.params.length;
                    for (var y = 0, z = t.length; z > y; y++) g = t[y] * i, void 0 === w[e.set] && (w[e.set] = []), 
                    w[e.set].push(new v.Vector2(h.data[g], 1 - h.data[g + 1]));
                }
                if (0 == x.length && (e = this.vertices.input.COLOR)) {
                    h = Cb[e.source], i = h.accessor.params.length;
                    for (var y = 0, z = t.length; z > y; y++) g = t[y] * i, x.push(new v.Color().setRGB(h.data[g], h.data[g + 1], h.data[g + 2]));
                }
                var A, B, C = null, D = [];
                if (3 === m) D.push(new v.Face3(t[0], t[1], t[2], u, x.length ? x : new v.Color())); else if (4 === m) D.push(new v.Face4(t[0], t[1], t[2], t[3], u, x.length ? x : new v.Color())); else if (m > 4 && Mb.subdivideFaces) {
                    var E = x.length ? x : new v.Color();
                    for (d = 1; m - 1 > d; ) D.push(new v.Face3(t[0], t[d], t[d + 1], [ u[0], u[d++], u[d] ], E));
                }
                if (D.length) for (var y = 0, z = D.length; z > y; y++) for (C = D[y], C.daeMaterial = a.material, 
                b.faces.push(C), d = 0; d < o.length; d++) A = w[o[d]], B = m > 4 ? [ A[0], A[y + 1], A[y + 2] ] : 4 === m ? [ A[0], A[1], A[2], A[3] ] : [ A[0], A[1], A[2] ], 
                b.faceVertexUvs[d] || (b.faceVertexUvs[d] = []), b.faceVertexUvs[d].push(B); else console.log("dropped face with vcount " + m + " for geometry with id: " + b.id);
                s += n * m;
            }
        }, J.prototype.setVertices = function(a) {
            for (var b = 0; b < this.inputs.length; b++) this.inputs[b].source == a.id && (this.inputs[b].source = a.input.POSITION.source);
        }, J.prototype.parse = function(a) {
            this.material = a.getAttribute("material"), this.count = kb(a, "count", 0);
            for (var b = 0; b < a.childNodes.length; b++) {
                var c = a.childNodes[b];
                switch (c.nodeName) {
                  case "input":
                    this.inputs.push(new O().parse(a.childNodes[b]));
                    break;

                  case "vcount":
                    this.vcount = hb(c.textContent);
                    break;

                  case "p":
                    this.p.push(hb(c.textContent));
                    break;

                  case "ph":
                    console.warn("polygon holes not yet supported!");
                }
            }
            return this;
        }, K.prototype = Object.create(J.prototype), L.prototype = Object.create(J.prototype), 
        M.prototype.parse = function(a) {
            this.params = [], this.source = a.getAttribute("source"), this.count = kb(a, "count", 0), 
            this.stride = kb(a, "stride", 0);
            for (var b = 0; b < a.childNodes.length; b++) {
                var c = a.childNodes[b];
                if ("param" == c.nodeName) {
                    var d = {};
                    d.name = c.getAttribute("name"), d.type = c.getAttribute("type"), this.params.push(d);
                }
            }
            return this;
        }, N.prototype.parse = function(a) {
            this.id = a.getAttribute("id");
            for (var b = 0; b < a.childNodes.length; b++) if ("input" == a.childNodes[b].nodeName) {
                var c = new O().parse(a.childNodes[b]);
                this.input[c.semantic] = c;
            }
            return this;
        }, O.prototype.parse = function(a) {
            return this.semantic = a.getAttribute("semantic"), this.source = a.getAttribute("source").replace(/^#/, ""), 
            this.set = kb(a, "set", -1), this.offset = kb(a, "offset", 0), "TEXCOORD" == this.semantic && this.set < 0 && (this.set = 0), 
            this;
        }, P.prototype.parse = function(a) {
            this.id = a.getAttribute("id");
            for (var b = 0; b < a.childNodes.length; b++) {
                var c = a.childNodes[b];
                switch (c.nodeName) {
                  case "bool_array":
                    this.data = fb(c.textContent), this.type = c.nodeName;
                    break;

                  case "float_array":
                    this.data = gb(c.textContent), this.type = c.nodeName;
                    break;

                  case "int_array":
                    this.data = hb(c.textContent), this.type = c.nodeName;
                    break;

                  case "IDREF_array":
                  case "Name_array":
                    this.data = ib(c.textContent), this.type = c.nodeName;
                    break;

                  case "technique_common":
                    for (var d = 0; d < c.childNodes.length; d++) if ("accessor" == c.childNodes[d].nodeName) {
                        this.accessor = new M().parse(c.childNodes[d]);
                        break;
                    }
                }
            }
            return this;
        }, P.prototype.read = function() {
            var a = [], b = this.accessor.params[0];
            switch (b.type) {
              case "IDREF":
              case "Name":
              case "name":
              case "float":
                return this.data;

              case "float4x4":
                for (var c = 0; c < this.data.length; c += 16) {
                    var d = this.data.slice(c, c + 16), e = qb(d);
                    a.push(e);
                }
                break;

              default:
                console.log("ColladaLoader: Source: Read dont know how to read " + b.type + ".");
            }
            return a;
        }, Q.prototype.parse = function(a) {
            this.id = a.getAttribute("id"), this.name = a.getAttribute("name");
            for (var b = 0; b < a.childNodes.length; b++) if ("instance_effect" == a.childNodes[b].nodeName) {
                this.instance_effect = new W().parse(a.childNodes[b]);
                break;
            }
            return this;
        }, R.prototype.isColor = function() {
            return null == this.texture;
        }, R.prototype.isTexture = function() {
            return null != this.texture;
        }, R.prototype.parse = function(a) {
            for (var b = 0; b < a.childNodes.length; b++) {
                var c = a.childNodes[b];
                if (1 == c.nodeType) switch (c.nodeName) {
                  case "color":
                    var d = gb(c.textContent);
                    this.color = new v.Color(), this.color.setRGB(d[0], d[1], d[2]), this.color.a = d[3];
                    break;

                  case "texture":
                    this.texture = c.getAttribute("texture"), this.texcoord = c.getAttribute("texcoord"), 
                    this.texOpts = {
                        offsetU: 0,
                        offsetV: 0,
                        repeatU: 1,
                        repeatV: 1,
                        wrapU: 1,
                        wrapV: 1
                    }, this.parseTexture(c);
                }
            }
            return this;
        }, R.prototype.parseTexture = function(a) {
            if (!a.childNodes) return this;
            a.childNodes[1] && "extra" === a.childNodes[1].nodeName && (a = a.childNodes[1], 
            a.childNodes[1] && "technique" === a.childNodes[1].nodeName && (a = a.childNodes[1]));
            for (var b = 0; b < a.childNodes.length; b++) {
                var c = a.childNodes[b];
                switch (c.nodeName) {
                  case "offsetU":
                  case "offsetV":
                  case "repeatU":
                  case "repeatV":
                    this.texOpts[c.nodeName] = parseFloat(c.textContent);
                    break;

                  case "wrapU":
                  case "wrapV":
                    this.texOpts[c.nodeName] = parseInt(c.textContent);
                    break;

                  default:
                    this.texOpts[c.nodeName] = c.textContent;
                }
            }
            return this;
        }, S.prototype.parse = function(a) {
            for (var b = 0; b < a.childNodes.length; b++) {
                var c = a.childNodes[b];
                if (1 == c.nodeType) switch (c.nodeName) {
                  case "ambient":
                  case "emission":
                  case "diffuse":
                  case "specular":
                  case "transparent":
                    this[c.nodeName] = new R().parse(c);
                    break;

                  case "shininess":
                  case "reflectivity":
                  case "index_of_refraction":
                  case "transparency":
                    var d = lb(c, ".//dae:float");
                    d.length > 0 && (this[c.nodeName] = parseFloat(d[0].textContent));
                }
            }
            return this.create(), this;
        }, S.prototype.create = function() {
            var a = {}, b = void 0 !== this.transparency && this.transparency < 1;
            for (var c in this) switch (c) {
              case "ambient":
              case "emission":
              case "diffuse":
              case "specular":
                var d = this[c];
                if (d instanceof R) if (d.isTexture()) {
                    var e = d.texture, f = this.effect.sampler[e].source;
                    if (f) {
                        var g = this.effect.surface[f], h = Db[g.init_from];
                        if (h) {
                            var i = v.ImageUtils.loadTexture(wb + h.init_from);
                            i.wrapS = d.texOpts.wrapU ? v.RepeatWrapping : v.ClampToEdgeWrapping, i.wrapT = d.texOpts.wrapV ? v.RepeatWrapping : v.ClampToEdgeWrapping, 
                            i.offset.x = d.texOpts.offsetU, i.offset.y = d.texOpts.offsetV, i.repeat.x = d.texOpts.repeatU, 
                            i.repeat.y = d.texOpts.repeatV, a.map = i, "emission" === c && (a.emissive = 16777215);
                        }
                    }
                } else "diffuse" !== c && b || ("emission" === c ? a.emissive = d.color.getHex() : a[c] = d.color.getHex());
                break;

              case "shininess":
                a[c] = this[c];
                break;

              case "reflectivity":
                a[c] = this[c], a[c] > 0 && (a.envMap = Mb.defaultEnvMap), a.combine = v.MixOperation;
                break;

              case "index_of_refraction":
                a.refractionRatio = this[c], 1 !== this[c] && (a.envMap = Mb.defaultEnvMap);
                break;

              case "transparency":
                b && (a.transparent = !0, a.opacity = this[c], b = !0);
            }
            switch (a.shading = Lb, a.side = this.effect.doubleSided ? v.DoubleSide : v.FrontSide, 
            this.type) {
              case "constant":
                void 0 != a.emissive && (a.color = a.emissive), this.material = new v.MeshBasicMaterial(a);
                break;

              case "phong":
              case "blinn":
                void 0 != a.diffuse && (a.color = a.diffuse), this.material = new v.MeshPhongMaterial(a);
                break;

              case "lambert":
              default:
                void 0 != a.diffuse && (a.color = a.diffuse), this.material = new v.MeshLambertMaterial(a);
            }
            return this.material;
        }, T.prototype.parse = function(a) {
            for (var b = 0; b < a.childNodes.length; b++) {
                var c = a.childNodes[b];
                if (1 == c.nodeType) switch (c.nodeName) {
                  case "init_from":
                    this.init_from = c.textContent;
                    break;

                  case "format":
                    this.format = c.textContent;
                    break;

                  default:
                    console.log("unhandled Surface prop: " + c.nodeName);
                }
            }
            return this;
        }, U.prototype.parse = function(a) {
            for (var b = 0; b < a.childNodes.length; b++) {
                var c = a.childNodes[b];
                if (1 == c.nodeType) switch (c.nodeName) {
                  case "source":
                    this.source = c.textContent;
                    break;

                  case "minfilter":
                    this.minfilter = c.textContent;
                    break;

                  case "magfilter":
                    this.magfilter = c.textContent;
                    break;

                  case "mipfilter":
                    this.mipfilter = c.textContent;
                    break;

                  case "wrap_s":
                    this.wrap_s = c.textContent;
                    break;

                  case "wrap_t":
                    this.wrap_t = c.textContent;
                    break;

                  default:
                    console.log("unhandled Sampler2D prop: " + c.nodeName);
                }
            }
            return this;
        }, V.prototype.create = function() {
            return null == this.shader ? null : void 0;
        }, V.prototype.parse = function(a) {
            this.id = a.getAttribute("id"), this.name = a.getAttribute("name"), mb(this, a), 
            this.shader = null;
            for (var b = 0; b < a.childNodes.length; b++) {
                var c = a.childNodes[b];
                if (1 == c.nodeType) switch (c.nodeName) {
                  case "profile_COMMON":
                    this.parseTechnique(this.parseProfileCOMMON(c));
                }
            }
            return this;
        }, V.prototype.parseNewparam = function(a) {
            for (var b = a.getAttribute("sid"), c = 0; c < a.childNodes.length; c++) {
                var d = a.childNodes[c];
                if (1 == d.nodeType) switch (d.nodeName) {
                  case "surface":
                    this.surface[b] = new T(this).parse(d);
                    break;

                  case "sampler2D":
                    this.sampler[b] = new U(this).parse(d);
                    break;

                  case "extra":
                    break;

                  default:
                    console.log(d.nodeName);
                }
            }
        }, V.prototype.parseProfileCOMMON = function(a) {
            for (var b, c = 0; c < a.childNodes.length; c++) {
                var d = a.childNodes[c];
                if (1 == d.nodeType) switch (d.nodeName) {
                  case "profile_COMMON":
                    this.parseProfileCOMMON(d);
                    break;

                  case "technique":
                    b = d;
                    break;

                  case "newparam":
                    this.parseNewparam(d);
                    break;

                  case "image":
                    var e = new x().parse(d);
                    Db[e.id] = e;
                    break;

                  case "extra":
                    break;

                  default:
                    console.log(d.nodeName);
                }
            }
            return b;
        }, V.prototype.parseTechnique = function(a) {
            for (var b = 0; b < a.childNodes.length; b++) {
                var c = a.childNodes[b];
                if (1 == c.nodeType) switch (c.nodeName) {
                  case "constant":
                  case "lambert":
                  case "blinn":
                  case "phong":
                    this.shader = new S(c.nodeName, this).parse(c);
                }
            }
        }, W.prototype.parse = function(a) {
            return this.url = a.getAttribute("url").replace(/^#/, ""), this;
        }, X.prototype.parse = function(a) {
            this.id = a.getAttribute("id"), this.name = a.getAttribute("name"), this.source = {};
            for (var b = 0; b < a.childNodes.length; b++) {
                var c = a.childNodes[b];
                if (1 == c.nodeType) switch (c.nodeName) {
                  case "animation":
                    var d = new X().parse(c);
                    for (var e in d.source) this.source[e] = d.source[e];
                    for (var f = 0; f < d.channel.length; f++) this.channel.push(d.channel[f]), this.sampler.push(d.sampler[f]);
                    break;

                  case "source":
                    var e = new P().parse(c);
                    this.source[e.id] = e;
                    break;

                  case "sampler":
                    this.sampler.push(new Z(this).parse(c));
                    break;

                  case "channel":
                    this.channel.push(new Y(this).parse(c));
                }
            }
            return this;
        }, Y.prototype.parse = function(a) {
            this.source = a.getAttribute("source").replace(/^#/, ""), this.target = a.getAttribute("target");
            var b = this.target.split("/");
            b.shift();
            var c = b.shift(), d = c.indexOf(".") >= 0, e = c.indexOf("(") >= 0;
            if (d) b = c.split("."), this.sid = b.shift(), this.member = b.shift(); else if (e) {
                var f = c.split("(");
                this.sid = f.shift();
                for (var g = 0; g < f.length; g++) f[g] = parseInt(f[g].replace(/\)/, ""));
                this.arrIndices = f;
            } else this.sid = c;
            return this.fullSid = c, this.dotSyntax = d, this.arrSyntax = e, this;
        }, Z.prototype.parse = function(a) {
            this.id = a.getAttribute("id"), this.inputs = [];
            for (var b = 0; b < a.childNodes.length; b++) {
                var c = a.childNodes[b];
                if (1 == c.nodeType) switch (c.nodeName) {
                  case "input":
                    this.inputs.push(new O().parse(c));
                }
            }
            return this;
        }, Z.prototype.create = function() {
            for (var a = 0; a < this.inputs.length; a++) {
                var b = this.inputs[a], c = this.animation.source[b.source];
                switch (b.semantic) {
                  case "INPUT":
                    this.input = c.read();
                    break;

                  case "OUTPUT":
                    this.output = c.read(), this.strideOut = c.accessor.stride;
                    break;

                  case "INTERPOLATION":
                    this.interpolation = c.read();
                    break;

                  case "IN_TANGENT":
                    break;

                  case "OUT_TANGENT":
                    break;

                  default:
                    console.log(b.semantic);
                }
            }
            if (this.startTime = 0, this.endTime = 0, this.duration = 0, this.input.length) {
                this.startTime = 1e8, this.endTime = -1e8;
                for (var a = 0; a < this.input.length; a++) this.startTime = Math.min(this.startTime, this.input[a]), 
                this.endTime = Math.max(this.endTime, this.input[a]);
                this.duration = this.endTime - this.startTime;
            }
        }, Z.prototype.getData = function(a, b) {
            var c;
            if ("matrix" === a && 16 === this.strideOut) c = this.output[b]; else if (this.strideOut > 1) {
                c = [], b *= this.strideOut;
                for (var d = 0; d < this.strideOut; ++d) c[d] = this.output[b + d];
                if (3 === this.strideOut) switch (a) {
                  case "rotate":
                  case "translate":
                    ob(c, -1);
                    break;

                  case "scale":
                    ob(c, 1);
                } else 4 === this.strideOut && "matrix" === a && ob(c, -1);
            } else c = this.output[b];
            return c;
        }, $.prototype.addTarget = function(a, b, c, d) {
            this.targets.push({
                sid: a,
                member: c,
                transform: b,
                data: d
            });
        }, $.prototype.apply = function(a) {
            for (var b = 0; b < this.targets.length; ++b) {
                var c = this.targets[b];
                a && c.sid !== a || c.transform.update(c.data, c.member);
            }
        }, $.prototype.getTarget = function(a) {
            for (var b = 0; b < this.targets.length; ++b) if (this.targets[b].sid === a) return this.targets[b];
            return null;
        }, $.prototype.hasTarget = function(a) {
            for (var b = 0; b < this.targets.length; ++b) if (this.targets[b].sid === a) return !0;
            return !1;
        }, $.prototype.interpolate = function(a, b) {
            for (var c = 0; c < this.targets.length; ++c) {
                var d, e = this.targets[c], f = a.getTarget(e.sid);
                if ("matrix" !== e.transform.type && f) {
                    var g = (b - this.time) / (a.time - this.time), h = f.data, i = e.data;
                    if ((0 > g || g > 1) && (console.log("Key.interpolate: Warning! Scale out of bounds:" + g), 
                    g = 0 > g ? 0 : 1), i.length) {
                        d = [];
                        for (var j = 0; j < i.length; ++j) d[j] = i[j] + (h[j] - i[j]) * g;
                    } else d = i + (h - i) * g;
                } else d = e.data;
                e.transform.update(d, e.member);
            }
        }, _.prototype.parse = function(a) {
            this.id = a.getAttribute("id"), this.name = a.getAttribute("name");
            for (var b = 0; b < a.childNodes.length; b++) {
                var c = a.childNodes[b];
                if (1 == c.nodeType) switch (c.nodeName) {
                  case "optics":
                    this.parseOptics(c);
                }
            }
            return this;
        }, _.prototype.parseOptics = function(a) {
            for (var b = 0; b < a.childNodes.length; b++) if ("technique_common" == a.childNodes[b].nodeName) for (var c = a.childNodes[b], d = 0; d < c.childNodes.length; d++) if (this.technique = c.childNodes[d].nodeName, 
            "perspective" == this.technique) for (var e = c.childNodes[d], f = 0; f < e.childNodes.length; f++) {
                var g = e.childNodes[f];
                switch (g.nodeName) {
                  case "yfov":
                    this.yfov = g.textContent;
                    break;

                  case "xfov":
                    this.xfov = g.textContent;
                    break;

                  case "znear":
                    this.znear = g.textContent;
                    break;

                  case "zfar":
                    this.zfar = g.textContent;
                    break;

                  case "aspect_ratio":
                    this.aspect_ratio = g.textContent;
                }
            } else if ("orthographic" == this.technique) for (var h = c.childNodes[d], f = 0; f < h.childNodes.length; f++) {
                var g = h.childNodes[f];
                switch (g.nodeName) {
                  case "xmag":
                    this.xmag = g.textContent;
                    break;

                  case "ymag":
                    this.ymag = g.textContent;
                    break;

                  case "znear":
                    this.znear = g.textContent;
                    break;

                  case "zfar":
                    this.zfar = g.textContent;
                    break;

                  case "aspect_ratio":
                    this.aspect_ratio = g.textContent;
                }
            }
            return this;
        }, ab.prototype.parse = function(a) {
            return this.url = a.getAttribute("url").replace(/^#/, ""), this;
        }, bb.prototype.parse = function(a) {
            this.id = a.getAttribute("id"), this.name = a.getAttribute("name");
            for (var b = 0; b < a.childNodes.length; b++) {
                var c = a.childNodes[b];
                if (1 == c.nodeType) switch (c.nodeName) {
                  case "technique_common":
                    this.parseTechnique(c);
                }
            }
            return this;
        }, bb.prototype.parseTechnique = function(a) {
            for (var b = 0; b < a.childNodes.length; b++) {
                var c = a.childNodes[b];
                switch (c.nodeName) {
                  case "ambient":
                  case "point":
                  case "directional":
                    this.technique = c.nodeName;
                    for (var d = 0; d < c.childNodes.length; d++) {
                        var e = c.childNodes[d];
                        switch (e.nodeName) {
                          case "color":
                            var f = new v.Vector3().fromArray(gb(e.textContent));
                            this.color = new v.Color().setRGB(f.x, f.y, f.z);
                        }
                    }
                }
            }
        }, cb.prototype.parse = function(a) {
            return this.url = a.getAttribute("url").replace(/^#/, ""), this;
        }, {
            load: a,
            parse: b,
            setPreferredShading: c,
            applySkin: m,
            geometries: Gb,
            options: Mb
        };
    }, !function() {
        var a = this, b = a._, c = {}, d = Array.prototype, e = Object.prototype, f = Function.prototype, g = d.push, h = d.slice, i = d.concat, j = e.toString, k = e.hasOwnProperty, l = d.forEach, m = d.map, n = d.reduce, o = d.reduceRight, p = d.filter, q = d.every, r = d.some, s = d.indexOf, t = d.lastIndexOf, u = Array.isArray, v = Object.keys, w = f.bind, x = function(a) {
            return a instanceof x ? a : this instanceof x ? (this._wrapped = a, void 0) : new x(a);
        };
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = x), 
        exports._ = x) : a._ = x, x.VERSION = "1.5.1";
        var y = x.each = x.forEach = function(a, b, d) {
            if (null != a) if (l && a.forEach === l) a.forEach(b, d); else if (a.length === +a.length) {
                for (var e = 0, f = a.length; f > e; e++) if (b.call(d, a[e], e, a) === c) return;
            } else for (var g in a) if (x.has(a, g) && b.call(d, a[g], g, a) === c) return;
        };
        x.map = x.collect = function(a, b, c) {
            var d = [];
            return null == a ? d : m && a.map === m ? a.map(b, c) : (y(a, function(a, e, f) {
                d.push(b.call(c, a, e, f));
            }), d);
        };
        var z = "Reduce of empty array with no initial value";
        x.reduce = x.foldl = x.inject = function(a, b, c, d) {
            var e = arguments.length > 2;
            if (null == a && (a = []), n && a.reduce === n) return d && (b = x.bind(b, d)), 
            e ? a.reduce(b, c) : a.reduce(b);
            if (y(a, function(a, f, g) {
                e ? c = b.call(d, c, a, f, g) : (c = a, e = !0);
            }), !e) throw new TypeError(z);
            return c;
        }, x.reduceRight = x.foldr = function(a, b, c, d) {
            var e = arguments.length > 2;
            if (null == a && (a = []), o && a.reduceRight === o) return d && (b = x.bind(b, d)), 
            e ? a.reduceRight(b, c) : a.reduceRight(b);
            var f = a.length;
            if (f !== +f) {
                var g = x.keys(a);
                f = g.length;
            }
            if (y(a, function(h, i, j) {
                i = g ? g[--f] : --f, e ? c = b.call(d, c, a[i], i, j) : (c = a[i], e = !0);
            }), !e) throw new TypeError(z);
            return c;
        }, x.find = x.detect = function(a, b, c) {
            var d;
            return A(a, function(a, e, f) {
                return b.call(c, a, e, f) ? (d = a, !0) : void 0;
            }), d;
        }, x.filter = x.select = function(a, b, c) {
            var d = [];
            return null == a ? d : p && a.filter === p ? a.filter(b, c) : (y(a, function(a, e, f) {
                b.call(c, a, e, f) && d.push(a);
            }), d);
        }, x.reject = function(a, b, c) {
            return x.filter(a, function(a, d, e) {
                return !b.call(c, a, d, e);
            }, c);
        }, x.every = x.all = function(a, b, d) {
            b || (b = x.identity);
            var e = !0;
            return null == a ? e : q && a.every === q ? a.every(b, d) : (y(a, function(a, f, g) {
                return (e = e && b.call(d, a, f, g)) ? void 0 : c;
            }), !!e);
        };
        var A = x.some = x.any = function(a, b, d) {
            b || (b = x.identity);
            var e = !1;
            return null == a ? e : r && a.some === r ? a.some(b, d) : (y(a, function(a, f, g) {
                return e || (e = b.call(d, a, f, g)) ? c : void 0;
            }), !!e);
        };
        x.contains = x.include = function(a, b) {
            return null == a ? !1 : s && a.indexOf === s ? -1 != a.indexOf(b) : A(a, function(a) {
                return a === b;
            });
        }, x.invoke = function(a, b) {
            var c = h.call(arguments, 2), d = x.isFunction(b);
            return x.map(a, function(a) {
                return (d ? b : a[b]).apply(a, c);
            });
        }, x.pluck = function(a, b) {
            return x.map(a, function(a) {
                return a[b];
            });
        }, x.where = function(a, b, c) {
            return x.isEmpty(b) ? c ? void 0 : [] : x[c ? "find" : "filter"](a, function(a) {
                for (var c in b) if (b[c] !== a[c]) return !1;
                return !0;
            });
        }, x.findWhere = function(a, b) {
            return x.where(a, b, !0);
        }, x.max = function(a, b, c) {
            if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535) return Math.max.apply(Math, a);
            if (!b && x.isEmpty(a)) return -1 / 0;
            var d = {
                computed: -1 / 0,
                value: -1 / 0
            };
            return y(a, function(a, e, f) {
                var g = b ? b.call(c, a, e, f) : a;
                g > d.computed && (d = {
                    value: a,
                    computed: g
                });
            }), d.value;
        }, x.min = function(a, b, c) {
            if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535) return Math.min.apply(Math, a);
            if (!b && x.isEmpty(a)) return 1 / 0;
            var d = {
                computed: 1 / 0,
                value: 1 / 0
            };
            return y(a, function(a, e, f) {
                var g = b ? b.call(c, a, e, f) : a;
                g < d.computed && (d = {
                    value: a,
                    computed: g
                });
            }), d.value;
        }, x.shuffle = function(a) {
            var b, c = 0, d = [];
            return y(a, function(a) {
                b = x.random(c++), d[c - 1] = d[b], d[b] = a;
            }), d;
        };
        var B = function(a) {
            return x.isFunction(a) ? a : function(b) {
                return b[a];
            };
        };
        x.sortBy = function(a, b, c) {
            var d = B(b);
            return x.pluck(x.map(a, function(a, b, e) {
                return {
                    value: a,
                    index: b,
                    criteria: d.call(c, a, b, e)
                };
            }).sort(function(a, b) {
                var c = a.criteria, d = b.criteria;
                if (c !== d) {
                    if (c > d || void 0 === c) return 1;
                    if (d > c || void 0 === d) return -1;
                }
                return a.index < b.index ? -1 : 1;
            }), "value");
        };
        var C = function(a, b, c, d) {
            var e = {}, f = B(null == b ? x.identity : b);
            return y(a, function(b, g) {
                var h = f.call(c, b, g, a);
                d(e, h, b);
            }), e;
        };
        x.groupBy = function(a, b, c) {
            return C(a, b, c, function(a, b, c) {
                (x.has(a, b) ? a[b] : a[b] = []).push(c);
            });
        }, x.countBy = function(a, b, c) {
            return C(a, b, c, function(a, b) {
                x.has(a, b) || (a[b] = 0), a[b]++;
            });
        }, x.sortedIndex = function(a, b, c, d) {
            c = null == c ? x.identity : B(c);
            for (var e = c.call(d, b), f = 0, g = a.length; g > f; ) {
                var h = f + g >>> 1;
                c.call(d, a[h]) < e ? f = h + 1 : g = h;
            }
            return f;
        }, x.toArray = function(a) {
            return a ? x.isArray(a) ? h.call(a) : a.length === +a.length ? x.map(a, x.identity) : x.values(a) : [];
        }, x.size = function(a) {
            return null == a ? 0 : a.length === +a.length ? a.length : x.keys(a).length;
        }, x.first = x.head = x.take = function(a, b, c) {
            return null == a ? void 0 : null == b || c ? a[0] : h.call(a, 0, b);
        }, x.initial = function(a, b, c) {
            return h.call(a, 0, a.length - (null == b || c ? 1 : b));
        }, x.last = function(a, b, c) {
            return null == a ? void 0 : null == b || c ? a[a.length - 1] : h.call(a, Math.max(a.length - b, 0));
        }, x.rest = x.tail = x.drop = function(a, b, c) {
            return h.call(a, null == b || c ? 1 : b);
        }, x.compact = function(a) {
            return x.filter(a, x.identity);
        };
        var D = function(a, b, c) {
            return b && x.every(a, x.isArray) ? i.apply(c, a) : (y(a, function(a) {
                x.isArray(a) || x.isArguments(a) ? b ? g.apply(c, a) : D(a, b, c) : c.push(a);
            }), c);
        };
        x.flatten = function(a, b) {
            return D(a, b, []);
        }, x.without = function(a) {
            return x.difference(a, h.call(arguments, 1));
        }, x.uniq = x.unique = function(a, b, c, d) {
            x.isFunction(b) && (d = c, c = b, b = !1);
            var e = c ? x.map(a, c, d) : a, f = [], g = [];
            return y(e, function(c, d) {
                (b ? d && g[g.length - 1] === c : x.contains(g, c)) || (g.push(c), f.push(a[d]));
            }), f;
        }, x.union = function() {
            return x.uniq(x.flatten(arguments, !0));
        }, x.intersection = function(a) {
            var b = h.call(arguments, 1);
            return x.filter(x.uniq(a), function(a) {
                return x.every(b, function(b) {
                    return x.indexOf(b, a) >= 0;
                });
            });
        }, x.difference = function(a) {
            var b = i.apply(d, h.call(arguments, 1));
            return x.filter(a, function(a) {
                return !x.contains(b, a);
            });
        }, x.zip = function() {
            for (var a = x.max(x.pluck(arguments, "length").concat(0)), b = new Array(a), c = 0; a > c; c++) b[c] = x.pluck(arguments, "" + c);
            return b;
        }, x.object = function(a, b) {
            if (null == a) return {};
            for (var c = {}, d = 0, e = a.length; e > d; d++) b ? c[a[d]] = b[d] : c[a[d][0]] = a[d][1];
            return c;
        }, x.indexOf = function(a, b, c) {
            if (null == a) return -1;
            var d = 0, e = a.length;
            if (c) {
                if ("number" != typeof c) return d = x.sortedIndex(a, b), a[d] === b ? d : -1;
                d = 0 > c ? Math.max(0, e + c) : c;
            }
            if (s && a.indexOf === s) return a.indexOf(b, c);
            for (;e > d; d++) if (a[d] === b) return d;
            return -1;
        }, x.lastIndexOf = function(a, b, c) {
            if (null == a) return -1;
            var d = null != c;
            if (t && a.lastIndexOf === t) return d ? a.lastIndexOf(b, c) : a.lastIndexOf(b);
            for (var e = d ? c : a.length; e--; ) if (a[e] === b) return e;
            return -1;
        }, x.range = function(a, b, c) {
            arguments.length <= 1 && (b = a || 0, a = 0), c = arguments[2] || 1;
            for (var d = Math.max(Math.ceil((b - a) / c), 0), e = 0, f = new Array(d); d > e; ) f[e++] = a, 
            a += c;
            return f;
        };
        var E = function() {};
        x.bind = function(a, b) {
            var c, d;
            if (w && a.bind === w) return w.apply(a, h.call(arguments, 1));
            if (!x.isFunction(a)) throw new TypeError();
            return c = h.call(arguments, 2), d = function() {
                if (!(this instanceof d)) return a.apply(b, c.concat(h.call(arguments)));
                E.prototype = a.prototype;
                var e = new E();
                E.prototype = null;
                var f = a.apply(e, c.concat(h.call(arguments)));
                return Object(f) === f ? f : e;
            };
        }, x.partial = function(a) {
            var b = h.call(arguments, 1);
            return function() {
                return a.apply(this, b.concat(h.call(arguments)));
            };
        }, x.bindAll = function(a) {
            var b = h.call(arguments, 1);
            if (0 === b.length) throw new Error("bindAll must be passed function names");
            return y(b, function(b) {
                a[b] = x.bind(a[b], a);
            }), a;
        }, x.memoize = function(a, b) {
            var c = {};
            return b || (b = x.identity), function() {
                var d = b.apply(this, arguments);
                return x.has(c, d) ? c[d] : c[d] = a.apply(this, arguments);
            };
        }, x.delay = function(a, b) {
            var c = h.call(arguments, 2);
            return setTimeout(function() {
                return a.apply(null, c);
            }, b);
        }, x.defer = function(a) {
            return x.delay.apply(x, [ a, 1 ].concat(h.call(arguments, 1)));
        }, x.throttle = function(a, b, c) {
            var d, e, f, g = null, h = 0;
            c || (c = {});
            var i = function() {
                h = c.leading === !1 ? 0 : new Date(), g = null, f = a.apply(d, e);
            };
            return function() {
                var j = new Date();
                h || c.leading !== !1 || (h = j);
                var k = b - (j - h);
                return d = this, e = arguments, 0 >= k ? (clearTimeout(g), g = null, h = j, f = a.apply(d, e)) : g || c.trailing === !1 || (g = setTimeout(i, k)), 
                f;
            };
        }, x.debounce = function(a, b, c) {
            var d, e = null;
            return function() {
                var f = this, g = arguments, h = function() {
                    e = null, c || (d = a.apply(f, g));
                }, i = c && !e;
                return clearTimeout(e), e = setTimeout(h, b), i && (d = a.apply(f, g)), d;
            };
        }, x.once = function(a) {
            var b, c = !1;
            return function() {
                return c ? b : (c = !0, b = a.apply(this, arguments), a = null, b);
            };
        }, x.wrap = function(a, b) {
            return function() {
                var c = [ a ];
                return g.apply(c, arguments), b.apply(this, c);
            };
        }, x.compose = function() {
            var a = arguments;
            return function() {
                for (var b = arguments, c = a.length - 1; c >= 0; c--) b = [ a[c].apply(this, b) ];
                return b[0];
            };
        }, x.after = function(a, b) {
            return function() {
                return --a < 1 ? b.apply(this, arguments) : void 0;
            };
        }, x.keys = v || function(a) {
            if (a !== Object(a)) throw new TypeError("Invalid object");
            var b = [];
            for (var c in a) x.has(a, c) && b.push(c);
            return b;
        }, x.values = function(a) {
            var b = [];
            for (var c in a) x.has(a, c) && b.push(a[c]);
            return b;
        }, x.pairs = function(a) {
            var b = [];
            for (var c in a) x.has(a, c) && b.push([ c, a[c] ]);
            return b;
        }, x.invert = function(a) {
            var b = {};
            for (var c in a) x.has(a, c) && (b[a[c]] = c);
            return b;
        }, x.functions = x.methods = function(a) {
            var b = [];
            for (var c in a) x.isFunction(a[c]) && b.push(c);
            return b.sort();
        }, x.extend = function(a) {
            return y(h.call(arguments, 1), function(b) {
                if (b) for (var c in b) a[c] = b[c];
            }), a;
        }, x.pick = function(a) {
            var b = {}, c = i.apply(d, h.call(arguments, 1));
            return y(c, function(c) {
                c in a && (b[c] = a[c]);
            }), b;
        }, x.omit = function(a) {
            var b = {}, c = i.apply(d, h.call(arguments, 1));
            for (var e in a) x.contains(c, e) || (b[e] = a[e]);
            return b;
        }, x.defaults = function(a) {
            return y(h.call(arguments, 1), function(b) {
                if (b) for (var c in b) void 0 === a[c] && (a[c] = b[c]);
            }), a;
        }, x.clone = function(a) {
            return x.isObject(a) ? x.isArray(a) ? a.slice() : x.extend({}, a) : a;
        }, x.tap = function(a, b) {
            return b(a), a;
        };
        var F = function(a, b, c, d) {
            if (a === b) return 0 !== a || 1 / a == 1 / b;
            if (null == a || null == b) return a === b;
            a instanceof x && (a = a._wrapped), b instanceof x && (b = b._wrapped);
            var e = j.call(a);
            if (e != j.call(b)) return !1;
            switch (e) {
              case "[object String]":
                return a == String(b);

              case "[object Number]":
                return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;

              case "[object Date]":
              case "[object Boolean]":
                return +a == +b;

              case "[object RegExp]":
                return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
            }
            if ("object" != typeof a || "object" != typeof b) return !1;
            for (var f = c.length; f--; ) if (c[f] == a) return d[f] == b;
            var g = a.constructor, h = b.constructor;
            if (g !== h && !(x.isFunction(g) && g instanceof g && x.isFunction(h) && h instanceof h)) return !1;
            c.push(a), d.push(b);
            var i = 0, k = !0;
            if ("[object Array]" == e) {
                if (i = a.length, k = i == b.length) for (;i-- && (k = F(a[i], b[i], c, d)); ) ;
            } else {
                for (var l in a) if (x.has(a, l) && (i++, !(k = x.has(b, l) && F(a[l], b[l], c, d)))) break;
                if (k) {
                    for (l in b) if (x.has(b, l) && !i--) break;
                    k = !i;
                }
            }
            return c.pop(), d.pop(), k;
        };
        x.isEqual = function(a, b) {
            return F(a, b, [], []);
        }, x.isEmpty = function(a) {
            if (null == a) return !0;
            if (x.isArray(a) || x.isString(a)) return 0 === a.length;
            for (var b in a) if (x.has(a, b)) return !1;
            return !0;
        }, x.isElement = function(a) {
            return !(!a || 1 !== a.nodeType);
        }, x.isArray = u || function(a) {
            return "[object Array]" == j.call(a);
        }, x.isObject = function(a) {
            return a === Object(a);
        }, y([ "Arguments", "Function", "String", "Number", "Date", "RegExp" ], function(a) {
            x["is" + a] = function(b) {
                return j.call(b) == "[object " + a + "]";
            };
        }), x.isArguments(arguments) || (x.isArguments = function(a) {
            return !(!a || !x.has(a, "callee"));
        }), "function" != typeof /./ && (x.isFunction = function(a) {
            return "function" == typeof a;
        }), x.isFinite = function(a) {
            return isFinite(a) && !isNaN(parseFloat(a));
        }, x.isNaN = function(a) {
            return x.isNumber(a) && a != +a;
        }, x.isBoolean = function(a) {
            return a === !0 || a === !1 || "[object Boolean]" == j.call(a);
        }, x.isNull = function(a) {
            return null === a;
        }, x.isUndefined = function(a) {
            return void 0 === a;
        }, x.has = function(a, b) {
            return k.call(a, b);
        }, x.noConflict = function() {
            return a._ = b, this;
        }, x.identity = function(a) {
            return a;
        }, x.times = function(a, b, c) {
            for (var d = Array(Math.max(0, a)), e = 0; a > e; e++) d[e] = b.call(c, e);
            return d;
        }, x.random = function(a, b) {
            return null == b && (b = a, a = 0), a + Math.floor(Math.random() * (b - a + 1));
        };
        var G = {
            escape: {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "/": "&#x2F;"
            }
        };
        G.unescape = x.invert(G.escape);
        var H = {
            escape: new RegExp("[" + x.keys(G.escape).join("") + "]", "g"),
            unescape: new RegExp("(" + x.keys(G.unescape).join("|") + ")", "g")
        };
        x.each([ "escape", "unescape" ], function(a) {
            x[a] = function(b) {
                return null == b ? "" : ("" + b).replace(H[a], function(b) {
                    return G[a][b];
                });
            };
        }), x.result = function(a, b) {
            if (null == a) return void 0;
            var c = a[b];
            return x.isFunction(c) ? c.call(a) : c;
        }, x.mixin = function(a) {
            y(x.functions(a), function(b) {
                var c = x[b] = a[b];
                x.prototype[b] = function() {
                    var a = [ this._wrapped ];
                    return g.apply(a, arguments), M.call(this, c.apply(x, a));
                };
            });
        };
        var I = 0;
        x.uniqueId = function(a) {
            var b = ++I + "";
            return a ? a + b : b;
        }, x.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var J = /(.)^/, K = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "	": "t",
            "\u2028": "u2028",
            "\u2029": "u2029"
        }, L = /\\|'|\r|\n|\t|\u2028|\u2029/g;
        x.template = function(a, b, c) {
            var d;
            c = x.defaults({}, c, x.templateSettings);
            var e = new RegExp([ (c.escape || J).source, (c.interpolate || J).source, (c.evaluate || J).source ].join("|") + "|$", "g"), f = 0, g = "__p+='";
            a.replace(e, function(b, c, d, e, h) {
                return g += a.slice(f, h).replace(L, function(a) {
                    return "\\" + K[a];
                }), c && (g += "'+\n((__t=(" + c + "))==null?'':_.escape(__t))+\n'"), d && (g += "'+\n((__t=(" + d + "))==null?'':__t)+\n'"), 
                e && (g += "';\n" + e + "\n__p+='"), f = h + b.length, b;
            }), g += "';\n", c.variable || (g = "with(obj||{}){\n" + g + "}\n"), g = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + g + "return __p;\n";
            try {
                d = new Function(c.variable || "obj", "_", g);
            } catch (h) {
                throw h.source = g, h;
            }
            if (b) return d(b, x);
            var i = function(a) {
                return d.call(this, a, x);
            };
            return i.source = "function(" + (c.variable || "obj") + "){\n" + g + "}", i;
        }, x.chain = function(a) {
            return x(a).chain();
        };
        var M = function(a) {
            return this._chain ? x(a).chain() : a;
        };
        x.mixin(x), y([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(a) {
            var b = d[a];
            x.prototype[a] = function() {
                var c = this._wrapped;
                return b.apply(c, arguments), "shift" != a && "splice" != a || 0 !== c.length || delete c[0], 
                M.call(this, c);
            };
        }), y([ "concat", "join", "slice" ], function(a) {
            var b = d[a];
            x.prototype[a] = function() {
                return M.call(this, b.apply(this._wrapped, arguments));
            };
        }), x.extend(x.prototype, {
            chain: function() {
                return this._chain = !0, this;
            },
            value: function() {
                return this._wrapped;
            }
        });
    }.call(this);
    var w = {};
    w.noop = function() {}, w.extend = function(a, b) {
        var c, d = this;
        c = a && _.has(a, "constructor") ? a.constructor : function() {
            return d.apply(this, arguments);
        }, _.extend(c, d, b);
        var e = function() {
            this.constructor = c;
        };
        return e.prototype = d.prototype, c.prototype = new e(), a && _.extend(c.prototype, a), 
        c.__super__ = d.prototype, c;
    };
    var x = {
        resolutionScaling: 1,
        keyMap: {
            tab: 9
        },
        keyMapPreventDefaults: [ "tab" ],
        controls: {
            UP: "r",
            DOWN: "f",
            LEFT: "a",
            RIGHT: "d",
            ROLL_LEFT: "q",
            ROLL_RIGHT: "e",
            FORWARD: "w",
            BACKWARD: "s",
            TARGET: "t",
            CHAT: "y",
            TEAM_CHAT: "u"
        },
        automaticShipDeceleration: !0,
        maxPlayers: 10,
        layerManager: {
            layers: {
                background: {
                    updatePosition: !1,
                    updateRotation: !0
                },
                middleground: {
                    updatePosition: !0,
                    updateRotation: !0
                },
                foreground: {
                    updatePosition: !0,
                    updateRotation: !0
                }
            },
            layerOrder: [ "background", "middleground", "foreground" ],
            fov: 75,
            far: 5e4
        },
        assetLoader: {
            models: [ "../../res/models/rocket.dae" ],
            textures: [ "../../res/textures/universe_sml_darker.jpg", "../../res/textures/universe.jpg", "../../res/textures/universe4.jpg", "../../res/textures/universe4_lrg.jpg", "../../res/textures/universe4_sml.jpg", "../../res/textures/booster.jpg", "../../res/textures/jupiter.jpg", "../../res/textures/io.jpg", "../../res/textures/europa.jpg", "../../res/textures/sun.jpg", "../../res/textures/atmosphere1.jpg", "../../res/textures/smokeparticle.png", "../../res/textures/star.png", "../../res/textures/plasmaBullet.png", "../../res/textures/plasmaBullet.jpg", "../../res/textures/lensflares/lensflare0.png", "../../res/textures/lensflares/lensflare1.png", "../../res/textures/lensflares/lensflare2.png", "../../res/textures/lensflares/lensflare3.png" ],
            parent: document.body
        },
        layers: {
            background: {
                starfield: {
                    stars: 2e3,
                    width: 4096,
                    height: 4096,
                    depth: 4096,
                    color: 16777215,
                    size: 20,
                    minDistance: 50,
                    texture: "../../res/textures/star.png"
                },
                planet: {
                    position: new v.Vector3(0, 0, -600),
                    scale: .005,
                    planetTexture: "../../res/textures/jupiter.jpg",
                    atmosphereTexture: "../../res/textures/atmosphere1.jpg",
                    smallMoonTexture: "../../res/textures/io.jpg",
                    largeMoonTexture: "../../res/textures/europa.jpg"
                },
                skybox: {
                    radius: 4096,
                    segmentsWidth: 32,
                    segmentsHeight: 32,
                    texture: "../../res/textures/universe_sml_darker.jpg"
                },
                sun: {
                    position: new v.Vector3(-2e3, 0, 0),
                    sunTexture: "../../res/textures/sun.jpg",
                    flare0Texture: "../../res/textures/lensflares/lensflare0.png",
                    flare1Texture: "../../res/textures/lensflares/lensflare1.png",
                    flare2Texture: "../../res/textures/lensflares/lensflare2.png",
                    flare3Texture: "../../res/textures/lensflares/lensflare3.png"
                }
            },
            middleground: {
                starfield: {
                    stars: 2e5,
                    size: 50,
                    texture: "../../res/textures/star.png"
                }
            }
        },
        particleGroups: {
            engines: {
                maxAge: 3,
                colorStart: new v.Color("white"),
                colorEnd: new v.Color("blue"),
                opacityStart: 1,
                opacityEnd: 0,
                texture: "../../res/textures/smokeparticle.png"
            },
            rockets: {
                maxAge: 1,
                colorStart: new v.Color("white"),
                colorEnd: new v.Color("green"),
                opacityStart: 1,
                opacityEnd: 0,
                texture: "../../res/textures/smokeparticle.png"
            },
            rocketExplosions: {
                maxAge: 2,
                colorStart: new v.Color("red"),
                colorEnd: new v.Color("yellow"),
                opacityStart: 1,
                opacityEnd: 0,
                texture: "../../res/textures/smokeparticle.png",
                usePerspective: 0
            }
        },
        particleEmitters: {
            engines: {
                type: "cube",
                particlesPerSecond: 100,
                size: 20,
                sizeSpread: 10,
                sizeEnd: 20
            },
            rockets: {
                particlesPerSecond: 50,
                accelerationSpread: new v.Vector3(20, 20, 20),
                sizeSpread: 8,
                alive: 0
            },
            rocketExplosions: {
                radius: 1,
                speed: 250,
                speedSpread: 0,
                particlesPerSecond: 50,
                size: 500,
                sizeSpread: 0,
                sizeEnd: 200,
                emitterDuration: .1,
                alive: 0,
                type: "sphere"
            }
        },
        weapons: {
            rockets: {
                acceleration: 5,
                velocity: 1e3,
                maxVelocity: 1500,
                freeFlightDuration: 1,
                lerpAmount: .07,
                maxAge: 10,
                launchGap: 1,
                model: "../../res/models/rocket.dae"
            }
        },
        ship: {
            model: "../../res/models/crosswing6-recentered.dae",
            scale: .1,
            useEmitter: !0
        },
        engineBooster: {
            texture: "../../res/textures/booster.jpg",
            radiusTop: 100,
            radiusBottom: 300,
            height: 4e3,
            radiusSegments: 16,
            heightSegments: 1,
            openEnded: !0
        },
        plasmaCannon: {
            numBullets: 1e4,
            size: 100,
            texture: null,
            speed: 5e3,
            power: 10,
            maxAge: 5
        }
    };
    a.prototype = {
        _makeLoaderElements: function() {
            var a = (this.domElement, document.createElement("div")), b = (document.createElement("div"), 
            document.createElement("p")), c = document.createElement("div"), d = document.createElement("div");
            a.className = "loaderWrapper", b.className = "assetCounter", c.className = "progressWrapper", 
            d.className = "progressBar", c.appendChild(d), a.appendChild(b), a.appendChild(c), 
            this.domElement.appendChild(a), this.elements = {}, this.elements.assetCounter = b, 
            this.elements.progressBar = d;
        },
        loadAll: function() {
            function a() {
                var g = d[e], h = c[e];
                ++e, e === f ? b.options.events.trigger("ASSET_LOADER:allLoaded", b.loaded) : h && h.length ? setTimeout(function() {
                    g.call(b, a);
                }, 250) : a();
            }
            var b = this, c = [ this.options.models, this.options.images, this.options.textures, this.options.fonts, this.options.sounds ], d = [ this.loadModels, this.loadImages, this.loadTextures, this.loadFonts, this.loadSounds ], e = 0, f = c.length;
            a();
        },
        loadModels: function(a) {
            function b(h) {
                d.elements.assetCounter.innerHTML = "<span>Loading models...</span><span>" + e + "/" + f + "</span>", 
                ++e, d.colladaLoader.load(h, function(g) {
                    var i = g.scene, j = g.skins[0];
                    i.updateMatrix(), d.loaded.models[h] = {
                        dae: i,
                        skin: j
                    }, f > e ? setTimeout(function() {
                        b(c[e]);
                    }, 50) : "function" == typeof a ? a() : "function" == typeof d.options.onModelsLoaded && d.options.events.trigger("ASSET_LOADER:modelsLoaded", d.loaded.models), 
                    g = null;
                }, function(a) {
                    g.style.width = 100 / +a.total * a.loaded + "%";
                });
            }
            var c = this.options.models, d = this, e = 0, f = c.length, g = d.elements.progressBar;
            b(c[e]);
        },
        loadImages: function() {},
        loadTextures: function(a) {
            function b(h) {
                d.elements.assetCounter.innerHTML = "<span>Loading textures...</span><span>" + e + "/" + f + "</span>", 
                ++e, v.ImageUtils.loadTexture(h, g, function(g) {
                    d.loaded.textures[h] = g, f > e ? setTimeout(function() {
                        b(c[e]);
                    }, 50) : "function" == typeof a ? a() : "function" == typeof d.onTexturesLoaded && d.options.events.trigger("ASSET_LOADER:texturesLoaded", d.loaded.textures);
                });
            }
            var c = this.options.textures, d = this, e = 0, f = c.length, g = (d.elements.progressBar, 
            {});
            b(c[e]);
        },
        loadFonts: function() {},
        loadSounds: function() {}
    }, function() {
        var a = Array.prototype.slice, b = /\s+/, c = function(a, c, d, e) {
            if (!d) return !0;
            if ("object" == typeof d) {
                for (var f in d) a[c].apply(a, [ f, d[f] ].concat(e));
                return !1;
            }
            if (b.test(d)) {
                for (var g = d.split(b), h = 0, i = g.length; i > h; h++) a[c].apply(a, [ g[h] ].concat(e));
                return !1;
            }
            return !0;
        }, d = function(a, b) {
            var c, d = -1, e = a.length, f = b[0], g = b[1], h = b[2];
            switch (b.length) {
              case 0:
                for (;++d < e; ) (c = a[d]).callback.call(c.ctx);
                return;

              case 1:
                for (;++d < e; ) (c = a[d]).callback.call(c.ctx, f);
                return;

              case 2:
                for (;++d < e; ) (c = a[d]).callback.call(c.ctx, f, g);
                return;

              case 3:
                for (;++d < e; ) (c = a[d]).callback.call(c.ctx, f, g, h);
                return;

              default:
                for (;++d < e; ) (c = a[d]).callback.apply(c.ctx, b);
            }
        }, e = {
            on: function(a, b, d) {
                if (!c(this, "on", a, [ b, d ]) || !b) return this;
                this._events || (this._events = {});
                var e = this._events[a] || (this._events[a] = []);
                return e.push({
                    callback: b,
                    context: d,
                    ctx: d || this
                }), this;
            },
            once: function(a, b, d) {
                if (!c(this, "once", a, [ b, d ]) || !b) return this;
                var e = this, f = _.once(function() {
                    e.off(a, f), b.apply(this, arguments);
                });
                return f._callback = b, this.on(a, f, d);
            },
            off: function(a, b, d) {
                var e, f, g, h, i, j, k, l;
                if (!this._events || !c(this, "off", a, [ b, d ])) return this;
                if (!a && !b && !d) return this._events = {}, this;
                for (h = a ? [ a ] : _.keys(this._events), i = 0, j = h.length; j > i; i++) if (a = h[i], 
                g = this._events[a]) {
                    if (this._events[a] = e = [], b || d) for (k = 0, l = g.length; l > k; k++) f = g[k], 
                    (b && b !== f.callback && b !== f.callback._callback || d && d !== f.context) && e.push(f);
                    e.length || delete this._events[a];
                }
                return this;
            },
            trigger: function(b) {
                if (!this._events) return this;
                var e = a.call(arguments, 1);
                if (!c(this, "trigger", b, e)) return this;
                var f = this._events[b], g = this._events.all;
                return f && d(f, e), g && d(g, arguments), this;
            },
            stopListening: function(a, b, c) {
                var d = this._listeners;
                if (!d) return this;
                var e = !b && !c;
                "object" == typeof b && (c = this), a && ((d = {})[a._listenerId] = a);
                for (var f in d) d[f].off(b, c, this), e && delete this._listeners[f];
                return this;
            }
        };
        window.Events = e;
    }(), c.prototype = {
        _makePrimaryWeaponIndicator: function() {
            var a = {};
            a.wrapper = document.createElement("div"), a.wrapper.className = "hud-primaryWeaponIndicator", 
            a.weaponOne = document.createElement("div"), a.weaponOne.textContent = "Pulse Cannon", 
            a.weaponOne.className = "hud-weapon hud-one active", a.weaponTwo = document.createElement("div"), 
            a.weaponTwo.textContent = "Plasma Cannon", a.weaponTwo.className = "hud-weapon hud-two", 
            a.wrapper.appendChild(a.weaponOne), a.wrapper.appendChild(a.weaponTwo), a.weapons = [ a.weaponOne, a.weaponTwo ], 
            this.elements.wrapper.appendChild(a.wrapper), this.elements.primaryWeaponIndicator = a;
        },
        _makeSecondaryWeaponIndicator: function() {
            var a = {};
            a.wrapper = document.createElement("div"), a.wrapper.className = "hud-secondaryWeaponIndicator", 
            a.weaponOne = document.createElement("div"), a.weaponOne.textContent = "Sidewinder", 
            a.weaponOne.className = "hud-weapon hud-one active", a.weaponTwo = document.createElement("div"), 
            a.weaponTwo.textContent = "Hellfire", a.weaponTwo.className = "hud-weapon hud-two", 
            a.wrapper.appendChild(a.weaponOne), a.wrapper.appendChild(a.weaponTwo), a.weapons = [ a.weaponOne, a.weaponTwo ], 
            this.elements.wrapper.appendChild(a.wrapper), this.elements.secondaryWeaponIndicator = a;
        },
        _makeElements: function() {
            var a = this.elements;
            a.wrapper = document.createElement("div"), a.wrapper.className = "hud-wrapper", 
            this._makePrimaryWeaponIndicator(), this._makeSecondaryWeaponIndicator();
        },
        addToDOM: function() {
            document.body.appendChild(this.elements.wrapper);
        },
        selectWeapon: function(a) {
            var b;
            b = "primary" === a ? this.elements.primaryWeaponIndicator.weapons : this.elements.secondaryWeaponIndicator.weapons;
            for (var c = 0; 2 > c; ++c) b[c].classList.toggle("active");
        },
        renderHit: function() {
            var a = this;
            this.elements.wrapper.classList.add("hit"), setTimeout(function() {
                a.elements.wrapper.classList.remove("hit");
            }, 50);
        }
    }, g.prototype = {
        _addObjectsToRenderer: function() {
            var a = this.options.layerManager;
            for (var b in this.objects) a.addObjectToLayer(this.name, this.objects[b]);
            for (var b in this.object3Ds) a.addObject3dToLayer(this.name, this.object3Ds[b]);
        },
        _addTickToRenderer: function() {
            this.options.renderer.addPreRenderTickFunction(this.tick);
        },
        _addParticleGroupsToRenderer: function() {
            for (var a in this.particleGroups) this.options.layerManager.addObject3dToLayer(this.name, this.particleGroups[a].mesh);
        }
    }, g.extend = w.extend;
    var y = g.extend({
        name: "background",
        objects: {},
        object3Ds: {},
        initialize: function() {
            this.tick = this.tick.bind(this), this._makeObjects(), this._addObjectsToRenderer(), 
            this._addTickToRenderer();
        },
        _makeObjects: function() {
            var a = this.objects, b = this.object3Ds;
            a.skybox = new q(x.layers.background.skybox), a.starfield = new r(x.layers.background.starfield), 
            a.planet = new k(x.layers.background.planet), a.sun = new l(x.layers.background.sun), 
            b.sunLight = new v.DirectionalLight(16776870, 1), b.sunLight.position = x.layers.background.sun.position;
        },
        tick: function(a) {
            this.objects.planet.tick(a);
        }
    }), z = g.extend({
        name: "middleground",
        objects: {},
        object3Ds: {},
        particleGroups: {},
        particleEmitters: {},
        initialize: function() {
            this.tick = this.tick.bind(this), this._makeParticleGroups(), this._makeLayerEmitters(), 
            this._makeObjects(), this._addObjectsToRenderer(), this._addParticleGroupsToRenderer(), 
            this._addTickToRenderer();
            var a = this;
            document.addEventListener("mousedown", function() {
                a.objects.rockets.fire("host", F.getLayerWithName("middleground").camera, a.object3Ds.targetMesh);
            }, !1);
        },
        _makeParticleGroups: function() {
            var a = this.particleGroups;
            a.engines = new j(x.particleGroups.engines), a.rockets = new j(x.particleGroups.rockets), 
            a.rocketExplosions = new j(x.particleGroups.rocketExplosions);
        },
        _makeLayerEmitters: function() {
            var a, b = this.particleEmitters, c = this.particleGroups;
            b.rocketExplosions = new m(100, i, x.particleEmitters.rocketExplosions), a = b.rocketExplosions.getStore();
            for (var d = 0; d < a.length; ++d) c.rocketExplosions.addEmitter(a[d]);
        },
        _makeObjects: function() {
            var a = this.objects, b = this.object3Ds;
            a.starfield = new r(x.layers.middleground.starfield), a.rockets = new o(_.extend({
                particleGroup: this.particleGroups.rockets,
                explosionParticleGroup: this.particleGroups.rocketExplosions
            }, x.weapons.rockets)), b.targetMesh = new v.Mesh(new v.CubeGeometry(100, 100, 100)), 
            b.targetMesh.position.set(-1e3, 2e3, 1e3), b.sunLight = new v.DirectionalLight(16776870, 3), 
            b.sunLight.position.copy(x.layers.background.sun.position);
        },
        triggerRocketExplosion: function(a, b, c, d) {
            var e = this.particleEmitters.rocketExplosions, f = e.get();
            f && (f.position.set(b, c, d), f.alive = 1, setTimeout(function() {
                e.release(f);
            }, x.particleGroups.rocketExplosions.maxAge + 100));
        },
        tick: function(a) {
            this.objects.rockets.tick(a), this.particleGroups.rockets.tick(), this.particleGroups.rocketExplosions.tick();
        }
    });
    h.prototype = {
        save: function() {},
        load: function() {}
    }, i.prototype = {
        _resetParticle: function(a) {
            var b = this.positionSpread;
            "cube" === this.type && 0 === b.x && 0 === b.y && 0 === b.z || "sphere" === this.type && 0 === this.radius ? a.copy(this.position) : "cube" === this.type ? this._randomizeExistingVector3(a, this.position, b) : "sphere" === this.type && this._randomizeExistingVector3OnSphere(a, this.position, this.radius);
        },
        _randomizeExistingVector3: function(a, b, c) {
            a.copy(b), a.x += Math.random() * c.x - c.x / 2, a.y += Math.random() * c.y - c.y / 2, 
            a.z += Math.random() * c.z - c.z / 2;
        },
        _randomizeExistingVector3OnSphere: function(a, b, c) {
            var d = 2 * Math.random() - 1, e = 6.2832 * Math.random(), f = Math.sqrt(1 - d * d), g = f * Math.cos(e) * c + b.x, h = f * Math.sin(e) * c + b.y, d = d * c + b.z;
            a.set(g, h, d);
        },
        tick: function(a) {
            var b = this.attributes, c = b.alive.value, d = b.age.value, e = (b.velocity.value, 
            this.verticesIndex), f = e + this.numParticles, g = this.recycled, h = this.particlesPerSecond, i = this.maxAge, j = this.age;
            g.length = 0;
            for (var k = e; f > k; ++k) 1 === c[k] && (d[k] += a), d[k] >= i && (d[k] = 0, c[k] = 0, 
            g.push(k));
            if (!this.alive) {
                if (g.length) for (var k = 0; k < g.length; ++k) this._resetParticle(this.vertices[g[k]]);
                return this.age = 0, void 0;
            }
            if ("number" == typeof this.emitterDuration && this.age > this.emitterDuration) return this.alive = 0, 
            void 0;
            if (j <= this.maxAge) {
                var l = e + Math.round(h * j), m = e + Math.round(h * (j + a));
                m > e + this.numParticles && (m = e + this.numParticles);
                for (var k = l; m > k; k++) c[k] = 1, this._resetParticle(this.vertices[k]);
            }
            for (var k = 0; k < g.length; ++k) c[g[k]] = 1, this._resetParticle(this.vertices[g[k]]);
            this.age += a;
        }
    }, j.prototype = {
        _createGeometry: function() {
            this.geometry = new v.Geometry();
        },
        _createMaterial: function() {
            this.material = new v.ShaderMaterial({
                uniforms: this.uniforms,
                attributes: this.attributes,
                vertexShader: j.shaders.vertex,
                fragmentShader: j.shaders.fragment,
                blending: v.AdditiveBlending,
                transparent: this.transparent,
                alphaTest: this.alphaTest,
                depthWrite: this.depthWrite,
                depthTest: this.depthTest
            });
        },
        _createMesh: function() {
            this.mesh = new v.ParticleSystem(this.geometry, this.material), this.mesh.dynamic = !0;
        },
        _randomVector3: function(a, b) {
            var c = new v.Vector3();
            return c.copy(a), c.x += Math.random() * b.x - b.x / 2, c.y += Math.random() * b.y - b.y / 2, 
            c.z += Math.random() * b.z - b.z / 2, c;
        },
        _randomFloat: function(a, b) {
            return a + b * (Math.random() - .5);
        },
        _randomVector3OnSphere: function(a, b) {
            var c = 2 * Math.random() - 1, d = 6.2832 * Math.random(), e = Math.sqrt(1 - c * c), f = new v.Vector3(e * Math.cos(d), e * Math.sin(d), c);
            return new v.Vector3().addVectors(a, f.multiplyScalar(b));
        },
        _randomVelocityVector3OnSphere: function(a, b, c, d) {
            var e = new v.Vector3().subVectors(a, b);
            return e.normalize().multiplyScalar(this._randomFloat(c, d));
        },
        _randomizeExistingVector3: function(a, b, c) {
            a.set(Math.random() * b.x - c.x, Math.random() * b.y - c.y, Math.random() * b.z - c.z);
        },
        addEmitter: function(a) {
            a.numParticles = a.duration ? a.particlesPerSecond * (this.maxAge < a.emitterDuration ? this.maxAge : a.emitterDuration) : a.particlesPerSecond * this.maxAge, 
            a.numParticles = Math.ceil(a.numParticles);
            for (var b = this.geometry.vertices, c = b.length, d = a.numParticles + c, e = this.attributes, f = e.acceleration.value, g = e.velocity.value, h = e.alive.value, i = e.age.value, j = e.size.value, k = e.sizeEnd.value, l = c; d > l; ++l) "sphere" === a.type ? (b[l] = this._randomVector3OnSphere(a.position, a.radius), 
            g[l] = this._randomVelocityVector3OnSphere(b[l], a.position, a.speed, a.speedSpread)) : (b[l] = this._randomVector3(a.position, a.positionSpread), 
            g[l] = this._randomVector3(a.velocity, a.velocitySpread)), f[l] = this._randomVector3(a.acceleration, a.accelerationSpread), 
            j[l] = Math.max(.1, this._randomFloat(a.size, a.sizeSpread)), k[l] = a.sizeEnd, 
            i[l] = 0, h[l] = 0;
            a.verticesIndex = c, a.attributes = this.attributes, a.vertices = this.geometry.vertices, 
            a.maxAge = this.maxAge, this.emitters.push(a);
        },
        tick: function(a) {
            a = a || this.fixedTimeStep;
            for (var b = 0; b < this.emitters.length; ++b) this.emitters[b].tick(a);
            this.attributes.age.needsUpdate = !0, this.attributes.alive.needsUpdate = !0, this.geometry.verticesNeedUpdate = !0;
        }
    }, j.shaders = {
        vertex: [ "uniform float duration;", "uniform vec3 customColor;", "uniform vec3 customColorEnd;", "uniform int hasPerspective;", "uniform float opacity;", "uniform float opacityEnd;", "attribute vec3 acceleration;", "attribute vec3 velocity;", "attribute float alive;", "attribute float age;", "attribute float size;", "attribute float sizeEnd;", "varying vec4 vColor;", "float Lerp( float start, float end ) {", "return (start + ((end - start) * (age / duration)));", "}", "vec3 Lerp( vec3 start, vec3 end ) {", "return (start + ((end - start) * (age / duration)));", "}", "float GetSize( float newSize, vec4 mvPosition ) {", "if( hasPerspective == 1 ) {", "newSize = newSize * (300.0 / length( mvPosition.xyz ) );", "}", "return newSize;", "}", "vec4 GetPos() {", "vec3 newPos = vec3( position );", "float positionInTime = age / duration;", "vec3 a = acceleration * positionInTime;", "vec3 v = velocity * positionInTime;", "v = v + (a * age);", "newPos = newPos + v;", "vec4 mvPosition = modelViewMatrix * vec4( newPos, 1.0 );", "gl_PointSize = Lerp( GetSize( size, mvPosition ), sizeEnd );", "return mvPosition;", "}", "void main() {", "if( alive > 0.5 ) {", "vec3 color = vec3( customColor );", "if( customColor != customColorEnd ) {", "color = Lerp( customColor, customColorEnd );", "}", "if( opacity != opacityEnd ) {", "vColor = vec4( color, Lerp( opacity, opacityEnd ) );", "}", "else {", "vColor = vec4( color, opacity );", "}", "gl_Position = projectionMatrix * GetPos();", "}", "else {", "vColor = vec4( customColor, 0.0 );", "gl_Position = vec4(1e20, 1e20, 1e20, 0);", "}", "}" ].join("\n"),
        fragment: [ "uniform sampler2D texture;", "uniform int colorize;", "varying vec4 vColor;", "void main() {", "float c = cos(0.0);", "float s = sin(0.0);", "vec2 rotatedUV = vec2(c * (gl_PointCoord.x - 0.5) + s * (gl_PointCoord.y - 0.5) + 0.5,", "c * (gl_PointCoord.y - 0.5) - s * (gl_PointCoord.x - 0.5) + 0.5);", "vec4 rotatedTexture = texture2D( texture,  rotatedUV );", "if( colorize == 1 ) {", "gl_FragColor = vColor * rotatedTexture;", "}", "else {", "gl_FragColor = rotatedTexture;", "}", "}" ].join("\n")
    }, k.prototype = {
        tick: function(a) {
            var b = this.jupiter.position.z;
            now = .05 * Date.now(), this.jupiter.rotation.y += .02 * a, this.jupiterAtmosphere.rotation.y += .05 * a, 
            this.jupiterAtmosphere2.rotation.y += .1 * a, this.io.rotation.y -= .09 * a, this.io.position.z = b + Math.sin(now * this.details.io.period) * this.details.io.distance, 
            this.io.position.x = Math.cos(now * this.details.io.period) * this.details.io.distance, 
            this.europa.rotation.y -= .09 * a, this.europa.position.z = b + Math.sin(now * this.details.europa.period) * this.details.europa.distance, 
            this.europa.position.x = Math.cos(now * this.details.europa.period) * this.details.europa.distance;
        },
        getRenderables: function() {
            return this.renderables;
        }
    }, l.prototype = {
        addLensFlare: function(a) {
            function b(a) {
                var b, c, d = a.lensFlares.length, e = 2 * -a.positionScreen.x, f = 2 * -a.positionScreen.y;
                for (b = 0; d > b; b++) c = a.lensFlares[b], c.x = a.positionScreen.x + e * c.distance, 
                c.y = a.positionScreen.y + f * c.distance, c.rotation = 0;
                a.lensFlares[2].y += .025, a.lensFlares[3].rotation = .5 * a.positionScreen.x + v.Math.degToRad(45);
            }
            var c = G.loaded.textures[a.flare0Texture];
            G.loaded.textures[a.flare1Texture];
            var d = G.loaded.textures[a.flare2Texture], e = G.loaded.textures[a.flare3Texture], f = new v.Color(16777215), g = new v.LensFlare(c, 256, 0, v.AdditiveBlending, f);
            g.add(d, 512, 0, v.AdditiveBlending), g.add(d, 512, .05, v.AdditiveBlending), g.add(d, 256, 0, v.AdditiveBlending), 
            g.add(e, 60, .6, v.AdditiveBlending), g.add(e, 70, .7, v.AdditiveBlending), g.add(e, 120, .9, v.AdditiveBlending), 
            g.add(e, 30, .3, v.AdditiveBlending), g.add(e, 83, .5, v.AdditiveBlending), g.add(e, 100, 1, v.AdditiveBlending), 
            g.customUpdateCallback = b, g.position = this.mesh.position.clone(), g.position.z += 20, 
            g.position.x += 100, this.renderables.push(g);
        },
        getRenderables: function() {
            return this.renderables;
        }
    }, n.prototype.setBloomLevel = function(a) {
        this.bloomLevel = a, this.bloomPass.materialCopy.uniforms.opacity.value = a;
    }, n.prototype.renderHit = function() {
        this.setBloomLevel(5), this.rampBloom = !0;
    }, o.prototype = {
        _makeSingleRocket: function() {
            var a = Number.NEGATIVE_INFINITY, b = this.model.clone(), c = b.userData;
            return b.position.set(a, a, a), b.scale.set(.02, .02, .02), b.useQuaternion = !0, 
            c.velocity = this.velocity, c.age = 0, c.lerpAmount = this.lerpAmount, c.distanceToTarget = Number.POSITIVE_INFINITY, 
            c.target = null, b;
        },
        _makeEmitter: function() {
            var a = new i(x.particleEmitters.rockets);
            return this.particleGroup.addEmitter(a), a;
        },
        _makeRockets: function() {
            for (var a, b, c = 0; 40 > c; ++c) a = this._makeSingleRocket(), b = this._makeEmitter(), 
            this.pool.push(a), this.emitterPool.push(b);
        },
        _getFromPool: function() {
            var a, b = this.pool;
            return a = b.length ? b.pop() : this._makeSingleRocket(), this.mesh.add(a), a;
        },
        _returnToPool: function(a) {
            this.pool.push(a), this.mesh.remove(a);
        },
        _getFromEmitterPool: function() {
            var a, b = this.emitterPool;
            return b.length && (a = b.pop(), a.alive = 1), a;
        },
        _returnToEmitterPool: function(a) {
            a && (a.userData.rocket = null, a.alive = 0, this.emitterPool.push(a));
        },
        _setupRocket: function(a, b, c) {
            a.position.copy(b.position), a.quaternion.copy(b.quaternion), a.quaternion.multiply(this.invertXAxisQuaternion), 
            a.translateY(50), c && (c.userData.rocket = a, c.position = a.position, a.userData.emitter = c), 
            this._resetRocket(a);
        },
        _resetRocket: function(a) {
            a.userData.velocity = this.velocity, a.userData.age = 0, a.userData.lerpAmount = 0, 
            a.userData.distanceToTarget = Number.POSITIVE_INFINITY;
        },
        _destroyRocket: function(a, b) {
            a.userData;
            var c = Number.NEGATIVE_INFINITY;
            C.trigger("Rockets:destroyed", b, a.position.x, a.position.y, a.position.z), a.position.set(c, c, c), 
            this._resetRocket(a), this._returnToPool(a), a.userData.emitter && this._returnToEmitterPool(a.userData.emitter);
        },
        fire: function(a, b, c) {
            if (c && c instanceof v.Object3D && !(Date.now() - this.launchTimes[a] < this.launchGap)) {
                this.launchTimes[a] = Date.now();
                var d = this._getFromPool(), e = this._getFromEmitterPool();
                this._setupRocket(d, b, e), this.activeRockets.push(d), d.userData.target = c;
            }
        },
        tick: function(a) {
            var b, c, d = this.activeRockets, e = d.length, f = Math.min;
            if (e) for (var g = 0; e > g; ++g) b = d[g], c = b.userData, c.age > this.maxAge || c.distanceToTarget < 100 ? (c.distanceToTarget < 100 ? this._destroyRocket(b, o.destructionTypes.hitTarget) : c.age === Number.POSITIVE_INFINITY ? this._destroyRocket(b, o.destructionTypes.hitRocket) : this._destroyRocket(b, o.destructionTypes.timedOut), 
            d.splice(g, 1), --e) : (c.velocity < this.maxVelocity && (c.velocity += this.acceleration), 
            c.distanceToTarget = b.position.distanceTo(c.target.position), c.lerpAmount = f(this.lerpAmount, 50 / c.distanceToTarget), 
            c.age > this.freeFlightDuration && (this.targetMatrix.lookAt(c.target.position, b.position, b.up), 
            this.targetQuaternion.setFromRotationMatrix(this.targetMatrix), b.quaternion.slerp(this.targetQuaternion, c.lerpAmount)), 
            b.translateZ(c.velocity * a), c.age += a, this.checkCollisionWithOtherRockets(b));
        },
        checkCollisionWithOtherRockets: function(a) {
            for (var b = 0; b < this.activeRockets.length; ++b) if (this.activeRockets[b] !== a && a.position.distanceTo(this.activeRockets[b].position) < 20) {
                console.log("collision"), a.userData.age = Number.POSITIVE_INFINITY, this.activeRockets[b].userData.age = Number.POSITIVE_INFINITY;
                break;
            }
        },
        getRenderables: function() {
            return this.renderables;
        }
    }, o.destructionTypes = Object.freeze({
        hitTarget: 0,
        hitRocket: 1,
        timedOut: 2
    }), o.extend = w.extend, o.extend({
        fire: function(a, b, c) {
            if (c && c instanceof v.Object3D && !(Date.now() - this.launchTimes[a] < this.launchGap)) {
                this.launchTimes[a] = Date.now();
                var d = this, e = d._getFromPool(), f = d._getFromEmitterPool();
                d._setupRocket(e, b, f), d.activeRockets.push(e), e.userData.target = c, e.translateX(-30), 
                setTimeout(function() {
                    var a = d._getFromPool(), e = d._getFromEmitterPool();
                    d._setupRocket(a, b, e), d.activeRockets.push(a), a.userData.target = c, a.translateX(30);
                }, 0);
            }
        }
    }), p.prototype = {
        _addControls: function() {
            this.mesh.__updatePosition = !0, this.mesh.__updateRotation = !0;
            var a = new b({
                targetCameras: [ this.mesh ]
            });
            a.setCenterX(window.innerWidth / 2), a.setCenterY(window.innerHeight / 2), a.setX(window.innerWidth / 2), 
            a.setY(window.innerHeight / 2), this.controls = a, renderer.addPreRenderTickFunction(a.tick);
        },
        _addEmitter: function(a) {
            x.engineEmitter.position = this.mesh.position;
            var b = new ParticleEmitter(x.engineEmitter);
            b.position = this.mesh.position, b.initialize(), a.addEmitter(b), this.emitter = b;
        },
        _addBooster: function() {
            var a = x.engineBooster, b = new v.Mesh(new v.CylinderGeometry(a.radiusTop, a.radiusBottom, a.height, a.radiusSegments, a.heightSegments, a.openEnded), new v.MeshBasicMaterial({
                map: assetLoader.loaded.textures[a.texture],
                transparent: !0,
                blending: v.AdditiveBlending,
                opacity: .3
            }));
            b.rotation.x = -Math.PI / 2, b.position.z += a.height / 2, b.position.y += 2, this.mesh.add(b);
        },
        _addWeapons: function() {
            this.weapons.plasmaCannon = new B({
                numBullets: 1e3
            }), renderer.addPreRenderTickFunction(this.weapons.plasmaCannon.tick), layerManager.addObject3dToLayer("middleground", this.weapons.plasmaCannon.mesh);
        },
        getRenderables: function() {
            return this.renderables;
        }
    }, q.prototype = {
        getRenderables: function() {
            return this.renderables;
        }
    }, s.prototype = {}, s.extend = w.extend;
    var A = s.extend({
        initialize: function() {
            console.log("ParticleWeapon", arguments);
        }
    }), B = s.extend({
        initialize: function() {
            console.log("PlasmaCannon", arguments), A.prototype.initialize.apply(this, arguments), 
            x.plasmaCannon;
        }
    }), C = Events, D = new d(), E = new e(), F = new f(x.layerManager), G = new a(_.extend({
        events: C
    }, x.assetLoader)), c = new c(), H = new b({
        mouseHandler: D,
        keyboardHandler: E,
        targetCameras: F.getAllCameras()
    }), I = new n({
        width: window.innerWidth / x.resolutionScaling,
        height: window.innerHeight / x.resolutionScaling,
        elementWidth: window.innerWidth,
        elementHeight: window.innerHeight,
        gammaInput: !0,
        gammaOutput: !0,
        physicallyBasedShading: !0
    });
    C.on("ASSET_LOADER:allLoaded", function() {
        G.domElement.style.display = "none", t(), J = new y({
            layerManager: F,
            renderer: I
        }), K = new z({
            layerManager: F,
            renderer: I
        }), c.addToDOM(), setInterval(function() {
            c.selectWeapon("primary", Math.round(Math.random())), c.selectWeapon("secondary", Math.round(Math.random()));
        }, 1e3), setTimeout(I.start, 100);
    }), C.on("Rockets:destroyed", function(a, b, c, d) {
        K.triggerRocketExplosion(a, b, c, d);
    });
    var J, K;
    I.setLayerManager(F), I.addToDOM(), I.addStats(new u()), I.addPreRenderTickFunction(H.tick), 
    G.loadAll();
})();