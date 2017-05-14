/*
 * if function A is able to access variables in function B
 * then A is a closure.
 *
 * say function B is returned to variable C, when A finishs 
 * execution, all the variables in scope of A should be destroyed
 * but somehow B is referencing variables in A's scope. so scope of
 * A will stay put.
 */
function createFunc()
{
    var result = new Array();
    for(var i = 0; i < 10; i++)
        result[i] = function()
        {
            //i is from outer function(createFunc),
            //when for-loop finished, i = 10 and should be destroyed
            //since it's created in scope createFunc. but every func 
            //in result array kept a reference to i, which makes the scope
            //of createFunc alive.
            return i;
        };
    return result;
}
var test = createFunc();
for(var i = 0; i < test.length; i++)
{
    alert(test[i]()); //10
}

/*
 * when using 'this' in closure, it could cause a problem
 */
var name = "owen";
var object = {
    name:"vincent",
    getName:function()
    {
        return function()
        {
            return this.name;
        }
    }
}
//object.getName() will get the anonymous function and by call this function
//with (), it return this.name, here, this refers to global object window since
//it is called in alert, in global scope
alert(object.getName()()); //owen

//below sample code shows how to fix this
var name = "owen";
var object = {
    name:"vincent",
    getName:function()
    {
        var that = this;
        return function()
        {
            //access the variable in outer function
            return that.name;
        }
    }
}
//object.getName() will get the anonymous function whose variable 'that' is refered
//in closure function. so its scope will survive
alert(object.getName()()); //vincent

/*
 * to call anonymous function, we need to add () after it
 */
(function(){
    var hello = "Hello Owen";
    alert(hello);
})();//add () to call the anonymous function

//another thing needs to note about above function is that
//when add () to scope the function body, it restrict any variable in it.
//that means we can't access hello from outside. this could be used as a way to imitate
//block scope in java
function imitateBlockScope(){

    (function()
    {
        var now = new Date();
        if(now.getMonth() == 0 && now.getDate() == 1)
            alert("Happy new year!");
    })();

    alert(now);//error, can't access variable in block scope
}