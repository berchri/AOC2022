const fs = require( 'fs' );
const data = fs.readFileSync( './data-test.txt', { encoding: 'utf-8' } )
console.log( 'data :>> ', data );


const lines = data.split( '\r\n' )