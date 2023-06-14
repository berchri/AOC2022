const fs = require( 'fs' );
const data = fs.readFileSync( './data.txt', { encoding: 'utf-8' } )

// let string = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb'
let string = data

let memory = [];

const getIndex = length => {
    for ( let i = 0; i < string.length; i++ ) {
        memory.push( string.charAt( i ) )
        if ( i < length ) continue
        memory.shift()
        let set = new Set( memory )
        if ( set.size === length ) {
            return i + 1
        }
    }
}

// nicht gleichzeitig starten
// console.log( 'part1 :>> ', getIndex( 4 ) );
console.log( 'part2 :>> ', getIndex( 14 ) );
