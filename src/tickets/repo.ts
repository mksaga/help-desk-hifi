import { ListTickets as SupabaseListTickets } from "../supabase"

async function ListTickets() {
  return await SupabaseListTickets()
}


export { ListTickets };
