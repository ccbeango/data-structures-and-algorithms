/**
 * 栈 基于数组
 *  - 数组末尾的元素作为栈顶元素
 */
module.exports = class Stack {
  constructor () {
    // 栈中所有元素存储
    this.items = []
  }

  // 添加一个新元素到栈顶位置
  push (element) {
    this.items.push(element)
  }

  // 移除栈顶的元素，同时返回被移除的元素
  pop () {
    return this.items.pop()
  }

  // 返回栈顶的元素，不对栈做任何修改
  peek () {
    return this.items[this.items.length - 1]
  }
  
  // 查看栈中是否为空
  isEmpty () {
    return this.items.length === 0
  }

  // 移除栈中所有元素
  clear () {
    this.items = []
  }

  // 获取栈中元素个数
  size() {
    return this.items.length
  }

  // 以字符串形式返回栈内元素数据
  toString() {
    let result = ''
    for (let item of this.items) {
      result += item + ' '
    }
    return result
  }
}
