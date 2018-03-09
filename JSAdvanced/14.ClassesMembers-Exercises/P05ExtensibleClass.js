let solve = (function () {
    let id = 0;
    return class Extensible {
        constructor() {
            this.id = id++;
        }

        extend(template) {
            for(let prop in template) {
                if(typeof template[prop] === "function"){
                    Extensible.prototype[prop] = template[prop]
                } else {
                    this[prop] = template[prop];
                }
            }
        }
    }
})();

let obj1 = new solve();
let obj2 = new solve();
let obj3 = new solve();

console.log(obj1);
console.log(obj2);
console.log(obj3);

let template = {
    extensionMethod: function () {
        console.log('alabalanica');
    },
    extensionProperty: 'someString'
};

obj1.extend(template);

console.log(obj1);
//console.log(obj1.__proto__);
console.log(Object.getPrototypeOf(obj1));
obj1.extensionMethod();
console.log(obj2);
console.log(obj3);
