// 排序算法

/**
 * 交换元素位置
 * @param {*} arr 
 * @param {*} idxA 
 * @param {*} idxB 
 */
function swap(arr, idxA, idxB) {
  [arr[idxA], arr[idxB]] = [arr[idxB], arr[idxA]]
}

/**
 * 冒泡排序
 */
function bubbleSort(arr) {
  // 外层循环：根据元素个数，决定几轮冒泡
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      // 内层循环：每轮比较相邻元素的大小
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1)
      }
    }
  }

  return arr
}


/**
 * 选择排序
 */
function selectionSort(arr) {
  // 外层循环：每次初始化标记最小元素位置索引
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i
    for (let j = i + 1; j < arr.length; j++) {
      // 内层循环：记录一轮循环中，未排序的元素中最小元素位置索引
      if (arr[min] > arr[j]) {
        min = j
      }
    }
    // 最小元素位置索引不等于每次循环初始值 i 本身
    // 说明最小元素在后面，交换原i位置元素和min位置元素 
    if (i !== min) swap(arr, i, min)
  }

  return arr
}

/**
 * 插入排序
 */
function insertionSort(arr) {
  // 外层循环：每次选出待排序元素
  for (let i = 1; i < arr.length; i++) {
    const element = arr[i] // 选出待排序元素

    let j = i // 记录新插入位置 默认在原位置
    while (j > 0 && arr[j - 1] > element) {
      // 后移前一个元素
      arr[j] = arr[j - 1]
      j-- // 更新插入位置
    }
    // 插入元素到索引j位置
    arr[j] = element
  }

  return arr
}

/**
 * 希尔排序
 */
function shellSort(arr) {
  // 普通增量序列
  // let gap = Math.floor(arr.length / 2) // 默认增量

  // Knuth增量序列
  let gap = 1
  while (gap < arr.length / 3) { // gap 1, 4, 13, 40 ...
    gap = gap * 3 + 1
  }

  // 第一层循环：while循环，使gap不断减小
  while (gap > 0) {
    // 第二层循环：插入排序 以gap为增量，进行分组，对分组进行插入排序
    // 每组从第二个开始排序，默认第一个为有序的
    for (let i = gap; i < arr.length; i++) {
      let element = arr[i]

      // 第三层循环：确定插入位置
      let j = i
      while (j >= gap && arr[j - gap] > element) {
        arr[j] = arr[j - gap] // 每次元素后移gap
        j -= gap
      }

      arr[j] = element
    }

    // 普通增量 重新计算增量
    // gap = Math.floor(gap / 2)
    // Knuth增量 重新计算增量
    gap = (gap - 1) / 3
  }

  return arr
}

/**
 * 快速排序 - 获取枢纽
 *  - 选择中位数作为枢纽
 * @param {*} left 最左侧索引
 * @param {*} right 左右侧索引
 */
function getPivot(arr, left, right) {
  const center = Math.floor((left + right) / 2)

  // 排序选中的左、中、右三个数，由大到小
  if (arr[left] > arr[center]) {
    swap(arr, left, center)
  }
  if (arr[center] > arr[right]) {
    swap(arr, center, right)
  }
  if (arr[left] > arr[center]) {
    swap(arr, left, center)
  }

  // 中位数与倒数第二个数交换位置 倒数第一的数一定比中位数大，直接当作放在右边
  swap(arr, center, right - 1)

  // 返回选择的枢纽pivot
  return arr[right - 1]
}

/**
 * 快速排序
 * @param {*} arr 待排序数组
 * @param {*} left 待排序数组最左边索引
 * @param {*} right 待排序数组最右边索引
 * @returns
 */
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    // 获取枢纽
    const pivot = getPivot(arr, left, right)

    // 创建两个指针
    let l = left // 左边指向最左
    let r = right - 1 // 右边指向倒数第二个 枢纽的位置
    while (l < r) {
      while (arr[++l] < pivot) {} // 右移左指针到大于pivot的位置
      while (arr[--r] > pivot) {} // 左移右指针到小于pivot的位置
      if (l < r) swap(arr, l, r) // 左指针索引小于右指针 交换左右指针指向的元素位置
    }

    // 交换左指针指向的元素和枢纽元素
    swap(arr, l, right - 1)

    // 左、右子集递归
    quickSort(arr, left, l - 1)
    quickSort(arr, l + 1, right)
  }

  return arr
}

/**
 * 下移堆化 大顶堆
 * @param {*} arr 
 * @param {*} index 
 * @param {*} heapSize 
 */
function heapify(arr, index, heapSize) {
  let largest = index

  const left = index * 2 + 1
  const right = index * 2 + 2

  if (left < heapSize && arr[left] > arr[index]) {
    // 左子节点更大
    largest = left
  }
  if (right < heapSize && arr[right] > arr[largest]) {
    // 再比对 右子节点更大
    largest = right
  }

  if (largest !== index) {
    swap(arr, index, largest) // 交换位置
    // largest位置此时为原index位置的节点，可能比子节点小，再进行堆化
    heapify(arr, largest, heapSize)
  }
}

/**
 * 堆排序
 */
