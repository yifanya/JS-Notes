function  Super(){
  this.color=["red","green","blue"];
}
function  Sub(){
  //继承自Super
  Super.call(this);
}
var instance1 = new Sub();
instance1.color.push("black");
console.log(instance1.color);//"red,green,blue,black"

var instance2 = new Sub();
console.log(instance2.color);//"red,green,blue"