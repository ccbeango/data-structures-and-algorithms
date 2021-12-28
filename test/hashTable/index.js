const HashTable = require('../../lib/HashTable')

const hashTable = new HashTable()

// put
hashTable.put('tom', '18811')
hashTable.put('jane', '18812')
hashTable.put('lily', '18813')
hashTable.put('steve', '18814')
hashTable.put('shawn', '18815')
hashTable.put('marie', '18816')
hashTable.put('pinky', '18817')
console.log(hashTable)

// get
console.log(hashTable.get('tom'))
console.log(hashTable.get('jane'))
console.log(hashTable.get('lily'))

// remove
console.log(hashTable.get('tom'))
console.log(hashTable.get('ccbean'))

// isEmpty
console.log('isEmpty', hashTable.isEmpty())
// size
console.log('size', hashTable.size())
