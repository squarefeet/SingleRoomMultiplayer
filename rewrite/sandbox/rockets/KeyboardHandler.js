function KeyboardHandler() {
	var _pressedKeys = [],
		_meta = false,
		_shift = false,
		_alt = false,
		_altGraph = false,
		_ctrl = false;

	document.addEventListener( 'keydown', function(e) {
		_meta = e.metaKey;
		_shift = e.shiftKey;
		_alt = e.altKey;
		_altGraph = e.altGraphKey;
		_ctrl = e.ctrlKey;

		// Force lowercase
		_pressedKeys[ String.fromCharCode( e.keyCode ).toLowerCase().charCodeAt(0) ] = 1;

		// if( _meta || _ctrl ) e.preventDefault();
	}, false );


	document.addEventListener( 'keyup', function(e) {
		_meta = e.metaKey;
		_shift = e.shiftKey;
		_alt = e.altKey;
		_altGraph = e.altGraphKey;
		_ctrl = e.ctrlKey;

		_pressedKeys[ String.fromCharCode( e.keyCode ).toLowerCase().charCodeAt(0) ] = 0;

		// if( _meta || _ctrl ) e.preventDefault();
	}, false );


	this.isPressed = function( key ) {
		var found = false;

		key = key.split('+');

		for( var i = 0; i < key.length; ++i ) {
			found = false;

			if(
				(key[i] === 'meta' && _meta) ||
				(key[i] === 'shift' && _shift) ||
				(key[i] === 'alt' && _alt) ||
				(key[i] === 'altGraph' && _altGraph) ||
				(key[i] === 'ctrl' && _ctrl)
			) {
				found = true;
			}

			else if( _pressedKeys[ key [ i ].charCodeAt(0) ] ) {
				found = true;
			}

			if(!found) return false;
		}

		return true;
	};

}