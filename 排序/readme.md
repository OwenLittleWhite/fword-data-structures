# 排序

排序分为内部排序外部排序，目前只考虑内部排序

稳定性：任意两个相等的数据，排序前后的相对位置不发生改变

没有一种排序是任何情况下都表现最好的

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

## 插入排序

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

对于下标i<j，如果A[i]>A[j]，则称(i,j)是
一对逆序对(inversion)

交换2个相邻元素正好消去1个逆序对！

插入排序：T(N, I) = O( N+I ) ---- 如果序列基本有序，则插入排序简单且高效

定理：任意N个不同元素组成的序列平均具有
N ( N  1 ) / 4 个逆序对。

定理：任何仅以交换相邻两元素来排序的算
法，其平均时间复杂度为  ( N2 ) 。

这意味着：要提高算法效率，我们必须
- 每次消去不止1个逆序对！
- 每次交换相隔较远的2个元素！