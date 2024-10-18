// A closure happens when an inner function is created inside an outer function, and that inner function has access to the outer function’s variables.
function outer(){
    let counter=0;
    function inner(){
        counter++;
        console.log(counter);
    }
    return inner;
}

const newfn=outer();
newfn();
newfn();
