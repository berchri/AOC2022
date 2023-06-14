const fs = require( 'fs' );
const data = fs.readFileSync( './data.txt', { encoding: 'utf-8' } )
// console.log( 'data :>> ', data );

const linesString = data.split( '\r\n' )
const lines = linesString.map( e => e.split( '' ).map( v => Number( v ) ) )

const hMax = lines[ 0 ].length - 1
const vMax = lines.length - 1

let highestScenicScore = 0

for ( let v = 0; v < lines.length; v++ ) {
    for ( let h = 0; h < lines[ 0 ].length; h++ ) {
        let currentNr = lines[ v ][ h ]

        let t = checkTop( v, h, currentNr )
        let r = checkRight( v, h, currentNr )
        let b = checkBottom( v, h, currentNr )
        let l = checkLeft( v, h, currentNr )
        let score = t * r * b * l
        if ( score > highestScenicScore ) highestScenicScore = score
    }
}

function checkTop( v, h, currentNr ) {
    let score = 0
    for ( let i = v - 1; i >= 0; i-- ) {
        score++
        if ( currentNr <= lines[ i ][ h ] ) {
            break
        }
    }
    return score
}
function checkRight( v, h, currentNr ) {
    let score = 0
    for ( let i = h + 1; i <= hMax; i++ ) {
        score++
        if ( currentNr <= lines[ v ][ i ] ) {
            break
        }
    }
    return score
}
function checkBottom( v, h, currentNr ) {
    let score = 0
    for ( let i = v + 1; i <= vMax; i++ ) {
        score++
        if ( currentNr <= lines[ i ][ h ] ) {
            break
        }
    }
    return score
}
function checkLeft( v, h, currentNr ) {
    let score = 0
    for ( let i = h - 1; i >= 0; i-- ) {
        score++
        if ( currentNr <= lines[ v ][ i ] ) {
            break
        }
    }
    return score
}

console.log( 'highestScenicScore :>> ', highestScenicScore );