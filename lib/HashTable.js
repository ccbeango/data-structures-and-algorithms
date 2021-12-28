
/**
 * 哈希函数
 * @param {*} str 
 * @param {*} size 
 * @returns hashCode
 */
function hashFun (str, size) {
  const prime = 37 // 质数
  // 初始化hashCode的值
  let hashCode = 0

  // 霍纳法则
  for (let i = 0; i < str.length; i++) {
    hashCode = prime * hashCode + str.charCodeAt(i)
  }

  // 求模运算
  return hashCode % size
}

/**
 * 哈希表 基于 链地址法
 */
module.exports = class HashTable {
  constructor () {
    this.storage = [] // 存放相关元素
    this.count = 0 // 已存储的数据个数
    this.limit = 7 // 数组的长度

  }

  // 哈希函数，生成哈希code
  hash (str, limit) {
    const prime = 37 // 质数
    // 初始化hashCode的值
    let hashCode = 0

    // 霍纳法则
    for (let i = 0; i < str.length; i++) {
      hashCode = prime * hashCode + str.charCodeAt(i)
    }

    // 求模运算
    return hashCode % limit
  }

  // 插入和修改元素
  put (key, value) {
    // 获取key对应的index
    const index = this.hash(key, this.limit)

    // 获取数组bucket （也可用链表）
    let bucket = this.storage[index]
    if (bucket === undefined) {
      // 数组不存在则初始化数组
      bucket = []
      this.storage[index] = bucket
    }

    // 修改已存在的元素
    for (const tuple of bucket) {
      if (tuple[0] === key) {
        tuple[1] = value
        return
      }
    }

    // 执行到次数则说明元素不存在 新增元素
    bucket.push([key, value])
    // 已存储个数加1
    this.count++

    // 是否需要扩容判断 如果装填因子大于0.75，则扩容
    if (this.count / this.limit > 0.75) {
      this.resize(this.getPrime(this.limit * 2))
    }
  }

  // 根据key获取value
  get (key) {
    const index = this.hash(key, this.limit)

    const bucket = this.storage[index]

    if (bucket === undefined) {
      return null
    }

    // 循环判断bucket中是否有key对应的value
    for (const tuple of bucket) {
      if (tuple[0] === key) {
        return tuple[1]
      }
    }

    // 未找到，返回null
    return null
  }

  // 根据key移除元素
  remove(key) {
    const index = this.hash(key, this.limit)

    const bucket = this.storage[index]
    if (bucket === undefined) {
      return null
    }

    // 遍历bucket，寻找对应的数据并做移除
    for (let i = 0, len = bucket.length; i < len; i++) {
      const tuple = bucket[i]
      if (tuple[0] === key) {
        // 移除元素
        bucket.splice(i, 1)
        this.count--
        // 压缩
        if (this.limit > 7 && this.limit / this.count < 0.25) {
          this.resize(this.getPrime(Math.floor(this.limit / 2)))
        }
        return tuple
      }
    }

    // 来到该位置，说明没有对应的数据，返回null
    return null
  }

  isEmpty () {
    return this.count === 0
  }

  size () {
    return this.count
  }

  // 重新调整哈希表大小，扩容或压缩
  resize (newLimit) {
    // 保存旧的数组内容
    const oldStorage = this.storage

    // 重置所有属性
    this.storage = []
    this.count = 0
    this.limit = newLimit

    for (const bucket of oldStorage) {
      if (bucket) {
        for (const tuple of bucket) {
          this.put(...tuple)
        }
      }
    }
  }

  // 方法1 是否是质数 效率低
  isPrime_unrecommend (num) {
    if (num <= 1) return false
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        return false
      }
    }
    return true
  }

  // 方法2 是否是质数
  isPrime (num) {
    if (num <= 1) return false
    const sqrtNum = Math.ceil(Math.sqrt(num))
    for (let i = 2; i < sqrtNum; i++) {
      if (num % i === 0) {
        return false
      }
    }
    return true
  }

  // 获取质数
  getPrime (num) {
    while(!this.isPrime(num)) {
      num++
    }
    return num
  }
}
