const Sort = require('../../lib/Sort')

const list = [9, 5, 6, 8, 2, 7, 3, 4, 1]

// 冒泡排序
console.log(Sort.bubbleSort([...list]))

// 选择排序
console.log(Sort.selectionSort([...list]))

// 插入排序
console.log(Sort.insertionSort([...list]))

// 希尔排序
console.log(Sort.shellSort([...list]))

// // 归并排序
// console.log(Sort.mergeSort([...list]))

// // 堆排序
// console.log(Sort.heapSort([...list]))

// 快速排序
console.log(Sort.quickSort([...list]))
// console.log(Sort.quickSort([23, 4, 76, 10, 72, 7, 99, 12, 13]))

// 堆排序
console.log(Sort.heapSort([...list]))

// 归并排序
console.log(Sort.mergeSort([...list]))

