
const nodeenvironment = process.env.NODE_ENV || "development"

if (nodeenvironment === "development") {
  require('dotenv').config()
}

module.exports = {
  uri: `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}`

  // uri: `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}`
};


