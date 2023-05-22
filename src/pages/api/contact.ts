import { NextApiRequest, NextApiResponse } from 'next';

import { object, string } from 'yup';

import prisma from '../../../lib/prisma';

type ContactDto = {
  name: string;
  email: string;
  message: string;
  phone: string;
};

const contactScheme = object({
  name: string().required(),
  email: string().email().required(),
  message: string().required(),
  phone: string().required(),
});

const isValidContactSchema = async (
  body: unknown,
  res: NextApiResponse,
): Promise<ContactDto> => {
  try {
    await contactScheme.validate(body);
    return body as ContactDto;
  } catch (err: any) {
    res.status(400).json({ error: err?.message });
    throw err;
  }
};

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Create a new contact
 *     description: Creates a new contact based on the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the contact.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the contact.
 *               message:
 *                 type: string
 *                 description: The message of the contact.
 *               phone:
 *                 type: string
 *                 description: The phone number of the contact.
 *             required:
 *               - name
 *               - email
 *               - message
 *               - phone
 *     responses:
 *        '200':
 *          description: Contact created successfully.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ContactDto'
 *        '400':
 *          description: Invalid request body.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 *     security: []
 */
export const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  isValidContactSchema(_req, res)
    .then((body) => {
      const created = prisma.contact.create({ data: body });
      res.status(200).json(created);
    })
    .catch((err) => {
      console.error(err);
    });
};
