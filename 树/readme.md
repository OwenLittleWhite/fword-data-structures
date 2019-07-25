# 树

一种层次关系称作树，家谱、组织架构、图书信息等

## 查找

根据某个给定关键字K ，从集合R中找出关键字与K相同的记录

### 静态查找

集合中记录是固定的，例如字典

方法一： 顺序查找，挨个遍历

方法二： 二分查找，数据存放要求是有序的

二分查找算法的实现

```JS
/**
 * 二分查找
 * @param {Number} element 待查找的元素
 * @param {Array<Number>} sortArr 要查找的有序数组，从小到大排序
 * @returns {Number} 返回该元素在数组中的下标
 */
function binarySearch(element, sortArr) {
  // 定义左右两个下标
  let left = 0;
  let right = sortArr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2); // 中间位置
    let midValue = sortArr[mid];
    if (midValue > element) {
      right = mid - 1;
    } else if (midValue < element) {
      left = mid + 1;
    } else {
      return mid;
    }
  }
  return -1;
}
```

二分查找的时间复杂度为O(logN)

练习：手绘十一个元素的二分查找判定树

## 树的特点

1. 子树是不相交的
2. 除了根结点外，每个结点有且仅有一个父结点；  
3. 一棵N个结点的树有N-1条边。

### 树的表示

使用儿子-兄弟表示法，一个元素有两个指针域，一个指向儿子，一个指向兄弟。

n个节点总共2n个指针域

这种表示法就将普通树转化为了二叉树

二叉树即结点的度为2的树。



