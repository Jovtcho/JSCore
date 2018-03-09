function solve() {
    class Figure {
        constructor() {
            if (new.target === Figure) {
                throw new TypeError(`Class ${this.constructor.name} is abstract and cannot be instantiated.`);
            }
        }

        get area() {
            return undefined;
        }

        toString() {
            //{type} - width: {width}, height: {height}
            let className = this.constructor.name;
            let props = Object.getOwnPropertyNames(this);
            return className + ' - ' + props.map(pr => `${pr}: ${this[pr]}`).join(', ');
        }
    }

    class Circle extends Figure {
        constructor(radius) {
            super();
            this.radius = radius;
        }

        get area() {
            return Math.PI * this.radius * this.radius;
        }
    }

    class Rectangle extends Figure {
        constructor(width, height) {
            super();
            this.width = width;
            this.height = height;
        }

        get area() {
            return this.width * this.height;
        }
    }


    return {
        Figure,
        Circle,
        Rectangle
    }
}

// let Figure = solve().Figure;
// let figure = new Figure();

let Circle = solve().Circle;
let circle = new Circle(5);

console.log(circle.area);
console.log(circle.toString());

let Rectangle = solve().Rectangle;
let rectangle = new Rectangle(3, 4);

console.log(rectangle.area);
console.log(rectangle.toString());