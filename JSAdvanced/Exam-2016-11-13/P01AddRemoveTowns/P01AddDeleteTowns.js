function attachEvents() {
    let towns = $('#towns');

    let deleteBtn = $('#btnDelete');
    deleteBtn.on('click', deleteTown);

    let addBtn = $('#btnAdd');
    addBtn.on('click', addTown);

    function deleteTown() {
        let townToDelete = towns.find(':selected');
        townToDelete.remove();
    }

    function addTown() {
        //let inputDiv = $(this).parent();
        let townToAdd = $('#newItem');
        if (townToAdd.val() !== '' ) {
            let newOption = $(`<option>${townToAdd.val()}</option>`);
            towns.append(newOption);
            townToAdd.val('');
        }
    }
}