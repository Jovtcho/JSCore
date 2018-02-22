function timer() {
    let startBtn = $('#start-timer');
    startBtn.on('click', startTimer);
    let stopBtn = $('#stop-timer');
    stopBtn.on('click', stopTimer);
    let interval;
    let time;

    function setTime(seconds) {
        let spanSeconds = seconds % 60;
        let spanMinutes = Math.floor(seconds / 60) % 60;
        let spanHours = Math.floor(seconds / 3600);
        $('#hours').text(("0" + spanHours).slice(-2));
        $('#minutes').text(("0" + spanMinutes).slice(-2));
        $('#seconds').text(("0" + spanSeconds).slice(-2));
    }

    function startTimer() {
        clearInterval(interval);
        let spanSeconds = Number($('#seconds').text());
        let spanMinutes = Number($('#minutes').text());
        let spanHours = Number($('#hours').text());
        time = spanSeconds + spanMinutes * 60 + spanHours * 3600;
        setTime(time);
        startBtn.attr('disabled', true);
        stopBtn.attr('disabled', false);
        interval = setInterval(count, 1000);
    }

    function stopTimer() {
        clearInterval(interval);
        startBtn.attr('disabled', false);
        stopBtn.attr('disabled', true);
    }

    function count() {
        time++;
        setTime(time);
    }
}