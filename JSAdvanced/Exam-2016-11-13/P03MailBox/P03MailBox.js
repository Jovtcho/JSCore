function createMailBox() {
    class MailBox {
        constructor() {
            this.mailBox = [];
        }

        addMessage(subject, text) {
            let currentMessage = {
                subject,
                text
            };

            this.mailBox.push(currentMessage);
            return this;
        }

        get messageCount() {
            return this.mailBox.length;
        }

        deleteAllMessages() {
            this.mailBox.length = 0;
        }

        findBySubject(substr) {
            let filteredMessages = [];
            filteredMessages = this.mailBox.filter(message => message.subject.includes(substr));
            return filteredMessages;
        }

        toString() {
            if (this.mailBox.length === 0) {
                return ' * (empty mailbox)';
            } else {
                return this.mailBox.map(message => ` * [${message.subject}] ${message.text}`).join('\n');
            }
        }
    }

    return {
        MailBox
    }
}

let MailBox = createMailBox().MailBox;
let mb = new MailBox();
console.log("Msg count: " + mb.messageCount);
console.log('Messages:\n' + mb);
mb.addMessage("meeting", "Let's meet at 17/11");
mb.addMessage("beer", "Wanna drink beer tomorrow?");
mb.addMessage("question", "How to solve this problem?");
mb.addMessage("Sofia next week", "I am in Sofia next week.");
console.log("Msg count: " + mb.messageCount);
console.log('Messages:\n' + mb);
console.log("Messages holding 'rakiya': " +
    JSON.stringify(mb.findBySubject('rakiya')));
console.log("Messages holding 'ee': " +
    JSON.stringify(mb.findBySubject('ee')));

mb.deleteAllMessages();
console.log("Msg count: " + mb.messageCount);
console.log('Messages:\n' + mb);

console.log("New mailbox:\n" +
    new MailBox()
        .addMessage("Subj 1", "Msg 1")
        .addMessage("Subj 2", "Msg 2")
        .addMessage("Subj 3", "Msg 3")
        .toString());
