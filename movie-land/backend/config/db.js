const mongoose = require("mongoose")

mongoose.set("strictQuery", true)

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://localhost:27017"
    )

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

module.exports = { connectDB }
