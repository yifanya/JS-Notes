let arr = [3, 4, 2, 6, 1, 88, 3, 8, 1, 5, 8, 134];
let arrRight = [3, 4, 2, 6, 1, 88, 3, 8, 1, 5, 8, 134];
// let arr = [1, 3, 4, 2, 5];
// let arrRight = [1, 3, 4, 2, 5];


let sum = 0;
let sumRight = 0;

function mergeSort(arr) {
  sortProcess(arr, 0, arr.length - 1);
}

function sortProcess(arr, L, R) {
  if (L === R) return;
  let mid = parseInt((L + R) / 2);
  sortProcess(arr, L, mid);
  sortProcess(arr, mid + 1, R);
  merge(arr, L, mid, R);
}

function merge(arr, L, mid, R) {
  let help = [];
  let lPoint = L;
  let rPoint = mid + 1;
  while (!(lPoint > mid) && !(rPoint > R)) {
    if (arr[lPoint] < arr[rPoint] || arr[lPoint] === arr[rPoint]) {
      if (arr[lPoint] < arr[rPoint]) {
        sum += arr[lPoint] * (R - rPoint + 1);
      }
      else if (arr[lPoint] === arr[rPoint]) {
        sum += arr[lPoint] * (R- rPoint);
      }
      help.push(arr[lPoint]);
      lPoint++;
    }
    else if (arr[lPoint] > arr[rPoint]) {
      help.push(arr[rPoint]);
      rPoint++;
    }
  }
  if (lPoint > mid) {
    while (!(rPoint > R)) {
      help.push(arr[rPoint]);
      rPoint++;
    }
  }
  else if (rPoint > R) {
    while (!(lPoint > mid)) {
      help.push(arr[lPoint]);
      lPoint++;
    }
  }

  for (let i = 0; i < help.length; i++) {
    arr[L + i] = help[i];
  }
}

mergeSort(arr);

for(let i= arrRight.length - 1; i >= 0; i--) {
  for(let j= 0; j < i ; j++) {
    if(arrRight[j] < arrRight[i]) sumRight += arrRight[j];
  }
}

console.log('sum', sum);
console.log('sumRight', sumRight);

