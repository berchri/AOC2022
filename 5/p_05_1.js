const fs = require( 'fs' );
const data = fs.readFileSync( './data.txt', { encoding: 'utf-8' } )

let moves = data.replace( /[a-z]/g, '' ).split( '\r\n' ).map( e => e.split( ' ' ) )

moves.forEach( ( e, i, a ) => {
    a[ i ] = e.filter( e => e !== '' )
} )

/*
[T]             [P]     [J]
[F]     [S]     [T]     [R]     [B]
[V]     [M] [H] [S]     [F]     [R]
[Z]     [P] [Q] [B]     [S] [W] [P]
[C]     [Q] [R] [D] [Z] [N] [H] [Q]
[W] [B] [T] [F] [L] [T] [M] [F] [T]
[S] [R] [Z] [V] [G] [R] [Q] [N] [Z]
[Q] [Q] [B] [D] [J] [W] [H] [R] [J]
 1   2   3   4   5   6   7   8   9
*/
const stacks = {
    1: [ 'Q', 'S', 'W', 'C', 'Z', 'V', 'F', 'T' ],
    2: [ 'B', 'R', 'Q' ],
    3: [ 'B', 'Z', 'T', 'Q', 'P', 'M', 'S' ],
    4: [ 'D', 'V', 'F', 'R', 'Q', 'H' ],
    5: [ 'J', 'G', 'L', 'D', 'B', 'S', 'T', 'P' ],
    6: [ 'W', 'R', 'T', 'Z' ],
    7: [ 'H', 'Q', 'M', 'N', 'S', 'F', 'R', 'J' ],
    8: [ 'R', 'N', 'F', 'H', 'W' ],
    9: [ 'J', 'Z', 'T', 'Q', 'P', 'R', 'B' ]
}

moves.forEach( ( move ) => {
    let amount = move[ 0 ]
    let current = move[ 1 ]
    let destination = move[ 2 ]

    for ( let i = 0; i < amount; i++ ) {
        let crate = stacks[ current ].pop()
        stacks[ destination ].push( crate )
    }
} )

let chars = Object.values( stacks ).map( e => e.at( -1 ) )

console.log( 'chars :>> ', chars );