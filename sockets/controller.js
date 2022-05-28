const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl

const socketController = (socket) => {

    socket.emit( 'view-last-ticket', ticketControl.lastTicket);
    socket.emit( 'view-last-four-tickets', ticketControl.last4);
    socket.emit( 'pending-tickets', ticketControl.tickets.length);
    
    // Event of the client
    socket.on('next-ticket', ( payload, callback ) => {
        
        const next = ticketControl.next()
        callback(next)
        socket.broadcast.emit( 'pending-tickets', ticketControl.tickets.length);

        // TODO: Notify here we have a new ticket
    })

    socket.on('listener-ticket', ({desktop}, callback ) => {
        if (!desktop) {
            return callback({
                err: true,
                message: 'The desktop is required'
            })
        }

        const ticket = ticketControl.serveTicket(desktop)

        socket.broadcast.emit( 'view-last-four-tickets', ticketControl.last4);
        socket.emit('pending-tickets', ticketControl.tickets.length);
        socket.broadcast.emit( 'pending-tickets', ticketControl.tickets.length);

        if (!ticket) {
            return callback({
                err: true,
                message: 'There are no tickets'
            })
        } else {
            callback({
                err: false,
                ticket
            })
        }
    })

}

module.exports = {
    socketController
}

