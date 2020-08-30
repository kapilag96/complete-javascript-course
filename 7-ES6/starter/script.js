/*

// Lecture Arrow Function 2

var box5 = {
    color: 'green',
    position: 1,
    clickMe: function(){
        var self = this;
        document.querySelector('.green').addEventListener('click', function(){
            alert(self.color);
        })
    }
};

box5.clickMe();

// ES6
const box6 = {
    color: 'blue',
    position: 2,
    clickMe: function(){
        document.querySelector('.blue').addEventListener('click', () => {
            alert(this.color);
        })
    }
}

box6.clickMe();


function Person(name){
    this.name = name;
}

Person.prototype.myFriends5 = function(friends){
    var arr = friends.map(function (el) {
        return this.name + ' ' + el + ' yay!';
    }.bind(this));
    console.log(arr);
}

var p = new Person('josh').myFriends5(['mark', 'stephani']);


Person.prototype.myFriends6 = function(friends){
    const arr = friends.map(el => `${this.name} ${el} yayy6!`);
    console.log(arr);``
}

let q = new Person('jane').myFriends6(['Linda', 'Magenta']);

// Variable Desstructuring
const someObj = {
    firstName: 'Jane',
    lastName: 'Austen'
};
const {firstName, lastName} = someObj;
console.log(firstName, lastName);

// Rename while destructuring
const {firstName: f, lastName: l, some: x} = someObj;
console.log(f, l, x);

// Unequal number of args
const {firstName: axel} = someObj;
console.log(axel);

//const {firstName: f, lastName: l, } = someObj;
// console.log(f, l);

const [el1, el2, ma] = [1, 2];
console.log(el1, el2, ma);

// Arrays
// ES6

const ages = [1, 4, 21, 25];
console.log(ages.findIndex(cur => cur > 18));
console.log(ages.find(cur => cur > 18));


// Rest parameters
// ES5
function isFullAge5(){
    console.log(arguments);
    var newArr = Array.prototype.slice.call(arguments);
    console.log(newArr);
}
isFullAge5(1990, 1995, 2000);

// ES6
function isFullAge6(...years){
    console.log(years);
}
isFullAge6(1990, 1995, 2000);

console.log({
    ...{a: 1, b: 2}
});

// Classes
class Human{
    constructor(name, job='developer'){
        this.name = name;
        this.job = job;
        this.greeting = this.greeting();
    }

    static greeting(){
        return 'Hello!'
    }
}

*/

/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

class TownElement{
    constructor(name, buildYear){
        this.name        = name;
        this.buildYear   = buildYear;
    }

    get currentYear(){
        return new Date().getFullYear();
    }

    get age(){
        return this.currentYear - this.buildYear;
    }
}

class Park extends TownElement{
    constructor(name, buildYear, numTrees, area){
        super(name, buildYear);
        this.numTrees = numTrees;
        this.area     = area;
    }

    get treeDensity(){
        return this.numTrees / this.area;
    }

    static getAverageAge(...parks){
        return parks.reduce((total, park) => total + park.age, 0) / parks.length;
    }
}

class Street extends TownElement{
    constructor(name, buildYear, size){
        super(name, buildYear);
        this.size = size;
    }

    static getTotalSize(...streets){
        return streets.reduce((total, street) => total + street.size, 0);
    }

    static getAverageSize(...streets){
        return this.getTotalSize(...streets) / streets.length;
    }

    get classification(){
        switch(true){
            case this.size < 200:
                return 'tiny';
            case this.size < 400:
                return 'small';
            case this.size < 600:
                return 'normal';
            case this.size < 800:
                return 'big';
            case this.size < 1000:
                return 'huge';
            default:
                return 'normal';
        }
    }
}

const parks = [
    new Park('Western', 1990, 500, 200),
    new Park('Central', 1980, 1200, 400),
    new Park('Eastern', 2005, 900, 300)
];

const streets = [
    new Street('Junc 1', 2000, 300),
    new Street('Junc 2', 1980, 800),
    new Street('Junc 3', 2005, 500),
    new Street('Junc 4', 1950, 80),
    new Street('Junc 5', 2015, 750)
];

((parks) => {
    console.log('--- Parks Report ---');
    console.log(`The average age of a park is ${Park.getAverageAge(...parks)} years.`);
    parks.forEach(park => console.log(`The tree density of ${park.name} park is ${park.treeDensity}.`));
    const thousandTreePark = parks.find(park => park.numTrees >= 1000);
    console.log(`${thousandTreePark.name} park has ${thousandTreePark.numTrees} trees (more than 1000).`)
})(parks);

((streets) => {
    console.log('--- Streets Report ---');
    console.log(`The total size of all streets is ${Street.getTotalSize(...streets)} and the average size of a steet is ${Street.getAverageSize(...streets)}.`);
    streets.forEach((street) => console.log(`${street.name} is a ${street.classification} street.`));
})(streets);
