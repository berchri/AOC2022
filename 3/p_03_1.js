const fs = require( 'fs' );
const data = fs.readFileSync( './data.txt', { encoding: 'utf-8' } )

const r = data.split( '\r\n' )

const rucksacks = r.map( e => {
    let compA = e.substring( 0, e.length / 2 )
    let compB = e.substring( e.length / 2, e.length )
    return [ compA, compB ]
} )

const commonItems = rucksacks.map( rucksack => {
    let commonItem = rucksack[ 1 ].match( new RegExp( `[${rucksack[ 0 ]}]` ) )
    return commonItem[ 0 ]
} )

const priorityList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
let sum = 0

commonItems.forEach( e => {
    sum = sum + priorityList.indexOf( e ) + 1 * 1
} )

console.log('sum :>> ', sum);