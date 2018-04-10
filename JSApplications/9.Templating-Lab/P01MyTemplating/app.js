$(async () => {
    let friends = [
        {name: 'Pesho', age: 20, town: 'Sofia'},
        {name: 'Misho', age: 12, town: 'Varna'},
        {name: 'Valia', age: 20, town: 'Plovdiv'},
        {name: 'Mimi', age: 13, town: 'Sofia'},
        {name: 'Gogo', age: 34, town: 'Burgas'}];

    let container = $('#main');
    let template = await $.get('template.html');

    for (let friend of friends) {
        container.append(parse(template, friend));
    }

    function parse(template, text) {
        return template.replace(/{{\s*(\w+)\s*}}/g, (match, group1) => {
            if (text.hasOwnProperty(group1)) {
                return text[group1];
            } else {
                return match;
            }
        });
    }
});