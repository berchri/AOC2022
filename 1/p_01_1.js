const fs = require( 'fs' );
const data = fs.readFileSync( './data.txt', { encoding: 'utf-8' } )
console.log( 'data :>> ', data );

let arr = data.split( '\r\n' )

let mostCal = 0
let countCal = 0;

arr.forEach( cal => {
    if ( cal ) {
        countCal = countCal + cal * 1
    } else {
        if ( countCal > mostCal ) mostCal = countCal
        countCal = 0
    }
} )

console.log('mostCal :>> ', mostCal);