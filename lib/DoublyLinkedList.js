// 链表节点
class Node {
  constructor (data) {
    this.element = data
    this.next = null
    this.prev = null
  }
}

module.exports = class DoublyLinkedList {
  constructor () {
    // head指向链表的第一个节点 初始为null
    this.head = null
    // tail指向链表的最后一个节点 初始为null
    this.tail = null
    // 初始链表的长度
    this.length = 0
  }

  // 向链表尾部追加一个新元素
  append (element) {
    const newNode = new Node(element)

    if (this.length === 0) {
      this.head = newNode
      this.tail = newNode
    } else {
      // tail直接获取到原尾部节点
      this.tail.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    }
    // 链表长度加1
    this.length++
  }

  // 向链表中插入节点
  insert (position, element) {
    // 越界处理
    if (position < 0 || position > this.length) return false

    const newNode = new Node(element)

    if (position === 0) {
      // 首位插入
      if (this.head === null) {
        this.head = newNode
        this.tail = newNode
      } else {
        this.head.prev = newNode
        newNode.next = this.head
        this.head = newNode
      }
    } else if (position === this.length) {
      // 尾部插入
      this.tail.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    } else {
      // 中间插入
      let currentNode = this.head
      let previousNode = null
      let index = 0

      while (position > index++) {
        previousNode = currentNode // 原position -1位置节点
        currentNode = currentNode.next // 原position位置节点
      }

      // 改变节点的指向
      newNode.next = currentNode
      newNode.prev = previousNode
      previousNode.next = newNode
      currentNode.prev = newNode
    }

    // 链表长度加1
    this.length++
    return true
  }

  // 从链表中的删除指定位置的元素
  removeAt (position) {
    if (position < 0 || position >= this.length) return null

    let currentNode = this.head

    if (position === 0) {
      // 移除首位
      if (this.length === 1) {
        this.head = null
        this.tail = null
      } else {
        this.head = this.head.next
        this.head.prev = null
      }
    } else if (position === this.length - 1) {
      // 移除末尾
      currentNode = this.tail
      this.tail = this.tail.prev
      this.tail.next = null
    } else {
      // 移除中间
      let previousNode = null
      let index = 0
      while (position > index++) {
        previousNode = currentNode
        currentNode = currentNode.next
      }

      // 改变节点指向
      previousNode.next = currentNode.next
      currentNode.next.prev = previousNode
    }

    this.length--

    return currentNode.element
  }

  // 返回元素在链表中的索引。如果链表中没有该元素就返回 -1。
  indexOf (element) {
    let currentNode = this.head
    let index = 0
    while (currentNode) {
      if (currentNode.element === element) {
        // 返回匹配索引
        return index
      }

      currentNode = currentNode.next
      index++
    }

    // 未找到
    return -1
  }

  // 移除指定元素
  remove (element) {
    return this.removeAt(this.indexOf(element))
  }

  // 获取指定位置元素
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
  isEmpty () {
    return this.length === 0
  }

  size () {
    return this.length
  }

  getHead () {
    return this.head
  }

  getTail () {
    return this.tail
  }

  forwardString () {
    let currentNode = this.head

    let res = ''
    while (currentNode) {
      res += `${currentNode.element} `
      currentNode = currentNode.next
    }

    return res
  }

  reverseString () {
    let currentNode = this.tail

    let res = ''
    while (currentNode) {
      res += `${currentNode.element} `
      currentNode = currentNode.prev
    }

    return res
  }
}