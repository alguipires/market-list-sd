// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | null>
) {
  if  (req.method === "POST"){
    res.status(200).json({ name: 'John Doe' });
  }else{
  res.status(400).json(null);}
}
