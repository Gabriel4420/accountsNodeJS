import inquirer from 'inquirer'
import chalk from 'chalk'

import { createAccount, buildAccount } from '../actions/createAccount/index.mjs'
import { getAccountBalance } from '../getters/index.mjs'
import { deposit } from '../actions/deposit/index.mjs'
import { withdraw } from '../actions/withdraw/index.mjs'
import { transfer } from '../actions/transfer/index.mjs'

export const operation = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer ?',
        choices: [
          'Criar Conta',
          'Consultar Saldo',
          'Depositar',
          'Sacar',
          'Transferir',
          'Sair',
        ],
      },
    ])
    .then((answer) => {
      const action = answer['action']
      switch (action) {
        case 'Criar Conta':
          createAccount()
          buildAccount()
          break
        case 'Depositar':
          deposit()
          break
        case 'Consultar Saldo':
          getAccountBalance()
          break
        case 'Sacar':
          withdraw()
          break
        case 'Transferir':
          transfer()
          break
        case 'Sair':
          console.log(chalk.bgBlue.black('Obrigado por usar o accounts'))
          process.exit()
          break
        default:
          break
      }
    })
    .catch((err) => console.log(err))
}
