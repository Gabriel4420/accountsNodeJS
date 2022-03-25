import fs from 'fs'
import chalk from 'chalk'

export const checkAccount = (accName) => {
  if (!fs.existsSync(`accounts/${accName}.json`)) {
    console.log(chalk.yellow(`${accName} não existe, escolha outro nome`))
    return false
  }
  return true
}
