function sort(colIndex, order) {
    let tbody = $('#products').find('tbody');
    let sorted;
    if (colIndex === 0) {
        sorted = tbody.find('tr').sort(function (r1, r2) {
            if (order) {
                return $('td:first', r2).text().localeCompare($('td:first', r1).text());
            } else {
                return $('td:first', r1).text().localeCompare($('td:first', r2).text());
            }
        });
    } else {
        sorted = tbody.find('tr').sort(function (r1, r2) {
            if (order) {
                return Number($('td:last', r2).text()) - Number($('td:last', r1).text());
            } else {
                return Number($('td:last', r1).text()) - Number($('td:last', r2).text());
            }
        });
    }
    tbody.append(sorted);
}

//Author solution
function sort2(colIndex, descending) {
    let table = $('#products');
    let head = table.find('thead');
    let body = table.find('tbody');
    let rows = body.find('tr').toArray();
    let sorter = null;
    if (colIndex === 0) {
        sorter = (a, b) => {
            a = $(a).find('td:nth-child(1)').text();
            b = $(b).find('td:nth-child(1)').text();
            return a.localeCompare(b);
        };
    } else if (colIndex === 1) {
        sorter = (a, b) => {
            a = Number($(a).find('td:nth-child(2)').text());
            b = Number($(b).find('td:nth-child(2)').text());
            return a - b;
        }
    }
    rows.sort(sorter);
    if (descending) {
        rows.reverse();
    }
    $(rows).each((i, e) => $(e).appendTo(body));
}