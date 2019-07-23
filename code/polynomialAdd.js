/**
 * 多项式相加
 */
// P1 = 4x^5 + 6x^3 + 8
let P1 = [{ coef: 4, expon: 5 }, { coef: 6, expon: 3 }, { coef: 8, expon: 0 }];
// P2 = 4x^6 + 2x^3 + 7x
let P2 = [{ coef: 4, expon: 6 }, { coef: 2, expon: 3 }, { coef: 7, expon: 1 }];

function polynomialAdd(P1, P2) {
  let p1Index = 0;
  let p2Index = 0;
  let sum = [];
  while (p1Index < P1.length && p2Index < P2.length) {
    switch (compare(P1[p1Index], P2[p2Index])) {
      case 1:
        sum.push(P1[p1Index]);
        p1Index++;
        break;
      case -1:
        sum.push(P2[p2Index]);
        p2Index++;
        break;
      case 0:
        sum.push({
          coef: P1[p1Index].coef + P2[p2Index].coef,
          expon: P1[p1Index].expon
        });
        p1Index++;
        p2Index++;
        break;
    }
  }
  for (; p1Index < P1.length; p1Index++) {
    sum.push(P1[p1Index]);
  }
  for (; p2Index < P2.length; p2Index++) {
    sum.push(P2[p2Index]);
  }
  return sum;
}
// 比较两个谁的指数大
function compare(p1, p2) {
  if (p1.expon > p2.expon) {
    return 1;
  } else if (p1.expon < p2.expon) {
    return -1;
  } else {
    return 0;
  }
}
let sum = polynomialAdd(P1, P2);
console.log(sum);
//[ { coef: 4, expon: 6 },{ coef: 4, expon: 5 },{ coef: 8, expon: 3 },{ coef: 7, expon: 1 },{ coef: 8, expon: 0 } ]
