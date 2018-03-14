function listBuilder(selector) {
    let container = $(selector);

    function createNewList() {
        container.empty();
        container.append($('<ul>'));
    }

    function addItem(item) {
        let list = container.find('ul');
        let btnUp = $('<button>').text('Up');
        btnUp.on('click', up);
        let btnDown = $('<button>').text('Down');
        btnDown.on('click', down);
        let listItem = $('<li>').text(`${item}`);
        listItem.append(btnUp).append(btnDown);
        list.append(listItem);
    }

    function up(event) {
        let listItem = $(event.target).parent();
        listItem.insertBefore(listItem.prev());
    }

    function down(event) {
        let listItem = $(event.target).parent();
        listItem.insertAfter(listItem.next());
    }

    return {
        createNewList,
        addItem
    }
}


// let builder = listBuilder("#main");
// builder.createNewList();
// builder.addItem("Sofia");
// builder.addItem("Varna");
// builder.addItem("Sofia <new>");
// builder.addItem("Pleven");