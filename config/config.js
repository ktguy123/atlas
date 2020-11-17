module.exports = {
  'secret': 'oauthServerSampleSecret', //jwt key
  'database': (process.env.MONGO_URI || "mongodb://localhost:27017/atlas")
}