import 'bulma/css/bulma.css';

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'



export default function Home() {
  let [tickets, setTickets] = useState([])

  useEffect( () => {
  async function fetchTickets() {
    let apiURL = process.env.API_BASE_URL
    if (apiURL == null) {
      apiURL = "https://help-desk-hifi.onrender.com/"
    }
    console.log("API URL: ", apiURL)
    const response = await fetch(`/api/tickets`, {
      method: 'GET',
    })
    console.log("Response: ", response)
    
    const data = await response.json()
    setTickets(data)
  }
    fetchTickets()
    }, [])

  const { pathname } = useRouter();

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
            {tickets.map((content) => (
              TicketRow(content)
            ))} 
          </tbody>
        </table>
      </div>
    </main>
  )
}

function TicketRow(content) {
  return (
    <tr key={`ticket-${content.id}`}>
      <td><TicketStatusTag status={content.status} /></td>
      <td>{content.user_name}</td>
      <td>{content.user_email}</td>
      <td style={{maxWidth: 250}}>{content.description}</td>
      <td><TicketDetailsLink id={content.id} /></td>
    </tr>
  )
}

export function TicketStatusTag(props) {
  return (
    <span className={`tag is-${mapTicketStatusToTag(props.status)}`}>
      {props.status}
    </span>
  )
}

function TicketDetailsLink(props) {
  return (
        <span className={`tag is-link is-light`}>
        <a href={`/ticket/${props.id}`}>
            Details
        </a>
        </span>
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
