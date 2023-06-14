const fs = require( 'fs' );
const data = fs.readFileSync( __dirname + '/data-test.txt', { encoding: 'utf-8' } )
// console.log( 'data :>> ', data );

const lines = data.split( '\r\n' ).map( e => {
    e = e.replace( 'Sensor at ', '' ).replace( ': closest beacon is at ', ', ' )
    e = e.split( ', ' )
        .map( e => {
            e = e.replace( /[xy=]{2}/g, '' )
            return Number( e )
        } )
    return {
        sensor: {
            x: e[ 0 ],
            y: e[ 1 ],
        }, beacon: {
            x: e[ 2 ],
            y: e[ 3 ]
        }
    }
} )


// const valuesX = lines.flatMap( e => [ e.sensor.x, e.beacon.x ] )
const valuesX = lines.flatMap( e => [ e.sensor.x, e.beacon.x ] ).sort( ( a, b ) => a - b )
const valuesY = lines.flatMap( e => [ e.sensor.y, e.beacon.y ] ).sort( ( a, b ) => a - b )

let [ minY, maxY, minX, maxX ] = [ valuesY[ 0 ], valuesY.at( -1 ), valuesX[ 0 ], valuesX.at( -1 ) ]

let gridMap = new Map()
for ( let i = minY; i <= maxY; i++ ) {
    let row = createRow( minX, maxX )
    gridMap.set( i, row )
}

function createRow( min, max ) {
    let row = new Map()
    for ( let j = min; j <= max; j++ ) {
        row.set( j, '.' )
    }
    return row
}
// let grid = []
// for ( let i = minY; i <= maxY; i++ ) {
//     let row = []
//     for ( let j = minX; j <= maxX; j++ ) {
//         row.push( '.' )
//     }
//     grid.push( row )
// }

for ( const line of lines ) {
    gridMap.get( line.sensor.y ).set( line.sensor.x, 'S' )
    gridMap.get( line.beacon.y ).set( line.beacon.x, 'B' )
}

console.log( 'gridMap :>> ', gridMap );
console.table( 'gridMap :>> ', [ ...gridMap ] );
// console.table( 'gridMap :>> ', gridMap.get( 0 ) );

debugger