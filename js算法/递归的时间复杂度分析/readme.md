#### 递归的时间复杂度
一个递归的时间复杂度通式为：
> T(N) = aT(N/b) + O(N^d);  
N:父问题样本量  
a:递归发生次数  
N/b:子问题样本量  
b:一次递归中对父样本量的拆分  
O(N^d):除去子过程之外，其余部分的时间复杂度多少  
T(N):代表最坏时间复杂度

对于index.js的二分求最大值来说。它的复杂度为：  
> T(N) = 2T(N/2) + O(1);

[图片](./递归的时间复杂度公式.png)  
`a=2(发生次数), b=2(), d=0`  
也就是说复杂度为：log(b,a) = 1 > d;根据图片选择第一条

复杂度为： O（N）