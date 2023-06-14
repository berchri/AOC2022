const fs = require( 'fs' );
const data = fs.readFileSync( './data.txt', { encoding: 'utf-8' } )
// console.log( 'data :>> ', data );


const strings = data.split( '\r\n' )
const instructions = strings.map( e => {
    e = e.split( ' ' );
    if ( e.length === 1 ) e.push( 0 )
    return { type: e[ 0 ], register: Number( e[ 1 ] ) }
} )

console.log( 'instructions :>> ', instructions );

let x = 1;
let cycleBreakpoints = [ 20, 60, 100, 140, 180, 220 ]
let cycleCount = 0
let strength = 0

for ( const instruction of instructions ) {
    if ( instruction.type === 'noop' ) {
        increaseCount()
        continue
    }
    if ( instruction.type === 'addx' ) {
        increaseCount()
        increaseCount()
        x = x + instruction.register
    }
}

function increaseCount() {
    cycleCount++
    if ( cycleCount === cycleBreakpoints[ 0 ] ) {
        let breakpoint = cycleBreakpoints.shift()
        console.log( breakpoint + ' x ' + x + ' = ' + breakpoint * x )
        strength = strength + ( breakpoint * x )
    }
}

console.log( 'strength :>> ', strength );