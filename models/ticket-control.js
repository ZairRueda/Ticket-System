const path = require('path');
const fs   = require('fs');
const { threadId } = require('worker_threads');

class Ticket {
  constructor( number, desktop) {
    this.number = number;
    this.desktop = desktop;
  }
}

class TicketControl {

  // Architecture to our app

  constructor() {
    // Usually is comon whirite all instans of the class in the constructor

    this.lastTicket = 0
    // A day today
    this.today      = new Date().getDate()
    // tickets to uses
    this.tickets    = []
    // Show this last four tickets
    this.last4      = []

    this.init()
  }

  get toJson() {
    return {
      lastTicket: this.lastTicket,
      today: this.today,
      tickets : this.tickets,
      last4: this.last4
    }
  }

  init() {
    // Often when we have require a date or info, we do a fetch or http require
    // but in this case we can do only a ease require
    const {today, lastTicket, tickets, last4} = require('../db/data.json')

    // If today is same
    if (today === this.today) {
      this.tickets = tickets,
      this.lastTicket = lastTicket,
      this.last4 = last4
    } else {
      // If is other day
      this.saveDB()
    }

  }

  saveDB() {
    
    const dbPath = path.join(__dirname, '../db/data.json')

    fs.writeFileSync(dbPath, JSON.stringify(this.toJson))
  }

  // To go to the next ticket
  next() {
    this.lastTicket += 1;
    const ticket = new Ticket(this.lastTicket, null)
    // add to all tickets
    this.tickets.push(ticket)

    // save in the database ../db/data.json 
    this.saveDB()
    // return a mesagge to success
    return 'Ticket ' + ticket.number
  }

  serveTicket(desktop) {
    // If we don't have a ticket
    if (this.tickets.length === 0 ) {
      return null
    }

    // But if we have a ticket, we need to know what number it is
    // shift() remove a first element in the array and return that
    const ticket = this.tickets.shift()
    
    ticket.desktop = desktop

    // unshift() add a element to the array, but in first position
    this.last4.unshift(ticket)

    // Only show 4 tickets
    if (this.last4.length > 4) {
      this.last4.splice(-1, 1)
    }

    this.saveDB()

    return ticket;
  }

}

module.exports = TicketControl