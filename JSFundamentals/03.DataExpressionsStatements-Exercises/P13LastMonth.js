function getDateLastMonth(paramsArr) {
    let today = new Date(paramsArr[2], paramsArr[1] - 1, paramsArr[0] + 1);
    //console.log(today);
    let lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    console.log(lastDayOfMonth.getDate());
}

//getDateLastMonth();
// getDateLastMonth([17, 1, 2002]);
// getDateLastMonth([16, 2, 2003]);
// getDateLastMonth([15, 3, 2004]);
// getDateLastMonth([14, 4, 2005]);
// getDateLastMonth([13, 5, 2006]);
// getDateLastMonth([12, 6, 2007]);

getDateLastMonth([17, 3, 2002]);
getDateLastMonth([13, 12, 2004]);

