$(() => {
    const context = {
        cats: window.cats
    };

    let container = $('#allCats');

    renderCatTemplate();


    async function renderCatTemplate() {
        let source = await $.get('./cat-template.html');
        let template = Handlebars.compile(source);
        let html = template(context);
        container.html(html);
        attachHandlers();
    }

    function attachHandlers() {
        let buttons = $('button.btn-primary');
        buttons.on('click', (event) => {
            let targetBtn = $(event.target);
            let divInfo = targetBtn.next();
            divInfo.toggle();
            if (targetBtn.text() === 'Show status code') {
                targetBtn.text('Hide status code');
            } else {
                targetBtn.text('Show status code');
            }

        });
    }

});
