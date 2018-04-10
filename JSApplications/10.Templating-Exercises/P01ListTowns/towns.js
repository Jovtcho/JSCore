function attachEvents() {
    let context = {};
    let container = $('#root');
    let source = $("#towns-template").html();
    let template = Handlebars.compile(source);

    let loadBtn = $('#btnLoadTowns');
    loadBtn.on('click', () => {
        let towns = $('#towns').val();
        context.towns = towns.split(',').filter(t => t.trim() !== '').map(t => {
            return {town: t};
        });
        let html = template(context);
        container.html(html);
    });
}