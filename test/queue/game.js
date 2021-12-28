const Queue = require('../../lib/Queue')

/**
 * 数到num的人被淘汰，最终剩下的一人获胜
 * @param {*} nameList 
 * @param {*} num 
 * @returns 
 */
function game (nameList, num) {
  const queue = new Queue()

  // 将所有人放入队列
  for (let i = 0; i < nameList.length; i++) {
    queue.enqueue(nameList[i])
  }

  while (queue.size() > 1) {
    for (let i = 1; i < num; i++) { // 从1开始数
      // 小于num 即 没有数到num的人从队列中取出再放入队列
      queue.enqueue(queue.dequeue())
    }
    // 此时数num的人在队列最前端 将数num的人，从队列中移除
    queue.dequeue()
  }

  return nameList.indexOf(queue.front())
}

// 数到8的人被淘汰
console.log(game(['John', 'Jack', 'Camila', 'Ingrid', 'Carl'], 8)) // 0 即 John获胜
