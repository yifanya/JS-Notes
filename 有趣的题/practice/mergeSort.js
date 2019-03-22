function mergeSort(arr, L, R) {
  if(L === R) return
  let middle = parseInt((L+R)/2)
  mergeSort(L, middle)
  mergeSort(middle, R)
  sortProcess(arr, L, middle, R)
}

function sortProcess(arr, L, mid, R) {
  let res = []
  
}