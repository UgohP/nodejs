// const person = {
//     name: "Mosh",
//     walk() {
//         console.log(this);
//     }
// };

const { functions } = require("lodash");

// person.walk();

// const walk = person.walk
// console.log(walk)

// Arrow Fuction
// const square = number => number * number
// console.log(square(5))

// const jobs = [
//     { id: 1, isActive: true },
//     { id: 1, isActive: true },
//     { id: 1, isActive: false },
// ]

// const activeJob = jobs.filter(job => job.isActive);
// console.log(activeJob)

// Arrow Function and This
// const person = {
//     talk() {
//         var self = this;
//         setTimeout(() => console.log("this", this), 1000);
//     }
// };
// person.talk();

//Array.map
// const colors = ["red", "green", "blue"];
// const items = colors.map(color => `<li>${color}</li>`);
// console.log(items);

//Object Destructing
// const address = {
//     street: 'GRA',
//     city: 'Benin',
//     country: 'Nigeria',
// };

// const { street, city, country } = address;
// console.log(address)

//Spread Operator
// const first = [1, 2, 3];
// const second = [4, 5, 6];

// const combined = [...first, ...second];
// console.log(combined)

// classes and inheritance
// class Person {
//     constructor(name) {
//         this.name = name;
//     }
//     walk() {
//         console.log("walk");
//     }
// }

// const person = new Person("Paschal")
// console.log(person)

// class Teacher extends Person {
//     constructor(name, degree) {
//         super(name);
//         this.degree = degree;
//     }
//     teach() {
//         console.log("teach");
//     }
// }

import { Teacher } from "./teacher";

const teacher = new Teacher("Pasky", "MSc");
// console.log(teacher)
teacher.teach()