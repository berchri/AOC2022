const fs = require( 'fs' );
const data = fs.readFileSync( './data.txt', { encoding: 'utf-8' } )
// console.log( 'data :>> ', data );

/*
    Lösung:
Breadth first search.
andere Möglichkeit wäre Dijkstra Algorithm.

    01234567
  ┌──────────── y
0 │ Sabqponm
1 │ abcryxxl
2 │ accszExk
3 │ acctuvwj
4 │ abdefghi
  │
  │ x

 */

const matrix = data.split( '\r\n' ).map( e => e.split( '' ) );
// console.log( 'matrix :>> ', matrix );

const elevations = 'SabcdefghijklmnopqrstuvwxyzE' // oder charCodeAt()
let start = [ 0, 0, 0 ] // [ x, y, d ]
let end = [ 0, 0, 0 ]

for ( let x = 0; x < matrix.length; x++ ) {
    for ( let y = 0; y < matrix[ 0 ].length; y++ ) {
        if ( matrix[ x ][ y ] === 'S' ) {
            start[ 0 ] = x
            start[ 1 ] = y
        }
        if ( matrix[ x ][ y ] === 'E' ) {
            end[ 0 ] = x
            end[ 1 ] = y
        }
    }
}

const queue = [ start ]
const visited = new Set( [ `${start[ 0 ]} - ${start[ 1 ]}` ] )

while ( queue.length > 0 ) {
    const [ x, y, d ] = queue.shift();

    const directions = [
        [ x - 1, y ],
        [ x + 1, y ],
        [ x, y + 1 ],
        [ x, y - 1 ]
    ]

    for ( const dir of directions ) {
        let charNext = matrix?.[ dir[ 0 ] ]?.[ dir[ 1 ] ]

        if ( !charNext ) continue

        if ( visited.has( `${dir[ 0 ]} - ${dir[ 1 ]}` ) ) continue

        let charNrOrigin = elevations.indexOf( matrix[ x ][ y ] )
        let charNrNext = elevations.indexOf( charNext )

        if ( charNrNext - charNrOrigin > 1 ) continue

        if ( dir[ 0 ] === end[ 0 ] && dir[ 1 ] === end[ 1 ] ) {
            console.log( 'result: ', d + 1 )
            return
        }

        visited.add( `${dir[ 0 ]} - ${dir[ 1 ]}` )
        queue.push( [ dir[ 0 ], dir[ 1 ], d + 1 ] )
    }
}