/**
 * 小顶堆
 */
module.exports = class MinHeap {
  constructor () {
    this.heap = []
  }

  getHeap () {
    return this.heap
  }

  size () {
    return this.heap.length
  }

  isEmpty () {
    return this.size === 0
  }

  clear () {
    this.heap = []
  }

  // 父节点索引
  getParentIndex (index) {
    if (index === 0) {
      return undefined
    }

    return Math.floor(((index - 1) / 2))
  }

  // 左子节点索引
  getLeftIndex (index) {
    return index * 2 + 1
  }

  // 右子节点索引
  getRightIndex (index) {
    return index * 2 + 2
  }

  // 交换两索引位置的值
  swap (indexA, indexB) {
    [this.heap[indexA], this.heap[indexB]] = [this.heap[indexB], this.heap[indexA]]
  }

  // 返回堆中最小值，且不会移除这个值
  min () {
    return this.isEmpty() ? undefined : this.heap[0]
  }

  /**
   * 向堆中插入一个新的值
   * @param {*} key 
   */
  insert (val) {
    if (typeof val === 'number') {
      // 将值插入堆的底部叶节点
      this.heap.push(val)
      // 将这个值上移直至父节点小于这个插入的值
      this.heapifyUp(this.heap.length - 1)
      return true
    }
    return false
  }
  // 上移 接收插入值的位置作为参数
  heapifyUp (index) {
    // 获取其父节点的位置
    let parentIndex = this.getParentIndex(index)

    while (index > 0 && this.heap[index] < this.heap[parentIndex]) {
      // 插入的值小于它的父节点，将这个值和父节点值交换，一直比较到根节点
      this.swap(index, parentIndex)
      index = parentIndex
      parentIndex = this.getParentIndex(index)
    }
  }

  /**
   * 移除最小值，并返回这个值
   */
  extract () {
    if (this.isEmpty()) {
      return undefined
    }

    if (this.size() === 1) {
      return this.heap.shift()
    }

    // 堆中有不止一个值，移除第一个值并将堆中最后一个元素移动至根部
    const min = this.heap[0]
    this.heap[0] = this.heap.pop()
    // 下移新的根元素直至堆结构正常
    this.heapifyDown(0)

    return min
  }
  // 下移(堆化)，接收下移元素的位置作为参数
  heapifyDown (index) {
    const leftIndex = this.getLeftIndex(index)
    const rightIndex = this.getRightIndex(index)

    let minIndex = index // 记录两个值比较时的最小索引 默认是本身

    if (index < this.size() && this.heap[minIndex] > this.heap[leftIndex]) {
      // 左子节点更小 记录更小的左子节点索引
      minIndex = leftIndex
    }

    if (index < this.size() && this.heap[minIndex] > this.heap[rightIndex]) {
      // 再比对 右子节点更小 记录更小的左子节点索引
      minIndex = rightIndex
    }

    if (index !== minIndex) {
      // 索引不同，说明minIndex位置的元素更小，交换位置 即 下移index索引的元素
      this.swap(index, minIndex)
      // 递归 对比交换后minIndex位置的值与其左右子节点的值，是否是最小的，不是最小的继续下移
      this.heapifyDown(minIndex)
    }
  }
}
