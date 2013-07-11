module.exports = function( grunt ) {

    var files = [
            'external/Stats.min.js', 'external/THREE-r58.min.js', 'external/THREE.ColladaLoader.js', 'external/Underscore.js',
            'utils/utils.js',
            'config/CONFIG.js',

            'assetLoader/AssetLoader.js',
            'cameraControls/CameraControls.js',
            'events/Events.js',
            'hud/HUD.js',
            'io/MouseHandler.js',
            'io/KeyboardHandler.js',
            'layerManager/LayerManager.js',
            'layer/Layer.js',
            'localStorage/LocalStorage.js',
            'particles/ShaderParticles.js',
            'planet/Planet.js',
            'pool/Pool.js',
            'renderer/Renderer.js',
            'rockets/Rockets.js',
            'ship/Ship.js',
            'skybox/Skybox.js',
            'starfield/Starfield.js',
            'weapon/Weapon.js',
            'weapon/ParticleWeapon.js',
            'weapon/PlasmaCannon.js',

            'constants/CONSTANTS.js',
            'initialization/events.js',
            'initialization/initialization.js'

        ],
        outputPath = '_dist/build.js',
        outputPathMin = outputPath.replace( '.js', '.min.js' ),
        outputPathBeautify = outputPath.replace('.js', '.beaut.js');


    var uglifySettings = {
        min: {
            options: {
                mangle: true,
                compress: {
                    // global_defs: {
                        // window: true,
                        // document: true
                    // },
                    dead_code: true,
                    // hoist_vars: true,
                    // unsafe: true
                }
            },
            files: {}
        },

        beautify: {
            options: {
                beautify: true
            },
            files: {}
        }
    };


    uglifySettings.min.files[ outputPathMin ] = [ outputPath ];
    uglifySettings.beautify.files[ outputPathBeautify ] = [ outputPath ];


    grunt.initConfig({
        uglify: uglifySettings,

        concat: {
            options: {
                separator: ';\n\n',
                banner: '\n(function() {',
                footer: '\n\n}());'
            },
            dist: {
                src: files,
                dest: outputPath,
            },
        },
    });

    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );

    grunt.registerTask( 'default', ['concat', 'uglify'] );
};