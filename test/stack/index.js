const Stack = require('../../lib/Stack')

const numStack = new Stack()

// push
numStack.push(1)
numStack.push(2)
numStack.push(3)

console.log('push', numStack.items) // push [ 1, 2, 3 ]

// pop
console.log('pop', numStack.pop()) // pop 3

// peek
console.log('peek', numStack.peek()) // peek 2

// isEmpty
console.log('isEmpty', numStack.isEmpty()) // isEmpty false

// size
console.log('size', numStack.size()) // size 2
