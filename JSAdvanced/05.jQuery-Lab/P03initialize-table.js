function initializeTable() {
    $('#createLink').click(createCountry);
    addCountry('Bulgaria', 'Sofia');
    addCountry('Germany', 'Berlin');
    addCountry('Russia', 'Moscow');
    fixRowLinks();

    function createCountry() {
        let country = $('#newCountryText').val();
        let capital = $('#newCapitalText').val();
        addCountry(country, capital);
        $('#newCountryText').val('');
        $('#newCapitalText').val('');
        fixRowLinks();
    }

    function addCountry(country, capital) {
        let row = $('<tr>')
            .append($('<td>').text(country))
            .append($('<td>').text(capital))
            .append($('<td>')
                .append($('<a href="#">[Up]</a>').click(moveRowUp))
                .append(' ')
                .append($('<a href="#">[Down]</a>').click(moveRowDown))
                .append(' ')
                .append($('<a href="#">[Delete]</a>').click(deleteRow)));
        row.css('display', 'none');
        $('#countriesTable').append(row);
        row.fadeIn();
    }

    function moveRowUp() {
        let row = $(this).parent().parent();
        row.fadeOut(() => {
            row.insertBefore(row.prev());
            row.fadeIn();
            fixRowLinks();
        });
    }

    function moveRowDown() {
        let row = $(this).parent().parent();
        row.fadeOut(() => {
            row.insertAfter(row.next());
            row.fadeIn();
            fixRowLinks();
        });
    }

    function deleteRow() {
        let row = $(this).parent().parent();
        row.fadeOut(() => {
            row.remove();
            fixRowLinks();
        });
    }

    function fixRowLinks() {
        // Show all links in the table
        $('#countriesTable a').css('display', 'inline');

        let tableRows = $('#countriesTable tr');

        // Hide [Up] link in first table data row
        $(tableRows[2]).find("a:contains('Up')").css('display', 'none');

        // Hide the [Down] link in the last table row
        $(tableRows[tableRows.length - 1]).find("a:contains('Down')").css('display', 'none');


        // $('tr a').show();
        // $('tr:last-child a:contains("Down")').hide();
        // $('tr:eq(2) a:contains("Up")').hide();
    }
}