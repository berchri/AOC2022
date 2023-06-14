const fs = require( 'fs' );
const data = fs.readFileSync( './data.txt', { encoding: 'utf-8' } )

const lines = data.split( '\r\n' )
const groups = []

for ( let i = 0; i < lines.length / 3; i++ ) {
    let index = i * 3
    groups.push( [ lines[ index ], lines[ index + 1 ], lines[ index + 2 ] ] )
}

const commonItems = groups.map( rucksack => {
    let commonItems = rucksack[ 0 ].split( '' ).filter( e => rucksack[ 1 ].includes( e ) && rucksack[ 2 ].includes( e ) )
    return commonItems[ 0 ]
} )

const priorityList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
let sum = 0

commonItems.forEach( e => {
    sum = sum + priorityList.indexOf( e ) + 1 * 1
} )

console.log( 'sum :>> ', sum );