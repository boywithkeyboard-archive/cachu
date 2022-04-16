import { createDecipheriv } from 'crypto'

export default async (text: any, key: string) => {
  const textArray = text.split(':')
  , iv = Buffer.from(textArray.shift(), 'hex')
  , encryptedText = Buffer.from(textArray.join(':'), 'hex')
  , decipher = createDecipheriv('aes-256-cbc', Buffer.from(key), iv)
  , decryptedText = Buffer.concat([decipher.update(encryptedText), decipher.final()])
 
  return decryptedText.toString()
}