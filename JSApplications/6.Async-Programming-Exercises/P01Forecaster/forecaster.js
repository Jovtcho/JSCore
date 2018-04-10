function attachEvents() {
    $('#submit').on('click', showForecast);
    const URL = 'https://judgetests.firebaseio.com';
    const forecast = $('#forecast');
    let location;

    function showForecast() {
        location = $('#location').val();
        let req = {
            method: 'GET',
            url: `${URL}/locations.json`
        };

        $.ajax(req)
            .then(getLocationCode)
            .catch(displayError);
    }

    function getLocationCode(locations) {
        let locationsCode = locations.filter(el => el.name === location);
        if (locationsCode.length > 0) {
            let currentCode = locationsCode[0].code;
            let reqTodayForecast = {
                method: 'GET',
                url: `${URL}/forecast/today/${currentCode}.json`
            };

            let reqUpcomingForecast = {
                method: 'GET',
                url: `${URL}/forecast/upcoming/${currentCode}.json`
            };

            Promise.all([$.ajax(reqTodayForecast), $.ajax(reqUpcomingForecast)])
                .then(displayForecast)
                .catch(displayError);
        } else {
            displayError();
        }
    }

    function displayForecast([today, upcoming]) {
        let weatherSymbols = {
            'Sunny': '&#x2600;',
            'Partly sunny': '&#x26C5;',
            'Overcast': '&#x2601;',
            'Rain': '&#x2614;'
        };

        displayCurrent();
        displayUpcoming();
        forecast.css('display', 'block');

        function displayCurrent() {
            let current = $('#current');
            current.empty();
            current.append($('<div class ="label">Current conditions</div>'));
            current.append($('<span>')
                .addClass('condition symbol')
                .html(weatherSymbols[today.forecast.condition]));
            let condition = $('<span>').addClass('condition');
            condition
                .append($('<span class="forecast-data">')
                    .text(today.name))
                .append($('<span class="forecast-data">')
                    .html(`${today.forecast.low}&#176;/${today.forecast.high}&#176;`))
                .append($('<span class="forecast-data">')
                    .text(today.forecast.condition));
            current.append(condition);
        }

        function displayUpcoming() {
            let upcomingDiv = $('#upcoming');
            upcomingDiv.empty();
            upcomingDiv.append($('<div class ="label">Three-day forecast</div>'));
            for (let day of upcoming.forecast) {
                let upcomingSpan = $('<span class="upcoming">');
                upcomingSpan
                    .append($('<span class="symbol">')
                        .html(weatherSymbols[day.condition]))
                    .append($('<span class="forecast-data">')
                        .html(`${day.low}&#176;/${day.high}&#176;`))
                    .append($('<span class="forecast-data">')
                        .text(day.condition));
                upcomingDiv.append(upcomingSpan);
            }
        }
    }

    function displayError(err) {
        forecast.css('display', 'block');
        forecast.text('Error');
    }
}