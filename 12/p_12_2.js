const fs = require( 'fs' );
const data = fs.readFileSync( './data.txt', { encoding: 'utf-8' } )
// console.log( 'data :>> ', data );

/*
Lösung:
Richtung umdrehen. nur ein Start möglich.

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

const grid = data.split( '\r\n' ).map( e => e.split( '' ) );
// console.log( 'grid :>> ', grid );

const elevations = 'SabcdefghijklmnopqrstuvwxyzE' // oder charCodeAt()
let start = [ 0, 0, 0 ] // [ x, y, d ]
let ends = []

for ( let x = 0; x < grid.length; x++ ) {
    for ( let y = 0; y < grid[ 0 ].length; y++ ) {
        if ( grid[ x ][ y ] === 'S' || grid[ x ][ y ] === 'a' ) {
            ends.push( [ x, y, 0 ] )
        }
        if ( grid[ x ][ y ] === 'E' ) {
            start[ 0 ] = x
            start[ 1 ] = y
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
        let charNext = grid?.[ dir[ 0 ] ]?.[ dir[ 1 ] ]

        if ( !charNext ) continue

        if ( visited.has( `${dir[ 0 ]} - ${dir[ 1 ]}` ) ) continue

        let charNrOrigin = elevations.indexOf( grid[ x ][ y ] )
        let charNrNext = elevations.indexOf( charNext )

        if ( charNrNext - charNrOrigin < -1 ) continue

        for ( const end of ends ) {
            if ( dir[ 0 ] === end[ 0 ] && dir[ 1 ] === end[ 1 ] ) {
                console.log( 'result: ', d + 1 )
                return
            }
        }

        visited.add( `${dir[ 0 ]} - ${dir[ 1 ]}` )
        queue.push( [ dir[ 0 ], dir[ 1 ], d + 1 ] )
    }
}