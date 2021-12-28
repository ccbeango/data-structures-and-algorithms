const Set = require('../../lib/Set')

const set = new Set()

// add
console.log('add', set.add('abc')) // add true
console.log('add', set.add('abc')) // add false
console.log('add', set.add('123')) // add true
console.log('add', set.add('zxc')) // add true
console.log('Set', set) // Set Set { items: { '123': '123', abc: 'abc', zxc: 'zxc' } }

// has
console.log('has', set.has('123')) // has true
console.log('has', set.has('456')) // has false

// remove
console.log('remove', set.remove('abc')) // remove true
console.log('Set', set) // Set Set { items: { '123': '123', zxc: 'zxc' } }

// size
console.log('size', set.size()) // size 2

// values
console.log('values', set.values()) // values [ '123', 'zxc' ]

// clear
console.log('clear', set.clear()) // clear undefined
console.log('values', set.values()) // values []

const setA = new Set();
setA.add('111')
setA.add('222')
setA.add('333')

const setB = new Set();
setB.add('111')
setB.add('222')
setB.add('aaa')
setB.add('ccc')

// union
console.log('SetA和SetB的合集', setA.union(setB).values()) // SetA和SetB的合集 [ '111', '222', '333', 'aaa', 'ccc' ]

// intersection
console.log('SetA和SetB的交集',  setA.intersection(setB).values()) // SetA和SetB的交集 [ '111', '222' ]

// difference
console.log('SetA对SetB的差集', setA.difference(setB).values()) // SetA对SetB的差集 [ '333' ]

// subset
console.log('SetA是否是SetB的子集', setA.subset(setB)) // SetA是否是SetB的子集 false
