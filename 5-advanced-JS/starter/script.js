/*
var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
}

var Person = function(name, yearOfBirth, job){
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person.prototype.calculateAge = () => {
    console.log('called');
}
var john2 = new Person('John', 1990, 'teacher');
console.log(john2.calculateAge());

console.log(john, john2);

*/

/*

let years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn){
    return arr.map(fn);
}

function calcAge(al){
    return 2016 - al;
}

console.log(arrayCalc(years, calcAge));
*/

/*
function interviewQuestions(job){
    if (job === 'designer') return (name) => {
        return name + "ya designer";
    }
    else if (job === 'teacher') return (name) => {
        return name + 'ya teacher';
    }
}

let teacherQuestions = interviewQuestions('teacher');
console.log(teacherQuestions('kapil'));

*/

/*
function game(){
    const score = Math.random() * 10;
    console.log(score >= 5)
}

game();
console.log(score);
*/

/*
function retirement(retirementAge){
    let stmt = ' years left until retirement';
    return (year) => {
        console.log(retirementAge - (2016 - year) + stmt);
    }
}

const retirementUS = retirement(66);
retirementUS(1990);

*/

/*
let josh = {
    name: 'Josh',
    age : 26,
    job : 'Teacher',
    presentation: function(style, timeOfDay){
        if (style === 'formal') console.log(`${timeOfDay}! ${this.name}, ${this.age}, ${this.job}`);
        else if (style === 'friendly')  console.log(`Friendly ${timeOfDay}! ${this.name}, ${this.age}, ${this.job}`);
    }
}


let emily = {
    name: 'Emily',
    age: 35,
    job: 'Designer',
    presentation: (style, timeOfDay) => {
        josh.presentation.call(emily, style, timeOfDay);
    }
}


emily.presentation('formal', 'morning');
josh.presentation('friendly', 'afternoon');
*/

function Quizzer(){

    let score = 0;

    function Question(question, options, correct_option){
        this.question = question;
        this.options = options;
        this.correct_option = correct_option;
        this.display = () => {
            console.log(this.question);
            for (let [index, option] of this.options.entries()){
                console.log(`${index}: ${option}`);
            }
        };
    }

    const questions = [new Question('Who are you mister?', ['A stranger', 'A developer', 'Javascript Runtime Engine'], 1),
                       new Question('What is the best type of pizza?', ['Peppy Paneer', 'Classic Margerita', 'Farmhouse'], 0)];

    function getQuestion(){
        let idx = Math.floor(Math.random() * questions.length);
        return questions[idx];
    }
    function start(){
        while (true){
            let question = getQuestion();
            question.display();
            let response = prompt('Please choose the correct answer:');
            if (parseInt(response) === question.correct_option){
                score += 1;
                console.log('Correct Answer!\nYour new score: ' + score);
            }
            else if (response === 'exit'){
                return;
            }
            else{
                console.log('Incorrect answer!');
            }
        }

    }

    return {start: start};
}

const quizzer = Quizzer();
quizzer.start();
