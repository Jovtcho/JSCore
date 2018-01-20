/**
 * Created by Jo on 1/9/2018.
 */

function addDay(year, month, day) {
    let date = new Date(year, month - 1, day);
    let newDate = new Date(year, month - 1, date.getDate() + 1);

    return newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
}

console.log(addDay(2016, 9, 30));
console.log(addDay(2016, 12, 3));