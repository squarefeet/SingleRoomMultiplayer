var utils = {

	getScreenXY: function( position, camera, width, height ) {
	    var pos = position.clone(),
	        projScreenMat = new THREE.Matrix4();

	    projScreenMat.multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse );
	    pos.applyProjection( projScreenMat );

	    return {
	        x: ( pos.x + 1 ) * width / 2,
	        y: ( -pos.y + 1) * height / 2
	    };
	},

	getSizeOnScreen: function(position, camera, width, height) {
		var camera = sceneManager.middleground.camera,
            vFOV = camera.fov * (Math.PI / 180),
            height = 2 * Math.tan( vFOV / 2 ) * (camera.position.distanceTo(position) - 50),
            aspect = width / height,
            width = height * aspect,
            fractionH = 100 / height,
            fractionW = 100 / width,
            sizeOnScreenH = height * fractionH,
            sizeOnScreenW = width * fractionW;

		return {
			width: sizeOnScreenW,
			height: sizeOnScreenH
		};
	},

	get2dAngle: function(v1, v2) {
		return Math.atan2( v2.y - v1.y, v2.x - v1.x );
	},

    rampDown: function( startAt, finishAt, numSteps, currentStep ) {
        // var total = Math.abs(finishAt - startAt),
        //     stepSize = total / numSteps,
        //     currentValue = stepSize * currentStep;

        //     return currentValue + stepSize;
    },

    lerp: function( start, end, amount ) {
    	return (start + ((end - start) * amount));
    }
};