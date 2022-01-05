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

  // 删除节点
  remove (key) {
    let current = this.root // 当前节点
    let parent = this.root // 当前节点的父节点
    let isLeftChild = true // current是否是parent的左节点

    while (current.key !== key) {
      parent = current
      if (current.key > key) {
        // key小于当前节点key 向左查找
        isLeftChild = true
        current = current.left
      } else {
        // 否则，key大于等于当前节点key 向右查找
        isLeftChild = false
        current = current.right
      }

      // 找到最后都没找到相等的节点，返回 false
      if (current === null) return false
    }

    if (current.left === null && current.right === null) { // 删除叶子节点
      if (this.root === current) {
        // 要删除的节点是根节点
        this.root = null
      } else if (isLeftChild) {
        // 要删除节点是父节点的左子节点
        parent.left = null
      } else {
        // 要删除节点是父节点的右子节点
        parent.right = null
      }
    } else if (current.right === null) { // 删除的节点current只有一个左子节点current.left
      if (this.root === current) {
        this.root = current.left
      } else if (isLeftChild) {
        parent.left = current.left
      } else {
        parent.right = current.left
      }
    } else if (current.left === null) { // 删除的节点current只有一个右子节点current.right
      if (this.root === current) {
        this.root = current.right
      } else if (isLeftChild) {
        parent.left = current.right
      } else {
        parent.right = current.right
      }
    } else { // 删除的节点current有两个子节点
      // 查找后继节点
      const successor = this.getSuccessor(current)

      // 判断是否是根节点
      if (this.root === current) {
        this.root = successor
      } else if (isLeftChild) {
        parent.left = successor
      } else {
        parent.right = successor
      }

      // 将后继的左子节点改为被删除节点的左子节点
      successor.left = current.left
    }

    return true
  }

  // 查找后继
  getSuccessor (predelNode) {
    let successor = predelNode // 后继节点
    let current = predelNode.right // 后继节点要查找的右子树
    let successorParent = successor

    // 循环查找 current 的右子树节点
    while (current !== null) {
      successorParent = successor
      successor = current
      current = current.left
    }

    if (successor !== predelNode.right) {
      // 寻找到的后继节点不直接是要删除节点的右子节点right
      // 如图中删除15，后继是18，需要处理19
      successorParent.left = successor.right
      successor.right = predelNode.right
    }

    return successor
  }
}
