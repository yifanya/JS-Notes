function swap(arr, num1, num2) {
  let temp = arr[num1];
  arr[num1] = arr[num2];
  arr[num2] = temp;
}

module.exports = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    let j = i - 1;
    while (j >= 0) {
      if (arr[j + 1] < arr[j]) {
        swap(arr, j + 1, j);
        // num++;
      }
      else if (arr[j + 1] > arr[j] || arr[j + 1] === arr[j])
        break;
      j--;
    }
  }
}