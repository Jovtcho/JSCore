function calendar([d, m, y]) {
    let [day, month, year] = ([d, m, y]).map(Number);
    month -= 1;

    let currentDate = new Date(year, month, day);
    let firstCurrentMonth = new Date(year, month);
    let lastCurrentMonth = new Date(year, month + 1, 0);
    let calendarFirstDay = new Date(year, month, 1 - firstCurrentMonth.getDay());
    let calendarLastDay = new Date(year, month + 1, 6 - lastCurrentMonth.getDay());

    //table header
    let output = "<table>\n";
    output += "  <tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>\n";

    //previous month days
    if (firstCurrentMonth.getDay() > 0) {
        output += "  <tr>";
        for (let day = calendarFirstDay.getDay(); day < firstCurrentMonth.getDay(); day++) {
            output += `<td class="prev-month">${calendarFirstDay.getDate() + day}</td>`;
        }
    }

    //current month days
    let currentDay = 1;
    while (currentDay <= lastCurrentMonth.getDate()) {
        if (new Date(year, month, currentDay).getDay() === 0) {
            output += "  <tr>";
        }

        if (currentDay === day) {
            output += `<td class="today">${currentDay}</td>`;
        } else {
            output += `<td>${currentDay}</td>`;
        }

        if ((new Date(year, month, currentDay).getDay() + 1) % 7 === 0) {
            output += "</tr>\n"
        }

        currentDay++;
    }

    //next month days
    if (lastCurrentMonth < calendarLastDay) {
        for (let day = 1; day <= calendarLastDay.getDate(); day++) {
            output += `<td class="next-month">${day}</td>`;
        }
        output += "</tr>\n";
    }

    //close table
    output += "</table>";

    return output;
}

console.log(calendar([4, 9, 2016]));
console.log(calendar([24, 12, 2012]));
console.log(calendar([9, 2, 1987]));