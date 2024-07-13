import { 
  ListTickets as SupabaseListTickets,
  ReadUser as SupabaseReadUser,
  CreateTicket as SupabaseCreateTicket
} from "../supabase"

import { Ticket } from './types'

async function ListTickets() {
  return await SupabaseListTickets()
}

async function ReadUser(userID: string) {
  return await SupabaseReadUser(userID)
}

async function CreateTicket(ticket: Ticket) {
  return await SupabaseCreateTicket(ticket)
}


export { ListTickets, CreateTicket, ReadUser };
