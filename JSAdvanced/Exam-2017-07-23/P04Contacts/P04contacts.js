class Contact {
    constructor(firstName, lastName, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.email = email;
        this.element = this.createElement();
        this.online = false;
    }

    get online() {
        return this._online;
    }

    set online(value) {
        this._online = value;
        if (this.online) {
            this.element.find('.title').addClass('online');
        } else {
            this.element.find('.title').removeClass('online');
        }
    }

    render(id) {
        let output = $('#' + id);
        output.append(this.element);
    }

    createElement() {
        let article = $('<article>');
        let divTitle = $(`<div class="title">${this.firstName} ${this.lastName}>`);
        let infoBtn = $('<button>&#8505;</button>');
        let divInfo = $(`<div class="info"><span>&phone; ${this.phone}</span><span>&#9993; ${this.email}</span>`)
            .css('display', 'none');

        infoBtn.on('click', () => {
            divInfo.toggle();
        });
        article.append(divTitle.append(infoBtn))
            .append(divInfo);

        return article;
    }
}

let contacts = [
    new Contact("Ivan", "Ivanov", "0888 123 456", "i.ivanov@gmail.com"),
    new Contact("Maria", "Petrova", "0899 987 654", "mar4eto@abv.bg"),
    new Contact("Jordan", "Kirov", "0988 456 789", "jordk@gmail.com")
];
contacts.forEach(c => c.render('main'));

//After 2 second, change the online status to true
setTimeout(() => contacts[1].online = true, 2000);