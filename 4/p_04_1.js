const fs = require( 'fs' );
const data = fs.readFileSync( './data.txt', { encoding: 'utf-8' } )
// console.log( 'data :>> ', data );

/*
2-8,3-7

2 < 3
8 > 7
*/
const assignment = data.split( '\r\n' ).map( pair => pair.split( ',' ) ).map( pair => pair.map( elve => elve.split( '-' ) ) )
for ( const pair of assignment ) {
    for ( const elve of pair ) {
        elve[ 0 ] = Number( elve[ 0 ] )
        elve[ 1 ] = Number( elve[ 1 ] )
    }
}

let count = 0

for ( const pair of assignment ) {
    if ( pair[ 0 ][ 0 ] > pair[ 1 ][ 0 ] ) pair.reverse()

    if ( pair[ 0 ][ 0 ] < pair[ 1 ][ 0 ] && pair[ 0 ][ 1 ] > pair[ 1 ][ 1 ] ) {
        count++
    }

    if ( pair[ 0 ][ 0 ] === pair[ 1 ][ 0 ] || pair[ 0 ][ 1 ] === pair[ 1 ][ 1 ] ) {
        count++
    }
}

console.log( 'count :>> ', count );
