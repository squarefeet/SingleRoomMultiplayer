if(typeof Math.degToRad === 'undefined') {
	Math.degToRad = function( degrees ) {
		return degrees * (Math.PI / 180);
	};
}


if(typeof Math.radToDeg === 'undefined') {
	Math.radToDeg = function( radians ) {
		return radians * (180 / Math.PI);
	};
}