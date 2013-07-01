var Vector3Pool = function( length ) {
    var pool = [];

    this.get = function(x, y, z) {
        var vec;

        if( pool.length ) {
            vec = pool.pop();
        }
        else {
            vec = new THREE.Vector3();
        }

        vec.set(x || 0, y || 0, z || 0);
        return vec;
    };


    this.release = function( v ) {
        this.reset( v );
        pool.push(v)
    };

    this.reset = function( v ) {
        v.set( 0, 0, 0 );
    };


    while( --length >= 0 ) {
        pool.push( new THREE.Vector3() );
    }
};



function TypedVector3Pool( length ) {
    this.size = size;

    var memory = new Float64Array( length * 3 ),
        index = -1,
        released = [];

    this.get = function() {
        ++index;

        if( index < length ) {
            return index;
        }
        else if( index >= length-1 && released.length ) {
            return released.pop();
        }
        else {
            throw new Error('Pool ran out');
        }
    };

    this.release = function( i ) {
        this.reset( i );
        released.push( i );
    };

    this.reset = function( i ) {
        var j = 3;

        i = i * 3;

        while( --j >= 0 ) {
            memory[ i + j ] = 0;
        }
    };


    this.getMemory = function() {
        return memory;
    };


    this.getX = function( i ) {
        return memory[ i * 3 ];
    };
    this.getY = function( i ) {
        return memory[ i * 3 + 1 ];
    };
    this.getZ = function( i ) {
        return memory[ i * 3 + 2 ];
    };

    this.setX = function( i, val ) {
        memory[ i * 3 ] = val;

        return this;
    };
    this.setY = function( i, val ) {
        memory[ i * 3 + 1 ] = val;

        return this;
    };
    this.setZ = function( i, val ) {
        memory[ i * 3 + 1] = val;

        return this;
    };


    this.set = function( i, x, y, z ) {
        i *= 3;
        memory[ i ] = x;
        memory[ i + 1 ] = y;
        memory[ i + 2 ] = z;

        return this;
    };


    this.getComponent = function( i, index ) {
        if(index < this.size) {
            return memory[ i * 3 + index ];
        }
        else {
            throw new Error( 'Index out of range: ' + index );
        }
    };

    this.copy = function( i, source ) {
        i *= 3;
        source *= 3;

        memory[ i ]     = memory[ source ];
        memory[ i + 1 ] = memory[ source + 1 ];
        memory[ i + 2 ] = memory[ source + 2 ];

        return this;
    };


    this.add = function( i, source ) {
        i *= 3;
        source *= 3;

        memory[ i ]     += memory[ source ];
        memory[ i + 1 ] += memory[ source + 1 ];
        memory[ i + 2 ] += memory[ source + 2 ];

        return this;
    };

    this.addScalar = function( i, s ) {
        i *= 3;

        memory[ i ]     += s
        memory[ i + 1 ] += s;
        memory[ i + 2 ] += s;

        return this;
    };

    this.addVectors = function( i, a, b ) {
        i *= 3;
        a *= 3;
        b *= 3;

        memory[ i ]     = memory[ a ]     + memory[ b ];
        memory[ i + 1 ] = memory[ a + 1 ] + memory[ b + 1 ];
        memory[ i + 2 ] = memory[ a + 2 ] + memory[ b + 2 ];

        return this;
    };


    this.sub = function( i, source ) {
        i *= 3;
        source *= 3;

        memory[ i ]     -= memory[ source ];
        memory[ i + 1 ] -= memory[ source + 1 ];
        memory[ i + 2 ] -= memory[ source + 2 ];

        return this;
    };

    this.subVectors = function( i, a, b ) {
        i *= 3;
        a *= 3;
        b *= 3;

        memory[ i ]     = memory[ a ]     - memory[ b ];
        memory[ i + 1 ] = memory[ a + 1 ] - memory[ b + 1 ];
        memory[ i + 2 ] = memory[ a + 2 ] - memory[ b + 2 ];

        return this;
    };


    this.multiply = function( i, source ) {
        i *= 3;
        source *= 3;

        memory[ i ]     *= memory[ source ];
        memory[ i + 1 ] *= memory[ source + 1 ];
        memory[ i + 2 ] *= memory[ source + 2 ];

        return this;
    };

    this.multiplyScalar = function( i, s ) {
        i *= 3;

        memory[ i ]     *= s
        memory[ i + 1 ] *= s;
        memory[ i + 2 ] *= s;

        return this;
    };

    this.multiplyVectors = function( i, a, b ) {
        i *= 3;
        a *= 3;
        b *= 3;

        memory[ i ]     = memory[ a ]     * memory[ b ];
        memory[ i + 1 ] = memory[ a + 1 ] * memory[ b + 1 ];
        memory[ i + 2 ] = memory[ a + 2 ] * memory[ b + 2 ];

        return this;
    };



    this.applyMatrix3 = function( i, m ) {
        i *= 3;

        var x = memory[i], y = memory[i+1], z = memory[i+2],
            e = m.elements;

        memory[ i ]     = e[0] * x + e[3] * y + e[6] * z;
        memory[ i + 1 ] = e[1] * x + e[4] * y + e[7] * z;
        memory[ i + 2 ] = e[2] * x + e[5] * y + e[8] * z;

        return this;
    };

    this.applyMatrix4 = function( i, m ) {
        i *= 3;

        var x = memory[i], y = memory[i+1], z = memory[i+2],
            e = m.elements;

        memory[ i ]     = e[0] * x + e[4] * y + e[8]  * z + e[12];
        memory[ i + 1 ] = e[1] * x + e[5] * y + e[9]  * z + e[13];
        memory[ i + 2 ] = e[2] * x + e[6] * y + e[10] * z + e[14];

        return this;
    };

    this.applyProjection = function( i, m ) {
        i *= 3;

        var x = memory[ i ];
        var y = memory[ i + 1 ];
        var z = memory[ i + 2 ];

        var e = m.elements;
        var d = 1 / ( e[3] * x + e[7] * y + e[11] * z + e[15] ); // perspective divide

        memory[ i ]     = ( e[0] * x + e[4] * y + e[8]  * z + e[12] ) * d;
        memory[ i + 1 ] = ( e[1] * x + e[5] * y + e[9]  * z + e[13] ) * d;
        memory[ i + 2 ] = ( e[2] * x + e[6] * y + e[10] * z + e[14] ) * d;

        return this;
    };

    this.applyQuaternion = function( i, q ) {
        var x = memory[ i ]    ;
        var y = memory[ i + 1 ];
        var z = memory[ i + 2 ];

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
        memory[ i ]     = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        memory[ i + 1 ] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        memory[ i + 2 ] = iz * qw + iw * -qz + ix * -qy - iy * -qx;

        return this;
    };

    this.transformDirection = function( i, m ) {
        var x = memory[ i ]    ;
        var y = memory[ i + 1 ];
        var z = memory[ i + 2 ];

        var e = m.elements;

        memory[ i ]     = e[0] * x + e[4] * y + e[8]  * z;
        memory[ i + 1 ] = e[1] * x + e[5] * y + e[9]  * z;
        memory[ i + 2 ] = e[2] * x + e[6] * y + e[10] * z;

        this.normalize();

        return this;
    };


    this.divide = function( i, source ) {
        i *= 3;
        source *= 3;

        memory[ i ]     /= memory[ source ];
        memory[ i + 1 ] /= memory[ source + 1 ];
        memory[ i + 2 ] /= memory[ source + 2 ];

        return this;
    };

    this.divideScalar = function( i, s ) {
        i *= 3;

        if ( s !== 0 ) {
            memory[ i ]     /= s;
            memory[ i + 1 ] /= s;
            memory[ i + 2 ] /= s;
        }
        else {
            memory[ i ]     = 0;
            memory[ i + 1 ] = 0;
            memory[ i + 2 ] = 0;
        }

        return this;
    };


    this.min = function( i, s ) {
        i *= 3;
        s *= 3;

        var vx = memory[s + 0],
            vy = memory[s + 1],
            vz = memory[s + 2];

        if ( memory[i] > vx ) {
            memory[i] =  vx;
        }

        if ( memory[i + 1] > vy ) {
            memory[i + 1] =  vy;
        }

        if ( memory[i + 2] > vz ) {
            memory[i + 2] =  vz;
        }

        return this;
    };

    this.max = function( i, s ) {
        i *= 3;
        s *= 3;

        var vx = memory[s + 0],
            vy = memory[s + 1],
            vz = memory[s + 2];

        if ( memory[i] < vx ) {
            memory[i] = vx;
        }

        if ( memory[i + 1] < vy ) {
            memory[i + 1] = vy;
        }

        if ( memory[i + 2] < vz ) {
            memory[i + 2] = vz;
        }

        return this;
    };

    this.clamp = function( i, min, max ) {

        i *= 3;
        min *= 3;
        max *= 3;

        var minX = memory[ min + 0 ],
            minY = memory[ min + 1 ],
            minZ = memory[ min + 2 ],
            maxX = memory[ max + 0],
            maxY = memory[ max + 1],
            maxZ = memory[ max + 2],
            x = memory[ i + 0 ],
            y = memory[ i + 1 ],
            z = memory[ i + 2 ];

        // This function assumes min < max, if this assumption isn't true it will not operate correctly

        if ( x < minX ) {
            memory[ i + 0 ] = minX;

        }
        else if ( x > maxX ) {
            memory[ i + 0 ] = maxX;
        }

        if ( y < minY ) {
            memory[ i + 1 ] = minY;
        }
        else if ( y > maxY ) {
            memory[ i + 1 ] = maxY;
        }

        if ( z < minZ ) {
            memory[ i + 2 ] = minZ;
        }
        else if ( z > maxZ ) {
            memory[ i + 2 ] = maxZ;
        }

        return this;
    };


    this.negate = function( i ) {
        return this.multiplyScalar( i, -1 );
    };

    this.dot = function( i, source ) {
        i *= 3;
        source *= 3;

        return memory[ i ] * memory[ source ] + memory[ i + 1 ] * source[ i + 1 ] + memory[ i + 2 ] * memory[ source + 2 ];
    };

    this.lengthSq = function( i ) {
        i *= 3;

        var x = memory[ i ], y = memory[ i + 1 ], z = memory[ 1 + 2 ];

        return x * x + y * y + z * z;
    };

    this.length = function( i ) {
        return Math.sqrt( this.lengthSq( i ) );
    };

    this.lengthManhattan = function( i ) {
        var abs = Math.abs;

        return abs( memory[ i ] ) + abs( memory[ i + 1 ] ) + abs( memory[ i + 2 ] );
    };

    this.normalize = function( i ) {
        return this.divideScalar( i, this.length() );
    };

    this.setLength = function( i, l ) {
        var oldLength = this.length();

        if( oldLength !== 0 && l !== oldLength ) {
            this.multiplyScalar( i, l / oldLength );
        }

        return this;
    };

    this.lerp = function( i, v, alpha ) {
        i *= 3;
        v *= 3;

        memory[ i ] += memory[ v ] - memory[ i ] * alpha;
        memory[ i + 1 ] += memory[ v + 1 ] - memory[ i + 1 ] * alpha;
        memory[ i + 2 ] += memory[ v + 2 ] - memory[ i + 2 ] * alpha;

        return this;
    };

    this.cross = function( i, v ) {
        i *= 3;
        v *= 3;

        var x = memory[i],
            y = memory[i+1],
            z = memory[i+2],
            vx = memory[v],
            vy = memory[v+1],
            vz = memory[v+2];

        memory[i]   = y * vz - z * vy;
        memory[i+1] = z * vx - x * vz;
        memory[i+2] = x * vy - y * vx;

        return this;
    };


    this.crossVectors = function( i, a, b ) {
        i *= 3;
        a *= 3;
        b *= 3;

        var ax = memory[a],
            ay = memory[a + 1],
            az = memory[a + 2],
            bx = memory[b],
            by = memory[b + 1],
            bz = memory[b + 2];

        memory[i]   = ay * bz - az * by;
        memory[i+1] = az * bx - ax * bz;
        memory[i+2] = ax * by - ay * bx;

        return this;
    };

    this.angleTo = function( i, v ) {
        var theta = this.dot( i, v ) / ( this.length( i )  * this.length( v ) );

        if( theta < -1 ) {
            theta = -1;
        }
        else if( theta > 1 ) {
            theta = 1;
        }

        return Math.acos( theta );
    };


    this.distanceTo = function( i, v ) {
        return Math.sqrt( this.distanceToSquared( i, v ) );
    };

    this.distanceToSquared = function( i, v ) {
        i *= 3;
        v *= 3;

        var dx = memory[i] - memory[v];
        var dy = memory[i+1] - memory[v + 1];
        var dz = memory[i+2] - memory[v + 2];

        return dx * dx + dy * dy + dz * dz;
    };


    this.setEulerFromRotationMatrix = function( i, m, order ) {
        i *= 3;

        function clamp( x ) {
            return Math.min( Math.max( x, -1 ), 1 );
        }

        var te = m.elements;
        var m11 = te[0], m12 = te[4], m13 = te[8];
        var m21 = te[1], m22 = te[5], m23 = te[9];
        var m31 = te[2], m32 = te[6], m33 = te[10];

        if( order === undefined || order === 'XYZ' ) {
            memory[i+1] = Math.asin( clamp( m13 ) );

            if ( Math.abs( m13 ) < 0.99999 ) {
                memory[i] = Math.atan2( - m23, m33 );
                memory[i+2] = Math.atan2( - m12, m11 );
            }
            else {
                memory[i] = Math.atan2( m32, m22 );
                memory[i+2] = 0;
            }
        }

        else if ( order === 'YXZ' ) {
            memory[i] = Math.asin( - clamp( m23 ) );

            if ( Math.abs( m23 ) < 0.99999 ) {
                memory[i+1] = Math.atan2( m13, m33 );
                memory[i+2] = Math.atan2( m21, m22 );
            }
            else {
                memory[i+1] = Math.atan2( - m31, m11 );
                memory[i+2] = 0;
            }
        }

        else if ( order === 'ZXY' ) {
            memory[i] = Math.asin( clamp( m32 ) );

            if ( Math.abs( m32 ) < 0.99999 ) {
                memory[i+1] = Math.atan2( - m31, m33 );
                memory[i+2] = Math.atan2( - m12, m22 );
            }
            else {
                memory[i+1] = 0;
                memory[i+2] = Math.atan2( m21, m11 );
            }
        }

        else if ( order === 'ZYX' ) {
            memory[i+1] = Math.asin( - clamp( m31 ) );

            if ( Math.abs( m31 ) < 0.99999 ) {
                memory[i] = Math.atan2( m32, m33 );
                memory[i+2] = Math.atan2( m21, m11 );
            }
            else {
                memory[i] = 0;
                memory[i+2] = Math.atan2( - m12, m22 );
            }
        }

        else if ( order === 'YZX' ) {
            memory[i+2] = Math.asin( clamp( m21 ) );

            if ( Math.abs( m21 ) < 0.99999 ) {
                memory[i] = Math.atan2( - m23, m22 );
                memory[i+1] = Math.atan2( - m31, m11 );
            }
            else {
                memory[i] = 0;
                memory[i+1] = Math.atan2( m13, m33 );
            }
        }

        else if ( order === 'XZY' ) {
            memory[i+2] = Math.asin( - clamp( m12 ) );

            if ( Math.abs( m12 ) < 0.99999 ) {
                memory[i] = Math.atan2( m32, m22 );
                memory[i+1] = Math.atan2( m13, m11 );
            }
            else {
                memory[i] = Math.atan2( - m23, m33 );
                memory[i+1] = 0;
            }
        }

        return this;
    };


    this.setEulerFromQuaternion = function( i, q, order ) {
        i *= 3;

        // q is assumed to be normalized

        // clamp, to handle numerical problems
        function clamp( x ) {
            return Math.min( Math.max( x, -1 ), 1 );
        }

        // http://www.mathworks.com/matlabcentral/fileexchange/20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/content/SpinCalc.m

        var sqx = q.x * q.x;
        var sqy = q.y * q.y;
        var sqz = q.z * q.z;
        var sqw = q.w * q.w;

        if ( order === undefined || order === 'XYZ' ) {
            memory[i]   = Math.atan2( 2 * ( q.x * q.w - q.y * q.z ), ( sqw - sqx - sqy + sqz ) );
            memory[i+1] = Math.asin(  clamp( 2 * ( q.x * q.z + q.y * q.w ) ) );
            memory[i+2] = Math.atan2( 2 * ( q.z * q.w - q.x * q.y ), ( sqw + sqx - sqy - sqz ) );
        }

        else if ( order ===  'YXZ' ) {
            memory[i]   = Math.asin(  clamp( 2 * ( q.x * q.w - q.y * q.z ) ) );
            memory[i+1] = Math.atan2( 2 * ( q.x * q.z + q.y * q.w ), ( sqw - sqx - sqy + sqz ) );
            memory[i+2] = Math.atan2( 2 * ( q.x * q.y + q.z * q.w ), ( sqw - sqx + sqy - sqz ) );
        }

        else if ( order === 'ZXY' ) {
            memory[i]   = Math.asin(  clamp( 2 * ( q.x * q.w + q.y * q.z ) ) );
            memory[i+1] = Math.atan2( 2 * ( q.y * q.w - q.z * q.x ), ( sqw - sqx - sqy + sqz ) );
            memory[i+2] = Math.atan2( 2 * ( q.z * q.w - q.x * q.y ), ( sqw - sqx + sqy - sqz ) );
        }

        else if ( order === 'ZYX' ) {
            memory[i]   = Math.atan2( 2 * ( q.x * q.w + q.z * q.y ), ( sqw - sqx - sqy + sqz ) );
            memory[i+1] = Math.asin(  clamp( 2 * ( q.y * q.w - q.x * q.z ) ) );
            memory[i+2] = Math.atan2( 2 * ( q.x * q.y + q.z * q.w ), ( sqw + sqx - sqy - sqz ) );
        }

        else if ( order === 'YZX' ) {
            memory[i]   = Math.atan2( 2 * ( q.x * q.w - q.z * q.y ), ( sqw - sqx + sqy - sqz ) );
            memory[i+1] = Math.atan2( 2 * ( q.y * q.w - q.x * q.z ), ( sqw + sqx - sqy - sqz ) );
            memory[i+2] = Math.asin(  clamp( 2 * ( q.x * q.y + q.z * q.w ) ) );
        }

        else if ( order === 'XZY' ) {
            memory[i]   = Math.atan2( 2 * ( q.x * q.w + q.y * q.z ), ( sqw - sqx + sqy - sqz ) );
            memory[i+1] = Math.atan2( 2 * ( q.x * q.z + q.y * q.w ), ( sqw + sqx - sqy - sqz ) );
            memory[i+2] = Math.asin(  clamp( 2 * ( q.z * q.w - q.x * q.y ) ) );
        }

        return this;
    };


    this.getPositionFromMatrix = function( i, m ) {
        i *= 3;

        memory[i]   = m.elements[12];
        memory[i+1] = m.elements[13];
        memory[i+2] = m.elements[14];

        return this;
    };


    this.getScaleFromMatrix = function( i, m ) {
        var e = m.elements;
        var sx = this.set(i, e[0], e[1], e[2]).length( i );
        var sy = this.set(i, e[4], e[5], e[6]).length( i );
        var sz = this.set(i, e[8], e[9], e[10]).length( i );

        i *= 3;

        memory[i] = sx;
        memory[i+1] = sy;
        memory[i+2] = sz;

        return this;
    };

    this.getColumnFromMatrix = function( i, index, matrix ) {
        var offset = index * 4;
        var me = matrix.elements;

        i *= 3;

        memory[i]   = me[offset];
        memory[i+1] = me[offset+1];
        memory[i+2] = me[offset+2];

        return this;
    };


    this.equals = function( i, v ) {
        i *= 3;
        v *= 3;

        return (
            (memory[v] === memory[i]) &&
            (memory[v+1] === memory[i+1]) &&
            (memory[v+2] === memory[i+2])
        );
    };

    this.fromArray = function( i, array ) {
        i *= 3;

        memory[i] = array[0];
        memory[i+1] = array[1];
        memory[i+2] = array[2];

        return this;
    };

    this.toArray = function( i ) {
        return [ memory[i], memory[i+1], memory[i+2] ];
    };


    this.clone = function( i ) {
        var n = this.get();
        var pos = n * 3;

        i *= 3;

        memory[ pos ] = memory[ i ];
        memory[ pos + 1 ] = memory[ i + 1 ];
        memory[ pos + 2 ] = memory[ i + 2 ];

        return n;
    };
}