const fs = require( 'fs' );
const data = fs.readFileSync( __dirname + '/data.txt', { encoding: 'utf-8' } )
// console.log( 'data :>> ', data );

const commandLines = data.split( '\r\n' )
    .map( e => e.split( ' -> ' )
        .map( e => e.split( ',' )
            .map( e => Number( e ) ) ) )

let [ minX, maxX, maxY ] = [ Infinity, 0, 0 ]

for ( const line of commandLines ) {
    for ( const xy of line ) {
        if ( xy[ 0 ] < minX ) minX = xy[ 0 ]
        if ( xy[ 0 ] > maxX ) maxX = xy[ 0 ]
        if ( xy[ 1 ] > maxY ) maxY = xy[ 1 ]
    }
}

let length = maxX - minX + 1
let height = maxY + 3

commandLines.push( [ [ minX, maxY + 2 ], [ maxX, maxY + 2 ] ] )

const grid = []
const allPoints = new Set()

for ( const commandLine of commandLines ) {
    linkPoints( commandLine )
}
for ( let y = 0; y < height; y++ ) {
    let row = []
    for ( let x = 0; x < length; x++ ) {
        let absX = x + minX
        let absY = y
        if ( allPoints.has( absX + ',' + absY ) ) {
            row.push( '#' )
        } else {
            row.push( '.' )
        }
    }
    grid.push( row )
}

function linkPoints( coordinates ) {
    for ( let i = 0; i < coordinates.length - 1; i++ ) {
        let coords = [ coordinates[ i ], coordinates[ i + 1 ] ]
        let diffCoords = [
            coords[ 0 ][ 0 ] - coords[ 1 ][ 0 ],
            coords[ 0 ][ 1 ] - coords[ 1 ][ 1 ]
        ]
        let xy = diffCoords[ 0 ] === 0 ? 1 : 0
        if ( diffCoords[ xy ] > 0 ) {
            coords.reverse()
        }
        for ( let i = 0; i <= Math.abs( diffCoords[ xy ] ); i++ ) {
            if ( xy === 0 ) {
                allPoints.add( [ coords[ 0 ][ xy ] + i, coords[ 0 ][ 1 ] ].join( ',' ) )
            } else {
                allPoints.add( [ coords[ 0 ][ 0 ], coords[ 0 ][ xy ] + i ].join( ',' ) )
            }
        }
    }
}
let startX = 500
let count = 0
let startSand = true
while ( startSand ) {
    dropSand( [ startX - minX, 0 ] )
}

function dropSand( coordinates ) {
    let [ x, y ] = [ coordinates[ 0 ], coordinates[ 1 ] ]
    if ( grid[ 0 ][ startX - minX ] === 'o' ) {
        return startSand = false
    }
    if ( x === grid[ 0 ].length - 1 ) {
        grid.forEach( ( e, i, a ) => {
            if ( i < grid.length - 1 ) {
                a[ i ].push( '.' )
            } else {
                a[ i ].push( '#' )
            }
        } );

    }
    if ( x === 0 ) {
        x++
        startX++
        grid.forEach( ( e, i, a ) => {
            if ( i < grid.length - 1 ) {
                a[ i ] = [ '.', ...e ]
            } else {
                a[ i ] = [ '#', ...e ]
            }
        } );
    }
    if ( grid[ y + 1 ][ x ] === '.' ) return dropSand( [ x, y + 1 ] )

    if ( grid[ y + 1 ][ x ] !== '.' ) {
        if ( grid[ y + 1 ][ x - 1 ] === '.' ) return dropSand( [ x - 1, y + 1 ] )
        if ( grid[ y + 1 ][ x + 1 ] === '.' ) return dropSand( [ x + 1, y + 1 ] )
    }

    let row = [ ...grid[ y ] ]
    row.splice( x, 1, 'o' )
    grid.splice( y, 1, row )

    count++
}

console.log( 'count :>> ', count );

// let result = grid.map( e => e.join( '' ) ).join( '\n' )
// fs.writeFileSync( __dirname + '/result.txt', result, { encoding: 'utf-8' } )