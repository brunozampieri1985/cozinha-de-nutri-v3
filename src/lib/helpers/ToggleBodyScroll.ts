export default function ToggleBodySroll(active: boolean) {
   if (window !== undefined) {
      const body = document.querySelector('body')
      if (active) {
         if (body) body.style.overflow = 'hidden'
      } else {
         if (body) body.style.overflow = 'auto'
      }
   }
}