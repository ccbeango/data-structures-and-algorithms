const RedBlackTree = require('../../lib/RedBlackTree')

const rbt = new RedBlackTree()

rbt.insert(10, '十')
rbt.insert(9, '九')
rbt.insert(8, '八')
rbt.insert(7, '七')
rbt.insert(6, '六')
rbt.insert(5, '五')
rbt.insert(4, '四')
rbt.insert(3, '三')
rbt.insert(2, '二')
rbt.insert(1, '一')
console.log(rbt)

// 删除
// rbt.delete(1) // 单个红
// rbt.delete(2) // 有一个子树节点
// rbt.delete(4) // 父右子：黑兄弟，右红值
// rbt.delete(6) // 父右子：红兄弟
// rbt.delete(7) // 双子树节点

const rbt2 = new RedBlackTree()

// insert
rbt2.insert(1, '一')
rbt2.insert(2, '二')
rbt2.insert(3, '三')
rbt2.insert(4, '四')
rbt2.insert(5, '五')
rbt2.insert(6, '六')
rbt2.insert(7, '七')
rbt2.insert(8, '八')
rbt2.insert(9, '九')
rbt2.insert(10, '十')
console.log(rbt2)

// 删除
rbt2.delete(5)

console.log(rbt2)

// 中序遍历
let inString2 = ""
rbt2.inOrderTraversal((key) => {
  inString2 += `${key} `
})
console.log(inString2)

