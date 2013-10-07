function Waypoints() {
	this.points = [];
}

Waypoints.prototype = {

	registerObject: function( obj ) {
		obj.waypoints = this;
		obj.waypointsIndex = 0;
	},

	addPoint: function( v ) {
		this.points.push( v );
		return this;
	},

	removePoint: function( v ) {
		var points = this.points;

		for( var i = 0; i < points.length; ++i ) {
			if( points[i].equal( v ) ) {
				points.splice( i, 1 );
				break;
			}
		}

		return this;
	},

	removePointAtIndex: function( i ) {
		var points = this.points;

		if( i < points.length - 1 ) {
			points.splice( i, 1 );
		}

		return this;
	},


	getPoints: function() {
		return this.points;
	},

	getPointAtIndex: function( i ) {
		return this.points[ i ] || null;
	},

	getNumPoints: function() {
		return this.points.length;
	},
};