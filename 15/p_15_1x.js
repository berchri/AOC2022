const fs = require( 'fs' );
const data = fs.readFileSync( __dirname + '/data.txt', { encoding: 'utf-8' } )
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


for ( const line of lines ) {
    let diffX = Math.abs( line.sensor.x - line.beacon.x )
    let diffY = Math.abs( line.sensor.y - line.beacon.y )
    let size = diffX + diffY

    drawArea( line.sensor, size )
}
writeSolution()
let count = 0
gridMap.get( 10 ).forEach( e => { if ( e === '#' ) count++ } )
console.log( 'count :>> ', count );

function drawArea( sensor, size ) {
    // sensor.y - size
    // sensor.y + size
    // sensor.x - size
    // sensor.x + size

    for ( let y = sensor.y - size; y <= sensor.y + size; y++ ) {
        if ( !gridMap.has( y ) ) {
            if ( y < sensor.y ) minY--
            if ( y > sensor.y ) maxY++
            let row = createRow( minX, maxX )
            gridMap.set( y, row )
        }
    }

    for ( let x = sensor.x - size; x <= sensor.x + size; x++ ) {
        if ( !gridMap.get( minY ).has( x ) ) {
            if ( x < sensor.x ) minX--
            if ( x > sensor.x ) maxX++
            gridMap.forEach( ( value, key, map ) => map.get( key ).set( x, '.' ) )
        }
    }

    for ( let y = sensor.y - size; y <= sensor.y + size; y++ ) {
        for ( let x = sensor.x - size; x <= sensor.x + size; x++ ) {
            let diffX = Math.abs( sensor.x - x )
            let diffY = Math.abs( sensor.y - y )
            if ( gridMap.get( y ).get( x ) === '.' ) {
                if ( diffX + diffY <= size ) {
                    gridMap.get( y ).set( x, '#' )
                }
            }
        }
    }


    // up

    // down
    // left
    // right
}


function writeSolution() {
    let string = ''
    for ( let i = minX; i <= maxY; i++ ) {
        let row = gridMap.get( i ).values()
        row = [ ...row ].join( '' )
        string = string + row + '\n'
    }
    console.log( 'string :>> ', string );
}

// ####B######################

// console.log( 'grid :>> ', gridMap );
// console.log( 'valuesX :>> ', valuesX );
// console.log( 'lines :>> ', lines );

debugger