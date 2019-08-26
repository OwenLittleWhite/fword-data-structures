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
let testArr = [];

for (let i = 0; i < 10000000; i++) {
    testArr.push(Math.random());
}
let arr1 = Array.from(testArr);
let arr2 = Array.from(testArr);
let arr3 = Array.from(testArr);
let arr4 = Array.from(testArr);
console.time('冒泡排序');
bubbleSort(arr1);
console.timeEnd('冒泡排序');
console.time('插入排序')
insertSort(arr2);
console.timeEnd('插入排序');
console.time('希尔排序')
shellSort(arr3);
console.timeEnd('希尔排序');
console.time('hibbard希尔排序')
hibbardShellSort(arr4);
console.timeEnd('hibbard希尔排序');

for (let j = 0; j < arr1.length; j++) {
    if (arr1[j] !== arr2[j] || arr1[j] !== arr3[j] || arr1[j] !== arr4[j]) {
        throw new Error()
    }
}