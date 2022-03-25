import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs'

import { operation } from '../../operation/index.mjs'
import { getAccount } from '../../getters/index.mjs'
import { checkAccount } from '../../checkAccount/index.mjs'

export const removeAmount = (accName, amount) => {
  const accountData = getAccount(accName)

  if (!amount) {
    console.log(chalk.red(`Um erro ocorreu, tente novamente mais tarde`))
    return withdraw()
  }
  if (accountData.balance < amount) {
    console.log(chalk.red('valor indisponivel'))
    return withdraw()
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

  fs.writeFileSync(
    `accounts/${accName}.json`,
    JSON.stringify(accountData),
    (err) => console.log(err),
  )

  console.log(
    chalk.greenBright(
      `Hey ${accName}, foi realizado um saque no valor de R$${amount} da sua conta!`,
    ),
  )
  operation()
}
//todo: Withdraw an amount from user account

export const withdraw = () => {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta ?',
      },
    ])
    .then((answer) => {
      const { accountName } = answer

      !checkAccount(accountName) && withdraw()

      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'Quanto você deseja sacar ?',
          },
        ])
        .then((answer) => {
          let { amount } = answer

          removeAmount(accountName, amount)
        })
    })
}
