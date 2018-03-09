function getModule() {
    return {
        id: 0,
        selector: undefined,
        allBugs: new Map(),
        report: function (author, description, isReproducible, severity) {
            let newBug = {
                ID: this.id,
                author: author,
                description: description,
                reproducible: isReproducible,
                severity: severity,
                status: 'Open'
            };
            this.allBugs.set(this.id, newBug);
            this.id++;
            this.output(this.selector);
        },
        setStatus: function (id, newStatus) {
            this.allBugs.get(id).status = newStatus;
            this.output(this.selector);
        },
        remove: function (id) {
            this.allBugs.delete(id);
            this.output(this.selector);
        },
        sort: function (method) {
            method = method.toLowerCase();
            let sortedEntries = [...this.allBugs.entries()]
                .sort(function (a, b) {
                    if(method === 'id'){
                        return a[0] - b[0];
                    } else if(method === 'severity'){
                        return a[1].severity - b[1].severity
                    } else if(method === 'author'){
                        return a[1].author.localeCompare(b[1].author)
                    } else {
                        return a[0] - b[0];
                    }
                });
            for(let [id, report] of sortedEntries) {
                this.allBugs.delete(id);
                this.allBugs.set(id, report);
            }
            this.output(this.selector);
        },
        output: function (selector) {
            $(selector).empty();
            this.selector = selector;
            let container = $(selector);
            for (let [id, bug] of this.allBugs) {
                let bugReport = $('<div>')
                    .attr('id', `report_${id}`)
                    .addClass('report')
                    .append($('<div>')
                        .addClass('body')
                        .append($('<p>')
                            .text(bug.description)))
                    .append($('<div>')
                        .addClass('title')
                        .append($('<span>')
                            .addClass('author')
                            .text(`Submitted by: ${bug.author}`))
                        .append($('<span>')
                            .addClass('status')
                            .text(`${bug.status} | ${bug.severity}`)));
                container.append(bugReport);
            }
        }
    };
}


let tracker = getModule();
tracker.report('kiwi', 'judge rip', true, 5);
tracker.report('guy', 'report content', true, 15);
tracker.report('second guy', 'report content 2', true, 3);
tracker.output('#content');
tracker.setStatus(1, 'ALABALANICA');
tracker.output('#content');
tracker.sort('author');

//tracker.remove(2);
tracker.output('#content');
