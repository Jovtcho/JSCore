function tableBuilder(selector) {
    let container = $(selector);

    function createTable(columnNames) {
        let table = $('<table>');
        let headerRow = $('<tr>');

        for (let column of columnNames) {
            headerRow.append($('<th>').text(column));
        }
        headerRow.append($('<th>').text('Action'));
        table.append(headerRow);
        container.empty();
        container.append(table);
    }

    function fillData(dataRows) {
        let table = container.find('table');
        for (let row of dataRows) {
            let newRow = $('<tr>');
            for (let element of row) {
                newRow.append($('<td>').text(element));
            }

            let deleteBtn = $('<button>').text('Delete');
            deleteBtn.on('click', function () {
                $(this).parent().parent().remove();

            });
            newRow.append($('<td>').append(deleteBtn));
            table.append(newRow);
        }
    }

    return {
        createTable,
        fillData
    }
}