let classesFunc = require('./P06Computer');

function createMixins() {
    function computerQualityMixin(classToExtend) {
        classToExtend.prototype.getQuality = function () {
            return (this.processorSpeed + this.ram + this.hardDiskSpace) / 3;
        };

        classToExtend.prototype.isFast = function () {
            return this.processorSpeed > (this.ram / 4);
        };

        classToExtend.prototype.isRoomy = function () {
            return this.hardDiskSpace > Math.floor(this.ram * this.processorSpeed);
        };
    }

    function styleMixin(classToExtend) {
        classToExtend.prototype.isFullSet = function () {
            return this.manufacturer === this.keyboard.manufacturer
                && this.keyboard.manufacturer === this.monitor.manufacturer;
        };

        classToExtend.prototype.isClassy = function () {
            return this.battery.expectedLife >= 3
                && (this.color === 'Silver' || this.color === 'Black')
                && this.weight < 3;
        };
    }

    return {
        computerQualityMixin,
        styleMixin
    }
}

let classes = classesFunc.createComputerHierarchy();

let Computer = classes.Computer;
let Laptop = classes.Laptop;
let Desktop = classes.Desktop;
let Monitor = classes.Monitor;
let Battery = classes.Battery;
let Keyboard = classes.Keyboard;

let keyboard = new Keyboard('JAR Computers', 70);
let monitor = new Monitor('Hewlett Packard', 28, 18);
let battery = new Battery('Duracell', 100);

let laptop = new Laptop("Hewlett Packard", 2.4, 4, 0.5, 2.1, "Silver", battery);
let desktop = new Desktop("JAR Computers", 3.3, 8, 1, keyboard, monitor);


console.log(laptop);
createMixins().computerQualityMixin(Laptop);
console.log("---->" + laptop.getQuality());

createMixins().styleMixin(Desktop);
console.log(desktop);
console.log(desktop.isFullSet());

createMixins().styleMixin(Laptop);
console.log(laptop.isClassy());