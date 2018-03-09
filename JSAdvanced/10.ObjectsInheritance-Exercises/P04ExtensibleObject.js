function extensibleObject() {
    let obj = {
        extend: function (template) {
            for (let property in template) {
                if (typeof template[property] === "function") {
                    Object.getPrototypeOf(obj)[property] = template[property];
                } else {
                    obj[property]= template[property];
                }
            }
        }
    };

    return obj;
}


let myObj = extensibleObject();

let template = {
    extensionMethod: function () {
        console.log('alabalanica');
    },
    extensionProperty: 'someString'
};

myObj.extend(template);
console.log(myObj);

// function extendObject() {
//     let myObj = {
//         extend: function (template) {
//             for (let property in template) {
//                 if (typeof property === 'function') {
//                     Object.getPrototypeOf(myObj)[property] = template[property];
//                 } else {
//                     myObj[property] = template[property];
//                 }
//             }
//         }
//     };
//
//     return myObj;
// }
//
//
// let templateObj = {
//     name: 'Pesho',
//     age: 20,
//     getInfo: function () {
//         console.log(`I am ${this.name} and I am ${this.age} years old.`);
//     },
//     toString: function () {
//         return `Name: ${this.name}\nAge: ${this.age}`;
//     }
// };
//
// console.log(templateObj);
// templateObj.getInfo();
// console.log(templateObj.toString());
// console.log('=================================');
//
// let myExtendedObj = extendObject();
// myExtendedObj.extend(templateObj);
// //console.log(myExtendedObj);
// myExtendedObj.getInfo();
// console.log(myExtendedObj.__proto__);