/**
 * WhatsApp number in international format, digits only (for example '994501234567').
 * While it is empty, the buttons open WhatsApp's share sheet with the message filled in.
 */
export const WHATSAPP_NUMBER = ''

export const INSTAGRAM_HANDLE = 'arzualmazzadeh'
export const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`

export function whatsappUrl(text: string) {
  const base = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : 'https://wa.me/'
  return `${base}?text=${encodeURIComponent(text)}`
}
