// 链表节点
class Node {
  constructor (element) {
    this.element = element
    this.next = null
  }
}

/**
 * 链表
 */
module.exports = class LinkedList {
  constructor () {
    // head指向链表的第一个节点 初始为null
    this.head = null
    // 初始链表的长度
    this.length = 0
  }

  // 向链表尾部添加一个节点
  append (element) {
    const newNode = new Node(element)

    if (this.length === 0) { // 空链表
      this.head = newNode
    } else { // 链表非空
      // 保存找到的节点 从head开始
      let currentNode = this.head

      // 遍历到最后一个节点
      while (currentNode.next) {
        currentNode = currentNode.next
      }

      // 最后一个节点 next 指向新增节点
      currentNode.next = newNode
    }

    // 链表长度加1
    this.length++
  }

  // 向链表的特定位置插入一个节点 返回Boolean标识添加是否成功
  insert (position, element) {
    // 越界处理
    if (position < 0 || position > this.length) return false
    // 新节点
    const newNode = new Node(element)

    if (position === 0) {
      // 首位插入
      newNode.next = this.head
      this.head = newNode
    } else {
      // 0 < position <= this.length 插入
      let currentNode = this.head
      let previousNode = null
      let index = 0

      while (position > index++) {
        previousNode = currentNode // 原position -1位置节点
        currentNode = currentNode.next // 原position位置节点
      }
      // 插入新的节点到position 即 改变原节点指向
      previousNode.next = newNode
      newNode.next = currentNode
    }

    // 链表长度加1
    this.length++
    return true
  }

  // 根据位置获取元素
  get (position) {
    // 越界处理
    if (position < 0 || position >= this.length) return null

    let currentNode = this.head
    let index = 0
    while (position > index++) {
      currentNode = currentNode.next
    }

    return currentNode.element
  }

  // 根据位置移除对应的节点 并返回被移除节点的数据
  removeAt (position) {
    if (position < 0 || position >= this.length) return null

    let currentNode = this.head

    if (position === 0) {
      // 移除第一个节点
      this.head = currentNode.next
    } else {
      let previousNode = null

      let i = 0
      while (position > i++) {
        previousNode = currentNode // 原position -1位置节点
        currentNode = currentNode.next // 原position位置节点
      }
      // 将previousNode.next指向position + 1位置的Node
      previousNode.next = currentNode.next
    }
    // 链表长度减1
    this.length--
    return currentNode.element
  }

  // 获取节点在链表中的位置
  indexOf (element) {
    let currentNode = this.head

    let index = 0

    while (currentNode) {
      if (currentNode.element === element) {
        // 找到节点 返回index
        return index
      }

      currentNode = currentNode.next
      index++
    }
    // 未找到 返回-1
    return -1
  }

  // 根据元素删除节点
  remove (element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  // 更新节点 并返回更新后的节点
  update (position, element) {
    // 越界处理
    if (position < 0 || position >= this.length) return false

    let currentNode = this.head

    let index = 0
    while (position > index++) {
      currentNode = currentNode.next
    }
    // 更新position位置的element
    currentNode.element = element

    return currentNode
  }

  // 判断链表是否为空
  isEmpty() {
    return this.length === 0
  }

  // 获取链表的长度
  size() {
    return this.length
  }

  // 以字符串形式返回链表内元素节点
  toString () {
    let currentNode = this.head
    let result = ''
    // 遍历所有节点
    while (currentNode) {
      result += `${currentNode.element} `

      currentNode = currentNode.next
    }

    return result
  }
}
