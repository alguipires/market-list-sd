// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { List } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";

type RqError = {
  error: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<List | RqError>
) {
  if (req.method === "POST") {
    try {
      // console.log(req.query);
      // console.log(req.headers);
      // console.log(req.body);

      const { userId, title, product_array } = req.body;

      console.log(userId, title, product_array);

      if (!product_array) throw new Error("product_array is not present!");

      const createdList = await prisma.list.create({
        data: {
          userId: userId,
          title: title,
          produtos_array: product_array,   
        },
      });

      res.status(201).json(createdList);
    } catch (err) {
      res.status(500).json({ error: "internal server error" });
    }
  } else {
    res.status(400).json({ error: "bad request" });
  }
}
