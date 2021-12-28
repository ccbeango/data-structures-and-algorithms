const Queue = require('../../lib/Queue')

const queue = new Queue()

// enqueue
queue.enqueue('a')
queue.enqueue('b')
queue.enqueue('c')
queue.enqueue('d')
console.log('enqueue', queue.items) // enqueue [ 'a', 'b', 'c', 'd' ]

// dequeue
console.log('dequeue', queue.dequeue()) // dequeue a
console.log('dequeue', queue.dequeue()) // dequeue b
console.log(queue.items) // [ 'c', 'd' ]

// front
console.log('front', queue.front()) // front c

// isEmpty
console.log('isEmpty', queue.isEmpty()) // isEmpty false

// size
console.log('size', queue.size()) // size 2

// toString
console.log('toString', queue.toString()) // toString c d
