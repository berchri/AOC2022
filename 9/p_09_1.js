const fs = require( 'fs' );
const data = fs.readFileSync( './data.txt', { encoding: 'utf-8' } )
// console.log( 'data :>> ', data );
/*
    Y
    4 . . . . .
    3 . . . . .
    2 . . . . .
    1 . . . . .
    0 s . . . .
      0 1 2 3 4 X

*/

const strings = data.split( '\r\n' )
const moves = strings.map( e => {
    e = e.split( ' ' );
    return [ e[ 0 ], Number( e[ 1 ] ) ]
} )

let tailPositions = new Set( [ '00' ] )
let H = { x: 0, y: 0 }
let T = { x: 0, y: 0 }

for ( const move of moves ) {
    let dir = 1

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
        if ( checkTailMove() ) {
            moveTail( move[ 0 ] )
        }
    }
}

function checkTailMove() {
    if ( T.x < H.x - 1 || T.x > H.x + 1 ) return true
    if ( T.y < H.y - 1 || T.y > H.y + 1 ) return true
    return false
}

function moveTail( move ) {
    if ( move === 'U' ) {
        T.y = H.y - 1
        T.x = H.x
    }
    if ( move === 'R' ) {
        T.x = H.x - 1
        T.y = H.y
    }
    if ( move === 'D' ) {
        T.y = H.y + 1
        T.x = H.x
    }
    if ( move === 'L' ) {
        T.x = H.x + 1
        T.y = H.y
    }
    let pos = T.x.toString() + '_' + T.y.toString()
    tailPositions.add( pos )
}

console.log( 'Part 1 :>> ', tailPositions.size )