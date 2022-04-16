import { createCipheriv, randomBytes } from 'crypto'

export default async (text: string, key: string) => {
  const iv = randomBytes(16)
  , cipher = createCipheriv('aes-256-cbc', Buffer.from(key), iv)
  , encryptedText = Buffer.concat([cipher.update(text), cipher.final()])
 
  return `${iv.toString('hex')}:${encryptedText.toString('hex')}`
}