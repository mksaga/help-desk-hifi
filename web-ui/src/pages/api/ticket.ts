
import type { NextApiRequest, NextApiResponse } from "next"
const axios = require("axios");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Greetings from /api/ticket")
  if (req.method == "PUT") {
    console.log("BODYBODY: \n", req.body)
    
    axios({
      method: "put",
      url: `${process.env.API_BASE_URL}/tickets/${req.body.id}`,
      data: req.body,
    })

    // let fetchRsp = await fetch(`${process.env.API_BASE_URL}/tickets/${req.body.id}`, {
    //   headers: {
    //     "Content-Type": "application/x-www-form-url-encoded",
    //   },
    //   method: 'PUT',
    //   body: req.body,
    // });
    // console.log("FetchRSP: ", fetchRsp)
    // console.log(await fetchRsp.json())

    res.status(200).json(req.body)
  }
}
