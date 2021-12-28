const LinkedList = require('../../lib/LinkedList')

const linkedList = new LinkedList()

// append
linkedList.append('15')
linkedList.append('10')
linkedList.append('5')
console.log('linkedList', linkedList)
// linkedList LinkedList {
//   head: Node {
//     data: '15',
//     next: Node {
//       data: '10',
//       next: Node {
//         data: '5',
//         next: null
//       } 
//     } 
//   },
//   length: 3
// }

// insert
console.log('insert', linkedList.insert(1, '14'))
console.log('insert', linkedList.insert(3, '9'))
console.log('insert', linkedList.insert(5, '4'))
console.log('insert', linkedList.insert(-1, '-1'))
console.log('toString', linkedList.toString())

// indexOf
console.log('indexOf', linkedList.indexOf('5'))
console.log('indexOf', linkedList.indexOf('100'))

// get
console.log('get', linkedList.get(0))
console.log('get', linkedList.get(1))

// 测试 update 方法
console.log('update', linkedList.update(0, '100'))
console.log('toString', linkedList.toString())
console.log('update', linkedList.update(1, '90'))
console.log('toString', linkedList.toString())

// removeAt
console.log('removeAt', linkedList.removeAt(1))
console.log('removeAt', linkedList.removeAt(2))
console.log('removeAt', linkedList.removeAt(3))
console.log('removeAt', linkedList.removeAt(4))
console.log('toString', linkedList.toString())

// remove
console.log('remove', linkedList.remove('5'))
console.log('remove', linkedList.remove('0'))

// 测试 isEmpty 方法
console.log('isEmpty', linkedList.isEmpty())

// 测试 size 方法
console.log('size', linkedList.size())