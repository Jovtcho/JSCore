let result = (function () {
    class Textbox {
        constructor(selector, regex) {
            this._elements = $(selector);
            this.value = $(this._elements[0]).val();
            this._invalidSymbols = regex;
            this.onInput();
        }

        onInput() {
            this._elements.on('input', (event) => {
                // When elements change so does the value
                let text = $(event.target).val();
                this.value = text;
            });
        }

        get value() {
            return this._value;
        }

        set value(value) {
            this._value = value;
            // When value changes so do the elements
            for (let el of this._elements) {
                $(el).val(value);
            }
        }

        get elements() {
            return this._elements;
        }

        isValid() {
            return !this._invalidSymbols.test(this.value);
        }
    }

    class Form {
        constructor() {
            this._element = $('<div>').addClass('form');
            this.textboxes = arguments;
        }

        get element() {
            return this._element;
        }

        get textboxes() {
            return this._textboxes;
        }

        set textboxes(textBoxElements) {
            for (let textBoxElement of textBoxElements) {
                if (!(textBoxElement instanceof Textbox)) {
                    throw new Error('This is not a textbox!');
                }
            }

            this._textboxes = textBoxElements;
            for (let textBox of this.textboxes) {
                for (let input of textBox.elements) {
                    this.element.append($(input));
                }
            }
        }

        submit() {
            let isAllValid = true;
            for (let textbox of this.textboxes) {
                if (textbox.isValid()) {
                    for (let input of textbox.elements) {
                        $(input).css('border', '2px solid green');
                    }
                } else {
                    isAllValid = false;
                    for (let input of textbox.elements) {
                        $(input).css('border', '2px solid red');
                    }
                }
            }

            return isAllValid;
        }

        attach(selector) {
            $(selector).append(this.element);
        }
    }

    return {
        Textbox,
        Form
    }
})();

let Textbox = result.Textbox;
let Form = result.Form;
let username = new Textbox("#username", /[^a-zA-Z0-9]/);
let password = new Textbox("#password", /[^a-zA-Z]/);
username.value = "username";
password.value = "password2";
let form = new Form(username, password);
form.attach("#root");
