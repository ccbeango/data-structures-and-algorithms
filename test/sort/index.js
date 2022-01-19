const Sort = require('../../lib/Sort')

const list = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]

// 冒泡排序
console.log(Sort.bubbleSort([...list]))

// 选择排序
console.log(Sort.selectionSort([...list]))

// 插入排序
console.log(Sort.insertionSort([...list]))

// 希尔排序
console.log(Sort.shellSort([...list]))

// 归并排序
console.log(Sort.mergeSort([...list]))

// 堆排序
console.log(Sort.heapSort([...list]))
