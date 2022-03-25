import fs from 'fs'
import inquirer from 'inquirer'
import chalk from 'chalk'

import { operation } from '../operation/index.mjs'
import { checkAccount } from '../checkAccount/index.mjs'
export const getAccount = (accName) => {
  const accJson = fs.readFileSync(`accounts/${accName}.json`, {
    encoding: 'utf8',
    flag: 'r',
  })

  return JSON.parse(accJson)
}

export const getAccountBalance = () => {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da conta que deseja consultar o saldo ?',
      },
    ])
    .then((answer) => {
      const { accountName } = answer

      !checkAccount(accountName) && getAccountBalance()

      const { balance } = getAccount(accountName)

      console.log(
        chalk.blue(`Olá ${accountName}, o saldo da sua conta é R$ ${balance}`),
      )

      operation()
    })
    .catch((err) => console.log(err))
}
