// Referenses in HTML
const newTicket = document.querySelector('#lblNuevoTicket');
const newTicketBtn = document.querySelector('#new-ticket-btn');

const socket = io();



socket.on('connect', () => {
  // console.log('Conected to server');
  newTicketBtn.disabled = false;
});

socket.on('disconnect', () => {
  // console.log('Disconected to server');
  newTicketBtn.disabled = true;
});

socket.on('view-last-ticket', (lastTicket) => {
  newTicket.textContent = `Ticket ${lastTicket}`;
})

newTicketBtn.addEventListener( 'click', () => {
    
  socket.emit( 'next-ticket', null, ( ticket ) => {
    newTicket.textContent = `${ticket}`
  })
})