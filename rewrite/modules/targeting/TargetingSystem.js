function TargetingSystem( opts ) {
	var options = {
		layerManager: null,
		events: null
	};


	if( opts ) {
		for( var i in opts ) {
			options[i] = opts[i];
		}
	}

	
	var currentTargetObject = null,
		currentTargetIndex = null;


	this.nextTarget = function() {
		var targetableObjects = options.layerManager.getTargetableObjects();

		if( currentTargetIndex !== null ) {
			++currentTargetIndex;

			if( currentTargetIndex === targetableObjects.length ) {
				currentTargetIndex = 0;
			}
		}
		else {
			currentTargetIndex = 0;
		}

		this.setTargetObject( targetableObjects[ currentTargetIndex ] );
	};


	this.prevTarget = function() {
		var targetableObjects = options.layerManager.getTargetableObjects();

		if( currentTargetIndex !== null ) {
			--currentTargetIndex;

			if( currentTargetIndex === -1 ) {
				currentTargetIndex = targetableObjects.length-1;
			}
		}
		else {
			currentTargetIndex = targetableObjects.length-1;
		}

		this.setTargetObject( targetableObjects[ currentTargetIndex ] );
	};


	this.deselectTarget = function() {
		currentTargetObject = null;
		options.events.trigger( 'targetDeselected' );
	};


	this.setTargetObject = function( object ) {
		if( !object.renderables || !object.renderables.length ) return;

		var mesh = object.mesh || object.renderables[0];

		if( !mesh ) return;

		currentTargetObject = mesh;

		options.events.trigger( 'newTarget', currentTargetObject );
	};


	this.getCurrentTarget = function() {
		return currentTargetObject;
	};
}