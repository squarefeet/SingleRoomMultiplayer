function Flame() {

    this.vertexShader = [
        'varying vec2 vUv;',
        'uniform float delta;',
        'uniform float scale;',
        'uniform float alpha;',
        'void main() {',
        '    vUv = uv;',
        '    vec3 p = position;',

        '    p.z += sin((1.0 - p.y) + delta) * 20.0;',

        '    p.z += cos(2.0 * (p.z/15.0) + delta / 2.0) * 10.0;',

        '    p.z += cos(2.0 * p.x + delta) * 10.0;',

        '    p.x += sin((1.0-p.y) + delta / 2.0) * 20.0;',

        '    vec4 mvPosition = modelViewMatrix * vec4(scale * p, 1.0 );',

        '    gl_Position = projectionMatrix * mvPosition;',
        '}'
    ].join('\n');

    this.fragmentShader = [
        '#ifdef GL_ES',
        'precision highp float;',
        '#endif',
        'uniform float delta;',
        'uniform float alpha;',
        'varying vec2 vUv;',
        'void main(void) {',
        '    vec2 position = vUv;',
        '    float red = 1.0 - (position.y * 1.5);',
        '    float green = 1.0 - (position.y * 1.5);',
        '    float blue = 1.0 - (position.y);',
        '    vec3 rgb = vec3(red, green, blue);',
        '    vec4 color = vec4(rgb, 1.0 - (position.y * 1.5));',
        '    gl_FragColor = color;',
        '}'
    ].join('\n');

    var attributes = {},
        uniforms = {
            delta: { type: 'f', value: 0.0 },
            scale: { type: 'f', value: 1.0 },
            alpha: { type: 'f', value: 1.0 }
        },
        material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            attributes: attributes,
            vertexShader: this.vertexShader,
            fragmentShader: this.fragmentShader,
            transparent: true,
        }),
        sphere = new THREE.Mesh( new THREE.SphereGeometry(250, 64, 64), material );


    sphere.scale.x = 0.1;
    sphere.scale.y = 1;
    sphere.scale.z = 0.1;

    this.mesh = sphere;

    this.renderables = [];
    this.renderables.push( sphere );

    this.update = function( dt ) {
        uniforms.delta.value += 0.1;
    };
}

Flame.prototype = {
    getRenderables: function() {
        return this.renderables;
    }
};











function Flame2() {

    var attributes = {},
        uniforms = {
            time:  { type: "f", value: 1.0 },
            uSpeed:  { type: "f", value: 1.0 },
            scale: { type: "v2", value: new THREE.Vector2( 1, 1 ) }
        },
        noiseMap  = new THREE.WebGLRenderTarget( 512, 512, { minFilter: THREE.LinearMipMapLinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat } ),
        displacementUniforms = {
            time:  { type: "f", value: 1.0 },
            tHeightMap:  { type: "t",  value: 1, texture: noiseMap },
            uDisplacementBias: { type: "f", value: -15.0 },
            uDisplacementScale: { type: "f", value: 25.0 },
            uColor1: { type: "c", value: new THREE.Color( 0xffff00 ) },
            uColor2: { type: "c", value: new THREE.Color( 0xff0000 ) },
            uSmoke: { type: "f", value: 1.70 },
            uShapeBias: { type: "v2", value: new THREE.Vector2(0,25, 0.80) },
            uScreenHeight: { type: "f", value: window.innerHeight },
            uTurbulence: { type: "f", value: 0.0 },
            uTwist: { type: "f", value: 0.0 }
        },

        displacementMaterial = new THREE.ShaderMaterial({
            wireframe:      false,
            transparent:    true,
            uniforms:       displacementUniforms,
            vertexShader:   document.getElementById('DISPLACEMENT_VERTEX').textContent,
            fragmentShader: document.getElementById('DISPLACEMENT_FRAGMENT').textContent,
            lights:         false
        }),

        geometry = new THREE.SphereGeometry( 500, 140, 100 );

    geometry.computeFaceNormals();

    var sphere = new THREE.Mesh( geometry, displacementMaterial );

    sphere.depthTest = false;

    this.renderables = [];
    this.renderables.push( sphere );

    this.update = function( dt ) {
        displacementUniforms.time.value += 1 * dt;
        uniforms.uSpeed.value += 0.01;
        uniforms.time.value += 0.01 * dt;
    };
}

Flame2.prototype = {
    getRenderables: function() {
        return this.renderables;
    }
};