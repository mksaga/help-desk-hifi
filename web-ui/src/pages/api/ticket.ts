
import type { NextApiRequest, NextApiResponse } from "next"
const axios = require("axios");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method == "PUT") {
    axios({
      method: "put",
      mode: 'no-cors',
      url: `${process.env.API_BASE_URL}/tickets/${req.body.id}`,
      data: req.body,
    })

    res.status(200).json(req.body)
  }
  if (req.method == "GET") {
    let res = axios({
      method: "get",
      mode: 'no-cors',
      url: `${process.env.API_BASE_URL}/tickets/${req.body.id}`,
    })
    console.log(res)
  }
}
