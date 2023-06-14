const fs = require( 'fs' );
const data = fs.readFileSync( __dirname + '/data.txt', { encoding: 'utf-8' } )

const lines = data.split( '\r\n' ).filter( ( e, i ) => ( i + 1 ) % 3 !== 0 );

let rightOrder = null
const results = []

for ( let i = 0; i < lines.length; i += 2 ) {
    let left = eval( lines[ i ] )
    let right = eval( lines[ i + 1 ] )

    compare( left, right )
    if ( rightOrder ) results.push( i / 2 + 1 )
    rightOrder = null
}

console.log( 'results :>> ', results.reduce( ( prev, curr ) => prev + curr ) );


function compare( left, right ) {
    if ( typeof left === 'number' ) left = [ left ]
    if ( typeof right === 'number' ) right = [ right ]

    if ( left.length === 0 && right.length > 0 ) {
        return rightOrder = true
    }

    for ( let i = 0; i < left.length; i++ ) {
        // console.log( 'left[i] :>> ', left[ i ] );
        // console.log( 'right[i] :>> ', right[ i ] );
        if ( right[ i ] === undefined ) {
            return rightOrder = false
        }

        if ( typeof left[ i ] === 'object' || typeof right[ i ] === 'object' ) {
            if ( left.length > 0 && right.length === 0 ) return rightOrder = false

            compare( left[ i ], right[ i ] )
            if ( rightOrder !== null ) return
            continue
        }

        if ( left[ i ] < right[ i ] ) return rightOrder = true

        if ( left[ i ] > right[ i ] ) {
            return rightOrder = false
        }

        if ( i === left.length - 1 && left.length < right.length ) {
            return rightOrder = true
        }
    }
}
