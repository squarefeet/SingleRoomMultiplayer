function Flags( flags ) {
	this._flags = {};

	if( flags ) {
		for( var i in flags ) {
			this._flags[i] = 1 << ( Object.keys( _flags ).length );
		}
	}

	this._bits = 0.0;
	this._recycledIndices = [];
}

Flags.prototype = {
	create: function( key, onOff ) {
		var _flags = this._flags,
			index = Object.keys( _flags ).length,
			recycled = this._recycledIndices,
			numRecycled = recycled.length;

		if( index === 31 && numRecycled === 0 ) {
			console.error( 'Maxed out all 32 flags' );
			return;
		}
		else if( numRecycled > 0 ) {
			_flags[ key ] = recycled.pop();
		}
		else {
			_flags[ key ] = 1 << ( Object.keys(_flags).length );
		}

		this.set( key, onOff );
	},

	set: function( key, onOff ) {
		if( onOff === true ) {
			this._bits |= this._flags[ key ];
		}
		else {
			this._bits &= ~ this._flags[ key ];
		}
	},

	unset: function( key ) {
		this._recycledIndices.push( this._flags[ key ] );
	},

	check: function( key ) {
		var bits = this._bits,
			flags = this._flags;

		return !!( bits & flags[ key ] );
	},

	checkMultiple: function() {
		var bits = this._bits,
			flags = this._flags,
			result = false;

		for( var i = 0; i < arguments.length; ++i ) {
			result = !!(bits & flags[ arguments[ i ] ]);

			if( !result ) return false;
		}

		return true;
	}
};