function increment(selector) {
    let container = $(selector);
    let fragment = document.createDocumentFragment();
    let textArea = $('<textarea>');
    let incrementBtn = $('<button>Increment</button>');
    let addBtn = $('<button>Add</button>');
    let list = $('<ul>');

    //TextArea
    textArea.val(0);
    textArea.addClass('counter');
    textArea.attr('disabled', true);

    //Button increment
    incrementBtn.addClass('btn');
    incrementBtn.attr('id', 'incrementBtn');
    //incrementBtn.text('Increment');

    //Button add
    addBtn.addClass('btn');
    addBtn.attr('id', 'addBtn');
    //addBtn.text('Add');

    //List
    list.addClass('results');

    //Event incrementBtn
    incrementBtn.on('click', () => {
        textArea.val(Number(textArea.val()) + 1);
    });

    //Event addBtn
    addBtn.on('click', () => {
        let listItem = $(`<li>${textArea.val()}</li>`);
        listItem.appendTo(list);
    });

    textArea.appendTo(fragment);
    incrementBtn.appendTo(fragment);
    addBtn.appendTo(fragment);
    list.appendTo(fragment);
    container.append(fragment);
}

//	<textarea> with class="counter", value="0" and the disabled attribute.
//	<button> with class="btn", id="incrementBtn" and text "Increment".
//	<button> with class="btn", id="addBtn" and text "Add".
//	Unordered list <ul> with class="results".
