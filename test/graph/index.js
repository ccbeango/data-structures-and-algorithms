const Graph = require('../../lib/Graph') 

// 测试代码
let graph = new Graph()

// 添加顶点
let myVertexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
for (let i = 0; i < myVertexes.length; i++) {
  graph.addVertex(myVertexes[i])
}

// 添加边
graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('E', 'I')

console.log('toString', graph.toString())


// bfs
let bfsStr = ''
graph.bfs(graph.vertexes[0], (v) => {
  bfsStr += v + ' '
})
console.log(bfsStr)

// dfs
let dfsStr = ''
graph.dfs(graph.vertexes[0], (v) => {
  dfsStr += v + ' '
})
console.log(dfsStr)

// dfs2
let dfsStr2 = ''
graph.dfs2(graph.vertexes[0], (v) => {
  dfsStr2 += v + ' '
})
console.log(dfsStr2)