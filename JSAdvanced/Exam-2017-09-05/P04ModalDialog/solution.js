class Dialog {
    constructor(message, callback) {
        this.message = message;
        this.callback = callback;
        this.inputs = [];
        this.element = null;
    }

    addInput(label, name, type) {
        this.inputs.push([label, name, type]);
    }

    _compose() {
        let overlay = $('<div class="overlay">');
        let element = $('<div class="dialog">');
        element.append($(`<p>${this.message}</p>`));
        for (let input of this.inputs) {
            element.append($(`<label>${input[0]}</label>`));
            element.append($(`<input name="${input[1]}" type="${input[2]}">`));
        }
        let submit = $(`<button>OK</button>`).click(this._submit.bind(this));
        let cancel = $(`<button>Cancel</button>`).click(this._cancel.bind(this));
        element.append(submit);
        element.append(cancel);
        overlay.append(element);
        return overlay;
    }

    _submit() {
        if (this.element === null) return;
        let params = {};

        this.element.find('input').each((i, e) => {
            params[e.name] = e.value;
        });
        this.element.remove();
        this.callback(params);
    }

    _cancel() {
        if (this.element === null) return;
        this.element.remove();
    }

    render() {
        this.element = this._compose();
        $(document.body).append(this.element);
    }
}

// class Dialog {
//     constructor(message, callback) {
//         this.message = message;
//         this.callback = callback;
//         this.inputs = [];
//         this.element = null;
//     }
//
//     addInput(label, name, type) {
//         this.inputs.push([label, name, type]);
//     }
//
//     render() {
//         this.element = this.compose();
//         console.log(this.element[0]);
//         $(document.body).append(this.element);
//     }
//
//     compose() {
//         let overlay = $('<div>').addClass('overlay');
//         let dialog = $('<div>').addClass('dialog');
//         dialog.append($('<p>').text(`${this.message}`));
//         for (let input of this.inputs) {
//             dialog.append($('<label>').text(`${input[0]}`));
//             dialog.append($('<input>')
//                 .attr('name', `${input[1]}`)
//                 .attr('type', `${input[2]}`));
//         }
//         let submit = $('<button>').text('OK').on('click', this.submit.bind(this));
//         dialog.append(submit);
//         let cancel = $('<button>').text('Cancel').on('click', this.cancel.bind(this));
//         dialog.append(cancel);
//         overlay.append(dialog);
//         return overlay;
//     }
//
//     submit() {
//         if (this.element === null) {
//             return;
//         }
//         let params = {};
//         this.element.find('input').each((index, element) => {
//             params[element.name] = element.value;
//         });
//
//         this.element.remove();
//         this.callback(params);
//     }
//
//     cancel() {
//         if (this.element === null) {
//             return;
//         }
//         this.element.remove();
//     }
// }