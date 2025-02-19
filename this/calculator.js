export class Calculator {
  result = 0;
  add = (n) => {
    const doAdd = () => {
      this.result += n;
    }
    doAdd();
  }
  subtract(n) {
    this.result -= n;
  }
}