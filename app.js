let express     = require( "express" );
let app         = express();
let bodyParser  = require( "body-parser" );
let mongoose    = require ("mongoose");

mongoose.connect( "mongodb://localhost:27017/star_camp", {useNewUrlParser: true} );
app.use(bodyParser.urlencoded({extended: true}));
app.set( "view engine", "ejs" );

//Schema setup
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    });

let Campground = mongoose.model( "Campground", campgroundSchema );

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


app.get( "/", function ( req, res ) {
    res.render("landing");
} );

//INDEX route
app.get( "/campgrounds", function ( req, res ) {
    Campground.find({}, function ( err, allCampgrounds ) {
        if(err) {
            console.log(err);
        } else {
            res.render( "index", {campgrounds: allCampgrounds} );
        }
    });
} );

//NEW route
app.get( "/campgrounds/new",function (req, res) {
    res.render( "new" );
} );


// CREATE route
app.post( "/campgrounds", function ( req, res ) {
    //get data from form & add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {name: name, image: image};
    //create a new campground & save to DB
    Campground.create(newCampground, function ( err, newlyCampground ) {
        if(err){
            console.log(err);
        }else {
            res.redirect("/campgrounds");
        }
    });
} );

//Show template
app.get("/campgrounds/:id", function ( req, res ) {
    res.render("show");
});

app.listen(3000, process.env.IP, function (  ) {
    console.log("star-camp has started!")
});