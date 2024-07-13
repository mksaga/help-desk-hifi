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
    let hydratedTicket: Ticket = {
      id: ticket.id,
      created_at: ticket.created_at,
      user_id: ticket.user_id,
      status: ticket.status,
      comments: [],
      user_name: "",
      user_email: "",
    }

    // Fill in user details, if present
    let userData = await ReadUser(ticket.user_id)
    if (userData != null && userData.length > 0) {
      hydratedTicket.user_name = userData[0].name ?? "Zeynep";
      hydratedTicket.user_email = userData[0].email ?? "hello@apple.com";
    }

    hydratedTickets.push(hydratedTicket)
    }

  return hydratedTickets
}

export { HydrateTickets }
