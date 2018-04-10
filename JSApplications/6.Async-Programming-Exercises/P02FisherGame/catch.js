function attachEvents() {
    const ENDPOINT = `https://baas.kinvey.com/appdata/kid_HJUjeqI5f/biggestCatches`;
    const USER = 'Gosho';
    const PASSWORD = '123';
    let addForm = $('#addForm');
    let catches = $('#catches');
    let addBtn = addForm.find('button.add');
    addBtn.on('click', addCatch);
    let loadBtn = $('#aside button.load');
    loadBtn.on('click', loadData);

    function addCatch() {
        let angler = addForm.find('input.angler');
        let weight = addForm.find('input.weight');              //NUMBER
        let species = addForm.find('input.species');
        let location = addForm.find('input.location');
        let bait = addForm.find('input.bait');
        let captureTime = addForm.find('input.captureTime');    //NUMBER

        if (angler !== undefined && weight !== undefined && species !== undefined
            && location !== undefined && bait !== undefined && captureTime !== undefined) {
            let data = {
                angler: angler.val(),
                weight: Number(weight.val()),
                species: species.val(),
                location: location.val(),
                bait: bait.val(),
                captureTime: Number(captureTime.val())
            };
            let addReq = {
                method: 'POST',
                url: ENDPOINT,
                data: JSON.stringify(data),
                headers: {
                    Authorization: make_base_auth(),
                    'Content-Type': 'application/json'
                }
            };

            $.ajax(addReq)
                .then(addData)
                .catch(displayError)
        }
    }

    function addData(res) {
        addForm.find('input.angler').val('');
        addForm.find('input.weight').val('');
        addForm.find('input.species').val('');
        addForm.find('input.location').val('');
        addForm.find('input.bait').val('');
        addForm.find('input.captureTime').val('');
    }

    function loadData() {
        let loadReq = {
            method: 'GET',
            url: ENDPOINT,
            headers: {
                Authorization: make_base_auth()
            }
        };

        $.ajax(loadReq)
            .then(displayData)
            .catch(displayError)

    }

    function displayData(catchesData) {
        catches.empty();
        for (let data of catchesData) {
            // let data = JSON.parse(dataJSON);
            // console.log(data);
            let id = data._id;
            let angler = data.angler;
            let weight = data.weight;
            let species = data.species;
            let location = data.location;
            let bait = data.bait;
            let captureTime = data.captureTime;

            let divToAdd = $(`<div class="catch" data-id="${id}">
            <label>Angler</label>
            <input type="text" class="angler" value="${angler}"/>
            <label>Weight</label>
            <input type="number" class="weight" value="${weight}"/>
            <label>Species</label>
            <input type="text" class="species" value="${species}"/>
            <label>Location</label>
            <input type="text" class="location" value="${location}"/>
            <label>Bait</label>
            <input type="text" class="bait" value="${bait}"/>
            <label>Capture Time</label>
            <input type="number" class="captureTime" value="${captureTime}"/></div>`);
            let updateBtn = $('<button class="update">Update</button>');
            updateBtn.on('click', () => updateData(divToAdd, id));
            let deleteBtn = $('<button class="delete">Delete</button>');
            deleteBtn.on('click', () => deleteData(divToAdd, id));

            divToAdd.append(updateBtn);
            divToAdd.append(deleteBtn);
            catches.append(divToAdd);
        }
    }

    function updateData(data, id) {
        let angler = data.find('input.angler').val();
        let weight = data.find('input.weight').val();              //NUMBER
        let species = data.find('input.species').val();
        let location = data.find('input.location').val();
        let bait = data.find('input.bait').val();
        let captureTime = data.find('input.captureTime').val();    //NUMBER

        let datatoPut = {
            angler: angler,
            weight: Number(weight),
            species: species,
            location: location,
            bait: bait,
            captureTime: Number(captureTime)
        };

        let putReq = {
            method: 'PUT',
            url: `${ENDPOINT}/${id}`,
            data: JSON.stringify(datatoPut),
            headers: {
                Authorization: make_base_auth(),
                'Content-Type': 'application/json'
            }
        };

        $.ajax(putReq)
            .then(loadData)
            .catch(displayError)
    }

    function deleteData(data, id) {
        $(data).remove();
        let deleteReq = {
            method: 'DELETE',
            url: `${ENDPOINT}/${id}`,
            headers: {
                Authorization: make_base_auth()
            }
        };

        $.ajax(deleteReq)
            .catch(displayError)
    }

    function displayError(err) {
        console.log(err);
    }

    function make_base_auth() {
        let token = USER + ':' + PASSWORD;
        let encoded = btoa(token);
        return "Basic " + encoded;
    }
}