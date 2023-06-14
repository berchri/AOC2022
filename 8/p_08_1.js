const fs = require( 'fs' );
const data = fs.readFileSync( './data.txt', { encoding: 'utf-8' } )
// console.log( 'data :>> ', data );

const linesString = data.split( '\r\n' )
const lines = linesString.map( e => e.split( '' ).map( v => Number( v ) ) )

const hMin = 0
const hMax = lines[ 0 ].length - 1
const vMin = 0
const vMax = lines.length - 1

let treeCounter = 0

for ( let v = 0; v < lines.length; v++ ) {
    for ( let h = 0; h < lines[ 0 ].length; h++ ) {
        if ( h === hMin || h === hMax || v === vMin || v === vMax ) {
            treeCounter++
            continue
        }
        let currentNr = lines[ v ][ h ]

        if ( checkTop( v, h, currentNr ) ||
            checkRight( v, h, currentNr ) ||
            checkBottom( v, h, currentNr ) ||
            checkLeft( v, h, currentNr ) ) {
            treeCounter++
            continue
        }
    }
}

function checkTop( v, h, currentNr ) {
    let visible = true
    for ( let i = v - 1; i >= 0; i-- ) {
        if ( currentNr <= lines[ i ][ h ] ) {
            visible = false
            break
        }
    }
    return visible
}
function checkRight( v, h, currentNr ) {
    let visible = true
    for ( let i = h + 1; i <= hMax; i++ ) {
        if ( currentNr <= lines[ v ][ i ] ) {
            visible = false
            break
        }
    }
    return visible
}
function checkBottom( v, h, currentNr ) {
    let visible = true
    for ( let i = v + 1; i <= vMax; i++ ) {
        if ( currentNr <= lines[ i ][ h ] ) {
            visible = false
            break
        }
    }
    return visible
}
function checkLeft( v, h, currentNr ) {
    let visible = true
    for ( let i = h - 1; i >= 0; i-- ) {
        if ( currentNr <= lines[ v ][ i ] ) {
            visible = false
            break
        }
    }
    return visible
}

console.log( 'treeCounter :>> ', treeCounter );