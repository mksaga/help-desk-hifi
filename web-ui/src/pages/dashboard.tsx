import 'bulma/css/bulma.css';

import { useState, useEffect, FormEvent } from 'react'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'

export default function Home() {

  let [tickets, setTickets] = useState([])

  useEffect( () => {
  async function fetchTickets() {
    const response = await fetch(`/api/tickets`, {
      method: 'GET',
    })
    
    const data = await response.json()
    setTickets(data)
  }
    fetchTickets()
    }, [])

  const { pathname } = useRouter();
  console.log(pathname);

  return (
    <main className="container p-6 is-flex is-flex-direction-column is-justify-content-space-between is-align-items-center">
      <div>
        <h2 className="is-size-2">All Tickets</h2>
      </div>
      <div>
        <table className="table is-striped">
          <thead>
            <tr>
              <th>Status</th>
              <th>Name</th>
              <th>Email</th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((content, index) => (
              TicketRow(content)
            ))} 
          </tbody>
        </table>
      </div>
    </main>
  )
}


function TicketRow(content, index) {
  return (
    <tr key={`ticket-${content.id}`}>
      <td><TicketStatusTag ticket={content} /></td>
      <td>{content.user_name}</td>
      <td>{content.user_email}</td>
      <td style={{maxWidth: 250}}>{content.description}</td>
      <td><TicketDetailsLink ticket={content} /></td>
    </tr>
  )
}

export function TicketStatusTag(props) {
  return (
    <span className={`tag is-${mapTicketStatusToTag(props.ticket.status)}`}>
      {props.ticket.status}
    </span>
  )
}

function TicketDetailsLink({ ticket }) {
  return (
    <a href={`/ticket/${ticket.id}`}>
    <span className={`tag is-link`}>
      Details
    </span>
    </a>
  )
}

export function mapTicketStatusToTag(ticketStatus) {
  switch (ticketStatus) {
    case "new":
      return "info"
    case "resolved":
      return "success"
    case "in-progress":
      return "warning"
  }
}
