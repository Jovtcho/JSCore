function attachEventsListeners() {
    const dayToHours = 24;
    const dayToMinutes = 1440;
    const dayToSeconds = 86400;

    let buttons = document.querySelectorAll('input[type=button]');

    for (let button of buttons) {
        button.addEventListener('click', convert);
    }

    function convert(event) {
        let unit = event.target.id.slice(0, -3);
        let unitValue = Number(document.getElementById(unit).value);
        //console.log(unitValue);
        calculate(unit, unitValue);
    }

    function calculate(unit, unitValue) {
        let day = 0;
        let hour = 0;
        let minute = 0;
        let second = 0;

        switch (unit) {
            case 'days':
                day = unitValue;
                hour = unitValue * dayToHours;
                minute = unitValue * dayToMinutes;
                second = unitValue * dayToSeconds;
                break;
            case 'hours':
                day = unitValue / dayToHours;
                hour = unitValue;
                minute = (unitValue / dayToHours) * dayToMinutes;
                second = (unitValue / dayToHours) * dayToSeconds;
                break;
            case 'minutes':
                day = unitValue / dayToMinutes;
                hour = (unitValue / dayToMinutes) * dayToHours;
                minute = unitValue;
                second = (unitValue / dayToMinutes) * dayToSeconds;
                break;
            case 'seconds':
                day = unitValue / dayToSeconds;
                hour = (unitValue / dayToSeconds) * dayToHours;
                minute = (unitValue / dayToSeconds) * dayToMinutes;
                second = unitValue;
                break;
        }

        fillResult(day, hour, minute, second);
    }

    function fillResult(day, hour, minute, second) {
        document.getElementById("days").value = day;
        document.getElementById("hours").value = hour;
        document.getElementById("minutes").value = minute;
        document.getElementById("seconds").value = second;
    }
}
