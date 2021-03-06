/**
 * 冒泡排序
 * @param {Array<Number>} arr
 */

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

/**
 * 插入排序
 * @param {Array<Number>} arr 
 */
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
/**
 * 希尔排序
 */

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
/**
 * Hibbard增量的希尔排序
 */
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
    for (parent = p; (parent * 2 + 1) < len; parent = child) {
        child = parent * 2 + 1; // 左儿子下标
        if ((child != len - 1) && (arr[child] < arr[child + 1])) {
            child++;  /* Child指向左右子结点的较大者 */
        }
        if (x >= arr[child])  /* 找到了合适位置 */ {
            break;
        }
        else  /* 下滤X */ {
            arr[parent] = arr[child];
        }
    }
    arr[parent] = x;
}

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
function mSort(arr, tempArr, lIndex, rightEnd) {
    let center;
    if (lIndex < rightEnd) {
        center = Math.floor((lIndex + rightEnd) / 2)
        mSort(arr, tempArr, lIndex, center);
        mSort(arr, tempArr, center + 1, rightEnd);
        merge(arr, tempArr, lIndex, center + 1, rightEnd)
    }
}
/**
 * 归并排序
 * @param {Array<Number>} arr 
 */
function mergeSort(arr) {
    let len = arr.length;
    let tempArr = new Array(len);
    mSort(arr, tempArr, 0, len - 1)
}

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
        for (; ;) {
            // 左边从left+1开始的，比pivot小则i向右移动
            while (arr[++i] < pivot) { }
            // 右边从right-2开始，比pivot大则i向左移动
            while (arr[--j] > pivot) { }
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

let testArr = [];

for (let i = 0; i < 10000000; i++) {
    testArr.push(Math.random());
}

// let arr1 = Array.from(testArr);
// let arr2 = Array.from(testArr);
let arr3 = Array.from(testArr);
let arr4 = Array.from(testArr);
let arr5 = Array.from(testArr);
let arr6 = Array.from(testArr);
let arr7 = Array.from(testArr);
let arr8 = Array.from(testArr);
let arr9 = Array.from(testArr);
// console.time('冒泡排序');
// bubbleSort(arr1);
// console.timeEnd('冒泡排序');
// console.time('插入排序')
// insertSort(arr2);
// console.timeEnd('插入排序');
console.time('希尔排序')
shellSort(arr3);
console.timeEnd('希尔排序');
console.time('hibbard希尔排序')
hibbardShellSort(arr4);
console.timeEnd('hibbard希尔排序');
console.time('sedgewick希尔排序')
sedgewickShellSort(arr5);
console.timeEnd('sedgewick希尔排序');
console.time('堆排序')
heapSort(arr6);
console.timeEnd('堆排序');
console.time('递归归并排序');
mergeSort(arr7);
console.timeEnd('递归归并排序');
console.time('非递归归并排序');
mergeSort2(arr8);
console.timeEnd('非递归归并排序');
console.time('快速排序');
quickSort(arr9);
console.timeEnd('快速排序');
// for (let j = 0; j < arr1.length; j++) {
//     if (arr1[j] !== arr2[j] || arr2[j] !== arr3[j]
//         || arr1[j] !== arr4[j] || arr1[j] !== arr5[j]
//         || arr1[j] !== arr6[j]
//         || arr1[j] !== arr7[j]
//         || arr1[j] !== arr8[j]
//         || arr1[j] !== arr9[j]) {
//         console.log(testArr)
//         console.log(arr1)
//         console.log(arr9)
//         throw new Error()
//     }
// }

for (let j = 0; j < arr8.length; j++) {
    if (arr8[j] !== arr9[j]) {
        throw new Error()
    }
}