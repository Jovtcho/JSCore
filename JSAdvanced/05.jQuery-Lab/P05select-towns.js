function attachEvents() {
    $('#items').on('click', 'li', selectDeselect);
    $('#showTownsButton').on('click', showTowns);

    function selectDeselect() {
        let town = $(this);
        if (town.attr('data-selected')) {
            town.removeAttr('data-selected');
            town.css('background', '');
        } else {
            town.attr('data-selected', 'true');
            town.css('background', '#DDD');
        }
    }

    function showTowns() {
        let listTowns = $('#items li[data-selected=true]');
        let towns = [...listTowns]
            .map(li => li.textContent)
            .join(", ");
        $('#selectedTowns').text("Selected towns: " + towns);
    }
}