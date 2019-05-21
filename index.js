const express = require('express')
const app = express()
// const port = process.env.PORT || 3013
var port = process.env.PORT || 3013;
const version = '/api/v1/'
var logger = require('morgan')
var fs = require('fs')
var bodyParser = require('body-parser');
var moment = require('moment')


var mm = moment()
var date = mm.utc().format('DD-MM-YYYY')
var time = mm.utc().format('HH: mm: ss')



app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));
app.use(bodyParser.json({
  limit: '50mb'
}));


app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization, X-Access-Token')
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Pass to next layer of middleware
  next()
});

app.use(logger('dev'))
var accessLogStream = fs.createWriteStream(`${__dirname}/logs/${date}.log`, {
  flags: 'a'
})
var configlog = `[${time}] [ip]: :remote-addr :remote-user [method]: :method [url]: :url HTTP/:http-version [status]: :status [response-time]: :response-time ms [client]: :user-agent`
app.use(logger(configlog, {
  stream: accessLogStream
}))


var user = require('./routes/user')
var manufacture = require('./routes/manufacture')
var logistic = require('./routes/logistic')
var farmer = require('./routes/farmer')
var member = require('./routes/member')
var area = require('./routes/area')
var factor = require('./routes/factor')
var harvest = require('./routes/harvest')
var admin = require('./routes/admin')
var se = require('./routes/se')
var calculate = require('./routes/calculate')
var product = require('./routes/product')
var plan = require('./routes/plan')
var researcher = require('./routes/researcher')
var order = require('./routes/orderproduct')
var graph = require('./routes/graph')
var send_analytics = require('./routes/send_analytics')


app.use(version + 'user', user)
app.use(version + 'manufacture', manufacture)
app.use(version + 'logistic', logistic)
app.use(version + 'farmer', farmer)
app.use(version + 'member', member)
app.use(version + 'area', area)
app.use(version + 'factor', factor)
app.use(version + 'harvest', harvest)
app.use(version + 'admin', admin)
app.use(version + 'se', se)
app.use(version + 'calculate', calculate)
app.use(version + 'product', product)
app.use(version + 'plan', plan)
app.use(version + 'researcher', researcher)
app.use(version + 'orderproduct', order)
app.use(version + 'graph', graph)
app.use(version + 'send_analytics', send_analytics)
//send_analytic


var server = app.listen(port, function () {
  console.log('Server is running port: ' + port);
}); 