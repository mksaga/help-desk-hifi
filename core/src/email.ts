import { Ticket } from "./tickets/types"

/* EmailUser notifies the user of an update to their ticket
  */
function EmailUser(fromEmail: string, ticket: Ticket) {
  const message = `
  From: ${fromEmail}
  To: ${ticket.user_email}
  
  Subject: Update to your ticket

  Hello,
  Your ticket \"${ticket.id}\" has been marked as ${ticket.status}.
  Comments from the admin: <fill in comments>.
  `
  console.log(message)
  return
}

export { EmailUser };

