import { Tables } from '../supabase_types'

interface Comment {
  created_at: string
  text: string
  // author_id: string
}

interface Ticket {
  id: string
  created_at: string
  user_name: string
  user_email: string
  status: string
  description: string
}

interface HydratedTicket {
  id: string
  created_at: string
  user_name: string
  user_email: string
  status: string
  description: string
  comments: Comment[]
}

/** HydrateTickets takes in a list of Tickets from the db
  * and enriches them with comments from the Comments table
  */
async function HydrateTickets(rawTickets: Ticket[] | null): Promise<HydratedTicket[] | undefined> {
  let hydratedTickets: HydratedTicket[] = []
  if (rawTickets == null) {
    return hydratedTickets
  }

  for (const ticket of rawTickets) {
    let hydratedTicket: HydratedTicket = {
      id: ticket.id,
      created_at: ticket.created_at,
      status: ticket.status,
      comments: [],
      description: ticket.description,
      user_name: ticket.user_name,
      user_email: ticket.user_email,
    }

    // TODO: hydrate comments
    hydratedTickets.push(hydratedTicket)
    }

  return hydratedTickets
}

export { HydrateTickets, Ticket }
