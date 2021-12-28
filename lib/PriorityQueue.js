
// 优先队列内部的元素类
class QueueElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

/**
 * 优先队列 基于数组
 */
 module.exports = class PriorityQueue {
  constructor () {
    // 队列中所有元素存储
    this.items = []
  }

  // 从队列尾部添加一个新元素到队列中
  enqueue (element, priority) {
    const queueElement = new QueueElement(element, priority)
    if (!this.items.length) {
      this.items.push(queueElement)
    } else {
      let added = false
      for (let i = 0; i < this.items.length; i++) {
        // priority越小则优先级越高
        if (queueElement.priority < this.items[i].priority) {
          // 插入到下一优先级最前面 即 同一优先级的末尾 
          this.items.splice(i, 0, queueElement)
          added = true
          break
        }
      }

      if (!added) {
        // 遍历完所有的元素, 优先级都大于新插入的元素时, 插入到最后
        this.items.push(queueElement)
      }
    }
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
    let result = '';
    for (let item of this.items) {
      result += item.element + '-' + item.priority + ' ';
    }
    return result;
  }
}
