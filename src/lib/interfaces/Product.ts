export default interface Product {
   id?: number | string
   category: string
   title: string
   isLowCarb: boolean
   price: number
   promoPrice: number   
   weight: number
   measure: 'g' | 'ml'
   created?: Date | string
}