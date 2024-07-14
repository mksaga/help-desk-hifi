'use client'

import 'bulma/css/bulma.css';
import { FormEvent } from 'react'
const axios = require("axios");

import { useState, useEffect } from "react"

import { TicketStatusTag } from "../dashboard"
import { usePathname } from "next/navigation"

export default function Home() {

  const pathname = usePathname();
  let ticketID = ""

  let segments = [];
  if (pathname != null) {
    segments = pathname.split("/");
    ticketID = segments[2];
  }

  let [ticket, setTicket] = useState({})
  let [ticketStatus, setTicketStatus] = useState("")

  useEffect( () => {
    async function fetchTicket() {
      if (ticketID == "") {
        return 
      }
      const response = await fetch(`/api/ticket/${ticketID}`, {
        method: 'GET',
      })
      
      const data = await response.json()

      setTicket(data)
      setTicketStatus(data.status)
    }

    fetchTicket()
    }, [ticketID, ticketStatus])

  return (
    <div>
    <main className="container p-3 is-flex is-flex-direction-column is-justify-content-space-between is-align-items-center">
      <div className="is-flex-direction-column is-align-items-center">
        <h5 className="is-size-5 has-text-centered"><a href="/dashboard">← back to dashboard</a></h5>
        <h2 className="is-size-2 pb-3">Ticket Detail View</h2>
      </div>
      <div>
        <table className="table" >
          <thead>
            <tr>
              <td><b>status</b></td>
              <td><b>name</b></td>
              <td><b>email</b></td>
              <td><b>description</b></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><TicketStatusTag ticket={ticket} /></td>
              <td>{ticket.user_name}</td>
              <td>{ticket.user_email}</td>
              <td style={{maxWidth: 250}}>{ticket.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    {/* <div className="is-flex is-flex-direction-row mx-auto" style={{maxWidth: 500}}> */}
    <div className="is-flex is-flex-direction-column">
      <section className="mx-auto mb-5" style={{maxWidth: 400}} >
          <div>
            <h3 className="is-size-4 has-text-centered">Update Status</h3>
          </div>
        <form onSubmit={updateStatus} className="form is-flex is-align-items-center is-justify-content-center">
          <div className="select">
            <select className="select" name="status">
                <option value="in-progress">In Progress</option>
                <option value="resolved">Resolved</option>
            </select>
          </div> 
          <button className="button is-primary ml-2" type="submit">Submit</button>
        </form>
      </section>
      <section className="mx-auto" style={{maxWidth: 400}} >
          <div>
            <h3 className="is-size-4 has-text-centered">Add Comment</h3>
          </div>
          <form onSubmit={submitComment} className="form pt-2 is-flex is-flex-direction-column is-align-items-center">
            <div className="field">
              <div className="control">
              <textarea className="textarea" type="textarea" name="description" rows="4" />
              </div>
            </div> 
            <button className="button is-primary mt-2" type="submit">Submit</button>
          </form>
      </section>
      <div className="is-flex is-flex-direction-column">
      </div>
    </div>
  </div>
  )


async function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
    const plainFormData = Object.fromEntries(formData.entries());
    plainFormData["id"] = ticket.id;
    const formDataJsonString = JSON.stringify(plainFormData);

    let rsp = axios({
      method: "put",
      url: "/api/ticket",
      data: plainFormData,
    })
  }

async function updateStatus(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
    const plainFormData = Object.fromEntries(formData.entries());
    plainFormData["id"] = ticket.id;
    const formDataJsonString = JSON.stringify(plainFormData);

    let rsp = await axios({
      method: "put",
      url: "/api/ticket",
      data: plainFormData,
    })

    // Update local state
    ticket.status = rsp.data.status;
    setTicketStatus(ticket.status)
  }

}


