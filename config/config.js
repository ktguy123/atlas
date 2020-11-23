module.exports = {
  'secret': process.env.SECRET_KEY, //jwt key
  'database': (process.env.MONGO_URI || "mongodb://localhost:27017/atlas")
}