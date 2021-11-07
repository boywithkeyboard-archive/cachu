import fs from 'fs'
import { minify } from 'terser'
import glob from 'glob'

glob('./build' + '/**/*', (err, files) => {
  if (err) throw err

  files = files.filter(file => file.endsWith('.js'))

  files.forEach(async file => {
    const result = await minify(fs.readFileSync(file, 'utf8'))
  
    fs.writeFileSync(file, result.code, 'utf-8', (err) => {
      if (err) throw err
    })
  })
})