var THREE = {};


// based on https://github.com/documentcloud/underscore/blob/bf657be243a075b5e72acc8a83e6f12a564d8f55/underscore.js#L767
THREE.extend = function ( obj, source ) {

	// ECMAScript5 compatibility based on: http://www.nczonline.net/blog/2012/12/11/are-your-mixins-ecmascript-5-compatible/
	if ( Object.keys ) {

		var keys = Object.keys( source );

		for (var i = 0, il = keys.length; i < il; i++) {

			var prop = keys[i];
			Object.defineProperty( obj, prop, Object.getOwnPropertyDescriptor( source, prop ) );

		}

	} else {

		var safeHasOwnProperty = {}.hasOwnProperty;

		for ( var prop in source ) {

			if ( safeHasOwnProperty.call( source, prop ) ) {

				obj[prop] = source[prop];

			}

		}

	}

	return obj;
};



/**
 * @author mikael emtinger / http://gomo.se/
 * @author alteredq / http://alteredqualia.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://exocortex.com
 */

THREE.Quaternion = function( x, y, z, w ) {

	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
	this.w = ( w !== undefined ) ? w : 1;

};

THREE.Quaternion.prototype = {

	constructor: THREE.Quaternion,

	set: function ( x, y, z, w ) {

		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;

		return this;

	},

	copy: function ( q ) {

		this.x = q.x;
		this.y = q.y;
		this.z = q.z;
		this.w = q.w;

		return this;

	},

	setFromEuler: function ( v, order ) {

		// http://www.mathworks.com/matlabcentral/fileexchange/
		// 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
		//	content/SpinCalc.m

		var c1 = Math.cos( v.x / 2 );
		var c2 = Math.cos( v.y / 2 );
		var c3 = Math.cos( v.z / 2 );
		var s1 = Math.sin( v.x / 2 );
		var s2 = Math.sin( v.y / 2 );
		var s3 = Math.sin( v.z / 2 );

		if ( order === undefined || order === 'XYZ' ) {

			this.x = s1 * c2 * c3 + c1 * s2 * s3;
			this.y = c1 * s2 * c3 - s1 * c2 * s3;
			this.z = c1 * c2 * s3 + s1 * s2 * c3;
			this.w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( order === 'YXZ' ) {

			this.x = s1 * c2 * c3 + c1 * s2 * s3;
			this.y = c1 * s2 * c3 - s1 * c2 * s3;
			this.z = c1 * c2 * s3 - s1 * s2 * c3;
			this.w = c1 * c2 * c3 + s1 * s2 * s3;

		} else if ( order === 'ZXY' ) {

			this.x = s1 * c2 * c3 - c1 * s2 * s3;
			this.y = c1 * s2 * c3 + s1 * c2 * s3;
			this.z = c1 * c2 * s3 + s1 * s2 * c3;
			this.w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( order === 'ZYX' ) {

			this.x = s1 * c2 * c3 - c1 * s2 * s3;
			this.y = c1 * s2 * c3 + s1 * c2 * s3;
			this.z = c1 * c2 * s3 - s1 * s2 * c3;
			this.w = c1 * c2 * c3 + s1 * s2 * s3;

		} else if ( order === 'YZX' ) {

			this.x = s1 * c2 * c3 + c1 * s2 * s3;
			this.y = c1 * s2 * c3 + s1 * c2 * s3;
			this.z = c1 * c2 * s3 - s1 * s2 * c3;
			this.w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if ( order === 'XZY' ) {

			this.x = s1 * c2 * c3 - c1 * s2 * s3;
			this.y = c1 * s2 * c3 - s1 * c2 * s3;
			this.z = c1 * c2 * s3 + s1 * s2 * c3;
			this.w = c1 * c2 * c3 + s1 * s2 * s3;

		}

		return this;

	},

	setFromAxisAngle: function ( axis, angle ) {

		// from http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
		// axis have to be normalized

		var halfAngle = angle / 2,
			s = Math.sin( halfAngle );

		this.x = axis.x * s;
		this.y = axis.y * s;
		this.z = axis.z * s;
		this.w = Math.cos( halfAngle );

		return this;

	},

	setFromRotationMatrix: function ( m ) {

		// http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		var te = m.elements,

			m11 = te[0], m12 = te[4], m13 = te[8],
			m21 = te[1], m22 = te[5], m23 = te[9],
			m31 = te[2], m32 = te[6], m33 = te[10],

			trace = m11 + m22 + m33,
			s;

		if ( trace > 0 ) {

			s = 0.5 / Math.sqrt( trace + 1.0 );

			this.w = 0.25 / s;
			this.x = ( m32 - m23 ) * s;
			this.y = ( m13 - m31 ) * s;
			this.z = ( m21 - m12 ) * s;

		} else if ( m11 > m22 && m11 > m33 ) {

			s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

			this.w = (m32 - m23 ) / s;
			this.x = 0.25 * s;
			this.y = (m12 + m21 ) / s;
			this.z = (m13 + m31 ) / s;

		} else if ( m22 > m33 ) {

			s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

			this.w = (m13 - m31 ) / s;
			this.x = (m12 + m21 ) / s;
			this.y = 0.25 * s;
			this.z = (m23 + m32 ) / s;

		} else {

			s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

			this.w = ( m21 - m12 ) / s;
			this.x = ( m13 + m31 ) / s;
			this.y = ( m23 + m32 ) / s;
			this.z = 0.25 * s;

		}

		return this;

	},

	inverse: function () {

		this.conjugate().normalize();

		return this;

	},

	conjugate: function () {

		this.x *= -1;
		this.y *= -1;
		this.z *= -1;

		return this;

	},

	lengthSq: function () {

		return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;

	},

	length: function () {

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w );

	},

	normalize: function () {

		var l = this.length();

		if ( l === 0 ) {

			this.x = 0;
			this.y = 0;
			this.z = 0;
			this.w = 1;

		} else {

			l = 1 / l;

			this.x = this.x * l;
			this.y = this.y * l;
			this.z = this.z * l;
			this.w = this.w * l;

		}

		return this;

	},

	multiply: function ( q, p ) {

		if ( p !== undefined ) {

			console.warn( 'DEPRECATED: Quaternion\'s .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.' );
			return this.multiplyQuaternions( q, p );

		}

		return this.multiplyQuaternions( this, q );

	},

	multiplyQuaternions: function ( a, b ) {

		// from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

		var qax = a.x, qay = a.y, qaz = a.z, qaw = a.w;
		var qbx = b.x, qby = b.y, qbz = b.z, qbw = b.w;

		this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
		this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
		this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
		this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

		return this;

	},

	multiplyVector3: function ( vector ) {

		console.warn( 'DEPRECATED: Quaternion\'s .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.' );
		return vector.applyQuaternion( this );

	},

	slerp: function ( qb, t ) {

		var x = this.x, y = this.y, z = this.z, w = this.w;

		// http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

		var cosHalfTheta = w * qb.w + x * qb.x + y * qb.y + z * qb.z;

		if ( cosHalfTheta < 0 ) {

			this.w = -qb.w;
			this.x = -qb.x;
			this.y = -qb.y;
			this.z = -qb.z;

			cosHalfTheta = -cosHalfTheta;

		} else {

			this.copy( qb );

		}

		if ( cosHalfTheta >= 1.0 ) {

			this.w = w;
			this.x = x;
			this.y = y;
			this.z = z;

			return this;

		}

		var halfTheta = Math.acos( cosHalfTheta );
		var sinHalfTheta = Math.sqrt( 1.0 - cosHalfTheta * cosHalfTheta );

		if ( Math.abs( sinHalfTheta ) < 0.001 ) {

			this.w = 0.5 * ( w + this.w );
			this.x = 0.5 * ( x + this.x );
			this.y = 0.5 * ( y + this.y );
			this.z = 0.5 * ( z + this.z );

			return this;

		}

		var ratioA = Math.sin( ( 1 - t ) * halfTheta ) / sinHalfTheta,
		ratioB = Math.sin( t * halfTheta ) / sinHalfTheta;

		this.w = ( w * ratioA + this.w * ratioB );
		this.x = ( x * ratioA + this.x * ratioB );
		this.y = ( y * ratioA + this.y * ratioB );
		this.z = ( z * ratioA + this.z * ratioB );

		return this;

	},

	equals: function ( v ) {

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) && ( v.w === this.w ) );

	},

	fromArray: function ( array ) {

		this.x = array[ 0 ];
		this.y = array[ 1 ];
		this.z = array[ 2 ];
		this.w = array[ 3 ];

		return this;

	},

	toArray: function () {

		return [ this.x, this.y, this.z, this.w ];

	},

	clone: function () {

		return new THREE.Quaternion( this.x, this.y, this.z, this.w );

	}

};

