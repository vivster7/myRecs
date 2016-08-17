var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var session = require('express-session')


const Discogs = require('disconnect').Client

var app = new (require('express'))()
var port = 3000

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.get('/authorize', function(req, res){
    var oAuth = new Discogs().oauth();
    oAuth.getRequestToken(
        'QUDvTUcqPbvcwtRgkzSM', 
        'jSSHgpNsbCrQbWaaPThPsHjZNRqHcDfp', 
        'http://localhost:3000/callback', 
        function(err, requestData){
            req.session.requestData = requestData
            res.redirect(requestData.authorizeUrl);
        }
    );
});

app.get('/callback', function(req, res){
    var oAuth = new Discogs(req.session.requestData).oauth();
    oAuth.getAccessToken(
        req.query.oauth_verifier, // Verification code sent back by Discogs
        function(err, accessData){
            req.session.accessData = accessData
            res.header("Cache-Control", "no-cache, no-store, must-revalidate");
            res.redirect('/');
        }
    );
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
});

app.get('/records', function(req, res) {
  if (req.session.accessData) {
    var dis = new Discogs(req.session.accessData);

    if (!req.session.username) {
      dis.getIdentity(function(err, data){
        req.session.username = data.username;
      });
    }
  }

  var dis = dis || new Discogs();
  var user = req.session.username || 'blacklight';
  console.log('users:')
  console.log(user);
  console.log(req.session.username);
  console.log('end');

  var col = dis.user().collection();
  col.getReleases(`${user}`, 0, {page: 1, per_page: 50}, function(err, data) {
    res.setHeader('Content-Type', 'application/json');
    res.json(data);
  });
});

// app.use(function(req, res) {
//   res.sendFile(__dirname + '/index.html')
// })

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
