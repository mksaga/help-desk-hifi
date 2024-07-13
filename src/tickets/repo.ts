import { 
  ListTickets as SupabaseListTickets,
  ReadUser as SupabaseReadUser
} from "../supabase"

async function ListTickets() {
  return await SupabaseListTickets()
}

async function ReadUser(userID: string) {
  return await SupabaseReadUser(userID)
}


export { ListTickets, ReadUser };
