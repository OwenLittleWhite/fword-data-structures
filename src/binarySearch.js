/**
 * 二分查找
 * @param {Number} element 待查找的元素
 * @param {Array<Number>} sortArr 要查找的有序数组，从小到大排序
 * @returns {Number} 返回该元素在数组中的下标
 */
function binarySearch (element, sortArr) {
  // 定义左右两个下标
  let left = 0
  let right = sortArr.length - 1
  while (left <= right) {
    const mid = Math.floor((left + right) / 2) // 中间位置
    const midValue = sortArr[mid]
    if (midValue > element) {
      right = mid - 1
    } else if (midValue < element) {
      left = mid + 1
    } else {
      return mid
    }
  }
  return -1
}
console.log(binarySearch(5, [5, 6, 7, 8, 9]))
console.log(binarySearch(10, [5, 6, 7, 8, 9]))
console.log(binarySearch(7, [5, 6, 7, 8, 9]))
