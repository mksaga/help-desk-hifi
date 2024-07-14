import 'bulma/css/bulma.css';

import { FormEvent } from 'react'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'

export default function Home() {

  async function fetchTickets() {
    const response = await fetch(`/api/tickets`, {
      method: 'GET',
    })
    
    const data = await response.json()
    console.log("RESPONSEDATA: ", data)
  }

  let tickets = [
    {
      "id":"557afb00-6d5d-4a38-bcf6-2007d22264d2",
      "created_at":"2024-07-13T01:52:26.876637+00:00",
      "status":"new",
      "comments":[],
      "description":"Help me out here",
      "user_name":"Happy Customer",
      "user_email":"hello@apple.com"
    },
    {
      "id":"d2449a02-aa89-49ae-99fe-961c63415e36",
      "created_at":"2024-07-12T22:05:53.674228+00:00",
      "status":"resolved",
      "comments":[],
      "description":"howdy",
      "user_name":"Happy Customer",
      "user_email":"dubat@apple.com"
    },
  ]

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
  console.log("building ticket")
  console.log(content)
  return (
    <tr key={`ticket-${content.id}`}>
      <td><span className={`tag is-${mapTicketStatusToTag(content.status)}`}>{content.status}</span></td>
      <td>{content.user_name}</td>
      <td>{content.user_email}</td>
      <td>{content.description}</td>
      <td><a href={`/ticket/${content.id}`}><span className="tag is-link">Details</span></a></td>
    </tr>
  )
}

function mapTicketStatusToTag(ticketStatus) {
  switch (ticketStatus) {
    case "new":
      return "info"
    case "resolved":
      return "success"
    case "in-progress":
      return "warning"
  }
}
