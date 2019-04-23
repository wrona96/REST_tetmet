//Import prepared secure app
const app = require('./secure')
const mongoose = require('mongoose');

const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};

mongoose.connect(process.env.DB || 'mongodb://localhost/tetmet',options).then(
  () => {   console.error('DB Connected');},
  err => {  console.error('DB not Connected'); }
);

//Set Routers
const index = require('./routes/index')
const api = require('./routes/api')
app.use('/', index)
app.use('/api', api)

//Error 404 handling
app.use((req, res) => {
   res.status(404).render('404', {title: '404: Page Not Found'});
});

//Error 500 handling
app.use((error, req, res, next) => {
   res.status(500).render('500', {title:'500: Internal Server Error', error: error});
});


module.exports = app
