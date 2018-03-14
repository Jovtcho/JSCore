function createTask() {
    class Task {
        constructor(title, deadline) {
            this.title = title;
            this.status = 'Open';
            this.isOverdue = false;
            this.deadline = deadline;
        }

        get deadline() {
            return this._deadline;
        }

        set deadline(deadlineValue) {
            let now = Date.now();
            if (now > deadlineValue) {
                throw new Error('The date cannot be before now.')
            }
            this._deadline = deadlineValue;
        }

        get isOverdue() {
            if (this.status === 'Complete') {
                this.isOverdue = false;
                return this._isOverdue;
            }

            if (this._deadline <= Date.now()) {
                this.isOverdue = true;
            }
            return this._isOverdue;
        }

        set isOverdue(value) {
            this._isOverdue = value;
        }

        static comparator(a, b) {
            let criteria = a.rank - b.rank;

            if (criteria !== 0) {
                return criteria;
            } else {
                return a.deadline - b.deadline;
            }
        }

        get rank() {
            if (this.isOverdue) {
                return 0;
            } else if (this.status === 'In Progress') {
                return 1;
            } else if (this.status === 'Open') {
                return 2;
            } else {
                return 3;
            }
        }

        toString() {
            if (this.status === 'Complete') {
                return `[\u2714] ${this.title}`;
            } else if (this._isOverdue) {
                return `[\u26A0] ${this.title} (overdue)`;
            } else if (this.status === 'Open') {
                return `[\u2731] ${this.title} (deadline: ${this._deadline})`;
            } else if (this.status === 'In Progress') {
                return `[\u219D] ${this.title} (deadline: ${this._deadline})`;
            }
        }
    }

    return {
        Task
    }
}

let Task = createTask().Task;
let date1 = new Date();
date1.setDate(date1.getDate() + 7); // Set date 7 days from now
let task1 = new Task('JS Homework', date1);
let date2 = new Date();
date2.setFullYear(date2.getFullYear() + 1); // Set date 1 year from now
let task2 = new Task('Start career', date2);
console.log(task1 + '\n' + task2);
let date3 = new Date();
date3.setDate(date3.getDate() + 3); // Set date 3 days from now
let task3 = new Task('football', date3);
// Create two tasks with deadline set to current time
let task4 = new Task('Task 4', new Date());
let task5 = new Task('Task 5', new Date());
task1.status = 'In Progress';
task3.status = 'In Progress';
task5.status = "Complete";
let tasks = [task1, task2, task3, task4, task5];
setTimeout(() => {
    tasks.sort(Task.comparator);
    console.log(tasks.join('\n'));
}, 1000); // Sort and print one second later

// console.log('================================================');
// console.log(task1.toString());
// console.log(task2.toString());
// console.log(task3.toString());
// console.log(task4.toString());
// console.log(task5.toString());

//let overdueTask = new Task('Overdue Task', new Date(2005, '4', '20'));
//task1.deadline = new Date(2005, '4', '20');