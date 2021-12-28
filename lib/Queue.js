/**
 * 队列 基于数组
 */
module.exports = class Queue {
  constructor () {
    // 队列中所有元素存储
    this.items = []
  }

  // 从队列尾部添加一个新元素到队列中
  enqueue (element) {
    this.items.push(element)
  }

  // 从队列头部移除一个元素 返回移除元素
  dequeue () {
    return this.items.shift()
  }

  // 查看队列前端的第一个元素 
  front () {
    return this.items[0]
  }

  // 查看队列是否为空
  isEmpty () {
    return this.items.length === 0
  }

  // 查看队列中元素个数 
  size () {
    return this.items.length
  }

  // 以字符串形式返回队列内元素数据
  toString() {
    let result = ''
    for (let item of this.items) {
      result += item + ' '
    }
    return result
  }
}