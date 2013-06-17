audio.io.SingleShotSamplePlayer = audio.io.Audio.extend({
	defaults: {

	},

	initialize: function() {
		var that = this,
			ctx = that._io.context;

		// Call parent class's initialize fn so in and out gain nodes
		// are created.
		that._io.Audio.prototype.initialize.apply(that, arguments);

		that.sampler =
	},

	loadSample: function( sampleFilename ) {
		var that = this;

		that._io.utils.loadFileIntoBuffer('../samples/' + sampleFilename, function(buffer) {
			that.buffer = buffer;
		});
	}
})

audio.io.SamplePlayer = audio.io.Audio.extend({
	defaults: {
		sample: null,
		polyphony: 1,
		numVoices: 1,
	},

	initialize: function() {
		var that = this;

		// Call parent class's initialize fn so in and out gain nodes
		// are created.
		that._io.Audio.prototype.initialize.apply(that, arguments);

		// Create a pool of SingleShotOscillators so we don't
		// keep creating and destroying instances on every
		// noteOn/noteOff.
		// Shouldn't need to worry about passing arguments
		// to the SingleShotOscillator constructor as we'll
		// set properties when we get the osc out of the pool
		that.pool = new that._io.Pool({
			count: that.get('polyphony') * that.get('numVoices'),
			object: that._io.SingleShotSamplePlayer,
			objectArguments: [{
				sample: that.get('sample')
			}]
		});


		that.instances = [];
		that.instanceOrder = [];
	},


	start: function() {
		var that = this,
			numVoices = that.get('numVoices'),
			osc;

		var instance = [];


		for(var i = 0; i < numVoices; ++i) {
			osc = that.pool.get();

			osc.set({
				frequency: frequency,
				type: this.get('type')
			});

			if(this.get('type') !== 4) {
				osc.osc.detune.value = this.detuneStart + (this.detuneStep * i);
			}

			for(var mod in this.mods) {
				for(var j = 0; j < this.mods[mod].length; ++j) {
					this.mods[mod][j].output.connect( osc.osc[mod] );
				}
			}

			osc.connect(this.output);

			instance.push(osc);

			osc.start( velocity/127 );
		}

		this.instances[frequency].push(instance);
	},

	stop: function( frequency ) {
		var instance = this.instances[frequency].shift(),
			that = this;

		for(var i = 0; i < instance.length; ++i) {
			instance[i].stop();
		}

		setTimeout(function() {
			that.release( instance );
		}, this.get('releaseTime') * 1000 + 100);
	},

	release: function( instance ) {
		for(var i = 0; i < instance.length; ++i) {
			instance[i].reset();
			this.pool.release(instance[i]);
		}
	}
});