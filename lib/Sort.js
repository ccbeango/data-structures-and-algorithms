/**
 * 排序算法
 */
module.exports = {
  /**
   * 交换两个元素位置
   * @param {*} arr 数组
   * @param {*} indexA 位置A索引
   * @param {*} indexB 位置B索引
   */
  swap(arr, indexA, indexB) {
    [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]]
  },
  // 冒泡排序
  bubbleSort(arr) {
    for (let i = arr.length - 1; i > 0; i--) { // 冒泡趟数 反向循环
      for (let j = 0; j < i; j++) { // 比对次数
        if (arr[j] > arr[j + 1]) {
          this.swap(arr, j, j + 1)
        }
      }
    }

    return arr
  },
  // 选择排序
  selectionSort(arr) {
    // 外层循环：已排序元素，从0开始
    for (let i = 0; i < arr.length - 1; i++) {
      let min = i
      // 内层循环：未排序的元素从i+1位置开始，查找最小元素
      for (let j = min + 1; j < arr.length; j++) {
        if (arr[min] > arr[j]) {
          // 寻找最小数，保存最小数位置索引
          min = j
        }
      }

      // 交换
      if (i !== min) this.swap(arr, i, min)
    }

    return arr
  },
  // 插入排序
  insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
      const temp = arr[i] // 待排序的元素
      let j = i // 插入位置索引 默认为原位置 j-1前是已排序元素

      // 循环找到待插入位置
      while (arr[j - 1] > temp) {
        // 已排序的元素 大于 待排序元素 则向右移已排序元素腾出插入位置 
        arr[j] = arr[j - 1] // 右移大的元素
        j--
      }

      arr[j] = temp
    }

    return arr
  },
  // 希尔排序
  shellSort (arr) {
    let gap = Math.floor(arr.length / 2)

    // let gap = 1
    // while (gap < arr.length / 3) {
    //   gap = gap * 3 + 1
    // }

    while (gap > 0) {
      for (let i = gap; i < arr.length; i++) {
        let temp = arr[i]
        let j = i
        while (arr[j - gap] > temp) {
          arr[j] = arr[j - gap] 
          j -= gap
        }
        arr[j] = temp
      }
      gap = Math.floor(gap / 2)
    }

    return arr
  },
  // 归并排序
  mergeSort (arr) {
    if (arr.length < 2) return arr

    const mid = Math.floor(arr.length / 2)
    const left = arr.splice(0, mid)
    const right = arr

    const merge = (left, right) => {
      const result = []

      while (left.length && right.length) {
        result.push(left[0] <= right[0] ? left.shift() : right.shift())
      }

      return result.concat(left, right)
    }

    // 递归调用合并函数
    return merge(this.mergeSort(left), this.mergeSort(right))
  },
  // 快速排序
  quickSort (arr) {

  }
}