function heapSort(arr) {
  // 构建堆 从最后一个父节点位置开始
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, i, arr.length)
  }

  let heapSize = arr.length
  while (heapSize > 1) {
    swap(arr, 0, --heapSize) // 交换最大值和堆的最后一个值，然后堆大小减1
    heapify(arr, 0, heapSize) // 重新下移堆化
  }

  return arr
}

/**
 * 合并两个数组
 * @param {*} lArr
 * @param {*} rArr
 * @returns
 */
function merge(lArr, rArr) {
  const result = []
  while (lArr.length > 0 && rArr.length > 0) {
    result.push(lArr[0] < rArr[0] ? lArr.shift() : rArr.shift())
  }

  return result.concat(lArr, rArr)
}

/**
 * 归并排序
 * @param {*} arr 
 * @returns 
 */
function mergeSort(arr) {
  if (arr.length > 1) {
    const midIndex = Math.floor(arr.length / 2)

    // 递归 分割数组
    const lArr = mergeSort(arr.splice(0, midIndex))
    const rArr = mergeSort(arr)
    // 数组合并
    arr = merge(lArr, rArr)
  }

  return arr
}

/**
 * 计数排序
 */
function countingSort(arr) {
  // 找到最大值 作为 最大索引
  // let max = arr[0]
  // for (let i = 1; i < arr.length; i++) {
  //   if (max < arr[i]) {
  //     max = arr[i]
  //   }
  // }
  let max = Math.max(...arr) // 最大值 作为 最大索引

  // 创建桶 根据arr的最大值，创建数组用于计数
  const buckets = new Array(max + 1).fill(0)
  for (let element of arr) {
    buckets[element]++
  }

  // 迭代buckets数组并构建排序后的结果数组
  let sortedIndex = 0 // 元素排序后的索引位置 默认0开始
  for (let i = 0; i < buckets.length; i++) {
    while (buckets[i]) {
      // 可能有相同的值，所以要根据计数值递减来将元素放到结果数组中合适的位置
      arr[sortedIndex++] = i
      buckets[i]--
    }
  }

  return arr
}

/**
 * 桶排序
 * @param {*} arr 
 * @param {*} bucketSize 每个桶的大小
 * @returns 
 */
function bucketSort (arr, bucketSize = 5) {
  let min = Math.min(...arr)
  let max = Math.max(...arr)

  // 创建桶
  let bucketCount = Math.floor((max - min) / bucketSize) + 1 // 桶数量
  const buckets = [] // 初始化桶
  for (let i = 0; i < bucketCount; i++) {
    buckets.push([])
  }

  // 计算索引并放入桶中
  for (let i = 0; i < arr.length; i++) {
    const bucketIdx = Math.floor((arr[i] - min) / bucketSize)
    buckets[bucketIdx].push(arr[i])
  }

  // 桶数据排序
  const sortedArr = []
  for (let i = 0; i < buckets.length; i++) {
    // 插入排序
    sortedArr.push(...insertionSort(buckets[i]))
  }

  return sortedArr
}


// 获得元素基于有效位应该插入的桶的索引
const getBucketIndex = (value, minValue, significantDigit, radixBase) =>
  Math.floor(((value - minValue) / significantDigit) % radixBase)

// 基于有效位的计数排序
const countingSortForRadix = (array, radixBase, significantDigit, minValue) => {
  let bucketsIndex
  const buckets = []
  const aux = []
  // 基于基数初始化桶
  for (let i = 0; i < radixBase; i++){
    buckets[i] = 0
  }
  // 基于数组中数的有效位进行计数排序
  for (let i = 0; i < array.length; i++){
    bucketsIndex = getBucketIndex(array[i], minValue, significantDigit, radixBase)
    buckets[bucketsIndex]++
  }
  // 由于进行的是计数排序，还需要计算累积结果来得到正确的计数值,即累加后才能得出相应元素基于有效位排序后应该插入的正确索引
  for (let i = 1; i < radixBase; i++){
    buckets[i] += buckets[i - 1]
  }
  // 倒序遍历原始数组，将原始数组按有效位排序后相应的元素插入到新数组的正确索引
  for (let i = array.length - 1; i >= 0; i--){
    bucketsIndex = getBucketIndex(array[i], minValue, significantDigit, radixBase)
    // 这里很关键，--buckets[bucketsIndex]就是该元素基于有效值排序后要插入的正确索引
    aux[--buckets[bucketsIndex]] = array[i]
  }
  // 将aux(排序好的)数组中的每个值转移到原始数组中
  for (let i = 0; i < array.length; i++){
    array[i] = aux[i]
  }
  return array
}

// 基数排序，根据数字的有效位或基数将整数分布到桶中
function radixSort(array, radixBase = 10) {
  if (array.length < 2) {
    return array
  }
  const minValue = Math.min(...array)
  const maxValue = Math.max(...array)
  // 对每一个有效位执行计数排序，从1开始
  let significantDigit = 1
  // 继续这个过程直到没有待排序的有效位
  while ((maxValue - minValue) / significantDigit >= 1) {
    array = countingSortForRadix(array, radixBase, significantDigit, minValue)
    significantDigit *= radixBase
  }
  return array
}

module.exports = {
  bubbleSort,
  selectionSort,
  insertionSort,
  shellSort,
  quickSort,
  heapSort,
  mergeSort,
  countingSort,
  bucketSort,
  radixSort
}