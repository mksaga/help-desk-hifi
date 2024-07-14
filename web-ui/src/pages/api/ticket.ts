
import type { NextApiRequest, NextApiResponse } from "next"
const axios = require("axios");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let apiURL = process.env.API_BASE_URL
  if (apiURL == null) {
    apiURL = "https://help-desk-hifi.onrender.com/"
  }
  if (req.method == "PUT") {
    axios({
      method: "put",
      mode: 'no-cors',
      url: `${apiURL}/tickets/${req.body.id}`,
      data: req.body,
    })

    res.status(200).json(req.body)
  }
  if (req.method == "GET") {
    let res = axios({
      method: "get",
      mode: 'no-cors',
      url: `${apiURL}/tickets/${req.body.id}`,
    })
    console.log(res)
  }
}
