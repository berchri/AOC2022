const fs = require( 'fs' );
const data = fs.readFileSync( './data.txt', { encoding: 'utf-8' } )
// console.log( 'data :>> ', data );

let arr = data.split( '\r\n' )

let topThree = []
let countCal = 0;

arr.forEach( cal => {
    if ( cal ) {
        countCal = countCal + cal * 1
    } else {
        topThree.push( countCal )
        countCal = 0
        topThree = topThree.sort( ( a, b ) => b - a )
        if ( topThree.length > 3 ) topThree.pop()
    }
} )

let sumTopThree = topThree.reduce( ( total, num ) => total + num )

console.log('sumTopThree :>> ', sumTopThree);