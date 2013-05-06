function Emitter( options ) {

    this.options = {
        position: new THREE.Vector3(0, 0, 0),
        duration: 500,
        lifetime: [5, 5],
        velocity: new THREE.Vector3(0, 0, 0),
        acceleration: new THREE.Vector3(0, 0, 0),
        randomDrift: new THREE.Vector3(0, 0, 0),
        count: 7000,
        width: 10,
        height: 10,
        depth: 10,
        colors: [0xffffff, 0xff0000],
        minSize: 2,
        maxSize: 20,
        pathWidth: 50,
        pathHeight: 100,
        speed: 100,
        lightColor: 0xFFFFFF,
        lightIntensity: 1,
        lightDistance: 1000,
        hasLight: true,
        usePath: false
    };


    if(options) {
        for(var i in options) {
            if(this.options.hasOwnProperty(i)) {
                this.options[i] = options[i];
            }
        }
    }

    this.emitterPos = this.options.position.clone();

    this.pool = new Pool();
    this.generateParticles();

    if(this.options.hasLight) {
        this.addLight();
    }

    if(this.options.usePath) {
        this.generatePath();
        this.timeOnShapePath = 0;
    }

    this.delta = 0;

    var emitter = this.emitter = new SPARKS.Emitter(
        new SPARKS.SteadyCounter( this.options.duration )
    );

    emitter.addInitializer( new SPARKS.Position( new SPARKS.PointZone( this.emitterPos ) ) );
    emitter.addInitializer( new SPARKS.Lifetime( this.options.lifetime[0], this.options.lifetime[1] ));
    emitter.addInitializer( new SPARKS.Target( null, this.setTargetParticle.bind(this) ) );
    emitter.addInitializer( new SPARKS.Velocity( new SPARKS.PointZone( this.options.velocity )));

    emitter.addAction( new SPARKS.Age(TWEEN.Easing.Linear.EaseNone) );
    emitter.addAction( new SPARKS.Accelerate( this.options.acceleration.x, this.options.acceleration.y, this.options.acceleration.z ) );
    emitter.addAction( new SPARKS.Move() );
    emitter.addAction( new SPARKS.RandomDrift( this.options.randomDrift.x, this.options.randomDrift.y, this.options.randomDrift.z ) );

    emitter.addCallback( "created", this.onParticleCreated.bind(this) );
    emitter.addCallback( "dead", this.onParticleDead.bind(this) );
}


Emitter.prototype.start = function() {
    this.emitter.start();
};
Emitter.prototype.stop = function() {
    this.emitter.stop();
};

Emitter.prototype.addLight = function() {
    this.light = new THREE.PointLight(
        this.options.lightColor,
        this.options.lightIntensity,
        this.options.lightDistance
    );

    this.object.add(this.light);
};

Emitter.prototype.generateParticles = function() {
    var particles = this.particles = new THREE.Geometry(),
        x, y, z, particle, random = Math.random,
        velocity;

    for(var i = 0, il = this.options.count; i < il; ++i) {
        particle = new THREE.Vector3(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);

        particles.vertices.push(particle);
        this.pool.release(i);
    }

    var material = this.generateMaterial();

    this.object = new THREE.ParticleSystem(particles, material);
    this.object.dynamic = true;
    this.object.useQuaternion = true;

    this.object.position = this.options.position;
};


