const Map = require('../../lib/Map')

const map = new Map()

// set
console.log('set', map.set('a', 'A'))
console.log('set', map.set('b', 'B'))
console.log('set', map.set('c', 'C'))
console.log('Map', map) // Map Map { items: { a: 'A', b: 'B', c: 'C' } }

// has
console.log('has', map.has('a')) // has true
console.log('has', map.has('b')) // has true

// remove
console.log('remove', map.remove('a')) // remove true
console.log('Map', map) // Map Map { items: { b: 'B', c: 'C' } }

// get
console.log('get', map.get('b')) // get B

// keys
console.log('keys', map.keys()) // keys [ 'b', 'c' ]

// values
console.log('values', map.values()) // values [ 'B', 'C' ]

// size
console.log('size', map.size()) // size 2
