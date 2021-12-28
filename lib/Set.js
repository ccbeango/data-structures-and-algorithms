/**
 * 集合 基于Object
 */
module.exports = class Set {
  constructor () {
    this.items = {}
  }

  // 向集合添加一个新的项
  add (value) {
    if (this.has(value)) return false

    this.items[value] = value
    return true
  }

  remove (value) {
    if (!this.has(value)) return false

    delete this.items[value]
    return true
  }

  // 判断集合中是否存在value值，存在返回 true，否则返回 false
  has (value) {
    return this.items.hasOwnProperty(value)
  }

  // 清空集合中所有的元素
  clear () {
    this.items = {}
  }

  // 获取集合的大小
  size () {
    return Object.keys(this.items).length
  }

  // 获取集合中所有的值
  values () {
    return Object.keys(this.items)
  }

  // 求两个集合的合集
  union (otherSet) {
    const unionSet = new Set()

    // 将当前集合 this 的所有 value，添加到新集合 unionSet 中
    for (const value of this.values()) {
      unionSet.add(value)
    }

    // 将 otherSet 集合的所有 value，添加到新集合 unionSet 中
    for (const value of otherSet.values()) {
      unionSet.add(value)
    }

    return unionSet
  }

  // 求两个集合的交集
  intersection (otherSet) {
    const intersectionSet = new Set()

    // 从当前集合中取出每一个 value，判断是否在 otherSet 集合中存在
    for (const value of this.values()) {
      if (otherSet.has(value)) {
        intersectionSet.add(value)
      }
    }

    return intersectionSet
  }

  // this 与 otherSet 的差集
  difference (otherSet) {
    const differenceSet = new Set()

    // 从当前集合中取出每一个 value，判断是否在 otherSet 集合中存在，
    // 不存在的即为this 与 otherSet 的差集差集
    for (const value of this.values()) {
      if (!otherSet.has(value)) {
        differenceSet.add(value)
      }
    }

    return differenceSet
  }

  // this 是否是 otherSet 的子集
  subset (otherSet) {
    const subSet = new Set()
    // 从当前集合中取出每一个 value，判断是否在 otherSet 集合中存在，有不存在的返回 false
    // 即 this 不是 otherSet 的子集
    for (const value of this.values()) {
      if (!otherSet.has(value)) {
        return false
      }
    }

    return true
  }
}
