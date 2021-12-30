const BinarySearchTree = require('../../lib/BinarySearchTree')

const bst = new BinarySearchTree()

// insert
bst.insert(11)
bst.insert(7)
bst.insert(15)
bst.insert(5)
bst.insert(3)
bst.insert(9)
bst.insert(8)
bst.insert(10)
bst.insert(13)
bst.insert(12)
bst.insert(14)
bst.insert(20)
bst.insert(18)
bst.insert(25)
bst.insert(6)
console.log(bst)

// 先序遍历
let preString = ""
bst.preOrderTraversal((key) => {
  preString += `${key} `
})
console.log(preString) // 11 7 5 3 6 9 8 10 15 13 12 14 20 18 25

// 中序遍历
let inString = ""
bst.inOrderTraversal((key) => {
  inString += `${key} `
})
console.log(inString) // 3 5 6 7 8 9 10 11 12 13 14 15 18 20 25

// 后序遍历
let postString = ""
bst.postOrderTraversal((key) => {
  postString += `${key} `
})
console.log(postString) // 3 6 5 8 10 9 7 12 14 13 18 25 20 15 11

// 最小值
console.log(bst.min())

// 最大值
console.log(bst.max())

// 搜索特定的值
console.log(bst.search(10)) // true
console.log(bst.search(13)) // true
console.log(bst.search(21)) // false
