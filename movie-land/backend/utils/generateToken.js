const jwt = require("jsonwebtoken")

const generateToken = (id) => {
  return jwt.sign({ id }, "yourrhfdb", {
    expiresIn: "30d",
  })
}

module.exports = { generateToken }
