import fse from 'fs-extra'
import fs from 'fs'
import { minify } from 'terser'
import chalk from 'chalk'

try {
  const timer = process.hrtime()

  fse.copySync('src', 'dist')

  const files = fs.readdirSync('./dist')

  files.map(async file => {
    const minified = await minify(fs.readFileSync(`./dist/${file}`, 'utf8'))
  
    fs.writeFile(`./dist/${file}`, minified.code, err => {
      if (err) throw err
    })
  })

  console.log(chalk.greenBright.bold('BUILD COMPLETE!') + chalk.blackBright(` Successfully built the package within ${chalk.yellowBright.bold(((process.hrtime(timer)[0] + (process.hrtime(timer)[1] / 1e9)).toFixed(3)) + ' seconds')}.`))
} catch (err) {
  throw err
}