const MinHeap = require('../../lib/MinHeap')

const minHeap = new MinHeap()

minHeap.insert(9)
minHeap.insert(8)
minHeap.insert(7)
minHeap.insert(6)
minHeap.insert(5)
minHeap.insert(4)
minHeap.insert(3)
minHeap.insert(2)
minHeap.insert(1)

// getHeap
console.log(minHeap.getHeap())

// extract
console.log(minHeap.extract())

// getHeap
console.log(minHeap.getHeap())

// min
console.log(minHeap.min())
