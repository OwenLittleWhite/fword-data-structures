# 排序

排序分为内部排序外部排序，目前只考虑内部排序

稳定性：任意两个相等的数据，排序前后的相对位置不发生改变

没有一种排序是任何情况下都表现最好的

* [简单排序](#简单排序)
    - [冒泡排序](#冒泡排序)
    - [插入排序](#插入排序)
* [希尔排序](#希尔排序)
* [堆排序](#堆排序)
* [归并排序](#归并排序)
* [快速排序](#快速排序)
* [表排序](#表排序)

## 简单排序

### 冒泡排序

![冒泡](https://github.com/OwenLittleWhite/fword-data-structures/blob/master/asserts/bubble.png)

每一趟将最大的泡泡排在最后，然后再将第二大的泡泡排在倒数第二个位置，依次类推，当一趟没有任何交换时程序可以break出来

JS语言冒泡排序的实现

``` JS
function bubbleSort(arr) {
    let len = arr.length;
    for (let i = len - 1; i >= 0; i--) {
        let flag = false; // 设置一个flag无交换时则已经有序程序退出
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                // 前者大于后者则交换位置
                flag = true;
                let temp;
                temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp
            }
        }
        if (!flag) {
            break;
        }
    }
}
```

最好情况：顺序 T = O( N )

最坏情况：逆序 T = O( N2 )

稳定

### 插入排序

插入排序类似于打牌时抓牌的操作

![插入](https://github.com/OwenLittleWhite/fword-data-structures/blob/master/asserts/insert.png)

默认先拿到了第一张牌，再去拿接下来的牌，和手中的牌从右边开始比较，选择插入的位置

JS语言插入排序的实现

``` JS
function insertSort(arr) {
    let len = arr.length;
    if (len <= 0) {
        return
    }
    for (let i = 1; i < len; i++) {
        let temp = arr[i]; /* 摸下一张牌 */
        let j;
        for (j = i; j > 0 && arr[j - 1] > temp; j--) {
            arr[j] = arr[j - 1] // 移出空位 
        }
        arr[j] = temp
    }
}
```

最好情况：顺序 T = O( N )

最坏情况：逆序 T = O( N2 )

稳定

### 时间复杂度下限

对于下标i<j，如果A[i]>A[j]，则称(i, j)是
一对逆序对(inversion)

交换2个相邻元素正好消去1个逆序对！

插入排序：T(N, I) = O( N+I ) ---- 如果序列基本有序，则插入排序简单且高效

定理：任意N个不同元素组成的序列平均具有
N ( N  1 ) / 4 个逆序对。

定理：任何仅以交换相邻两元素来排序的算
法，其平均时间复杂度为  ( N2 ) 。

这意味着：要提高算法效率，我们必须

* 每次消去不止1个逆序对！
* 每次交换相隔较远的2个元素！

## 希尔排序

对一个序列排序，先进行一次五间隔的插入排序，然后进行三间隔的插入排序，最后进行一间隔的插入排序

![shell1](https://github.com/OwenLittleWhite/fword-data-structures/blob/master/asserts/shell1.png)

* 定义增量序列 DM > DM-1 > … > D1 = 1
* 对每个 Dk 进行“Dk-间隔”排序( k = M, M-1, … 1 )
* 注意：“Dk-间隔”有序的序列，在执行“Dk-1-间隔”排序后，仍然是“Dk-间隔”有序的

### 希尔增量序列

这个增量序列是可以定义的，不同的增量序列会有不同的时间复杂度

下面举三个增量序列

#### 原始希尔增量序列

DM = Math.floor(N / 2), Dk = Math.floor(D(k+1) / 2)

``` JS
function shellSort(arr) {
    let len = arr.length;
    if (len <= 0) {
        return
    }
    let d;
    for (d = Math.floor(len / 2); d > 0; d = Math.floor(d /= 2)) {
        for (let i = d; i < len; i++) {
            let temp = arr[i]; /* 摸下一张牌 */
            let j;
            for (j = i; j >= d && arr[j - d] > temp; j -= d) {
                arr[j] = arr[j - d] // 移出空位 
            }
            arr[j] = temp
        }
    }
}
```

这种是有问题的，例如序列：  1 9 2 10 3 11 4 12 5 13 6 14 7 15 8 16

![shell2](https://github.com/OwenLittleWhite/fword-data-structures/blob/master/asserts/shell2.png)

增量元素不互质，则小增量可能根本不
起作用。

希尔排序的实现很简单，但是时间复杂度分析很复杂

#### Hibbard 增量序列

Dk = 2^k – 1 — 相邻元素互质

猜想：Tavg = O ( N^(5/4) )

``` JS
function hibbardShellSort(arr) {
    let len = arr.length;
    if (len <= 0) {
        return
    }
    let d;
    // 算出增量序列最大的K
    let maxK = Math.floor(Math.log2((len + 1)));
    let k;
    for (k = maxK; k > 0; k--) {
        d = 2 ** k - 1;
        for (let i = d; i < len; i++) {
            let temp = arr[i]; /* 摸下一张牌 */
            let j;
            for (j = i; j >= d && arr[j - d] > temp; j -= d) {
                arr[j] = arr[j - d] // 移出空位 
            }
            arr[j] = temp
        }
    }
}
```

### Sedgewick增量序列

{1, 5, 19, 41, 109, … } 
 
9\*4^i – 9\*2^i + 1 或 4^i – 3*2^i + 1

猜想：Tavg = O ( N^(7/6) )，Tworst = O ( N^(4/3) )

``` JS
/**
 * Sedgewick增量的希尔排序
 * @param {Array<Number>} arr 
 */
function sedgewickShellSort(arr) {
    let len = arr.length;
    if (len <= 0) {
        return
    }
    let d;
    // 生成增量序列
    let dArray = [];
    let index = 0;
    let exit = false;
    // 9*4^i – 9*2^i + 1 或 4^i – 3*2^i + 1
    while (!exit) {
        let result1 = 9 * (4 ** index) - 9 * (2 ** index) + 1;
        let result2 = 4 ** index - 3 * (2 ** index) + 1;
        if (result1 > 0) {
            if (result1 > len) {
                exit = true;
            } else {
                dArray.push(result1);
            }
        } else if (result2 > 0) {
            if (result2 > len) {
                exit = true;
            } else {
                dArray.push(result2);
            }
        }
        index++;
    }
    for (k = dArray.length - 1; k >= 0; k--) {
        d = dArray[k];
        for (let i = d; i < len; i++) {
            let temp = arr[i]; /* 摸下一张牌 */
            let j;
            for (j = i; j >= d && arr[j - d] > temp; j -= d) {
                arr[j] = arr[j - d] // 移出空位 
            }
            arr[j] = temp
        }
    }
}
```

---

希尔排序是不稳定的算法

## 堆排序

选择排序的伪码描述

``` C
void Selection_Sort ( ElementType A[], int N )
{ for ( i = 0; i < N; i ++ ) {
    MinPosition = ScanForMin( A, i, N–1 );
    /* 从A[i]到A[N–1]中找最小元，并将其位置赋给MinPosition */
    Swap( A[i], A[MinPosition] );
   /* 将未排序部分的最小元换到有序部分的最后位置 */
  }
}
```

此排序方法的时间复杂度有关的就是怎么快速找到最小元

可以利用最小堆来快速找到最小元

第一种算法就是，将数组的元素构建一个堆，然后从堆中删除最小的元素，时间复杂度 T ( N ) = O ( N log N )

伪码描述：

``` C
void Heap_Sort ( ElementType A[], int N )
{ BuildHeap(A); /* O(N) */
  for ( i=0; i<N; i++ )
    TmpA[i] = DeleteMin(A); /* O(logN) */
  for ( i=0; i<N; i++ ) /* O(N) */
    A[i] = TmpA[i];
}
```

缺点：需要额外O(N)空间，并且复制元素需要时间。

另外一种算法：构建成最大堆，然后将堆顶的元素和最后一个元素交换，然后堆删除最后一个元素，再调整成最大堆。

JS完整代码

``` JS
/**
 * 堆排序
 * @param {Array<Number>} arr
 */
function heapSort(arr) {
    let len = arr.length;
    // 建立最大堆
    // 从最后一个结点的父节点开始调整成最大堆
    for (let i = Math.floor(len / 2) - 1; i >= 0; i--) {
        percDown(arr, i, len)
    }
    for (let j = len - 1; j > 0; j--) {
        /* 将堆顶的元素放到最后 */
        let temp = arr[0];
        arr[0] = arr[j];
        arr[j] = temp;
        /** 再次调整成最大堆 */
        percDown(arr, 0, j);
    }
}

function percDown(arr, p, len) {
    /* 将len个元素的数组中以arr[p]为根的子堆调整为最大堆 */
    let parent, child;
    let x;
    x = arr[p]; /* 取出根结点存放的值 */
    for (parent = p;
        (parent * 2 + 1) < len; parent = child) {
        child = parent * 2 + 1; // 左儿子下标
        if ((child != len - 1) && (arr[child] < arr[child + 1])) {
            child++; /* Child指向左右子结点的较大者 */
        }
        if (x >= arr[child]) /* 找到了合适位置 */ {
            break;
        } else /* 下滤X */ {
            arr[parent] = arr[child];
        }
    }
    arr[parent] = x;
}
```

定理：堆排序处理N个不同元素的
随机排列的平均比较次数是
2N logN - O(Nlog logN) 。

虽然堆排序给出最佳平均时间复
杂度，但实际效果不如用
Sedgewick增量序列的希尔排序。

## 归并排序

归并排序的核心在于两个有序子列的合并

![merge](https://github.com/OwenLittleWhite/fword-data-structures/blob/master/asserts/merge.png)

如果两个子列一共有N个元素，则归并的时间复杂度是？
T ( N ) = O( N )

有序子列的归并算法：

``` JS
/**
 * 有序子列的归并
 * @param {Array<Number>} arr 待合并的数组
 * @param {Array<Number>} tempArr 临时的数组，合并的结果存放在这里，然后再导回给原数组
 * @param {Number} lIndex 左边序列的起始下标
 * @param {Number} rIndex 右边序列的起始下标
 * @param {Number} rightEnd 右边序列的终止下标
 */
function merge(arr, tempArr, lIndex, rIndex, rightEnd) {
    let leftEnd = rIndex - 1; // 左右两边挨着，所以左边序列的终止位置在右边起始位置的前一个
    let tempIndex = lIndex; // 临时数组的起始下标
    let numCnt = rightEnd - lIndex + 1; // 元素的总个数，元素从临时数组导回去的时候使用
    // 将左右两个序列合并
    while (lIndex <= leftEnd && rIndex <= rightEnd) {
        if (arr[lIndex] <= arr[rIndex]) {
            tempArr[tempIndex++] = arr[lIndex++];
        } else {
            tempArr[tempIndex++] = arr[rIndex++];
        }
    }
    // 左右两边有剩下的则直接复制进临时数组中去
    while (lIndex <= leftEnd) {
        tempArr[tempIndex++] = arr[lIndex++];
    }
    while (rIndex <= rightEnd) {
        tempArr[tempIndex++] = arr[rIndex++];
    }
    // 将元素由临时数组复制回去到原数组中去
    for (let i = 0; i < numCnt; i++) {
        arr[rightEnd] = tempArr[rightEnd];
        rightEnd--
    }

}
```

### 递归归并排序

然后再递归的去排序，采用分而治之的思想

![merge2](https://github.com/OwenLittleWhite/fword-data-structures/blob/master/asserts/merge2.png)

``` JS
function mSort(arr, tempArr, lIndex, rightEnd) {
    let center;
    if (lIndex < rightEnd) {
        center = Math.floor((lIndex + rightEnd) / 2)
        // 对左边排序
        mSort(arr, tempArr, lIndex, center);
        // 对右边排序
        mSort(arr, tempArr, center + 1, rightEnd);
        // 合并结果
        merge(arr, tempArr, lIndex, center + 1, rightEnd)
    }
}
```

和其他的排序方法统一传参

``` JS
/**
 * 归并排序
 * @param {Array<Number>} arr 
 */
function mergeSort(arr) {
    let len = arr.length;
    let tempArr = new Array(len);
    mSort(arr, tempArr, 0, len - 1)
}
```

这就是最终的递归算法下的归并排序

其复杂度为：

T( N ) = T( N/2 ) + T( N/2 ) + O( N )   T( N ) = O( N logN )

此排序还是**稳定**的排序

不过额外的空间复杂度为：O( N )

### 非递归归并排序

![merge3](https://github.com/OwenLittleWhite/fword-data-structures/blob/master/asserts/merge3.png)

``` JS
function mergePass(arr, tempArr, len, length) {
    let i, j;
    for (i = 0; i <= len - 2 * length; i += 2 * length)
        merge(arr, tempArr, i, i + length, i + 2 * length - 1);
    if (i + length < len) /* 归并最后2个子列*/
        merge(arr, tempArr, i, i + length, len - 1);
    else /* 最后只剩1个子列*/
        for (j = i; j < len; j++) tempArr[j] = arr[j];
}
/**
 * 非递归的归并排序
 * @param {Array<Number>} arr 
 */
function mergeSort2(arr) {
    let len = arr.length;
    let length;
    length = 1; /* 初始化子序列长度*/
    let tempArr = new Array(len);
    while (length < len) {
        mergePass(arr, tempArr, len, length);
        length *= 2;
        mergePass(tempArr, arr, len, length);
        length *= 2;
    }
}
```

性质：**稳定**

## 快速排序

快速排序是从序列中选出一个数，然后将所有大于这个数的划分到右边，小于这个数的划分到左边，然后再对右边和左边递归地进行快速排序。

什么是快速排序算法的最好情况？每次正好中分 T(N) = O( NlogN )

选出来的数称作主元，接下来的操作称作子集划分。

快速排序快的原因在于每次排序主元都是放在了最终正确的位置上

### 选主元

有三种方式选主元

1. 取第一个数
2. 随机取
3. 取头、中、尾的中位数

第一种方式取的话，对于一个已经有序的序列，复杂度T(N) = O(N^2)

第二种方式的话，取随机数的代价不低

第三种方式：

``` JS
/**
 * 取中位数
 * @param {Array<Number>} arr 
 * @param {Number} left 最左边的下标
 * @param {Number} right 最右边的下标
 */
function median3(arr, left, right) {
    let center = Math.floor((left + right) / 2);
    if (arr[left] > arr[center]) {
        // 如果左边的大于中间的，则交换位置
        let temp = arr[left];
        arr[left] = arr[center];
        arr[center] = temp;
    }
    if (arr[left] > arr[right]) {
        let temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
    }
    // 程序运行至此，左边的为最小的
    // 将最大放到右边
    if (arr[center] > arr[right]) {
        let temp = arr[center];
        arr[center] = arr[right];
        arr[right] = temp;
    }
    // 将主元放到右边
    let temp = arr[right - 1];
    arr[right - 1] = arr[center];
    arr[center] = temp;
    /* 子集划分时只需要考虑 arr[left+1] … arr[right–2] */
    return arr[right - 1]; // 返回主元
}
```

### 子集划分

![quick](https://github.com/OwenLittleWhite/fword-data-structures/blob/master/asserts/quick.png)

j从arr[left+1]开始和主元比较，小于主元的话，j向右移动，大于等于主元的话停下来，i再从arr[right-2]开始和主元比较，大于主元，i向左移动，小于主元则停下来和左边的交换，然后再从左边j开始比较，当j小于等于i的时候结束。

### 小规模数据的处理

设置一个阈值，当数据量充分小时不再递归快速排序而是采用插入排序。

JS 代码实现

``` JS
/**
 * 快速排序
 * @param {Array<Number>} arr 
 * @param {Number} left
 * @param {Number} right 
 */
function _quickSort(arr, left, right) {
    if (500 <= right - left) {
        let pivot = median3(arr, left, right);
        let i = left;
        let j = right - 1;
        for (;;) {
            // 左边从left+1开始的，比pivot小则i向右移动
            while (arr[++i] < pivot) {}
            // 右边从right-2开始，比pivot大则i向左移动
            while (arr[--j] > pivot) {}
            if (i < j) {
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp
            } else {
                break;
            }
        }
        // 将主元放到最终的位置
        let temp = arr[i];
        arr[i] = arr[right - 1];
        arr[right - 1] = temp;
        // 分而治之
        _quickSort(arr, left, i - 1);
        _quickSort(arr, i + 1, right);

    } else {
        // 小于一定规模则插入排序
        let tempArr = arr.slice(left, right + 1);
        insertSort(tempArr)
        for (let i = 0; i < tempArr.length; i++) {
            arr[left + i] = tempArr[i]
        }
    }
}
/**
 * 快速排序
 * @param {Array<Number>} arr 
 */
function quickSort(arr) {
    let len = arr.length
    _quickSort(arr, 0, len - 1)
}
```

## 表排序

当待排的数据移动的成本很高时，比如说一部电影、一本字典，就需要表排序了。

表排序就是定义一个待排序列的指针数组（表）。

将排好序的指针存入table里面

如下图，按照key的英文字母顺序对这几本书进行排序

![table](https://github.com/OwenLittleWhite/fword-data-structures/blob/master/asserts/table.png)

如果只是按照顺序输出的话，直接输出

A[ table[0] ], A[ table[1] ], ……, A[ table[N-1] ]

如果物理位置要排序的话

N个数字的排列由若干个独立的环组成

![table2](https://github.com/OwenLittleWhite/fword-data-structures/blob/master/asserts/table2.png)

如图所示，红色的为一个环，绿色的为一个环，蓝色的为一个环

以红色环举例：

A[0]的位置本来要放A[3], 而A[3]的位置是要放A[1]，A[1]的位置要放A[5], A[5]的位置放A[0], 所以形成了一个环

移动时，将A[0]位置的f元素放到临时的地方

temp = f

将table[0]即A[3]元素放到A[0], 依次类推当 if ( table[i] == i ) 环结束

### 复杂度分析

最好情况：初始即有序

最坏情况：

有 N / 2 个环，每个环包含2个元素

需要 3N / 2 次元素移动

T = O( m N ) ，m 是每个A元素的复制时间。

## 基数排序

### 桶排序

TODO
