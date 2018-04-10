function getInfo() {
    let stopId = $('#stopId').val();
    let stopNameDiv = $('#stopName');
    let busesList = $('#buses');
    let url = `https://judgetests.firebaseio.com/businfo/${stopId}.json`;
    let req = {
        method: 'GET',
        url: url,
        success: onSuccess,
        error: onError
    };

    $.ajax(req);

    function onSuccess(res) {
        let stopName = res['name'];
        let buses = res['buses'];
        displayInfo(stopName, buses);
    }

    function onError(err) {
        stopNameDiv.text('Error');
        busesList.empty();
    }

    function displayInfo(stopName, buses) {
        stopNameDiv.text(stopName);
        busesList.empty();
        for (let busId in buses) {
            let liBus = $(`<li>Bus ${busId} arrives in ${buses[busId]} minutes</li>`);
            busesList.append(liBus);
        }
    }
}