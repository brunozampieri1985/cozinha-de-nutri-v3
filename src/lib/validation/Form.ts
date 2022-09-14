const validateForm = {
   name: (name: string | undefined) => {
      if (name?.length === 0 || name === undefined) return null
      if (name.length > 5) return true
      return false
   },
   email: (email: string | undefined) => {
      if (email === undefined) return null
      const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return emailRegex.test(email)
   },
   phone: (phone: string | undefined) => {
      if (phone === undefined) return null
      const parsed = parseInt(phone)
      if (isNaN(parsed)) return false
      if (parsed.toString().length < 10) return false
      return true
   }
}

export default validateForm