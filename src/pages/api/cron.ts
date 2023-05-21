//@delete:file
import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../lib/prisma';

export default async function cron(req: NextApiRequest, res: NextApiResponse) {
  const created = await prisma.post.create({ data: { title: 'cron' } });

  res.status(200).json(created);
}
