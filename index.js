require('dotenv').config()

const server = require('./server')
const chalk = require('chalk')
const PORT = process.env.PORT
server.listen(PORT, () => {
  console.log(chalk.blue(`>> [Port ${PORT}] I'm listening...`))
}) 