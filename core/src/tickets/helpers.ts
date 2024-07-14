import { v4 as uuidv4} from "uuid";
import { Request } from "express";
import { Ticket } from "./types"

function BuildNewTicket(req: Request): Ticket {
  const nowTimestamp: Date = new Date();
  return {
    "id": uuidv4(),
    "created_at": nowTimestamp.toISOString(),
    "user_name": req.body.name,
    "user_email": req.body.email,
    "description": req.body.description,
    "status": "new"
  }
}

function BuildTicket(req: Request, existingTicket: Ticket): Ticket {
  return {
    "id": existingTicket.id,
    "created_at": existingTicket.created_at,
    "status": req.body.status,
    "user_name": existingTicket.user_name,
    "user_email": existingTicket.user_email,
    "description": existingTicket.description,
  }
}

export { BuildTicket, BuildNewTicket }
