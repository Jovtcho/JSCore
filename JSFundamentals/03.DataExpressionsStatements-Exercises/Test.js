function calendar([day, month, year]) {
    let date = new Date(year, month - 1, day);
    let today = date.getDate();
    let oneDay = 24 * 60 * 60 * 1000;
    let currentMonth1st = new Date(year, month - 1, 1);
    let nextMonth1st = new Date(year, month, 1);
    let currentMonthFirstDayIndex = currentMonth1st.getDay();
    let previousMonthLastDate = new Date(currentMonth1st.getTime() - oneDay).getDate();
    let currentMonthLastDate = new Date(nextMonth1st.getTime() - oneDay).getDate();
    let currentDate = 1;
    let newMonthDay = 1;

    let html = "<table>\n";

    html += "  <tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>\n";

    function drawFirstWeek() {
        html += "  <tr>";
        for (let i = 0; i < 7; i++) {
            if (i < currentMonthFirstDayIndex) {
                let day = previousMonthLastDate - (currentMonthFirstDayIndex - 1 - i);
                html += `<td class="prev-month">${day}</td>`;
            } else {
                if (today === currentDate)
                    html += `<td class="today">${currentDate++}</td>`;
                else
                    html += `<td>${currentDate++}</td>`;
            }
        }
        html += "</tr>\n";
    }

    function drawWeek() {
        html += "  <tr>";
        for (let i = 0; i < 7; i++) {
            if (today === currentDate)
                html += `<td class="today">${currentDate++}</td>`;
            else {
                html += `<td>${currentDate++}</td>`;
            }
        }
        html += "</tr>\n";
    }

    function drawLastWeek() {
        html += "  <tr>";
        for (let i = 0; i < 7; i++) {
            if (today === currentDate)
                html += `<td class="today">${currentDate++}</td>`;
            else if (currentDate <= currentMonthLastDate) {
                html += `<td>${currentDate++}</td>`;
            } else {
                html += `<td class="next-month">${newMonthDay++}</td>`;
            }
        }
        html += "</tr>\n";
    }

    if (currentMonthFirstDayIndex !== 0)
        drawFirstWeek();
    else
        drawWeek();

    let weeks = (currentMonthLastDate - currentDate) >= 28 ? 4 : 3;

    for (let i = 0; i < weeks; i++) {
        drawWeek();
    }

    if (currentDate < currentMonthLastDate)
        drawLastWeek();

    html += "</table>";

    return html;
}

console.log(calendar([4, 9, 2016]));

console.log(calendar([4, 9, 2016]));