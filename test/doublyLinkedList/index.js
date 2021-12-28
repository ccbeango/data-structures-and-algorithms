const DoublyLinkedList = require('../../lib/DoublyLinkedList')

const doublyLinkedList = new DoublyLinkedList()

// append
doublyLinkedList.append('B')
doublyLinkedList.append('C')
doublyLinkedList.append('D')
console.log('doublyLinkedList', doublyLinkedList)

// insert
console.log('insert', doublyLinkedList.insert(0, 'A'))
console.log('insert', doublyLinkedList.insert(4, 'E'))
console.log('insert', doublyLinkedList.insert(3, 'd'))
console.log('insert', doublyLinkedList.insert(-1, '-A'))
console.log('forwardString', doublyLinkedList.forwardString())
console.log('reverseString', doublyLinkedList.reverseString())

// indexOf
console.log('indexOf', doublyLinkedList.indexOf('5'))
console.log('indexOf', doublyLinkedList.indexOf('100'))

// get
console.log('get', doublyLinkedList.get(0))
console.log('get', doublyLinkedList.get(1))

// // 测试 update 方法
console.log('update', doublyLinkedList.update(3, 'D'))
console.log('forwardString', doublyLinkedList.forwardString())

// removeAt
console.log('removeAt', doublyLinkedList.removeAt(0))
console.log('removeAt', doublyLinkedList.removeAt(1))
console.log('removeAt', doublyLinkedList.removeAt(3))
console.log('forwardString', doublyLinkedList.forwardString())

// remove
console.log('remove', doublyLinkedList.remove('D'))

// 测试 isEmpty 方法
console.log('isEmpty', doublyLinkedList.isEmpty())

// 测试 size 方法
console.log('size', doublyLinkedList.size())