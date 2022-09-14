import Order from '@interfaces/Order'
import SendMessageEmail  from '@services/SendMessageEmail'
import type { NextApiRequest, NextApiResponse } from 'next'

type SenderType = {
    name: string
    email: string
    phone: string
    message: string
}

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   if (req.method === 'POST') {
      const { body } = req
      const { email, message: msg, name, phone } = JSON.parse(body) as SenderType
      const confirmation = new SendMessageEmail(
        name,
        email,
        phone,
        msg
      )
      const { status, message } = await confirmation.send()      
      res.status(status).json({ status, message })
   } else {
    res.status(405).json({ status: 405, message: 'Method not allowed' })
   }
}