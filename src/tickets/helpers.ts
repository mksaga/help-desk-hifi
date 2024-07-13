
import { Request } from "express";
import { Ticket } from "./types"



function BuildTicket(req: Request): Ticket {
  return {
    "id": "",
    "created_at": "",
    "user_name": req.body.name,
    "user_email": req.body.email,
    "status": "new",
    "description": req.body.description,
  }
}

export { BuildTicket }
