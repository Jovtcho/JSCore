function manageTicketsDb(ticketsArr, sortCriteria) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = price;
            this.status = status;
        }
    }

    let ticketsDb = [];
    for (let ticket of ticketsArr) {
        let tokens = ticket.split('|');
        let [destination, price, status] = tokens;
        price = Number(price);
        let currentTicket = new Ticket(destination, price, status);
        ticketsDb.push(currentTicket);
    }


    ticketsDb.sort((t1, t2) => t1[sortCriteria] > t2[sortCriteria]);

    // let sort = {
    //     destination: function () {
    //         ticketsDb.sort((t1, t2) => t1[sortCriteria].localeCompare(t2[sortCriteria]));
    //     },
    //     price: function () {
    //         ticketsDb.sort((t1, t2) => t1[sortCriteria] - (t2[sortCriteria]));
    //     },
    //     status: function () {
    //         ticketsDb.sort((t1, t2) => t1[sortCriteria].localeCompare(t2[sortCriteria]));
    //     }
    // };
    //
    // sort[sortCriteria]();

    return ticketsDb;
}

console.log(manageTicketsDb(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'destination'));

console.log(manageTicketsDb(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'status'));

console.log(manageTicketsDb(['Philadelphia|94.20|available',
        'New York City|95.99|available',
        'New York City|95.99|sold',
        'Boston|126.20|departed'],
    'price'));