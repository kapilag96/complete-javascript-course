///////////////////////////////////////
// Lecture: Hoisting

calculateAge(1996);

function calculateAge(year){
    console.log(2020 - year);
}

calculateAge(1994);

// Will throw an error since retirement is not hoisted globally
// retirement(2000);

let retirement = (year) => {
    console.log(65 - (2020 - year));
}

retirement(1996);










///////////////////////////////////////
// Lecture: Scoping


// First scoping example


var a = 'Hello!';
first();

function first() {

    second();
    var b = 'Hi!';

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}

console.warn('Lala')
console.error('oh no')



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword

// console.log(this);



var john = {
    name: 'John',
    yearOfBirth: 1990,
    calculateAge: function(){
        console.log(this);
        console.log(2020 - this.yearOfBirth);
        function innerFunc(){
            console.log(this);
        }
        innerFunc();
    }
}

john.calculateAge();






