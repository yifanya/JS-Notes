const sea = {
  use(path,fn){
    $.ajax({
      url:path,
      method:'GET',
      success(str){
        function define(callback) {
          let module = {
            exports:{

            }
          };
          callback(function(){

          },module.exports,module);
          fn(module.exports)
        }
        //找require
        let tem = str.substring(str.indexOf('{')+1,str.lastIndexOf('}'));
        let arr = tem.match(/require\([^\(\)]+\)/g);
        arr = arr.map(item=>{
          if(item.indexOf('"')!==-1){
            return item.substring(item.indexOf("\"")+1,item.lastIndexOf("\""))
          }
          else{
            return item.substring(item.indexOf("'")+1,item.lastIndexOf("'"))
          }
        });

        function next() {

        }
        //执行代码
        eval(str);
      }
    })
  }
};
const $ = {
  ajax({method:method="GET",url,success,error:error=function(){}}){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        success(xhr.responseText)
      }
    };
    xhr.open(method,url);
    xhr.send();
  }
};