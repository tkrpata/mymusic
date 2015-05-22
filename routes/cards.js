var express = require('express');
var router = express.Router();

/* list cards */
router.get('/cardlist', function(req, res) {
    var db = req.db;
    db.collection('cardinfo').find().toArray(function (err, items) {
        res.json(items);
    });
});

/* get single */ 
router.get('/getcard/:id', function(req, res) {
  var db = req.db;
  var cardid = req.params.id.toUpperCase();
  db.collection('cardinfo').find({ id : cardid }).toArray(function (err, items) {
    res.json(items);
  });
});

/* add a card */
router.put('/updatecard', function(req, res) {
  var db = req.db;
  req.body.id = req.body.id.toUpperCase();  
  console.log(req.body);
  db.collection('cardinfo').update({id: req.body.id}, req.body, {upsert:true}, function(err, result){
    res.send(
      (err === null) ? { msg: ''} : { msg: err }
    );
  });
});

module.exports = router;
