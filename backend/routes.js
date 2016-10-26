const routes = function(app) {
  app.get('/test',function (req, res) {
    res.send('hello your routes work')
  })
  app.get('/summonerName/:summonerId', function (req, res) {
    var summonerId = req.params.summonerId;
    app.mongoose.user.find({
      id: summonerId
    })
    .exec()
    .then(function (user) {
      console.log(user)
      if(!user.length){
        new app.mongoose.user({
          id: summonerId,
          name: 'hello',
          summonerId: summonerId,
          test: 'hello'
        })
        .save()
        .then(function (savedUser) {
          res.json({
            savedUser: savedUser
          })
        })
      }
    })
      //res.send(summonerId)
  })
}

module.exports = routes;
