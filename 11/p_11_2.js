const fs = require( 'fs' );
const data = fs.readFileSync( './data.txt', { encoding: 'utf-8' } );
// console.log( 'data :>> ', data );

let lines = data.split( '\r\n' ).map( e => e.trim() );

function Monkey() {
    this.id = 0;
    this.items = [];
    this.operation = '';
    this.test = '';
    this.trueAction = 0;
    this.falseAction = 0;
    this.inspectionCounter = 0;

    this.doOperation = function ( oldValue ) {
        let newValue;
        eval( this.operation ) // !!!
        return newValue
    }

    this.testResult = function ( worryLevel ) {
        if ( worryLevel % this.test === 0 ) {
            return this.trueAction
        } else {
            return this.falseAction
        }
    }
}

let monkeys = [];
let newMonkey = new Monkey()

for ( const line of lines ) {
    if ( line.includes( 'Starting items' ) ) {
        newMonkey.items = []
        let items = line.split( ':' )[ 1 ].split( ',' )
        items.forEach( val => newMonkey.items.push( Number( val ) ) )
    }
    if ( line.includes( 'Operation' ) ) {
        newMonkey.operation = line.split( ':' )[ 1 ].trim()
    }
    if ( line.includes( 'Test' ) ) {
        newMonkey.test = Number( line.split( 'by ' )[ 1 ] )
    }
    if ( line.includes( 'true' ) ) {
        newMonkey.trueAction = Number( line.split( 'monkey ' )[ 1 ] )
    }
    if ( line.includes( 'false' ) ) {
        newMonkey.falseAction = Number( line.split( 'monkey ' )[ 1 ] )
    }
    if ( line === '' ) {
        monkeys.push( { ...newMonkey } )
        newMonkey.id++
    }
}

let commonMultiple = 1;
monkeys.forEach( e => commonMultiple = commonMultiple * e.test )

for ( let i = 0; i < 10000; i++ ) {
    for ( const monkey of monkeys ) {
        while ( monkey.items.length >= 1 ) {
            monkey.inspectionCounter++
            let item = monkey.items.shift()
            let worryLevel = monkey.doOperation( item )
            worryLevel = worryLevel % commonMultiple
            let index = monkey.testResult( worryLevel )
            monkeys[ index ].items.push( worryLevel )
        }
    }
}

let counters = monkeys.map( e => e.inspectionCounter )
counters.sort( ( a, b ) => b - a )
console.log( 'monkey business level :>> ', counters[ 0 ] * counters[ 1 ] );