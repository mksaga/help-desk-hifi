import 'bulma/css/bulma.css';

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

  return (
    <main className="container p-6 is-flex is-flex-direction-column is-justify-content-space-between is-align-items-center">
      <div>
        <h2 className="is-size-2">Ticket Detail View</h2>
      </div>
    </main>
  )
}
