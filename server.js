var session = require('express-session')

var Discogs = require('disconnect').Client

var express = require('express');
var app = express();
var port = 3000


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.get('/authorize', function(req, res){
    var oAuth = new Discogs().oauth();
    oAuth.getRequestToken(
        `${process.env.CONSUMER_KEY}`, 
        `${process.env.CONSUMER_SECRET}`, 
        `${process.env.DOMAIN}/callback`, 
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

app.use(express.static('public'));

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

  var col = dis.user().collection();
  col.getReleases(`${user}`, 0, {page: 1, per_page: 50}, function(err, data) {
    res.setHeader('Content-Type', 'application/json');
    res.json(data);
  });
});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
