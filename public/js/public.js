
const lblTicket1 = document.querySelector('#lblTicket1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lblTicket4 = document.querySelector('#lblTicket4');

const lblDesktop1 = document.querySelector('#lblDesktop1');
const lblDesktop2 = document.querySelector('#lblDesktop2');
const lblDesktop3 = document.querySelector('#lblDesktop3');
const lblDesktop4 = document.querySelector('#lblDesktop4');

const socket = io();

let lastFour = [];
socket.on('view-last-four-tickets', (payload) => {

  const audio = new Audio('../audio/new-ticket.mp3');
  audio.play();

  lastFour = payload;
  console.log(lastFour);
  showLastFour(lastFour);
})

// Make a fuction to show the last four tickets
const showLastFour = (lastFour) => {

  for(let i = 0; i <= lastFour.length - 1; i++) {
    let ticket = lastFour[i].number;
    let desktop = lastFour[i].desktop;
    switch(i) {
      case 0:
        lblTicket1.innerHTML = `Ticket ${ticket}`;
        lblDesktop1.innerHTML = desktop;
        break;
      case 1:
        lblTicket2.innerHTML = `Ticket ${ticket}`;
        lblDesktop2.innerHTML = desktop;
        break;
      case 2:
        lblTicket3.innerHTML = `Ticket ${ticket}`;
        lblDesktop3.innerHTML = desktop;
        break;
      case 3:
        lblTicket4.innerHTML = `Ticket ${ticket}`;
        lblDesktop4.innerHTML = desktop;
        break;
    }
  }
}