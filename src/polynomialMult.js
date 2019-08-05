/**
 * 多项式相乘
 */
// P1 = 4x^5 + 6x^3 + 8
const P1 = [{ coef: 4, expon: 5 }, { coef: 6, expon: 3 }, { coef: 8, expon: 0 }]
// P2 = 4x^6 + 2x^3 + 7x
const P2 = [{ coef: 4, expon: 6 }, { coef: 2, expon: 3 }, { coef: 7, expon: 1 }]

const { polynomialAdd } = require('./polynomialAdd')

/**
 * 使用方法一实现乘法
 * 将乘法运算转化为加法运算，即使用P1的每一项乘P2多项式，然后加到结果多项式里面
 */
function polynomialMult1 (P1, P2) {
  if (P1.length && P2.length) {
    let result = []
    for (let i = 0; i < P1.length; i++) {
      const p1 = P1[i]
      const tempResult = []
      for (let j = 0; j < P2.length; j++) {
        const p2 = P2[j]
        tempResult.push({
          coef: p1.coef * p2.coef,
          expon: p1.expon + p2.expon
        })
      }
      result = polynomialAdd(tempResult, result)
    }
    return result
  } else {
    return []
  }
}
console.log(polynomialMult1(P1, P2))
/**
 * 使用方法2实现乘法
 * 逐项插入，将P1的当前项乘P2的当前项，然后将结果插入至结果多项式中，关键在于要插入正确的位置。
 */
function polynomialMult2 (P1, P2) {
  if (P1.length && P2.length) {
    const result = []
    for (let i = 0; i < P1.length; i++) {
      const p1 = P1[i]
      for (let j = 0; j < P2.length; j++) {
        const p2 = P2[j]
        const mult = {
          coef: p1.coef * p2.coef,
          expon: p1.expon + p2.expon
        }
        insertMult(mult, result)
      }
    }
    // 将系数为0的过滤掉
    result.filter(i => {
      if (i.coef === 0) {
        return false
      } else {
        return true
      }
    })
    return result
  } else {
    return []
  }
}
// 插入乘积到结果多项式中
function insertMult (mult, result) {
  // 如果结果多项式没值则直接插入
  if (!result.length) {
    result.push(mult)
    return
  }
  let j = 0 // 待插入的下标
  for (let i = 0; i < result.length; i++) {
    const p = result[i]
    if (p.expon > mult.expon) {
      j++
    } else if (p.expon < mult.expon) {
      break
    } else {
      // 指数相等时，相加
      j = -1
      p.coef = p.coef + mult.coef
      break
    }
  }
  if (j >= 0) {
    // 将数据插入至数组中
    // 将j位置之后的数据往后挪一位，空出来j的位置，然后插入
    if (result[j]) {
      let k = result.length - 1
      for (; k >= j; k--) {
        result[k + 1] = result[k]
      }
    }
    result[j] = mult
  }
}
console.log(polynomialMult2(P1, P2))
