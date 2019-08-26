# 排序

排序分为内部排序外部排序，目前只考虑内部排序

稳定性：任意两个相等的数据，排序前后的相对位置不发生改变

没有一种排序是任何情况下都表现最好的

* [简单排序](#简单排序)
* [希尔排序](#希尔排序)
* [堆排序](#堆排序)

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

时间复杂度有关的就是怎么找到最小元

可以利用最小堆和来快速找到最小元

第一种算法就是，将数组的元素构建一个堆，然后从堆中删除最小的元素，T ( N ) = O ( N log N )

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
