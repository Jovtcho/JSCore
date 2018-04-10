let result = (function solve() {
    let url = 'https://judgetests.firebaseio.com/schedule/';
    let name = 'depot';
    let nextId = name;
    // let info = $('#info span');
    // console.log(info);

    function depart() {
        let req = {
            method: 'GET',
            url: `${url}${nextId}.json`,
            success: onSuccess,
            error: onError
        };

        $.ajax(req);
    }

    function arrive() {
        let info = $('#info span');
        $(info).text(`Arriving at ${name}`);
        $('#depart').prop('disabled', false);
        $('#arrive').prop('disabled', true);
    }

    function onSuccess(res) {
        let info = $('#info span');
        name = res['name'];
        nextId = res['next'];
        $(info).text(`Next stop ${name}`);
        $('#depart').prop('disabled', true);
        $('#arrive').prop('disabled', false);

    }

    function onError(err) {
        let info = $('#info span');
        $(info).text(`Error`);
        $('#depart').prop('disabled', true);
        $('#arrive').prop('disabled', true);
    }

    return {
        depart,
        arrive
    };
})();