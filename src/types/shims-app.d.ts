declare module 'moment/locale/*' {
  import { LocaleSpecification } from 'moment'
  const locale: LocaleSpecification & { readonly [key: string]: string }
  export default locale
}