Emitter.prototype.generateMaterial = function() {

    // this.sizeAttr = [];
    // this.colorAttr = [];

    // for( var i = 0, il = this.options.count; i < il; ++i) {
    //     var size = Math.random() * this.options.maxSize | 0;

    //     if(size < this.options.minSize) {
    //         size = this.options.minSize;
    //     }

    //     var color = this.options.colors[Math.random() * this.options.colors.length | 0];


    //     this.sizeAttr[i] = size;
    //     this.colorAttr[i] = new THREE.Color( color );
    //     this.particles.vertices[i].set( this.options.position );
    // }

    // return new THREE.ParticleBasicMaterial({
    //     color: 0xFFFFFF,
    //     size: Math.random() * this.options.maxSize
    // });

    function generateSprite() {
        var canvas = document.createElement( 'canvas' );
        canvas.width = 128;
        canvas.height = 128;

        var context = canvas.getContext( '2d' );

        context.beginPath();
        context.arc( 64, 64, 60, 0, Math.PI * 2, false) ;
        context.closePath();

        context.lineWidth = 0.5;
        context.stroke();
        context.restore();

        var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );

        gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
        gradient.addColorStop( 0.2, 'rgba(255,255,255,1)' );
        gradient.addColorStop( 0.4, 'rgba(200,200,200,1)' );
        gradient.addColorStop( 1, 'rgba(0,0,0,1)' );

        context.fillStyle = gradient;

        context.fill();

        return canvas;
    }

    var attributes = {
            size:  { type: 'f', value: [] },
            pcolor: { type: 'c', value: [] }
        },
        sizeAttr = attributes.size.value,
        colorAttr = attributes.pcolor.value,
        size, color;

    this.sizeAttr = sizeAttr;
    this.colorAttr = colorAttr;

    for( var i = 0, il = this.options.count; i < il; ++i) {
        size = Math.random() * this.options.maxSize | 0;

        if(size < this.options.minSize) {
            size = this.options.minSize;
        }

        sizeAttr[i] = size;

        color = this.options.colors[Math.random() * this.options.colors.length | 0];
        colorAttr[i] = new THREE.Color( color );

        this.particles.vertices[i].set( Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY );
    }


    var sprite = generateSprite();

    var texture = new THREE.Texture( sprite );
    texture.needsUpdate = true;

    var uniforms = {
        texture: { type: "t", value: texture }
    };

    var material = new THREE.ShaderMaterial({
        uniforms:       uniforms,
        attributes:     attributes,
        vertexShader:   document.getElementById( 'vertexshader' ).textContent,
        fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
        blending:       THREE.AdditiveBlending,
        depthWrite:     false,
        transparent:    true
    });

    return material;
};

Emitter.prototype.generatePath = function() {
    this.path = new THREE.Shape();

    var x = this.options.position.x,
        y = this.options.position.y;
        width = this.options.pathWidth,
        height = this.options.pathHeight;

    this.path.moveTo( x, y);
    this.path.lineTo(x + width, y);
    this.path.lineTo(x + width, y -height);
    this.path.lineTo(x, y -height);
    this.path.lineTo(x, y);
};

Emitter.prototype.setTargetParticle = function() {
    var target = this.pool.get(),
        size = Math.random() * this.options.maxSize | 0;

    if(size < this.options.minSize) {
        size = this.options.minSize;
    }

    this.sizeAttr[target] = size;

    return target;
};


Emitter.prototype.onParticleCreated = function( particle ) {
    var pos = particle.position;
    particle.target.position = pos;
    var target = particle.target;

    if(target) {
        // this.colorAttr[ target ].setHSL( 1, 1, 0.5);
        this.particles.vertices[target] = pos;
    }
    else {
        console.log('!no')
    }

};

Emitter.prototype.onParticleDead = function( particle ) {
    var target = particle.target;

    if(target) {
        this.colorAttr[ target ].setHSL( 0, 0, 0 );
        this.particles.vertices[ target ].set( Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY );

        // Mark particle system as available by returning to pool
        this.pool.release( particle.target );
    }
    else {
        console.log('no target');
    }
};

Emitter.prototype.tick = function() {
    // this.delta = this.options.speed * 0.05;

    // if(this.options.path) {
    //     this.timeOnShapePath += 0.00035 * this.delta;
    //     if ( this.timeOnShapePath > 1 ) this.timeOnShapePath -= 1;

    //     var pointOnShape = this.path.getPointAt( this.timeOnShapePath );

    //     this.emitterPos.x = pointOnShape.x - (this.options.pathWidth / 2);
    //     this.emitterPos.y = -pointOnShape.y;
    // }
    // else {
    //     var now = Date.now() * 0.0009;

    //     // this.emitterPos.x = Math.cos(now) * (2.5);
    //     // this.emitterPos.y = Math.sin(now) * SCALE + 50;
    //     // this.emitterPos.z = Math.sin(now) * (2.5*SCALE);

    //     // if(this.light) {
    //     //     this.light.position = this.emitterPos.clone();
    //     // }
    // }

    this.object.geometry.verticesNeedUpdate = true;
};