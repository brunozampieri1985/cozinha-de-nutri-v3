type DiscountType = {
   description: string
   range: number[]
   value: number
}

export default interface AppPreferences {
   showAlertAtStart: boolean
   discount: DiscountType[]
   delivery: number   
}