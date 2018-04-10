async function loadData() {

    return 'data123';

}


async function loadAllData() {
    console.log('Before promise');
    let data1= await loadData().then(function (data) {
        return data;
    });
    console.log(data1);
    console.log('After promise');
}

loadAllData();
console.log('Finished');
