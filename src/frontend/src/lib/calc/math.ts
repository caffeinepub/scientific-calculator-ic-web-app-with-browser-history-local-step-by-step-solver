export function factorial(n: number): number {
  if (!Number.isInteger(n)) {
    throw new Error('Factorial requires an integer');
  }
  if (n < 0) {
    throw new Error('Factorial of negative number is undefined');
  }
  if (n > 170) {
    throw new Error('Factorial too large');
  }
  if (n === 0 || n === 1) return 1;
  
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
