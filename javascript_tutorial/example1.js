// function double(x) { return x ** 2; }
// console.log(double(2))

// const numbers = [0, 1, 2, 3, 4, 5]
// const doubledNumbers = numbers.map(n => n * 2)
// const evenNumbers = numbers.filter(n => n % 2 === 0)
// const sum = numbers.reduce((prev, next) => prev + next, 0)
// const greaterThanFour = numbers.find((n) => n > 4)

// console.log(doubledNumbers)
// console.log(evenNumbers)
// console.log(sum)
// console.log(greaterThanFour)

// const students = [
//     { name: "Nick", grade: 10 },
//     { name: "John", grade: 15 },
//     { name: "Julia", grade: 19 },
//     { name: "Nathalie", grade: 9 },
// ]

// const aboveTenSum = students
//     .map(student => student.grade)
//     .filter(grade => grade >= 10)
//     .reduce((prev, next) => prev + next, 0)

// console.log(aboveTenSum)

// const arr1 = ["a", "b", "c"];
// const arr2 = [...arr1, "d", "e", "f"];

// function myFunc(x, y, ...params) {
//     console.log(x);
//     console.log(y);
//     console.log(params)
// }

// myFunc("a", "b", "c", "d", "e", "f")


const fetchingPosts = new Promise((res, rej) => {
    $.get("/posts")
        .done(posts => res(posts))
        .fail(err => rej(err));
});

fetchingPosts
    .then(posts => console.log(posts))
    .catch(err => console.log(err));