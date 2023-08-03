import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next';
const prisma = new PrismaClient()


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  console.log(id);
  try {
    const salon = await prisma.salons.findUnique({
      where: { id: String(id) },
    });

    if (!salon) {
      return res.status(404).json({ error: id + ' not found' });
    }

    res.json(salon);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}