

export default async function SendMessage(name: string, email: string, phone: string, message: string) {
   const body = {
    name,
    email,
    phone,
    message
   }
    const response = await fetch('/api/send-message', {
      method: 'POST',
      body: JSON.stringify(body)
   })
   const data = await response.json()
   const { status, message: msg } = data   
   return { status, message: msg }
}