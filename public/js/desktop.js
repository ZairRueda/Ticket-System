const searchParams = new URLSearchParams(window.location.search);
const socket = io();

const lblWaiting = document.querySelector('#lblWaiting');
const desktopName = document.querySelector('#desktop-name');
const tockenNow = document.querySelector('.text-primary');
const btnResponse = document.querySelector('button')
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert')

// If we don't being in a desktop
if( !searchParams.has('desktop') ) {
  window.location = 'index.html';
  throw new Error('The desktop parameter is required');
}

// Estract the name of the desktop
const desktop = searchParams.get('desktop');
desktopName.textContent = desktop;

// Alert Style
divAlert.style.display = 'none'

// Socket Conections
socket.on('connect', () => {
  // console.log('Conected to server');
  btnResponse.disabled = false;
});

socket.on('disconnect', () => {
  // console.log('Disconected to server');
  btnResponse.disabled = true;
});

socket.on('pending-tickets', (pendings) => {
  if (pendings === 0) {
    lblWaiting.style.display = 'none';
  } else { 
    lblWaiting.style.display = '';
    lblWaiting.textContent = `${pendings}`;
  }
})

btnResponse.addEventListener( 'click', () => {
    
  // I need to the backend listen this event
  // we send the desktop like a object, in the callback (payload) we wanting an info of the backend
  socket.emit('listener-ticket', {desktop}, ( {err, ticket, message} ) => {
    if (err) {
      divAlert.textContent = message;
      return divAlert.style.display = '';
    }
    
    lblTicket.textContent = `Ticket ${ticket.number}`;
  })
})