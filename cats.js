let mongoose = require( "mongoose" );
mongoose.set('useNewUrlParser', true);
mongoose.connect( "mongodb://localhost/cat_app", { useNewUrlParser: true });

let catSchema = new mongoose.Schema( {
     name: String,
     age: Number,
     temperament: String,
 } );

let Cat = mongoose( "Cat", catSchema );

let george = new Cat ({
    name: "George",
    age: 11,
    temperament: "Grouchy",
});

george.save(function ( err, cat ) {
   if(err){
       console.log("Wrong")
   } else {
       console.log("Save to cat DB");
       console.log(cat);
   }
});
