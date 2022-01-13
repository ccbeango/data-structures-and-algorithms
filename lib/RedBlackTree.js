const COLOR = {
  RED: 'red',
  BLACK: 'black'
}

class Node {
  constructor (key, value, color) {
    this.key = key // 节点对应的key
    this.value = value
    this.color = color

    this.left = null // 指向的左子树
    this.right = null // 指向的右子树
    this.parent = null // 指向的父节点
  }
}


/**
 * 红黑树
 */
 module.exports = class RedBlackTree {
  constructor () {
    this.root = null
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

  // 搜索值 循环
  search (key) {
    let node = this.root

    while (node !== null) {
      if (node.key > key) { // 向左子树查找
        node = node.left
      } else if (node.key < key) { // 向右子树查找
        node = node.right
      } else {
        return node
      }
    }

    return null
  }

  // 最小值
  min () {
    let node = this.root
    // 循环找到最左子节点
    while (node.left !== null) {
      node = node.left
    }
    return node
  }

  // 最大值
  max () {
    let node = this.root
    // 循环找到最右子节点
    while (node.right !== null) {
      node = node.right
    }
    return node
  }

  /**
   * 左旋
   *      G             P
   *     / \           / \
   *    U   P   ===>  G   N
   *       / \       / \
   *      B   N     U   B
   * @param {*} node 旋转支点G
   */
  rotateLeft (gnode) {
    const pnode = gnode.right

    // G.right = B
    gnode.right = pnode.left
    if (pnode.left) {
      // B节点存在，将B.parent指向G
      pnode.left.parent = gnode
    }

    // P.parent = G.parent
    pnode.parent = gnode.parent

    if (gnode.parent === null) { // G是根节点
      // this.root = P
      this.root = pnode
    } else {
      if (gnode.parent.right === gnode) {
        // G是父节点的右子节点
        gnode.parent.right = pnode
      } else {
        // G是父节点的左子节点
        gnode.parent.left = pnode
      }
    }

    // P.left = G
    pnode.left = gnode
    // G.parent = P
    gnode.parent = pnode
  }

  /**
   * 右旋
   *      G             P
   *     / \           / \
   *    P   U   ===>  N   G
   *   / \               / \
   *  N   B             B   U
   * @param {*} node 旋转支点G
   */
  rotateRight (gnode) {
    const pnode = gnode.left

    // G.left = B
    gnode.left = pnode.right
    if (pnode.right) {
      // B节点存在，将B.parent指向G
      pnode.right.parent = gnode
    }

    pnode.parent = gnode.parent

    if (gnode.parent === null) { // G是根节点
      this.root = pnode
    } else {
      if (gnode.parent.right === gnode) {
        // G是父节点的右子节点
        gnode.parent.right = pnode
      } else {
        // G是父节点的左子节点
        gnode.parent.left = pnode
      }
    }

    // P.right = G
    pnode.right = gnode
    // G.parent = P
    gnode.parent = pnode
  }

  /**
   * 向树中插入一个节点 循环
   */
  insert (key, value) {
    const newNode = new Node(key, value, COLOR.RED)
    if (this.root === null) {
      this.root = newNode
    } else {
      let parent
      let node = this.root
      while(node !== null) {
        parent = node
        if (node.key === newNode.key) {
          // 情况8 插入节点已存在 更新节点
          // newNode.color = node.color
          node.value = newNode.value
          return
        } else if (node.key > newNode.key) {
          // 向左子树查找
          node = node.left
        } else {
          // 向右子树查找
          node = node.right
        }
      }

      newNode.parent = parent
      if (parent.key > newNode.key) {
        parent.left = newNode
      } else {
        parent.right = newNode
      }
    }

    // 插入节点平衡修正
    this.balanceInsertion(newNode)
  }

  /**
   * 插入节点平衡修正
   */
  balanceInsertion (node) {
    // 情况2：插入的新节点N的父节点P为黑色节点，此时不需要任何变化 无需修正

    // 插入节点非根节点 且 插入节点的父级是红色节点
    while (node.parent !== null && node.parent.color === COLOR.RED) {
      let uncle = null
      let grandpa = node.parent.parent
      if (node.parent === grandpa.left) { // 父节点是祖父节点的左子节点
        uncle = grandpa.right
        // 情况3 父红叔红祖黑 叔叔节点是红色
        if (uncle !== null && uncle.color === COLOR.RED) {
          // 父节点、叔叔节点变成黑色，祖父节点变成红色
          node.parent.color = COLOR.BLACK
          uncle.color = COLOR.BLACK
          grandpa.color = COLOR.RED
          // 以祖父节点当作新节点继续调用修正方法
          node = grandpa
          continue
        }

        // 情况5 父节点是祖父节点的左子节点 插入节点是父节点的右子节点 且 父红叔黑祖黑
        if (node === node.parent.right) {
          // 左旋之后，原插入节点的父节点变成新插入节点 回归情况4
          node = node.parent // 将原插入节点的父节点看作是新插入节点
          grandpa = node.parent.parent // 重新赋值新节点的grandpa
          this.rotateLeft(node) // 以父节点为支点进行左旋转
        }

        // 情况4 父节点是祖父节点的左子节点 插入节点是父节点的左子节点 且 父红叔黑祖黑
        // 以及情况5左旋转之后
        node.parent.color = COLOR.BLACK // 父节点变成黑色
        grandpa.color = COLOR.RED // 祖父节点变成红色
        this.rotateRight(grandpa) // 以祖父节点进行右旋转
      } else { // 父节点是祖父节点的右节点
        uncle = grandpa.left
        // 情况3 父红叔红祖黑 叔叔节点是红色
        if (uncle !== null && uncle.color === COLOR.RED) {
          node.parent.color = COLOR.BLACK
          uncle.color = COLOR.BLACK
          grandpa.color = COLOR.RED
          // 以祖父节点当作新节点继续调用修正方法
          node = grandpa
          continue
        }

        // 情况5镜像 父节点是祖父节点的右子节点 插入节点是父节点的左子节点 且 父红叔黑祖黑
        if (node === node.parent.left) {
          // 右旋之后，原插入节点的父节点变成新插入节点 回归情况4镜像
          node = node.parent // 将原插入节点的父节点看作是新插入节点
          grandpa = node.parent.parent // 重新赋值新节点的grandpa
          this.rotateRight(node) // 以父节点为支点进行右旋转
        }

        // 情况4镜像 父节点是祖父节点的右子节点 插入节点是父节点的右子节点 且 父红叔黑祖黑
        if (node === node.parent.right) {
          node.parent.color = COLOR.BLACK
          grandpa.color = COLOR.RED
          this.rotateLeft(grandpa) // 以祖父节点进行左旋转
        }
      }
    }

    // 情况1：插入节点是根节点
    // 情况3：最后回归情况1
    this.root.color = COLOR.BLACK
  }

  /**
   * 查找后继节点
   */
  getSuccessor (node) {
    while (node.left !== null) {
      node = node.left
    }
    return node
  }

  /**
   * 删除一个节点
   */
  delete (key) {
    let current = this.root // 待删除节点

    while (current) {
      if (current.key > key) {
        current = current.left
      } else if (current.key < key) {
        current = current.right
      } else if (current.key === key) {
        break
      }
    }
    // 没有找到待删除节点，直接返回false
    if (current === null) return false

    this._deleteNode(current)
  }
  _deleteNode (current) {
    // 删除节点处理
    if (current.left !== null && current.right !== null) { // 待删除节点有两个子节点
      const successor = this.getSuccessor(current.right) // 查找后继节点
      current.key = successor.key // 交换值
      current.value = successor.value // 交换值

      this._deleteNode(successor) // 递归删除后继节点 最多递归一次（后继节点无子节点或只有一个右红子节点）
    } else { // 待删除节点是单个节点 或 只有一个子树节点
      /**
       * 命中逻辑：
       *  1. 待删除节点是单个节点
       *  2. 待删除节点只有一个子树节点
       *  3. 待删除节点有两个节点，递归命中：
       *     - 后继节点是黑色，有一个红色的右子节点
       *     - 后继节点是单个节点
       */
      let delNode = null // 实际被删除的节点 可能是待删除节点 或 待删除节点的子节点
      let isLeftChild = false // delNode是否是父节点的左子节点
      // 待删除节点有一个子节点 待删除节点一定为黑色，子节点为红色
      if (current.left) {
        // 待删除节点有左子节点
        current.key = current.left.key // 交换值
        current.value = current.left.value
        delNode = current.left // 标记实际被删除节点
        isLeftChild = true
        current.left = null
      } else if (current.right) {
        // 待删除节点有右子节点
        current.key = current.right.key // 交换值
        current.value = current.right.value
        delNode = current.right // 标记实际被删除节点
        isLeftChild = false
        current.right = null
      } else {
        // 待删除节点没有子节点 那么待删除节点就是实际被删除节点
        if (current.parent.left === current) {
          isLeftChild = true
          current.parent.left = null
        } else {
          isLeftChild = false
          current.parent.right = null
        }
        delNode = current
      }

      if (current.parent === null && current === delNode) { // 空树
        // 待删除节点是根节点 且 待删除节点是实际被删除节点  说明待删除的根节点没有子节点，清空树
        this.root = null
      } else {
        // 删除节点后平衡修正
        this.balanceDeletion(delNode, isLeftChild)
      }
    }
  }

  /**
   * 删除节点后平衡修正
   * @param {*} node 平衡的参照节点 传入的节点已被删除
   * @param {*} isLeftChild 已被删除的节点是否是父节点的左子节点
   */
  balanceDeletion (node, isLeftChild) {
    const deletedNode = node // 已被移除节点
    // 删除根节点
    while (node !== this.root && node.color === COLOR.BLACK) {
      const nodeParent = node.parent
      if ((isLeftChild && deletedNode === node) || node.parent.left === node) { // 参照节点是父节点的左子节点
        const nodeBrother = nodeParent.right // 兄弟节点

        if (nodeBrother.color === COLOR.BLACK) {
          // 黑兄弟
          if (nodeBrother.right !== null && nodeBrother.right.color === COLOR.RED) {
            // 黑兄弟，右红侄
            // 解决：左旋父，祖染父色，父叔黑
            this.rotateLeft(nodeParent)
            nodeParent.parent.color = nodeParent.color // 祖染父色
            nodeParent.color = COLOR.BLACK // 父黑
            node.parent.parent.right.color = COLOR.BLACK // 叔黑
            break
          } else if (nodeBrother.left !== null && nodeBrother.left.color === COLOR.RED) {
            // 黑兄弟，左红侄
            // 解决：右旋兄，交换兄弟与其右子颜色，变成 黑兄弟，右红侄
            this.rotateRight(nodeParent.right)
            nodeParent.right.color = COLOR.BLACK // 兄弟颜色
            nodeParent.right.right.color = COLOR.RED // 兄弟右子颜色
            // 回归 黑兄弟，右红侄 循环处理
            continue
          } else {
            // 黑兄弟，双黑侄
            // 解决：兄弟红，向上找，遇根或红节点，染黑即解决
            nodeBrother.color = COLOR.RED // 兄弟红
            node = node.parent // 上移视角 以父为参照节点
            continue
          }
        } else {
          // 红兄弟
          // 解决：左旋父，父、祖换色，变成上面3种情况
          this.rotateLeft(nodeParent)
          nodeParent.color = COLOR.RED
          nodeParent.parent.color = COLOR.BLACK
          continue
        }
      } else { // 参照节点是父节点的右子节点
        const nodeBrother = nodeParent.left // 兄弟节点

        if (nodeBrother.color === COLOR.BLACK) {
          // 黑兄弟
          if (nodeBrother.left !== null && nodeBrother.left.color === COLOR.RED) {
            // 黑兄弟，左红侄
            // 解决：右旋父，祖染父色，父叔黑
            this.rotateRight(nodeParent)
            nodeParent.parent.color = nodeParent.color
            nodeParent.color = COLOR.BLACK
            node.parent.parent.left.color = COLOR.BLACK
            break
          } else if (nodeBrother.right !== null && nodeBrother.right.color === COLOR.RED) {
            // 黑兄弟，右红侄
            // 解决：左旋兄，交换兄弟与其左子颜色 变成 黑兄弟，左红侄
            this.rotateLeft(node.parent.left)
            node.parent.left.color = COLOR.BLACK // 兄弟颜色
            node.parent.left.left.color = COLOR.RED // 左子颜色
            continue
          } else {
            // 黑兄弟，双黑侄
            // 解决：兄弟红，向上找，遇根或红节点，染黑即解决
            nodeBrother.color = COLOR.RED
            node = node.parent // 上移视角 以父为参照节点
            continue
          }
        } else {
          // 红兄弟
          // 解决：右旋父，父、祖换色，变成前3种镜像情况
          this.rotateRight(nodeParent)
          nodeParent.color = COLOR.RED
          nodeParent.parent.color = COLOR.BLACK
          continue
        }
      }
    }

    // 删除只有一个子树的节点 或 情况3：遇根或红，染黑
    node.color = COLOR.BLACK
  }
}
