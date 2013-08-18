// Some necessary Math and Array functions.
if( typeof Math.sign !== 'function' ) {
	Math.sign = function( x ) { return x ? x < 0 ? -1 : 1 : 0; };
}

if( typeof Array.prototype.remove !== 'function' ) {
	Array.prototype.remove = function( o ) {
		for( var i = 0; i < this.length; ++i ) {
			if( this[i] === o ) {
				this.splice(i, 1);
				break;
			}
		}
	};
}


/**
 *	Implements the Gilbert-Johnson-Keerthi collision detection algorithm.
 *		A port of Orlin Georgiev's C# implementation from the MollyRocket
 *		forums: 
 *			https://mollyrocket.com/forums/viewtopic.php?t=797
 *
 *		Based on MollyRocket GJK video: 
 *			https://mollyrocket.com/849
 */
function GJK( opts ) {
	var options = {
		maxIterations: 20,
		maxSimplexRecursions: 10
	};

	if( opts ) {
		for( var i in opts ) {
			options[i] = opts[i];
		}
	}


	// Create two arrays to hold the transformed vertices of the meshes 
	// being compared.
	var vertices1 = [],
		vertices2 = [];

	// An array to store the simplex vertices.
	var simplexList = [];


	// A counter to keep track of how many recursions we're doing 
	// in the simplex calculation
	var recursionDepth = 0;


	// Create a pool to share vectors
	var pool = new Pool( 500, THREE.Vector3 );

	// Assign a reset function to the pool to reset vectors to zero-position
	// when released.
	pool.reset = function( vector ) {
		vector.set( 0, 0, 0 );
	};


	// A vector to store the direction towards the origin if a collision is
	// detected.
	var collisionDirectionForMesh1 = pool.get(),
		collisionDirectionForMesh2 = pool.get();

	// References to meshes currently being tested for collision
	var storedMesh1, storedMesh2;


	// Transform a mesh's vertices to world co-ordinates. If we're dealing 
	// with a 2d plane then use mesh.geometry vertices instead of faces.
	var transformToWorldCoordinates = function( mesh, array ) {
		var isPlane = ( mesh.geometry.faces.length === 1 ),
			points = ( isPlane ? mesh.geometry.vertices : mesh.geometry.faces );

		// Reset the array we're using to store the transformed co-ords
		array.length = 0;

		// Make sure the mesh's world position is updated.
		mesh.updateMatrixWorld();

		// Grab all faces in the mesh's geometry, copy its position to a new
		// vector from the pool, then transform its values to the matrixWorld 
		// position.
		for( var i = 0; i < points.length; ++i ) {
			array.push(
				( pool.get() ).copy( 
					( isPlane ? points[i] : points[i].centroid )
				).applyMatrix4( mesh.matrixWorld )
			);
		}

		return array;
	};


	// The main collision detection function.
	var intersect = function( mesh1, mesh2 ) {

		// Store the meshes so we can reference them later when we detect
		// a collision
		storedMesh1 = mesh1;
		storedMesh2 = mesh2;

		// Transform the meshes vertices to world co-ordinates, using the two
		// arrays defined above to store these transformed vertices.
		var v1 = transformToWorldCoordinates( mesh1, vertices1 ),
			v2 = transformToWorldCoordinates( mesh2, vertices2 ),

			// Grab an arbitrary starting point.
			initialPoint = ( pool.get() ).subVectors( v1[0], v2[0] ),

			// Search the vertices to find the maximum point on the Minkowski sum
			s = maxPointInMinkDiffAlongDir( v1, v2, initialPoint ),

			// Set the first search direction to be the inverse of our first maximum
			// point.
			d = ( pool.get() ).copy( s ).negate();


		// Reset the simplexList
		simplexList.length = 0;

		// Put our first maximum point into the simplexList.
		simplexList.push( s );

		// Release the initial point since we don't need it anymore.
		pool.release( initialPoint );


		// Loop while we're under the maxiumum number of iterations
		for( var i = 0, a; i < options.maxIterations; ++i ) {

			// Get a new point in our search direction on the Minkowski sum
			// shape.
			a = maxPointInMinkDiffAlongDir( v1, v2, d );

			// If the dot product of this new point is less than zero, 
			// our meshes aren't colliding, so stop here.
			if( a.dot( d ) < 0 ) {
				return false;
			}

			// Store our new point in the simplex list, creating either a
			// line, triangle, or tetrahedron, depending where in the
			// algorithm we are.
			simplexList.push( a );

			// Check the simplex list for a collision. If this function returns
			// true, then our objects are overlapping, so release our vertices
			// back into the vector pool and return true;
			if( updateSimplexAndDirection( simplexList, d ) ) {
				for( var i = 0; i < v1.length; ++i ) {
					pool.release( v1[i] );
				}
				
				for( var i = 0; i < v2.length; ++i ) {
					pool.release( v2[i] );
				}

				for( var i = 0; i < simplexList.length; ++i ) {
					pool.release( simplexList[i] );
				}

				return true;
			}
		}

		// If we've reached this point, we've completed our maximum iterations
		// and haven't found a collision, so return false.
		return false;
	};

	// Finds the farthest point along a given direction of the Minkowski difference 
	// of two convex polyhedra. 
    // Called Support in the video lecture: max(D.Ai) - max(-D.Bj) 
	var maxPointInMinkDiffAlongDir = function( v1, v2, direction ) {
		var vector = pool.get(),
			inverseDirection = ( pool.get() ).copy( direction ).negate();

		vector.subVectors(
        	maxPointAlongDirection( v1, direction ), 
        	maxPointAlongDirection( v2, inverseDirection )
        );

        pool.release( inverseDirection );
        inverseDirection = null;

        return vector;
    };

	// Finds the farthest point along a given direction of a convex polyhedron 
    var maxPointAlongDirection = function( vertices, direction ) { 
    	var max = vertices[0];

    	for( var i = 0; i < vertices.length; ++i ) {
    		if( max.dot( direction ) < vertices[i].dot( direction ) ) {
    			max = vertices[i];
    		}
    	}

        return max; 
    };


    // Solve for a line simplex (if we only have two points in the simplex)
    var solveForLineSimplex = function( simplex, direction ) {
    	// a is the point added last to the simplex 
    	var a = simplex[1],
    		b = simplex[0],
    		ab = ( pool.get() ).subVectors( b, a ),
    		ao = ( pool.get() ).copy( a ).negate();

    	plane.position.copy( ao );

    	if( ab.dot( ao ) > 0 ) {
    		direction.copy( ab.cross( ao ).cross( ab ) );
    	}
    	else {
    		direction.copy( ao );
    	}

    	pool.release( ab );
    	pool.release( ao );
    };

    // Solve for a triangle simplex (three points in the simplex)
    var solveForTriangleSimplex = function( simplex, direction ) {
    	// a is the point added last to the simplex 
        var a = simplex[2],
        	b = simplex[1],
        	c = simplex[0],
    		ao = ( pool.get() ).copy( a ).negate(),
    		ab = ( pool.get() ).subVectors( b, a ),
    		ac = ( pool.get() ).subVectors( c, a ),
    		abc = ( pool.get() ).copy( ab ).cross( ac ),
    		abcCopy = ( pool.get() ).copy( abc ),
    		abCopy = ( pool.get() ).copy( ab );

    	plane.position.copy( ao );

    	if( abcCopy.cross( ac ).dot( ao ) > 0 ) {
    		if( ac.dot( ao ) > 0 ) {
    			simplex.length = 0;
    			simplex.push( c );
    			simplex.push( a );
    			direction.copy( ac.cross( ao ).cross( ac ) );
    		}
    		else if( ab.dot( ao ) > 0 ) {
    			simplex.length = 0;
    			simplex.push( b );
    			simplex.push( a );
    			direction.copy( ab.cross( ao ).cross( ab ) );
    		}
    		else {
    			simplex.length = 0;
    			simplex.push( a );
    			direction.copy( ao );
    		}
    	}

    	else {
    		if( abCopy.cross( abc ).dot( ao ) > 0 ) {
    			if( ab.dot( ao ) > 0 ) {
    				simplex.length = 0;
    				simplex.push( b );
    				simplex.push( a );
    				direction.copy( ab.cross( ao ).cross( ab ) );
    			}
    			else {
    				simplex.length = 0;
    				simplex.push( a );
    				direction.copy( ao );
    			}
    		}
    		else {
    			if( abc.dot( ao ) > 0 ) {
    				direction.copy( abc );
    			}
    			else {
    				simplex.length = 0;
    				simplex.push( b );
    				simplex.push( c );
    				simplex.push( a );
    				direction.copy( abc.negate() );
    			}
    		}
    	}

    	pool.release( ao );
    	pool.release( ab );
    	pool.release( ac );
    	pool.release( abc );
    	pool.release( abcCopy );
    	pool.release( abCopy );
    };

    // Solve for a tetrahedron simplex (four points in the simplex, the most we
    // will ever have)
    var solveForTetrahedronSimplex = function( simplex, direction ) {
    	var a = simplex[3],
    		b = simplex[2],
    		c = simplex[1],
    		d = simplex[0],
    		ao = ( pool.get() ).copy( a ).negate(),
    		ab = ( pool.get() ).subVectors( b, a ),
    		ac = ( pool.get() ).subVectors( c, a ),
    		ad = ( pool.get() ).subVectors( d, a ),
    		abc = ( pool.get() ).copy( ab ).cross( ac ),
    		acd = ( pool.get() ).copy( ac ).cross( ad ),
    		adb = ( pool.get() ).copy( ad ).cross( ab ),

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
    	// plane.geometry.vertices[0].copy( a );
    	// plane.geometry.vertices[1].copy( b );
    	// plane.geometry.vertices[2].copy( c );
    	// plane.geometry.vertices[3].copy( d );
    	// plane.geometry.verticesNeedUpdate = true;

    	if( abSameAsOrigin && acSameAsOrigin && adSameAsOrigin ) {
    		
    		ao.normalize();

    		// Find out the vector direction for mesh1
    		collisionDirectionForMesh1.set( 0, 0, 0 );
    		collisionDirectionForMesh1.subVectors( storedMesh1.position, ao ).normalize();

    		// Find out the vector direction for mesh2
    		collisionDirectionForMesh2.set( 0, 0, 0 );
    		collisionDirectionForMesh2.subVectors( storedMesh2.position, ao ).normalize();

    		// Release the vectors we don't need anymore
    		pool.release( ao );
    		pool.release( ab );
    		pool.release( ac );
    		pool.release( ad );
    		pool.release( abc );
    		pool.release( acd );
    		pool.release( adb );

    		// Return true to indicate a collision has happened
    		return true;
    	}

    	// If the origin is not on the side of B relative to ACD 
    	else if( !abSameAsOrigin ) {
    		// B is farthest from the origin among all of the tetrahedron's 
    		// points, so remove it from the list and go on with the triangle case 
            simplex.remove( b );

            // The new direction is on the other side of ACD, relative to B 
    		direction.copy( acd.multiplyScalar( -bSideOnACD ) );
    	}

    	// If the origin is not on the side of C relative to ADB 
    	else if( !acSameAsOrigin ) {
    		// C is farthest from the origin among all of the tetrahedron's points, 
    		// so remove it from the list and go on with the triangle case 
            simplex.remove( c );
    		
    		// The new direction is on the other side of ADB, relative to C 
            direction.copy( adb.multiplyScalar( -cSideOnADB ) );
    	}

    	// If the origin is not on the side of D relative to ABC 
    	else {
    		// D is farthest from the origin among all of the tetrahedron's points, 
    		// so remove it from the list and go on with the triangle case 
            simplex.remove( d );
    		
    		// The new direction is on the other side of ABC, relative to D 
            direction.copy( abc.multiplyScalar( -dSideOnABC ) );
    	}

    	// Release the vectors we don't need anymore
		pool.release( ao );
		pool.release( ab );
		pool.release( ac );
		pool.release( ad );
		pool.release( abc );
		pool.release( acd );
		pool.release( adb );

    	// Go on with the triangle case 
        // TODO: maybe we should restrict the depth of the recursion, just like 
        // we restricted the number of iterations in BodiesIntersect? 
        return updateSimplexAndDirection( simplex, direction, true );
    };


    // Updates the current simplex and the direction in which to look for the origin. 
    // Called DoSimplex in the video lecture. 
	var updateSimplexAndDirection = function( simplex, direction, isRecursing ) {

		if( !isRecursing ) {
			recursionDepth = 0;
		}
		else if( ( ++recursionDepth ) > options.maxSimplexRecursions ) {
			return false;
		}

	    // If the simplex is a line 
	    if( simplex.length === 2 ) { 
	    	solveForLineSimplex( simplex, direction );
	    } 

	    // If the simplex is a triangle 
	    else if( simplex.length === 3 ) { 
	    	solveForTriangleSimplex( simplex, direction );
	    } 

	    // If the simplex is a tetrahedron (note that this solver returns 
	    // the collision detection result)
	    else {
	    	return solveForTetrahedronSimplex( simplex, direction );
	    }

	    // No intersection found in this iteration.
	    return false;
	};

	// Expose only the intersect function
	this.intersect = intersect;

	this.collisionDirectionForMesh1 = collisionDirectionForMesh1;
	this.collisionDirectionForMesh2 = collisionDirectionForMesh2;
}