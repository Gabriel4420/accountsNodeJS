import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'

import { getAccount } from '../../getters/index.mjs'
import { operation } from '../../operation/index.mjs'
import { checkAccount } from '../../checkAccount/index.mjs'
//todo: add an amount to user account
export const addAmount = (accName, amount) => {
  const accData = getAccount(accName)
  if (!amount) {
    console.log(chalk.red('Ocorreu um erro, tente novamente mais tarde'))
    return deposit()
  }

  accData.balance = parseFloat(amount) + parseFloat(accData.balance)

  fs.writeFileSync(`accounts/${accName}.json`, JSON.stringify(accData), (err) =>
    console.log(err),
  )

  console.log(
    chalk.green(
      `Foi depositado o valor de R$ ${amount} na sua conta ${accName} !!`,
    ),
  )
}

export const deposit = () => {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da conta ?',
      },
    ])
    .then((answer) => {
      const accName = answer['accountName']

      //Verify Existence of account
      if (!checkAccount(accName)) {
        return deposit()
      } else {
        inquirer
          .prompt([
            {
              name: 'amount',
              message: ' Quanto você deseja depositar?',
            },
          ])
          .then((answer) => {
            let { amount } = answer

            //add an amount
            addAmount(accName, amount)
            operation()
          })
          .catch((err) => console.log(err))
      }
    })
    .catch((err) => console.log(err))
}