THREE.Quaternion.slerp = function ( qa, qb, qm, t ) {

	return qm.copy( qa ).slerp( qb, t );

}


/**
 * @author mrdoob / http://mrdoob.com/
 * @author *kile / http://kile.stravaganza.org/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */

// Rewritten to use Typed Array

THREE.Vector3 = function ( x, y, z ) {
	x = x || 0;
	y = y || 0;
	z = z || 0;

	this.elements = new Float64Array( 3 );
	this.set( x, y, z );
};

THREE.Vector3.prototype = {

	constructor: THREE.Vector3,

	get x() {

		return this.elements[ 0 ];

	},

	set x( value ) {

		this.elements[ 0 ] = value;

	},

	get y() {

		return this.elements[ 1 ];

	},

	set y( value ) {

		this.elements[ 1 ] = value;

	},

	get z() {

		return this.elements[ 2 ];

	},

	set z( value ) {

		this.elements[ 2 ] = value;

	},

	set: function ( x, y, z ) {
		var elements = this.elements;

		elements[0] = x;
		elements[1] = y;
		elements[2] = z;

		return this;

	},

	setX: function ( x ) {

		this.elements[0] = x;

		return this;

	},

	setY: function ( y ) {

		this.elements[1] = y;

		return this;

	},

	setZ: function ( z ) {

		this.elements[2] = z;

		return this;

	},

	setComponent: function ( index, value ) {

		if(index < 3) {
			this.elements[ index ] = value;
		}
		else {
			throw new Error( "index is out of range: " + index );
		}

	},

	getComponent: function ( index ) {
		if( index < 3 ) {
			return this.elements[ index ];
		}
		else {
			throw new Error( "index is out of range: " + index );
		}
	},

	copy: function ( v ) {
		var elements = this.elements,
			vElements = v.elements;

		elements[0] = vElements[0];
		elements[1] = vElements[1];
		elements[2] = vElements[2];

		return this;

	},

	add: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'DEPRECATED: Vector3\'s .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		var elements = this.elements,
			vElements = v.elements;

		elements[0] += vElements[0];
		elements[1] += vElements[1];
		elements[2] += vElements[2];

		return this;

	},

	addScalar: function ( s ) {

		var elements = this.elements;

		elements[0] += s;
		elements[1] += s;
		elements[2] += s;

		return this;

	},

	addVectors: function ( a, b ) {
		var elements = this.elements,
			aElements = a.elements,
			bElements = b.elements;

		elements[0] = aElements[0] + bElements[0];
		elements[1] = aElements[1] + bElements[1];
		elements[2] = aElements[2] + bElements[2];

		return this;

	},

	sub: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'DEPRECATED: Vector3\'s .sub() now only accepts one argument. Use .subVectors( a, b ) instead.' );
			return this.subVectors( v, w );

		}


		var elements = this.elements,
			vElements = v.elements;

		elements[0] -= vElements[0];
		elements[1] -= vElements[1];
		elements[2] -= vElements[2];


		return this;

	},

	subVectors: function ( a, b ) {

		var elements = this.elements,
			aElements = a.elements,
			bElements = b.elements;

		elements[0] = aElements[0] - bElements[0];
		elements[1] = aElements[1] - bElements[1];
		elements[2] = aElements[2] - bElements[2];

		return this;

	},

	multiply: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'DEPRECATED: Vector3\'s .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.' );
			return this.multiplyVectors( v, w );

		}

		var elements = this.elements,
			vElements = v.elements;

		elements[0] *= vElements[0];
		elements[1] *= vElements[1];
		elements[2] *= vElements[2];

		return this;

	},

	multiplyScalar: function ( s ) {

		var elements = this.elements;

		elements[0] *= s;
		elements[1] *= s;
		elements[2] *= s;

		return this;

	},

	multiplyVectors: function ( a, b ) {

		var elements = this.elements,
			aElements = a.elements,
			bElements = b.elements;

		elements[0] = aElements[0] * bElements[0];
		elements[1] = aElements[1] * bElements[1];
		elements[2] = aElements[2] * bElements[2];

		return this;

	},

	applyMatrix3: function ( m ) {

		var elements = this.elements;
		var x = elements[0];
		var y = elements[1];
		var z = elements[2];

		var e = m.elements;

		elements[0] = e[0] * x + e[3] * y + e[6] * z;
		elements[1] = e[1] * x + e[4] * y + e[7] * z;
		elements[2] = e[2] * x + e[5] * y + e[8] * z;

		return this;

	},

	applyMatrix4: function ( m ) {

		// input: THREE.Matrix4 affine matrix
		var elements = this.elements;
		var x = elements[0], y = elements[1], z = elements[2];

		var e = m.elements;

		elements[0] = e[0] * x + e[4] * y + e[8]  * z + e[12];
		elements[1] = e[1] * x + e[5] * y + e[9]  * z + e[13];
		elements[2] = e[2] * x + e[6] * y + e[10] * z + e[14];

		return this;

	},

	applyProjection: function ( m ) {

		// input: THREE.Matrix4 projection matrix

		var elements = this.elements;
		var x = elements[0];
		var y = elements[1];
		var z = elements[2];

		var e = m.elements;
		var d = 1 / ( e[3] * x + e[7] * y + e[11] * z + e[15] ); // perspective divide

		elements[0] = ( e[0] * x + e[4] * y + e[8]  * z + e[12] ) * d;
		elements[1] = ( e[1] * x + e[5] * y + e[9]  * z + e[13] ) * d;
		elements[2] = ( e[2] * x + e[6] * y + e[10] * z + e[14] ) * d;

		return this;

	},

	applyQuaternion: function ( q ) {

		var elements = this.elements;
		var x = elements[0];
		var y = elements[1];
		var z = elements[2];

		var qx = q.x;
		var qy = q.y;
		var qz = q.z;
		var qw = q.w;

		// calculate quat * vector

		var ix =  qw * x + qy * z - qz * y;
		var iy =  qw * y + qz * x - qx * z;
		var iz =  qw * z + qx * y - qy * x;
		var iw = -qx * x - qy * y - qz * z;

		// calculate result * inverse quat

		elements[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
		elements[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
		elements[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;

		return this;

	},

	transformDirection: function ( m ) {

		// input: THREE.Matrix4 affine matrix
		// vector interpreted as a direction

		var elements = this.elements;
		var x = elements[0];
		var y = elements[1];
		var z = elements[2];

		var e = m.elements;

		elements[0] = e[0] * x + e[4] * y + e[8]  * z;
		elements[1] = e[1] * x + e[5] * y + e[9]  * z;
		elements[2] = e[2] * x + e[6] * y + e[10] * z;

		this.normalize();

		return this;

	},

	divide: function ( v ) {
		var elements = this.elements,
			vElements = v.elements;

		elements[0] /= vElements[0];
		elements[1] /= vElements[1];
		elements[2] /= vElements[2];

		return this;

	},

	divideScalar: function ( s ) {
		var elements = this.elements;

		if ( s !== 0 ) {

			elements[0] /= s;
			elements[1] /= s;
			elements[2] /= s;

		} else {

			elements[0] = 0;
			elements[1] = 0;
			elements[2] = 0;

		}

		return this;

	},

	min: function ( v ) {
		var elements = this.elements,
			vElements = v.elements;

		var vx = vElements[0],
			vy = vElements[1],
			vz = vElements[2];

		if ( elements[0] > vx ) {

			elements[0] =  vx;

		}

		if ( elements[1] > vy ) {

			elements[1] =  vy;

		}

		if ( elements[2] > vz ) {

			elements[2] =  vz;

		}

		return this;

	},

	max: function ( v ) {
		var elements = this.elements,
			vElements = v.elements,
			vx = vElements[0],
			vy = vElements[1],
			vz = vElements[2];

		if ( elements[0] < vx ) {

			elements[0] = vx;

		}

		if ( elements[1] < vy ) {

			elements[1] = vy;

		}

		if ( elements[2] < vz ) {

			elements[2] =  vz;

		}

		return this;

	},

	clamp: function ( min, max ) {

		var elements = this.elements,
			minElements = min.elements,
			maxElements = max.elements,
			minX = minElements[0],
			minY = minElements[1],
			minZ = minElements[2],
			maxX = maxElements[0],
			maxY = maxElements[1],
			maxZ = maxElements[2],
			x = elements[0],
			y = elements[1],
			z = elements[2];

		// This function assumes min < max, if this assumption isn't true it will not operate correctly

		if ( x < minX ) {

			elements[0] = minX;

		} else if ( x > maxX ) {

			elements[0] = maxX;

		}

		if ( y < minY ) {

			elements[1] = minY;

		} else if ( y > maxY ) {

			elements[1] = maxY;

		}

		if ( z < minZ ) {

			elements[2] = minZ;

		} else if ( z > maxZ ) {

			elements[2] = maxZ;

		}

		return this;

	},

	negate: function () {

		return this.multiplyScalar( - 1 );

	},

	dot: function ( v ) {
		var elements = this.elements,
			vElements = v.elements;

		return elements[0] * vElements[0] + elements[1] * vElements[1] + elements[2] * vElements[2];

	},

	lengthSq: function () {
		var elements = this.elements,
			x = elements[0],
			y = elements[1],
			z = elements[2];

		return x * x + y * y + z * z;

	},

	length: function () {

		return Math.sqrt( this.lengthSq() );

	},

	lengthManhattan: function () {
		var elements = this.elements;
		return Math.abs( elements[0] ) + Math.abs( elements[1] ) + Math.abs( elements[2] );

	},

	normalize: function () {

		return this.divideScalar( this.length() );

	},

	setLength: function ( l ) {

		var oldLength = this.length();

		if ( oldLength !== 0 && l !== oldLength  ) {

			this.multiplyScalar( l / oldLength );
		}

		return this;

	},

	lerp: function ( v, alpha ) {

		var elements = this.elements,
			vElements = v.elements;


		elements[0] += ( vElements[0] - elements[0] ) * alpha;
		elements[1] += ( vElements[1] - elements[1] ) * alpha;
		elements[2] += ( vElements[2] - elements[2] ) * alpha;

		return this;

	},

	cross: function ( v, w ) {

		if ( w !== undefined ) {

			console.warn( 'DEPRECATED: Vector3\'s .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.' );
			return this.crossVectors( v, w );

		}

		var elements = this.elements,
			vElements = v.elements,
			x = elements[0], y = elements[1], z = elements[2],
			vx = vElements[0], vy = vElements[1], vz = vElements[2];

		elements[0] = y * vz - z * vy;
		elements[1] = z * vx - x * vz;
		elements[2] = x * vy - y * vx;

		return this;

	},

	crossVectors: function ( a, b ) {

		var elements = this.elements,
			aElements = a.elements,
			bElements = b.elements,
			ax = aElements[0], ay = aElements[1], az = aElements[2],
			bx = bElements[0], by = bElements[1], bz = bElements[2];

		elements[0] = ay * bz - az * by;
		elements[1] = az * bx - ax * bz;
		elements[2] = ax * by - ay * bx;

		return this;

	},

	angleTo: function ( v ) {

		var theta = this.dot( v ) / ( this.length() * v.length() );

		// clamp, to handle numerical problems

		return Math.acos( THREE.Math.clamp( theta, -1, 1 ) );

	},

	distanceTo: function ( v ) {

		return Math.sqrt( this.distanceToSquared( v ) );

	},

	distanceToSquared: function ( v ) {

		var elements = this.elements,
			vElements = v.elements;

		var dx = elements[0] - vElements[0];
		var dy = elements[1] - vElements[1];
		var dz = elements[2] - vElements[2];

		return dx * dx + dy * dy + dz * dz;

	},

	setEulerFromRotationMatrix: function ( m, order ) {

		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

		// clamp, to handle numerical problems

		function clamp( x ) {

			return Math.min( Math.max( x, -1 ), 1 );

		}

		var elements = this.elements;
		var te = m.elements;
		var m11 = te[0], m12 = te[4], m13 = te[8];
		var m21 = te[1], m22 = te[5], m23 = te[9];
		var m31 = te[2], m32 = te[6], m33 = te[10];

		if ( order === undefined || order === 'XYZ' ) {

			elements[1] = Math.asin( clamp( m13 ) );

			if ( Math.abs( m13 ) < 0.99999 ) {

				elements[0] = Math.atan2( - m23, m33 );
				elements[2] = Math.atan2( - m12, m11 );

			} else {

				elements[0] = Math.atan2( m32, m22 );
				elements[2] = 0;

			}

		} else if ( order === 'YXZ' ) {

			elements[0] = Math.asin( - clamp( m23 ) );

			if ( Math.abs( m23 ) < 0.99999 ) {

				elements[1] = Math.atan2( m13, m33 );
				elements[2] = Math.atan2( m21, m22 );

			} else {

				elements[1] = Math.atan2( - m31, m11 );
				elements[2] = 0;

			}

		} else if ( order === 'ZXY' ) {

			elements[0] = Math.asin( clamp( m32 ) );

			if ( Math.abs( m32 ) < 0.99999 ) {

				elements[1] = Math.atan2( - m31, m33 );
				elements[2] = Math.atan2( - m12, m22 );

			} else {

				elements[1] = 0;
				elements[2] = Math.atan2( m21, m11 );

			}

		} else if ( order === 'ZYX' ) {

			elements[1] = Math.asin( - clamp( m31 ) );

			if ( Math.abs( m31 ) < 0.99999 ) {

				elements[0] = Math.atan2( m32, m33 );
				elements[2] = Math.atan2( m21, m11 );

			} else {

				elements[0] = 0;
				elements[2] = Math.atan2( - m12, m22 );

			}

		} else if ( order === 'YZX' ) {

			elements[2] = Math.asin( clamp( m21 ) );

			if ( Math.abs( m21 ) < 0.99999 ) {

				elements[0] = Math.atan2( - m23, m22 );
				elements[1] = Math.atan2( - m31, m11 );

			} else {

				elements[0] = 0;
				elements[1] = Math.atan2( m13, m33 );

			}

		} else if ( order === 'XZY' ) {

			elements[2] = Math.asin( - clamp( m12 ) );

			if ( Math.abs( m12 ) < 0.99999 ) {

				elements[0] = Math.atan2( m32, m22 );
				elements[1] = Math.atan2( m13, m11 );

			} else {

				elements[0] = Math.atan2( - m23, m33 );
				elements[1] = 0;

			}

		}

		return this;

	},

	setEulerFromQuaternion: function ( q, order ) {

		// q is assumed to be normalized

		// clamp, to handle numerical problems

		function clamp( x ) {

			return Math.min( Math.max( x, -1 ), 1 );

		}

		// http://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/content/SpinCalc.m

		var elements = this.elements;
		var sqx = q.x * q.x;
		var sqy = q.y * q.y;
		var sqz = q.z * q.z;
		var sqw = q.w * q.w;

		if ( order === undefined || order === 'XYZ' ) {

			elements[0] = Math.atan2( 2 * ( q.x * q.w - q.y * q.z ), ( sqw - sqx - sqy + sqz ) );
			elements[1] = Math.asin(  clamp( 2 * ( q.x * q.z + q.y * q.w ) ) );
			elements[2] = Math.atan2( 2 * ( q.z * q.w - q.x * q.y ), ( sqw + sqx - sqy - sqz ) );

		} else if ( order ===  'YXZ' ) {

			elements[0] = Math.asin(  clamp( 2 * ( q.x * q.w - q.y * q.z ) ) );
			elements[1] = Math.atan2( 2 * ( q.x * q.z + q.y * q.w ), ( sqw - sqx - sqy + sqz ) );
			elements[2] = Math.atan2( 2 * ( q.x * q.y + q.z * q.w ), ( sqw - sqx + sqy - sqz ) );

		} else if ( order === 'ZXY' ) {

			elements[0] = Math.asin(  clamp( 2 * ( q.x * q.w + q.y * q.z ) ) );
			elements[1] = Math.atan2( 2 * ( q.y * q.w - q.z * q.x ), ( sqw - sqx - sqy + sqz ) );
			elements[2] = Math.atan2( 2 * ( q.z * q.w - q.x * q.y ), ( sqw - sqx + sqy - sqz ) );

		} else if ( order === 'ZYX' ) {

			elements[0] = Math.atan2( 2 * ( q.x * q.w + q.z * q.y ), ( sqw - sqx - sqy + sqz ) );
			elements[1] = Math.asin(  clamp( 2 * ( q.y * q.w - q.x * q.z ) ) );
			elements[2] = Math.atan2( 2 * ( q.x * q.y + q.z * q.w ), ( sqw + sqx - sqy - sqz ) );

		} else if ( order === 'YZX' ) {

			elements[0] = Math.atan2( 2 * ( q.x * q.w - q.z * q.y ), ( sqw - sqx + sqy - sqz ) );
			elements[1] = Math.atan2( 2 * ( q.y * q.w - q.x * q.z ), ( sqw + sqx - sqy - sqz ) );
			elements[2] = Math.asin(  clamp( 2 * ( q.x * q.y + q.z * q.w ) ) );

		} else if ( order === 'XZY' ) {

			elements[0] = Math.atan2( 2 * ( q.x * q.w + q.y * q.z ), ( sqw - sqx + sqy - sqz ) );
			elements[1] = Math.atan2( 2 * ( q.x * q.z + q.y * q.w ), ( sqw + sqx - sqy - sqz ) );
			elements[2] = Math.asin(  clamp( 2 * ( q.z * q.w - q.x * q.y ) ) );

		}

		return this;

	},

	getPositionFromMatrix: function ( m ) {

		var elements = this.elements;

		elements[0] = m.elements[12];
		elements[1] = m.elements[13];
		elements[2] = m.elements[14];

		return this;

	},

	getScaleFromMatrix: function ( m ) {

		var elements = this.elements;
		var sx = this.set( m.elements[0], m.elements[1], m.elements[2] ).length();
		var sy = this.set( m.elements[4], m.elements[5], m.elements[6] ).length();
		var sz = this.set( m.elements[8], m.elements[9], m.elements[10] ).length();

		elements[0] = sx;
		elements[1] = sy;
		elements[2] = sz;

		return this;
	},

	getColumnFromMatrix: function ( index, matrix ) {

		var elements = this.elements;

		var offset = index * 4;

		var me = matrix.elements;

		elements[0] = me[ offset ];
		elements[1] = me[ offset + 1 ];
		elements[2] = me[ offset + 2 ];

		return this;

	},

	equals: function ( v ) {
		var elements = this.elements,
			vElements = v.elements;

		return ( ( vElements[0] === elements[0] ) && ( vElements[1] === elements[1] ) && ( vElements[2] === elements[2] ) );

	},

	fromArray: function ( array ) {

		var elements = this.elements;

		elements[0] = array[ 0 ];
		elements[1] = array[ 1 ];
		elements[2] = array[ 2 ];

		return this;

	},

	toArray: function () {

		var elements = this.elements;

		return [ elements[0], elements[1], elements[2] ];

	},

	clone: function () {

		var elements = this.elements;

		return new THREE.Vector3( elements[0], elements[1], elements[2] );

	}

};

THREE.extend( THREE.Vector3.prototype, {

	applyEuler: function () {

		var q1 = new THREE.Quaternion();

		return function ( v, eulerOrder ) {

			var quaternion = q1.setFromEuler( v, eulerOrder );

			this.applyQuaternion( quaternion );

			return this;

		};

	}(),

	applyAxisAngle: function () {

		var q1 = new THREE.Quaternion();

		return function ( axis, angle ) {

			var quaternion = q1.setFromAxisAngle( axis, angle );

			this.applyQuaternion( quaternion );

			return this;

		};

	}(),

	projectOnVector: function () {

		var v1 = new THREE.Vector3();

		return function ( vector ) {

			v1.copy( vector ).normalize();
			var d = this.dot( v1 );
			return this.copy( v1 ).multiplyScalar( d );

		};

	}(),

	projectOnPlane: function () {

		var v1 = new THREE.Vector3();

		return function ( planeNormal ) {

			v1.copy( this ).projectOnVector( planeNormal );

			return this.sub( v1 );

		}

	}(),

	reflect: function () {

		var v1 = new THREE.Vector3();

		return function ( vector ) {

		    v1.copy( this ).projectOnVector( vector ).multiplyScalar( 2 );

		    return this.subVectors( v1, this );

		}

	}()

} );



/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.Color = function ( value ) {

	if ( value !== undefined ) this.set( value );

	return this;

};

THREE.Color.prototype = {

	constructor: THREE.Color,

	r: 1, g: 1, b: 1,

	set: function ( value ) {

		if ( value instanceof THREE.Color ) {

			this.copy( value );

		} else if ( typeof value === 'number' ) {

			this.setHex( value );

		} else if ( typeof value === 'string' ) {

			this.setStyle( value );

		}

		return this;

	},

	setHex: function ( hex ) {

		hex = Math.floor( hex );

		this.r = ( hex >> 16 & 255 ) / 255;
		this.g = ( hex >> 8 & 255 ) / 255;
		this.b = ( hex & 255 ) / 255;

		return this;

	},

	setRGB: function ( r, g, b ) {

		this.r = r;
		this.g = g;
		this.b = b;

		return this;

	},

	setHSL: function ( h, s, l ) {

		// h,s,l ranges are in 0.0 - 1.0

		if ( s === 0 ) {

			this.r = this.g = this.b = l;

		} else {

			var hue2rgb = function ( p, q, t ) {

				if ( t < 0 ) t += 1;
				if ( t > 1 ) t -= 1;
				if ( t < 1 / 6 ) return p + ( q - p ) * 6 * t;
				if ( t < 1 / 2 ) return q;
				if ( t < 2 / 3 ) return p + ( q - p ) * 6 * ( 2 / 3 - t );
				return p;

			};

			var p = l <= 0.5 ? l * ( 1 + s ) : l + s - ( l * s );
			var q = ( 2 * l ) - p;

			this.r = hue2rgb( q, p, h + 1 / 3 );
			this.g = hue2rgb( q, p, h );
			this.b = hue2rgb( q, p, h - 1 / 3 );

		}

		return this;

	},

	setStyle: function ( style ) {

		// rgb(255,0,0)

		if ( /^rgb\((\d+),(\d+),(\d+)\)$/i.test( style ) ) {

			var color = /^rgb\((\d+),(\d+),(\d+)\)$/i.exec( style );

			this.r = Math.min( 255, parseInt( color[ 1 ], 10 ) ) / 255;
			this.g = Math.min( 255, parseInt( color[ 2 ], 10 ) ) / 255;
			this.b = Math.min( 255, parseInt( color[ 3 ], 10 ) ) / 255;

			return this;

		}

		// rgb(100%,0%,0%)

		if ( /^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.test( style ) ) {

			var color = /^rgb\((\d+)\%,(\d+)\%,(\d+)\%\)$/i.exec( style );

			this.r = Math.min( 100, parseInt( color[ 1 ], 10 ) ) / 100;
			this.g = Math.min( 100, parseInt( color[ 2 ], 10 ) ) / 100;
			this.b = Math.min( 100, parseInt( color[ 3 ], 10 ) ) / 100;

			return this;

		}

		// #ff0000

		if ( /^\#([0-9a-f]{6})$/i.test( style ) ) {

			var color = /^\#([0-9a-f]{6})$/i.exec( style );

			this.setHex( parseInt( color[ 1 ], 16 ) );

			return this;

		}

		// #f00

		if ( /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test( style ) ) {

			var color = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec( style );

			this.setHex( parseInt( color[ 1 ] + color[ 1 ] + color[ 2 ] + color[ 2 ] + color[ 3 ] + color[ 3 ], 16 ) );

			return this;

		}

		// red

		if ( /^(\w+)$/i.test( style ) ) {

			this.setHex( THREE.ColorKeywords[ style ] );

			return this;

		}


	},

	copy: function ( color ) {

		this.r = color.r;
		this.g = color.g;
		this.b = color.b;

		return this;

	},

	copyGammaToLinear: function ( color ) {

		this.r = color.r * color.r;
		this.g = color.g * color.g;
		this.b = color.b * color.b;

		return this;

	},

	copyLinearToGamma: function ( color ) {

		this.r = Math.sqrt( color.r );
		this.g = Math.sqrt( color.g );
		this.b = Math.sqrt( color.b );

		return this;

	},

	convertGammaToLinear: function () {

		var r = this.r, g = this.g, b = this.b;

		this.r = r * r;
		this.g = g * g;
		this.b = b * b;

		return this;

	},

	convertLinearToGamma: function () {

		this.r = Math.sqrt( this.r );
		this.g = Math.sqrt( this.g );
		this.b = Math.sqrt( this.b );

		return this;

	},

	getHex: function () {

		return ( this.r * 255 ) << 16 ^ ( this.g * 255 ) << 8 ^ ( this.b * 255 ) << 0;

	},

	getHexString: function () {

		return ( '000000' + this.getHex().toString( 16 ) ).slice( - 6 );

	},

	getHSL: function () {

		var hsl = { h: 0, s: 0, l: 0 };

		return function () {

			// h,s,l ranges are in 0.0 - 1.0

			var r = this.r, g = this.g, b = this.b;

			var max = Math.max( r, g, b );
			var min = Math.min( r, g, b );

			var hue, saturation;
			var lightness = ( min + max ) / 2.0;

			if ( min === max ) {

				hue = 0;
				saturation = 0;

			} else {

				var delta = max - min;

				saturation = lightness <= 0.5 ? delta / ( max + min ) : delta / ( 2 - max - min );

				switch ( max ) {

					case r: hue = ( g - b ) / delta + ( g < b ? 6 : 0 ); break;
					case g: hue = ( b - r ) / delta + 2; break;
					case b: hue = ( r - g ) / delta + 4; break;

				}

				hue /= 6;

			}

			hsl.h = hue;
			hsl.s = saturation;
			hsl.l = lightness;

			return hsl;

		};

	}(),

	getStyle: function () {

		return 'rgb(' + ( ( this.r * 255 ) | 0 ) + ',' + ( ( this.g * 255 ) | 0 ) + ',' + ( ( this.b * 255 ) | 0 ) + ')';

	},

	offsetHSL: function ( h, s, l ) {

		var hsl = this.getHSL();

		hsl.h += h; hsl.s += s; hsl.l += l;

		this.setHSL( hsl.h, hsl.s, hsl.l );

		return this;

	},

	add: function ( color ) {

		this.r += color.r;
		this.g += color.g;
		this.b += color.b;

		return this;

	},

	addColors: function ( color1, color2 ) {

		this.r = color1.r + color2.r;
		this.g = color1.g + color2.g;
		this.b = color1.b + color2.b;

		return this;

	},

	addScalar: function ( s ) {

		this.r += s;
		this.g += s;
		this.b += s;

		return this;

	},

	multiply: function ( color ) {

		this.r *= color.r;
		this.g *= color.g;
		this.b *= color.b;

		return this;

	},

	multiplyScalar: function ( s ) {

		this.r *= s;
		this.g *= s;
		this.b *= s;

		return this;

	},

	lerp: function ( color, alpha ) {

		this.r += ( color.r - this.r ) * alpha;
		this.g += ( color.g - this.g ) * alpha;
		this.b += ( color.b - this.b ) * alpha;

		return this;

	},

	equals: function ( c ) {

		return ( c.r === this.r ) && ( c.g === this.g ) && ( c.b === this.b );

	},

	clone: function () {

		return new THREE.Color().setRGB( this.r, this.g, this.b );

	}

};

THREE.ColorKeywords = { "aliceblue": 0xF0F8FF, "antiquewhite": 0xFAEBD7, "aqua": 0x00FFFF, "aquamarine": 0x7FFFD4, "azure": 0xF0FFFF,
"beige": 0xF5F5DC, "bisque": 0xFFE4C4, "black": 0x000000, "blanchedalmond": 0xFFEBCD, "blue": 0x0000FF, "blueviolet": 0x8A2BE2,
"brown": 0xA52A2A, "burlywood": 0xDEB887, "cadetblue": 0x5F9EA0, "chartreuse": 0x7FFF00, "chocolate": 0xD2691E, "coral": 0xFF7F50,
"cornflowerblue": 0x6495ED, "cornsilk": 0xFFF8DC, "crimson": 0xDC143C, "cyan": 0x00FFFF, "darkblue": 0x00008B, "darkcyan": 0x008B8B,
"darkgoldenrod": 0xB8860B, "darkgray": 0xA9A9A9, "darkgreen": 0x006400, "darkgrey": 0xA9A9A9, "darkkhaki": 0xBDB76B, "darkmagenta": 0x8B008B,
"darkolivegreen": 0x556B2F, "darkorange": 0xFF8C00, "darkorchid": 0x9932CC, "darkred": 0x8B0000, "darksalmon": 0xE9967A, "darkseagreen": 0x8FBC8F,
"darkslateblue": 0x483D8B, "darkslategray": 0x2F4F4F, "darkslategrey": 0x2F4F4F, "darkturquoise": 0x00CED1, "darkviolet": 0x9400D3,
"deeppink": 0xFF1493, "deepskyblue": 0x00BFFF, "dimgray": 0x696969, "dimgrey": 0x696969, "dodgerblue": 0x1E90FF, "firebrick": 0xB22222,
"floralwhite": 0xFFFAF0, "forestgreen": 0x228B22, "fuchsia": 0xFF00FF, "gainsboro": 0xDCDCDC, "ghostwhite": 0xF8F8FF, "gold": 0xFFD700,
"goldenrod": 0xDAA520, "gray": 0x808080, "green": 0x008000, "greenyellow": 0xADFF2F, "grey": 0x808080, "honeydew": 0xF0FFF0, "hotpink": 0xFF69B4,
"indianred": 0xCD5C5C, "indigo": 0x4B0082, "ivory": 0xFFFFF0, "khaki": 0xF0E68C, "lavender": 0xE6E6FA, "lavenderblush": 0xFFF0F5, "lawngreen": 0x7CFC00,
"lemonchiffon": 0xFFFACD, "lightblue": 0xADD8E6, "lightcoral": 0xF08080, "lightcyan": 0xE0FFFF, "lightgoldenrodyellow": 0xFAFAD2, "lightgray": 0xD3D3D3,
"lightgreen": 0x90EE90, "lightgrey": 0xD3D3D3, "lightpink": 0xFFB6C1, "lightsalmon": 0xFFA07A, "lightseagreen": 0x20B2AA, "lightskyblue": 0x87CEFA,
"lightslategray": 0x778899, "lightslategrey": 0x778899, "lightsteelblue": 0xB0C4DE, "lightyellow": 0xFFFFE0, "lime": 0x00FF00, "limegreen": 0x32CD32,
"linen": 0xFAF0E6, "magenta": 0xFF00FF, "maroon": 0x800000, "mediumaquamarine": 0x66CDAA, "mediumblue": 0x0000CD, "mediumorchid": 0xBA55D3,
"mediumpurple": 0x9370DB, "mediumseagreen": 0x3CB371, "mediumslateblue": 0x7B68EE, "mediumspringgreen": 0x00FA9A, "mediumturquoise": 0x48D1CC,
"mediumvioletred": 0xC71585, "midnightblue": 0x191970, "mintcream": 0xF5FFFA, "mistyrose": 0xFFE4E1, "moccasin": 0xFFE4B5, "navajowhite": 0xFFDEAD,
"navy": 0x000080, "oldlace": 0xFDF5E6, "olive": 0x808000, "olivedrab": 0x6B8E23, "orange": 0xFFA500, "orangered": 0xFF4500, "orchid": 0xDA70D6,
"palegoldenrod": 0xEEE8AA, "palegreen": 0x98FB98, "paleturquoise": 0xAFEEEE, "palevioletred": 0xDB7093, "papayawhip": 0xFFEFD5, "peachpuff": 0xFFDAB9,
"peru": 0xCD853F, "pink": 0xFFC0CB, "plum": 0xDDA0DD, "powderblue": 0xB0E0E6, "purple": 0x800080, "red": 0xFF0000, "rosybrown": 0xBC8F8F,
"royalblue": 0x4169E1, "saddlebrown": 0x8B4513, "salmon": 0xFA8072, "sandybrown": 0xF4A460, "seagreen": 0x2E8B57, "seashell": 0xFFF5EE,
"sienna": 0xA0522D, "silver": 0xC0C0C0, "skyblue": 0x87CEEB, "slateblue": 0x6A5ACD, "slategray": 0x708090, "slategrey": 0x708090, "snow": 0xFFFAFA,
"springgreen": 0x00FF7F, "steelblue": 0x4682B4, "tan": 0xD2B48C, "teal": 0x008080, "thistle": 0xD8BFD8, "tomato": 0xFF6347, "turquoise": 0x40E0D0,
"violet": 0xEE82EE, "wheat": 0xF5DEB3, "white": 0xFFFFFF, "whitesmoke": 0xF5F5F5, "yellow": 0xFFFF00, "yellowgreen": 0x9ACD32 };










function Particle() {
	this.position = null;
	this.velocity = null;
	this.acceleration = null;

	this.color = new THREE.Color();
	this.colorVector = new THREE.Vector3();
	this.opacity = 1;

	this.angle = 0.0;
	this.angleVelocity = 0;
	this.angleAcceleration = 0;

	this.age = 0;
	this.alive = 0.0;
	this.size = 10;
}

Particle.prototype = {
	update: function( dt ) {
		this.position.x += this.velocity.x * dt;
		this.position.y += this.velocity.y * dt;
		this.position.z += this.velocity.z * dt;

		this.velocity.x += this.acceleration.x * dt;
		this.velocity.y += this.acceleration.y * dt;
		this.velocity.z += this.acceleration.z * dt;

		this.angle         += this.angleVelocity     * 0.01745329251 * dt;
		this.angleVelocity += this.angleAcceleration * 0.01745329251 * dt;

		this.age += dt;
	}
};


function ParticleEmitter( options ) {
	this.hasInitialized = false;
	this.particlesPerSecond = 	options.particlesPerSecond || 10;
	this.maxAge 			= 	options.maxAge || 5;

	this.position 			=	options.position 		|| new THREE.Vector3();
	this.acceleration 		=	options.acceleration 	|| new THREE.Vector3();
	this.velocity 			= 	options.velocity 		|| new THREE.Vector3();
	this.angle 				= 	options.angle 			|| new THREE.Vector3();
	this.size 				=	options.size 			|| new THREE.Vector3();
	this.opacity 			= 	options.opacity 		|| 0;
	this.color 				=	options.color 			|| new THREE.Vector3();

	this.positionSpread		=	options.positionSpread;
	this.accelerationSpread =	options.accelerationSpread;
	this.velocitySpread		= 	options.velocitySpread;
	this.angleSpread 		= 	options.angleSpread;
	this.sizeSpread 		= 	options.sizeSpread;
	this.opacitySpread		= 	options.opacitySpread;
	this.colorSpread 		=	options.colorSpread;

	this.opacityTweenTo 	=	options.opacityTweenTo;
	this.sizeTweenTo 		= 	options.sizeTweenTo;
	this.colorTweenTo 		=	options.colorTweenTo;

	this.emitterDuration 	= 	options.emitterDuration;

	this.particleCount = this.particlesPerSecond * this.maxAge;
	this.lerpAmount = 1 / (this.maxAge * 10);

	this.particles = [];
	this.recycledIndices = [];
	this.alive = 1;
	this.age = 0;
	this.materialAttributes = null;
	this.groupStartIndex = 0;
	this.firstRun = 1;

	if( options.autoInitialize ) {
		this.initialize();
	}
}

ParticleEmitter.prototype = {

	_randomizeVector: function( vector, spread, invert ) {
		if( !invert ) {
			vector.x += spread.x * (Math.random() - 0.5);
			vector.y += spread.y * (Math.random() - 0.5);
			vector.z += spread.z * (Math.random() - 0.5);
		}

		else {
			vector.x = spread.x * -invert.x / 200;
			vector.y = spread.y * -invert.y / 200;
			vector.z = spread.z * -invert.z / 200;
		}
	},

	_randomizeColor: function( vector, spread ) {
		if(spread.x) {
			vector.x = spread.x * (Math.random() - 0.5);
		}

		if(spread.y) {
			vector.y = spread.y * (Math.random() - 0.5);
		}

		if(spread.z) {
			vector.z = spread.z * (Math.random() - 0.5);
		}
	},

	_randomValue: function( base, spread ) {
		return base + spread * (Math.random() - 0.5);
	},

	_lerp: function( start, end, amount ) {
		return (start + ( ( end - start ) * amount ) );
	},

	initialize: function() {
		if( this.hasInitialized ) return;

		for( var i = 0, particle; i < this.particleCount; ++i ) {
			particle = this.createParticle();
			this.particles.push( particle );
		}

		this.hasInitialized = true;
	},

	createParticle: function() {
		var particle = new Particle();

		particle.position = new THREE.Vector3( this.position.x, this.position.y, this.position.z );
		particle.velocity = new THREE.Vector3( this.velocity.x, this.velocity.y, this.velocity.z );
		particle.acceleration = new THREE.Vector3( this.acceleration.x, this.acceleration.y, this.acceleration.z );

		particle.size = this.size;
		particle.colorVector.copy( this.color );
		particle.color.setHSL( this.color.x, this.color.y, this.color.z );
		particle.opacity = this.opacity;
		particle.angle = this.angle;

		this.applySpreads( particle );

		return particle;
	},

	update: function( dt ) {
		if(!this.alive) return;

		var recycled = this.recycledIndices,
			aliveCount = 0,
			particle;

		recycled.length = 0;

		for( var i = 0; i < this.particleCount; ++i ) {
			particle = this.particles[i];

			if( !particle ) return;

			if( particle.alive ) {

				++aliveCount;
				particle.update( dt );

				if( particle.age >= this.maxAge || this.firstRun ) {
					particle.alive = 0.0;
					recycled.push( i );
				}

				if( typeof this.opacityTweenTo === 'number' ) {
					particle.opacity = this._lerp( particle.opacity, this.opacityTweenTo, this.lerpAmount );
				}

				if( typeof this.sizeTweenTo === 'number' ) {
					particle.size = this._lerp( particle.size, this.sizeTweenTo, this.lerpAmount );
				}

				if( this.colorTweenTo ) {
					particle.colorVector.x = this._lerp( particle.colorVector.x, this.colorTweenTo.x, this.lerpAmount );
					particle.colorVector.y = this._lerp( particle.colorVector.y, this.colorTweenTo.y, this.lerpAmount );
					particle.colorVector.z = this._lerp( particle.colorVector.z, this.colorTweenTo.z, this.lerpAmount );

					particle.color.setHSL(
						particle.colorVector.x,
						particle.colorVector.y,
						particle.colorVector.z
					);
				}

				this.materialAttributes.customVisible.value[i + this.groupStartIndex] = particle.alive;
				this.materialAttributes.customColor.value[i + this.groupStartIndex]   = particle.color;
				this.materialAttributes.customOpacity.value[i + this.groupStartIndex] = particle.opacity;
				this.materialAttributes.customSize.value[i + this.groupStartIndex]    = particle.size;
				this.materialAttributes.customAngle.value[i + this.groupStartIndex]   = particle.angle;
			}
		}

		this.firstRun = 0;

		if( this.age > this.emitterDuration ) {
			if(aliveCount === 0) {
				this.alive = 0;
			}
			return;
		}

		if( this.age < this.maxAge ) {
			// determine indices of particles to activate
			var startIndex 	= Math.round( this.particlesPerSecond * this.age );
			var endIndex 	= Math.round( this.particlesPerSecond * (this.age + dt) );

			if( endIndex > this.particleCount ) {
				endIndex = this.particleCount;
			}
		}


		for( i = startIndex; i < endIndex; i++ ) {
			this.particles[i].alive = 1.0;
		}

		for( var j = 0; j < recycled.length; ++j ) {
			this.resetParticle( this.particles[ recycled[j] ] );
		}

		this.age += dt;
	},

	resetParticle: function( p ) {
		p.position.set( this.position.x, this.position.y, this.position.z );
		p.velocity.set( this.velocity.x, this.velocity.y, this.velocity.z );
		p.alive = 1.0; // activate right away
		p.age = 0;
		p.opacity = this.opacity;
		p.size = this.size;
		p.colorVector.copy( this.color );
		p.color.setHSL( this.color.x, this.color.y, this.color.z );

		this.applySpreads( p );
	},

	applySpreads: function( p ) {
		if( this.positionSpread ) {
			this._randomizeVector( p.position, this.positionSpread );
		}

		if( this.velocitySpread ) {
			this._randomizeVector( p.velocity, this.velocitySpread );
			// this._randomizeVector( p.acceleration, this.velocitySpread, p.velocity );
		}

		if( this.accelerationSpread ) {
			this._randomizeVector( p.acceleration, this.accelerationSpread );
		}

		if( this.angleSpread ) {
			p.angle = this._randomValue( this.angle, this.angleSpread );
		}

		if( this.sizeSpread ) {
			p.size = this._randomValue( this.size, this.sizeSpread );
		}

		if( this.opacitySpread ) {
			p.opacity = this._randomValue( this.opacity, this.opacitySpread );
		}

		if( this.colorSpread ) {
			this._randomizeColor( this.color, this.colorSpread );
			p.color.setHSL( this.color.x, this.color.y, this.color.z );
		}
	}
};



var emitters = [];




var onmessage = function( e ) {
	var d = e.data;

	if( d.message === 'createEmitter' ) {
		var emitter = new ParticleEmitter( d.options );
	}

	postMessage( e.data );
};