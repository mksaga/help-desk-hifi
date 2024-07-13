import { ReadUser } from "./repo";
import { Tables } from '../supabase_types'

interface Comment {
  created_at: string
  text: string
  // author_id: string
}

interface Ticket {
  id: string
  created_at: string
  user_id: string
  user_name: string
  user_email: string
  status: string
  comments: Comment[]
}

async function HydrateTickets(rawTickets: Tables<'tickets'>[] | null): Promise<Ticket[] | undefined> {
  let hydratedTickets: Ticket[] = []
  if (rawTickets == null) {
    return hydratedTickets
  }

  for (const ticket of rawTickets) {
    let userData = await ReadUser(ticket.user_id)
    console.log(userData)
    let hydratedTicket: Ticket = {
      id: ticket.id,
      created_at: ticket.created_at,
      user_id: ticket.user_id,
      status: ticket.status,
      comments: [],
      user_name: "Zeynep",
      user_email: "hello@apple.com",
    }
    if (userData != null) {
      hydratedTicket.user_name = userData[0].name ?? "Zeynep";
      hydratedTicket.user_email = userData[0].email ?? "hello@apple.com";
      }

    hydratedTickets.push(hydratedTicket)
    }

  console.log("HYDRATED: ", hydratedTickets)
  return hydratedTickets
}

export { HydrateTickets }
