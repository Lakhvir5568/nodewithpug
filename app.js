//including modules for save data
var S = require('./module/data');
var express = require('express');

var app = express();
var path = require('path');
//db connection 
var bodyParser = require('body-parser');

var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, 'public')));
//db connection 
app.set('view engine', 'pug');

	// router page linking
var editproduct = require('./routes/editproduct');
var additem = require('./routes/additem');
var deleteproduct = require('./routes/deleteproduct');

	// make views default directory and public directory for local routing for css and images and js
app.locals.basedir = path.join(__dirname, 'views');
app.use(express.static(path.join(__dirname+"public")));
app.use(express.static(path.join(__dirname, 'public')));

	// user click listner
app.use('/css', express.static('css'))
app.use('/additem', additem);


//saving data item
//save user data
app.post('/addData', function (req, res) {
      
    S.productSave(req.body['product'], req.body['price'], function(e, o){
        if (!o){
            res.status(400).send(e);
          
        }	else{
                     
        }
     });
     res.redirect("/additem")
});



//show all products are shown
app.get('/',function(req,res){

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb1");
        dbo.collection("product-data").find({}).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
          res.render('index',{items:result})
        });
      });
})
//editing of post
app.get('/editproduct',function(req,res){
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb1");
        var id=req.query.id;
        console.log(id)
        dbo.collection("product-data").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.render('pages/editproduct',{items:result})
          });
      });

})//show Delete  of product
app.get('/deleteproduct',function(req,res){
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb1");
        var id=req.query.id;
        console.log(id)
        dbo.collection("product-data").find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.render('pages/deleteproduct',{items:result})
          });
      });

})


//deleting product
app.get('/delete',function(req,res){
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb1");
        var id=req.query.id;
        
      dbo.collection('product-data', function(err, collection) {
         collection.deleteOne({_id: new mongodb.ObjectID(id)});
      });

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb1");
            dbo.collection("product-data").find({}).toArray(function(err, result) {
              if (err) throw err;
              console.log(result);
              db.close();
              res.render('pages/deleteproduct',{items:result})
            });
          });

})
})



    //editing of post
app.get('/edit_product',function(req,res){
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb1");
        var id=req.query.id;
        
        dbo.collection("product-data").find({ _id: new mongodb.ObjectId(id) }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.render('pages/edit_product',{items:result})
          });
      });

})
app.get('/update_product',function(req,res){
    
   MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb1");
  var myquery = { _id: req.body['id'] };
  var newvalues = { $set: {product: req.body['product'], price: req.body['price'] } };
  dbo.collection("product-data").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("product updated");
    db.close();
  });
});

MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb1");
        var id=req.body['id'];
        
        dbo.collection("product-data").find({ _id: new mongodb.ObjectId(id) }).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
            res.render('pages/edit_product',{items:result})
          });
      });
})
	// basic page load
/*app.get('/', (req, res) => {
  res.render('index');
});*/

	// port reserving
app.listen(3000, () => {
  console.log('Listening on port 3000...');
});