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

const pos = {
    X: 0,
    Y: 1,
    Z: 2
}

const hand = {
    A: [ 'Z', 'X', 'Y' ],
    B: [ 'X', 'Y', 'Z' ],
    C: [ 'Y', 'Z', 'X' ]
}

let myScore = 0

rounds.forEach( ( e, i, a ) => {
    let opponent = e.charAt( 0 )
    let result = e.charAt( e.length - 1 )
    let index = pos[ result ]
    let myHand = hand[ opponent ][ index ]

    myScore = myScore + index * 3
    myScore = myScore + pos[myHand] + 1
} )

console.log( 'myScore :>> ', myScore );