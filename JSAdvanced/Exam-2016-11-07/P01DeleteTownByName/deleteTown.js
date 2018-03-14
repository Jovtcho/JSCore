function attachEvents() {
    let btnDelete = $('#btnDelete');
    btnDelete.on('click', deleteTownByName);

    function deleteTownByName() {
        let target = $('#townName');
        let towns = $('#towns option').toArray();
        let result = $('#result');
        let isExist = false;
        for (let town of towns) {
            if (target.val() === $(town).val()) {
                $(town).remove();
                isExist = true;
            }
        }

        isExist ? result.text(`${target.val()} deleted.`) : result.text(`${target.val()} not found.`);
        target.val('');
    }
}


// Author
// function attachEvents() {
//     $('#btnDelete').click(function() {
//         let townName = $('#townName').val();
//         $('#townName').val('');
//         let found = false;
//         for (let option of $('#towns option'))
//             if (option.textContent == townName) {
//                 found = true;
//                 option.remove();
//             }
//         if (found)
//             $('#result').text(townName + " deleted.");
//         else
//             $('#result').text(townName + " not found.");
//     });
// }