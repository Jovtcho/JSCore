function calendar(paramsArr) {
    let [day, month, year] = paramsArr;

    // Months are zero-based, setting it this way will initialize it to the
    // next month; however, we set the date to 0, which will roll the date back
    // to the last day of the previous month (the one we actually want)
    let date = new Date(year, month, 0); // last date/day of current month - 28.Feb.2018
    let daysInMonth = date.getDate(); //how many days in current month - 28

    // Next we set the date to the first of the month, so we can see which day
    // of the week it starts on (0-6, starting on Sunday)
    date.setDate(1);
    let startingDay = date.getDay();

    // Since 0 is Sunday, we have to catch it and set it to the correct value
    if (startingDay === 0) {
        startingDay = 7;
    }

    let monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let fullMonthName = monthNames[month - 1];
    let weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    let tableCalendar = $('<table>');
    tableCalendar.append($('<caption>').text(`${fullMonthName} ${year}`));
    let tableBody = $('<tbody>');
    tableBody.appendTo(tableCalendar);

    //table header/days of week - start
    let currentRow = $('<tr>');
    for (let index = 0; index < 7; index++) {
        let tableHeader = $('<th>').text(`${weekDays[index]}`);
        currentRow.append(tableHeader);
    }
    currentRow.appendTo(tableBody);
    //table header/days of week - end

    let currentDay = 1 - startingDay;
    let isFinish = false;

    while (!isFinish) {
        currentRow = $('<tr>');
        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
            let tableData = $('<td>');
            currentDay++;
            if (0 < currentDay && currentDay <= daysInMonth) {
                tableData.text(currentDay);
                if (currentDay === day) {
                    tableData.addClass('today');
                }
            }
            currentRow.append(tableData);
            if (currentDay === daysInMonth) {
                isFinish = true;
            }
        }

        currentRow.appendTo(tableBody);
    }

    $('#content').append(tableCalendar);
}