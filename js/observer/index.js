/**
 * 发布—订阅模式
 * 发布—订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。
 */

/*
    现在看看如何一步步实现发布—订阅模式。
    首先要指定好谁充当发布者（比如售楼处）；
    然后给发布者添加一个缓存列表，用于存放回调函数以便通知订阅者（售楼处的花名册）；
    最后发布消息的时候，发布者会遍历这个缓存列表，依次触发里面存放的订阅者回调函数（遍历花名册，挨个发短信）。
 */

var salesOffices = {}; // 定义售楼处

salesOffices.clientList = {}; // 缓存列表，存放订阅者的回调函数

salesOffices.listen = function( fn ){ // 增加订阅者
    if ( !this.clientList[ key ] ){ // 如果还没有订阅过此类消息，给该类消息创建一个缓存列表
        this.clientList[ key ] = []; 
    } 
    this.clientList[ key ].push( fn ); // 订阅的消息添加进消息缓存列表
}; 

salesOffices.trigger = function(){ // 发布消息
    var key = Array.prototype.shift.call( arguments ), // 取出消息类型
    fns = this.clientList[ key ]; // 取出该消息对应的回调函数集合
    if ( !fns || fns.length === 0 ){ // 如果没有订阅该消息，则返回
        return false; 
    } 
    for( var i = 0, fn; fn = fns[ i++ ]; ){ 
        fn.apply( this, arguments ); // (2) // arguments 是发布消息时附送的参数
    }
};

salesOffices.listen( 'squareMeter88', function( price ){ // 小明订阅 88 平方米房子的消息
    console.log( '价格= ' + price ); // 输出： 2000000 
}); 

salesOffices.listen( 'squareMeter110', function( price ){ // 小红订阅 110 平方米房子的消息
    console.log( '价格= ' + price ); // 输出： 3000000 
}); 

salesOffices.trigger( 'squareMeter88', 2000000 ); // 发布 88 平方米房子的价格
salesOffices.trigger( 'squareMeter110', 3000000 ); // 发布 110 平方米房子的价格