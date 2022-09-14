// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Order from '@interfaces/Order'
import SendOrderConfirmationEmail from '@services/SendOrderConfirmationEmail'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   if (req.method === 'POST') {
      const { body } = req
      const order = JSON.parse(body) as Order
      const confirmation = new SendOrderConfirmationEmail(order)
      const { status, message } = await confirmation.send()      
      res.status(status).json({ status, message })
   } else {
    res.status(405).json({ status: 405, message: 'Method not allowed' })
   }
}
