const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = require("express").Router()
const helper = require("../router/helper")

router.post("/register", (req, res) => {
  const credentials = req.body
  if (credentials.username && credentials.password) {
    const rounds = process.env.BCRYPT_ROUNDS || 8
    const hash = bcryptjs.hashSync(credentials.password, rounds)
    credentials.password = hash
    helper.addUser(credentials, 'users')
    .then(user => {
      const token = makeJwt(user)
      res.status(201).json({ data: user, token })
    })
    .catch(error => {
      res.status(401).json({ message: 'username already exists' })
    })
  } else if (!user) {
    res.status(400).json({
      message: "please provide username and password and the password shoud be alphanumeric",
    })
  } else {
    res.status(500).json({message: error.message})
  }
})
router.post("/login", (req, res) => {
  const { username, password } = req.body
  if (username && password) {
    helper.findBy({ username: username })
    .then(([user]) => {
      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = makeJwt(user)
        res.status(200).json({ token })
      } else {
        res.status(401).json({ message: "Invalid credentials" })
      }
    })
    .catch(error => {
      res.status(500).json({ message: error.message })
    })
  } else {
    res.status(400).json({
      message: "please provide username and password and the password shoud be alphanumeric",
    })
  }
})
function makeJwt({ id, username, role }) {
  const payload = {
    username,
    role,
    subject: id,
  }
  const config = {
    jwtSecret: process.env.JWT_SECRET || "is it secret, is it safe?",
  }
  const options = {
    expiresIn: "3 days",
  }
  return jwt.sign(payload, config.jwtSecret, options)
}
function isValid(user) {
  return Boolean(user.username && user.password && typeof user.password === "string")
}
module.exports = router