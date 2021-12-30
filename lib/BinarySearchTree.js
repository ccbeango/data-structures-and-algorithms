class Node {
  constructor (key, value) {
    this.key = key // 节点对应的key
    this.value = value
    this.left = null // 指向的左子树
    this.right = null // 指向的右子树
  }
}

/**
 * 二叉搜索树
 */
module.exports = class BinarySearchTree {
  constructor () {
    this.root = null
  }

  // 向树中插入一个新的键
  insert (key) {
    const newNode = new Node(key)
    if (this.root === null) { // 插入根节点
      this.root = newNode
    } else { // 插入非根节点
      this._insertNode(this.root, newNode)
    }
  }

  /**
   * 插入非根节点到树结构中
   * @param {*} node 与插入节点比较的树节点
   * @param {*} newNode 插入节点
   */
  _insertNode (node, newNode) {
    if (newNode.key < node.key) { // 左子树插入节点 插入节点key小于树节点key
      if (node.left === null) {
        // 树节点左子树上没有节点
        node.left = newNode
      } else {
        // 树节点左子树上已有节点 递归
        this._insertNode(node.left, newNode)
      }
    } else { // 右子树插入节点 插入节点key大于等于树节点key
      if (node.right === null) {
        // 树节点右子树上没有节点
        node.right = newNode
      } else {
        // 树节点右子树上已有节点 递归
        this._insertNode(node.right, newNode)
      }
    }
  }

  // 先序遍历
  preOrderTraversal (handler) {
    this._preOrderTraversalNode(this.root, handler)
  }
  _preOrderTraversalNode (node, handler) {
    if (node !== null) {
      // 首先回调 handler
      handler(node.key)
      // 然后遍历所有的左子树
      this._preOrderTraversalNode(node.left, handler)
      // 最后遍历所有的右子树
      this._preOrderTraversalNode(node.right, handler)
    }
  }

  // 中序遍历
  inOrderTraversal (handler) {
    this._inOrderTraversalNode(this.root, handler)
  }
  _inOrderTraversalNode (node, handler) {
    if (node !== null) {
      // 首先遍历所有的左子树
      this._inOrderTraversalNode(node.left, handler)
      // 然后回调 handler
      handler(node.key)
      // 最后遍历所有的右子树
      this._inOrderTraversalNode(node.right, handler)
    }
  }

  // 后序遍历
  postOrderTraversal (handler) {
    this._postOrderTraversalNode(this.root, handler)
  }
  _postOrderTraversalNode (node, handler) {
    if (node !== null) {
      // 首先遍历所有的左子树
      this._postOrderTraversalNode(node.left, handler)
      // 然后遍历所有的右子树
      this._postOrderTraversalNode(node.right, handler)
      // 最后回调 handler
      handler(node.key)
    }
  }

  // 最小值
  min () {
    let node = this.root
    // 循环找到最左子节点
    while (node.left !== null) {
      node = node.left
    }
    return node.key
  }

  // 最大值
  max () {
    let node = this.root
    // 循环找到最右子节点
    while (node.right !== null) {
      node = node.right
    }
    return node.key
  }

  // 搜索值 递归
  search (key) {
    return this._searchNode(this.root, key)
  }
  _searchNode (node, key) {
    if (node === null) {
      return false
    }

    if (node.key > key) { // 向左子树查找
      return this._searchNode(node.left, key)
    } else if (node.key < key) { // 向右子树查找
      return this._searchNode(node.right, key)
    } else { // 相等 说明找到了key
      return true
    }
  }

  // 搜索值 循环
  search2 (key) {
    let node = this.root

    while (node !== null) {
      if (node.key > key) { // 向左子树查找
        node = node.left
      } else if (node.key < key) { // 向右子树查找
        node = node.right
      } else {
        return true
      }
    }

    return false
  }

  remove () {
    
  }
}