function move(command) {
    if (command === 'right') {
        let selectedAvailable = $('#available-towns option:selected').remove();
        $('#selected-towns').append(selectedAvailable);
    } else if (command === 'left') {
        let selectedSelected = $('#selected-towns option:selected').remove();
        $('#available-towns').append(selectedSelected);
    } else {
        let allSelected = $('#selected-towns option');
        let output = [];
        for (let town of allSelected) {
            output.push($(town).text());
        }
        $('#output').text(output.join('; '));
    }
}

// function move(direction) {
//     if (direction === 'right') {
//         let townsToMove = $('#available-towns').find('option:selected');
//         townsToMove.prop('selected', false);
//         $('#selected-towns').append(townsToMove);
//     }
//     if (direction === 'left') {
//         let townsToMove = $('#selected-towns').find('option:selected');
//         townsToMove.prop('selected', false);
//         $('#available-towns').append(townsToMove);
//     }
//     if (direction === 'print') {
//         let townsToPrint = $('#selected-towns').find('option').toArray().map(o => o.textContent);
//         $('#output').text(townsToPrint.join('; '));
//     }
// }