function getSortedList() {
    return {
        arr: [],
        add: function (element) {
            this.arr.push(element);
            this.arr.sort((el1, el2) => el1 - el2);
            this.size++;
        },
        remove: function (index) {
            if (index >= 0 && index < this.arr.length) {
                this.arr.splice(index, 1);
                this.size--;
            }
        },
        get: function (index) {
            if (index >= 0 && index < this.arr.length) {
                return this.arr[index];
            }
        },
        size: 0,
        toString: function () {
            return this.arr.join(' ');
        }
    }
}