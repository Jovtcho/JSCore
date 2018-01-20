function calcTicketPriceByDayAndMovie(paramsArr) {
    let movie = paramsArr[0].toLowerCase();
    let dayOfWeek = paramsArr[1].toLowerCase();

    if (movie === "The Godfather".toLowerCase()) {
        switch (dayOfWeek) {
            case "Monday".toLowerCase():
                console.log(12);
                break;
            case "Tuesday".toLowerCase():
                console.log(10);
                break;
            case "Wednesday".toLowerCase():
                console.log(15);
                break;
            case "Thursday".toLowerCase():
                console.log(12.50);
                break;
            case "Friday".toLowerCase():
                console.log(15);
                break;
            case "Saturday".toLowerCase():
                console.log(25);
                break;
            case "Sunday".toLowerCase():
                console.log(30);
                break;
            default:
                console.log("error");
                break;
        }
    } else if (movie === "Schindler's List".toLowerCase()) {
        switch (dayOfWeek) {
            case "Monday".toLowerCase():
            case "Tuesday".toLowerCase():
            case "Wednesday".toLowerCase():
            case "Thursday".toLowerCase():
            case "Friday".toLowerCase():
                console.log("8.50");
                break;
            case "Saturday".toLowerCase():
            case "Sunday".toLowerCase():
                console.log(15);
                break;
            default:
                console.log("error");
                break;
        }
    } else if (movie === "Casablanca".toLowerCase()) {
        switch (dayOfWeek) {
            case "Monday".toLowerCase():
            case "Tuesday".toLowerCase():
            case "Wednesday".toLowerCase():
            case "Thursday".toLowerCase():
            case "Friday".toLowerCase():
                console.log(8);
                break;
            case "Saturday".toLowerCase():
            case "Sunday".toLowerCase():
                console.log(10);
                break;
            default:
                console.log("error");
                break;
        }
    } else if (movie === "The Wizard of Oz".toLowerCase()) {
        switch (dayOfWeek) {
            case "Monday".toLowerCase():
            case "Tuesday".toLowerCase():
            case "Wednesday".toLowerCase():
            case "Thursday".toLowerCase():
            case "Friday".toLowerCase():
                console.log(10);
                break;
            case "Saturday".toLowerCase():
            case "Sunday".toLowerCase():
                console.log(15);
                break;
            default:
                console.log("error");
                break;
        }
    } else {
        console.log("error");
    }
}

calcTicketPriceByDayAndMovie(["The Godfather", "Friday"]);
calcTicketPriceByDayAndMovie(["casablanca", "sunday"]);
calcTicketPriceByDayAndMovie(["Schindler's LIST", "monday"]);
calcTicketPriceByDayAndMovie(["The Wizard of Oz", "Thursday"]);


