const BinaryTreeNode = require('./BinaryTreeNode')

/**
 * 递归的查找某个元素
 * @param {*} x
 * @param {BinaryTreeNode} tree
 * @returns {BinaryTreeNode}
 */
const find = function (x, tree) {
  if (!tree) {
    return null
  }
  // x 大于根结点，则在右子树查找
  if (x > tree.value) {
    return find(x, tree.right)
  } else if (x < tree.value) {
    // x 小于根结点，则在左子树查找
    return find(x, tree.left)
  } else {
    return tree
  }
}

// **返回的时候递归调用称为尾递归，尾递归都可以用循环来实现**

/**
 * 循环的查找某个元素
 * @param {*} x
 * @param {BinaryTreeNode} tree
 * @returns {BinaryTreeNode}
 */
const iterFind = function (x, tree) {
  while (tree) {
    if (x > tree.value) {
      // 大于的话去右子树查找
      tree = tree.right
    } else if (x < tree.value) {
      tree = tree.left
    } else {
      return tree
    }
  }
  return null
}

/**
 * 查找最大值 即查找最右边的元素
 * @param {BinaryTreeNode} tree
 * @returns {BinaryTreeNode}
 */
const findMax = function (tree) {
  if (tree) {
    while (tree.right) {
      tree = tree.right
    }
  }
  return tree
}

/**
 * 查找最小值 即查找最左边的元素
 * @param {BinaryTreeNode} tree
 * @returns {BinaryTreeNode}
 */
const findMin = function (tree) {
  if (tree) {
    while (tree.left) {
      tree = tree.left
    }
  }
  return tree
}
/**
 * 向树中插入元素，和查找类似，跟根结点比较，大的则插到右子树，小则插到左子树
 * @param {*} x
 * @param {BinaryTreeNode} tree
 */
const insert = function (x, tree) {
  if (!tree) {
    const node = new BinaryTreeNode(x)
    tree = node
  } else {
    if (x < tree.value) {
      tree.left = insert(x, tree.left)
    } else if (x > tree.value) {
      tree.right = insert(x, tree.right)
    }
  }
  return tree
}
/**
 * 从树中删除元素
 * 1. 叶子结点直接删除
 * 2. 只有一个子结点的，将其子结点代替其位置
 * 3. 有两个子结点的，右子树的最小值或者左子树的最大值代替其位置
 * @param {*} x
 * @param {BinaryTreeNode} tree
 */
const remove = function (x, tree) {
  let temp = null
  if (!tree) {
    console.log('删除的元素不存在')
  } else if (x < tree.value) {
    // 左子树删除
    tree.left = remove(x, tree.left)
  } else if (x > tree.value) {
    // 右子树递归删除
    tree.right = remove(x, tree.right)
  } else {
    // 找到了
    if (tree.left && tree.right) {
      // 有两个结点
      temp = findMin(tree.right) // 右子树找一个最小的代替
      tree.value = temp.value
      tree.right = remove(tree.value, tree.right) // 删除这个最小的元素
    } else {
      // 有一个结点或者没有结点
      temp = tree
      if (!tree.left) {
        // 无左儿子
        tree = tree.right
      } else if (!tree.right) {
        tree = tree.left
      }
    }
  }
  return tree
}

// 将1~12月按照字母顺序放入树中

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep',
  'Oct', 'Nov', 'Dec']

let tree = null

months.forEach((month) => {
  tree = insert(month, tree)
})

const min = findMin(tree)
const max = findMax(tree)
console.log(min, max)
console.log(find('Jan', tree))
remove('Jan', tree)
console.log(iterFind('Jan', tree))
