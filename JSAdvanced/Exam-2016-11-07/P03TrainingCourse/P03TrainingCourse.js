function generateTrainingCourse() {
    class TrainingCourse {
        constructor(title, trainer) {
            this.title = title;
            this.trainer = trainer;
            this.topics = [];
        }

        addTopic(title, date) {
            let newTopic = {title, date};
            this.topics.push(newTopic);
            this.sortTopicsByDate();
            return this;
        }

        sortTopicsByDate() {
            this.topics.sort((topic1, topic2) => topic1.date - topic2.date);
        }

        get firstTopic() {
            return this.topics[0];
        }

        get lastTopic() {
            return this.topics[this.topics.length - 1];
        }

        toString() {
            let output = `Course "${this.title}" by ${this.trainer}`;
            let topicsOutput = this.topics.map(topic => ` * ${topic.title} - ${topic.date}`).join('\n');
            output += '\n' + topicsOutput;
            return output;
        }
    }

    return {
        TrainingCourse
    }
}

let TrainingCourse = generateTrainingCourse().TrainingCourse;
let js = new TrainingCourse("JS Intro", "Svetlin Nakov");
console.log("First topic: " + JSON.stringify(js.firstTopic));
console.log("Last topic: " + JSON.stringify(js.lastTopic));
console.log("" + js);

js.addTopic("Maps", new Date(2016, 9, 6, 18, 0));
js.addTopic("JS Overview", new Date(2016, 8, 27, 18, 0));
js.addTopic("Program Logic", new Date(2016, 8, 29, 18, 0));
js.addTopic("Arrays", new Date(2016, 9, 3, 18, 0));
console.log("First topic: " + JSON.stringify(js.firstTopic));
console.log("Last topic: " + JSON.stringify(js.lastTopic));
console.log("" + js);

let php = new TrainingCourse("PHP Intro", "Ivan Yonkov")
    .addTopic("Strings", new Date(2017, 2, 16, 18, 0))
    .addTopic("PHP First Steps", new Date(2017, 2, 12, 18, 0))
    .addTopic("Arrays", new Date(2017, 2, 14, 18, 0));
console.log("" + php);
