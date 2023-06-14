const fs = require( 'fs' );
const data = fs.readFileSync( './data.txt', { encoding: 'utf-8' } )
// console.log( 'data :>> ', data );

let rounds = data.split( '\r\n' )

/*
A    X    1    Rock
B    Y    2    Paper
C    Z    3    Scissors

0 lose
3 draw
6 win
*/

const scores = {
    X: 1,
    Y: 2,
    Z: 3
}

const wins = [ 'A Y', 'B Z', 'C X' ]
const draws = [ 'A X', 'B Y', 'C Z' ]

let myScore = 0

rounds.forEach( ( e, i, a ) => {
    if ( wins.includes( e ) ) myScore = myScore + 6
    if ( draws.includes( e ) ) myScore = myScore + 3

    let myChar = e.charAt( e.length - 1 )
    myScore = myScore + scores[myChar]
} )

console.log( 'myScore :>> ', myScore );