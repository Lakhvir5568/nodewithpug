
      /*MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
var uname=req.body.username;
dbo.collection("users-data").findOne({name: uname}).then(function(uname){
            if(uname){
                console.log("user exsit")
            }else{

                var myobj = { name: req.body.username, email: req.body.email,password:req.body.pwd,address:req.body.address };
                dbo.collection("users-data").insertOne(myobj, function(err, res) {
                 if (err) throw err;
                console.log("User Saved")
                 db.close();
               });
            }
        })

      });
      res.redirect("/login")*/
      
var mongodb = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

exports.productSave = function(product,price, callback)
{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb1");
                var myobj = { product:product, price:price};
                dbo.collection("product-data").insertOne(myobj, function(err, res) {
                 if (err) throw err;
                console.log("Product Saved")
                 db.close();
        })

      });
}