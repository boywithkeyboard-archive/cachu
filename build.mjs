import fse from 'fs-extra'
import fs from 'fs'
import { minify } from 'terser'
import chalk from 'chalk'

const timer = process.hrtime()

try {
  fse.copySync('src', 'dist')

  const cjsFiles = fs.readdirSync('./dist/cjs')
  const mjsFiles = fs.readdirSync('./dist/mjs')

  cjsFiles.map(async file => {
    const minified = await minify(fs.readFileSync(`./src/cjs/${file}`, 'utf8'), { module: false })
  
    fs.writeFile(`./dist/cjs/${file}`, minified.code, err => {
      if (err) throw err
    })
  })

  mjsFiles.map(async file => {
    const minified = await minify(fs.readFileSync(`./src/mjs/${file}`, 'utf8'), { module: false })
  
    fs.writeFile(`./dist/mjs/${file}`, minified.code, err => {
      if (err) throw err
    })
  })
} catch (err) {
  throw err
}

console.log(chalk.greenBright.bold('BUILD COMPLETE!') + chalk.blackBright(` Successfully built the package within ${chalk.yellowBright.bold(((process.hrtime(timer)[0] + (process.hrtime(timer)[1] / 1e9)).toFixed(3)) + ' seconds')}.`))