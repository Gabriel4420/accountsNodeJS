import fs from 'fs'
import inquirer from 'inquirer'
import chalk from 'chalk'

import { operation } from '../../operation/index.mjs'
import { getAccount } from '../../getters/index.mjs'
import { checkAccount } from '../../checkAccount/index.mjs'

export const transfer = () => {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta ?',
      },
      {
        name: 'destinationAccont',
        message: 'Qual o nome da conta destino?',
      },
    ])
    .then((answer) => {
      const { accountName, destinationAccont } = answer

      if (!checkAccount(accountName) && !checkAccount(destinationAccont))
        transfer()

      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'Quanto você deseja transferir ?',
          },
        ])
        .then((answer) => {
          let { amount } = answer

          transferOperation(accountName, destinationAccont, amount)
        })
    })
}
export const transferOperation = (accName, accDestiny, amount) => {
  const accountData = getAccount(accName)

  if (!amount) {
    console.log(chalk.red(`Um erro ocorreu, tente novamente mais tarde`))
    return transfer()
  }
  if (accountData.balance < amount) {
    console.log(chalk.red('valor indisponivel'))
    return transfer()
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

  fs.writeFileSync(
    `accounts/${accName}.json`,
    JSON.stringify(accountData),
    (err) => console.log(err),
  )

  const accData = getAccount(accDestiny)
  if (!amount) {
    console.log(chalk.red('Ocorreu um erro, tente novamente mais tarde'))
    return deposit()
  }

  accData.balance = parseFloat(amount) + parseFloat(accData.balance)

  fs.writeFileSync(
    `accounts/${accDestiny}.json`,
    JSON.stringify(accData),
    (err) => console.log(err),
  )

  console.log(
    chalk.green(
      `Hey ${accName},você transferiu R$ ${amount} para ${accDestiny} !!`,
    ),
  )

  operation()
}
