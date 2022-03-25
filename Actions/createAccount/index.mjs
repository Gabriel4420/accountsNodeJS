import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'

import { operation } from '../../operation'

export const createAccount = () => {
  console.log(chalk.green.bold('Parabéns por escolher nosso banco '))
  console.log(chalk.white('Defina as opções da sua conta a seguir'))
}

export const buildAccount = () => {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Digite um nome para sua conta: ',
      },
    ])
    .then((answer) => {
      const { accountName } = answer

      !fs.existsSync('accounts') && fs.mkdirSync('accounts')

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black.bold(
            `${accountName} você ja está registrado em nosso sistema, 
            aproveite para fazer um depósito, ou sacar seu 
            `,
          ),
        )
        operation()
        return
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance":0}',
        (err) => {
          console.log(err)
        },
      )
      console.log(
        chalk.green(`Parabéns ${accountName}, a sua conta foi criada `),
      )
      operation()
    })
    .catch((err) => console.log(err))
}
