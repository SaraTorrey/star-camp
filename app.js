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
    image: String
    });

let Campground = mongoose.model( "Campground", campgroundSchema );

app.get( "/", function ( req, res ) {
    res.render("landing");
} );

//INDEX route
app.get( "/campgrounds", function ( req, res ) {
    Campground.find({}, function ( err, allCampgrounds ) {
        if(err) {
            console.log(err);
        } else {
            res.render( "campgrounds", {campgrounds: allCampgrounds} );
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
    Campgounrd.create(newCampground, function ( err, newlyCampground ) {
        if(err){
            console.log(err);
        }else {
            res.redirect("/campgrounds");
        }
    });
} );

app.get("/campgrounds/:id", function ( req, res ) {
    res.send("This will be the show page one day!")
});

app.listen(3000, process.env.IP, function (  ) {
    console.log("star-camp has started!")
});