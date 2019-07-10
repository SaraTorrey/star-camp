let  express = require( "express" );
     app = express();
     bodyParser = require( "body-parser" );
     mongoose = require( "mongoose" );
     Campground = require ("./models/campground");
     Comment = require ("./models/comment");
     seedDB = require ("./seeds");


seedDB();
mongoose.connect( "mongodb://localhost:27017/star_camp", {useNewUrlParser: true} );
app.use( bodyParser.urlencoded( {extended: true} ) );
app.set( "view engine", "ejs" );

//Schema setup

// Campground.create(
//     {
//         name: "Livermore",
//         image: "https://lh6.googleusercontent.com/-EPrizzpTnkQ/XPL6OhurXoI/AAAAAAAANWM/oduFblpubfEjMbWUxLOR04pU-EGsCck_wCLIBGAYYCw/w100-h134-n-k-no/",
//         description: "This is a great campground, no bathroom, just pretty.",
//     },
//     function f(err, campground  ) {
//        if(err){
//            console.log(err);
//        } else {
//            console.log("Newly created campground");
//            console.log(campground);
//        }
//     });
//
app.get( "/", function ( req, res ) {
    res.render( "landing" );
} );
//
// //INDEX route
app.get( "/campgrounds", function ( req, res ) {
    Campground.find( {}, function ( err, allCampgrounds ) {
        if ( err ) {
            console.log( err );
        }
        else {
            res.render( "index", {campgrounds: allCampgrounds} );
        }
    } );
} );

// //NEW route
app.get( "/campgrounds/new", function ( req, res ) {
    res.render( "new" );
} );

// CREATE route - is a POST route
app.post( "/campgrounds", function ( req, res ) {
    //get data from form & add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let newCampground = {name: name, image: image, description: desc};
    //create a new campground & save to DB
    Campground.create( newCampground, function ( err, newlyCampground ) {
        if ( err ) {
            console.log( err );
        }
        else {
            res.redirect( "/campgrounds" );
        }
    } );
} );

//Show template
app.get( "/campgrounds/:id", function ( req, res ) {
    Campground.findById( req.params.id, function ( err, foundCampground ) {
        if ( err ) {
            console.log( err );
        }
        else {
            res.render( "show", {campground: foundCampground} );
        }
    } );
} );

app.listen( 3000, process.env.IP, function () {
    console.log( "star-camp has started!" );
} );