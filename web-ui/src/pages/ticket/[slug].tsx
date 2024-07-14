import 'bulma/css/bulma.css';
import { FormEvent } from 'react'
const axios = require("axios");

import { TicketStatusTag } from "../dashboard"

export default function Home() {

  async function fetchTickets() {
    const response = await fetch(`/api/tickets`, {
      method: 'GET',
    })
    
    const data = await response.json()
    console.log("RESPONSEDATA: ", data)
  }

  let ticket = {
      "id":"557afb00-6d5d-4a38-bcf6-2007d22264d2",
      "created_at":"2024-07-13T01:52:26.876637+00:00",
      "status":"new",
      "comments": [],
      "description":"How can I send money from USD to YEN? Do you offer an on-ramp in Japan yet? Please let me know",
      "user_name":"Happy Customer",
      "user_email":"hello@apple.com"
    }

  return (
    <div>
    <main className="container p-6 is-flex is-flex-direction-column is-justify-content-space-between is-align-items-center">
      <div className="is-flex-direction-column is-align-items-center">
        <h5 className="is-size-5 has-text-centered"><a href="/dashboard">← back to dashboard</a></h5>
        <h2 className="is-size-2">Ticket Detail View</h2>
      </div>
      <div>
        <table className="table" style={{maxWidth: 400}}>
          <thead>
            <tr>
              <td><b>name</b></td>
              <td><b>email</b></td>
              <td><b>status</b></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ticket.user_name}</td>
              <td>{ticket.user_email}</td>
              <td><TicketStatusTag ticket={ticket} /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    <div className="is-flex is-flex-direction-column">
      <section className="mx-auto mb-5" style={{maxWidth: 400}} >
        <div>
          <h3 className="is-size-4">Description</h3>
        </div>
          <p>{ticket.description}</p>
      </section>
      <section className="mx-auto mb-5" style={{maxWidth: 400}} >
          <div>
            <h3 className="is-size-4 has-text-centered">Update Status</h3>
          </div>
        <form onSubmit={updateStatus} className="form is-flex is-align-items-center is-justify-content-center">
          <div className="select">
            <select className="select" name="status">
                <option value="resolved">Resolved</option>
                <option value="done">Done</option>
            </select>
          </div> 
          <button className="button is-primary ml-2" type="submit">Submit</button>
        </form>
      </section>
      <section className="mx-auto" style={{maxWidth: 400}} >
          <div>
            <h3 className="is-size-3">Add Comment</h3>
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
    console.log(formDataJsonString)

    const response = await fetch(`/api/ticket`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: formDataJsonString,
    })
    const data = await response.json()
    console.log("RESPONSEDATA: ", data)
  }

async function updateStatus(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
    const plainFormData = Object.fromEntries(formData.entries());
    plainFormData["id"] = ticket.id;
    const formDataJsonString = JSON.stringify(plainFormData);
    console.log("UpdateStatus: ", plainFormData)

    axios({
      method: "put",
      url: "/api/ticket",
      data: plainFormData,
    })

    // const response = await fetch(`/api/ticket`, {
    //   method: 'PUT',
    //   headers: {
    //     "Content-Type": "application/x-www-form-url-encoded",
    //   },
    //   body: formDataJsonString,
    // })
    // const data = await response.json()
    // console.log("RESPONSEDATA: ", data)
  }

}


