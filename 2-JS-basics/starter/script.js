/*
// Coding Challenge 1
let markWeight = prompt("Enter Mark's Weight:");
let markHeight = prompt("Enter Mark's Height:");


let johnHeight = prompt("Enter John's Height:");
let johnWeight = prompt("Enter John's Weight:");

let bmi = (height, weight) => weight / (height * height);

let boo = bmi(markHeight, markWeight) > bmi(johnHeight, johnWeight);

alert("Is Mark's BMI greater than John's?: " + boo)
*/

/*
// Coding Challenge 2
let johnTeam = [89, 120, 103];
let markTeam = [116, 94, 123];
let maryTeam = [97, 134, 105];

function avg(arr){
    return arr.reduce((total, val) => total + val) / arr.length;
}

[johnTeam, markTeam, maryTeam] = [johnTeam, markTeam, maryTeam].map(avg);
max_val = Math.max(...[johnTeam, markTeam, maryTeam]);
if(johnTeam === max_val){console.log('john')}.

*/

// Coding Challenge 3

/*
function calcTip(item){
    switch(true){
        case item < 50:
            console.log('Less than 50');
            return 0.2 * item;
        case item < 200:
            console.log('Less than 200');
            return 0.15 * item;
        default:
            console.log('Default');
            return 0.1 * item;
    }
}

let billAmounts = [124, 48, 268];
let tipAmounts = billAmounts.map(calcTip);

function neatifyAmounts(calcVal, curVal, currIndex){
    let sym;
    if (currIndex === 1) sym = '$';
    else sym = '';
    return `${calcVal}${sym}, ${curVal}$`
}

let finalBills = billAmounts.map((val, idx) => {return val + tipAmounts[idx]})

console.log(`The bill amounts - ${billAmounts.reduce(neatifyAmounts)}`);
console.log(`The tip amounts - ${tipAmounts.reduce(neatifyAmounts)}`);
console.log(`The final amounts - ${finalBills.reduce(neatifyAmounts)}`);

*/


// Coding Challenge 4

/*
class Person{
    constructor(fullName, height, weight){
        this.fullName = fullName;
        this.height   = height;
        this.weight   = weight;
    }

    get bmi(){
        return this.weight / (this.height ** 2);
    }
}

function compareBMI(p1, p2){
    switch(true){
        case p1.bmi > p2.bmi:
            console.log(`${p1.fullName} has a higher BMI.`);
            break;
        case p2.bmi > p1.bmi:
            console.log(`${p2.fullName} has a higher BMI.`);
            break;
        default:
            console.log(`${p1.fullName} and ${p2.fullName} have the same BMI.`)
    }
}

let john = new Person('John Smith', 1.95, 92);
let mark = new Person('Mark Miller', 1.69, 78);

compareBMI(john, mark);
console.log(john, mark);

*/

// Coding challenge 5

/*
class TipCalculator{
    constructor(name, bills, tipCalc){
        this.name    = name;
        this.bills   = bills;
        this.tipCalc = tipCalc;
    }

    get tips(){
        return this.bills.map(this.tipCalc);
    }

    get finalAmounts(){
        const tips = this.tips;
        return this.bills.map((bill, idx) => {return bill + tips[idx];})
    }

    get avgTip(){
        return this.tips.reduce((total, newVal) => {return total + newVal;}) / this.bills.length;
    }
}


let john = new TipCalculator('Mark', [124, 48, 268, 180, 42], (bill) => {
    switch(true){
        case bill < 50:
            return 0.2 * bill;
        case bill < 200:
            return 0.15 * bill;
        default:
            return 0.1 * bill;
    }
})

let mark = new TipCalculator('John', [77, 475, 110, 45], (bill) => {
    switch(true){
        case bill < 100:
            return 0.2 * bill;
        case bill < 300:
            return 0.1 * bill;
        default:
            return 0.25 * bill;
    }
})

console.log(john.bills, john.tips, john.finalAmounts, john.avgTip);
console.log(mark.bills, mark.tips, mark.finalAmounts, mark.avgTip);

*/