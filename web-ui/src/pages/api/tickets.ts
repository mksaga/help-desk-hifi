import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Greetings from /api/tickets")
  if (req.method == "POST") {
    console.log("BODYBODY: \n", req.body)
    // const formData = new FormData(req.body);
    // console.log("FormData: ", formData)
    // const plainFormData = Object.fromEntries(formData.entries())
    // res.status(200).json(req.body)
    let fetchRsp = await fetch(`${process.env.API_BASE_URL}/create-ticket`, {
      // headers: {
      //   "Content-Type": "application/json",
      // },
      method: 'POST',
      body: req.body,
    });
    const data = await fetchRsp;
    console.log(data);
    // return data.json();
    // Handle creating a ticket
    // console.log("Pathname: ", req.pathname);
    // res.status(200).json({ "message": `Hello post! from ${req.pathname}` })
  }
  if (req.method == "GET") {
    console.log("Pathname: ", req.pathname);
    // Handle listing all tickets, or detail page for a single ticket
    //
    res.status(200).json({ "message": `Salutations from ${req.pathname}` })
  }
}
