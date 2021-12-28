/**
 * 字典 基于对象
 */
module.exports = class Map {
  constructor () {
    this.items = {}
  }

  // 向字典中添加新元素
  set (key, value) {
    this.items[key] = value
  }

  // 如果某个键值存在于这个字典中，则返回 `true`，反之则返回 `false`
  has (key) {
    return this.items.hasOwnProperty(key)
  }

  // 通过使用键值来从字典中移除键值对应的数据值
  remove (key) {
    if (!this.has(key)) return false

    delete this.items[key]
    return true
  }

  // 通过键值查找特定的数值并返回
  get (key) {
    return this.has(key) ? this.items[key] : undefined
  }

  // 将这个字典中的所有元素全部删除
  clear () {
    this.items = {}
  }

  // 将字典所包含的所有键名以数组形式返回
  keys () {
    return Object.keys(this.items)
  }

  // 将字典所包含的所有数值以数组形式返回
  values() {
    return Object.values(this.items)
  }

  // 返回字典所包含元素的数量
  size () {
    return Object.keys(this.items).length
  }
}
