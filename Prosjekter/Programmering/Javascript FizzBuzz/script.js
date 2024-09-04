for(let i = 0; i < 101; i++){
    console.log(i);
    if(i % 3 == 0 && i % 5 == 0){
        console.log(i, "FizzBuzz")
    } else if(i % 5 == 0){
        console.log(i, "Buzz")
    } else if(i % 3 == 0){
        console.log(i, "Fizz")
    } 
}
