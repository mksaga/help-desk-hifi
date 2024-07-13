import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + za TypeScript Server');
});

app.use('/tickets', require('./tickets/router'));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
})
