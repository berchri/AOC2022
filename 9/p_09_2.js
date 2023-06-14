const fs = require( 'fs' );
const data = fs.readFileSync( './data.txt', { encoding: 'utf-8' } )
// console.log( 'data :>> ', data );

const strings = data.split( '\r\n' )
const moves = strings.map( e => {
    e = e.split( ' ' );
    return [ e[ 0 ], Number( e[ 1 ] ) ]
} )

let tailPositions = new Set( [ '00' ] )
let knots = []
for ( let i = 0; i < 10; i++ ) {
    knots.push( { x: 0, y: 0 } )
}
let H = knots[ 0 ]

for ( const move of moves ) {
    for ( let i = 0; i < move[ 1 ]; i++ ) {
        if ( move[ 0 ] === 'U' ) {
            H.y++
        }
        if ( move[ 0 ] === 'R' ) {
            H.x++
        }
        if ( move[ 0 ] === 'D' ) {
            H.y--
        }
        if ( move[ 0 ] === 'L' ) {
            H.x--
        }

        for ( let i = 0; i < knots.length - 1; i++ ) {
            let tailMovement = checkTailMove( i )
            if ( tailMovement ) {
                moveTail( i, tailMovement )
            }
        }
    }
}

function checkTailMove( index ) {
    const H = knots[ index ]
    const T = knots[ index + 1 ]

    // gerade 4 Möglichkeiten
    const move = { x: 0, y: 0 }

    if ( T.x < H.x - 1 && T.y === H.y ) { move.x = 1; return [ move ] }
    if ( T.x > H.x + 1 && T.y === H.y ) { move.x = -1; return [ move ] }
    if ( T.y < H.y - 1 && T.x === H.x ) { move.y = 1; return [ move ] }
    if ( T.y > H.y + 1 && T.x === H.x ) { move.y = -1; return [ move ] }

    // diagonal 8+ Möglichkeiten
    const move2 = { x: 0, y: 0 }

    if ( T.x < H.x - 1 ) {
        move.x = 1
        if ( T.y <= H.y - 1 ) { move2.y = 1; return [ move, move2 ] }
        if ( T.y >= H.y + 1 ) { move2.y = -1; return [ move, move2 ] }
    }

    if ( T.x > H.x + 1 ) {
        move.x = -1
        if ( T.y <= H.y - 1 ) { move2.y = 1; return [ move, move2 ] }
        if ( T.y >= H.y + 1 ) { move2.y = -1; return [ move, move2 ] }
    }

    if ( T.y < H.y - 1 ) {
        move.y = 1
        if ( T.x <= H.x - 1 ) { move2.x = 1; return [ move, move2 ] }
        if ( T.x >= H.x + 1 ) { move2.x = -1; return [ move, move2 ] }
    }

    if ( T.y > H.y + 1 ) {
        move.y = -1
        if ( T.x <= H.x - 1 ) { move2.x = 1; return [ move, move2 ] }
        if ( T.x >= H.x + 1 ) { move2.x = -1; return [ move, move2 ] }
    }

    return null
}

function moveTail( index, moves ) {
    const T = knots[ index + 1 ]

    for ( move of moves ) {
        T.x = T.x + move.x
        T.y = T.y + move.y
    }

    if ( index === 8 ) {
        let pos = T.x.toString() + '_' + T.y.toString()
        tailPositions.add( pos )
    }
}

console.log( 'Part 2 :>> ', tailPositions.size )