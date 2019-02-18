function ObserverList(){
  this.observerList = [];
}

ObserverList.prototype.Add = function (obj) {
  
}

ObserverList.prototype.Empty = function () {
  this.observerList = [];
}

ObserverList.prototype.Count = function () {
  return this.observerList.length;
}

ObserverList.prototype.Get = function (index) {
  if(index > -1 && index < this.observerList.length){
    return this.observerList[index];
  }
}

