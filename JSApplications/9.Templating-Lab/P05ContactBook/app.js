$(() => {
    const context = {
        contacts: []
    };
    const templates = {};
    const contactsContainer = $('#list .content');
    const detailsContainer = $('#details .content');


    loadData();
    loadTemplates();

    async function loadData() {
        context.contacts = (await $.get('data.json')).map(c => {
            c.active = false;
            return c;
        });
    }

    async function loadTemplates() {
        const [contactSource, contactsList, detailsSource] =
            await Promise.all([
                $.get('./templates/contact.html'),
                $.get('./templates/contactsList.html'),
                $.get('./templates/details.html')
            ]);

        Handlebars.registerPartial('contact', contactSource);
        templates.list = Handlebars.compile(contactsList);
        templates.details = Handlebars.compile(detailsSource);
        renderList();
    }

    function renderList() {
        contactsContainer.html(templates.list(context));
        attachHandlers();
    }

    function attachHandlers() {
        $('.contact').on('click', (event) => {
            let index = $(event.target).closest('.contact').attr('data-index');
            context.contacts.forEach(c => c.active = false);
            context.contacts[index].active = true;

            renderDetails(index);
            renderList();
        })
    }

    function renderDetails(index) {
        detailsContainer.html(templates.details(context.contacts[index]));
    }
});