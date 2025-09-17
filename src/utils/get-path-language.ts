export const getPathLanguage = (pathname: string | null): string | undefined => {
  const language = pathname?.split('/')?.at(-2)

  switch (language) {
    case 'uz':

      return 'uz'

    case 'en':
      
      return 'en'
  
    default:

      return undefined
    
  }
};