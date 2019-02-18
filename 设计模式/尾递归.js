// function Factorial(num){
//   console.log('num',num);
//   if(num===1) return 1;
//   return num * Factorial(--num);
// }
// const result = Factorial(5);
//1 return 5 * F(4)
//2 return 4 * F(3)
//3 return 3 * F(2)
//4 return 2 * F(1)
//5 return 1

function fbnq(n) {
  if(n<=1) return 1;
  return fbnq(n-1) + fbnq(n-2);
}
const result = fbnq(1000);
console.log(result);
// function fbnq(n,ac1 = 1,ac2 = 1){
//   if(n<=1) return ac2;
//   return fbnq(n-1,ac2,ac1+ac2);
// }
