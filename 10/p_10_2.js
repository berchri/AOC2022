const fs = require( 'fs' );
const data = fs.readFileSync( './data.txt', { encoding: 'utf-8' } )
// console.log( 'data :>> ', data );


const strings = data.split( '\r\n' )
const instructions = strings.map( e => {
    e = e.split( ' ' );
    if ( e.length === 1 ) e.push( 0 )
    return { type: e[ 0 ], register: Number( e[ 1 ] ) }
} )

// console.log( 'instructions :>> ', instructions );

let cycleCount = 0
let currentRow = ''
let rows = []
let spritePos = 1

for ( const instruction of instructions ) {
    increaseCount()
    if ( instruction.type === 'addx' ) increaseCount()
    spritePos = spritePos + instruction.register
}

function increaseCount() {
    cycleCount++

    if ( cycleCount >= spritePos && cycleCount <= spritePos + 2 ) {
        currentRow = currentRow + '#'
    } else {
        currentRow = currentRow + ' '
    }

    if ( cycleCount === 40 ) {
        rows.push( currentRow )
        cycleCount = 0
        currentRow = ''
    }
}

console.log( 'rows :>> ', rows );