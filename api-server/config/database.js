const mongoose = require('mongoose')

module.exports = {
  url: 'mongodb://onesh:password1@ds241570.mlab.com:41570/authbasedb',
  connection: mongoose.createConnection('mongodb://onesh:password1@ds241570.mlab.com:41570/authbasedb')
}
