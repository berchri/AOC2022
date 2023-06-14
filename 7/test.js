const fs = require( 'fs' );
const data = fs.readFileSync( './result.json', { encoding: 'utf-8' } )
const json = JSON.parse( data )





function selectDir( path ) {
    let dir = json;
    path.forEach( e => dir = dir.children[ e ] )
    return dir
}

path = [
    '5', '7', '1' ]

console.log( 'object :>> ', selectDir( path ) );