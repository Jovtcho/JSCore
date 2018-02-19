function attachEventsListeners() {
    let rates = {
        'km': 1000,
        'm': 1,
        'cm': 0.01,
        'mm': 0.001,
        'mi': 1609.34,
        'yrd': 0.9144,
        'ft': 0.3048,
        'in': 0.0254
    };

    let button = document.getElementById('convert');
    button.addEventListener('click', convert);

    function convert() {
        let value = Number(document.getElementById('inputDistance').value);
        let inputUnit = document.getElementById('inputUnits').value;
        let outputUnit = document.getElementById('outputUnits').value;

        let inputRate = rates[inputUnit];
        let outputRate = rates[outputUnit];
        let result = (value * inputRate) / outputRate;

        document.getElementById('outputDistance').value = result;
    }
}