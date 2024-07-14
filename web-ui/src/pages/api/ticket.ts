
import type { NextApiRequest, NextApiResponse } from "next"
const axios = require("axios");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Greetings from /api/ticket")
  if (req.method == "PUT") {
    axios({
      method: "put",
      url: `${process.env.API_BASE_URL}/tickets/${req.body.id}`,
      data: req.body,
    })

    res.status(200).json(req.body)
  }
  if (req.method == "GET") {
    let res = axios({
      method: "get",
      url: `${process.env.API_BASE_URL}/tickets/${req.body.id}`,
    })
    console.log(res)
  }
}
