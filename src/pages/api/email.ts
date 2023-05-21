//@delete:file
import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../lib/prisma';

export default async function email(req: NextApiRequest, res: NextApiResponse) {
  const created = await prisma.post.create({ data: { title: 'test' } });

  res.status(200).json(created);
}
