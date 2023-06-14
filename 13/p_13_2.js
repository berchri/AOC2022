const fs = require( 'fs' );
const data = fs.readFileSync( __dirname + '/data.txt', { encoding: 'utf-8' } )

let lines = data.split( '\r\n' ).filter( ( e, i ) => ( i + 1 ) % 3 !== 0 );
const [ dividerA, dividerB ] = [ '[[2]]', '[[6]]' ]
lines = [ ...lines, dividerA, dividerB ]

let rightOrder = null

const linesSorted = bubbleSort( lines );

let part2 = ( linesSorted.indexOf( dividerA ) + 1 ) * ( linesSorted.indexOf( dividerB ) + 1 )
console.log( 'part2 :>> ', part2 );

function bubbleSort( lines ) {
    for ( let i = 0; i < lines.length; i++ ) {
        for ( let j = 0; j < lines.length - i - 1; j++ ) {
            let left = eval( lines[ j ] )
            let right = eval( lines[ j + 1 ] )

            compare( left, right )
            if ( rightOrder === false ) {
                [ lines[ j + 1 ], lines[ j ] ] = [ lines[ j ], lines[ j + 1 ] ]
            }
            rightOrder = null
        }
    };
    return lines;
};

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
