const fs = require( 'fs' );
const data = fs.readFileSync( './data-test.txt', { encoding: 'utf-8' } )

let commandLines = data.split( '\r\n' ).map( e => e.split( ' ' ) )

const root = {
    name: '/',
    type: 'dir',
    size: 0,
    children: [],
    path: []
}

let currentDir = root
let currentPath = []
let dirPaths = []

function Element( size, name, currentDir ) {
    this.name = name
    this.path = [ ...currentDir.path, currentDir.children.length ]
    if ( size === 'dir' ) {
        this.type = 'dir'
        this.children = []
        this.size = 0;
    } else {
        this.type = 'file'
        this.size = size
    }
}

function selectDir( path ) {
    let dir = root;
    path.forEach( e => dir = dir.children[ e ] )
    return dir
}

function updateDirSize( path, size ) {
    let dir = root;
    dir.size += size * 1
    if ( path.length === 0 ) return
    path.forEach( e => {
        dir = dir.children[ e ]
        dir.size += size * 1
        if ( dir.size > 100000 ) {
            removeDirPath( dir.path )
        }
    } )
}

function removeDirPath( path ) {
    let i = dirPaths.indexOf( [ ...path ].join( '-' ) )
    if ( i > -1 ) {
        dirPaths.splice( i, 1 )
    }
}

for ( const commandLine of commandLines ) {
    if ( commandLine[ 0 ] === '$' ) {
        if ( `${commandLine[ 1 ]} ${commandLine[ 2 ]}` === 'cd /' ) {
            currentDir = root
            currentPath = []
            continue
        }
        if ( `${commandLine[ 1 ]} ${commandLine[ 2 ]}` === 'cd ..' ) {
            currentPath = currentPath.slice( 0, -1 )
            currentDir = selectDir( currentPath )
            continue
        }
        if ( commandLine[ 1 ] === 'cd' ) {
            let index = currentDir.children.findIndex( e => e.name === commandLine[ 2 ] )
            // currentPath.push( index )
            currentDir = currentDir.children[ index ]
            currentPath = currentDir.path
        }
        continue
    }

    const newElement = new Element( commandLine[ 0 ], commandLine[ 1 ], currentDir )
    currentDir.children.push( newElement )

    if ( newElement.type === 'file' ) updateDirSize( currentPath, newElement.size )
    if ( newElement.type === 'dir' ) {
        dirPaths.push( newElement.path.join( '-' ) )
    }
}

let part1 = 0
dirPaths.forEach( e => {
    let dir = selectDir( e.split( '-' ) )
    part1 += dir.size
} )

console.log( 'part1 :>> ', part1 )
// console.log( 'root: ', JSON.stringify( root ) )

