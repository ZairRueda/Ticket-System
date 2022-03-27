const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl

const socketController = (socket) => {

    socket.emit( 'view-last-ticket', ticketControl.lastTicket);
    
    // Event of the client
    socket.on('next-ticket', ( payload, callback ) => {
        
        const next = ticketControl.next()
        callback(next)

        // TODO: Notify here we have a new ticket
    })

}

module.exports = {
    socketController
}

