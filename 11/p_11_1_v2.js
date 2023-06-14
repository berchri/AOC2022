const fs = require( 'fs' );
const data = fs.readFileSync( './data.txt', { encoding: 'utf-8' } );
// console.log( 'data :>> ', data );

let lines = data.split( '\r\n' ).map( e => e.trim() );

let monkeys = [];

const monkey = {
    id: 0,
    items: [],
    operation: '',
    test: '',
    trueAction: 0,
    falseAction: 0,
    inspectionCounter: 0,
};

for ( const line of lines ) {
    if ( line.includes( 'Starting items' ) ) {
        monkey.items = []
        let items = line.split( ':' )[ 1 ].split( ',' )
        items.forEach( val => monkey.items.push( Number( val ) ) )
    }
    if ( line.includes( 'Operation' ) ) {
        monkey.operation = line.split( ':' )[ 1 ].trim()
    }
    if ( line.includes( 'Test' ) ) {
        monkey.test = Number( line.split( 'by ' )[ 1 ] )
    }
    if ( line.includes( 'true' ) ) {
        monkey.trueAction = Number( line.split( 'monkey ' )[ 1 ] )
    }
    if ( line.includes( 'false' ) ) {
        monkey.falseAction = Number( line.split( 'monkey ' )[ 1 ] )
    }
    if ( line === '' ) {
        monkeys.push( { ...monkey } )
        monkey.id++
    }
}

monkeys.forEach( ( v, i, a ) => {
    a[ i ].doOperation = function ( oldValue ) {
        let newValue;
        eval( v.operation )
        return newValue
    }
} )

for ( let i = 0; i < 20; i++ ) {
    roundExecution()
}

function roundExecution() {
    for ( const monkey of monkeys ) {
        while ( monkey.items.length >= 1 ) {
            monkey.inspectionCounter++
            let item = monkey.items.shift()
            let worryLevel = monkey.doOperation( item )
            worryLevel = Math.floor( worryLevel / 3 )
            let i;
            if ( worryLevel % monkey.test === 0 ) {
                i = monkey.trueAction
            } else {
                i = monkey.falseAction
            }
            monkeys[ i ].items.push( worryLevel )
        }
    }
}

let counters = monkeys.map( e => e.inspectionCounter )
counters.sort( ( a, b ) => b - a )
console.log( 'monkey business level :>> ', counters[ 0 ] * counters[ 1 ] );