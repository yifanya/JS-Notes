### 由于javascript的单线程与事件循环造就了JS的运行机制
我们先说几个概念
### 任务队列
1. JS分为同步和异步任务，但是都在同一条主线程上执行的，有一个执行栈，栈底是全局执行环境，每当有新的函数执行那么就会将新的函数执行环境压入栈中，同时这个执行环境中还包含着当前环境内的全部变量对象。
2. 主线程之外还有一个事件触发线程，掌管着一个事件队列。一旦执行栈中有其他任务执行完毕，那么读取事件队列中的任务，压入执行栈中。

[eventloop](evenloop.png)

### 宏任务
(macro)task（又称之为宏任务），可以理解是每次执行栈执行的代码就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）。

浏览器为了能够使得JS内部(macro)task与DOM任务能够有序的执行，**会在一个(macro)task执行结束后，在下一个(macro)task 执行开始前，对页面进行重新渲染**，(macro)task主要包含：script(整体代码)、setTimeout、setInterval、I/O、UI交互事件、postMessage、MessageChannel、setImmediate(Node.js 环境)

### 微任务
microtask（又称为微任务），**可以理解是在当前 task 执行结束后立即执行的任务**。也就是说，在当前task任务后，下一个task之前，在渲染之前。

所以它的响应速度相比setTimeout（setTimeout是task）会更快，因为无需等渲染。也就是说，在某一个macrotask执行完后，就会将在它执行期间产生的所有microtask都执行完毕（在渲染前）。

microtask主要包含：Promise.then、MutaionObserver、process.nextTick(Node.js 环境)

### 执行流程图
[](./任务执行流程图.jpeg)

### Promise 的 await
很多人以为await会一直等待之后的表达式执行完之后才会继续执行后面的代码，**实际上await是一个让出线程的标志。await后面的表达式会先执行一遍，将await后面的代码加入到microtask中，然后就会跳出整个async函数来执行后面的代码。**
```
async function async1() {
	console.log('async1 start');
	await async2();
	console.log('async1 end');
}
```
等价于
```
async function async1() {
	console.log('async1 start');
	Promise.resolve(async2()).then(() => {
    console.log('async1 end');
  })
}
```

看完这些可以去看面试题了 '../index[num].js'