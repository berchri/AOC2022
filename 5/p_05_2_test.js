const fs = require( 'fs' );
const data = fs.readFileSync( './data-test.txt', { encoding: 'utf-8' } )

/*

        [D]
    [N] [C]
    [Z] [M] [P]
     1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2

 */

let moves = data.replace( /[a-z]/g, '' ).split( '\r\n' ).map( e => e.split( ' ' ) )

moves.forEach( ( e, i, a ) => {
    a[ i ] = e.filter( e => e !== '' )
} )

const stacks = {
    1: [ 'Z', 'N' ],
    2: [ 'M', 'C', 'D' ],
    3: [ 'P' ]
}

moves.forEach( ( move ) => {
    let amount = move[ 0 ]
    let current = move[ 1 ]
    let destination = move[ 2 ]

    let crate = stacks[ current ].splice( stacks[ current ].length - amount, amount )
    stacks[ destination ] = [ ...stacks[ destination ], ...crate ]
} )



console.log( 'stacks :>> ', stacks );