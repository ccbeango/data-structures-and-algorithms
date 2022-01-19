const Dictionary = require('./Map')
const Queue = require('./Queue')
const Stack = require('./Stack')

const COLOR = {
  WHITE: 'white',
  GRAY: 'gray',
  BLACK: 'black'
}

module.exports = class Graph {
  constructor () {
    this.vertexes = [] // 顶点
    this.edges = new Dictionary() // 边
  }

  addVertex (val) {
    this.vertexes.push(val)
    // 将边添加到字典中，新增的顶点作为键，对应的值为一个存储边的空数组
    this.edges.set(val, [])
  }

  /**
   * 顶点添加边
   * @param {*} v1
   * @param {*} v2
   */
  addEdge (v1, v2) {
    this.edges.get(v1).push(v2) // 取出字典对象edges中存储边的数组，并添加关联顶点
    this.edges.get(v2).push(v1) // 表示的是无向表，故要添加互相指向的两条边
  }

  toString () {
    let res = ''
    for (let i = 0; i < this.vertexes.length; i++) {
      res += this.vertexes[i] + '->'
      let edges = this.edges.get(this.vertexes[i])
      for (let j = 0; j < edges.length; j++) {
          res += edges[j] + ' '
      }
      res += '\n'
    }
    return res
  }

  /**
   * 初始化顶点颜色
   * @returns 
   */
  _initializeColor () {
    const colors = {}
    for (let i = 0; i < this.vertexes.length; i++) {
      colors[this.vertexes[i]] = COLOR.WHITE
    }
    return colors
  }

  /**
   * 广度优先搜索
   * @param {*} v 第一个顶点
   * @param {*} handler
   */
  bfs (v, handler) {
    // 初始化顶点颜色
    const colors = this._initializeColor()

    const queue = new Queue()
    colors[v] = COLOR.GRAY // 置为灰色
    queue.enqueue(v) // 放入队列

    // 循环从队列中取出元素，队列为空则停止
    while(!queue.isEmpty()) {
      const qv = queue.dequeue()

      // qv的所有相邻顶点
      const qvNeighbours = this.edges.get(qv)

      // 将qv相邻顶点放入队列
      for (const neighbour of qvNeighbours) {
        if (colors[neighbour] === COLOR.WHITE) {
          // 未探测过的顶点，置为灰色，放入队列
          colors[neighbour] = COLOR.GRAY
          queue.enqueue(neighbour)
        }
      }

      // 顶点被访问过且被完全探测过 置为黑
      colors[v] = COLOR.BLACK

      if (typeof handler === 'function') {
        handler(qv)
      }
    }
  }

  /**
   * 深度优先搜索 递归
   * @param {*} v
   * @param {*} handler 
   */
  dfs (v, handler) {
    // 初始化顶点颜色
    const colors = this._initializeColor()

    this.dfsVisit(v, colors, handler)
  }
  /**
   * 遍历顶点
   * @param {*} v 
   * @param {*} colors 
   * @param {*} handler 
   */
  dfsVisit (v, colors, handler) {
    colors[v] = COLOR.GRAY

    handler(v)

    // 访问指定顶点的相邻顶点
    const vNeighbours = this.edges.get(v)
    for (const neighbour of vNeighbours) {
      if (colors[neighbour] === COLOR.WHITE) {
        // 相邻顶点为白色，递归调用函数继续访问
        this.dfsVisit(neighbour, colors, handler)
      }
    }

    colors[v] = COLOR.BLACK
  }

  /**
   * 深度优先搜索 栈
   * @param {*} v 
   * @param {*} handler 
   */
  dfs2 (v, handler) {
  }
}
