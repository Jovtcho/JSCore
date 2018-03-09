let sortedList = (function getSortedList() {
    return class SortedList {
        constructor() {
            this.list = [];
            this.size = 0;
        }

        add(element) {
            this.list.push(element);
            this.list.sort((el1, el2) => el1 - el2);
            this.size++;
        }

        remove(index) {
            if (index >= 0 && index < this.list.length) {
                this.list.splice(index, 1);
                this.size--;
            }
        }

        get(index) {
            if (index >= 0 && index < this.list.length) {
                return this.list[index];
            }
        }

        toString() {
            return this.list.join(' ');
        }
    }
})();

let list = new sortedList();
console.log(list.get(-5));
// list.add(10);
// console.log(list.toString());
// list.add(-3);
// console.log(list.toString());