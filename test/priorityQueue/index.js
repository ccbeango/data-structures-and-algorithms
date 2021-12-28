const PriorityQueue = require('../../lib/PriorityQueue')

const priorityQueue = new PriorityQueue()

// enqueue
priorityQueue.enqueue('A', 10);
priorityQueue.enqueue('B', 15);
priorityQueue.enqueue('C', 11);
priorityQueue.enqueue('D', 20);
priorityQueue.enqueue('E', 18);
priorityQueue.enqueue('F', 10);
console.log('enqueue', priorityQueue.items)
// enqueue [
//   QueueElement { element: 'A', priority: 10 },
//   QueueElement { element: 'F', priority: 10 },
//   QueueElement { element: 'C', priority: 11 },
//   QueueElement { element: 'B', priority: 15 },
//   QueueElement { element: 'E', priority: 18 },
//   QueueElement { element: 'D', priority: 20 }
// ]


// dequeue
console.log('dequeue', priorityQueue.dequeue()) // dequeue QueueElement { element: 'A', priority: 10 }
console.log('dequeue', priorityQueue.dequeue()) // dequeue QueueElement { element: 'F', priority: 10 }
console.log('dequeue', priorityQueue.items)
// dequeue [
//   QueueElement { element: 'C', priority: 11 },
//   QueueElement { element: 'B', priority: 15 },
//   QueueElement { element: 'E', priority: 18 },
//   QueueElement { element: 'D', priority: 20 }
// ]

// isEmpty
console.log('isEmpty', priorityQueue.isEmpty()) // isEmpty false

// size
console.log('size', priorityQueue.size()) // size 4

// toString
console.log('toString', priorityQueue.toString()) // toString C-11 B-15 E-18 D-20
