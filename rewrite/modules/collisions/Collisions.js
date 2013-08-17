Math.sign = function( x ) { return x ? x < 0 ? -1 : 1 : 0; };

Array.prototype.remove = function( o ) {
	for( var i = 0; i < this.length; ++i ) {
		if( this[i] === o ) {
			this.splice(i, 1);
			break;
		}
	}
};


var gjk = {
	maxIterations: 50,

	initialPoint: new THREE.Vector3(),
	s: new THREE.Vector3(),
	d: new THREE.Vector3(),
	negativeD: new THREE.Vector3(),
	simplexList: [],

	recursionDepth: 0,
	maxSimplexRecursions: 10,

	_transformToWorldCoordinates: function( mesh ) {
		var out = [],
			faces = mesh.geometry.faces;

		mesh.updateMatrixWorld();

		for( var i = 0; i < faces.length; ++i ) {
			out.push(
				( new THREE.Vector3() ).copy( faces[i].centroid ).applyMatrix4( mesh.matrixWorld )
			);
		}

		return out;


		var out = [],
			vertices = mesh.geometry.vertices;

		mesh.updateMatrixWorld();

		for( var i = 0; i < vertices.length; ++i ) {
			out.push( 
				( new THREE.Vector3() ).copy( vertices[i] ).applyMatrix4( mesh.matrixWorld )
			);
		}

		return out;
	},

	// Implements the Gilbert-Johnson-Keerthi algorithm for collision detection in 3D, 
	// as described in the video lecture at http://mollyrocket.com/849 
    // See also http://www.cse.ttu.edu.tw/~jmchen/compg/fall04/students-presentation/GJK.pdf 
	intersect: function( mesh1, mesh2 ) {

		var vertices1 = this._transformToWorldCoordinates( mesh1 ),
			vertices2 = this._transformToWorldCoordinates( mesh2 );

		// Reset shared vectors and empty simplexList array
		this.initialPoint.set(0, 0, 0);
		this.d.set(0, 0, 0);
		this.negativeD.set(0, 0, 0);
		this.s.set(0, 0, 0);
		this.simplexList.length = 0;

		this.initialPoint.subVectors( vertices1[0], vertices2[0] );
		this.maxPointInMinkDiffAlongDir( vertices1, vertices2, this.initialPoint, this.negativeD, this.s );
		this.d.copy( this.s );
		this.negativeD.copy( this.d ).negate();
		this.simplexList.push( this.s );

		for( var i = 0, a; i < this.maxIterations; ++i ) {
			a = new THREE.Vector3();
			this.maxPointInMinkDiffAlongDir( vertices1, vertices2, this.d, this.negativeD, a );

			if( a.dot( this.d ) < 0 ) {
				return false;
			}

			this.simplexList.push( a );

			if( this.updateSimplexAndDirection( this.simplexList, this.d ) ) {
				return true;
			}
		}

		return false;
	},


	// Finds the farthest point along a given direction of the Minkowski difference 
	// of two convex polyhedra. 
    // Called Support in the video lecture: max(D.Ai) - max(-D.Bj) 
    maxPointInMinkDiffAlongDir: function( vertices1, vertices2, direction, negativeD, affectVector ) { 
        affectVector.subVectors( 
        	this.maxPointAlongDirection( vertices1, direction ), 
        	this.maxPointAlongDirection( vertices2, negativeD )
        );
    },

    // Finds the farthest point along a given direction of a convex polyhedron 
    maxPointAlongDirection: function( vertices, direction ) { 
    	var max = vertices[0];

    	for( var i = 0; i < vertices.length; ++i ) {
    		if( max.dot( direction ) < vertices[i].dot( direction ) ) {
    			max = vertices[i];
    		}
    	}

        return max; 
    },


    /// Updates the current simplex and the direction in which to look for the origin. Called DoSimplex in the video lecture. 
	updateSimplexAndDirection: function( simplex, direction, isRecursing ) {

		if( !isRecursing ) {
			this.recursionDepth = 0;
		}
		else if( (++this.recursionDepth) > this.maxSimplexRecursions ) {
			return false;
		}

	    // If the simplex is a line 
	    if( simplex.length === 2 ) { 
	    	// a is the point added last to the simplex 
	    	var a = simplex[1],
	    		b = simplex[0],
	    		ab = ( new THREE.Vector3() ).addVectors( b, a ),
	    		ao = ( new THREE.Vector3() ).copy( a ).negate();

	    	plane.position.copy( ao );

	    	if( ab.dot( ao ) > 0 ) {
	    		direction.copy( ab.cross( ao ).cross( ab ) );
    			this.negativeD.copy( direction).negate();
	    	}
	    	else {
	    		direction.copy( ao );
    			this.negativeD.copy( direction).negate();
	    	}
	    } 

	    // If the simplex is a triangle 
	    else if( simplex.length === 3 ) { 

	        // a is the point added last to the simplex 
	        var a = simplex[2],
	        	b = simplex[1],
	        	c = simplex[0],
	    		ao = ( new THREE.Vector3() ).copy( a ).negate(),
	    		ab = ( new THREE.Vector3() ).addVectors( b, a ),
	    		ac = ( new THREE.Vector3() ).addVectors( c, a ),
	    		abc = ( new THREE.Vector3() ).copy( ab ).cross( ac );

	    	plane.position.copy( ao );

	    	if( abc.cross( ac ).dot( ao ) > 0 ) {
	    		if( ac.dot( ao ) > 0 ) {
	    			simplex.length = 0;
	    			simplex.push( c );
	    			simplex.push( a );
	    			direction.copy( ac.cross( ao ).cross( ac ) );
	    			this.negativeD.copy( direction).negate();
	    		}
	    		else if( ab.dot( ao ) > 0 ) {
	    			simplex.length = 0;
	    			simplex.push( b );
	    			simplex.push( a );
	    			direction.copy( ab.cross( ao ).cross( ab ) );
	    			this.negativeD.copy( direction).negate();
	    		}
	    		else {
	    			simplex.length = 0;
	    			simplex.push( a );
	    			direction.copy( ao );
	    			this.negativeD.copy( direction).negate();
	    		}
	    	}

	    	else {
	    		if( ab.cross( abc ).dot( ao ) > 0 ) {
	    			if( ab.dot( ao ) > 0 ) {
	    				simplex.length = 0;
	    				simplex.push( b );
	    				simplex.push( a );
	    				direction.copy( ab.cross( ao ).cross( ab ) );
	    				this.negativeD.copy( direction).negate();
	    			}
	    			else {
	    				simplex.length = 0;
	    				simplex.push( a );
	    				direction.copy( ao );
	    				this.negativeD.copy( direction).negate();
	    			}
	    		}
	    		else {
	    			if( abc.dot( ao ) > 0 ) {
	    				direction.copy( abc );
	    				this.negativeD.copy( direction).negate();
	    			}
	    			else {
	    				simplex.length = 0;
	    				simplex.push( b );
	    				simplex.push( c );
	    				simplex.push( a );
	    				direction.copy( abc.negate() );
	    				this.negativeD.copy( direction).negate();
	    			}
	    		}
	    	}
	    } 

	    // If the simplex is a tetrahedron 
	    else {
	    	var a = simplex[3],
	    		b = simplex[2],
	    		c = simplex[1],
	    		d = simplex[0],
	    		ao = ( new THREE.Vector3() ).copy( a ).negate(),
	    		ab = ( new THREE.Vector3() ).addVectors( b, a ),
	    		ac = ( new THREE.Vector3() ).addVectors( c, a ),
	    		ad = ( new THREE.Vector3() ).addVectors( d, a ),
	    		abc = ( new THREE.Vector3() ).copy( ab ).cross( ac ),
	    		acd = ( new THREE.Vector3() ).copy( ac ).cross( ad ),
	    		adb = ( new THREE.Vector3() ).copy( ad ).cross( ab ),

	    		// The side (positive or negative) of B, C and D relative 
	    		// to the planes of ACD, ADB and ABC respectively.
	    		bSideOnACD = Math.sign( acd.dot( ab ) ),
	    		cSideOnADB = Math.sign( adb.dot( ac ) ),
	    		dSideOnABC = Math.sign( abc.dot( ad ) ),

	    		// If the origin is on the same side as all B, C and D, 
	    		// the origin is inside the tetrahedron and thus there is a collision.
	    		abSameAsOrigin = Math.sign( acd.dot( ao ) ) === bSideOnACD,
	    		acSameAsOrigin = Math.sign( adb.dot( ao ) ) === cSideOnADB,
	    		adSameAsOrigin = Math.sign( abc.dot( ao ) ) === dSideOnABC;

	    	plane.position.copy( ao );

	    	if( abSameAsOrigin && acSameAsOrigin && adSameAsOrigin ) {
	    		return true;
	    	}

	    	// If the origin is not on the side of B relative to ACD 
	    	else if( !abSameAsOrigin ) {
	    		// B is farthest from the origin among all of the tetrahedron's 
	    		// points, so remove it from the list and go on with the triangle case 
	            simplex.remove( b );

	            // The new direction is on the other side of ACD, relative to B 
	    		direction.copy( acd.multiplyScalar( -bSideOnACD ) );
	    		this.negativeD.copy( direction).negate();
	    	}

	    	// If the origin is not on the side of C relative to ADB 
	    	else if( !acSameAsOrigin ) {
	    		// C is farthest from the origin among all of the tetrahedron's points, 
	    		// so remove it from the list and go on with the triangle case 
	            simplex.remove( c );
	    		
	    		// The new direction is on the other side of ADB, relative to C 
	            direction.copy( adb.multiplyScalar( -cSideOnADB ) );
	            this.negativeD.copy( direction).negate();
	    	}

	    	// If the origin is not on the side of D relative to ABC 
	    	else {
	    		// D is farthest from the origin among all of the tetrahedron's points, 
	    		// so remove it from the list and go on with the triangle case 
	            simplex.remove( d );
	    		
	    		// The new direction is on the other side of ABC, relative to D 
	            direction.copy( abc.multiplyScalar( -dSideOnABC ) );
	            this.negativeD.copy( direction).negate();
	    	}

	    	// Go on with the triangle case 
	        // TODO: maybe we should restrict the depth of the recursion, just like 
	        // we restricted the number of iterations in BodiesIntersect? 
	        return this.updateSimplexAndDirection( simplex, direction, true );
	    }

	    // No intersection found in this iteration.
	    return false;
	}
};