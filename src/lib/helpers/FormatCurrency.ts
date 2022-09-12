export default function FormatCurrency(value: string | number) {
   let result: string | number
   try {
      result = new Intl.NumberFormat('pt-BR', {
         style: 'currency',
         currency: 'BRL',
      }).format(typeof value === 'string' ? parseFloat(value) : value)
   } catch {
      result = value
   }
   return result as string
}
