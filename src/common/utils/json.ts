export const isJSON = (arg: any) => {
   try {
      return !!JSON.parse(arg)
   } catch (error) {
      return false
   }
}

export const parseJSON = (arg: string | null) => {
   return isJSON(arg) ? JSON.parse(arg) : null
}
