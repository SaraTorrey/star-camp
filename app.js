let  express = require( "express" );
     app = express();
     bodyParser = require( "body-parser" );
     mongoose = require( "mongoose" );
     Campground = require ("./models/campground");
     Comment = require ("./models/comment");
     seedDB = require ("./seeds");



mongoose.connect( "mongodb://localhost:27017/star_camp", {useNewUrlParser: true} );
app.use( bodyParser.urlencoded( {extended: true} ) );
app.set( "view engine", "ejs" );
app.use(express.static(__dirname + "/public"));
seedDB();

app.get( "/", function ( req, res ) {
    res.render( "landing" );
} );

// //INDEX route
app.get( "/campgrounds", function ( req, res ) {
    Campground.find( {}, function ( err, allCampgrounds ) {
        if ( err ) {
            console.log( err );
        }
        else {
            res.render( "campgrounds/index", {campgrounds: allCampgrounds} );
        }
    } );
} );

//NEW route
app.get( "/campgrounds/new", function ( req, res ) {
    res.render( "campgrounds/new" );
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
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log("Found campground");
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//***********************
// Comments Routs
//***********************

app.get("/campgrounds/:id/comments/new", function (req, res) {

    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function (req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campground");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
    //create new comment

    //connect mew comment to campground
    //redirect campground to show page
});

app.listen( 3000, process.env.IP, function () {
    console.log( "star-camp has started!" );
} );