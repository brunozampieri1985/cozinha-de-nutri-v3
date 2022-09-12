import Buyer from '@interfaces/Buyer'

const LocalBuyer = {
   save: (buyer: Buyer) => {
      localStorage.removeItem('buyer')
      localStorage.setItem('buyer', JSON.stringify(buyer))
   },
   get: () => {
      const buyer = localStorage.getItem('buyer')
      if (buyer) return JSON.parse(buyer) as Buyer
      else return {} as Buyer
   },
   clear: () => {
      localStorage.removeItem('buyer')
   },
}

export default LocalBuyer
